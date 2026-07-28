# Step 9 — Testing, Security, and Quality Verification

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-09  
**Version:** 1.4  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Depends on:** Steps 1–8  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`

---

## 1. Purpose

This document defines the verification strategy for the complete case study. It covers static checks, unit tests, API integration tests, real PostgreSQL transaction and concurrency tests, frontend tests, end-to-end flows, security review, validation, accessibility, responsive behavior, dependency review, performance smoke tests, defect handling, evidence, and release gates.

The objective is not to maximize test count. It is to prove the correctness of the highest-risk business behavior and prevent a visually polished but unreliable submission.

---

## 2. Source-derived quality expectations

**[SOURCE]** The backend must provide proper validation and error handling.

**[SOURCE]** APIs must use appropriate HTTP status codes, clear errors, pagination, search, and filtering where needed.

**[SOURCE]** Stock must not go negative, and insufficient stock must produce a proper API error.

**[SOURCE]** The frontend must be responsive.

**[SOURCE]** The repository, README, deployment/local setup, Postman/API documentation, architecture explanation, assumptions, and known limitations form part of the evaluated submission.

The assignment does not prescribe a coverage percentage, testing framework, security scanner, or formal certification.

---

## 3. Verification principles

1. Test behavior, not internal implementation details.
2. Use real PostgreSQL for transaction and concurrency tests.
3. Keep tests deterministic and independently repeatable.
4. Prioritize stock, challan lifecycle, authorization, and rollback.
5. Test both success and failure paths.
6. Treat backend authorization as mandatory even when the UI hides actions.
7. Use API contract assertions, not only screenshots.
8. Do not claim a test, browser, deployment, or security result that was not actually run.
9. Preserve evidence from the final submitted commit.
10. Fix defects before adding bonus features.

---

## 4. Quality gates

A release candidate must pass:

```text
format check
lint
TypeScript typecheck
backend tests
frontend tests
API integration tests
critical PostgreSQL concurrency tests
production builds
local full-flow smoke test
security checklist
responsive/accessibility checks
deployment smoke test or documented local alternative
```

Recommended root commands:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:ci
pnpm build
```

Database-dependent tests use explicit scripts such as:

```bash
pnpm --filter api test:integration
pnpm --filter api test:concurrency
```

The final script names must match the repository.

---

## 5. Test environments

### 5.1 Unit environment

- Mock external dependencies narrowly.
- No shared production data.
- Fast execution.

### 5.2 Integration environment

- Dedicated PostgreSQL database.
- Same migrations as production.
- Test-specific JWT secret and users.
- Data reset between tests/suites.
- Never point to production.

Example separate URL:

```env
DATABASE_URL_TEST=postgresql://.../mini_erp_test
```

### 5.3 Frontend test environment

- jsdom for component tests.
- Mock Service Worker or explicit API mocks if adopted.
- Stable mocked dates where needed.

### 5.4 End-to-end environment

- Running web and API.
- Dedicated database/schema.
- Seeded role accounts.
- Deterministic cleanup.

### 5.5 Production smoke environment

- Read/write only against assessment demonstration data.
- Do not run destructive reset scripts.
- Capture final URL and timestamp.

---

## 6. Test data policy

- Use factories/builders for users, customers, products, and challans.
- Give generated SKUs/emails unique suffixes.
- Set explicit stock values for business-rule tests.
- Avoid relying on test execution order.
- Freeze or inject current time for numbering/date tests where practical.
- Never use real customer personal data.
- Clean database state with transactions, truncation, or schema recreation according to test design.

Concurrency tests cannot always use per-test rollback transactions because independent database connections must observe locks. They require explicit cleanup.

---

## 7. Static quality checks

### 7.1 Formatting

- Prettier check passes.
- No hand-formatted exceptions without justification.

### 7.2 Linting

- No lint errors.
- Warnings reviewed; avoid ignoring meaningful rules.
- No broad `eslint-disable` blocks without explanation.

### 7.3 TypeScript

