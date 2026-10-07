#!/usr/bin/env python3
"""
ME Group Website - Production Deployment Script
Builds Next.js static export (HTML/CSS/JS) and uploads to public_html via SSH/SFTP.
Features:
- Local Hash-based Differential Deploy (Delta Sync): Uploads only changed files (1-2s for edits).
- Heavy Media Cache: Automatically skips unchanged 120MB+ video/image files.
- Smart Packaging: Fast Zip + Remote Extraction for bulk updates, direct stream for single edits.
"""

import os
import sys
import subprocess
import hashlib
import json
import argparse
import time
import zipfile
from pathlib import Path

# Terminal encoding setup for Windows UTF-8 support
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8')
    if os.name == 'nt':
        os.system('')
except Exception:
    pass

try:
    import paramiko
    PARAMIKO_AVAILABLE = True
except ImportError:
    PARAMIKO_AVAILABLE = False


class NextStaticDeploymentManager:
    """Handles building and deploying pure Next.js production static assets to public_html."""

    # Server system directories/files in public_html that must NEVER be deleted
    PRESERVED_SYSTEM_FILES = {
        '.well-known',
        'cgi-bin',
        '.htpasswds',
        'access-logs',
        'error_log',
    }

    # Strict ERP protection list
    FORBIDDEN_TARGETS = [
        '/home/megroupe/megroup_erp',
        '/home/megroupe/system.megroup-eg.com',
        '/home/megroupe/virtualenv',
    ]

    def __init__(self, env_file=None, force=False):
        self.force = force
        self.project_root = Path(__file__).resolve().parent
        self.out_dir = self.project_root / "out"
        self.log_dir = self.project_root / "deploy_logs"
        self.hash_file = self.project_root / ".deploy_hashes.json"
        self.zip_package = self.project_root / ".deploy_package.zip"

        # Load environment settings
        self.load_env_settings(env_file=env_file)

        # Enforce safe remote destination
        self._enforce_safe_remote_path()

        # Locate SSH private key
        self.resolved_key_path = self.find_private_key()

        print("=" * 65)
        print("🚀 ME GROUP WEBSITE - SMART DIFFERENTIAL DEPLOYER")
        print("=" * 65)
        print(f"📁 Local Root:    {self.project_root.name}")
        print(f"🖥️  SSH Server:    {self.server_ip}:{self.ssh_port} (User: {self.username})")
        print(f"📂 Remote Target: {self.remote_path} [Main Domain public_html]")
        print("=" * 65)

    def load_env_settings(self, env_file=None):
        """Load connection configuration exclusively from .env file or system environment."""
        if env_file is None:
            candidate = self.project_root / ".env"
            if not candidate.exists():
                candidate = self.project_root / ".env.local"
            env_file = candidate

        self.server_ip = os.getenv('SSH_HOST', '84.247.179.163')
        self.ssh_port = int(os.getenv('SSH_PORT', '2951'))
        self.username = os.getenv('SSH_USER', 'megroupe')
        self.ssh_password = os.getenv('SSH_PASSWORD', None)
        self.private_key = os.getenv('SSH_KEY_PATH', 'ssh_key')
        self.ssh_key_passphrase = os.getenv('SSH_KEY_PASSPHRASE', None)
        self.remote_path = os.getenv('SSH_REMOTE_PATH', '/home/megroupe/public_html')
        self.site_url = os.getenv('NEXT_PUBLIC_SITE_URL', 'https://megroup-eg.com')

        if isinstance(env_file, (str, Path)):
            env_path = Path(env_file)
            if env_path.exists():
                try:
                    with open(env_path, 'r', encoding='utf-8') as f:
                        for line in f:
                            line = line.strip()
                            if '=' in line and not line.startswith('#'):
                                k, v = line.split('=', 1)
                                k = k.strip()
                                v = v.strip().strip('"').strip("'")
                                if k == 'SSH_HOST' and v:
                                    self.server_ip = v
                                elif k == 'SSH_PORT' and v:
                                    try:
                                        self.ssh_port = int(v)
                                    except ValueError:
                                        pass
                                elif k == 'SSH_USER' and v:
                                    self.username = v
                                elif k == 'SSH_PASSWORD' and v:
                                    self.ssh_password = v
                                elif k == 'SSH_KEY_PATH' and v:
                                    self.private_key = v
                                elif k == 'SSH_KEY_PASSPHRASE' and v:
                                    self.ssh_key_passphrase = v
                                elif k == 'SSH_REMOTE_PATH' and v:
                                    if 'erp' not in v.lower():
                                        self.remote_path = v
                                elif k in ('NEXT_PUBLIC_SITE_URL', 'SITE_URL') and v:
                                    self.site_url = v
                except Exception as e:
                    print(f"⚠️  Could not parse .env: {e}")

    def _enforce_safe_remote_path(self):
        """Prevent deployment into ERP or system directories."""
        for forbidden in self.FORBIDDEN_TARGETS:
            if forbidden in self.remote_path or self.remote_path == forbidden:
                print(f"⚠️  Warning: Target path '{self.remote_path}' unsafe. Reverting to '/home/megroupe/public_html'.")
                self.remote_path = '/home/megroupe/public_html'
                break

    def find_private_key(self):
        """Locate private key in project root or ~/.ssh."""
        candidates = [
            self.project_root / "ssh_key",
            self.project_root / "id_rsa",
            self.project_root / "id_ed25519",
        ]
        if self.private_key:
            p = Path(self.private_key)
            if p.is_absolute():
                candidates.insert(0, p)
            else:
                candidates.insert(0, self.project_root / p)
            candidates.append(Path.home() / ".ssh" / p.name)

        for candidate in candidates:
            if candidate.exists() and candidate.is_file() and not candidate.name.endswith('.pub'):
                return candidate
        return None

    def _create_ssh_connection(self):
        """Establish SSH connection using Paramiko."""
        if not PARAMIKO_AVAILABLE:
            raise RuntimeError("Paramiko library not found. Run: pip install paramiko")

        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        connect_params = {
            'hostname': self.server_ip,
            'port': self.ssh_port,
            'username': self.username,
            'timeout': 30,
        }

        if self.resolved_key_path and self.resolved_key_path.exists():
            key_classes = [paramiko.RSAKey]
            if hasattr(paramiko, 'Ed25519Key'):
                key_classes.append(paramiko.Ed25519Key)
            if hasattr(paramiko, 'ECDSAKey'):
                key_classes.append(paramiko.ECDSAKey)

            pkey = None
            last_err = None
            for key_cls in key_classes:
                try:
                    if self.ssh_key_passphrase:
                        pkey = key_cls.from_private_key_file(
                            str(self.resolved_key_path),
                            password=self.ssh_key_passphrase
                        )
                    else:
                        pkey = key_cls.from_private_key_file(str(self.resolved_key_path))
                    break
                except Exception as e:
                    last_err = e

            if pkey:
                connect_params['pkey'] = pkey
            elif self.ssh_password:
                connect_params['password'] = self.ssh_password
            else:
                raise RuntimeError(f"Private key authentication failed: {last_err}")
        elif self.ssh_password:
            connect_params['password'] = self.ssh_password
        else:
            raise RuntimeError("No SSH credentials provided in .env.")

        ssh.connect(**connect_params)
        return ssh

    def test_connection(self):
        """Validate SSH connection to public_html."""
        print("🔍 Testing SSH connection...")
        try:
            ssh = self._create_ssh_connection()
            sftp = ssh.open_sftp()
            try:
                sftp.stat(self.remote_path)
                print(f"✅ SSH & SFTP connected successfully to {self.username}@{self.server_ip}:{self.ssh_port}")
                print(f"📂 Verified remote path: {self.remote_path}")
            except IOError:
                print(f"ℹ️  Remote path {self.remote_path} will be created.")
            sftp.close()
            ssh.close()
            return True
        except Exception as e:
            print(f"❌ Connection failed: {e}")
            return False

    def build_project(self):
        """Execute Next.js production static export build (npm run build)."""
        print("\n🔨 Building Next.js static production export (npm run build)...")
        start_t = time.time()
        npm_cmd = "npm.cmd" if os.name == "nt" else "npm"

        try:
            subprocess.run(
                [npm_cmd, "run", "build"],
                cwd=str(self.project_root),
                capture_output=False,
                text=True,
                check=True
            )
            elapsed = time.time() - start_t
            if not self.out_dir.exists() or not any(self.out_dir.iterdir()):
                print("❌ Error: 'out/' directory was not generated by the build.")
                return False

            print(f"✅ Next.js static export build completed in {elapsed:.1f}s")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Build failed with exit code {e.returncode}")
            return False
        except Exception as e:
            print(f"❌ Could not run build: {e}")
            return False

    def collect_static_files(self):
        """Collect all static production files from out/ and root .htaccess."""
        if not self.out_dir.exists():
            return []

        files = []
        for p in self.out_dir.rglob('*'):
            if p.is_file():
                rel = p.relative_to(self.out_dir).as_posix()
                files.append((p, rel))

        # Always include production .htaccess if present
        root_htaccess = self.project_root / ".htaccess"
        if root_htaccess.exists():
            files.append((root_htaccess, ".htaccess"))

        return files

    def _compute_hash(self, file_path):
        """Calculate fast SHA-256 for a local file."""
        hasher = hashlib.sha256()
        with open(file_path, 'rb') as f:
            while chunk := f.read(65536):
                hasher.update(chunk)
        return hasher.hexdigest()

    def _load_hashes(self):
        """Load stored deployment file hashes."""
        if self.hash_file.exists():
            try:
                with open(self.hash_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                return {}
        return {}

    def _save_hashes(self, hashes_dict):
        """Save updated file hashes."""
        try:
            with open(self.hash_file, 'w', encoding='utf-8') as f:
                json.dump(hashes_dict, f, indent=2)
        except Exception as e:
            print(f"⚠️  Could not save deploy hashes: {e}")

    def filter_changed_files(self, all_files, force_full=False):
        """Compare current files against recorded hashes to upload only changed ones."""
        stored_hashes = self._load_hashes()
        current_hashes = {}
        changed_files = []
        total_size = 0
        changed_size = 0

        for local_path, rel_path in all_files:
            file_size = local_path.stat().st_size
            total_size += file_size

            file_hash = self._compute_hash(local_path)
            current_hashes[rel_path] = file_hash

            if force_full or stored_hashes.get(rel_path) != file_hash:
                changed_files.append((local_path, rel_path))
                changed_size += file_size

        return changed_files, current_hashes, total_size, changed_size

    def _ensure_remote_dir(self, sftp, remote_dir):
        """Recursively ensure remote directory structure exists."""
        parts = [p for p in remote_dir.replace('\\', '/').split('/') if p]
        curr = ""
        for part in parts:
            curr = f"{curr}/{part}"
            try:
                sftp.stat(curr)
            except IOError:
                try:
                    sftp.mkdir(curr)
                except Exception:
                    pass

    def create_deployment_archive(self, files):
        """Compress selected files into a zip archive."""
        if self.zip_package.exists():
            self.zip_package.unlink()

        with zipfile.ZipFile(self.zip_package, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
            for local_path, rel_path in files:
                zf.write(local_path, arcname=rel_path)

        return self.zip_package

    def deploy_via_fast_archive(self, ssh, sftp, files):
        """Upload bulk files as a single zip and extract on server."""
        zip_path = self.create_deployment_archive(files)
        remote_zip = f"{self.remote_path}/.deploy_package.zip"

        try:
            upload_start = time.time()
            sftp.put(str(zip_path), remote_zip)
            upload_time = time.time() - upload_start

            extract_start = time.time()
            extract_cmd = f"cd {self.remote_path} && unzip -qo .deploy_package.zip && rm -f .deploy_package.zip"
            stdin, stdout, stderr = ssh.exec_command(extract_cmd, timeout=30)
            exit_code = stdout.channel.recv_exit_status()
            extract_time = time.time() - extract_start

            if exit_code != 0:
                print(f"   ⚠️ Remote extraction failed (Code {exit_code}). Falling back to SFTP...")
                return False

            print(f"   ⚡ Packaged & extracted {len(files)} files in {upload_time + extract_time:.2f}s")
            return True
        except Exception:
            return False
        finally:
            if zip_path.exists():
                try:
                    zip_path.unlink()
                except Exception:
                    pass

    def deploy_via_direct_sftp(self, sftp, files):
        """Direct stream upload for few/small files."""
        for local_path, rel_path in files:
            remote_file = f"{self.remote_path}/{rel_path}".replace('\\', '/')
            remote_dir = '/'.join(remote_file.split('/')[:-1])
            self._ensure_remote_dir(sftp, remote_dir)
            sftp.put(str(local_path), remote_file)
            print(f"   ⬆️  {rel_path} ({local_path.stat().st_size / 1024:.1f} KB)")
        return True

    def deploy(self, skip_build=False, full=False):
        """Execute the smart differential build and upload cycle."""
        if not skip_build:
            if not self.build_project():
                return False

        all_files = self.collect_static_files()
        if not all_files:
            print("❌ No static files found in 'out/'. Please build first.")
            return False

        # Differential Hash Check
        changed_files, current_hashes, total_size, changed_size = self.filter_changed_files(
            all_files, force_full=full
        )

        total_mb = total_size / (1024 * 1024)
        changed_kb = changed_size / 1024
        unchanged_count = len(all_files) - len(changed_files)

        print("\n📊 DIFFERENTIAL DEPLOYMENT ANALYSIS:")
        print(f"   📦 Total Project Assets:  {len(all_files)} files ({total_mb:.1f} MB)")
        print(f"   ⏭️  Skipped (Identical):  {unchanged_count} files (Heavy media & unchanged code cached)")
        print(f"   ⚡ Changes Detected:      {len(changed_files)} file(s) ({changed_kb:.1f} KB)")

        if len(changed_files) == 0:
            print("\n✨ EVERYTHING IS UP TO DATE! No changes detected compared to production.")
            print(f"🌐 Website URL: {self.site_url}")
            return True

        # Display list of changed files
        print("\n📝 Modified / New Files:")
        for _, rel in changed_files[:10]:
            print(f"   • {rel}")
        if len(changed_files) > 10:
            print(f"   • ... and {len(changed_files) - 10} more")

        if not self.force:
            confirm = input(f"\n❓ Deploy {len(changed_files)} changed file(s) ({changed_kb:.1f} KB) to {self.remote_path}? (y/N): ").strip().lower()
            if confirm != 'y':
                print("❌ Deployment cancelled.")
                return False

        if not self.test_connection():
            return False

        total_start = time.time()

        try:
            ssh = self._create_ssh_connection()
            sftp = ssh.open_sftp()

            print(f"\n🚀 Deploying {len(changed_files)} changed file(s)...")

            # Smart hybrid method selection:
            # 1-5 small files -> Direct SFTP (instant, no zip packaging overhead)
            # > 5 files -> Fast zip & extract (avoids multi-connection latency)
            if len(changed_files) <= 5 and changed_size < 2 * 1024 * 1024:
                print("⚡ Small modification detected: Uploading directly via Stream SFTP...")
                self.deploy_via_direct_sftp(sftp, changed_files)
            else:
                print(f"⚡ Batch change ({len(changed_files)} files): Packaging for fast 1-step extraction...")
                success = self.deploy_via_fast_archive(ssh, sftp, changed_files)
                if not success:
                    print("ℹ️ Falling back to direct SFTP stream...")
                    self.deploy_via_direct_sftp(sftp, changed_files)

            sftp.close()
            ssh.close()

            # Save updated hashes on successful deploy
            self._save_hashes(current_hashes)

            total_elapsed = time.time() - total_start
            print(f"\n🎉 Production deployment completed in {total_elapsed:.2f}s!")
            print(f"   Deployed: {len(changed_files)} file(s) ({changed_kb:.1f} KB)")
            print(f"   Skipped:  {unchanged_count} cached file(s)")
            print(f"🌐 Website URL: {self.site_url}")

            self._save_log([rel for _, rel in changed_files])
            return True

        except Exception as e:
            print(f"\n❌ Deployment failed: {e}")
            return False

    def _save_log(self, uploaded_files):
        """Save upload log."""
        try:
            from datetime import datetime
            self.log_dir.mkdir(parents=True, exist_ok=True)
            ts = datetime.now().strftime('%Y%m%d_%H%M%S')
            log_file = self.log_dir / f"deploy_{ts}.txt"
            with open(log_file, 'w', encoding='utf-8') as f:
                f.write("ME Group Website - Production Static Deployment Log\n")
                f.write("===================================================\n")
                f.write(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"Target:    {self.remote_path}\n")
                f.write(f"Files:     {len(uploaded_files)}\n\n")
                for i, fn in enumerate(uploaded_files, 1):
                    f.write(f"{i:4d}. {fn}\n")

            all_logs = sorted(self.log_dir.glob("deploy_*.txt"), key=lambda p: p.stat().st_mtime, reverse=True)
            for old in all_logs[10:]:
                old.unlink()
        except Exception:
            pass


def main():
    parser = argparse.ArgumentParser(
        description="ME Group Website - Smart Differential Static Deployer",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Usage Examples:
  python deploy.py                 # Smart Delta Deploy: Only uploads modified files (1-2s)
  python deploy.py --skip-build    # Skip local npm build, compare & upload changes
  python deploy.py --full          # Force full upload of all 245 files including videos
  python deploy.py --mode test     # Test SSH connection
  python deploy.py --force         # Skip confirmation prompt
        """
    )
    parser.add_argument('--mode', choices=['deploy', 'build', 'test'],
                        default='deploy', help='Mode to run (default: deploy)')
    parser.add_argument('--skip-build', action='store_true', help='Skip local npm run build')
    parser.add_argument('--full', action='store_true', help='Force full upload of all files')
    parser.add_argument('--force', action='store_true', help='Skip confirmation prompt')
    parser.add_argument('--env', type=str, default=None, help='Custom .env file path')

    args = parser.parse_args()

    try:
        manager = NextStaticDeploymentManager(env_file=args.env, force=args.force)

        if args.mode == 'test':
            manager.test_connection()
        elif args.mode == 'build':
            manager.build_project()
        else:
            manager.deploy(skip_build=args.skip_build, full=args.full)

    except KeyboardInterrupt:
        print("\n\n❌ Deployment cancelled.")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
