# Step 3 — Project Initialization and Foundation

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-03  
**Version:** 1.3  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  
**Depends on:** Steps 1–2

---

## 1. Purpose

This document defines the reproducible repository, workspace, local services, configuration, quality tooling, backend bootstrap, frontend bootstrap, and first health checks. The objective is to make every later feature start from a deterministic and reviewable foundation rather than ad hoc local setup.

It does not implement business modules. Authentication, customers, products, inventory, and challans remain later steps.

---

## 2. Source-derived requirements

**[SOURCE]** The backend must use Node.js, TypeScript, Express.js or NestJS, PostgreSQL or MySQL, REST APIs, validation, and error handling.

**[SOURCE]** The frontend must use React, HTML, CSS, JavaScript/TypeScript, and responsive UI.

**[SOURCE]** Environment variables must be used, server setup must be documented, the repository must have proper commits, and the README must explain setup.

**[SOURCE]** Deployment can use free hosting; AWS is optional.

---

## 3. Locked foundation decisions

| Area | Decision |
|---|---|
| Repository | One Git repository and pnpm workspace monorepo |
| Package manager | pnpm through Corepack; commit `pnpm-lock.yaml` |
| Backend | NestJS TypeScript app under `apps/api` |
| Frontend | React + TypeScript + Vite under `apps/web` |
| Database | PostgreSQL; local instance through Docker Compose |
| ORM | Prisma under `apps/api/prisma` |
| UI library | Material UI |
| Server validation | Nest global `ValidationPipe` |
| API docs | Swagger/OpenAPI |
| HTTP hardening | Helmet, explicit CORS, JSON size limit |
| Logging | Structured Nest logger with request ID |
| Root orchestration | pnpm recursive/filter scripts; no Turborepo required for P0 |
| Formatting | Prettier |
| Static quality | ESLint and TypeScript build/type-check |
| Git hooks | Deferred unless setup remains simple and stable |

**[DECISION]** Avoid unnecessary build orchestration frameworks. The project is small enough for pnpm workspace commands, reducing setup risk during a 48-hour assignment.

---

## 4. Target repository structure

```text
mini-erp-crm/
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   ├── common/
│   │   │   │   ├── decorators/
│   │   │   │   ├── filters/
│   │   │   │   ├── guards/
│   │   │   │   ├── interceptors/
│   │   │   │   ├── pipes/
│   │   │   │   └── types/
│   │   │   ├── config/
│   │   │   ├── health/
│   │   │   ├── prisma/
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── test/
│   │   ├── .env.example
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/
│       ├── public/
│       ├── src/
│       │   ├── api/
│       │   ├── app/
│       │   ├── components/
│       │   ├── features/
│       │   ├── layouts/
│       │   ├── pages/
│       │   ├── routes/
│       │   ├── theme/
│       │   ├── types/
│       │   └── main.tsx
│       ├── .env.example
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── docs/
│   ├── case-study/
│   ├── postman/
│   ├── screenshots/
│   └── recordings/
├── scripts/
├── .editorconfig
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── docker-compose.yml
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

---

## 5. Prerequisites

Document and verify these local prerequisites:

- Git
- A supported current Node.js LTS runtime
- Corepack/pnpm
- Docker Desktop or a compatible Docker Engine with Compose
- PostgreSQL client tools are optional but useful
- A modern browser
- Postman or another client capable of importing a collection

Do not hard-code one developer's filesystem paths. Commands must work from the repository root.

---

## 6. Initialization sequence

The following is the planned command sequence. Exact CLI prompts may differ, so generated files must be reviewed before committing.

```bash
mkdir mini-erp-crm
cd mini-erp-crm
git init
corepack enable
pnpm init

mkdir -p apps docs/case-study docs/postman docs/screenshots docs/recordings scripts

pnpm dlx @nestjs/cli new apps/api \
  --package-manager pnpm \
  --skip-git \
  --strict

pnpm create vite apps/web --template react-ts
```

After scaffolding:

```bash
pnpm install
pnpm --filter api add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-transformer class-validator @prisma/client helmet
pnpm --filter api add -D prisma @types/bcrypt @types/passport-jwt