- `noImplicitAny`/strict configuration appropriate to generated scaffolds.
- No unjustified `any` in domain services or API responses.
- Frontend API types reflect contracts.
- Production build has no TypeScript errors.

### 7.4 Dead code and logs

- Remove temporary debug logs.
- Remove unused components/routes.
- No commented-out secrets or test credentials.
- No placeholder `TODO` affecting P0 behavior.

---

## 8. Requirement-to-test traceability

| Requirement | Primary verification |
|---|---|
| Four role login | Auth integration tests and manual login. |
| Role-based access | Endpoint role matrix tests plus UI tests. |
| Customer add/edit/search/detail | Customer API and frontend tests. |
| Follow-up notes | Transaction test and detail timeline test. |
| Product add/edit | Product API and form tests. |
| Movement log fields | Movement response/database assertions. |
| Multiple challan products | Draft API/UI test. |
| Automatic number | Uniqueness and format tests. |
| Draft/Confirmed/Cancelled | Lifecycle transition tests. |
| Confirmation reduces stock | Transaction assertion. |
| Stock never negative | Manual OUT and concurrent challan tests. |
| Insufficient stock error | 409 contract and rollback test. |
| Product snapshots | Snapshot stability test after product edit. |
| Validation/status/errors | Contract suite. |
| Pagination/search/filter | API and UI query tests. |
| Responsive admin UI | Viewport matrix and screenshots. |
| Local/deployment docs | Clean setup rehearsal. |
| Postman/API docs | Collection execution and Swagger check. |

---

## 9. Backend unit-test scope

### 9.1 Configuration/common layer

- Environment validation.
- Error mapping.
- Pagination parser.
- Request ID behavior.
- Decimal/date response mapping.

### 9.2 Authentication

Defined in Step 4:

- Credential validation.
- JWT claims.
- Active user check.
- Role guard.
- Generic login errors.

### 9.3 Customers

Defined in Step 5:

- Normalization.
- Search/filter construction.
- Follow-up transaction behavior.
- GST normalization and duplicate-tolerant behavior.

### 9.4 Products/inventory

Defined in Step 6:

- Opening stock transaction.
- Manual IN/OUT.
- Low stock.
- Negative-stock failure.

### 9.5 Challans

Defined in Step 7:

- Snapshot generation.
- Totals.
- Number formatting.
- Lifecycle checks.
- Confirmation/cancellation behavior.

Mock-based unit tests do not replace database transaction tests.

---

## 10. API integration-test baseline

Every route group must verify:

- Required authentication.
- Allowed roles.
- Forbidden roles.
- Valid request response.
- Validation failure.
- Missing resource.
- Domain conflict where applicable.
- Correct response envelope.
- No sensitive fields.

Recommended toolchain:

- Nest testing module.
- Supertest.
- Real test database.
- Seed/factory utilities.

---

## 11. Authentication/authorization matrix tests

Automate at least one representative write per capability:

| Capability | Allowed proof | Forbidden proof |
|---|---|---|
| Customer write | Sales/Admin 201/200 | Warehouse/Accounts 403 |
| Follow-up write | Sales/Admin 201 | Warehouse/Accounts 403 |
| Product write | Warehouse/Admin 201/200 | Sales/Accounts 403 |
| Stock adjustment | Warehouse/Admin 201 | Sales/Accounts 403 |
| Challan create/edit/confirm | Sales/Admin success | Warehouse/Accounts 403 |
| Confirmed cancellation | Admin success | Sales/Warehouse/Accounts 403 |
| Read operational records | Each role 200 | Unauthenticated 401 |

Also test:

- Expired JWT.
- Wrong issuer/audience.
- Inactive user.
- Manipulated role in request body.

---

## 12. Validation contract tests

Test:

- Unknown fields rejected.
- Invalid UUIDs rejected.
- Invalid enums rejected.
- Empty required strings rejected.
- Maximum lengths.
- Invalid email.
- Negative price/stock/threshold.
- Fractional quantity.
- Zero quantity.
- Invalid date and reversed date range.
- Page/limit bounds.
- Unknown sort fields.
- Duplicate product lines.

