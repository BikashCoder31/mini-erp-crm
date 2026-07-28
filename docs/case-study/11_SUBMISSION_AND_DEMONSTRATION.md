# Step 11 — Submission and Demonstration

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-11  
**Version:** 1.4  
**Documentation status:** Complete  
**Implementation status:** In Progress  
**Date:** 2026-07-28  
**Depends on:** Steps 1–10  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`

---

## 1. Purpose

This document defines the final submission package and demonstration procedure. It ensures that the evaluator can access, run, understand, and verify the project without guessing. It covers repository quality, URLs, credentials, README, Postman/Swagger, architecture explanation, screen recording, evidence, assumptions, limitations, final checks, and the submission message.

This document must be completed with real values only after implementation and verification. Placeholders must not be presented as completed evidence.

---

## 2. Source-derived submission requirements

**[SOURCE]** The final submission must contain:

- GitHub repository link.
- Live frontend URL.
- Live backend API URL.
- Test login credentials for all roles.
- Postman collection or API documentation.
- README with setup and deployment instructions.
- Short explanation of architecture.
- Known limitations or incomplete parts.

**[SOURCE]** When live deployment is not provided, the candidate must provide a working local setup, full-flow screen recording, Postman collection, and clear README instructions.

**[SOURCE]** Bonus items are optional and include Docker, GitHub Actions, invoice PDF export, and product image upload to AWS S3.

---

## 3. Submission principles

1. Make the evaluator's first five minutes easy.
2. Put required links and credentials near the top of README/submission.
3. Verify every link in a logged-out/incognito browser.
4. Do not claim a feature, test, host, browser, or security property that was not verified.
5. Explain scope decisions rather than apologizing for intentionally excluded features.
6. Keep credentials assessment-only.
7. Preserve a local fallback even when deployment succeeds.
8. Record the exact final commit.
9. Use a concise demonstration that proves the business flow.
10. Submit before the deadline with buffer for upload/link failures.

---

## 4. Final deliverable manifest

| Deliverable | Required | Status | Final reference |
|---|---:|---|---|
| GitHub repository | Yes | Complete | `https://github.com/BikashCoder31/mini-erp-crm` |
| Frontend URL | Yes unless local fallback accepted | Complete locally | `http://localhost:8080` Docker fallback |
| Backend/API URL | Yes unless local fallback accepted | Complete locally | `http://localhost:4000/api/v1` default |
| Health URL | Strongly recommended | Complete locally | `/api/v1/health` |
| Swagger/OpenAPI URL | Recommended | Complete locally | `/api/docs` |
| Four role credentials | Yes | Complete | `README.md` evaluator section |
| Postman collection | Yes/API docs alternative | Complete | `docs/postman/Mini_ERP_CRM.postman_collection.json` |
| Postman environment | Recommended | Complete | `docs/postman/Local.postman_environment.json` |
| README setup instructions | Yes | Complete | `README.md` |
| Deployment instructions | Yes | Complete | `README.md` and Step 10 |
| Architecture explanation | Yes | Complete | `README.md` |
| Assumptions | Yes per documentation expectation | Complete | `README.md` |
| Known limitations/incomplete work | Yes | Complete | `README.md` |
| Full-flow recording | Required if not deployed; recommended regardless | Pending | — |
| Screenshots | Recommended | Complete | `docs/screenshots/` |
| Final test/evidence summary | Recommended | Complete | `docs/evidence/` |
| Final commit/tag | Recommended | Complete | `case-study-submission-v1` |

---

## 5. Repository presentation

Recommended root:

