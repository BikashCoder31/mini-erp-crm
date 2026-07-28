# Step 10 Local Production Smoke Evidence

**Date:** 2026-07-28  
**Environment:** Docker Desktop, local production-style fallback  
**Result:** Pass; public HTTPS hosting remains external and unclaimed

## Release topology

The isolated Compose project `mini-erp-production` ran:

- PostgreSQL 17 Alpine with a dedicated persistent volume and health check.
- A one-shot Prisma migration job, which exited successfully.
- An idempotent seed job, which exited successfully.
- A non-root Node API container.
- A non-root Nginx web container with SPA fallback and security headers.

The final local image sizes were approximately 664 MB for the API and 82.8 MB
for the web image. The API ran as user `node`; the web image ran as UID 101.

## Infrastructure and security checks

- Aggregate API health returned HTTP 200 and confirmed database readiness.
- Swagger loaded and exposed the versioned API contract.
- The web root, deep-link SPA fallback, and `/healthz` returned HTTP 200.
- All four seeded roles authenticated and returned the expected role.
- A wrong password returned a generic HTTP 401.
- The configured frontend origin received the CORS allow-origin header.
- An untrusted origin did not receive an allow-origin header.
- Web responses included the configured content-security, frame, MIME,
  referrer, and permissions headers, including on SPA fallback responses.
- The deployed browser bundle contained no JWT secret, database URL, or seed
  password marker.
- API request logs included request ID, method, path, status, and duration
  without logging credentials or authorization headers.

## Final automated verification

- Prettier check passed for all matched files.
- API and web lint passed with zero warnings.
- API and web TypeScript checks passed.
- API unit tests passed: 8 suites and 30 tests.
- Web unit tests passed: 5 files and 13 tests.
- API and web optimized production builds passed.
- The critical integration runner passed after the production changes,
  including all four roles, representative allow/deny checks, draft stock
  invariance, confirm/cancel balance restoration, repeated-command conflicts,
  and concurrent OUT results of HTTP 201 plus HTTP 409 with final stock 3.
- The production Compose definition validated using the committed environment
  template.

## Business-flow smoke test

Using the containerized web application:

1. Sales created `Production Smoke Customer`.
2. Warehouse created product `Production Smoke Cable` with SKU `SMOKE-001`
   and opening stock 10.
3. Sales created and confirmed challan `CH-2026-000001` for quantity 3 at
   NPR 125.50, total NPR 376.50.
4. The product page showed current stock 7 and an OUT ledger entry of 3,
   recording the 10 to 7 transition and challan confirmation reference.
5. Screenshot QA exposed and corrected a mobile flex/grid intrinsic-width
   collapse. At a 360 x 800 CSS viewport, the final main content was 344.8 px,
   the page content was 312.8 px inside 16 px gutters, and the table container
   fit at 311.2 px without widening the page.
6. A clean reload after adding route hydration fallbacks produced no
   application console warnings.

The smoke records remain in the isolated local-production volume as reviewer
demo data.

## Verified endpoints

The smoke run used:

- Frontend: `http://localhost:8080`
- API: `http://localhost:4400/api/v1` (host-port override to avoid the
  concurrently running development API)
- Health: `http://localhost:4400/api/v1/health`
- Swagger: `http://localhost:4400/api/docs`

The documented defaults use API port 4000.

## Remaining external items

No public provider account, DNS name, or TLS certificate was supplied, so this
evidence does not claim a live HTTPS deployment. A final Git commit is also
pending because the repository has no configured author identity. The
assignment-supported local fallback is complete; a screen recording and final
submission assembly belong to Step 11.