Verify `400 VALIDATION_FAILED` with field details where applicable.

---

## 13. Database constraint tests

Directly or through API, prove:

- Unique user email.
- Unique SKU.
- GST remains optional and is not constrained unique; repeated business tax identifiers are accepted in this scope.
- Non-negative product stock.
- Non-negative unit price.
- Positive challan-item quantity.
- Positive movement quantity.
- Movement before/after direction check.
- Foreign keys prevent historical orphaning.
- Challan number unique.
- Duplicate confirmation/cancellation movement blocked.

Application errors should normally prevent these failures, but constraints are defense in depth.

---

## 14. Inventory transaction tests

### 14.1 Opening stock

Assert product and movement commit together.

### 14.2 Manual OUT failure

Assert:

```text
stock unchanged
movement count unchanged
409 response
```

### 14.3 Manual OUT concurrency

Initial stock 10, two parallel OUT 7 requests:

```text
one success
one conflict
final stock 3
one movement
```

### 14.4 Movement chain

Verify each row's `balanceBefore` matches prior `balanceAfter` and final balance equals product current stock.

---

## 15. Challan transaction tests

Mandatory:

1. Draft does not affect stock.
2. Draft edit does not affect stock.
3. Confirmation deducts all lines.
4. Confirmation creates one linked movement per line.
5. Snapshot values remain stable after product edit.
6. Server ignores/does not accept forged snapshots and totals.
7. One insufficient line rolls back all products.
8. Confirmation twice deducts once.
9. Competing challans cannot oversell.
10. Opposite product order does not introduce unsafe lock ordering.
11. Draft cancellation has no stock effect.
12. Confirmed cancellation restores all stock once.
13. Concurrent cancellation restores once.
14. Sales cannot cancel Confirmed.
15. Inactive product blocks confirmation without side effects.

These tests are the release's most important evidence.

---

## 16. Concurrency-test implementation guidance

- Use separate database connections/transactions.
- Synchronize request start with a barrier where practical.
- Execute through the API or service with real transaction boundaries.
- Use `Promise.allSettled` to capture both outcomes.
- Assert database state after both complete.
- Repeat the test multiple times locally to detect intermittent races.
- Keep product quantities small and deterministic.
- Clean test records afterward.

A single sequential test is not evidence of concurrency safety.

---

## 17. API response contract tests

Verify:

- Single-resource envelope contains `data`.
- List envelope contains `data` and complete `meta`.
- Errors contain code, message, details, and request ID.
- Decimal values are strings.
- Dates are ISO strings.
- Password hashes and JWT secrets never appear.
- 201 used for creates.
- 200 used for reads/updates/commands with response.
- 401, 403, 404, 409 are distinguished correctly.

Use snapshots sparingly; explicit assertions are more maintainable for contracts.

---

## 18. Pagination/search/filter tests

For customers, products, movements, and challans:

- Default page/limit.
- Custom page/limit.
- Maximum limit enforcement.
- Correct total and totalPages.
- Search is case-insensitive.
- Combined filters use expected AND/OR semantics.
- Sorting whitelist.
- Empty results return valid metadata, not 404.
- Invalid filter values return 400.

---

## 19. Postman collection verification

The final collection must include folders:

```text
Auth
Customers
Products
Inventory
Challans
Health
```

Environment variables:

```text
baseUrl
adminToken
salesToken
warehouseToken
accountsToken
customerId
productId1
productId2
challanId
```

Collection tests should assert:

- Status code.
- Response envelope.
- IDs saved for later requests.
- Authentication token stored after login.
- Critical errors such as insufficient stock.

Run through Postman Collection Runner or Newman if installed. Export the final collection and environment without real secrets beyond documented assessment credentials.

---

## 20. Swagger verification

- Every endpoint appears under correct tag.
- Bearer authentication works in Swagger UI.
- DTO required/optional fields match implementation.
- Enum values are visible.
- Request and response examples are accurate.
- Error examples do not expose internals.
- Deployed server URL is accurate if listed.

Swagger is not complete when it merely lists controllers with undocumented schemas.