```text
mini-erp-crm/
├── apps/
│   ├── api/
│   └── web/
├── docs/
│   ├── case-study/
│   ├── postman/
│   ├── screenshots/
│   └── evidence/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

Repository must not contain:

- `.env`.
- Real database credentials.
- JWT secret.
- Access tokens.
- `node_modules`.
- Build output unless intentionally required by host.
- Unnecessary large recordings.
- Temporary debug files.
- Private personal documents.

---

## 6. Git quality checklist

- [ ] Commit history shows meaningful progression.
- [ ] No giant “final project” commit replacing all work.
- [ ] Commit messages describe feature/fix/docs intent.
- [ ] Main branch builds and runs.
- [ ] Working tree is clean at submission.
- [ ] Final commit hash recorded.
- [ ] Optional tag such as `case-study-submission-v1` created.
- [ ] No secrets exist in tracked files or recent history.
- [ ] Repository visibility permits evaluator access.
- [ ] Default branch is correct.

Suggested final commits:

```text
test: complete critical integration and concurrency coverage
docs: add postman deployment and architecture documentation
fix: resolve final responsive and production issues
chore: prepare verified case study submission
```

Do not rewrite public history after sending the repository link unless a critical correction is communicated.

---

## 7. README required structure

```text
1. Project title and concise summary
2. Live links
3. Demo credentials
4. Key features
5. Architecture and technology stack
6. Role and permission summary
7. Critical business rules
8. Screenshots or recording link
9. Prerequisites
10. Environment variables
11. Local setup
12. Database migrations and seed
13. Run commands
14. Tests and quality commands
15. API documentation/Postman
16. Deployment instructions
17. Assumptions
18. Known limitations/incomplete parts
19. Repository structure
20. Final verification status
```

README must reflect actual scripts and URLs. It must not copy planned commands without testing them from a clean clone.

---

## 8. README opening template

```markdown
# Mini ERP + CRM Operations Portal

A full-stack case-study application for a wholesale/distribution company. It supports role-based access, customer CRM and follow-ups, product/inventory management, stock movement audit history, and transactional sales challans with product snapshots and negative-stock prevention.

## Live application

- Frontend: <verified URL>
- API: <verified URL>/api/v1
- Health: <verified URL>/api/v1/health
- Swagger: <verified URL>/api/docs

## Demo credentials

See the role table below. These credentials are for the assessment environment only.
```

Remove unavailable links rather than leaving placeholder text in the submitted README.

---

## 9. Credentials table

Fill with actual assessment values:

| Role | Email | Password | Primary demonstration |
|---|---|---|---|
| Admin | `admin@example.com` | `<assessment-password>` | Full access and Confirmed cancellation. |
| Sales | `sales@example.com` | `<assessment-password>` | Customer CRM and challan workflow. |
| Warehouse | `warehouse@example.com` | `<assessment-password>` | Product and stock management. |
| Accounts | `accounts@example.com` | `<assessment-password>` | Read-only operational access. |

Rules:

- Test every credential after final deployment.
- Ensure passwords are copied accurately.
- Do not use these passwords elsewhere.
- If sharing by email, they are intentionally assessment credentials; infrastructure secrets remain private.

---

## 10. Architecture explanation template

A concise final explanation may use:

```text
The project is a pnpm monorepo with a React/TypeScript frontend and a NestJS/TypeScript REST API. PostgreSQL stores users, customers, follow-up history, products, stock movements, challans, and product snapshot line items. Prisma provides typed persistence and migrations. JWT authentication establishes four fixed roles, while backend guards and state-aware service checks enforce authorization.

The critical inventory workflow is implemented transactionally. Draft challans do not alter stock. Confirmation locks the challan and all involved products in deterministic order, validates every available balance, deducts stock, creates immutable OUT movement records, and marks the challan Confirmed in one database transaction. Any insufficient line rolls back the entire operation. Product name, SKU, category, price, and warehouse location are stored as challan-item snapshots so historical records remain stable after product changes.