pnpm --filter web add @mui/material @mui/icons-material @emotion/react @emotion/styled react-router-dom @tanstack/react-query react-hook-form zod @hookform/resolvers axios
```

Test packages are finalized in Step 9, but Nest's generated Jest setup may remain.

---

## 7. Workspace files

### 7.1 `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
```

### 7.2 Root `package.json`

```json
{
  "name": "mini-erp-crm",
  "private": true,
  "packageManager": "pnpm@<pinned-by-corepack>",
  "scripts": {
    "dev": "pnpm -r --parallel --filter ./apps/* dev",
    "dev:api": "pnpm --filter api start:dev",
    "dev:web": "pnpm --filter web dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "pnpm -r typecheck",
    "test": "pnpm -r test",
    "db:up": "docker compose up -d postgres",
    "db:down": "docker compose down",
    "db:logs": "docker compose logs -f postgres",
    "db:migrate": "pnpm --filter api prisma:migrate",
    "db:seed": "pnpm --filter api prisma:seed"
  },
  "devDependencies": {
    "prettier": "<pinned-version>"
  }
}
```

The real committed file must contain exact package versions. `<pinned-version>` is documentation notation, not valid final package JSON.

### 7.3 API scripts

Expected `apps/api/package.json` additions:

```json
{
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main.js",
    "start:prod": "node dist/main.js",
    "lint": "eslint \"{src,test}/**/*.ts\" --max-warnings=0",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:seed": "prisma db seed",
    "prisma:studio": "prisma studio"
  }
}
```

### 7.4 Web scripts

Expected `apps/web/package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --max-warnings=0",
    "typecheck": "tsc -b --pretty false",
    "test": "vitest run"
  }
}
```

Vitest installation belongs to Step 9 if not added initially.

---

## 8. Local PostgreSQL service

### 8.1 `docker-compose.yml`

```yaml
services:
  postgres:
    image: postgres:<pinned-major>
    container_name: mini-erp-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: mini_erp
      POSTGRES_USER: mini_erp
      POSTGRES_PASSWORD: local_development_only
    ports:
      - "5432:5432"
    volumes:
      - mini_erp_postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U mini_erp -d mini_erp"]
      interval: 5s
      timeout: 5s
      retries: 10

volumes:
  mini_erp_postgres_data:
