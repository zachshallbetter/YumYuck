# Contributing to YumYuck

Thanks for your interest. This project is maintained by one person, so reviews are best-effort
(see [SUPPORT.md](SUPPORT.md)).

## Setup

The app is in `apps/web`.

```sh
cd apps/web
npm install
npm run dev     # Vite (port 3000) plus the Express API (port 3001)
npm run build   # vite build, then tsc -p tsconfig.server.json
```

`GEMINI_API_KEY` and `DATABASE_URL` (or `POSTGRES_URL`) are read from the environment. Without
`DATABASE_URL`, the API logs research events to the console. Never commit secrets or paste their
values into issues or PRs.

## Conventions

- TypeScript throughout; the client is plain TypeScript modules under `apps/web/src`, the API is
  `apps/web/server.ts`.
- Event and data shapes are defined in `apps/web/src/db/schema.ts`; use them rather than
  re-declaring shapes.
- Commits follow conventional-commit style, for example `ci(vercel): ...` or `docs: ...`.

## Verifying a change

There are no automated tests. Before opening a PR, run `npm run build` in `apps/web`. For UI or API
changes, also run `npm run dev` and check the behavior and the browser console.

## Pull requests

- Branch off `main`; keep PRs focused.
- Use a conventional-commit title.
- Describe the change and how you verified it. The PR template prompts for this.