---

## 21. Frontend component/integration tests

### Shared

- App auth restoration.
- Protected and role routes.
- API error mapping.
- Form field/server error mapping.
- Loading/empty/error components.

### Customer

- Search/filter URL behavior.
- Write actions by role.
- Create/edit forms.
- Follow-up timeline update.

### Product/inventory

- Low-stock state.
- Stock adjustment form.
- Insufficient-stock conflict.
- Movement history.

### Challan

- Multiple line editor.
- Duplicate prevention.
- Totals preview.
- Save Draft.
- Confirm conflict details.
- Status-based actions.
- Admin-only Confirmed cancellation.

Use accessible queries (`getByRole`, labels, names) rather than implementation-specific selectors where practical.

---

## 22. End-to-end test

A focused E2E test should verify the highest-value cross-module flow:

```text
Sales login
create customer
add follow-up
create Draft challan with two seeded products
confirm challan
verify Confirmed detail
verify product stock/movements
Admin login
cancel Confirmed challan
verify Cancelled and restored stock
```

Optional second E2E:

```text
create excessive Draft
confirmation fails
Draft remains
no stock changes
```

E2E tests complement, not replace, service/database concurrency tests.

---

## 23. Security review scope

The security review covers:

- Authentication.
- Authorization.
- Password handling.
- JWT validation.
- Login throttling.
- Secret management.
- Input validation.
- SQL injection prevention.
- XSS prevention.
- CORS.
- Security headers.
- Error/log data exposure.
- Dependency vulnerabilities.
- Deployment configuration.

It does not claim penetration testing or formal compliance certification.

---

## 24. Authentication security checks

- Passwords hashed with tested bcrypt settings.
- Login uses generic errors.
- Inactive user rejected.
- JWT algorithm, issuer, audience, and expiration validated.
- Secret length startup validation.
- Token not placed in URL.
- No token/password in logs.
- Rate limit returns 429.
- Session clears on logout/401.
- Known limitation of no revocation is documented.

---

## 25. Authorization security checks

- Every write endpoint has backend role enforcement.
- State-dependent cancellation checked inside transaction.
- Creator/audit IDs always come from authenticated user.
- Request body cannot set role, audit IDs, status, snapshots, totals, or stock directly.
- Accounts role remains read-only.
- ID enumeration does not bypass permission.
- UI-hidden controls are tested through direct API calls.

---

## 26. Injection and input-security checks

- Prisma parameterization used for ordinary queries.
- Raw `FOR UPDATE` SQL uses parameterized APIs.
- No string concatenation of IDs, sort fields, or search into SQL.
- Sort fields use whitelists.
- Unknown DTO fields rejected.
- Text rendered as text, not raw HTML.
- File upload is absent unless bonus implementation adds a separate review.
- Request body size is reasonable.

---

## 27. Browser security checks

- No `dangerouslySetInnerHTML` for user data.
- Bearer token stored only in session storage under current design.
- Explicit production CORS origin.
- HTTPS URLs.
- Helmet/security headers visible on API responses where supported.
- No secret `VITE_` variables.
- External links use safe attributes when present.
- Optional CSP is configured through hosting or headers if it does not break the app.

---

## 28. Error and logging security

- Production responses contain no stack traces.
- Prisma/database messages mapped to stable errors.
- Request ID enables debugging.
- Authorization header redacted.
- Password fields redacted.
- Database URL and environment values redacted.
- Customer notes are not unnecessarily logged.
- Logs do not claim successful commit before transaction completes.

---

## 29. Secret/repository scan

Before submission, search tracked files and history for:

- `.env`.
- `DATABASE_URL` with credentials.
- JWT secret values.
- Bearer tokens.
- Seed passwords.
- Cloud provider keys.
- Private deployment URLs if not intended.

Useful checks:

```bash
git status --short
git ls-files | grep -E '(^|/)\.env($|\.)'
git grep -n -I -E 'JWT_SECRET=|DATABASE_URL=.*@|Bearer [A-Za-z0-9_-]+'
```

