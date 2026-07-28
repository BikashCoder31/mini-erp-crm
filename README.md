# Mini ERP + CRM Operations Portal

A full-stack case-study application for a wholesale/distribution company. It
combines customer CRM, product inventory, an immutable stock ledger, and
transactional sales challans in a responsive role-aware interface.

## Verified local application

- Repository: https://github.com/BikashCoder31/mini-erp-crm
- Web: `http://localhost:5173`
- API: `http://localhost:4000/api/v1`
- Health: `http://localhost:4000/api/v1/health`
- Swagger: `http://localhost:4000/api/docs`
- Production-style Docker fallback: web on `http://localhost:8080`, API on
  port 4000 by default

No public HTTPS deployment is claimed. The complete local-production fallback
has been smoke-tested and is documented below.

## Assessment credentials

These credentials are for the local assessment environment only.

| Role      | Email                   | Password source           | Primary demonstration                  |
| --------- | ----------------------- | ------------------------- | -------------------------------------- |
| Admin     | `admin@example.com`     | `ADMIN_SEED_PASSWORD`     | Full access and Confirmed cancellation |
| Sales     | `sales@example.com`     | `SALES_SEED_PASSWORD`     | Customer CRM and challan workflow      |
| Warehouse | `warehouse@example.com` | `WAREHOUSE_SEED_PASSWORD` | Product and stock management           |
| Accounts  | `accounts@example.com`  | `ACCOUNTS_SEED_PASSWORD`  | Read-only operational access           |

Set strong assessment-only passwords in the uncommitted API environment and
copy those values into the Postman secret variables. Share evaluator passwords
through a private channel; never commit them. Infrastructure secrets and
database passwords must also remain uncommitted.

## Key features

- JWT login and backend authorization for four fixed roles.
- Customer create/edit/search/filter/detail views.
- Append-only customer follow-up history.
- Product create/edit/search/filter and low-stock indicators.
- Opening stock plus manual IN/OUT movements.
- Immutable stock movement audit trail.
- Draft challan creation and editing with automatic unique numbers.
- Server-generated product snapshots and calculated totals.
- Atomic multi-product confirmation with negative-stock prevention.
- Detailed insufficient-stock conflicts with full rollback.
- Admin-only Confirmed cancellation with one-time stock restoration.
- Responsive Material UI interface with role-aware navigation.
- Swagger, Postman, integration/concurrency tests, and Docker deployment
  fallback.

## Roles

| Role      | Main access                                                      |
| --------- | ---------------------------------------------------------------- |
| Admin     | All modules and writes, including Confirmed challan cancellation |
| Sales     | Customer CRM, Draft/Confirm challans, operational reads          |
| Warehouse | Product and stock writes, operational reads                      |
| Accounts  | Read-only customers, products, movements, and challans           |

Frontend visibility mirrors these permissions, but the NestJS guards and
state-aware services are the enforcement boundary.

## Critical business rules

- Draft challans never change stock.
- Confirmation validates and deducts every item in one database transaction.
- Stock cannot become negative.
- One insufficient item prevents all deductions.
- Product name, SKU, category, price, and warehouse snapshots preserve
  historical challan values.
- Confirmed challans are immutable.
- Repeated confirmation cannot deduct stock twice.
- Confirmed cancellation is Admin-only and restores all item stock once.

## Architecture

The repository is a pnpm monorepo with a React/TypeScript frontend and a
NestJS/TypeScript REST API. PostgreSQL stores users, customers, follow-ups,
products, stock movements, challans, and snapshot line items. Prisma provides
typed persistence and committed migrations.

JWT authentication establishes the role, while backend guards and service
checks enforce endpoint and state transitions. Challan confirmation locks
affected products in deterministic order, checks all balances, writes OUT
ledger entries, and transitions the challan in one serializable transaction.
Manual stock races use bounded serialization retries and return a conflict
instead of leaking a database error.

The frontend uses Material UI, React Router, TanStack Query, React Hook Form,
and Zod. Route-level lazy loading keeps feature pages out of the initial
bundle. The production-style fallback uses isolated Docker Compose services,
one-shot migration/seed jobs, a non-root Node API, and a non-root Nginx web
runtime with SPA fallback and security headers.

## Stack

- NestJS, TypeScript, Prisma, PostgreSQL
- React, Vite, Material UI, TanStack Query
- React Hook Form and Zod
- pnpm workspace and Docker Compose
- Jest, Vitest, ESLint, Oxlint, and Prettier

## Prerequisites

- Node.js 22 or later
- pnpm 11
- Docker Desktop or compatible Docker Compose

## Development setup

1. Copy `.env.example` to `.env`.
2. Copy `apps/api/.env.example` to `apps/api/.env`.
3. Copy `apps/web/.env.example` to `apps/web/.env`.
4. Replace the JWT secret and all example seed passwords. Use the assessment
   credentials above if reproducing the verified demo environment.
5. Install dependencies with `pnpm install --frozen-lockfile`.
6. Start PostgreSQL with `pnpm db:up`.
7. Generate the Prisma client with `pnpm db:generate`.
8. Apply the development migration with `pnpm db:migrate`.
9. Seed the four roles with `pnpm db:seed`.
10. Start both applications with `pnpm dev`.