```

The actual image major version must be pinned. The local password is intentionally non-production and is mirrored only in `.env.example`; production credentials come from the hosting provider.

### 8.2 Commands

```bash
pnpm db:up
docker compose ps
pnpm db:logs
pnpm db:down
```

Removing local data must be an explicit action:

```bash
docker compose down -v
```

Do not include `-v` in normal teardown scripts.

---

## 9. Environment configuration

### 9.1 Root `.env.example`

The root file is documentation-only unless Compose variable interpolation is used.

```env
COMPOSE_PROJECT_NAME=mini_erp_crm
POSTGRES_DB=mini_erp
POSTGRES_USER=mini_erp
POSTGRES_PASSWORD=local_development_only
POSTGRES_PORT=5432
```

### 9.2 API `.env.example`

```env
NODE_ENV=development
PORT=4000
API_PREFIX=api/v1
DATABASE_URL=postgresql://mini_erp:local_development_only@localhost:5432/mini_erp?schema=public
DATABASE_URL_TEST=postgresql://mini_erp:local_development_only@localhost:5432/mini_erp_test?schema=public
JWT_SECRET=replace-with-at-least-32-random-bytes
JWT_EXPIRES_IN_SECONDS=28800
JWT_ISSUER=mini-erp-api
JWT_AUDIENCE=mini-erp-web
CORS_ORIGINS=http://localhost:5173
LOG_LEVEL=debug
SEED_DEMO_DATA=true
ADMIN_SEED_EMAIL=admin@example.com
ADMIN_SEED_PASSWORD=replace-me
SALES_SEED_EMAIL=sales@example.com
SALES_SEED_PASSWORD=replace-me
WAREHOUSE_SEED_EMAIL=warehouse@example.com
WAREHOUSE_SEED_PASSWORD=replace-me
ACCOUNTS_SEED_EMAIL=accounts@example.com
ACCOUNTS_SEED_PASSWORD=replace-me
```

### 9.3 Web `.env.example`

```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
VITE_APP_NAME=Mini ERP + CRM
```

### 9.4 Rules

- Commit only `.env.example`, never `.env`.
- Validate required API variables at startup.
- Fail fast with field names but not secret values.
- Prefix browser-exposed values with `VITE_` only when safe for public exposure.
- Do not put JWT secrets, database credentials, or seed passwords in web environment variables.
- Maintain a deployment-specific variable table in Step 10.

---

## 10. Configuration validation

Create a typed configuration module. Startup must fail when:

- `DATABASE_URL` is missing or invalid.
- `JWT_SECRET` is missing or too short.
- Port or token expiry is not a valid positive integer.
- `CORS_ORIGINS` is empty in production.
- Required seed variables are missing when the seed command runs.

The exact implementation may use a small validation function or a schema library already approved for the API. Avoid introducing a second large validation framework solely for environment variables.

---

## 11. Prisma foundation

### 11.1 Initialization

```bash
cd apps/api
pnpm exec prisma init --datasource-provider postgresql
```

Replace the generated schema with the Step 2 canonical schema.

### 11.2 Prisma module

Provide one application-wide service:

```text
src/prisma/prisma.module.ts
src/prisma/prisma.service.ts
```

Responsibilities:

- Extend `PrismaClient`.
- Connect on module initialization.
- Disconnect on shutdown.
- Enable Nest shutdown hooks.
- Expose no business logic.

### 11.3 First migration

```bash
pnpm --filter api exec prisma format
pnpm --filter api exec prisma validate
pnpm --filter api exec prisma migrate dev --name init
pnpm --filter api exec prisma generate
pnpm --filter api prisma:seed
```

Review and augment the generated SQL with Step 2 check constraints before accepting the migration.

---

## 12. Backend bootstrap

### 12.1 `main.ts` responsibilities

The application bootstrap must:

1. Load validated configuration.
2. Create the Nest app.
3. Enable graceful shutdown hooks.
4. Set global prefix `/api/v1`.
5. Register a strict global `ValidationPipe`.
6. Register the global exception filter.
7. Register request-ID handling.
8. Apply Helmet.
9. Apply a conservative JSON body-size limit.
10. Configure explicit CORS origins.
11. Configure Swagger in non-test environments.
12. Listen on the configured host/port.

Suggested validation configuration:

```ts
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: { enableImplicitConversion: false },
  stopAtFirstError: false,
});
```

### 12.2 CORS

- Parse `CORS_ORIGINS` as a comma-separated allowlist.
- Allow the required methods and `Authorization`, `Content-Type`, and request-ID headers.
- Do not use wildcard origin in production.
- Credentials are not required for bearer-token authentication.

### 12.3 Request ID

- Accept a valid inbound `X-Request-Id` or create one.
- Add it to the response header.
- Include it in structured logs and error envelopes.
- Do not trust extremely long or unsafe inbound values.

### 12.4 Global exception handling

The filter maps:

- DTO errors to `VALIDATION_FAILED`.
- Prisma known errors to stable conflict/not-found codes where applicable.
- Domain exceptions to their defined status and code.
- Unknown exceptions to `500 INTERNAL_ERROR`.

Production logs keep diagnostic details; client responses remain safe.

---

## 13. Health endpoints

Create a `HealthModule` with no authentication requirement.

### 13.1 `GET /api/v1/health/live`

Returns `200` when the process is running:

```json
{
  "data": {
    "status": "ok",
    "service": "mini-erp-api",
    "timestamp": "2026-07-28T08:15:30.000Z"
  }
}
```

### 13.2 `GET /api/v1/health/ready`

Checks the database with a lightweight query.

- `200` when dependencies are ready.
- `503` with a safe message when the database is unavailable.
- Must not disclose the connection string or SQL error.

These endpoints are used by local verification and Step 10 hosting health checks.

---

## 14. Swagger/OpenAPI foundation

Expose Swagger at:

```text
/api/docs
```

and JSON at:

```text
/api/docs-json
```

Configuration must include:

- API title and description.
- Version `1.0`.
- Bearer authentication scheme.
- Server URLs documented per environment where practical.
- DTO examples generated from real decorators.

Swagger should be enabled in production assessment hosting unless the evaluator is given an alternative API document. Do not expose secrets or actual token values in examples.

---

## 15. Frontend foundation

### 15.1 Provider hierarchy

```text
React.StrictMode
└── QueryClientProvider
    └── ThemeProvider
        └── CssBaseline
            └── RouterProvider
```

Authentication context is added in Step 4.

### 15.2 Initial route behavior

Before feature routes exist:

- `/` redirects to `/login` or a temporary foundation page.
- `/login` displays a non-functional placeholder until Step 4.
- Unknown routes show a basic 404 page.

### 15.3 API client

Create one configured HTTP client under `src/api/client.ts`:

- Base URL from `VITE_API_BASE_URL`.
- JSON headers.
- Request timeout.
- Request-ID propagation when useful.
- Central parsing of the documented error envelope.
- No feature-specific logic.

Token attachment is added in Step 4.

### 15.4 Material UI theme

Set a restrained assessment-friendly theme:

- Clear typography.
- Accessible contrast.
- Consistent spacing and radius.
- Responsive container widths.
- No custom visual effects that delay functionality.

---

## 16. Formatting and linting

### 16.1 `.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### 16.2 Prettier

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

### 16.3 ESLint baseline

- No unused variables unless intentionally prefixed.
- No floating promises.
- No `any` without a documented exception.
- React hooks rules enabled.
- Warnings fail CI/quality checks.