Interpret results manually; variable names in `.env.example` are expected, secret values are not.

---

## 30. Dependency review

Run the package-manager audit available to the project:

```bash
pnpm audit --prod
```

Also:

- Review direct dependencies.
- Remove unused packages.
- Commit lockfile.
- Record unresolved advisories with actual reachability and mitigation.
- Do not perform risky major upgrades immediately before submission without retesting.

No claim of “zero vulnerabilities” should be made unless the actual final audit supports it.

---

## 31. Accessibility verification

Manual and automated checks:

- Keyboard navigation through login, lists, forms, dialogs, and challan editor.
- Visible focus.
- Form labels and errors.
- Heading order.
- Status/movement direction not color-only.
- Dialog focus trap and return.
- Icon-button accessible names.
- Contrast check for key text/statuses.
- Mobile zoom and no blocked orientation.
- Automated accessibility scan where available.

Record findings and fixes. Do not claim formal WCAG conformance without a complete audit.

---

## 32. Responsive verification

Use the Step 8 viewport matrix. For each core page capture:

- No horizontal page overflow.
- Navigation usable.
- Forms fit.
- Tables adapt.
- Dialogs fit.
- Challan items remain editable.
- Important actions remain reachable.

At minimum capture mobile and desktop screenshots for:

- Login.
- Customer list/detail/form.
- Product list/detail/adjustment.
- Challan builder/detail.

---

## 33. Performance and reliability smoke tests

The assignment does not require load testing, but verify:

- Paginated list response with representative data.
- Search remains responsive.
- No N+1 explosion visible in logs for common list/detail operations.
- Health endpoint is lightweight.
- Production cold start behavior is understood.
- Confirmation transaction completes without external calls.
- Frontend bundle builds successfully and avoids obviously excessive assets.
- API handles a modest burst of read requests without errors.

Record qualitative results rather than inventing performance metrics.

---

## 34. Production build verification

Backend:

```bash
pnpm --filter api build
NODE_ENV=production pnpm --filter api start:prod
```

Frontend:

```bash
pnpm --filter web build
pnpm --filter web preview
```

Verify that development-only assumptions do not hide missing environment values or route behavior.

---

## 35. Clean-setup rehearsal

Before final submission:

```text
1. Use a clean directory or fresh clone.
2. Follow README exactly.
3. Create environment files only from examples.
4. Start database.
5. Install dependencies.
6. Apply migrations.
7. Seed users.
8. Start API and web.
9. Complete the core demo.
```

Any undocumented correction discovered during rehearsal must update README and relevant step document.

---

## 36. Defect severity

| Severity | Definition | Release rule |
|---|---|---|
| Critical | Data corruption, negative stock, auth bypass, unusable core flow. | Must fix. |
| High | Required module/action fails, rollback broken, deployment unusable. | Must fix. |
| Medium | Important UX/error/responsive issue with workaround. | Fix if feasible; otherwise disclose. |
| Low | Cosmetic or minor non-core issue. | May disclose/defer. |

No Critical or High known defect may remain in a submission described as complete.

---

## 37. Test failure policy

- Do not mark flaky tests as ignored without investigation.
- Fix deterministic root causes.
- If an external free-host issue prevents production verification, preserve local evidence and document the issue honestly.
- Do not alter assertions merely to make a failing business rule pass.
- Quarantining a noncritical test requires a recorded reason and limitation.

---

## 38. Evidence package

Recommended structure:

```text
docs/evidence/
├── quality/
│   ├── format.txt
│   ├── lint.txt
│   ├── typecheck.txt
│   ├── build.txt
│   └── dependency-audit.txt
├── tests/
│   ├── unit.txt
│   ├── integration.txt
│   ├── concurrency.txt
│   ├── frontend.txt
│   └── e2e.txt
├── api/
│   ├── postman-run.json
│   └── swagger-screenshot.png
├── responsive/
└── deployment/
```

Do not commit huge raw artifacts unnecessarily. Small text summaries and selected screenshots are sufficient. Redact tokens and passwords.

---