The development database persists in the `mini_erp_crm` Compose volume.
`pnpm db:down` stops the database without deleting that volume.

### Test database

The integration runner requires the separate `DATABASE_URL_TEST` configured in
`apps/api/.env`. Create that database, apply the committed migration to it, and
seed the four roles before the first integration run. Never point
`DATABASE_URL_TEST` at assessment or production data.

## Quality checks

```bash
pnpm format:check
pnpm test:ci
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:integration
pnpm test:concurrency
pnpm test:postman:validate
pnpm audit --prod
```

Verified on 2026-07-28:

- Formatting, lint, and TypeScript checks passed.
- API: 8 unit suites and 30 tests passed.
- Web: 5 test files and 13 tests passed.
- API and web optimized builds passed.
- Critical PostgreSQL integration/concurrency flow passed.
- The 26-request Postman package and its 27 scripts passed static validation.
- A dependency-free source copy passed install, generation, migration, seed,
  quality, integration, and built-startup checks.
- Production-style browser and API smoke tests passed.

GitHub Actions repeats generation, migration, seed, `test:ci`, integration, and
documentation-bundle consistency checks against PostgreSQL 17 on pushes and
pull requests to `main`.

The React Router audit advisory remaining in the dependency report applies to
its unstable React Server Components APIs. This project is a Vite SPA and does
not use those APIs; the exception and supporting evidence are documented in
the quality report.

## API documentation and Postman

- Interactive Swagger: `http://localhost:4000/api/docs`
- Collection:
  `docs/postman/Mini_ERP_CRM.postman_collection.json`
- Local environment: `docs/postman/Local.postman_environment.json`
- Runner instructions: `docs/postman/README.md`

The Postman environment intentionally leaves passwords blank. Set its four
secret variables from the assessment credential table, select the environment,
and run the collection in order.

## Production-style local deployment

The assessment fallback runs the entire stack in Docker: PostgreSQL 17,
one-shot migration and idempotent seed jobs, a non-root NestJS API, and a
non-root Nginx web server with SPA fallback and security headers.

1. Copy `.env.production.example` to `.env.production`.
2. Replace every placeholder password and secret. Keep the file uncommitted.
3. Ensure ports 4000 and 8080 are available, or change
   `PRODUCTION_API_PORT`, `PRODUCTION_WEB_PORT`, and the matching public URLs.
4. Validate with `pnpm prod:config`.
5. Start with `pnpm prod:up`.

Default endpoints:

- Web: `http://localhost:8080`
- API: `http://localhost:4000/api/v1`
- Health: `http://localhost:4000/api/v1/health`
- Swagger: `http://localhost:4000/api/docs`

Migration and seed jobs complete before the API becomes available. The
explicit Compose project name isolates this database volume from development.
`pnpm prod:down` stops the stack but intentionally retains the volume.

```bash
pnpm prod:ps
pnpm prod:logs
pnpm prod:down
```

For a hosted deployment, use the same image build, run
`pnpm --filter api prisma:migrate:deploy` as the release command, start the API
with `pnpm --filter api start:prod`, and publish `apps/web/dist`. Set
`VITE_API_BASE_URL` before the web build and set `CORS_ORIGINS` to the exact
HTTPS frontend origin. All `VITE_` values are public.

## Assumptions

- The system represents one company.
- Inventory quantities are whole numbers.
- Each product has one balance and one descriptive warehouse location.
- Users are seeded; user administration is outside scope.
- Products are deactivated rather than deleted.
- Customers are retained for history.
- Confirmed challans are immutable.
- Admin Confirmed cancellation is a full one-time reversal.
- GST is stored but is not externally validated.
- Draft product snapshots refresh on Draft edit and freeze at confirmation.
- Timestamps are stored in UTC and displayed in browser-local time.
- Authentication uses one access JWT without refresh/revocation.

## Known limitations

- Purchase orders, invoices, payments, and tax calculation are outside the
  required modules.
- This is not a multi-company or multi-warehouse ERP.
- Units of measure, batches, serial numbers, and expiry dates are not modeled.
- Registration, password reset, and user administration are not included.
- Refresh-token rotation and server-side token revocation are not included.
- Confirmed cancellation is a full reversal; partial returns and credit notes
  are not implemented.
- Customer and product records are retained instead of hard-deleted.
- No public HTTPS deployment, availability SLA, centralized alerting, or formal
  backup SLA is claimed.

## Repository structure

```text
apps/api/                 NestJS API, Prisma schema, migration, seed, tests
apps/web/                 React/Vite application and tests
docs/case-study/          Requirements-through-submission documentation
docs/evidence/            Quality and deployment verification
docs/postman/             Collection, local environment, and instructions
docker-compose.yml        Development PostgreSQL
docker-compose.production.yml
                          Complete local-production fallback
```

## Evidence

- Quality: `docs/evidence/quality/STEP_09_VERIFICATION.md`
- Clean-source rehearsal:
  `docs/evidence/quality/CLEAN_SOURCE_REHEARSAL.md`
- Deployment:
  `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md`
- Complete implementation contract: `docs/case-study/`
