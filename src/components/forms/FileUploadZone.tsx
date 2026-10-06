"use client";

import React, { useRef, useState } from "react";
import { AttachmentMetadata } from "@/lib/forms/types";
import styles from "./FileUploadZone.module.css";

interface FileUploadZoneProps {
  label?: string;
  description?: string;
  attachments: AttachmentMetadata[];
  onAttachmentsChange: (attachments: AttachmentMetadata[]) => void;
  maxFileSizeMB?: number;
  acceptedExtensions?: string;
}

export function FileUploadZone({
  label = "TECHNICAL ATTACHMENTS & DOCUMENTATION",
  description = "Attach nameplate photos, fault screenshots, or technical documents (PDF, JPG, PNG, WEBP up to 10MB).",
  attachments,
  onAttachmentsChange,
  maxFileSizeMB = 10,
  acceptedExtensions = ".pdf,.jpg,.jpeg,.png,.webp",
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxFileSizeMB * 1024 * 1024;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);

    const newAttachments: AttachmentMetadata[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > maxSizeBytes) {
        setErrorMessage(`"${file.name}" exceeds the maximum allowed size (${maxFileSizeMB}MB).`);
        return;
      }

      newAttachments.push({
        id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        lastModified: file.lastModified,
      });
    });

    if (newAttachments.length > 0) {
      onAttachmentsChange([...attachments, ...newAttachments]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeAttachment = (id: string) => {
    onAttachmentsChange(attachments.filter((a) => a.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.headerRow}>
        <span className={styles.sectionLabel}>{label}</span>
        <span className={styles.optionalBadge}>OPTIONAL</span>
      </div>

      <p className={styles.uploadDesc}>{description}</p>

      {/* Drag & Drop Zone */}
      <div
        className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label="Upload technical document or photo"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedExtensions}
          className={styles.hiddenInput}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className={styles.dropContent}>
          <span className={styles.uploadIcon} aria-hidden="true">⬆</span>
          <div className={styles.dropText}>
            <span className={styles.primaryAction}>CHOOSE FILE OR DRAG &amp; DROP</span>
            <span className={styles.formatHint}>Supported: Photos (JPG, PNG, WEBP), Documents (PDF, DOCX, TXT)</span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className={styles.errorBanner} role="alert">
          <span className={styles.errorIcon} aria-hidden="true">!</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Attached Files List */}
      {attachments.length > 0 && (
        <div className={styles.fileList}>
          <span className={styles.listHeading}>ATTACHED FILES ({attachments.length}):</span>
          <ul className={styles.filesGrid}>
            {attachments.map((att) => (
              <li key={att.id} className={styles.fileCard}>
                <div className={styles.fileInfo}>
                  <span className={styles.fileIcon} aria-hidden="true">📄</span>
                  <div className={styles.fileNames}>
                    <span className={styles.fileName}>{att.name}</span>
                    <span className={styles.fileSize}>{formatFileSize(att.size)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAttachment(att.id);
                  }}
                  className={styles.removeBtn}
                  aria-label={`Remove file ${att.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
