# Security Policy

## Reporting a vulnerability

If you find a security issue in YumYuck, please report it privately rather than opening a public
issue. Use GitHub private vulnerability reporting:
<https://github.com/zachshallbetter/YumYuck/security/advisories/new>

Include a description of the issue and its impact, steps to reproduce (a minimal example is
ideal), and the affected commit or version.

This project has a solo maintainer. Handling is best-effort with no SLA: there is no guaranteed
response time, and fixes are prioritized by severity as time allows.

## Scope

YumYuck is a web app with a small Express API (`apps/web/server.ts`). The API proxies requests to
the Gemini API using a server-side key, writes to a Neon Postgres database, and the client keeps a
local IndexedDB ledger. Reports about the API endpoints (`/api/gemini`, `/api/log`), handling of
the `GEMINI_API_KEY` and database connection settings, injection, or exposure of stored data are in
scope. Secrets are read from environment variables and are not committed to the repository.

## Supported versions

Only the latest commit on `main` receives fixes. The project does not publish versioned releases.