The frontend uses Material UI, React Router, TanStack Query, React Hook Form, and Zod to provide a responsive role-aware admin interface. Deployment uses <actual frontend>, <actual API>, and <actual database>, with environment variables and committed migrations.
```

Replace hosting placeholders and keep only claims supported by the implementation.

---

## 11. Feature summary for README

Core:

- JWT login for four roles.
- Backend role enforcement.
- Customer create/edit/search/filter/detail.
- Append-only CRM follow-up history.
- Product create/edit/search/filter.
- Opening stock and manual IN/OUT movements.
- Immutable stock movement audit trail.
- Low-stock indicators.
- Draft challan creation/editing.
- Automatic unique challan numbers.
- Server-generated product snapshots.
- Atomic multi-product confirmation.
- Detailed insufficient-stock error and rollback.
- Cancelled lifecycle with documented reversal behavior.
- Responsive admin UI.
- Swagger/Postman and setup/deployment documentation.

Do not list bonus work unless implemented and verified.

---

## 12. Role summary for README

| Role | Main access |
|---|---|
| Admin | All modules, product/stock writes, customer/challan writes, Confirmed cancellation. |
| Sales | Customer CRM, Draft/Confirm challans, operational reads. |
| Warehouse | Product and stock writes, operational reads. |
| Accounts | Read-only customer, product, movement, and challan views. |

Mention that frontend visibility mirrors, but does not replace, backend authorization.

---

## 13. Critical business-rule summary

The README/demo must explicitly state:

- Draft challans do not change stock.
- Confirmation is atomic.
- Stock cannot become negative.
- Any insufficient item prevents all deductions.
- Product snapshots preserve historical values.
- Confirmed challans are immutable.
- Repeated confirmation cannot deduct twice.
- Confirmed cancellation is Admin-only and restores stock once under the documented assumption.

These statements should be easy for the evaluator to verify.

---

## 14. Postman package

Recommended files:

```text
docs/postman/
├── Mini_ERP_CRM.postman_collection.json
├── Local.postman_environment.json
└── README.md
```

Collection order:

```text
00 Health
01 Auth
02 Customers
03 Products
04 Inventory
05 Challans
06 Error and authorization examples
```

The collection should:

- Store tokens automatically after role login requests.
- Store created IDs.
- Demonstrate full happy path.
- Demonstrate 403 role denial.
- Demonstrate insufficient stock.
- Include concise request descriptions.
- Avoid embedded infrastructure secrets.

The local environment may use placeholder passwords, with the actual credentials documented separately.

---

## 15. Swagger/API documentation

Submission should provide:

- Swagger URL for deployed API when available.
- Exported OpenAPI JSON optionally committed.
- Bearer-auth instructions.
- Accurate DTO schemas and enums.
- Standard errors.

Postman or API docs satisfy the assignment, but providing both improves usability when they remain consistent.

---

## 16. Screen-recording objective

The recording should prove the complete flow without becoming a long narrated coding session.

Recommended duration:

```text
approximately 8–12 minutes
```

This is a planning target, not an assignment limit.

Record:

- Browser window at readable resolution.
- URL when helpful.
- Role transitions.
- API/Swagger/Postman evidence for critical transaction behavior.
- No secrets, personal tabs, notifications, or unrelated files.

Use concise narration explaining decisions and observed results.

---

## 17. Recording script

### 00:00–00:45 — Introduction

- Project purpose.
- Stack.
- Required modules.
- Mention transaction-safe stock confirmation.

### 00:45–01:30 — Roles/login

- Show login.
- Briefly identify four roles.
- Log in as Warehouse.

### 01:30–03:00 — Product and inventory

- Create product with opening stock.
- Show opening movement.
- Record stock IN.
- Attempt excessive OUT and show safe error/no negative stock.

### 03:00–04:30 — Customer CRM

- Log in as Sales.
- Create/search customer.
- Open detail.
- Add follow-up note and date.

### 04:30–07:00 — Draft and confirmation

- Create challan with multiple products.
- Save Draft and show stock unchanged.
- Edit Draft.
- Confirm.
- Show Confirmed status, stock deduction, movement records, and snapshots.

### 07:00–08:00 — Insufficient stock rollback

- Attempt another challan with insufficient stock.
- Show detailed error.
- Show no partial deduction and Draft remains.

### 08:00–09:00 — Read-only and Admin behavior

- Log in as Accounts and show read-only access.
- Log in as Admin.
- Cancel Confirmed challan with reason.
- Show restored stock and one-time reversal.

### 09:00–10:00 — Architecture, docs, deployment

- Show Swagger/Postman.
- Show README sections.
- Mention assumptions and limitations.
- Show repository structure and final deployment links.

Adjust timestamps to actual recording; do not list false timestamps in the final README.

---

## 18. Demonstration data preparation

Before recording:

- Confirm role credentials.
- Keep two active products with enough stock.
- Keep one low-stock product.
- Prepare or create one customer.
- Ensure no confusing duplicate demo records.
- Confirm the sequence number need not start at 1.
- Verify cancellation/confirmation data is not already transitioned.
- Warm free-host services if allowed.
- Close unrelated browser tabs and notifications.

Do not manually alter database rows to stage results that the UI/API cannot produce.

---

## 19. Screenshot set

Recommended:

1. Login.
2. Customer list.
3. Customer detail with follow-up timeline.
4. Product list with low-stock state.
5. Product detail with stock movements.
6. Challan builder.
7. Confirmed challan detail.
8. Insufficient-stock error.
9. Mobile customer/product/challan view.
10. Swagger/Postman.

Screenshots should use fake assessment data and exclude tokens/secrets.

---

## 20. Assumptions section

Include at least:

- One company.
- Whole-number inventory quantities.
- One stock balance and descriptive warehouse location per product.
- Seeded users; no user administration.
- Products are deactivated, not deleted.
- Customer hard delete is not implemented.
- Confirmed challans are immutable.
- Admin Confirmed cancellation restores all item stock once.
- GST is stored but not externally validated.
- Product Draft snapshots refresh on Draft edit, then freeze at confirmation.
- UTC storage and browser-local display.
- Simple access-token JWT without refresh/revocation.

---

## 21. Known limitations section

Suggested accurate baseline:

```text
- Purchase orders, invoices, payments, and tax calculation are outside the required core-module scope.
- The system supports one company and one stock balance per product; it is not a multi-warehouse ERP.
- Inventory quantities are whole numbers and do not support units of measure, batches, serial numbers, or expiry dates.
- User accounts are seeded; registration, password reset, and user administration are not included.
- Authentication uses a single JWT access token stored in session storage; refresh-token rotation and server-side revocation are not implemented.
- Confirmed cancellation is a full Admin-only stock reversal; partial returns/credit notes are not implemented.
- Customer and product records are retained for history rather than hard-deleted.
- Free hosting may have cold-start or availability limitations.
```

Add any actual incomplete or defective behavior. Do not hide it.

---

## 22. Bonus feature reporting

Use a table:

| Bonus | Status | Evidence/notes |
|---|---|---|
| Docker setup | Complete | Verified full-stack local-production fallback |
| GitHub Actions | Complete | `.github/workflows/ci.yml` |
| Invoice PDF export | Not implemented unless verified | — |
| AWS S3 product image | Not implemented unless verified | — |
| AWS deployment | Not implemented unless verified | — |

Bonus absence does not need apology. Core correctness has priority.

---

## 23. Local setup verification in README

The final instructions must be tested exactly:

```bash
git clone <repository-url>
cd <repository-directory>
corepack enable
pnpm install
cp .env.example .env
pnpm db:up
pnpm --filter api prisma:generate
pnpm --filter api prisma:migrate:dev
pnpm --filter api prisma:seed
pnpm dev
```

Then list local URLs and credentials.

If actual filenames/scripts differ, replace this template with the tested commands.

---

## 24. Test summary in README

Use truthful language:

```text
Verified checks:
- formatting
- linting
- TypeScript builds
- backend unit/integration tests
- PostgreSQL inventory/challan concurrency tests
- frontend tests
- production smoke flow
```

Include commands and final result. Do not claim all items until Step 9 evidence exists.

Coverage percentages may be included only from the final report and should not replace behavioral evidence.

---

## 25. Final evidence summary

| Verification | Result | Reference |
|---|---|---|
| Format/lint/typecheck | Pass | `docs/evidence/quality/STEP_09_VERIFICATION.md` |
| API unit/integration | Pass | `docs/evidence/quality/STEP_09_VERIFICATION.md` |
| Inventory concurrency | Pass | `docs/evidence/quality/STEP_09_VERIFICATION.md` |
| Challan concurrency/rollback | Pass | `docs/evidence/quality/STEP_09_VERIFICATION.md` |
| Frontend tests | Pass, 13 tests | `docs/evidence/quality/STEP_09_VERIFICATION.md` |
| E2E/manual full flow | Pass locally | `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md` |
| Security review | Pass with documented non-applicable advisory | `docs/evidence/quality/STEP_09_VERIFICATION.md` |
| Responsive/accessibility | Responsive core flow pass; automated accessibility audit not claimed | Step 8 and deployment evidence |
| Clean-source setup | Pass | `docs/evidence/quality/CLEAN_SOURCE_REHEARSAL.md` |
| Production smoke | Pass for local-production fallback | `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md` |

---

## 26. Final link verification

Test in an incognito/logged-out browser:

- Repository opens.
- README images/links open.
- Frontend loads.
- Deep route refresh works.
- API health opens.
- Swagger opens when listed.
- Recording permissions allow viewing.
- Postman files download from repository.
- Credentials work.

Do not rely on an already authenticated browser session.

---

## 27. Final no-false-claims review

Before submission, compare every sentence using words such as:

```text
complete
production-ready
secure
fully tested
responsive
deployed
atomic
concurrency-safe
```

Against evidence.

Recommended framing:

- “Case-study implementation” rather than “enterprise production ERP.”
- “Transactional confirmation verified by tests” only after tests pass.
- “Responsive across tested viewports” rather than “works on every device.”
- “Security baseline implemented” rather than “fully secure.”

---

## 28. Submission folder/package

Repository contains source and small documentation assets. A separate submission folder may contain:

```text
submission/
├── SUBMISSION_SUMMARY.pdf-or-md
├── Mini_ERP_CRM.postman_collection.json
├── Local.postman_environment.json
├── screen-recording-link.txt
├── screenshots/
└── final-checklist.md
```

Do not duplicate the whole repository in an email attachment unless requested.

---

## 29. Submission summary template

```markdown
# Full Stack Developer Case Study Submission

