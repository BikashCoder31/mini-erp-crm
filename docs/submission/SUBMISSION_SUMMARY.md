# Full Stack Developer Case Study Submission

**Project:** Mini ERP + CRM Operations Portal  
**Candidate:** To be supplied by the candidate  
**Repository:** https://github.com/BikashCoder31/mini-erp-crm  
**Verified implementation commit:** Recorded after the initial publication

## Access

This submission uses the assignment-supported verified local fallback; it does
not claim public HTTPS hosting.

- Development web: `http://localhost:5173`
- Development API: `http://localhost:4000/api/v1`
- Production-style Docker web: `http://localhost:8080`
- Production-style Docker API: `http://localhost:4000/api/v1` by default
- Health: `/api/v1/health`
- Swagger: `/api/docs`

## Assessment credentials

| Role      | Email                   | Password source           |
| --------- | ----------------------- | ------------------------- |
| Admin     | `admin@example.com`     | `ADMIN_SEED_PASSWORD`     |
| Sales     | `sales@example.com`     | `SALES_SEED_PASSWORD`     |
| Warehouse | `warehouse@example.com` | `WAREHOUSE_SEED_PASSWORD` |
| Accounts  | `accounts@example.com`  | `ACCOUNTS_SEED_PASSWORD`  |

Passwords are intentionally excluded from the public repository. Provide the
assessment-only values to the evaluator through a private channel.

These are assessment-only application credentials. Database and JWT secrets
are not included.

## What to review

- Setup, architecture, business rules, roles, and limitations: `README.md`
- API exploration: Swagger or `docs/postman/`
- Quality verification: `docs/evidence/quality/STEP_09_VERIFICATION.md`
- Production-style smoke test:
  `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md`
- Requirements-to-submission documentation: `docs/case-study/`

## Verification snapshot

- Formatting, lint, and TypeScript checks passed.
- API unit tests: 8 suites, 30 tests passed.
- Web unit tests: 5 files, 13 tests passed.
- Optimized API and web builds passed.
- Critical PostgreSQL integration/concurrency runner passed.
- Full local-production customer, product, stock-ledger, and challan flow
  passed on desktop and mobile viewports.
- Exact-origin CORS, generic login failure, security headers, SPA fallback,
  non-root containers, migration, seed, and secret scans passed.

## Architecture summary

The pnpm monorepo contains a React/Vite/Material UI frontend and a NestJS REST
API backed by PostgreSQL through Prisma. JWT guards enforce four fixed roles.
Stock is changed only through immutable ledger movements. Draft challans do
not affect inventory; confirmation locks the involved products, validates all
balances, writes snapshot-backed OUT movements, and transitions state in one
serializable transaction. Admin cancellation restores all item quantities once
through reversal movements.

## Honest boundaries

- Public repository, hosting, TLS, final commit, and recording links require
  candidate-owned accounts or identity and remain pending.
- The local-production fallback is the verified deployment deliverable.
- This is a case-study operations portal, not a multi-company,
  multi-warehouse enterprise ERP.
