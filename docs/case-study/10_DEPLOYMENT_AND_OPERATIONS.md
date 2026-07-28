# Step 10 — Deployment and Operations

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-10  
**Version:** 1.5  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Depends on:** Steps 1–9  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`

---

## 1. Purpose

This document defines how the verified application is run locally and deployed for assessment. It covers hosting choices, environment variables, PostgreSQL provisioning, migrations, seed data, build/start commands, frontend/API configuration, CORS, health checks, logs, smoke tests, rollback, free-host limitations, secrets, and the complete local-only fallback required by the assignment.

Deployment must preserve the business behavior verified in Step 9. It is not the stage for adding major features.

---

## 2. Source-derived requirements

**[SOURCE]** Deployment should use a free hosting platform.

**[SOURCE]** Accepted examples include:

- Frontend: Vercel, Netlify, Render Static Site, or similar.
- Backend: Render, Railway, Fly.io, or similar.
- Database: Supabase, Neon, Render Postgres, or similar.

**[SOURCE]** AWS deployment is optional and treated as a bonus. The candidate is not expected to spend money.

**[SOURCE]** When not deploying, the candidate must provide:

- A working local setup.
- A screen recording of the full flow.
- A Postman collection.
- Clear README instructions.

**[SOURCE]** Documentation must explain server setup, environment management, local execution, deployment, and assumptions.

---

## 3. Recommended deployment architecture

```text
Browser
  │
  ├── Frontend: Vercel static deployment
  │
  └── HTTPS REST
         │
         ▼
      NestJS API: Render or Railway
         │
         ▼
      PostgreSQL: Neon or another accepted managed provider
