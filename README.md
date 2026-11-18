# YumYuck

A mobile-first web app for deciding what to eat for dinner by reacting to meal cards instead of stating a preference. It is also built as a controlled experiment: the app records a typed event ledger (`yumyuck_events`) of those reactions. The product and research goals are described in `reference/CompInt.md`.

## Quick start

The app lives in `apps/web` (Vite + TypeScript, with a small Express API).

```sh
cd apps/web
npm install
npm run dev     # Vite on http://localhost:3000 and the API on port 3001
```

The API reads these environment variables from the environment or a `.env` file (never commit values):

- `GEMINI_API_KEY`: needed by `POST /api/gemini`.
- `DATABASE_URL` or `POSTGRES_URL`: Neon Postgres connection for `POST /api/log`. Without it, events are logged to the server console instead.
- `PORT`: API port, default `3001`.

## Repository map

- `apps/web/`: the app. `src/` holds the client (`main.ts`, `components/`, `styles/`) and the data layer (`db/`: IndexedDB, Neon, schema, seed meals); `server.ts` is the Express API.
- `reference/`: design and research notes (`CompInt.md`, `Generative.md`, `Interactions.md`) and reference images.
- `implementation_plan.md`: the original plan. It describes a Next.js build; the code in `apps/web` uses Vite and Express instead.
- `vercel.json`: Vercel deploys `main` only.

## Verification

```sh
cd apps/web
npm run build   # vite build, then tsc for the server
```

This is the only check that exists: a structural build. There are no unit or end-to-end tests, and no empirical evaluation of the recommendation approach is recorded in the repository.

## Status and limitations

Prototype. The build passes with `npm install`. `npm ci` currently fails because `apps/web/package-lock.json` is out of sync with `package.json`, and a `pnpm-lock.yaml` sits beside it. The `lint` script exists but the repository has no ESLint configuration. Built output (`apps/web/dist`, `dist-server`) is committed. `apps/web/README.md` is the unmodified Next.js starter text and does not describe this app.

## License

No license is declared yet.