**Candidate:** <name>  
**Project:** Mini ERP + CRM Operations Portal  
**Final commit:** `<hash>`

## Links

- Repository: <URL>
- Frontend: <URL>
- API: <URL>
- Swagger: <URL>
- Recording: <URL>

## Credentials

| Role | Email | Password |
|---|---|---|
| Admin | ... | ... |
| Sales | ... | ... |
| Warehouse | ... | ... |
| Accounts | ... | ... |

## Notes

- Postman collection: `docs/postman/...`
- Setup/deployment: README
- Architecture/assumptions/limitations: README and `docs/case-study/`
```

---

## 30. Submission email template

**Subject:** Full Stack Developer Case Study Submission — Mini ERP + CRM — `<Candidate Name>`

```text
Hello <Recipient Name>,

Please find my Full Stack Developer case study submission for the Mini ERP + CRM Operations Portal.

Repository: <GitHub URL>
Frontend: <Frontend URL>
Backend API: <API URL>
API documentation: <Swagger/Postman reference>
Screen recording: <Recording URL>

Test credentials for Admin, Sales, Warehouse, and Accounts are included in the README and submission summary.

The README contains the architecture overview, local setup, environment-variable guidance, deployment process, assumptions, test commands, and known limitations.

Final submitted commit: <commit hash>