Generated configurations should be simplified rather than duplicated across multiple incompatible files.

---

## 17. Git and repository hygiene

### 17.1 `.gitignore`

Must cover:

```text
node_modules/
dist/
coverage/
.env
.env.*
!.env.example
*.log
.DS_Store
.vscode/
.idea/
apps/web/.vite/
apps/api/prisma/*.db
```

Do not ignore committed migrations, lockfile, API collection, documentation, or example environments.

### 17.2 Initial commits

Recommended sequence:

```text
chore: initialize pnpm monorepo
chore: scaffold NestJS API and React web app
chore: add local PostgreSQL and environment examples
feat: add Prisma schema migrations and seed foundation
feat: add API bootstrap health checks and Swagger
chore: configure lint formatting and root scripts
```

Each commit must build on the previous one and avoid generated noise unrelated to the message.

---

## 18. Foundation validation checklist

Run from a clean clone after copying example environments:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm db:up
pnpm db:migrate
pnpm db:seed
pnpm lint
pnpm typecheck
pnpm build
pnpm dev
```

Verify:

- PostgreSQL reports healthy.
- API starts without secret values in logs.
- `/api/v1/health/live` returns 200.
- `/api/v1/health/ready` returns 200 with database connected.
- Swagger loads.
- React app loads.
- React can reach the health endpoint without a CORS error.
- Stopping the API closes cleanly.

---

## 19. Security considerations

- Use environment variables for every secret.
- Do not enable permissive CORS.
- Reject unknown DTO properties.
- Apply body-size limits.
- Use Helmet defaults unless a documented frontend requirement conflicts.
- Do not print full environment objects.
- Do not publish Docker database ports beyond local development.
- Do not expose Prisma Studio on deployment.
- Pin direct dependencies and commit the lockfile.
- Review package scripts before running generated code.

---

## 20. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Workspace script names conflict between Nest and Vite | Normalize `dev`, `build`, `lint`, and `typecheck` scripts before root orchestration |
| Scaffold creates nested lockfiles | Keep only the root lockfile; reinstall from root |
| Docker port 5432 is already used | Document an alternate local port and update `DATABASE_URL` consistently |
| Generated migration lacks custom checks | Review SQL before commit and add Step 2 constraints |
| Environment variables are silently undefined in Vite | Validate API base URL at app startup and fail with a clear development message |
| Swagger drifts from implementation | Generate from DTO/controller decorators, not separate handwritten schemas |
| Too much foundation work consumes the deadline | Keep monitoring, hooks, and advanced orchestration deferred until P0 works |

---

## 21. Acceptance criteria

Documentation is complete when:

- [x] Repository structure and package-manager decision are defined.
- [x] Initialization commands and dependency categories are documented.
- [x] Workspace, scripts, Docker, environments, Prisma, backend bootstrap, frontend bootstrap, Swagger, health, formatting, linting, and Git rules are defined.
- [x] Security, validation, evidence, risks, and handoff are defined.

Implementation is complete only when:

- [x] A dependency-free clean source copy installs with the locked dependency graph; a literal Git clone follows the first commit.
- [x] Local PostgreSQL starts and reports healthy.
- [x] Migrations and seed complete from an empty database.
- [x] API and web start together.
- [x] Health endpoints and Swagger work.
- [x] CORS is restricted and functional.
- [x] Lint, type-check, and build pass.
- [x] CI, ignore rules, and repository-ready source are present; initial history is deferred to the GitHub phase.

---

## 22. Deliverables and evidence

- Root workspace files.
- `docker-compose.yml`.
- API and web `.env.example` files.
- Prisma migration and seed output.
- Health response screenshots or saved responses.
- Swagger screenshot or URL.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` output.
- Clean-clone setup notes.
- Git commit hashes.

---

## 23. Handoff to Step 4

Step 4 adds real login, seeded account access, bearer tokens, password hashing, JWT verification, active-user checks, role guards, frontend authentication state, protected routes, logout, and role-aware navigation. It must build on the foundation without weakening global validation, CORS, error envelopes, or environment management.

---

## 24. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined repository initialization, pnpm workspace, local PostgreSQL, environment management, Prisma bootstrap, API/web foundation, health checks, Swagger, quality tools, and verification. |
| 1.1 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.2 | 2026-07-28 | Recorded the working workspace, PostgreSQL, migration/seed, API/web, health, Swagger, CORS, and quality gates; clean-clone and Git-history checks remain pending. |
| 1.3 | 2026-07-28 | Verified a dependency-free clean-source install, migration, seed, full quality/integration suite, and independent built API/web startup; added repository CI. |
