# Step 9 Verification Evidence

**Project:** Mini ERP + CRM Operations Portal  
**Verification date:** 2026-07-28  
**Environment:** Windows, Node.js 24 runtime, pnpm 11.9.0, PostgreSQL 17 in Docker

## Result summary

| Gate                  | Result                                     | Evidence                                                                                                                                   |
| --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Format                | Pass                                       | Prettier checked the workspace with no differences.                                                                                        |
| Lint                  | Pass                                       | API ESLint and web Oxlint completed with zero warnings.                                                                                    |
| TypeScript            | Pass                                       | API and web type checks completed successfully.                                                                                            |
| API unit tests        | Pass                                       | 8 suites and 30 tests passed.                                                                                                              |
| Web tests             | Pass                                       | 5 files and 13 tests passed.                                                                                                               |
| Production builds     | Pass                                       | Nest build and Vite production build completed.                                                                                            |
| API integration       | Pass                                       | Isolated real-PostgreSQL critical flow passed.                                                                                             |
| Concurrency           | Pass                                       | The real-PostgreSQL stock race passed twice after the final fix.                                                                           |
| Security review       | Pass with accepted non-applicable advisory | See dependency review below.                                                                                                               |
| Responsive/manual E2E | Pass                                       | Desktop and 360 x 800 mobile role-aware flows were exercised in the in-app browser.                                                        |
| Setup rehearsal       | Pass                                       | A dependency-free source copy completed frozen install, generation, migration, seed, quality gates, integration, and built startup checks. |
| Production smoke      | Pass                                       | The isolated production-style Docker stack passed the Step 10 smoke checklist.                                                             |

## Commands and observed results

```text
pnpm test:ci
  API: 8 suites, 30 tests passed
  Web: 5 files, 13 tests passed
  Postman package: 26 requests, 27 scripts validated
  Nest production build: passed
  Vite production build: passed
  Initial web entry: 281.00 kB (88.14 kB gzip)

pnpm test:integration
pnpm test:concurrency
  Authentication: all four roles verified
  Representative allow/deny role matrix: verified
  Draft stock unchanged: verified
  Confirmed balances: [6, 1]
  Cancelled/restored balances: [10, 3]
  Repeated confirm/cancel commands: rejected
  Concurrent OUT statuses: [201, 409]
  Concurrent final stock: 3

pnpm install --frozen-lockfile --offline
  passed

docker compose config --quiet
  passed

prisma validate
  schema valid

prisma migrate status (mini_erp_test)
  database schema up to date

clean-source rehearsal
  frozen install: passed
  migration and four-role seed: passed
  test:ci and test:integration: passed
  built API readiness: HTTP 200
  built web login document: HTTP 200
```

The integration runner requires `DATABASE_URL_TEST`, starts a temporary API on
port 4012, generates unique synthetic records, and deletes those records in its
`finally` cleanup. The dedicated `mini_erp_test` database is separate from the
development database.

## Defects found and fixed

### Q-001: Challan lifecycle status-code mismatch

Confirm and cancel were documented as `200 OK` but returned Nest's default
`201 Created` for POST handlers. Both handlers now explicitly return `200`.

### Q-002: Serialization conflict leaked as HTTP 500

Two competing manual stock decrements could make PostgreSQL abort one
serializable transaction with SQLSTATE `40001`. Prisma surfaced that raw-query
conflict as `P2010`, while the service only recognized `P2034`. The inventory
service now retries recognized serialization conflicts up to three times. After
the winning transaction commits, the retry evaluates the current locked balance
and returns the expected `409 INSUFFICIENT_STOCK`. A unit test covers the retry.

## Security and contract checks

- Helmet response headers observed: Content-Security-Policy,
  `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, and
  `Referrer-Policy: no-referrer`.
- Every sampled response included an `X-Request-Id`.
- The configured frontend origin received a CORS allow-origin header; an
  untrusted origin did not.
- OpenAPI 3.0 JSON exposed 15 paths and 23 operations.
- No `$queryRawUnsafe` or `$executeRawUnsafe` call exists. The necessary raw SQL
  uses Prisma tagged templates or `Prisma.sql` parameter binding.
- Application source contains no `dangerouslySetInnerHTML`, `eval`, dynamic
  function construction, placeholder TODO/FIXME markers, or debug logging.
- Local `.env` files are ignored. Credential-like values found outside them are
  documented placeholders or synthetic unit-test values.
- A 20-request readiness burst returned 20 HTTP 200 responses with request IDs
  in approximately 202 ms on the local machine. This is a smoke result, not a
  production benchmark.

## Dependency review

`pnpm audit --prod` originally reported three High advisories.

- `effect` was overridden to 3.20.0.
- `js-yaml` was overridden to 5.2.2.
- One React Router advisory remains reported because `react-router-dom` 7.18.1
  pins core 7.18.1 and no compatible 8.x DOM package is published. The
  [GitHub advisory](https://github.com/advisories/GHSA-qwww-vcr4-c8h2)
  explicitly says it affects only applications using unstable RSC APIs. This
  project is a client-rendered Vite SPA and contains no RSC or server-action
  implementation, so the finding is accepted as non-applicable. Recheck when a
  compatible `react-router-dom` release is available.

## Browser verification recorded

- Admin desktop dashboard and navigation.
- Sales challan list, builder, historical detail, and Draft edit flow.
- Accounts read-only behavior and denied edit route.
- 360 x 800 mobile navigation drawer, drawer-close behavior, and challan list.
- No page-level horizontal overflow at the tested mobile viewport.

## Remaining external closeout

Local verification is complete. The clean-source details are recorded in
`CLEAN_SOURCE_REHEARSAL.md`, and the production-style Docker evidence is
recorded in `../deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md`.

Git author configuration, the first commit, GitHub publication, and public
deployment remain intentionally deferred. Codex did not invent or change the
user's Git identity.
