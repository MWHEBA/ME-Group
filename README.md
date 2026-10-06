# ME Group Website

Official website for ME Group — Marine Engineering Group.

Project memory lives in [`docs/`](./docs): brief, design system, information architecture, content model, implementation plan and decisions. Read them before changing anything.

## Status
Phase 1 (Foundation) complete. See `docs/IMPLEMENTATION_PLAN.md`.

## Commands
```bash
npm run dev        # development server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run format     # prettier --write src
```

## Environment
- `NEXT_PUBLIC_SITE_URL` — canonical site URL (default `http://localhost:3000`).
- `NEXT_PUBLIC_SITE_ENV=production` — enables indexing. Unset = `noindex` and `robots.txt` disallows everything.
