# Step 10 Public Deployment Smoke Evidence

**Date:** 2026-07-29
**Environment:** Public assessment
**Result:** Pass

## Endpoints

- Repository: <https://github.com/BikashCoder31/mini-erp-crm>
- Frontend: <https://mini-erp-crm-web.onrender.com>
- API: <https://mini-erp-crm-api.onrender.com/api/v1>
- Ready health: <https://mini-erp-crm-api.onrender.com/api/v1/health/ready>
- Swagger: <https://mini-erp-crm-api.onrender.com/api/docs>

## Verified checks

- The public frontend returned HTTP 200 repeatedly and served the expected
  production HTML and hashed assets.
- A direct request to `/dashboard` loaded through the static-site SPA rewrite
  and redirected an unauthenticated browser to
  `/login?returnTo=%2Fdashboard`.
- The API ready endpoint returned HTTP 200.
- The login preflight returned HTTP 204 with
  `Access-Control-Allow-Origin: https://mini-erp-crm-web.onrender.com`.
- Admin browser login reached the production dashboard.
- The authenticated Customers page loaded successfully from the production API
  and displayed the expected empty-database state.
- The browser console contained no warnings or errors during login, dashboard,
  and Customers-page verification.
- Direct API authentication was verified for Admin, Sales, Warehouse, and
  Accounts seed roles. Authenticated Customers, Products, and Challans list
  requests returned valid empty pages on the fresh assessment database.
- GitHub Actions quality gates passed for the static-site build fix and final
  production CORS update.

## Operational note

The assessment uses free hosting, so the API may cold-start after inactivity.
The Docker local-production fallback remains available in the repository. No
password, database URL, JWT secret, or provider token is recorded in this
evidence file.