Thank you for reviewing my submission.

Regards,
<Candidate Name>
<Contact details if appropriate>
```

Keep the email concise. Do not paste long architecture details into the email.

---

## 31. Local-only fallback submission wording

When live deployment is unavailable:

```text
The project is provided with a verified local setup because <brief accurate reason>. The repository includes complete setup instructions, Docker/local PostgreSQL configuration, migrations, seeded role accounts, a Postman collection, and a full-flow recording demonstrating all required modules and the inventory/challan transaction behavior.
```

Do not state that deployment was completed if it was not.

---

## 32. Final execution checklist

### Repository

- [ ] Clean working tree.
- [ ] Final commit/tag recorded.
- [ ] Public/evaluator access verified.
- [ ] No secrets or generated clutter.

### Application

- [x] Four roles login.
- [x] Required Customer flow works.
- [x] Required Product/Inventory flow works.
- [x] Required Challan flow works.
- [x] Negative-stock and rollback verified.
- [x] Product snapshots verified.
- [x] Role denials verified.
- [x] Responsive core pages verified.

### Documentation

- [x] README tested from a dependency-free clean source copy.
- [x] Environment variables documented.
- [x] Deployment/local setup documented.
- [x] Architecture and assumptions documented.
- [x] Limitations and incomplete parts documented.
- [x] Step documents included.

### Submission assets

- [x] Local frontend/API links verified.
- [x] Credentials verified.
- [x] Postman/Swagger verified.
- [ ] Recording permission verified.
- [x] Screenshots reviewed for secrets.
- [ ] Email/portal fields complete.

### Timing

- [ ] Submission sent before deadline.
- [ ] Sent message/receipt preserved.

---

## 33. Post-submission preservation

After submitting:

- Do not delete the deployment immediately.
- Preserve the submitted commit.
- Keep credentials stable during review.
- Monitor provider notices/logs when practical.
- Avoid unannounced breaking changes.
- If a critical issue is fixed, communicate the new commit and exact change.
- Retain the recording and evidence until the process concludes.

---

## 34. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Evaluator cannot find credentials. | Place them near top of README and submission summary. |
| Deep route refresh fails. | Verify SPA rewrite in incognito. |
| Repository is private/inaccessible. | Test logged-out access or invite reviewer. |
| Recording link requires permission. | Test in incognito. |
| README commands were never tested. | Clean-clone rehearsal. |
| Claims exceed evidence. | No-false-claims review. |
| Screenshots expose secrets. | Manual redaction review. |
| Free service sleeps during review. | Recording/local fallback and documented cold start. |
| Last-minute changes break final commit. | Freeze release candidate after verification. |
| Intentional exclusions look accidental. | Explain scope and known limitations clearly. |

---

## 35. Step 11 acceptance criteria

Documentation is complete when:

- [x] All source submission requirements are mapped.
- [x] Repository, README, credentials, architecture, and Postman expectations are defined.
- [x] Recording, screenshots, demo data, and final evidence are defined.
- [x] Assumptions, limitations, bonus reporting, and local fallback are defined.
- [x] Link, claim, security, execution, and timing checks are defined.
- [x] Submission summary and email templates are provided.

Final submission is complete only when:

- [x] Manifest contains real verified values or clearly marked pending fields.
- [x] Repository and verified implementation commit are accessible.
- [x] Deployment or local fallback works.
- [x] Four credentials work.
- [x] Postman/Swagger is usable.
- [x] README clean-source setup passes.
- [ ] Recording is accessible and secret-free.
- [x] Screenshots are accessible and secret-free.
- [x] Evidence supports all important implementation claims.
- [x] Limitations are honest and complete.
- [ ] Submission is sent and receipt preserved.

---

## 36. Final deliverables and evidence

Expected final artifacts:

```text
README.md
docs/case-study/00_DOCUMENTATION_INDEX.md
docs/case-study/01_REQUIREMENTS_SCOPE_AND_ARCHITECTURE.md
...
docs/case-study/11_SUBMISSION_AND_DEMONSTRATION.md
docs/postman/**
docs/screenshots/**
docs/evidence/**
```

Final submission record:

| Field | Final value |
|---|---|
| Candidate | Pending |
| Repository | Pending |
| Frontend | `http://localhost:8080` local-production fallback |
| API | `http://localhost:4000/api/v1` local-production default |
| Swagger | `http://localhost:4000/api/docs` local-production default |
| Recording | Pending |
| Final commit | Pending |
| Submission time | Pending |
| Receipt | Pending |

---

## 37. Project documentation closeout

After all implementation acceptance criteria are verified:

1. Update each step's implementation status.
2. Replace evidence placeholders with real references.
3. Record any changes from the planned contracts.
4. Update `00_DOCUMENTATION_INDEX.md`.
5. Freeze the submitted documentation version.
6. Create a post-submission change log only when necessary.

Planning documentation being complete does not itself mean the application is complete.

---

## 38. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined the final repository, README, credentials, Postman, recording, evidence, limitations, and submission procedure. |
| 1.1 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.2 | 2026-07-28 | Added the verified evaluator README, four-role credentials, 26-request Postman package, screenshot index, recording script, submission summary, final checklist, evidence matrix, and honest candidate-owned blockers. |
| 1.3 | 2026-07-28 | Recorded complete Docker and GitHub Actions bonuses, clean-source rehearsal, verified application/documentation checks, and the remaining external GitHub, deployment, recording, and submission tasks. |
| 1.4 | 2026-07-29 | Recorded the sanitized public repository, verified implementation commit, release tag, and successful GitHub Actions quality gate. |