```

This is a **[DECISION]** intended to minimize operational risk. Actual provider availability and free-plan limits must be checked at deployment time; this documentation does not promise a particular provider will retain the same plan indefinitely.

Alternative accepted combinations are allowed if all verification and documentation remain accurate.

---

## 4. Deployment priorities

1. Complete and verify local P0 flow.
2. Commit a clean release candidate.
3. Provision database.
4. Deploy API and apply migrations.
5. Seed assessment users.
6. Deploy frontend with final API URL.
7. Configure CORS.
8. Run production smoke tests.
9. Record URLs, credentials, evidence, and limitations.
10. Only then consider AWS or other bonus work.

A failed optional AWS attempt must not replace a working free deployment or local package.

---

## 5. Environment separation

Use distinct environments:

| Environment | Purpose | Data |
|---|---|---|
| Development | Local implementation. | Disposable/demo. |
| Test | Automated integration/concurrency tests. | Isolated and disposable. |
| Production/assessment | Reviewer demonstration. | Assessment-only demo data. |

Never point tests at the assessment database.

---

## 6. API environment variables

| Variable | Required | Secret | Purpose |
|---|---:|---:|---|
| `NODE_ENV` | Yes | No | `production` in deployment. |
| `PORT` | Provider/local | No | Use the host-provided port in deployment; local default is 4000. |
| `DATABASE_URL` | Yes | Yes | PostgreSQL runtime connection. |
| `DIRECT_DATABASE_URL` | Provider-dependent | Yes | Direct migration connection if required. |
| `JWT_SECRET` | Yes | Yes | JWT signing. |
| `JWT_EXPIRES_IN_SECONDS` | Yes | No | Access-token lifetime in seconds; baseline `28800`. |
| `JWT_ISSUER` | Yes | No | Expected issuer. |
| `JWT_AUDIENCE` | Yes | No | Expected audience. |
| `CORS_ORIGINS` | Yes | No | Exact frontend origins. |
| `LOG_LEVEL` | Yes | No | Production logging level. |
| `ADMIN_SEED_EMAIL` | Seed only | No | Admin demo email. |
| `ADMIN_SEED_PASSWORD` | Seed only | Yes | Admin demo credential. |
| `SALES_SEED_EMAIL` | Seed only | No | Sales demo email. |
| `SALES_SEED_PASSWORD` | Seed only | Yes | Sales demo credential. |
| `WAREHOUSE_SEED_EMAIL` | Seed only | No | Warehouse demo email. |
| `WAREHOUSE_SEED_PASSWORD` | Seed only | Yes | Warehouse demo credential. |
| `ACCOUNTS_SEED_EMAIL` | Seed only | No | Accounts demo email. |
| `ACCOUNTS_SEED_PASSWORD` | Seed only | Yes | Accounts demo credential. |

If `DIRECT_DATABASE_URL` is added, the Prisma datasource and Step 2 schema change log must be updated and validated. It is needed only when the provider distinguishes pooled runtime connections from direct migration connections.

---

## 7. Frontend environment variables

| Variable | Required | Secret | Purpose |
|---|---:|---:|---|
| `VITE_API_BASE_URL` | Yes | No | Final API base ending in `/api/v1`. |
| `VITE_APP_NAME` | Optional | No | Display name. |

All `VITE_` values are public browser configuration. Do not place passwords, JWT secrets, database URLs, or private keys in frontend variables.

---

## 8. Secret-management rules

- Configure secrets in hosting dashboards/CLI, not repository files.
- Use different development and production JWT/database passwords.
- Do not include secret values in screenshots, logs, or README.
- Share only the four assessment login credentials required for review.
- Rotate any secret accidentally exposed in Git or screenshots.
- Ensure `.env` remains ignored.
- Remove seed password variables after seed if the provider workflow permits and future reseeding is unnecessary; otherwise keep them protected.

---

## 9. PostgreSQL provisioning

Steps:

```text
1. Create a managed PostgreSQL project/database.
2. Choose a region reasonably close to the API host where possible.
3. Obtain the connection URL.
4. Require TLS according to provider instructions.
5. Configure runtime and optional direct migration URLs.
6. Add URLs to API environment variables.
7. Test connection from deployment environment.
8. Apply migrations.
9. Seed assessment accounts.
```

Do not expose the database publicly beyond provider-required access controls.

### 9.1 Connection limits

Free managed databases and server platforms may have low connection limits. Mitigation:

- Use one Prisma client per API process.
- Do not create a client per request.
- Use provider-supported pooling when available.
- Keep transactions short.
- Avoid unnecessary concurrent background tasks.
- Observe connection errors during smoke tests.

---

## 10. Migration policy

Development:

```bash
pnpm --filter api prisma:migrate:dev
```

Production:

```bash
pnpm --filter api prisma:migrate:deploy
```

Rules:

- Migrations are committed.
- Production never uses `migrate dev` or schema reset.
- Apply migrations before serving requests that require them.
- Record migration output.
- Do not use `db push` as a replacement for tracked production migrations.
- Backward-incompatible migration changes require explicit review; the case-study initial deployment should be a clean database.

---

## 11. Seed policy

Production seed must:

- Be idempotent.
- Create/update all four role accounts.
- Hash passwords.
- Avoid logging plaintext values.
- Optionally create clearly fake demo customers/products.
- Preserve stock/movement consistency.
- Not reset existing production data.

Preferred invocation:

```bash
pnpm --filter api prisma:seed
```

Do not run a destructive development reset command in production.

After seeding, verify login for every role.

---

## 12. API build and start

Expected build:

```bash
pnpm install --frozen-lockfile
pnpm --filter api prisma:generate
pnpm --filter api build
```

Expected pre-deploy/release command:

```bash
pnpm --filter api prisma:migrate:deploy
```

Expected start:

```bash
pnpm --filter api start:prod
```

The API must listen on `0.0.0.0` and use the platform-provided port when required.

The exact provider settings must be copied into README and this document after implementation.

---

## 13. Frontend build and deployment

Expected build:

```bash
pnpm install --frozen-lockfile
pnpm --filter web build
```

Output directory:

```text
apps/web/dist
```

Configure:

```text
VITE_API_BASE_URL=https://<api-host>/api/v1
```

Single-page routing requires a rewrite/fallback so browser refresh on `/customers/:id` serves `index.html`. Configure it according to the selected frontend host.

Do not deploy with localhost API URLs.

---

## 14. CORS configuration

Production API allows exact frontend origin(s), for example:

```env
CORS_ORIGINS=https://<frontend-host>
```

Rules:

- No `*` wildcard in production.
- Include preview origin only if intentionally supported.
- Do not include trailing-slash variants unnecessarily.
- Allow Authorization and Content-Type headers.
- Test browser preflight and authenticated requests.
- A CORS failure is not fixed by disabling browser security or making the API public to all origins.

If multiple origins are supported, parse a comma-separated allowlist safely.

---

## 15. API health and startup behavior

Public health endpoint:

```text
GET /api/v1/health
```

Use it for:

- Hosting health check.
- Deployment verification.
- Recording database reachability.

Startup must fail clearly when:

- Required environment variables are missing.
- JWT secret is weak/missing.
- Database configuration is invalid.

Startup logs may show service, environment, and port, but not secrets.

---

## 16. Deployment order

```text
1. Push verified release commit.
2. Provision database.
3. Configure API environment variables.
4. Deploy/build API.
5. Apply production migrations.
6. Seed role accounts.
7. Verify API health and Swagger.
8. Configure frontend with final API URL.
9. Deploy frontend.
10. Add final frontend origin to API CORS.
11. Redeploy/restart API if needed.
12. Run full production smoke test.
13. Record final URLs and commit hash.
```

Avoid circular guessing of URLs by using provider-assigned API URL first, then frontend, then final CORS update.

---

## 17. Production smoke-test checklist

### 17.1 Infrastructure

- [x] Frontend URL returns 200 and loads.
- [x] API health returns 200.
- [x] Database reports reachable.
- [x] Swagger/OpenAPI loads if intended.
- [ ] HTTPS used.
- [x] Browser CORS works.
- [x] No secret appears in client bundle or errors.

### 17.2 Authentication

- [x] Admin login.
- [x] Sales login.
- [x] Warehouse login.
- [x] Accounts login.
- [x] Wrong password gives generic 401.
- [x] Role restrictions work.

### 17.3 Customer

- [x] Create/search/view/edit.
- [x] Add follow-up.

### 17.4 Product/inventory

- [x] Create product with opening stock.
- [x] Record IN/OUT.
- [x] Insufficient OUT fails without changing stock.

### 17.5 Challan

- [x] Create/edit Draft.
- [x] Confirm and verify stock movements.
- [x] Insufficient confirmation rolls back.
- [x] Accounts read-only behavior.
- [x] Admin confirmed cancellation restores stock once.

### 17.6 Responsive

- [x] Critical pages usable in mobile emulation.

All local-production checks were recorded on 2026-07-28. HTTPS remains
unmarked because the accepted fallback is intentionally localhost-only; it is a
required gate for the later public deployment.

---

## 18. Logging and observability

Minimum production logs:

- Startup and shutdown.
- Request ID, method, path, status, duration.
- Authenticated user ID/role when safe.
- Unexpected errors with stack only in server logs.
- Migration/seed result.

Do not log:

- Passwords.
- JWTs.
- Authorization headers.
- Database URLs.
- Customer note bodies unless necessary.

The free assessment architecture does not require a paid observability product. Provider logs plus request IDs are sufficient.

---

## 19. Free-host behavior and mitigations

Potential limitations:

- Cold starts or sleeping services.
- Build-time limits.
- Low memory/CPU.
- Database connection limits.
- Temporary service suspension.
- Ephemeral local filesystem.

Mitigations:

- Keep API stateless.
- Store persistent data only in PostgreSQL.
- Do not depend on local uploads.
- Keep startup fast.
- Use health checks.
- Warm services before recording or live review when allowed.
- Document expected cold-start delay honestly.
- Preserve the complete local setup as fallback.

Do not claim a provider-specific behavior until observed.

---

## 20. Statelessness

API instances must not depend on in-memory state for:

- Authentication validity beyond JWT/user lookup.
- Challan sequences.
- Stock balances.
- Follow-up history.
- Critical job queues.

All business state belongs in PostgreSQL. Session storage exists only in the browser.

---

## 21. Rollback strategy

### 21.1 Application rollback

- Record the last known good commit.
- Hosting platform may redeploy that commit.
- Re-run production smoke tests after rollback.

### 21.2 Database rollback

For the initial case-study deployment, prefer forward fixes over destructive rollback after data exists.

- Do not run `migrate reset`.
- Back up data before risky migration changes when provider supports it.
- Add a corrective migration.
- Keep migration SQL reviewed and committed.

### 21.3 Seed rollback

Seed uses upsert and must not delete operational data. Remove demo records only through explicit safe operations if needed.

---

## 22. Backup and recovery assumptions

Managed database backup capabilities vary by provider and plan. For the case-study environment:

- Do not promise point-in-time recovery unless verified.
- Preserve schema through migrations.
- Preserve reproducible demo data through seed/factories.
- Export a small database dump only if allowed and useful, excluding credentials/sensitive data.
- Document provider limitations.

This is not a production disaster-recovery architecture for a real business.

---

## 23. Domain and TLS

Provider-generated HTTPS URLs are sufficient. A custom domain is not required.

Verify:

- Frontend and API both use HTTPS.
- No mixed-content request.
- API base URL uses HTTPS.
- Certificate is valid in browser.

Do not spend time or money on custom DNS unless already available and low risk.

---

## 24. Docker local setup

Docker is a bonus in the assignment, but local PostgreSQL Compose is already part of the selected development foundation.

Optional full-stack Dockerization may include:

```text
web
api
postgres
```

However, it must not delay deployment or documentation. A reliable Compose database plus ordinary Node dev commands satisfies the local setup plan.

If full Docker is added:

- Multi-stage images.
- Non-root runtime where practical.
- No secrets baked into images.
- Health checks.
- Documented volumes and reset behavior.

---

## 25. Optional AWS bonus path

AWS is explicitly optional. It may be pursued only after the free/local submission is complete.

Possible low-complexity architecture:

```text
Frontend: S3 + CloudFront or Amplify
API: App Runner, Elastic Beanstalk, ECS/Fargate, or Lambda-compatible redesign
Database: RDS PostgreSQL
```

This path introduces cost, networking, IAM, migrations, CORS, and operational complexity. It is not recommended within the 48-hour core timeline unless the candidate already has a tested reusable setup and cost controls.

Any AWS implementation must document:

- Services used.
- IAM approach.
- Environment secrets.
- Network access.
- Cost assumptions.
- Deployment steps.
- Teardown procedure.

Do not incur cost merely for bonus points.

---

## 26. No-deployment fallback package

If live deployment is unavailable or unreliable, the assignment-supported fallback must be complete:

1. Working local setup from clean clone.
2. Docker/local PostgreSQL instructions.
3. `.env.example` and variable guide.
4. Migration and seed commands.
5. API and web start commands.
6. Test credentials for all roles.
7. Postman collection.
8. Swagger/OpenAPI if available.
9. Full-flow screen recording.
10. Screenshots.
11. Architecture and assumptions.
12. Known limitations.

The fallback must be prepared even when live deployment succeeds.

---

## 27. README deployment section

Must include:

```text
Deployment architecture
Live URLs
Environment variable names (not secret values)
Database provisioning summary
Build command
Migration command
Seed command
Start command
Frontend SPA rewrite note
CORS configuration
Health URL
Known free-host limitations
Local fallback
```

Provider dashboard screenshots are optional; written steps must be sufficient.

---

## 28. Deployment evidence

Recommended files:

```text
docs/evidence/deployment/
├── api-build.txt
├── migration.txt
├── seed.txt
├── health.json
├── cors-check.txt
├── smoke-test.md
├── frontend.png
└── api-docs.png
```

Redact:

- Connection strings.
- Environment values.
- Tokens.
- Seed passwords, unless placed only in the controlled final credentials section intended for the evaluator.

---

## 29. Operational limitations to disclose

- Free-host cold start may occur.
- No high-availability or autoscaling guarantee is claimed.
- No formal backup/recovery SLA.
- No centralized monitoring/alerting.
- No refresh-token revocation.
- Assessment credentials are shared test accounts.
- One company and one stock balance per product.
- No file storage.
- No background jobs.

These are acceptable for the case study and must not be represented as a real production ERP deployment.

---

## 30. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Deployment consumes core implementation time. | Local verification first; use simple free architecture. |
| CORS blocks browser. | Exact origin allowlist and smoke test. |
| Migrations are not run. | Explicit release command and health/business checks. |
| Seed accounts missing. | Idempotent seed and login test for all roles. |
| Frontend builds with localhost API URL. | Production env validation and browser network check. |
| Free DB connection exhaustion. | Singleton Prisma, pooling where supported, short transactions. |
| Secret appears in logs/repository. | Redaction, environment dashboard, final scan. |
| Service sleeps during review. | Document cold start and preserve local/recording fallback. |
| Destructive command runs in production. | Separate scripts and explicit README warnings. |
| Optional AWS work creates cost or delay. | Treat as post-P0 bonus only. |

---

## 31. Step 10 acceptance criteria

Documentation is complete when:

- [x] Source deployment/local requirements are mapped.
- [x] Recommended architecture and alternatives are defined.
- [x] Environment, secrets, database, migration, seed, and build contracts are defined.
- [x] CORS, health, deployment order, logs, smoke tests, and rollback are defined.
- [x] Free-host limitations, AWS bonus boundary, and no-deployment fallback are defined.
- [x] Evidence, operational limitations, risks, and README requirements are defined.

Deployment is complete only when:

- [x] Database is provisioned and migrations applied in the isolated local-production fallback.
- [x] Role users are seeded and verified.
- [x] API health and Swagger work.
- [ ] Frontend calls the production API over HTTPS.
- [x] Exact CORS works for the configured local-production origin.
- [x] Full local-production smoke flow passes.
- [x] Local fallback URLs are recorded; the final commit belongs to Step 11 closeout.
- [x] Secrets are absent from repository/evidence.
- [x] Local fallback is verified.
- [x] Evidence references are added below.

---

## 32. Planned deliverables and evidence

Expected artifacts:

```text
README.md
.env.example
docker-compose.yml
provider configuration files if used
docs/evidence/deployment/**
```

Deployment record placeholder:

| Item | Value/status |
|---|---|
| Frontend URL | `http://localhost:8080` (local-production fallback) |
| API URL | `http://localhost:4400/api/v1` during smoke; documented default is port 4000 |
| Health URL | `http://localhost:4400/api/v1/health` during smoke |
| Swagger URL | `http://localhost:4400/api/docs` during smoke |
| Database provider | Local Docker PostgreSQL 17, isolated persistent volume |
| API provider | Local Docker, non-root Node runtime |
| Frontend provider | Local Docker, non-root Nginx runtime |
| Final commit | Pending |
| Smoke-test date | 2026-07-28 |
| Result | Local-production fallback passed; public HTTPS deployment pending |

Evidence:

- `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md`

---

## 33. Handoff to Step 11

Step 11 must assemble the verified implementation and deployment into a professional submission. It must include:

- Repository and live/local links.
- Credentials for all roles.
- Postman/Swagger.
- README and architecture summary.
- Full-flow recording.
- Known limitations and incomplete parts.
- Final commit and evidence.
- A concise submission message.
- A no-false-claims final checklist.

---

## 34. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined deployment architecture, environments, migrations, seed, CORS, smoke tests, rollback, fallback, and operations. |
| 1.1 | 2026-07-28 | Harmonized runtime, JWT-expiry, CORS, and seed environment-variable names with the foundation and authentication documents. |
| 1.2 | 2026-07-28 | Added all four seed email variables to the deployment environment contract. |
| 1.3 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.4 | 2026-07-28 | Added the verified full-stack Docker fallback, migration/seed orchestration, non-root runtimes, health/logging/CORS checks, production smoke evidence, and truthful external-hosting boundaries. |
| 1.5 | 2026-07-28 | Reconciled the completed local-production smoke checklist and retained HTTPS as the explicit gate for the later public deployment. |