## 39. Final verification matrix

| Area | Owner | Command/evidence | Result |
|---|---|---|---|
| Format | Candidate | `pnpm format:check` | Pass |
| Lint | Candidate | `pnpm lint` | Pass |
| Typecheck | Candidate | `pnpm typecheck` | Pass |
| Unit tests | Candidate | `pnpm test:ci` | Pass: API 30, web 13 |
| Integration | Candidate | `pnpm test:integration` | Pass |
| Concurrency | Candidate | `pnpm test:concurrency` | Pass twice |
| Frontend | Candidate | Vitest output | Pass: 13 tests |
| E2E | Candidate | In-app browser manual recording | Pass for critical role flows |
| Security | Candidate | Checklist and `pnpm audit --prod` | Pass with one non-applicable RSC advisory |
| Responsive | Candidate | Desktop and 360 x 800 browser checks | Pass |
| Clean setup | Candidate | Dependency-free clean-source rehearsal | Pass |
| Production smoke | Candidate | Step 10 checklist | Pass for local-production fallback |

Results are filled only after execution.

---

## 40. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Tests mock away transaction behavior. | Real PostgreSQL integration/concurrency suite. |
| Coverage metric creates false confidence. | Requirement traceability and critical assertions. |
| Production differs from local. | Production build and deployment smoke tests. |
| Role bypass is missed because UI hides controls. | Direct API role matrix tests. |
| Secrets appear in evidence. | Redaction and repository scan. |
| Responsive check is limited to one page. | Core-page viewport matrix. |
| Free hosting cold start is mistaken for failure. | Warm-up/document expected behavior and health checks. |
| Last-minute dependency upgrade breaks app. | Lock versions; update only with full regression. |
| Flaky concurrency test is skipped. | Repeat, investigate, and keep deterministic setup. |

---

## 41. Step 9 acceptance criteria

Documentation is complete when:

- [x] Quality gates and test environments are defined.
- [x] Requirement traceability is defined.
- [x] Unit, integration, contract, concurrency, frontend, and E2E scopes are defined.
- [x] Security, repository, dependency, accessibility, responsive, and performance checks are defined.
- [x] Defect policy, evidence structure, and final matrix are defined.

Implementation verification is complete only when:

- [x] All static quality commands pass.
- [x] Critical unit/integration tests pass.
- [x] Real PostgreSQL concurrency tests pass repeatedly.
- [x] Role matrix and error contracts pass.
- [x] Frontend and E2E critical flow pass.
- [x] No applicable Critical/High defects remain.
- [x] Security/repository/dependency review is complete.
- [x] Responsive/accessibility checks are recorded.
- [x] Clean-source setup rehearsal passes.
- [x] Verification evidence references are recorded; final commit is a Step 11 publication item.

---

## 42. Planned deliverables and evidence

Expected artifacts:

```text
apps/api/test/**
apps/api/src/**/*.spec.ts
apps/web/src/**/*.test.tsx
e2e/**
docs/evidence/**
docs/postman/**
```

Evidence placeholders remain in Section 39 until implementation.

---

## 43. Handoff to Step 10

Step 10 must deploy or package the verified system without changing business behavior. It must define:

- Local and production environment variables.
- Database provisioning and migrations.
- Seed strategy.
- Frontend/API hosting.
- CORS and URLs.
- Health checks and logs.
- Deployment order.
- Rollback/recovery.
- Production smoke tests.
- A complete no-deployment alternative if hosting fails.

---

## 44. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined the full quality, test, security, accessibility, responsive, evidence, and release-gate strategy. |
| 1.1 | 2026-07-28 | Aligned GST tests with the non-unique customer-data contract and retained duplicate-movement constraint verification. |
| 1.2 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.3 | 2026-07-28 | Recorded passing static, unit, integration, repeated PostgreSQL concurrency, browser, security, setup, and build evidence; retained deployment and final-commit gates as pending. |
| 1.4 | 2026-07-28 | Completed the dependency-free clean-source rehearsal and local-production smoke verification; retained only external repository/publication closeout. |
