# Mini ERP + CRM Operations Portal — Complete Documentation Bundle

**Project:** Full Stack Developer Case Study — Mini ERP + CRM Operations Portal  
**Bundle version:** 1.2  
**Generated:** 2026-07-28  
**Documentation status:** Complete  
**Application implementation status:** Complete  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  

> This bundle combines the authoritative documentation index and Steps 1–11.
> It records verified implementation evidence and explicitly preserves pending
> candidate-owned or external closeout.

## Included documents

- `00_DOCUMENTATION_INDEX.md` — Mini ERP + CRM Operations Portal — Documentation Index
- `01_REQUIREMENTS_SCOPE_AND_ARCHITECTURE.md` — Step 1 — Requirements, Scope, and Architecture
- `02_DATABASE_SCHEMA_AND_API_CONTRACTS.md` — Step 2 — Database Schema and API Contracts
- `03_PROJECT_INITIALIZATION_AND_FOUNDATION.md` — Step 3 — Project Initialization and Foundation
- `04_AUTHENTICATION_AND_ROLE_ACCESS.md` — Step 4 — Authentication and Role-Based Access
- `05_CUSTOMER_CRM_IMPLEMENTATION.md` — Step 5 — Customer CRM Implementation
- `06_PRODUCT_AND_INVENTORY_IMPLEMENTATION.md` — Step 6 — Product and Inventory Implementation
- `07_SALES_CHALLAN_IMPLEMENTATION.md` — Step 7 — Sales Challan Implementation
- `08_FRONTEND_INTEGRATION_AND_RESPONSIVE_UI.md` — Step 8 — Frontend Integration and Responsive UI
- `09_TESTING_SECURITY_AND_QUALITY.md` — Step 9 — Testing, Security, and Quality Verification
- `10_DEPLOYMENT_AND_OPERATIONS.md` — Step 10 — Deployment and Operations
- `11_SUBMISSION_AND_DEMONSTRATION.md` — Step 11 — Submission and Demonstration

---


<!-- BEGIN 00_DOCUMENTATION_INDEX.md -->

# Mini ERP + CRM Operations Portal — Documentation Index

**Project:** Full Stack Developer Case Study — Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-DOC-INDEX  
**Version:** 2.8
**Documentation status:** Complete  
**Application implementation status:** Complete; source, clean-source rehearsal, CI, GitHub publication, public HTTPS deployment, and the local-production fallback are verified, while recording and submission closeout remain pending
**Date:** 2026-07-29
**Documentation root:** `docs/case-study/`  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`

---

## 1. Purpose

This index is the entry point for the complete case-study documentation set. It defines document authority, source labeling, status vocabulary, implementation order, evidence rules, file inventory, cross-step dependencies, and change control.

The documents record both the implementation contract and the evidence gathered
through the current public assessment release. Pending candidate-owned
recording and submission closeout are explicitly marked and must not be
inferred as complete.

---

## 2. Source baseline

The supplied assignment establishes:

- A 48-hour Mini ERP + CRM case study for a wholesale/distribution company.
- Node.js, TypeScript, Express/NestJS, PostgreSQL/MySQL, REST APIs, React, and responsive UI.
- Authentication with Admin, Sales, Warehouse, and Accounts roles.
- Customer CRM and follow-up notes.
- Product and inventory management with a stock movement log.
- Sales challans with multiple products, automatic numbering, Draft/Confirmed/Cancelled states, stock deduction, negative-stock prevention, proper insufficient-stock errors, and product snapshots.
- Validation, HTTP status codes, error messages, pagination, search, and filters.
- Deployment or a complete local alternative.
- Repository, credentials, API documentation, README, architecture, and limitation requirements.

Architecture decisions and assumptions introduced by this documentation are clearly labeled and must not be misrepresented as assignment text.

---

## 3. Documentation policy

Every implementation stage has a standalone Markdown document. Each document records:

1. Purpose and dependency.
2. Source-derived requirements.
3. Project decisions.
4. Assumptions where the source is silent.
5. Included and excluded scope.
6. Detailed design/implementation contract.
7. Validation and error behavior.
8. Security and authorization.
9. Testing and verification.
10. Risks and mitigations.
11. Documentation and implementation acceptance criteria.
12. Planned artifacts and evidence.
13. Handoff to the next step.
14. Change log.

Completed documentation must not be silently rewritten to conceal a material design change. Update the affected change log and all dependent contracts.

---

## 4. Source-versus-decision labels

- **[SOURCE]** — explicitly required or stated by the supplied case study.
- **[DECISION]** — selected project architecture or implementation approach.
- **[ASSUMPTION]** — behavior chosen because the assignment is silent or ambiguous.
- **[DEFERRED]** — valid work intentionally postponed.
- **[RISK]** — a delivery, correctness, security, or evaluation concern.

When a statement has no label, it is normally an implementation detail governed by the surrounding labeled decision and earlier authority documents.

---

## 5. Separate status models

### 5.1 Documentation status

- **Planned** — file not yet drafted.
- **In Progress** — draft incomplete or being reviewed.
- **Ready for Review** — complete draft awaiting approval.
- **Complete** — documentation contains the required implementation contract and acceptance criteria.

### 5.2 Implementation status

- **Not Started** — no implementation evidence.
- **In Progress** — code/configuration underway.
- **Blocked** — a specific dependency prevents progress.
- **Ready for Verification** — implementation exists but acceptance evidence is incomplete.
- **Complete** — implementation acceptance criteria and evidence are verified.
- **Deferred** — intentionally excluded with rationale.

A document may be complete while its implementation remains Not Started.

---

## 6. Complete documentation inventory

| Step | Document | Documentation | Implementation | Purpose |
|---:|---|---|---|---|
| 0 | `00_DOCUMENTATION_INDEX.md` | Complete | Not applicable | Governs the documentation set, statuses, authority, dependencies, and evidence. |
| 1 | `01_REQUIREMENTS_SCOPE_AND_ARCHITECTURE.md` | Complete | Complete | Locks source requirements, scope, stack, roles, domain, risks, assumptions, and definition of done. |
| 2 | `02_DATABASE_SCHEMA_AND_API_CONTRACTS.md` | Complete | Complete | Defines and verifies the Prisma schema, constraints, migrations, seed, endpoints, errors, and transactions. |
| 3 | `03_PROJECT_INITIALIZATION_AND_FOUNDATION.md` | Complete | Complete | Implements and verifies the monorepo, foundations, and dependency-free clean-source rehearsal. |
| 4 | `04_AUTHENTICATION_AND_ROLE_ACCESS.md` | Complete | Complete | Implements and verifies seeded users, bcrypt, JWT, guards, permission matrix, and frontend session. |
| 5 | `05_CUSTOMER_CRM_IMPLEMENTATION.md` | Complete | Complete | Implements customer CRUD, search/filter, detail, append-only follow-ups, responsive UI, and verification. |
| 6 | `06_PRODUCT_AND_INVENTORY_IMPLEMENTATION.md` | Complete | Complete | Implements products, opening stock, manual IN/OUT, movement audit, low stock, locking, and concurrency tests. |
| 7 | `07_SALES_CHALLAN_IMPLEMENTATION.md` | Complete | Complete | Implements Draft/snapshot/numbering, atomic confirmation, rollback, cancellation, concurrency, UI, and evidence. |
| 8 | `08_FRONTEND_INTEGRATION_AND_RESPONSIVE_UI.md` | Complete | Complete | Implements routes, navigation, role-aware actions, forms, query/error handling, and verified responsive UI. |
| 9 | `09_TESTING_SECURITY_AND_QUALITY.md` | Complete | Complete | Records passing static, unit, integration, concurrency, browser, security, clean-source, and build gates. |
| 10 | `10_DEPLOYMENT_AND_OPERATIONS.md` | Complete | Complete | Verifies the public Render/Neon assessment deployment and the Docker local-production fallback. |
| 11 | `11_SUBMISSION_AND_DEMONSTRATION.md` | Complete | In Progress | Provides README, credentials, Postman, screenshots, recording script, evidence, limitations, and closeout checklist. |

---

## 7. Recommended reading order

Read in numeric order. For targeted review:

| Need | Read |
|---|---|
| Understand assignment and scope | Steps 1 and 11. |
| Review schema/API choices | Step 2, then Steps 5–7. |
| Start project setup | Steps 1–3. |
| Review access control | Steps 4–8. |
| Audit inventory correctness | Steps 2, 6, 7, and 9. |
| Prepare deployment | Steps 9–11. |
| Review assumptions/limitations | Steps 1, 4, 6, 7, 10, and 11. |

---

## 8. Dependency graph

```text
Step 1 — Requirements / scope / architecture
  └── Step 2 — Schema / API contracts
        └── Step 3 — Project foundation
              └── Step 4 — Authentication / roles
                    ├── Step 5 — Customer CRM
                    └── Step 6 — Product / inventory
                          └── Step 7 — Sales challans
                                └── Step 8 — Frontend integration
                                      └── Step 9 — Testing / security / quality
                                            └── Step 10 — Deployment / operations
                                                  └── Step 11 — Submission / demo
```

Step 5 and Step 6 may be implemented partly in parallel after Step 4, but Step 7 must not proceed until inventory transaction behavior is stable.

---

## 9. Authority and conflict resolution

When documents conflict, use this order:

1. Supplied assignment for explicit requirements.
2. Step 1 for approved scope and architecture.
3. Step 2 for database/API contracts.
4. Feature document for module-specific behavior.
5. Step 8 for shared frontend conventions.
6. Step 9 for verification gates.
7. Step 10 for deployment behavior.
8. Step 11 for presentation/submission.

A lower-level implementation detail may clarify but must not contradict a higher authority without a recorded change.

If the source is silent, the documented assumption remains authoritative until explicitly changed.

---

## 10. Locked architecture baseline

```text
Repository: pnpm monorepo
Backend: NestJS + TypeScript
Database: PostgreSQL
ORM/migrations: Prisma
Authentication: simple JWT access token with four seeded roles
Frontend: React + TypeScript + Vite + Material UI
Data fetching: TanStack Query
Forms: React Hook Form + Zod
Primary business flow: Customer → Product/Inventory → Sales Challan
Critical invariant: Confirming a challan must never create negative stock
Recommended hosting: Vercel + Render/Railway + Neon or accepted equivalents
```

Exact provider availability must be checked at deployment time. AWS remains optional bonus work.

---

## 11. Locked core scope

P0:

- JWT authentication and role enforcement.
- Customer CRM and follow-up history.
- Products and inventory movement audit.
- Draft/Confirmed/Cancelled challans.
- Automatic challan number.
- Product snapshots.
- Atomic stock deduction and negative-stock prevention.
- Pagination/search/filter/validation/errors.
- Responsive UI.
- Documentation, Postman/Swagger, setup, deployment/local fallback, and submission assets.

Explicitly outside initial core:

- Purchase orders.
- Full invoices/payments/tax.
- Multi-company/multi-warehouse stock.
- User administration/password reset.
- Notifications.
- Product variants/batches/serials.
- Returns/partial cancellation.
- Mobile application.
- Advanced analytics.

---

## 12. Critical invariants

1. Product stock is never negative.
2. Every stock change has a matching immutable movement.
3. Draft challans do not change stock.
4. Confirmation is all-or-nothing for every line.
5. A challan can be confirmed once.
6. A Confirmed cancellation can restore stock once.
7. Confirmed/Cancelled records cannot be edited.
8. Product snapshots are server-sourced.
9. Roles are backend-enforced.
10. Secrets are never committed or returned.
11. Planned documentation is not presented as implementation evidence.

---

## 13. Evidence policy

A step is implementation-complete only with applicable evidence:

- Migration/seed output.
- Test output.
- API responses.
- Database assertions.
- Swagger/Postman execution.
- Screenshots.
- Responsive/accessibility checks.
- Deployment logs/health results.
- Production smoke test.
- Git commit hash.

Evidence must correspond to the final submitted commit and must not contain secrets.

---

## 14. Evidence locations

Recommended repository structure:

```text
docs/
├── case-study/
│   ├── 00_DOCUMENTATION_INDEX.md
│   └── 01...11 step documents
├── postman/
├── screenshots/
└── evidence/
    ├── quality/
    ├── tests/
    ├── api/
    ├── responsive/
    └── deployment/
```

Current evidence is stored in:

- `docs/evidence/quality/STEP_09_VERIFICATION.md`
- `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md`
- `docs/screenshots/`
- `docs/postman/`
- `docs/submission/`

---

## 15. Change-control process

For a material change:

1. Identify the source requirement or assumption affected.
2. Update Step 1 if scope/architecture changes.
3. Update Step 2 if schema/API contract changes.
4. Update the feature document.
5. Update tests, Swagger/Postman, frontend types, README, and deployment configuration as applicable.
6. Add change-log entries.
7. Re-run dependent verification.
8. Update this index when status or document inventory changes.

Do not make silent schema or lifecycle changes only in code.

---

## 16. Implementation planning gate

Before coding begins, review and explicitly decide:

- Whether the selected stack is accepted as-is.
- Confirm that no evaluator-specific instruction overrides the locked interpretation that customer follow-up date and general notes are required.
- Whether GST should remain unique when present.
- Whether `totalAmount` is retained as a derived challan field.
- Whether Draft snapshot timing is accepted.
- Whether Confirmed cancellation/restoration is accepted.
- Which package manager and exact Node version are pinned.
- Which free deployment providers are available to the candidate.
- Whether full Docker and/or CI are attempted after P0.

Any changes must be recorded before implementation to reduce rework.

---

## 17. Suggested implementation sequence

```text
A. Review and approve documentation decisions.
B. Initialize project foundation.
C. Apply exact schema/migrations/seed.
D. Implement authentication and roles.
E. Implement Customer CRM.
F. Implement Product/Inventory.
G. Prove stock locking/concurrency.
H. Implement Sales Challans.
I. Prove confirmation/cancellation concurrency.
J. Integrate/polish responsive frontend.
K. Run complete quality/security gates.
L. Deploy and smoke test.
M. Assemble and verify submission.
```

The detailed time plan remains in Step 1 and should be revisited only after documentation approval.

---

## 18. Documentation completeness checklist

- [x] Index and governance.
- [x] Requirements/scope/architecture.
- [x] Exact schema/API contracts.
- [x] Project foundation.
- [x] Authentication and roles.
- [x] Customer CRM.
- [x] Product and inventory.
- [x] Sales challans.
- [x] Integrated responsive frontend.
- [x] Testing/security/quality.
- [x] Deployment/operations.
- [x] Submission/demonstration.

Core application implementation, clean-source rehearsal, test evidence, CI,
Git history, GitHub publication, public hosting, and the local-production
fallback are complete. Candidate identity, recording, and submission receipt
remain pending.

---

## 19. Documentation acceptance criteria

The documentation package is accepted when:

- All numbered documents from Step 0 through Step 11 exist.
- Every step document reports its current documentation and implementation status truthfully.
- Source requirements, project decisions, assumptions, deferred work, and risks remain distinguishable.
- Schema, API, authorization, transaction, testing, deployment, and submission contracts do not contradict one another.
- All Markdown code fences and internal document references validate.
- The combined bundle contains exact boundaries for every numbered document.
- The machine-readable manifest reports zero validation errors.
- The checksum manifest passes integrity verification.
- Implementation claims link to current evidence, and pending external closeout is not presented as complete.

---

## 20. File list

```text
00_DOCUMENTATION_INDEX.md
01_REQUIREMENTS_SCOPE_AND_ARCHITECTURE.md
02_DATABASE_SCHEMA_AND_API_CONTRACTS.md
03_PROJECT_INITIALIZATION_AND_FOUNDATION.md
04_AUTHENTICATION_AND_ROLE_ACCESS.md
05_CUSTOMER_CRM_IMPLEMENTATION.md
06_PRODUCT_AND_INVENTORY_IMPLEMENTATION.md
07_SALES_CHALLAN_IMPLEMENTATION.md
08_FRONTEND_INTEGRATION_AND_RESPONSIVE_UI.md
09_TESTING_SECURITY_AND_QUALITY.md
10_DEPLOYMENT_AND_OPERATIONS.md
11_SUBMISSION_AND_DEMONSTRATION.md
COMPLETE_DOCUMENTATION_BUNDLE.md
DOCUMENTATION_MANIFEST.json
MANIFEST_SHA256.txt
```

---

## 21. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Created the initial documentation policy and planned roadmap. |
| 2.0 | 2026-07-28 | Completed Steps 2–11, separated documentation and implementation statuses, added authority, dependencies, invariants, evidence, and planning gate. |
| 2.1 | 2026-07-28 | Harmonized environment-variable, challan-numbering, transaction, and status contracts across the documentation set. |
| 2.2 | 2026-07-28 | Resolved customer required-field and validation-limit contracts, added explicit source-derived sections, and finalized package artifacts. |
| 2.3 | 2026-07-28 | Aligned the package-level implementation status with the defined `Not Started` vocabulary and regenerated the final manifests and bundle. |
| 2.4 | 2026-07-28 | Added explicit package acceptance criteria and completed final validation prerequisites. |
| 2.5 | 2026-07-28 | Reconciled the index with the implemented application, verified quality/local-production evidence, evaluator assets, and remaining candidate-owned closeout. |
| 2.6 | 2026-07-28 | Completed the clean-source rehearsal and CI workflow, reconciled Steps 3, 9, and 10 as complete locally, and retained only external publication/submission closeout. |
| 2.7 | 2026-07-29 | Published the sanitized public GitHub repository, recorded the verified implementation commit, and added a warning-free Node 24-compatible CI release workflow. |
| 2.8 | 2026-07-29 | Recorded the verified Render static frontend and Docker API, Neon PostgreSQL, exact production CORS, and public deployment smoke evidence. |

<!-- END 00_DOCUMENTATION_INDEX.md -->

---

<!-- BEGIN 01_REQUIREMENTS_SCOPE_AND_ARCHITECTURE.md -->

# Step 1 — Requirements, Scope, and Architecture

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-01  
**Version:** 1.4  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  
**Owner:** Candidate / Project Implementer

---

## 1. Purpose

This document converts the supplied full-stack developer case study into an implementation-ready project baseline. It separates explicit assignment requirements from architecture decisions and assumptions so that later development does not unintentionally expand the scope or alter critical business rules.

The document establishes:

- What must be built.
- What will not be built during the 48-hour assignment.
- The selected application architecture and technology stack.
- The initial domain and database model.
- Role and authorization boundaries.
- The required sales-challan and inventory behavior.
- API and frontend expectations.
- Deployment and submission expectations.
- Testing priorities and the definition of done.

This is the governing document for all later steps unless a change is explicitly recorded in the **Change Log**.

---

## 2. Source-derived assignment summary

### 2.1 Business context

**[SOURCE]** The application is a small ERP/CRM system for a wholesale or distribution company. The organization works with customers, products, stock, purchase orders, sales challans, invoices, and basic CRM follow-ups. The system is intended for internal employees such as sales, warehouse, and accounts teams.

**[SOURCE]** The objective is not to create a large enterprise ERP. The assignment is intended to demonstrate competence in full-stack development, backend APIs, database design, frontend UI, deployment, and a realistic business flow.

### 2.2 Delivery window

**[SOURCE]** The stated deadline is 48 hours from the time the assignment is shared.

### 2.3 Required technology categories

**[SOURCE]** The backend must use:

- Node.js
- TypeScript
- Express.js or NestJS
- PostgreSQL or MySQL
- REST APIs
- Proper validation and error handling

**[SOURCE]** The frontend must use:

- React
- HTML
- CSS
- JavaScript or TypeScript
- Responsive UI

**[SOURCE]** Delivery and engineering expectations include:

- Environment variables
- Documented server setup
- A GitHub repository with proper commits
- A README with setup instructions

### 2.4 Required core modules

**[SOURCE]** Four core modules are explicitly required:

1. Authentication and roles
2. Customer CRM
3. Product and inventory
4. Sales challans

### 2.5 Deployment and submission

**[SOURCE]** Deployment may use a free platform. AWS is optional and treated as bonus work; the candidate is not expected to spend money.

**[SOURCE]** When the system is not deployed, the assignment requires a working local setup, full-flow screen recording, Postman collection, and clear README instructions.

**[SOURCE]** The final submission is expected to contain a repository link, frontend URL, backend API URL, test credentials for all roles, API documentation or Postman collection, setup and deployment instructions, an architecture explanation, and known limitations or incomplete parts.

---

## 3. What the evaluator is likely testing

The assignment explicitly names the technologies and modules, but successful evaluation depends on more than displaying forms. The implementation must show that the candidate can translate business rules into consistent behavior.

The principal evaluation dimensions are expected to be:

1. Correctness of the business flow.
2. Appropriate relational database design.
3. Secure authentication and role enforcement.
4. Clean, validated REST APIs.
5. A usable and responsive React interface.
6. Reliable stock handling and auditability.
7. Clear deployment and setup instructions.
8. Professional repository structure and Git history.
9. Ability to control scope under a 48-hour deadline.
10. Ability to explain assumptions and limitations honestly.

The most important technical path is sales challan confirmation because it connects customers, products, inventory, authorization, transaction safety, error handling, and audit history.

---

## 4. Scope classification

### 4.1 P0 — mandatory for the submission

The following items must work before bonus or cosmetic work begins:

| Area | Mandatory behavior |
|---|---|
| Authentication | JWT login for Admin, Sales, Warehouse, and Accounts users. |
| Authorization | Backend role checks for protected operations; frontend action visibility must match. |
| Customers | Create, edit, list, search, filter, view details, and add follow-up notes. |
| Products | Create, edit, list, search, filter, and display stock and low-stock state. |
| Inventory | Record stock IN/OUT changes and keep a movement log with reason, creator, and timestamp. |
| Challans | Create a challan for one customer with multiple products and quantities. |
| Challan number | Generate a unique challan number automatically. |
| Draft workflow | Save and edit a challan while it is in Draft state without changing stock. |
| Confirmation | Confirm a challan, reduce stock atomically, and prevent stock from becoming negative. |
| Insufficient stock | Reject confirmation with a clear API error and no partial deduction. |
| Product snapshot | Store product information within each challan item rather than relying only on product ID. |
| Cancellation | Support the assignment's Cancelled state with documented behavior. |
| APIs | Validation, appropriate HTTP status codes, clear errors, pagination, search, and filters where needed. |
| Frontend | Clean, responsive admin-style UI for the complete required flow. |
| Seed data | Test users for all four required roles. |
| Documentation | README, architecture explanation, assumptions, known limitations, and API documentation/Postman collection. |
| Delivery | Live deployment or the complete local demonstration package required by the assignment. |

### 4.2 P1 — valuable after P0 is stable

These items improve the submission but must not delay the required flow:

- Dashboard summary cards.
- Low-stock highlighting and filters.
- Follow-up due indicators.
- Swagger/OpenAPI UI.
- Docker Compose for local PostgreSQL and services.
- Focused backend integration tests.
- Seeded demonstration customers, products, stock movements, and challans.
- Polished empty, loading, and error states.

### 4.3 P2 — bonus only

- GitHub Actions.
- Invoice PDF export.
- Product image upload to Amazon S3.
- AWS deployment.
- Additional analytics.

### 4.4 Explicit exclusions for the first submission

The following are intentionally outside the implementation scope:

- Purchase-order management.
- Full invoice management.
- Payment collection or accounting ledgers.
- GST calculation or tax filing logic.
- Multi-company or multi-tenant architecture.
- Full multi-warehouse entities, transfers, and warehouse-level balances.
- User registration.
- Password reset.
- Email verification.
- Refresh-token rotation.
- Approval chains.
- Email, SMS, or push notifications.
- Mobile applications.
- Advanced analytics.
- Product variants.
- Batch, lot, or serial-number tracking.
- Returns and credit-note workflows.
- Offline synchronization.

These exclusions do not contradict the assignment. Purchase orders and invoices appear in the business context, but they are not among the four defined core modules.

---

## 5. Architecture decisions

### 5.1 Selected stack

#### Backend

**[DECISION]** Use:

- Node.js
- TypeScript
- NestJS
- PostgreSQL
- Prisma ORM
- JWT authentication
- bcrypt for password hashing
- NestJS DTO validation with `class-validator` and `class-transformer`
- Swagger/OpenAPI

#### Frontend

**[DECISION]** Use:

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod for client-side form schemas
- Material UI

#### Development and delivery

**[DECISION]** Use:

- A monorepo containing `apps/api` and `apps/web`.
- ESLint and Prettier.
- PostgreSQL locally through Docker Compose where possible.
- Postman collection and Swagger documentation.
- Jest or Vitest for focused automated tests.
- Vercel for the frontend, Render or Railway for the API, and Neon PostgreSQL for the recommended free deployment path.

### 5.2 Why NestJS was selected

NestJS is within the assignment's accepted backend options and provides a consistent structure for:

- Modules
- Controllers
- Services
- Guards
- Validation
- Exception handling
- Dependency injection
- Swagger integration
- Automated testing

This reduces architectural uncertainty under a short deadline and makes role enforcement and module ownership clearer than an unstructured Express application.

### 5.3 Why PostgreSQL was selected

PostgreSQL is within the accepted database options and is suitable for:

- Relational domain modeling.
- Transactions.
- Row locking.
- Unique constraints.
- Decimal prices.
- Referential integrity.
- Indexes for filters and search.
- Safe inventory updates.

### 5.4 Why Prisma was selected

Prisma is an implementation choice rather than an assignment requirement. It is selected for:

- Typed database access.
- Fast schema iteration.
- Reproducible migrations.
- Seed support.
- Transaction APIs.
- Reduced boilerplate during a 48-hour build.

Where row-level locking or guarded updates are required, raw SQL may be used inside a controlled transaction if the ORM abstraction is insufficient.

### 5.5 High-level architecture

```text
┌──────────────────────────────────────────────┐
│                React Frontend                │
│                                              │
│ Login                                        │
│ Dashboard                                    │
│ Customers and follow-ups                     │
│ Products and stock movements                 │
│ Draft/confirmed/cancelled challans            │
└──────────────────────┬───────────────────────┘
                       │ HTTPS + JSON REST API
                       ▼
┌──────────────────────────────────────────────┐
│                 NestJS API                   │
│                                              │
│ Auth module                                  │
│ Users module                                 │
│ Customers module                             │
│ Products module                              │
│ Inventory module                             │
│ Challans module                              │
│ Common authorization, validation, and errors │
└──────────────────────┬───────────────────────┘
                       │ Prisma / SQL transaction
                       ▼
┌──────────────────────────────────────────────┐
│                 PostgreSQL                   │
│                                              │
│ Users                                        │
│ Customers                                    │
│ Customer follow-ups                          │
│ Products                                     │
│ Stock movements                              │
│ Challans                                     │
│ Challan items and snapshots                  │
└──────────────────────────────────────────────┘
```

### 5.6 Proposed repository structure

```text
mini-erp-crm/
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── customers/
│   │   │   ├── products/
│   │   │   ├── inventory/
│   │   │   ├── challans/
│   │   │   ├── common/
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── test/
│   └── web/
│       ├── src/
│       │   ├── api/
│       │   ├── components/
│       │   ├── features/
│       │   │   ├── auth/
│       │   │   ├── customers/
│       │   │   ├── products/
│       │   │   └── challans/
│       │   ├── layouts/
│       │   ├── pages/
│       │   ├── routes/
│       │   └── main.tsx
│       └── public/
├── docs/
│   ├── case-study/
│   ├── postman/
│   ├── screenshots/
│   └── architecture/
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

---

## 6. Role and permission model

### 6.1 Required roles

**[SOURCE]** The application must have:

- Admin
- Sales
- Warehouse
- Accounts

### 6.2 Selected permission matrix

The assignment does not define exact permissions for each role. The following matrix is a project decision designed around realistic internal responsibilities.

| Action | Admin | Sales | Warehouse | Accounts |
|---|---:|---:|---:|---:|
| Log in | Yes | Yes | Yes | Yes |
| View customers | Yes | Yes | Yes | Yes |
| Add or edit customers | Yes | Yes | No | No |
| Add customer follow-up notes | Yes | Yes | No | No |
| View products | Yes | Yes | Yes | Yes |
| Add or edit products | Yes | No | Yes | No |
| Record manual stock IN/OUT | Yes | No | Yes | No |
| View stock movements | Yes | Yes | Yes | Yes |
| Create challans | Yes | Yes | No | No |
| Edit draft challans | Yes | Yes | No | No |
| Confirm challans | Yes | Yes | No | No |
| Cancel draft challans | Yes | Yes | No | No |
| Cancel confirmed challans | Yes | No | No | No |
| View challans | Yes | Yes | Yes | Yes |

### 6.3 Authorization rules

- Backend guards are authoritative.
- Frontend action hiding is only a usability feature and not a security boundary.
- The JWT contains the user ID and role.
- Disabled users cannot log in.
- No public registration route is provided.
- Four assessment accounts are seeded.
- Passwords are stored only as hashes.
- Secrets and seed passwords are supplied through environment variables.

### 6.4 Proposed seeded users

```text
admin@example.com
sales@example.com
warehouse@example.com
accounts@example.com
```

Passwords must not be committed. Assessment credentials may be documented in the submission notes or provided through safe environment configuration.

---

## 7. Domain and data model

The exact Prisma schema will be finalized in Step 2. This section locks the conceptual model and critical constraints.

### 7.1 User

```text
users
-----
id
name
email
password_hash
role
is_active
created_at
updated_at
```

Constraints:

- Email is unique.
- Role is one of `ADMIN`, `SALES`, `WAREHOUSE`, or `ACCOUNTS`.
- `is_active` defaults to true.

### 7.2 Customer

**[SOURCE]** A customer includes:

- Customer name
- Mobile number
- Email
- Business name
- Optional GST number
- Customer type: Retail, Wholesale, Distributor
- Address
- Status: Lead, Active, Inactive
- Follow-up date
- Notes

Proposed conceptual table:

```text
customers
---------
id
name
mobile_number
email
business_name
gst_number
customer_type
address
status
follow_up_date
notes
created_by_id
created_at
updated_at
```

Suggested indexes:

- Name
- Mobile number
- Business name
- Customer type
- Status
- Follow-up date

### 7.3 Customer follow-up

**[DECISION]** Keep follow-up history in a separate immutable record rather than overwriting one notes field.

```text
customer_follow_ups
-------------------
id
customer_id
note
next_follow_up_date
created_by_id
created_at
```

The customer record retains a current `follow_up_date`, while follow-up entries form a chronological CRM timeline.

### 7.4 Product

**[SOURCE]** A product includes:

- Product name
- SKU/code
- Category
- Unit price
- Current stock
- Minimum stock alert quantity
- Location/warehouse

Conceptual table:

```text
products
--------
id
name
sku
category
unit_price
current_stock
minimum_stock_alert_quantity
warehouse_location
is_active
created_by_id
created_at
updated_at
```

Constraints:

- SKU is unique.
- Unit price is non-negative.
- Current stock is non-negative.
- Minimum-stock quantity is non-negative.
- Monetary values use a decimal database type, not floating-point.

### 7.5 Stock movement

**[SOURCE]** The movement log must track product, quantity changed, IN or OUT, reason, creator, and timestamp.

**[DECISION]** Add balance and reference fields to make the audit trail clearer.

```text
stock_movements
---------------
id
product_id
movement_type
quantity
reason
balance_before
balance_after
reference_type
reference_id
created_by_id
created_at
```

Movement types:

```text
IN
OUT
```

Reference types:

```text
OPENING_STOCK
MANUAL_ADJUSTMENT
CHALLAN_CONFIRMATION
CHALLAN_CANCELLATION
```

Rules:

- `quantity` is always positive.
- Direction is represented by movement type.
- Movement records are immutable.
- Every stock change creates a movement record.
- A product created with opening stock produces an opening-stock IN movement.

### 7.6 Challan

**[SOURCE]** The challan contains a number, customer, products, total quantity, status, creator, and created date. Supported statuses are Draft, Confirmed, and Cancelled.

Conceptual table:

```text
challans
--------
id
sequence_number
challan_number
customer_id
status
total_quantity
created_by_id
confirmed_by_id
cancelled_by_id
created_at
updated_at
confirmed_at
cancelled_at
cancellation_reason
```

Constraints:

- Challan number is unique.
- Total quantity is non-negative.
- Confirmed and cancelled challans cannot be edited.

### 7.7 Challan item

**[SOURCE]** The challan must store product snapshot data, not only product ID.

```text
challan_items
-------------
id
challan_id
product_id
product_name_snapshot
product_sku_snapshot
product_category_snapshot
unit_price_snapshot
warehouse_location_snapshot
quantity
line_total
created_at
```

The product relationship remains for traceability, while snapshot columns preserve historical data if the source product is later renamed, moved, deactivated, or repriced.

The server calculates:

```text
line_total = unit_price_snapshot × quantity
total_quantity = sum(challan item quantities)
```

Client-provided totals are never treated as authoritative.

### 7.8 Relationship overview

```mermaid
erDiagram
    USER ||--o{ CUSTOMER : creates
    USER ||--o{ CUSTOMER_FOLLOW_UP : writes
    USER ||--o{ PRODUCT : creates
    USER ||--o{ STOCK_MOVEMENT : records
    USER ||--o{ CHALLAN : creates

    CUSTOMER ||--o{ CUSTOMER_FOLLOW_UP : has
    CUSTOMER ||--o{ CHALLAN : receives

    PRODUCT ||--o{ STOCK_MOVEMENT : has
    PRODUCT ||--o{ CHALLAN_ITEM : referenced_by

    CHALLAN ||--|{ CHALLAN_ITEM : contains
```

---

## 8. Challan lifecycle and business rules

### 8.1 State model

```text
DRAFT ───────────────► CONFIRMED
  │                       │
  │                       │ Admin cancellation
  └───────────────► CANCELLED
```

### 8.2 Locked lifecycle rules

1. A draft challan does not affect stock.
2. A draft challan may be edited.
3. A confirmed challan cannot be edited.
4. A cancelled challan cannot be edited.
5. Confirmation deducts stock exactly once.
6. A second confirmation attempt returns a conflict response.
7. Confirmation succeeds only when every line has sufficient stock.
8. Failure for any line rolls back the complete confirmation.
9. Cancelling a draft challan does not change stock.
10. **[ASSUMPTION]** Cancelling a confirmed challan restores stock through new IN movement records.
11. **[ASSUMPTION]** Only Admin may cancel a confirmed challan.
12. **[ASSUMPTION]** A cancellation reason is required for confirmed challans.
13. Cancelled challans are not restored to Draft or Confirmed.

The assignment defines the Cancelled status but does not define stock behavior. Stock restoration is chosen to maintain inventory consistency and will be documented as an assumption in the final README.

---

## 9. Critical stock-confirmation transaction

### 9.1 Consistency requirement

**[SOURCE]** When a challan is confirmed, stock must be reduced. Stock must not become negative. Insufficient stock must produce a proper API error.

### 9.2 Unsafe approach that must not be used

```text
Read current stock
Check requested quantity
Write reduced stock
```

This sequence can oversell when two confirmations execute concurrently.

### 9.3 Required safe transaction

The confirmation operation must run as one atomic database transaction:

```text
1. Start transaction.
2. Lock or conditionally claim the draft challan.
3. Verify the challan is still DRAFT.
4. Load and lock all referenced products in deterministic ID order.
5. Validate that every product exists and is active.
6. Validate every requested quantity.
7. Compare requested and available stock for every line.
8. If any line is insufficient, roll back the complete transaction.
9. Deduct each stock quantity using a guarded update.
10. Insert one OUT stock movement for each item.
11. Mark the challan CONFIRMED.
12. Record confirmer and confirmation timestamp.
13. Commit.
```

Conceptual SQL:

```sql
BEGIN;

SELECT id, current_stock
FROM products
WHERE id IN (...)
ORDER BY id
FOR UPDATE;

-- Validate all requested quantities before making any change.

UPDATE products
SET current_stock = current_stock - :quantity
WHERE id = :product_id
  AND current_stock >= :quantity;

-- Verify one row was updated for every product.
-- Insert movement records.
-- Update challan only if it is still DRAFT.

COMMIT;
```

Rows are locked in deterministic order to reduce deadlock risk.

### 9.4 Insufficient-stock response

Recommended HTTP behavior:

```http
HTTP/1.1 409 Conflict
Content-Type: application/json
```

```json
{
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "One or more products do not have sufficient stock.",
    "details": [
      {
        "productId": "product-id",
        "sku": "SKU-001",
        "productName": "Product A",
        "requestedQuantity": 12,
        "availableQuantity": 7
      }
    ]
  }
}
```

No stock value or movement record may change when the transaction fails.

---

## 10. Automatic challan numbering

### 10.1 Required behavior

**[SOURCE]** Challan numbers must be generated automatically.

### 10.2 Selected design

Do not use `MAX(challan_number) + 1`, because simultaneous requests may generate duplicates.

Use a database-backed numeric sequence and format it as:

```text
CH-2026-000001
CH-2026-000002
CH-2026-000003
```

Proposed flow:

```text
1. Obtain a unique sequence value from the database.
2. Format the numeric value to six digits.
3. Add the current year and CH prefix.
4. Persist the unique formatted number.
```

The exact implementation will be finalized in Step 2 after evaluating Prisma migration behavior and PostgreSQL sequence options.

---

## 11. REST API baseline

### 11.1 Base path

```text
/api/v1
```

### 11.2 Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/login` | Authenticate a seeded user and return a JWT. |
| GET | `/auth/me` | Return the authenticated user's profile and role. |

### 11.3 Customers

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/customers` | Paginated, searchable, filterable customer list. |
| POST | `/customers` | Create a customer. |
| GET | `/customers/:id` | Return customer detail. |
| PATCH | `/customers/:id` | Update a customer. |
| GET | `/customers/:id/follow-ups` | Return chronological follow-up history. |
| POST | `/customers/:id/follow-ups` | Add a follow-up note. |

Example queries:

```text
GET /customers?page=1&limit=20
GET /customers?search=acme
GET /customers?status=LEAD
GET /customers?customerType=WHOLESALE
GET /customers?followUpFrom=2026-07-28&followUpTo=2026-08-05
```

### 11.4 Products and inventory

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/products` | Paginated product list. |
| POST | `/products` | Create a product and optional opening-stock movement. |
| GET | `/products/:id` | Return product detail. |
| PATCH | `/products/:id` | Update non-stock product data. |
| GET | `/products/:id/stock-movements` | Return movement history for one product. |
| POST | `/products/:id/stock-movements` | Record a manual IN or OUT adjustment. |
| GET | `/stock-movements` | Return global movement history. |

Example queries:

```text
GET /products?search=laptop
GET /products?category=Electronics
GET /products?warehouse=Main
GET /products?lowStock=true
GET /stock-movements?movementType=OUT
```

### 11.5 Challans

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/challans` | Paginated, searchable, filterable challan list. |
| POST | `/challans` | Create a draft challan. |
| GET | `/challans/:id` | Return challan details and item snapshots. |
| PATCH | `/challans/:id` | Edit a draft challan. |
| POST | `/challans/:id/confirm` | Confirm and deduct stock atomically. |
| POST | `/challans/:id/cancel` | Cancel a draft or confirmed challan according to authorization rules. |

Example queries:

```text
GET /challans?status=DRAFT
GET /challans?status=CONFIRMED
GET /challans?customerId=...
GET /challans?from=2026-07-01&to=2026-07-31
GET /challans?search=CH-2026-000001
```

The exact request and response schemas will be defined in Step 2.

---

## 12. API response and error conventions

### 12.1 Paginated list

```json
{
  "data": [
    {
      "id": "customer-id",
      "name": "ABC Traders"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 61,
    "totalPages": 4
  }
}
```

### 12.2 Single resource

```json
{
  "data": {
    "id": "customer-id",
    "name": "ABC Traders"
  }
}
```

### 12.3 Error envelope

```json
{
  "error": {
    "code": "PRODUCT_SKU_ALREADY_EXISTS",
    "message": "A product with SKU SKU-001 already exists.",
    "details": null
  }
}
```

### 12.4 HTTP status guidance

| Status | Usage |
|---:|---|
| 200 | Successful read or update. |
| 201 | Resource created. |
| 204 | Successful operation with no response body. |
| 400 | Invalid input or malformed request. |
| 401 | Missing, invalid, or expired authentication. |
| 403 | Authenticated user lacks permission. |
| 404 | Resource not found. |
| 409 | Duplicate value, invalid lifecycle transition, or insufficient stock. |
| 500 | Unexpected server failure. |

The global exception layer must avoid exposing stack traces, SQL fragments, JWT secrets, or internal environment values.

---

## 13. Validation baseline

### 13.1 Customer

- Customer name is required.
- Mobile number is required.
- Email is required and must be valid.
- Business name is required.
- GST number is optional.
- Customer type must be Retail, Wholesale, or Distributor.
- Status must be Lead, Active, or Inactive.
- Address is required.
- Follow-up date must be valid when supplied.
- Notes must have a defined maximum length.

The assignment explicitly marks only GST number as optional. The implementation therefore treats the remaining listed fields as required unless a later documented usability decision changes that rule.

### 13.2 Product

- Name is required.
- SKU is required, normalized, and unique.
- Category is required.
- Unit price must be non-negative.
- Opening stock must be non-negative.
- Minimum-stock alert quantity must be non-negative.
- Warehouse/location is required.
- Current stock cannot be changed through an ordinary product edit request.

### 13.3 Stock movement

- Quantity must be a positive integer.
- Movement type must be IN or OUT.
- Reason is required.
- An OUT movement must not produce negative stock.
- Creator and timestamp are server-controlled.
- Existing movement records cannot be edited or deleted.

### 13.4 Challan

- Customer must exist.
- At least one product item is required.
- Every quantity must be a positive integer.
- Duplicate product lines are rejected or normalized consistently.
- Every product must exist and be active.
- Total quantity and line totals are server-calculated.
- Snapshot fields are copied from server-side product records.
- Only a Draft challan may be edited or confirmed.
- Confirmation validates all stock before committing any deduction.
- A challan cannot be confirmed or cancelled twice.

---

## 14. Frontend information architecture

### 14.1 Routes

```text
/login
/dashboard

/customers
/customers/new
/customers/:id
/customers/:id/edit

/products
/products/new
/products/:id
/products/:id/edit

/challans
/challans/new
/challans/:id
/challans/:id/edit

/403
/404
```

### 14.2 Dashboard

The dashboard remains intentionally small:

- Total customers
- Active customers
- Leads requiring follow-up
- Total products
- Low-stock products
- Draft challans
- Confirmed challans

### 14.3 Customer detail

- Customer identity and business data
- Customer type and status
- Current follow-up date
- General notes
- Follow-up timeline
- Add-follow-up form
- Related challan history

### 14.4 Product detail

- Product identity and pricing
- Current stock
- Minimum-stock threshold
- Low-stock warning
- Manual stock IN/OUT action for authorized users
- Stock movement timeline

### 14.5 Challan create/edit

- Customer search and selection
- Product search and selection
- Multiple line items
- Quantity entry
- Available-stock display
- Item removal
- Total quantity
- Informational total amount based on snapshot price
- Save Draft action
- Confirm action

The frontend may display warnings before confirmation, but all stock validation remains authoritative on the server.

### 14.6 Role-aware user interface

- Unauthorized navigation items may be hidden.
- Unauthorized buttons must be hidden or disabled with a clear explanation.
- Direct navigation to a forbidden route must render a 403 state or redirect safely.
- The frontend must still handle a backend 403 because UI restrictions are not security enforcement.

---

## 15. Security baseline

### 15.1 Authentication

- Passwords are hashed with bcrypt.
- JWT signing secret is stored only in environment variables.
- Tokens have a reasonable expiration time.
- Login errors do not reveal whether the email or password was incorrect.
- Disabled users cannot authenticate.

### 15.2 Authorization

- A reusable backend role guard protects restricted endpoints.
- Service-layer checks enforce lifecycle and ownership-independent business rules.
- Frontend role checks mirror, but never replace, backend authorization.

### 15.3 Input and output safety

- DTO validation rejects unexpected or malformed input.
- IDs are validated before database access.
- Database uniqueness constraints back application validation.
- API errors do not expose stack traces or internal query text.
- Search parameters have sensible maximum lengths.
- Pagination limits have an enforced maximum.

### 15.4 Operational safety

- `.env` files are ignored by Git.
- `.env.example` contains names and safe sample values only.
- CORS is limited to configured frontend origins.
- Production logs exclude passwords, tokens, and secrets.
- Database migrations are run explicitly during deployment.

### 15.5 Scope-limited security decision

**[ASSUMPTION]** A single JWT access token is acceptable for this assessment because the assignment explicitly allows simple JWT authentication. Refresh-token rotation, token revocation infrastructure, MFA, and password recovery are outside the 48-hour core scope and must be listed as future improvements rather than silently omitted.

---

## 16. Testing strategy

The project does not need broad low-value coverage. It needs focused verification of business-critical behavior.

### 16.1 Authentication and authorization

- Correct credentials return a JWT.
- Incorrect credentials return 401.
- A disabled user cannot log in.
- Sales cannot record manual stock adjustments.
- Warehouse cannot create a challan.
- Accounts cannot edit customers.
- Admin can perform all protected actions.

### 16.2 Customers

- Create a valid customer.
- Reject missing required fields.
- Search by customer name.
- Search by mobile number.
- Filter by status and customer type.
- Add a follow-up note.
- Return follow-up history in chronological order.

### 16.3 Products and inventory

- Create a product with a unique SKU.
- Reject a duplicate SKU.
- Opening stock creates an IN movement.
- Manual IN increases stock and records before/after balances.
- Valid manual OUT decreases stock.
- Excess manual OUT returns 409.
- A failed movement does not create a movement record.
- Direct product edit cannot alter current stock.

### 16.4 Challans

- Draft creation does not alter stock.
- Draft editing does not alter stock.
- Confirmation deducts the correct quantities.
- Confirmation creates one OUT movement per item.
- Confirmation stores product snapshot values.
- Confirmation calculates total quantity on the server.
- Insufficient stock rolls back the complete transaction.
- A second confirmation does not deduct stock again.
- A confirmed challan cannot be edited.
- Cancelling a draft does not alter stock.
- Admin cancellation of a confirmed challan restores stock once.
- Concurrent confirmations cannot oversell the same product.

### 16.5 Highest-priority automated tests

```text
1. Insufficient stock causes a complete rollback.
2. Concurrent confirmations cannot create negative stock.
3. Confirming the same challan twice deducts stock only once.
4. Cancelling a confirmed challan restores stock only once.
```

---

## 17. Deployment strategy

### 17.1 Recommended free-hosting path

```text
Frontend: Vercel
Backend: Render or Railway
Database: Neon PostgreSQL
```

This is selected because it is lower-risk than introducing AWS infrastructure during a short assignment. AWS remains a bonus option only after the complete application and documentation are stable.

### 17.2 Environment variables

Backend example:

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN_SECONDS=28800
CORS_ORIGINS=http://localhost:5173
ADMIN_SEED_PASSWORD=
SALES_SEED_PASSWORD=
WAREHOUSE_SEED_PASSWORD=
ACCOUNTS_SEED_PASSWORD=
```

Frontend example:

```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

### 17.3 Deployment verification

Production verification must include:

- Frontend loads successfully.
- API health endpoint responds.
- Database connection works.
- Migrations are applied.
- Seeded role accounts can log in.
- CORS permits only the deployed frontend.
- Customer flow works.
- Product and stock flow works.
- Draft and confirmation flow works.
- Insufficient-stock rollback works.
- Production URLs and credentials are recorded for submission.

---

## 18. Planned 48-hour allocation

| Period | Work |
|---|---|
| Hours 0–3 | Repository, NestJS, React, PostgreSQL, Prisma, linting, formatting. |
| Hours 3–7 | Database schema, migrations, and seed users. |
| Hours 7–11 | JWT authentication and role guards. |
| Hours 11–16 | Customer CRM backend and frontend. |
| Hours 16–21 | Product, inventory movements, and frontend. |
| Hours 21–28 | Challan draft, snapshot, numbering, confirmation transaction. |
| Hours 28–33 | Challan frontend and role-aware navigation/actions. |
| Hours 33–37 | Integration tests, rollback tests, authorization, and error handling. |
| Hours 37–40 | Responsive cleanup, dashboard, loading, empty, and error states. |
| Hours 40–43 | Swagger, Postman, README, architecture notes, assumptions. |
| Hours 43–46 | Deployment, migrations, seed, and production smoke tests. |
| Hours 46–48 | Recording, screenshots, submission review, and buffer. |

The schedule protects core functionality by delaying optional polish and bonus work until after the transactional flow is stable.

---

## 19. Git and repository quality

Recommended commit sequence:

```text
chore: initialize api and web applications
chore: configure prisma and postgres
feat: add database schema and seed users
feat: implement jwt authentication
feat: add role-based authorization guards
feat: implement customer crm APIs
feat: build customer management interface
feat: implement products and stock movements
feat: build inventory management interface
feat: implement draft challan workflow
feat: add transactional challan confirmation
feat: implement challan cancellation and stock reversal
feat: build challan management interface
test: cover authentication and inventory business rules
docs: add swagger and postman collection
docs: add setup deployment and architecture guide
chore: configure production deployment
fix: resolve final integration and responsive issues
```

Repository rules:

- Avoid one large final commit.
- Do not commit secrets or generated build output.
- Keep the main branch in a runnable state.
- Include an accurate README.
- Record known limitations instead of hiding them.
- Tag or identify the final submitted commit.

---

## 20. Assumptions register

| ID | Assumption | Reason |
|---|---|---|
| A-01 | The system serves one wholesale/distribution company. | Multi-company behavior is not required. |
| A-02 | User accounts are seeded; user management is outside scope. | The assignment asks for login and roles, not user administration. |
| A-03 | Inventory quantities are whole numbers. | Fractional units are not specified. |
| A-04 | `warehouse_location` is a product field rather than a warehouse entity. | The assignment asks for location/warehouse but not multi-warehouse stock. |
| A-05 | Products are deactivated rather than hard-deleted. | Preserves historical references and snapshots. |
| A-06 | Customer hard deletion is not required. | Not stated and could damage history. |
| A-07 | Confirmed challans are immutable. | Preserves audit consistency after stock deduction. |
| A-08 | Admin cancellation of a confirmed challan restores stock. | The assignment defines Cancelled but not the stock consequence. |
| A-09 | GST numbers are stored but not externally verified. | No external tax-validation integration is required. |
| A-10 | Purchase orders, invoices, payments, and taxes are outside core scope. | They are not among the defined core modules. |
| A-11 | Prices use decimal database values. | Prevents floating-point monetary errors. |
| A-12 | Product snapshot data remains unchanged after confirmation. | Required for historical accuracy. |
| A-13 | A single JWT access token is sufficient for the case study. | The assignment explicitly accepts simple JWT authentication. |
| A-14 | Stock movements are immutable. | Audit records should not be silently rewritten. |
| A-15 | Dates are stored in UTC and displayed in the user's local timezone. | Provides predictable server behavior. |
| A-16 | Search is case-insensitive where supported. | Improves admin usability. |
| A-17 | Pagination defaults to 20 and has a maximum limit. | Prevents unbounded list queries. |

---

## 21. Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Scope expands into purchase orders, invoices, payments, or multi-warehouse logic. | Core modules remain incomplete. | Enforce the P0/P1/P2 scope and exclusions in this document. |
| Concurrent challan confirmation oversells stock. | Critical business failure. | Use a transaction, deterministic locking/guarded updates, and concurrency tests. |
| Challan is confirmed twice. | Duplicate stock deduction. | Enforce lifecycle condition in the database transaction and return 409. |
| Product changes alter old challans. | Historical data becomes inaccurate. | Store snapshot values on challan items. |
| Role checks exist only in the frontend. | Unauthorized API actions become possible. | Use backend guards and service checks. |
| Deployment consumes too much time. | No usable submission. | Complete local flow and documentation first; use low-risk free hosting. |
| ORM cannot express required locking cleanly. | Inventory correctness is weakened. | Use narrow, parameterized raw SQL inside a transaction. |
| Environment secrets are committed. | Security and evaluation issue. | `.gitignore`, `.env.example`, and pre-submission repository scan. |
| UI polish displaces testing. | Attractive but incorrect system. | Finish transaction tests before dashboard or bonus work. |
| Free hosting sleeps or has cold starts. | Demo appears unreliable. | Document expected behavior and warm services before recording/demo. |

---

## 22. Definition of done for the complete case study

The implementation is ready for final submission only when the following demonstration succeeds:

```text
1. Log in as Warehouse.
2. Create a product with opening stock.
3. Add another stock-IN movement.
4. Log in as Sales.
5. Create a customer.
6. Add a CRM follow-up note.
7. Create a challan with multiple products.
8. Save it as Draft.
9. Edit the Draft.
10. Confirm it.
11. Verify that stock decreases.
12. Verify that OUT movements were created.
13. Open the challan and verify snapshot details.
14. Attempt a challan requiring more stock than is available.
15. Verify a clear error and no partial stock deduction.
16. Log in as Accounts and verify read-only access.
17. Log in as Admin and cancel a confirmed challan.
18. Verify one-time stock restoration and IN movements.
19. Verify a second cancel or confirm attempt is rejected.
20. Verify the documented setup works from a clean environment.
```

Submission readiness also requires:

- Repository link.
- Live frontend URL or documented local alternative.
- Live backend API URL or documented local alternative.
- Credentials for all required roles.
- Postman collection or Swagger API documentation.
- README with local setup and deployment.
- Architecture explanation.
- Assumptions and limitations.
- Full-flow recording when required.
- Clean final Git status and identifiable submitted commit.

---

## 23. Step 1 acceptance criteria

Step 1 is complete when all of the following are true:

- [x] Assignment requirements have been extracted and categorized.
- [x] Source requirements are distinguished from implementation decisions and assumptions.
- [x] P0, P1, P2, and excluded scope are defined.
- [x] Backend, frontend, database, and repository architecture are selected.
- [x] Required roles and the initial permission matrix are defined.
- [x] Core domain entities and relationships are identified.
- [x] Challan lifecycle and cancellation assumptions are documented.
- [x] Atomic stock-confirmation behavior is defined.
- [x] API routes and response conventions are outlined.
- [x] Frontend routes and primary page responsibilities are outlined.
- [x] Security and validation baselines are recorded.
- [x] High-priority tests are identified.
- [x] Deployment and submission paths are selected.
- [x] Risks, assumptions, and definition of done are documented.
- [x] A handoff to Step 2 is defined.

---

## 24. Step 1 deliverables

- `00_DOCUMENTATION_INDEX.md`
- `01_REQUIREMENTS_SCOPE_AND_ARCHITECTURE.md`

Recommended repository destination:

```text
docs/case-study/
```

---

## 25. Handoff to Step 2

Step 2 must turn the conceptual design into exact implementation contracts. It must produce:

1. Final Prisma models and enums.
2. Database constraints and indexes.
3. Migration strategy.
4. Sequence-safe challan-number design.
5. Seed-data specification.
6. DTOs and validation rules.
7. Exact endpoint request and response payloads.
8. Error-code catalog.
9. Authorization per endpoint.
10. Transaction pseudocode or implementation contract for stock updates.
11. Pagination, search, sorting, and filtering contracts.
12. Step 2 acceptance criteria and tests.

No project initialization or feature coding should begin until the schema and contracts are sufficiently stable to avoid unnecessary rework.

---

## 26. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Created the complete Step 1 requirements, scope, architecture, assumptions, risk, test, and delivery baseline. |
| 1.1 | 2026-07-28 | Clarified that the Step 1 document/design is complete while application implementation remains Not Started. |
| 1.2 | 2026-07-28 | Harmonized environment-variable names with the foundation, authentication, and deployment specifications. |
| 1.3 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.4 | 2026-07-28 | Closed the requirements and architecture baseline against the implemented Steps 2–11 and verified evidence. |

<!-- END 01_REQUIREMENTS_SCOPE_AND_ARCHITECTURE.md -->

---

<!-- BEGIN 02_DATABASE_SCHEMA_AND_API_CONTRACTS.md -->

# Step 2 — Database Schema and API Contracts

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-02  
**Version:** 1.5  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  
**Depends on:** `01_REQUIREMENTS_SCOPE_AND_ARCHITECTURE.md`

---

## 1. Purpose

This document turns the Step 1 domain model into exact database and HTTP contracts. It is intended to prevent schema drift, inconsistent endpoint behavior, and late-stage rework during the 48-hour implementation window.

It defines:

- PostgreSQL and Prisma data models.
- Enum values, field types, relationships, constraints, and indexes.
- Safe challan-number allocation.
- Seed-data requirements.
- REST endpoint paths and authorization.
- Request and response payloads.
- Pagination, filtering, sorting, validation, and error formats.
- Transaction boundaries for stock-changing operations.
- Migration and compatibility rules.

This is a pre-implementation specification. Code, migrations, test output, and deployed responses must be added as evidence during implementation rather than assumed to exist.

---

## 2. Source-derived requirements

**[SOURCE]** The system must use PostgreSQL or MySQL and expose REST APIs with validation and clear error handling.

**[SOURCE]** Authentication must support Admin, Sales, Warehouse, and Accounts roles using simple JWT-based authentication.

**[SOURCE]** Customer records must cover identity, contact, business, customer type, address, status, follow-up date, notes, and follow-up notes.

**[SOURCE]** Product records must cover product name, SKU/code, category, unit price, current stock, minimum-stock alert quantity, and warehouse/location.

**[SOURCE]** Stock history must track the product, quantity changed, IN/OUT direction, reason, creator, and timestamp.

**[SOURCE]** A challan must support one customer, multiple products and quantities, automatic numbering, Draft/Confirmed/Cancelled status, creator, and created date.

**[SOURCE]** Confirming a challan must reduce stock, never produce negative stock, return a proper error for insufficient stock, and preserve product snapshot data rather than only product IDs.

**[SOURCE]** APIs must use suitable status codes, validation, error messages, pagination where needed, and search/filtering where needed.

---

## 3. Locked design decisions

### 3.1 Database and ORM

**[DECISION]** Use PostgreSQL with Prisma ORM.

**[DECISION]** Use UUIDs for public and relational entity identifiers. A separate integer sequence is used only for human-readable challan numbering.

**[DECISION]** Store all timestamps in UTC and serialize them as ISO 8601 strings.

**[DECISION]** Store money as PostgreSQL `NUMERIC(12,2)` through Prisma `Decimal`; never use JavaScript floating-point values as authoritative monetary storage.

**[DECISION]** Store stock as non-negative integers. Fractional units are outside this case-study scope.

**[DECISION]** Normalize emails to lowercase and SKUs to uppercase before validation and persistence.

**[DECISION]** Do not expose direct writes to `Product.currentStock`. Every stock change must go through an auditable stock operation.

**[DECISION]** Do not physically delete products, movements, challans, or customer follow-ups through public APIs. Products use `isActive`; challans use lifecycle status.

### 3.2 Naming convention

| Layer | Convention | Example |
|---|---|---|
| PostgreSQL tables/columns | snake_case | `stock_movements`, `created_at` |
| Prisma models/fields | PascalCase/camelCase | `StockMovement`, `createdAt` |
| JSON properties | camelCase | `minimumStockAlertQuantity` |
| API resources | plural kebab-case where needed | `/stock-movements` |
| Error codes | UPPER_SNAKE_CASE | `INSUFFICIENT_STOCK` |

---

## 4. Canonical Prisma schema

The following schema is the implementation target. Package generation details belong to Step 3, but entity and relation changes require an explicit update to this document.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  ADMIN
  SALES
  WAREHOUSE
  ACCOUNTS
}

enum CustomerType {
  RETAIL
  WHOLESALE
  DISTRIBUTOR
}

enum CustomerStatus {
  LEAD
  ACTIVE
  INACTIVE
}

enum StockMovementType {
  IN
  OUT
}

enum StockReferenceType {
  OPENING_STOCK
  MANUAL_ADJUSTMENT
  CHALLAN_CONFIRMATION
  CHALLAN_CANCELLATION
}

enum ChallanStatus {
  DRAFT
  CONFIRMED
  CANCELLED
}

model User {
  id           String   @id @default(uuid()) @db.Uuid
  name         String   @db.VarChar(120)
  email        String   @unique @db.VarChar(254)
  passwordHash String   @map("password_hash") @db.VarChar(100)
  role         UserRole
  isActive     Boolean  @default(true) @map("is_active")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  customersCreated      Customer[]         @relation("CustomerCreatedBy")
  followUpsCreated      CustomerFollowUp[] @relation("FollowUpCreatedBy")
  productsCreated       Product[]          @relation("ProductCreatedBy")
  stockMovementsCreated StockMovement[]    @relation("StockMovementCreatedBy")
  challansCreated       Challan[]          @relation("ChallanCreatedBy")
  challansConfirmed     Challan[]          @relation("ChallanConfirmedBy")
  challansCancelled     Challan[]          @relation("ChallanCancelledBy")

  @@index([role, isActive])
  @@map("users")
}

model Customer {
  id             String         @id @default(uuid()) @db.Uuid
  name           String         @db.VarChar(160)
  mobileNumber   String         @map("mobile_number") @db.VarChar(24)
  email          String         @db.VarChar(254)
  businessName   String         @map("business_name") @db.VarChar(180)
  gstNumber      String?        @map("gst_number") @db.VarChar(32)
  customerType   CustomerType   @map("customer_type")
  address        String         @db.Text
  status         CustomerStatus @default(LEAD)
  followUpDate   DateTime       @map("follow_up_date")
  notes          String         @db.Text
  createdById    String         @map("created_by_id") @db.Uuid
  createdAt      DateTime       @default(now()) @map("created_at")
  updatedAt      DateTime       @updatedAt @map("updated_at")

  createdBy User               @relation("CustomerCreatedBy", fields: [createdById], references: [id], onDelete: Restrict)
  followUps CustomerFollowUp[]
  challans  Challan[]

  @@index([name])
  @@index([mobileNumber])
  @@index([businessName])
  @@index([customerType])
  @@index([status])
  @@index([followUpDate])
  @@index([createdAt])
  @@map("customers")
}

model CustomerFollowUp {
  id               String    @id @default(uuid()) @db.Uuid
  customerId       String    @map("customer_id") @db.Uuid
  note             String    @db.Text
  nextFollowUpDate DateTime? @map("next_follow_up_date")
  createdById      String    @map("created_by_id") @db.Uuid
  createdAt        DateTime  @default(now()) @map("created_at")

  customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  createdBy User    @relation("FollowUpCreatedBy", fields: [createdById], references: [id], onDelete: Restrict)

  @@index([customerId, createdAt])
  @@index([nextFollowUpDate])
  @@map("customer_follow_ups")
}

model Product {
  id                        String   @id @default(uuid()) @db.Uuid
  name                      String   @db.VarChar(180)
  sku                       String   @unique @db.VarChar(64)
  category                  String   @db.VarChar(120)
  unitPrice                 Decimal  @map("unit_price") @db.Decimal(12, 2)
  currentStock              Int      @default(0) @map("current_stock")
  minimumStockAlertQuantity Int      @default(0) @map("minimum_stock_alert_quantity")
  warehouseLocation         String   @map("warehouse_location") @db.VarChar(160)
  isActive                  Boolean  @default(true) @map("is_active")
  createdById               String   @map("created_by_id") @db.Uuid
  createdAt                 DateTime @default(now()) @map("created_at")
  updatedAt                 DateTime @updatedAt @map("updated_at")

  createdBy      User            @relation("ProductCreatedBy", fields: [createdById], references: [id], onDelete: Restrict)
  stockMovements StockMovement[]
  challanItems   ChallanItem[]

  @@index([name])
  @@index([category])
  @@index([warehouseLocation])
  @@index([isActive])
  @@index([currentStock, minimumStockAlertQuantity])
  @@map("products")
}

model ChallanCounter {
  key       String   @id @db.VarChar(40)
  nextValue Int      @default(1) @map("next_value")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("challan_counters")
}

model Challan {
  id                 String        @id @default(uuid()) @db.Uuid
  sequenceNumber     Int           @unique @map("sequence_number")
  challanNumber      String        @unique @map("challan_number") @db.VarChar(32)
  customerId         String        @map("customer_id") @db.Uuid
  status             ChallanStatus @default(DRAFT)
  totalQuantity      Int           @map("total_quantity")
  totalAmount        Decimal       @map("total_amount") @db.Decimal(14, 2)
  createdById        String        @map("created_by_id") @db.Uuid
  confirmedById      String?       @map("confirmed_by_id") @db.Uuid
  cancelledById      String?       @map("cancelled_by_id") @db.Uuid
  confirmedAt        DateTime?     @map("confirmed_at")
  cancelledAt        DateTime?     @map("cancelled_at")
  cancellationReason String?       @map("cancellation_reason") @db.Text
  createdAt          DateTime      @default(now()) @map("created_at")
  updatedAt          DateTime      @updatedAt @map("updated_at")

  customer       Customer        @relation(fields: [customerId], references: [id], onDelete: Restrict)
  createdBy      User            @relation("ChallanCreatedBy", fields: [createdById], references: [id], onDelete: Restrict)
  confirmedBy    User?           @relation("ChallanConfirmedBy", fields: [confirmedById], references: [id], onDelete: Restrict)
  cancelledBy    User?           @relation("ChallanCancelledBy", fields: [cancelledById], references: [id], onDelete: Restrict)
  items          ChallanItem[]
  stockMovements StockMovement[]

  @@index([status, createdAt])
  @@index([customerId, createdAt])
  @@index([createdById, createdAt])
  @@map("challans")
}

model ChallanItem {
  id                        String   @id @default(uuid()) @db.Uuid
  challanId                 String   @map("challan_id") @db.Uuid
  productId                 String   @map("product_id") @db.Uuid
  lineNumber                Int      @map("line_number")
  productNameSnapshot       String   @map("product_name_snapshot") @db.VarChar(180)
  productSkuSnapshot        String   @map("product_sku_snapshot") @db.VarChar(64)
  productCategorySnapshot   String   @map("product_category_snapshot") @db.VarChar(120)
  unitPriceSnapshot         Decimal  @map("unit_price_snapshot") @db.Decimal(12, 2)
  warehouseLocationSnapshot String   @map("warehouse_location_snapshot") @db.VarChar(160)
  quantity                  Int
  lineTotal                 Decimal  @map("line_total") @db.Decimal(14, 2)
  createdAt                 DateTime @default(now()) @map("created_at")
  updatedAt                 DateTime @updatedAt @map("updated_at")

  challan Challan @relation(fields: [challanId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Restrict)

  @@unique([challanId, productId])
  @@unique([challanId, lineNumber])
  @@index([productId])
  @@map("challan_items")
}

model StockMovement {
  id            String             @id @default(uuid()) @db.Uuid
  productId     String             @map("product_id") @db.Uuid
  movementType  StockMovementType  @map("movement_type")
  quantity      Int
  reason        String             @db.VarChar(300)
  balanceBefore Int                @map("balance_before")
  balanceAfter  Int                @map("balance_after")
  referenceType StockReferenceType @map("reference_type")
  challanId     String?            @map("challan_id") @db.Uuid
  createdById   String             @map("created_by_id") @db.Uuid
  createdAt     DateTime           @default(now()) @map("created_at")

  product   Product   @relation(fields: [productId], references: [id], onDelete: Restrict)
  challan   Challan?  @relation(fields: [challanId], references: [id], onDelete: Restrict)
  createdBy User      @relation("StockMovementCreatedBy", fields: [createdById], references: [id], onDelete: Restrict)

  @@index([productId, createdAt])
  @@index([movementType, createdAt])
  @@index([referenceType, createdAt])
  @@unique([challanId, productId, referenceType])
  @@index([challanId])
  @@index([createdById, createdAt])
  @@map("stock_movements")
}
```

---

## 5. Database-level constraints not fully represented by Prisma

A migration must add checks so invalid values cannot be inserted even if application validation is bypassed.

```sql
ALTER TABLE products
  ADD CONSTRAINT products_unit_price_non_negative
    CHECK (unit_price >= 0),
  ADD CONSTRAINT products_current_stock_non_negative
    CHECK (current_stock >= 0),
  ADD CONSTRAINT products_minimum_stock_non_negative
    CHECK (minimum_stock_alert_quantity >= 0);

ALTER TABLE stock_movements
  ADD CONSTRAINT stock_movements_quantity_positive
    CHECK (quantity > 0),
  ADD CONSTRAINT stock_movements_balances_non_negative
    CHECK (balance_before >= 0 AND balance_after >= 0),
  ADD CONSTRAINT stock_movements_direction_matches_balance
    CHECK (
      (movement_type = 'IN'  AND balance_after = balance_before + quantity)
      OR
      (movement_type = 'OUT' AND balance_after = balance_before - quantity)
    );

ALTER TABLE challans
  ADD CONSTRAINT challans_total_quantity_positive
    CHECK (total_quantity > 0),
  ADD CONSTRAINT challans_total_amount_non_negative
    CHECK (total_amount >= 0),
  ADD CONSTRAINT challans_confirmation_fields_consistent
    CHECK (
      (status <> 'CONFIRMED')
      OR (confirmed_at IS NOT NULL AND confirmed_by_id IS NOT NULL)
    ),
  ADD CONSTRAINT challans_cancellation_fields_consistent
    CHECK (
      (status <> 'CANCELLED')
      OR (cancelled_at IS NOT NULL AND cancelled_by_id IS NOT NULL)
    );

ALTER TABLE challan_items
  ADD CONSTRAINT challan_items_line_number_positive
    CHECK (line_number > 0),
  ADD CONSTRAINT challan_items_quantity_positive
    CHECK (quantity > 0),
  ADD CONSTRAINT challan_items_price_non_negative
    CHECK (unit_price_snapshot >= 0 AND line_total >= 0),
  ADD CONSTRAINT challan_items_line_total_consistent
    CHECK (line_total = ROUND(unit_price_snapshot * quantity, 2));
```

### 5.1 Conditional reference constraint

A challan-backed stock movement must reference a challan; non-challan movements must not.

```sql
ALTER TABLE stock_movements
  ADD CONSTRAINT stock_movements_reference_consistent
  CHECK (
    (reference_type IN ('CHALLAN_CONFIRMATION', 'CHALLAN_CANCELLATION') AND challan_id IS NOT NULL)
    OR
    (reference_type IN ('OPENING_STOCK', 'MANUAL_ADJUSTMENT') AND challan_id IS NULL)
  );
```

### 5.2 Immutability policy

**[DECISION]** Immutability of `stock_movements` is enforced at the service/API layer for the case study. No update or delete endpoint will exist. A database trigger may be added later, but it is not required for P0 delivery.

---

## 6. Challan-number allocation

### 6.1 Required behavior

- Numbers must be unique under concurrent requests.
- The application must not use `SELECT MAX(...) + 1`.
- A failed transaction may consume a sequence value; gaps are acceptable.
- The public format is `CH-YYYY-NNNNNN`.
- The year is derived from the server-side UTC date at creation.

### 6.2 Counter row

Seed one row:

```text
key: sales_challan
next_value: 1
```

### 6.3 Allocation SQL

Run inside the same database transaction that creates the challan:

```sql
UPDATE challan_counters
SET next_value = next_value + 1,
    updated_at = NOW()
WHERE key = 'sales_challan'
RETURNING next_value - 1 AS allocated_number;
```

Then format:

```text
sequenceNumber = allocated_number
challanNumber  = `CH-${utcYear}-${sequenceNumber padded to 6 digits}`
```

The row-level update lock serializes number allocation safely.

---

## 7. Seed-data contract

### 7.1 Required users

The seed must create or update one active account for each role:

| Role | Default seed email environment variable |
|---|---|
| Admin | `ADMIN_SEED_EMAIL` |
| Sales | `SALES_SEED_EMAIL` |
| Warehouse | `WAREHOUSE_SEED_EMAIL` |
| Accounts | `ACCOUNTS_SEED_EMAIL` |

Passwords come from corresponding `*_SEED_PASSWORD` variables. The seed must refuse to run with missing or obviously placeholder passwords outside automated test mode.

### 7.2 Seed characteristics

- Idempotent: rerunning does not create duplicate users.
- Passwords are hashed before storage.
- Emails are normalized to lowercase.
- The challan counter is upserted.
- Optional demo customers and products are allowed only when `SEED_DEMO_DATA=true`.
- Secrets and plaintext passwords must never be committed.

---

## 8. Global HTTP conventions

### 8.1 Base path and media type

```text
Base path: /api/v1
Content-Type: application/json
Authentication: Authorization: Bearer <access-token>
```

### 8.2 Date and decimal serialization

- Dates: ISO 8601 UTC, for example `2026-07-28T08:15:30.000Z`.
- Monetary values: JSON strings with two decimal places, for example `"1250.00"`.
- IDs: UUID strings.

### 8.3 Success envelope

Single resource:

```json
{
  "data": {
    "id": "b9ac0ec6-851e-4a77-91c3-c0943b230516"
  }
}
```

Collection:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

Mutation without a useful response body may return `204 No Content`; otherwise it returns the affected resource.

### 8.4 Error envelope

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request contains invalid values.",
    "details": [
      {
        "field": "email",
        "message": "email must be a valid email address"
      }
    ],
    "requestId": "req_01J..."
  }
}
```

- `message` is safe for users.
- `details` is optional and contains field or conflict details.
- `requestId` enables log correlation.
- Stack traces, SQL, secrets, and internal exception text are never returned in production.

### 8.5 Pagination

Common query parameters:

| Parameter | Default | Constraint |
|---|---:|---|
| `page` | 1 | Integer, minimum 1 |
| `limit` | 20 | Integer, 1–100 |
| `sortOrder` | `desc` | `asc` or `desc` |

Invalid pagination returns `400 VALIDATION_FAILED`; it is not silently coerced to unsafe values.

### 8.6 Search behavior

- Trim surrounding whitespace.
- Ignore an empty search string.
- Use case-insensitive matching.
- Limit search text to 100 characters.
- Escape and parameterize all database input through Prisma.

---

## 9. Authentication API

### 9.1 `POST /api/v1/auth/login`

**Authorization:** Public  
**Rate limit:** Strict login policy defined in Step 4

Request:

```json
{
  "email": "sales@example.com",
  "password": "assessment-password"
}
```

Validation:

- `email`: required, valid email, maximum 254 characters.
- `password`: required, 8–128 characters.

Response: `200 OK`

```json
{
  "data": {
    "accessToken": "<jwt>",
    "tokenType": "Bearer",
    "expiresIn": 28800,
    "user": {
      "id": "uuid",
      "name": "Sales User",
      "email": "sales@example.com",
      "role": "SALES"
    }
  }
}
```

Failure:

- `401 AUTH_INVALID_CREDENTIALS` for unknown email, invalid password, or inactive account. The message does not reveal which condition failed.

### 9.2 `GET /api/v1/auth/me`

**Authorization:** Any authenticated active user

Response: `200 OK`

```json
{
  "data": {
    "id": "uuid",
    "name": "Sales User",
    "email": "sales@example.com",
    "role": "SALES",
    "isActive": true
  }
}
```

---

## 10. Customer CRM API

### 10.1 Customer representation

```json
{
  "id": "uuid",
  "name": "ABC Traders",
  "mobileNumber": "+9779812345678",
  "email": "contact@abctraders.example",
  "businessName": "ABC Traders Pvt. Ltd.",
  "gstNumber": "GST-12345",
  "customerType": "WHOLESALE",
  "address": "Kathmandu, Nepal",
  "status": "LEAD",
  "followUpDate": "2026-07-31T00:00:00.000Z",
  "notes": "Interested in a bulk order.",
  "createdBy": {
    "id": "uuid",
    "name": "Sales User"
  },
  "createdAt": "2026-07-28T08:15:30.000Z",
  "updatedAt": "2026-07-28T08:15:30.000Z"
}
```

### 10.2 `GET /api/v1/customers`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

Query parameters:

| Parameter | Behavior |
|---|---|
| `page`, `limit` | Standard pagination |
| `search` | Name, mobile, email, business name, or GST number |
| `status` | `LEAD`, `ACTIVE`, or `INACTIVE` |
| `customerType` | `RETAIL`, `WHOLESALE`, or `DISTRIBUTOR` |
| `followUpFrom` | Inclusive UTC date/time |
| `followUpTo` | Inclusive UTC date/time |
| `sortBy` | `name`, `businessName`, `followUpDate`, `createdAt`, `updatedAt` |
| `sortOrder` | `asc` or `desc` |

### 10.3 `POST /api/v1/customers`

**Authorization:** ADMIN, SALES

Request:

```json
{
  "name": "ABC Traders",
  "mobileNumber": "+9779812345678",
  "email": "contact@abctraders.example",
  "businessName": "ABC Traders Pvt. Ltd.",
  "gstNumber": "GST-12345",
  "customerType": "WHOLESALE",
  "address": "Kathmandu, Nepal",
  "status": "LEAD",
  "followUpDate": "2026-07-31T00:00:00.000Z",
  "notes": "Interested in a bulk order."
}
```

Response: `201 Created` with the customer representation.

### 10.4 `GET /api/v1/customers/:id`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

Returns the customer plus summary counts. Follow-up history and challan history are independently paginated endpoints rather than an unbounded nested payload.

### 10.5 `PATCH /api/v1/customers/:id`

**Authorization:** ADMIN, SALES

- All fields are optional.
- An empty object is invalid.
- The server retains immutable audit fields.

Response: `200 OK` with the updated record.

### 10.6 `GET /api/v1/customers/:id/follow-ups`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

Query parameters: `page`, `limit`, `sortOrder`.

### 10.7 `POST /api/v1/customers/:id/follow-ups`

**Authorization:** ADMIN, SALES

Request:

```json
{
  "note": "Customer requested a revised quotation.",
  "nextFollowUpDate": "2026-08-03T00:00:00.000Z"
}
```

The service creates an immutable follow-up and, when `nextFollowUpDate` is supplied, updates the customer's current `followUpDate` in the same transaction.

Response: `201 Created`.

### 10.8 `GET /api/v1/customers/:id/challans`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

Returns paginated challan summaries for the customer. This keeps the customer detail page efficient.

---

## 11. Product and inventory API

### 11.1 Product representation

```json
{
  "id": "uuid",
  "name": "Industrial Adhesive 5L",
  "sku": "ADH-005L",
  "category": "Adhesives",
  "unitPrice": "2450.00",
  "currentStock": 42,
  "minimumStockAlertQuantity": 10,
  "warehouseLocation": "Main Warehouse / Rack B2",
  "isActive": true,
  "isLowStock": false,
  "createdAt": "2026-07-28T08:15:30.000Z",
  "updatedAt": "2026-07-28T08:15:30.000Z"
}
```

`isLowStock` is computed as:

```text
currentStock <= minimumStockAlertQuantity
```

### 11.2 `GET /api/v1/products`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

Query parameters:

| Parameter | Behavior |
|---|---|
| `search` | Product name or SKU |
| `category` | Exact category filter |
| `warehouseLocation` | Case-insensitive partial match |
| `isActive` | Boolean |
| `lowStock` | Boolean computed filter |
| `sortBy` | `name`, `sku`, `unitPrice`, `currentStock`, `createdAt`, `updatedAt` |
| `page`, `limit`, `sortOrder` | Standard behavior |

### 11.3 `POST /api/v1/products`

**Authorization:** ADMIN, WAREHOUSE

Request:

```json
{
  "name": "Industrial Adhesive 5L",
  "sku": "adh-005l",
  "category": "Adhesives",
  "unitPrice": "2450.00",
  "openingStock": 20,
  "minimumStockAlertQuantity": 10,
  "warehouseLocation": "Main Warehouse / Rack B2"
}
```

The service:

1. Normalizes `sku` to uppercase.
2. Creates the product with zero stock.
3. When `openingStock > 0`, applies a stock-IN operation and creates an `OPENING_STOCK` movement in the same transaction.
4. Returns the product with the final balance.

Response: `201 Created`.

### 11.4 `GET /api/v1/products/:id`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

### 11.5 `PATCH /api/v1/products/:id`

**Authorization:** ADMIN, WAREHOUSE

Allowed fields:

- `name`
- `sku`
- `category`
- `unitPrice`
- `minimumStockAlertQuantity`
- `warehouseLocation`
- `isActive`

`currentStock` and `openingStock` are rejected with `400 CURRENT_STOCK_READ_ONLY`.

### 11.6 `POST /api/v1/products/:id/stock-movements`

**Authorization:** ADMIN, WAREHOUSE

Request:

```json
{
  "movementType": "IN",
  "quantity": 15,
  "reason": "Supplier delivery reference PO-1042"
}
```

or:

```json
{
  "movementType": "OUT",
  "quantity": 3,
  "reason": "Damaged stock adjustment"
}
```

The operation runs in one transaction and returns:

```json
{
  "data": {
    "movement": {
      "id": "uuid",
      "movementType": "IN",
      "quantity": 15,
      "balanceBefore": 20,
      "balanceAfter": 35,
      "reason": "Supplier delivery reference PO-1042",
      "referenceType": "MANUAL_ADJUSTMENT",
      "createdAt": "2026-07-28T08:15:30.000Z"
    },
    "product": {
      "id": "uuid",
      "currentStock": 35,
      "isLowStock": false
    }
  }
}
```

### 11.7 `GET /api/v1/products/:id/stock-movements`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

Query parameters: `page`, `limit`, `movementType`, `referenceType`, `from`, `to`, `sortOrder`.

### 11.8 `GET /api/v1/stock-movements`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

Global paginated audit view. Additional filters: `productId`, `createdById`, `challanId`.

---

## 12. Sales challan API

### 12.1 Request item

```json
{
  "productId": "uuid",
  "quantity": 4
}
```

Validation:

- One to 100 line items.
- Positive integer quantity.
- Product IDs must be unique in the request.
- Product must exist and be active.

### 12.2 Challan representation

```json
{
  "id": "uuid",
  "sequenceNumber": 27,
  "challanNumber": "CH-2026-000027",
  "customer": {
    "id": "uuid",
    "name": "ABC Traders",
    "businessName": "ABC Traders Pvt. Ltd."
  },
  "status": "DRAFT",
  "totalQuantity": 6,
  "totalAmount": "9800.00",
  "items": [
    {
      "id": "uuid",
      "lineNumber": 1,
      "productId": "uuid",
      "productNameSnapshot": "Industrial Adhesive 5L",
      "productSkuSnapshot": "ADH-005L",
      "productCategorySnapshot": "Adhesives",
      "unitPriceSnapshot": "2450.00",
      "warehouseLocationSnapshot": "Main Warehouse / Rack B2",
      "quantity": 4,
      "lineTotal": "9800.00"
    }
  ],
  "createdBy": {
    "id": "uuid",
    "name": "Sales User"
  },
  "confirmedBy": null,
  "cancelledBy": null,
  "createdAt": "2026-07-28T08:15:30.000Z",
  "confirmedAt": null,
  "cancelledAt": null,
  "cancellationReason": null
}
```

`totalAmount` is calculated by the server from item `lineTotal` values and stored as an exact denormalized decimal for efficient list/detail responses. It is a project decision, not a source-required field.

### 12.3 `GET /api/v1/challans`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

Query parameters:

| Parameter | Behavior |
|---|---|
| `search` | Challan number, customer name, or business name |
| `status` | `DRAFT`, `CONFIRMED`, or `CANCELLED` |
| `customerId` | Exact UUID |
| `createdById` | Exact UUID |
| `from`, `to` | Created-date range |
| `sortBy` | `challanNumber`, `status`, `totalQuantity`, `createdAt`, `confirmedAt` |
| `page`, `limit`, `sortOrder` | Standard behavior |

### 12.4 `POST /api/v1/challans`

**Authorization:** ADMIN, SALES

Request:

```json
{
  "customerId": "uuid",
  "items": [
    { "productId": "uuid", "quantity": 4 },
    { "productId": "uuid", "quantity": 2 }
  ]
}
```

Behavior:

- Creates a numbered `DRAFT` challan without changing stock.
- Snapshots are captured from server-side product records; the client cannot submit trusted names, prices, SKUs, totals, or warehouse snapshot values.
- The server calculates and stores line totals, total quantity, and total amount.
- To save as Confirmed from the UI, the client creates the Draft and then calls `POST /challans/:id/confirm`. If confirmation fails, the saved Draft remains available for correction, and no stock is partially deducted.

Response: `201 Created`.

### 12.5 `GET /api/v1/challans/:id`

**Authorization:** ADMIN, SALES, WAREHOUSE, ACCOUNTS

### 12.6 `PATCH /api/v1/challans/:id`

**Authorization:** ADMIN, SALES

Request:

```json
{
  "customerId": "uuid",
  "items": [
    { "productId": "uuid", "quantity": 5 }
  ]
}
```

Rules:

- Only a Draft may be edited.
- At least one field must be supplied.
- When items are supplied, the server replaces the draft item set in a transaction and recalculates snapshots, line totals, total quantity, and total amount.
- No stock changes occur.

### 12.7 `POST /api/v1/challans/:id/confirm`

**Authorization:** ADMIN, SALES

Request body: none.

The operation locks and validates the Draft, locks product rows in deterministic ID order, rejects insufficient stock, deducts all stock, creates OUT movements, and marks the challan Confirmed in one transaction.

Response: `200 OK` with the confirmed challan.

### 12.8 `POST /api/v1/challans/:id/cancel`

**Authorization:**

- Draft: ADMIN or SALES.
- Confirmed: ADMIN only.

Request:

```json
{
  "reason": "Customer cancelled the order before dispatch."
}
```

Rules:

- Draft cancellation changes status only.
- Confirmed cancellation locks the relevant products, restores quantities, creates IN movements, and marks the challan Cancelled in one transaction.
- A confirmed cancellation reason is mandatory and must contain 5–500 characters.
- Cancellation is irreversible in the case-study system.

Response: `200 OK`.

---

## 13. Endpoint authorization matrix

| Endpoint group/action | ADMIN | SALES | WAREHOUSE | ACCOUNTS |
|---|---:|---:|---:|---:|
| Login / own profile | Yes | Yes | Yes | Yes |
| List/view customers | Yes | Yes | Yes | Yes |
| Create/update customer | Yes | Yes | No | No |
| Add customer follow-up | Yes | Yes | No | No |
| List/view products | Yes | Yes | Yes | Yes |
| Create/update product | Yes | No | Yes | No |
| Manual stock IN/OUT | Yes | No | Yes | No |
| View stock movements | Yes | Yes | Yes | Yes |
| List/view challans | Yes | Yes | Yes | Yes |
| Create/edit/confirm challan | Yes | Yes | No | No |
| Cancel Draft challan | Yes | Yes | No | No |
| Cancel Confirmed challan | Yes | No | No | No |

Backend guards are authoritative. Frontend visibility is only a usability layer.

---

## 14. Validation rules

### 14.1 Text limits

| Field | Minimum | Maximum | Notes |
|---|---:|---:|---|
| User display name | 2 | 120 | Seed/internal user value; trim whitespace |
| Customer name | 2 | 160 | Required; trim whitespace |
| Product name | 2 | 180 | Required; trim whitespace |
| Mobile number | 7 | 24 | Required; permit `+`, digits, spaces, and common separators |
| Email | — | 254 | Required valid email; normalize to lowercase |
| Business name | 2 | 180 | Required; trim whitespace |
| GST number | 3 | 32 | Optional; no external validation |
| Address | 5 | 1000 | Required for customer |
| Customer notes | 1 | 4000 | Required under the strict source contract |
| Follow-up note | 1 | 2000 | Required |
| SKU | 1 | 64 | Uppercase; letters, numbers, `_`, `-`, `.`, `/` |
| Category | 2 | 120 | Required |
| Warehouse location | 2 | 160 | Required |
| Movement reason | 3 | 300 | Required |
| Cancellation reason | 5 | 500 | Required for Confirmed cancellation |

### 14.2 Dates

- Reject invalid dates.
- `followUpFrom` cannot be after `followUpTo`.
- `from` cannot be after `to`.
- A customer follow-up may be in the past because the system may record overdue work; the UI should warn rather than the API rejecting it.

### 14.3 Monetary values

- Decimal string with up to two fractional digits.
- Minimum `0.00`.
- Maximum `9999999999.99` under `NUMERIC(12,2)`.
- The server converts with Prisma Decimal and returns a string.

### 14.4 Stock and quantities

- Integer only.
- Opening stock: `0` or greater.
- Movement and challan quantities: `1` or greater.
- No request may cause stock below zero.

---

## 15. Error-code catalog

| HTTP | Code | Meaning |
|---:|---|---|
| 400 | `VALIDATION_FAILED` | DTO or query validation failed |
| 400 | `EMPTY_UPDATE` | PATCH request contains no supported fields |
| 400 | `CURRENT_STOCK_READ_ONLY` | Attempt to edit stock through product metadata endpoint |
| 400 | `DUPLICATE_CHALLAN_PRODUCT` | Same product appears more than once in a challan request |
| 400 | `INVALID_DATE_RANGE` | Range start is after range end |
| 401 | `AUTH_INVALID_CREDENTIALS` | Login failed without revealing reason |
| 401 | `AUTH_TOKEN_MISSING` | Bearer token absent |
| 401 | `AUTH_TOKEN_INVALID` | Token signature/claims invalid |
| 401 | `AUTH_TOKEN_EXPIRED` | Token expired |
| 401 | `AUTH_USER_INACTIVE` | Token user is no longer active |
| 403 | `FORBIDDEN_ROLE` | Role is not authorized for the operation |
| 404 | `CUSTOMER_NOT_FOUND` | Customer UUID not found |
| 404 | `PRODUCT_NOT_FOUND` | Product UUID not found |
| 404 | `CHALLAN_NOT_FOUND` | Challan UUID not found |
| 409 | `USER_EMAIL_ALREADY_EXISTS` | Normalized email conflict |
| 409 | `PRODUCT_SKU_ALREADY_EXISTS` | Normalized SKU conflict |
| 409 | `PRODUCT_INACTIVE` | Product cannot be used for a new challan or movement |
| 409 | `INSUFFICIENT_STOCK` | One or more requested OUT quantities exceed balance |
| 409 | `CHALLAN_NOT_DRAFT` | Edit or confirm attempted from an invalid state |
| 409 | `CHALLAN_ALREADY_CANCELLED` | Repeat cancellation attempted |
| 409 | `CHALLAN_STATE_CONFLICT` | Other invalid state transition |
| 409 | `CONCURRENT_MODIFICATION` | Transaction could not safely complete after limited retry |
| 429 | `RATE_LIMIT_EXCEEDED` | Request limit reached |
| 500 | `INTERNAL_ERROR` | Unhandled server error with safe message |

### 15.1 Insufficient-stock detail shape

```json
{
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "One or more products do not have sufficient stock.",
    "details": [
      {
        "productId": "uuid",
        "sku": "ADH-005L",
        "productName": "Industrial Adhesive 5L",
        "requestedQuantity": 12,
        "availableQuantity": 7
      }
    ],
    "requestId": "req_01J..."
  }
}
```

---

## 16. Transaction contracts

### 16.1 Product creation with opening stock

One transaction must:

1. Create product with `currentStock = 0`.
2. When opening stock is positive, update balance to opening stock.
3. Insert one IN movement with `referenceType = OPENING_STOCK`.
4. Commit both or neither.

### 16.2 Manual stock movement

One transaction must:

1. Lock the product row.
2. Confirm product exists and is active.
3. Read `balanceBefore`.
4. Calculate and validate `balanceAfter`.
5. Update product with a guarded non-negative statement.
6. Insert movement with exact before/after balances.
7. Commit both or neither.

### 16.3 Draft challan create/update

One transaction must:

1. Validate customer.
2. Resolve all unique active products.
3. Capture server-side snapshots.
4. Calculate line totals and total quantity.
5. Allocate a challan number for creation.
6. Create or replace items.
7. Make no stock changes.

### 16.4 Challan confirmation

One transaction must:

1. Lock the challan row.
2. Require `DRAFT` status.
3. Load all items.
4. Lock product rows ordered by product UUID.
5. Validate all balances before changing any balance.
6. Apply guarded OUT updates.
7. Insert one `CHALLAN_CONFIRMATION` movement per item.
8. Mark the challan Confirmed with actor and timestamp.
9. Commit all or roll back all.

### 16.5 Confirmed challan cancellation

One transaction must:

1. Lock the Confirmed challan.
2. Lock products in deterministic order.
3. Restore each quantity.
4. Insert one `CHALLAN_CANCELLATION` IN movement per item.
5. Mark the challan Cancelled with actor, time, and reason.
6. Commit all or roll back all.

### 16.6 Retry policy

A transaction aborted due to a serializable conflict or detected deadlock may be retried up to three times with a small randomized delay. Business conflicts such as insufficient stock or invalid state are never retried.

---

## 17. Migration strategy

### 17.1 Local development

- Use versioned Prisma migrations.
- Use `prisma migrate dev` only against a local development database.
- Review generated SQL before committing.
- Add custom check constraints in the migration SQL.
- Regenerate the Prisma client after schema changes.

### 17.2 Test environment

- Use a separate `DATABASE_URL_TEST`.
- Apply committed migrations from an empty database.
- Reset only the test database between suites.

### 17.3 Production

- Use `prisma migrate deploy`.
- Never use `db push` in production.
- Run migrations before starting a new API release.
- Treat destructive migration warnings as release blockers.
- Record deployment migration output as Step 10 evidence.

### 17.4 Initial migration order

1. Enums and base tables.
2. Relationships and indexes.
3. Custom check constraints.
4. Challan counter seed/upsert.
5. Required role-user seed.

---

## 18. API compatibility policy

- The initial public prefix is `/api/v1`.
- Field removal or meaning changes require a new version or coordinated migration.
- New optional response fields are non-breaking.
- Error codes are stable contracts; UI logic should not parse human-readable messages.
- The frontend and Postman collection must target the same documented contract.
- Swagger output must match real DTOs rather than handwritten stale examples.

---

## 19. Security and privacy considerations

- Password hashes never appear in selects returned to controllers.
- JWTs and seed passwords never appear in logs, examples with real values, or screenshots.
- Query and path UUIDs are validated before database use.
- Role restrictions are attached to backend endpoints.
- Prisma parameters prevent raw string concatenation; any `$queryRaw` uses tagged templates or parameter binding.
- Stock and challan calculations use server-side data only.
- User-controlled strings are treated as plain text in the UI; no HTML rendering.
- API responses avoid disclosing whether a login email exists.

---

## 20. Testing and verification plan

### 20.1 Schema verification

- Apply all migrations to an empty PostgreSQL database.
- Confirm seed creates four users and one counter row.
- Confirm custom checks reject negative stock and non-positive movement quantities.
- Confirm SKU and challan-number uniqueness.
- Confirm relationship restrictions prevent deleting referenced products/users.

### 20.2 Contract verification

- Swagger schemas match DTOs.
- Postman examples match real response envelopes.
- Pagination metadata is correct for empty, partial, and final pages.
- Decimal values remain exact strings.
- Error codes match the catalog.
- Role restrictions match the authorization matrix.

### 20.3 Transaction verification

- Failed opening-stock creation leaves no product or movement.
- Failed OUT movement changes neither product nor movement ledger.
- Failed multi-item confirmation changes no product.
- Duplicate confirmation deducts stock only once.
- Confirmed cancellation restores stock only once.
- Concurrent confirmations cannot produce negative stock.

---

## 21. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Prisma schema supports a type but not a check constraint declaratively | Invalid data could bypass application validation | Add reviewed SQL constraints in migration |
| Decimal values become JavaScript numbers | Rounding defects | Serialize Prisma Decimal to strings and calculate with Decimal |
| Challan numbering races | Duplicate numbers | Atomic counter-row `UPDATE ... RETURNING` |
| Product snapshots are client-controlled | Historical data tampering | Read snapshots only from database records |
| Stock is edited through product PATCH | Missing audit history | Reject stock fields and require movement service |
| Nested lists become unbounded | Slow detail endpoints | Paginate follow-ups, movements, and challans separately |
| API and UI error handling diverge | Fragile UX | Stable machine-readable error codes |
| Requiring follow-up date and notes may be stricter than some real-world CRM workflows | Reduced flexibility | Follow the source because only GST is marked optional; any relaxation requires an explicit contract change |

---

## 22. Acceptance criteria

Documentation is complete when:

- [x] Exact data models, enums, relationships, indexes, and constraints are specified.
- [x] Challan-number concurrency behavior is specified.
- [x] Seed data and secret handling are specified.
- [x] Global response, error, date, decimal, pagination, and search conventions are specified.
- [x] All P0 endpoints have request, response, validation, and authorization contracts.
- [x] Error codes and status codes are catalogued.
- [x] Stock-changing transaction boundaries are explicit.
- [x] Migration rules are explicit.
- [x] Security, testing, risks, and handoff are documented.

Implementation is complete only after later evidence confirms:

- [x] Migrations apply from an empty database.
- [x] Prisma client generates successfully.
- [x] Seed is idempotent.
- [x] Swagger and Postman match live endpoints.
- [x] Database constraints and concurrency tests pass.

---

## 23. Required deliverables and evidence

During implementation, attach or reference:

- `apps/api/prisma/schema.prisma`
- Committed migration directories
- Custom migration SQL
- Seed script
- Swagger JSON or URL
- Postman collection
- Migration output
- Database constraint test output
- API contract test output
- Git commit hash implementing Step 2

---

## 24. Handoff to Step 3

Step 3 must create the repository and runtime foundation around these contracts without changing domain behavior. It must lock the package manager, workspace, application scaffolding, environment files, local PostgreSQL service, Prisma initialization, global validation, error handling, CORS, health checks, Swagger, linting, formatting, build, and baseline scripts.

Any Step 3 discovery that requires a schema change must return to this document and update the change log rather than silently changing the code.

---

## 25. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined the canonical Prisma schema, constraints, numbering, seed contract, REST APIs, validation, errors, transactions, migrations, and acceptance criteria. |
| 1.1 | 2026-07-28 | Aligned challan creation with the Draft-then-confirm workflow and added persisted server-calculated total amount. |
| 1.2 | 2026-07-28 | Locked follow-up date and customer notes as required and harmonized customer field limits with the CRM implementation document. |
| 1.3 | 2026-07-28 | Added a challan/product/reference-type uniqueness constraint so confirmation and cancellation movements cannot be duplicated. |
| 1.4 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.5 | 2026-07-28 | Recorded successful empty-database migration, Prisma generation, idempotent seed, live Swagger/Postman alignment, and PostgreSQL constraint/concurrency evidence. |

<!-- END 02_DATABASE_SCHEMA_AND_API_CONTRACTS.md -->

---

<!-- BEGIN 03_PROJECT_INITIALIZATION_AND_FOUNDATION.md -->

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

<!-- END 03_PROJECT_INITIALIZATION_AND_FOUNDATION.md -->

---

<!-- BEGIN 04_AUTHENTICATION_AND_ROLE_ACCESS.md -->

# Step 4 — Authentication and Role-Based Access

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-04  
**Version:** 1.2  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  
**Depends on:** Steps 1–3

---

## 1. Purpose

This document defines authentication, password storage, JWT issuance and verification, required seeded accounts, backend role enforcement, frontend protected routes, session behavior, and security tests for the four assignment roles.

The objective is a simple but defensible assessment implementation. It deliberately avoids registration, password reset, refresh tokens, social login, and enterprise identity features because they are outside the case-study scope.

---

## 2. Source-derived requirements

**[SOURCE]** The application must provide login functionality with role-based access.

**[SOURCE]** Required roles are Admin, Sales, Warehouse, and Accounts.

**[SOURCE]** Simple JWT-based authentication is acceptable.

**[SOURCE]** Final submission must provide test login credentials for every role.

---

## 3. Authentication boundary

### 3.1 Included

- Email/password login.
- bcrypt password hashing.
- One short-lived JWT access token.
- Bearer authentication.
- User-active check.
- Four seeded role accounts.
- Backend role guard.
- Frontend protected routes and role-aware actions.
- Logout by clearing client session state.
- Login rate limiting.
- Authentication and authorization tests.

### 3.2 Excluded

- Public registration.
- User-management UI.
- Password reset or change.
- Refresh tokens.
- Email verification.
- Multi-factor authentication.
- OAuth/social sign-in.
- Single sign-on.
- Persistent “remember me”.
- Account lockout administration.

These exclusions must be listed in final known limitations rather than hidden.

---

## 4. Password policy and storage

### 4.1 Seed password requirements

- 12–128 characters for assessment seed accounts.
- Must not equal the email, role, or common placeholder such as `password`.
- Supplied only through seed environment variables.
- May be shared with the evaluator through the final submission, but not committed into source code.

### 4.2 Hashing

**[DECISION]** Use bcrypt with a work factor of 12 unless local performance testing shows it prevents practical evaluation. Any change must be documented.

Rules:

- Hash in the seed service before database upsert.
- Compare using bcrypt's constant-time comparison implementation.
- Never log plaintext passwords or hashes.
- Never return `passwordHash` through Prisma selections used by controllers.
- Do not trim passwords; whitespace may be intentional. Email is trimmed and lowercased.

---

## 5. JWT contract

### 5.1 Algorithm and secret

- Algorithm: HS256 for the small case-study service.
- Secret: at least 32 random bytes, supplied by `JWT_SECRET`.
- Token lifetime: 8 hours (`28800` seconds) for convenient same-day evaluation.
- Issuer: `JWT_ISSUER`.
- Audience: `JWT_AUDIENCE`.

### 5.2 Claims

```json
{
  "sub": "user-uuid",
  "email": "sales@example.com",
  "role": "SALES",
  "type": "access",
  "iss": "mini-erp-api",
  "aud": "mini-erp-web",
  "iat": 1785225600,
  "exp": 1785254400
}
```

Rules:

- `sub` is the canonical user identifier.
- Only known enum roles are accepted.
- `type` must equal `access`.
- The API verifies signature, issuer, audience, and expiration.
- The token contains no password, hash, sensitive profile data, or authorization list beyond role.

### 5.3 Active-user validation

The JWT strategy loads the user by `sub` on each authenticated request and confirms `isActive = true`. This adds a database query but lets deactivation take effect before token expiry, which is acceptable for the small assignment workload.

The request user object contains only:

```ts
interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
```

---

## 6. Backend module design

```text
src/auth/
├── decorators/
│   ├── current-user.decorator.ts
│   └── roles.decorator.ts
├── dto/
│   └── login.dto.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   └── roles.guard.ts
├── strategies/
│   └── jwt.strategy.ts
├── auth.controller.ts
├── auth.module.ts
├── auth.service.ts
└── auth.types.ts
```

### 6.1 Responsibilities

#### `AuthController`

- `POST /auth/login`
- `GET /auth/me`
- No password comparison logic.

#### `AuthService`

- Normalize email.
- Load user with password hash only for login.
- Verify password.
- Reject inactive users through the same generic login response.
- Sign JWT.
- Return the safe user projection.

#### `JwtStrategy`

- Validate token claims.
- Load active user.
- Return the safe request user.

#### `JwtAuthGuard`

- Require a valid bearer token.
- Map missing, expired, and invalid tokens to stable error codes.

#### `RolesGuard`

- Read role metadata from the handler/class.
- Allow when no role restriction is declared but authentication is required.
- Reject unauthorized roles with `403 FORBIDDEN_ROLE`.
- Never trust a role supplied in request body, query, or headers.

---

## 7. Decorator pattern

```ts
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
```

Example:

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SALES)
@Post()
createCustomer(...) {}
```

For consistency, controllers may apply `JwtAuthGuard` and `RolesGuard` at class level and role decorators per mutation.

---

## 8. Login flow

```text
Browser submits email/password
        │
        ▼
POST /api/v1/auth/login
        │
        ├─ Validate DTO
        ├─ Normalize email
        ├─ Find user including passwordHash
        ├─ bcrypt.compare
        ├─ Confirm isActive
        ├─ Sign JWT claims
        └─ Return token + safe user
        │
        ▼
Frontend stores assessment session
        │
        ├─ Attach Bearer token to API calls
        ├─ Load /auth/me on refresh
        └─ Route by authenticated state
```

Every login failure caused by unknown email, wrong password, or inactive user returns:

```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password.",
    "requestId": "req_01J..."
  }
}
```

This avoids account enumeration.

---

## 9. Login rate limiting

**[DECISION]** Apply a stricter route-level limit to login, for example five attempts per minute per IP, while keeping a more generous general API limit.

Requirements:

- Return `429 RATE_LIMIT_EXCEEDED`.
- Do not reveal whether an account exists.
- Ensure proxy trust is configured correctly on hosted environments before relying on forwarded client IPs.
- Document that in-memory rate limits reset on service restart and are not distributed; acceptable for a single assessment instance.

---

## 10. Seeded role accounts

The seed script defined in Step 2 must upsert:

| Display name | Role | Email variable | Password variable |
|---|---|---|---|
| Admin User | ADMIN | `ADMIN_SEED_EMAIL` | `ADMIN_SEED_PASSWORD` |
| Sales User | SALES | `SALES_SEED_EMAIL` | `SALES_SEED_PASSWORD` |
| Warehouse User | WAREHOUSE | `WAREHOUSE_SEED_EMAIL` | `WAREHOUSE_SEED_PASSWORD` |
| Accounts User | ACCOUNTS | `ACCOUNTS_SEED_EMAIL` | `ACCOUNTS_SEED_PASSWORD` |

Seed behavior:

1. Validate all values.
2. Normalize each email.
3. Hash each password.
4. Upsert by email.
5. Set expected name, role, and active status.
6. Print only safe messages such as role and email; never passwords.

The final README/submission may list assessment passwords separately, but the repository must not contain real production secrets.

---

## 11. Canonical role-permission matrix

| Capability | ADMIN | SALES | WAREHOUSE | ACCOUNTS |
|---|---:|---:|---:|---:|
| View own session | Yes | Yes | Yes | Yes |
| View customers | Yes | Yes | Yes | Yes |
| Create/edit customers | Yes | Yes | No | No |
| Add customer follow-up | Yes | Yes | No | No |
| View products | Yes | Yes | Yes | Yes |
| Create/edit/deactivate products | Yes | No | Yes | No |
| Add manual stock IN/OUT | Yes | No | Yes | No |
| View stock movements | Yes | Yes | Yes | Yes |
| View challans | Yes | Yes | Yes | Yes |
| Create/edit/confirm challans | Yes | Yes | No | No |
| Cancel a Draft challan | Yes | Yes | No | No |
| Cancel a Confirmed challan | Yes | No | No | No |
| View dashboard | Yes | Yes | Yes | Yes |

**[ASSUMPTION]** Accounts is read-only because the required scope does not define accounting mutations. Warehouse can read customers and challans to support fulfillment context but cannot alter them.

---

## 12. Frontend session strategy

### 12.1 Storage choice

**[DECISION]** Store the access token and minimal user projection in `sessionStorage`, mirrored in React state.

Reasons:

- Simpler than cross-origin HttpOnly-cookie and CSRF handling within 48 hours.
- Survives a page refresh.
- Clears when the browser tab/session closes.
- Better than long-lived `localStorage` persistence for this assessment.

**[RISK]** Any JavaScript-accessible token is exposed if the application has an XSS vulnerability. Mitigations include no raw HTML rendering, dependency discipline, escaped React text output, CSP where hosting permits, short lifetime, and session rather than persistent storage. This limitation must be disclosed.

### 12.2 Authentication provider

```text
src/features/auth/
├── api.ts
├── auth-context.tsx
├── auth-storage.ts
├── auth-types.ts
├── login-schema.ts
└── use-auth.ts
```

State:

```ts
type AuthState =
  | { status: 'loading'; user: null }
  | { status: 'anonymous'; user: null }
  | { status: 'authenticated'; user: AuthUser };
```

Methods:

- `login(email, password)`
- `logout()`
- `restoreSession()`
- `hasRole(...roles)`

### 12.3 Restore flow

1. Read token from `sessionStorage`.
2. If absent, set anonymous state.
3. If present, call `/auth/me`.
4. On success, refresh user state.
5. On 401, clear storage and redirect to login.
6. On temporary network failure, show a recoverable session-check error rather than treating it as confirmed invalid credentials.

### 12.4 Axios/client interceptor

Request:

- Attach `Authorization: Bearer <token>` when present.

Response:

- On `401 AUTH_TOKEN_EXPIRED`, `AUTH_TOKEN_INVALID`, or `AUTH_USER_INACTIVE`, clear session and redirect to login once.
- Avoid redirect loops for the login request itself.
- Do not automatically retry non-idempotent operations after authentication failures.

---

## 13. Protected and role-aware routes

### 13.1 Components

- `RequireAuth`: blocks anonymous users.
- `RequireRole`: blocks authenticated users without required roles.
- `PublicOnlyRoute`: redirects already-authenticated users away from login.
- `ForbiddenPage`: explains lack of access without exposing sensitive details.

### 13.2 Route behavior

| Situation | Behavior |
|---|---|
| Anonymous user opens protected route | Redirect to `/login` with safe return path |
| Authenticated user opens `/login` | Redirect to `/dashboard` |
| User lacks route role | Render `/403` |
| Token expires during use | Clear session and redirect to login |
| Unknown route | Render `/404` |

Validate return paths so an attacker cannot create an external open redirect.

### 13.3 UI permissions

- Hide or disable actions the role cannot perform.
- Tooltips may explain read-only access.
- Never rely on hidden buttons as security.
- If backend returns 403 despite UI gating, display the safe server message.

---

## 14. Login page requirements

The page must include:

- Product/app name.
- Email field.
- Password field with show/hide control.
- Submit button.
- Loading state.
- Generic invalid-credential message.
- Keyboard submission.
- Accessible labels and focus behavior.
- Optional assessment credential hint only when explicitly enabled by a non-secret public flag; otherwise credentials remain in README/submission.

Do not display all role passwords directly on a public production login page.

---

## 15. Validation and error behavior

### 15.1 Login DTO

```ts
class LoginDto {
  email: string;    // required, email, <= 254
  password: string; // required, 8–128
}
```

### 15.2 Authentication errors

| Status | Code | Client behavior |
|---:|---|---|
| 400 | `VALIDATION_FAILED` | Show field validation |
| 401 | `AUTH_INVALID_CREDENTIALS` | Show generic login error |
| 401 | `AUTH_TOKEN_MISSING` | Redirect protected access to login |
| 401 | `AUTH_TOKEN_INVALID` | Clear session and redirect |
| 401 | `AUTH_TOKEN_EXPIRED` | Clear session and redirect |
| 401 | `AUTH_USER_INACTIVE` | Clear session and show account unavailable message |
| 403 | `FORBIDDEN_ROLE` | Show 403 page or action error |
| 429 | `RATE_LIMIT_EXCEEDED` | Ask user to retry later without a countdown promise |

---

## 16. Logging and audit boundaries

Log safe events:

- Login success with user ID, role, request ID, and timestamp.
- Login failure with normalized email hash or redacted identifier, IP context, request ID, and reason category internally.
- Authorization denial with user ID, role, route, and request ID.
- Session user inactive.

Never log:

- Passwords.
- JWTs.
- `Authorization` headers.
- Password hashes.
- Full environment variables.

The assignment does not require a separate authentication audit table. Structured application logs are sufficient for P0.

---

## 17. Testing plan

### 17.1 Unit tests

- Email normalization.
- Correct password returns token.
- Wrong password returns generic unauthorized error.
- Unknown user returns the same public error.
- Inactive user returns the same login error.
- JWT payload contains required claims only.
- Roles guard allows/denies correct combinations.

### 17.2 API integration tests

- `POST /auth/login` succeeds for all four seeded roles.
- Invalid DTO returns 400.
- Invalid password returns 401.
- Missing token returns 401.
- Expired token returns 401 with stable code.
- Modified signature returns 401.
- `/auth/me` returns safe user data and no hash.
- Deactivating a user invalidates subsequent authenticated requests.
- Sales can create customer but Warehouse cannot.
- Warehouse can create product but Accounts cannot.
- Sales can create challan but Warehouse cannot.
- Only Admin can cancel a Confirmed challan.

### 17.3 Frontend tests/manual verification

- Login submit and loading state.
- Failed login retains email but clears or does not expose password.
- Refresh restores a valid session.
- Logout clears storage and queries.
- Unauthorized menu items are not shown.
- Direct URL access still receives 403 or route protection.
- Expired token exits the session cleanly.
- Return path does not permit external redirect.

---

## 18. Security review checklist

- [x] Passwords are bcrypt-hashed with the documented work factor.
- [x] Password hash is omitted from normal Prisma selections.
- [x] JWT secret length is validated.
- [x] JWT verifies algorithm, issuer, audience, type, and expiration.
- [x] Token user is loaded and active.
- [x] Backend guards protect every non-public endpoint.
- [x] Role values come from trusted token/user records only.
- [x] Login responses do not enumerate users.
- [x] Login is rate-limited.
- [x] Tokens and passwords are excluded from logs.
- [x] Browser session clears on logout and authentication failure.
- [x] Raw HTML rendering is not used.
- [x] CORS remains explicit.

---

## 19. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Access token in JavaScript storage | Use sessionStorage, short lifetime, no `dangerouslySetInnerHTML`, strict input rendering, disclose limitation |
| Role guard omitted from one endpoint | Central review against the Step 2 endpoint matrix and authorization integration tests |
| Seed credentials are committed | Environment-driven seed; secret scan and Git review |
| Database lookup per authenticated request adds latency | Acceptable for small app; select only needed fields and index user ID |
| Evaluator loses session when closing tab | Document session behavior and provide credentials clearly |
| Rate limit blocks demo after repeated mistakes | Use a reasonable threshold and document how local reset works without disabling protection |
| JWT secret changes after deployment | Treat as planned token invalidation; redeploy all API instances consistently |

---

## 20. Acceptance criteria

Documentation is complete when:

- [x] Password, JWT, seed-user, backend guard, frontend session, protected route, error, logging, test, and security contracts are defined.
- [x] The four-role permission matrix is locked.
- [x] Scope exclusions and storage limitation are explicit.

Implementation is complete only when:

- [x] Four seeded accounts can log in.
- [x] JWT claims and expiry match the contract.
- [x] `/auth/me` returns safe active-user data.
- [x] Every protected endpoint rejects missing/invalid tokens.
- [x] Backend role tests pass for all mutation groups.
- [x] Frontend session restore, logout, protected routes, and 403 behavior work.
- [x] Login rate limiting and safe logging are verified.
- [x] No secrets or credentials are committed.

---

## 21. Deliverables and evidence

- Auth module source files.
- User seed implementation.
- Environment validation.
- Swagger login and bearer scheme.
- Backend authentication/authorization test output.
- Screenshots for all four role sessions.
- Evidence that restricted actions return 403.
- Secret scan or repository search output.
- Git commit hash.

---

## 22. Handoff to Step 5

Step 5 implements customer CRM using the role rules in this document. Admin and Sales can mutate customer and follow-up data; Warehouse and Accounts are read-only. Customer APIs and UI must use the global contracts from Step 2 and authentication/session foundation from this step.

---

## 23. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined password hashing, JWT claims, active-user checks, seeded roles, backend guards, frontend session handling, protected routes, rate limits, security, and tests. |
| 1.1 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.2 | 2026-07-28 | Recorded verified four-role authentication, safe JWT/session behavior, backend guards, rate limiting, logging, CORS, and secret checks. |

<!-- END 04_AUTHENTICATION_AND_ROLE_ACCESS.md -->

---

<!-- BEGIN 05_CUSTOMER_CRM_IMPLEMENTATION.md -->

# Step 5 — Customer CRM Implementation

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-05  
**Version:** 1.2  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  
**Depends on:** `04_AUTHENTICATION_AND_ROLE_ACCESS.md`  
**Next step:** `06_PRODUCT_AND_INVENTORY_IMPLEMENTATION.md`

---

## 1. Purpose

This document defines the complete Customer CRM module required by the case study. It covers customer creation, editing, listing, search, filters, detail pages, follow-up notes, current follow-up dates, authorization, validation, backend structure, frontend behavior, tests, and evidence.

## 2. Source-derived requirements

The source requires customer name, mobile number, email, business name, optional GST number, customer type, address, status, follow-up date, notes, add/edit/search/detail functionality, and follow-up notes. Because GST number is the only field explicitly marked optional, this documentation uses the conservative interpretation that follow-up date and general notes are required for the assessment implementation. This is a documented interpretation, not a claim that the source provides separate validation rules for every field.

---

## 3. Goals

1. Sales and Admin users can create and maintain customer records.
2. All authenticated roles can find and inspect customer information.
3. CRM follow-ups form a chronological, attributable history.
4. The current next follow-up date is easy to filter and update.
5. Invalid customer data produces clear field-level errors.
6. Customer history is preserved; no hard-delete workflow is introduced.
7. Lists remain usable through pagination, search, filtering, sorting, loading, empty, and error states.

---

## 4. Scope

### Included

- Customer list with pagination.
- Search across identity/contact fields.
- Filters by status, type, and follow-up date range.
- Customer creation.
- Customer partial update.
- Customer detail.
- Follow-up timeline.
- Add follow-up note with optional next date.
- Customer challan summary/history link when the challan module is available.
- Backend and frontend role enforcement.
- Automated tests and API documentation.

### Excluded

- Customer hard deletion.
- Contact-person subrecords.
- File attachments.
- Email/SMS reminders.
- Automated lead scoring.
- Sales pipelines and opportunity stages.
- Duplicate-merging workflow.
- External GST validation.
- Geographic address normalization.

---

## 5. Authorization

| Action | ADMIN | SALES | WAREHOUSE | ACCOUNTS |
|---|---:|---:|---:|---:|
| List/search/filter | Yes | Yes | Yes | Yes |
| View detail | Yes | Yes | Yes | Yes |
| View follow-ups | Yes | Yes | Yes | Yes |
| Create customer | Yes | Yes | No | No |
| Edit customer | Yes | Yes | No | No |
| Add follow-up note | Yes | Yes | No | No |

Controller guards enforce the table. The service derives `createdById` from the authenticated principal and does not accept it in DTOs.

---

## 6. Data model

The authoritative Prisma models are in Step 2.

### Customer

```text
id
name
mobileNumber
email
businessName
gstNumber?
customerType
address
status
followUpDate
notes
createdById
createdAt
updatedAt
```

### CustomerFollowUp

```text
id
customerId
note
nextFollowUpDate?
createdById
createdAt
```

Follow-ups are append-only. There is no update/delete endpoint. Corrections are represented by a new note rather than rewriting history.

---

## 7. Business rules

1. All source-listed customer fields are required except GST number.
2. Customer status is one of `LEAD`, `ACTIVE`, or `INACTIVE`.
3. Customer type is one of `RETAIL`, `WHOLESALE`, or `DISTRIBUTOR`.
4. Email and mobile are validated but not globally unique.
5. GST number is stored as supplied after trimming/normalization; no external validation is claimed.
6. Follow-up date is stored in UTC and displayed in the user’s local timezone.
7. Adding a follow-up with `nextFollowUpDate` updates the customer’s current `followUpDate` atomically.
8. Adding a follow-up without a next date leaves the existing current follow-up date unchanged.
9. A customer may move between statuses through an authorized edit.
10. No hard delete is exposed because customers can be referenced by challans and audit history.
11. Search results are scoped only by query/filter rules, not by role; all roles have read access in this case study.
12. Creator and timestamps are server-controlled.

---

## 8. Validation contract

### 8.1 Create customer

| Field | Validation |
|---|---|
| `name` | Required string, trimmed, 2–160 characters |
| `mobileNumber` | Required string, trimmed, 7–24 characters; digits, spaces, `+`, `-`, and parentheses allowed |
| `email` | Required valid email, lowercase for search consistency, maximum 254 |
| `businessName` | Required string, trimmed, 2–180 |
| `gstNumber` | Optional string, trimmed, uppercase, maximum 32 |
| `customerType` | Required enum |
| `address` | Required string, trimmed, 5–1000 |
| `status` | Required enum |
| `followUpDate` | Required ISO-8601 timestamp |
| `notes` | Required string, trimmed, 1–4000 |

Conservative mobile validation avoids assuming a single country format. It checks input shape, not number ownership.

### 8.2 Update customer

- Partial DTO containing any editable customer field.
- At least one property must be present.
- The same field-level rules apply.
- Unknown fields, `id`, `createdById`, `createdAt`, and `updatedAt` are rejected.

### 8.3 Add follow-up

| Field | Validation |
|---|---|
| `note` | Required string, trimmed, 1–2000 |
| `nextFollowUpDate` | Optional ISO-8601 timestamp |

The API may permit a past date because historical correction/recording is plausible; the UI should warn when a next date is in the past. It must not silently change the date.

---

## 9. API endpoints

### 9.1 List customers

```text
GET /api/v1/customers
```

Query:

```text
page=1
limit=20
search=
status=LEAD|ACTIVE|INACTIVE
customerType=RETAIL|WHOLESALE|DISTRIBUTOR
followUpFrom=<ISO date/time>
followUpTo=<ISO date/time>
sortBy=name|businessName|status|followUpDate|createdAt|updatedAt
sortOrder=asc|desc
```

Default ordering:

```text
followUpDate ascending, id ascending
```

This prioritizes upcoming follow-ups. When no follow-up-focused behavior is desired during implementation, `createdAt desc` is acceptable only if the documented default is updated consistently.

Search fields:

- Name
- Business name
- Mobile number
- Email
- GST number

Response item includes only list-relevant data plus creator summary if useful. Follow-up history is not embedded in every list row.

### 9.2 Create customer

```text
POST /api/v1/customers
```

Roles: Admin, Sales.

Request follows the Step 2 DTO. Response is `201` with the created customer and safe creator summary.

### 9.3 Customer detail

```text
GET /api/v1/customers/:id
```

Roles: all authenticated roles.

Response includes:

```text
customer identity/business fields
current follow-up date
notes
creator summary
created/updated timestamps
follow-up count
challan summary when available
```

The endpoint does not need to embed an unbounded follow-up list. The frontend requests the paginated timeline separately.

### 9.4 Update customer

```text
PATCH /api/v1/customers/:id
```

Roles: Admin, Sales.

- Returns 404 for missing customer.
- Returns 400 for invalid fields.
- Returns the updated resource.
- Does not create a follow-up record merely because general customer fields changed.

### 9.5 Follow-up list

```text
GET /api/v1/customers/:id/follow-ups
```

Query:

```text
page, limit, sortOrder
```

Default: newest first.

### 9.6 Add follow-up

```text
POST /api/v1/customers/:id/follow-ups
```

Roles: Admin, Sales.

Returns `201` with the new follow-up and the customer’s resulting current follow-up date.

---

## 10. Follow-up transaction

When `nextFollowUpDate` is supplied:

```text
BEGIN
  Verify customer exists
  Insert customer_follow_up
  Update customers.follow_up_date
COMMIT
```

When it is absent:

```text
BEGIN
  Verify customer exists
  Insert customer_follow_up
COMMIT
```

The creator for both history and update context comes from the authenticated user. A failure in either insert or date update rolls back the complete operation.

---

## 11. Backend module structure

```text
src/customers/
├── customers.controller.ts
├── customers.module.ts
├── customers.service.ts
├── dto/
│   ├── create-customer.dto.ts
│   ├── update-customer.dto.ts
│   ├── list-customers-query.dto.ts
│   ├── create-follow-up.dto.ts
│   └── list-follow-ups-query.dto.ts
├── mappers/
│   ├── customer.mapper.ts
│   └── follow-up.mapper.ts
├── types/
│   └── customer-response.type.ts
└── customers.constants.ts
```

A separate repository abstraction is optional. Under the 48-hour deadline, a focused service using injected Prisma is acceptable when query logic remains readable and testable.

### 11.1 Controller responsibilities

- Route and role decorators.
- DTO parsing.
- Current-user extraction.
- Passing validated values to the service.
- Returning mapped responses.

### 11.2 Service responsibilities

- Query construction.
- Normalization.
- Existence checks.
- Transactions.
- Domain errors.
- Creator assignment.
- Response mapping or returning internal models to a mapper.

The controller must not contain database queries.

---

## 12. Query implementation

### 12.1 Pagination

```text
skip = (page - 1) * limit
take = limit
```

Run count and data queries consistently, preferably in one Prisma transaction when a stable snapshot matters. Minor total changes caused by concurrent writes are acceptable for an admin list; correctness of individual records is more important.

### 12.2 Search predicate

Conceptual Prisma filter:

```text
OR:
  name contains search, insensitive
  businessName contains search, insensitive
  mobileNumber contains search
  email contains search, insensitive
  gstNumber contains search, insensitive
```

### 12.3 Date filters

- `followUpFrom` maps to `gte`.
- `followUpTo` maps to `lte`.
- If both are supplied, from must not be after to.

### 12.4 Sort allowlist

Map public sort names to known Prisma fields. Never place raw query values into SQL identifiers.

---

## 13. Error behavior

| Condition | HTTP | Code |
|---|---:|---|
| Invalid body/query | 400 | `VALIDATION_FAILED` |
| Invalid UUID | 400 | `VALIDATION_FAILED` |
| Customer missing | 404 | `CUSTOMER_NOT_FOUND` |
| Write attempted by read-only role | 403 | `FORBIDDEN` |
| Unexpected database failure | 500 | `INTERNAL_ERROR` |

No uniqueness conflict is required for email/mobile/GST in this scope. The UI may show possible matches from search, but the system does not claim automatic duplicate detection.

---

## 14. Frontend routes

```text
/customers
/customers/new
/customers/:id
/customers/:id/edit
```

Only Admin and Sales may access new/edit routes. All authenticated roles may access list/detail.

---

## 15. Customer list page

### Required elements

- Page title and role-aware **Add Customer** action.
- Search input with debouncing or explicit submit.
- Status filter.
- Customer-type filter.
- Follow-up date range.
- Sort control where needed.
- Paginated table.
- Loading skeleton/progress.
- Empty state.
- Error state with retry.
- Row/detail navigation.

Suggested columns:

```text
Customer / business
Mobile
Email
Type
Status
Next follow-up
Updated
Actions
```

On narrow screens, allow horizontal scrolling or a stacked summary; do not collapse critical status/follow-up information into inaccessible tooltips.

### URL state

Prefer placing page, search, and filters in the URL query string so refresh/back navigation preserves the list state.

---

## 16. Create/edit form

### Layout

Group fields into:

1. Customer identity.
2. Contact/business details.
3. CRM classification.
4. Follow-up and notes.

### Behavior

- React Hook Form with a Zod schema aligned to API validation.
- Server remains authoritative; frontend rules are convenience only.
- Field-level API validation maps to inputs.
- Submit button prevents duplicate submission.
- Unsaved-change warning is optional but useful.
- Successful create navigates to detail.
- Successful edit invalidates detail/list queries.
- Server error preserves form values.
- GST helper text states that external validation is not performed.

---

## 17. Customer detail page

Display:

- Name and business name.
- Contact information.
- Customer type and status chips.
- Address.
- Current follow-up date.
- General notes.
- Creator and timestamps.
- Role-aware Edit button.
- Follow-up timeline.
- Role-aware Add Follow-up form/dialog.
- Challan history section or link once Step 7 exists.

Do not combine general notes and follow-up history into one mutable text area.

---

## 18. Follow-up timeline UX

Each entry displays:

```text
note
author
created date/time
next follow-up date, when supplied
```

- Newest first by default.
- Long notes preserve whitespace safely without rendering HTML.
- The add form clearly distinguishes “note date” from “next follow-up date.”
- After success, update the timeline and current follow-up date without a full reload.
- Read-only roles see the timeline but no add form.

---

## 19. TanStack Query plan

Representative keys:

```text
['customers', listParams]
['customer', customerId]
['customerFollowUps', customerId, listParams]
```

After create:

- Invalidate customer lists.
- Seed or fetch the new detail.

After edit:

- Invalidate matching detail and all customer lists.

After follow-up:

- Invalidate follow-up list.
- Invalidate customer detail and lists because follow-up date may change.

Avoid using one unparameterized key for all list variants.

---

## 20. Automated test plan

### API integration/E2E

- Admin creates a valid customer.
- Sales creates a valid customer.
- Warehouse/Accounts create attempts return 403.
- Missing required fields return field-level 400.
- Invalid enum/email/date returns 400.
- Optional GST can be absent.
- List is paginated and metadata is correct.
- Search matches name, business, mobile, email, and GST.
- Filters combine correctly.
- Date range validation works.
- Detail returns 404 for unknown UUID.
- Authorized update persists only supplied fields.
- Unknown update field is rejected.
- Follow-up insert records authenticated creator.
- Follow-up with next date updates customer date atomically.
- Follow-up without next date leaves current date unchanged.
- Follow-up history ordering and pagination work.

### Frontend

- Role-aware Add/Edit actions render correctly.
- List loading, empty, error, and data states render.
- URL filters drive API query.
- Form shows client and server errors.
- Successful create/edit invalidates expected queries.
- Read-only role cannot reach edit route.
- Timeline and next-date update render correctly.

---

## 21. Manual demonstration

1. Log in as Sales.
2. Create a Lead wholesale customer.
3. Search by business name.
4. Filter Leads.
5. Open detail.
6. Add a follow-up note with a new date.
7. Verify timeline author/time and changed current date.
8. Edit status to Active.
9. Log in as Accounts.
10. Verify customer data is readable but Add/Edit/Follow-up actions are unavailable.
11. Attempt a write through Postman with Accounts and verify 403.

---

## 22. Performance and usability expectations

- Page size is bounded.
- Search is debounced or explicitly submitted to prevent a request per keystroke.
- Detail does not embed unlimited follow-ups/challans.
- Form labels remain visible and accessible.
- Dates include clear timezone-friendly display.
- Status/type values are readable labels rather than raw enum formatting.
- Empty states explain the next permitted action.

---

## 23. Security and privacy considerations

- Customer data is available only after authentication.
- No customer field is injected as raw HTML.
- Notes are treated as text.
- Logs do not dump customer notes or full request bodies by default.
- Role enforcement exists on API writes.
- Creator values come from the token-validated user.
- Search uses parameterized Prisma filters.
- Error responses do not expose SQL or internal query shapes.

---

## 24. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Source-required fields make quick customer entry cumbersome | Keep form grouping clear; change optionality only with a documented decision |
| Duplicate customers are created | Search before create and document that merge/dedup is outside scope |
| Follow-up history is overwritten | Separate append-only table |
| Current follow-up date diverges from history | Update both in one transaction when a new next date is supplied |
| Filters create unbounded queries | Pagination, allowlisted sorting, bounded date/search values |
| Role-only UI creates false security | API guards and direct 403 tests |
| Notes cause XSS | Render as text; no unsafe HTML |

---

## 25. Acceptance criteria

- [x] Data and authorization contracts are documented.
- [x] Create, update, list, detail, search, filter, and follow-up APIs are specified.
- [x] Follow-up transaction behavior is specified.
- [x] Backend module structure is specified.
- [x] List, form, detail, and timeline UX is specified.
- [x] Query invalidation behavior is specified.
- [x] Automated/manual tests and risks are specified.

Implementation completed and verified on 2026-07-28:

- [x] Backend customer and append-only follow-up APIs are implemented.
- [x] Frontend list, create/edit, detail, filtering, and timeline workflows are implemented.
- [x] Admin/Sales mutation access and Warehouse/Accounts read-only access are enforced.
- [x] Automated tests, database-backed integration scenarios, and browser role checks pass.

---

## 26. Evidence placeholders

- Swagger/Postman customer requests
- Customer list/detail screenshots
- Follow-up timeline screenshot
- Role-based 403 response
- API test output
- Frontend test output
- Database customer/follow-up records
- Commit hashes

---

## 27. Handoff to Step 6

Step 6 implements products and inventory. It must reuse the established role guards, response envelopes, pagination, validation, query-state patterns, audit creator handling, and append-only history principles. Direct stock editing remains forbidden.

---

## 28. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined the complete Customer CRM backend, frontend, validation, follow-up transaction, tests, and evidence plan. |
| 1.1 | 2026-07-28 | Added explicit source-derived requirements and aligned customer and follow-up validation limits with Step 2. |
| 1.2 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.3 | 2026-07-28 | Recorded completed Customer CRM implementation and verified API, database, frontend, and role-access evidence. |

<!-- END 05_CUSTOMER_CRM_IMPLEMENTATION.md -->

---

<!-- BEGIN 06_PRODUCT_AND_INVENTORY_IMPLEMENTATION.md -->

# Step 6 — Product and Inventory Implementation

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-06  
**Version:** 1.1  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  
**Depends on:** Steps 1–5

---

## 1. Purpose

This document defines product master data, opening stock, manual stock IN/OUT adjustments, immutable movement history, low-stock behavior, role controls, concurrency safety, frontend pages, and verification.

This step establishes the inventory ledger used by sales challan confirmation in Step 7. It must be complete and transaction-safe before challan stock deduction is introduced.

---

## 2. Source-derived requirements

**[SOURCE]** Each product must have product name, SKU/code, category, unit price, current stock, minimum-stock alert quantity, and location/warehouse.

**[SOURCE]** Required product features include adding and editing products.

**[SOURCE]** Stock movement history must track product, quantity changed, IN/OUT type, reason, creator, and timestamp.

**[SOURCE]** Confirmed challans must reduce stock and stock must never go negative. Although challan confirmation is implemented in Step 7, this step must provide the stock invariants it depends on.

**[SOURCE]** APIs require validation, suitable status codes, errors, pagination where needed, and search/filtering where needed.

---

## 3. Inventory model decisions

### 3.1 Product master versus stock ledger

**[DECISION]** Product metadata and stock changes are separate operations:

- Product create/update manages descriptive fields and pricing.
- `currentStock` is a cached authoritative balance maintained only by inventory transactions.
- Every balance change creates one immutable `StockMovement` row.
- Public APIs provide no edit/delete operation for existing movement rows.

### 3.2 Quantity model

**[ASSUMPTION]** Quantities are whole non-negative integers. Fractional quantities, units of measure, batch/lot data, serial numbers, and expiry dates are outside the assignment scope.

### 3.3 Warehouse model

**[ASSUMPTION]** `warehouseLocation` is a descriptive product field. The system does not maintain balances per multiple warehouse entity and does not support transfers.

### 3.4 Price model

- `unitPrice` uses exact decimal storage.
- Price changes affect future snapshots only.
- Existing challan snapshots remain unchanged.

### 3.5 Product lifecycle

- Products are not deleted through the API.
- `isActive=false` prevents new manual movements and new challan lines.
- Historical movements and challans continue to resolve the product relationship.
- React views visibly mark inactive products.

---

## 4. Backend module structure

```text
src/products/
├── dto/
│   ├── create-product.dto.ts
│   ├── update-product.dto.ts
│   ├── list-products-query.dto.ts
│   ├── create-stock-movement.dto.ts
│   └── list-stock-movements-query.dto.ts
├── products.controller.ts
├── products.module.ts
├── products.service.ts
├── inventory.service.ts
├── product.presenter.ts
├── stock-movement.presenter.ts
└── product.types.ts
```

`InventoryService` owns every balance-changing operation, including the methods later called by the Challans module. `ProductsService` must not update `currentStock` directly.

---

## 5. DTO contracts

### 5.1 Create product

```ts
class CreateProductDto {
  name: string;
  sku: string;
  category: string;
  unitPrice: string;
  openingStock?: number;
  minimumStockAlertQuantity: number;
  warehouseLocation: string;
}
```

Defaults:

- `openingStock = 0` when omitted.
- `isActive = true`; not accepted from create body unless explicitly chosen later.

Normalization:

- Trim text.
- Uppercase SKU.
- Parse monetary string with Prisma Decimal.

### 5.2 Update product

```ts
class UpdateProductDto {
  name?: string;
  sku?: string;
  category?: string;
  unitPrice?: string;
  minimumStockAlertQuantity?: number;
  warehouseLocation?: string;
  isActive?: boolean;
}
```

The DTO intentionally excludes:

- `currentStock`
- `openingStock`
- `createdById`
- Audit timestamps

The global validation pipe rejects unknown fields.

### 5.3 Manual stock movement

```ts
class CreateStockMovementDto {
  movementType: 'IN' | 'OUT';
  quantity: number;
  reason: string;
}
```

The server determines product, actor, balances, timestamp, and `referenceType=MANUAL_ADJUSTMENT`.

### 5.4 List products query

```ts
class ListProductsQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  warehouseLocation?: string;
  isActive?: boolean;
  lowStock?: boolean;
  sortBy?: 'name' | 'sku' | 'unitPrice' | 'currentStock' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
```

### 5.5 List movements query

```ts
class ListStockMovementsQueryDto {
  page?: number;
  limit?: number;
  productId?: string;
  movementType?: 'IN' | 'OUT';
  referenceType?: StockReferenceType;
  createdById?: string;
  challanId?: string;
  from?: string;
  to?: string;
  sortOrder?: 'asc' | 'desc';
}
```

---

## 6. Product creation with opening stock

### 6.1 Required transaction

Product creation and opening stock are one transaction:

```text
BEGIN
  INSERT product with current_stock = 0
  IF openingStock > 0
    UPDATE current_stock to openingStock
    INSERT IN movement:
      quantity       = openingStock
      balanceBefore  = 0
      balanceAfter   = openingStock
      referenceType  = OPENING_STOCK
      reason         = "Opening stock"
      createdBy      = authenticated user
  END IF
COMMIT
```

If movement insertion fails, the product is not retained. If `openingStock=0`, no zero-quantity movement is created.

### 6.2 SKU conflict

A normalized duplicate SKU returns:

```http
409 Conflict
```

```json
{
  "error": {
    "code": "PRODUCT_SKU_ALREADY_EXISTS",
    "message": "A product with this SKU already exists.",
    "details": { "sku": "ADH-005L" },
    "requestId": "req_01J..."
  }
}
```

---

## 7. Product list and detail behavior

### 7.1 Search

Case-insensitive partial matching over:

- `name`
- `sku`

Category and warehouse/location are separate filters. Search text is capped at the global limit.

### 7.2 Low-stock filter

`lowStock=true` means:

```text
currentStock <= minimumStockAlertQuantity
```

Because this compares two columns, Prisma may require a raw parameterized condition or a carefully constructed query. The implementation must not fetch every product and filter in memory.

### 7.3 Default ordering

```text
updatedAt desc, id desc
```

Available stable sort fields are limited to the documented allowlist to prevent arbitrary field injection.

### 7.4 Detail response

Return:

- Product fields.
- Creator summary.
- Computed `isLowStock`.
- Movement count.
- Recent movement preview, limited to a small number.

Full movement history remains separately paginated.

---

## 8. Product update rules

1. Admin or Warehouse only.
2. Confirm product exists.
3. Reject empty PATCH.
4. Normalize changed SKU.
5. Reject `currentStock` or `openingStock` through DTO whitelist.
6. Enforce non-negative exact price and threshold.
7. Return updated product.
8. Do not create stock movement when metadata changes.

### 8.1 Deactivation

When setting `isActive=false`:

- Existing stock remains unchanged.
- Existing movement/challan history remains available.
- Manual IN/OUT is rejected.
- New draft challan lines are rejected.
- Existing Draft challans containing the product cannot be confirmed until the product is reactivated or removed, as specified in Step 7.

No automatic stock write-off occurs.

---

## 9. Manual stock movement transaction

### 9.1 Required algorithm

Run an interactive database transaction:

1. Lock the product row with `SELECT ... FOR UPDATE`.
2. If not found, return `PRODUCT_NOT_FOUND`.
3. If inactive, return `PRODUCT_INACTIVE`.
4. Read `balanceBefore`.
5. For IN: `balanceAfter = balanceBefore + quantity`.
6. For OUT: verify `balanceBefore >= quantity`, then calculate subtraction.
7. Update the product balance with a guarded SQL statement.
8. Insert one movement with exact before/after values.
9. Return movement and product balance.
10. Commit.

### 9.2 Guarded OUT update

```sql
UPDATE products
SET current_stock = current_stock - $2,
    updated_at = NOW()
WHERE id = $1
  AND current_stock >= $2
RETURNING current_stock;
```

The service must verify one row was updated. Even after locking and validating, the guarded condition provides defense in depth.

### 9.3 IN update

```sql
UPDATE products
SET current_stock = current_stock + $2,
    updated_at = NOW()
WHERE id = $1
RETURNING current_stock;
```

### 9.4 Insufficient stock

Return `409 INSUFFICIENT_STOCK` with:

```json
{
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "The requested stock reduction exceeds the available quantity.",
    "details": {
      "productId": "uuid",
      "sku": "ADH-005L",
      "requestedQuantity": 30,
      "availableQuantity": 18
    },
    "requestId": "req_01J..."
  }
}
```

No movement row is created and the balance remains unchanged.

---

## 10. Stock movement ledger

### 10.1 Representation

```json
{
  "id": "uuid",
  "product": {
    "id": "uuid",
    "name": "Industrial Adhesive 5L",
    "sku": "ADH-005L"
  },
  "movementType": "OUT",
  "quantity": 3,
  "reason": "Damaged stock adjustment",
  "balanceBefore": 20,
  "balanceAfter": 17,
  "referenceType": "MANUAL_ADJUSTMENT",
  "challan": null,
  "createdBy": {
    "id": "uuid",
    "name": "Warehouse User",
    "role": "WAREHOUSE"
  },
  "createdAt": "2026-07-28T08:15:30.000Z"
}
```

### 10.2 Immutability

- No movement update endpoint.
- No movement delete endpoint.
- Corrections are made using a new compensating movement with a clear reason.
- Created time and actor come from the server.

### 10.3 List behavior

- Default newest first.
- Paginate.
- Product-specific and global views use the same presenter.
- Filter by movement type, reference type, dates, product, challan, and creator where documented.
- Do not return unbounded ledgers.

---

## 11. API endpoint summary

| Method | Path | Roles | Purpose |
|---|---|---|---|
| GET | `/products` | All authenticated | Search/filter/list products |
| POST | `/products` | ADMIN, WAREHOUSE | Create product and optional opening stock |
| GET | `/products/:id` | All authenticated | Product detail |
| PATCH | `/products/:id` | ADMIN, WAREHOUSE | Edit metadata/deactivate |
| POST | `/products/:id/stock-movements` | ADMIN, WAREHOUSE | Manual IN/OUT |
| GET | `/products/:id/stock-movements` | All authenticated | Product ledger |
| GET | `/stock-movements` | All authenticated | Global ledger |

No public product or movement DELETE endpoint exists.

---

## 12. Error behavior

| Scenario | Status | Code |
|---|---:|---|
| Invalid DTO/query/UUID | 400 | `VALIDATION_FAILED` |
| Empty update | 400 | `EMPTY_UPDATE` |
| Attempt to PATCH current stock | 400 | `CURRENT_STOCK_READ_ONLY` |
| Product missing | 404 | `PRODUCT_NOT_FOUND` |
| SKU conflict | 409 | `PRODUCT_SKU_ALREADY_EXISTS` |
| Product inactive for movement | 409 | `PRODUCT_INACTIVE` |
| OUT exceeds stock | 409 | `INSUFFICIENT_STOCK` |
| Unauthorized mutation | 403 | `FORBIDDEN_ROLE` |
| Transaction conflict after retry | 409 | `CONCURRENT_MODIFICATION` |

---

## 13. Frontend feature structure

```text
src/features/products/
├── api/
│   ├── product-queries.ts
│   └── product-mutations.ts
├── components/
│   ├── product-form.tsx
│   ├── product-filters.tsx
│   ├── product-table.tsx
│   ├── product-stock-summary.tsx
│   ├── stock-adjustment-form.tsx
│   └── stock-movement-table.tsx
├── pages/
│   ├── products-page.tsx
│   ├── product-create-page.tsx
│   ├── product-detail-page.tsx
│   └── product-edit-page.tsx
├── product-schema.ts
├── product-types.ts
└── product-utils.ts
```

---

## 14. Frontend routes and behavior

### 14.1 `/products`

- Search by name/SKU.
- Filter by category, location, active state, and low stock.
- Add Product button for Admin/Warehouse.
- Columns/cards: product, SKU, category, price, stock, minimum threshold, location, status, action.
- Low-stock state uses icon/text, not color alone.
- URL query parameters preserve filters and pagination.

### 14.2 `/products/new`

- Admin/Warehouse only.
- Product metadata plus optional opening stock.
- Explain that later stock changes use the adjustment action.
- On success, navigate to product detail.

### 14.3 `/products/:id`

- Product identity and status.
- Current stock emphasized.
- Low-stock threshold and state.
- Unit price and location.
- Edit button for Admin/Warehouse.
- Stock IN/OUT form for Admin/Warehouse when active.
- Movement history for all roles.
- Challan references become links after Step 7.

### 14.4 `/products/:id/edit`

- Does not display editable current stock.
- Contains deactivate/reactivate control with explanatory warning.
- Uses PATCH and navigates back to detail.

---

## 15. Stock adjustment form

Fields:

- Movement type select: IN or OUT.
- Quantity number input.
- Reason text area/input.
- Current available stock displayed next to OUT.

Behavior:

- OUT quantity client warning when it exceeds currently displayed balance.
- Submit remains subject to server transaction because displayed balance may be stale.
- Confirm dialog for manual OUT, especially large reductions.
- On success, refresh product detail, product lists, low-stock dashboard data, and movement history.
- On `INSUFFICIENT_STOCK`, display requested and current available quantities from server details.
- Do not optimistically change stock.

---

## 16. TanStack Query strategy

Suggested keys:

```ts
['products', listParams]
['product', productId]
['product-stock-movements', productId, listParams]
['stock-movements', listParams]
```

After product metadata change:

- Invalidate product detail and lists.

After stock movement:

- Invalidate product detail.
- Invalidate product lists.
- Invalidate product and global movement lists.
- Invalidate dashboard summary when implemented.

Do not clear unrelated customer data.

---

## 17. Responsive and accessibility requirements

- Wide product table converts to compact cards or hides secondary columns on mobile.
- Stock balance, product name/SKU, low-stock state, and View action remain visible.
- Forms use one column on small screens.
- Number inputs have labels and constraints but still accept paste/keyboard reliably.
- Price is formatted as currency for presentation while preserving decimal strings internally.
- Movement types display text plus directional icons.
- Ledger tables support horizontal containment without breaking the whole page; a mobile card timeline is preferred.
- Confirmation dialog focus and keyboard behavior are accessible.

---

## 18. Concurrency and consistency tests

### 18.1 Core tests

- Product with opening stock creates one IN movement.
- Product with zero opening stock creates no movement.
- Duplicate normalized SKU returns 409.
- Product PATCH cannot alter stock.
- IN increases balance and creates correct ledger values.
- Valid OUT decreases balance and creates correct ledger values.
- Excess OUT returns 409 and changes nothing.
- Inactive product rejects manual movement.
- Movement records cannot be edited/deleted through API.
- Low-stock filter includes equality at the threshold.

### 18.2 Concurrent OUT test

Given stock 10, run two simultaneous OUT requests of 7:

Expected:

- Exactly one succeeds.
- One returns `INSUFFICIENT_STOCK` or a safe conflict after retry.
- Final stock is 3.
- Exactly one OUT movement exists.
- Stock never becomes negative.

### 18.3 Ledger reconciliation test

For a product:

```text
latest movement.balanceAfter == product.currentStock
```

and every ordered movement satisfies:

```text
movement[n].balanceBefore == movement[n-1].balanceAfter
```

This may be a test helper/report rather than a public endpoint.

---

## 19. Security considerations

- Only Admin/Warehouse can mutate products or manual stock.
- Actor comes from authenticated context.
- No client-provided before/after balances.
- No raw SQL string interpolation.
- Movement reasons are plain text and escaped by React.
- Error responses do not expose SQL or stack traces.
- Price and quantity are server validated.
- Inactive product checks occur inside the same transaction as stock updates.

---

## 20. Evidence scenarios

1. Warehouse creates a product with opening stock.
2. Product detail shows matching opening movement.
3. Warehouse adds stock IN.
4. Warehouse records a valid stock OUT.
5. Attempted excessive OUT returns proper error and unchanged stock.
6. Sales views product and movement history but cannot adjust.
7. Accounts has read-only view.
8. Low-stock filter highlights the product at/below threshold.
9. Concurrent OUT test output proves no negative stock.
10. Mobile product list/detail screenshot.

Use synthetic products and reasons.

---

## 21. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Product balance and ledger diverge | One transaction for update + movement; reconciliation tests |
| Two OUT requests oversell | Row lock, guarded update, serializable retry strategy |
| Current stock is edited through generic DTO | Exclude field, whitelist DTO, integration test |
| Low-stock comparison is implemented in memory | Use database comparison/raw parameterized filter |
| Price loses precision | Decimal storage and string serialization |
| Product deletion breaks history | No delete endpoint; use `isActive` |
| Manual adjustments are abused to hide errors | Require reason, actor, timestamp; immutable compensating entries |
| Multi-warehouse expectations emerge | Clearly state descriptive location-only model and known limitation |

---

## 22. Acceptance criteria

Documentation is complete when:

- [x] Product metadata, stock ledger, transactions, role controls, APIs, UI, concurrency tests, risks, and evidence are specified.
- [x] Direct-stock-write prohibition is explicit.

Implementation is complete only when:

- [x] Product add/edit/list/detail/search/filter work.
- [x] Opening stock is transactional and audited.
- [x] Manual IN/OUT is transactional and audited.
- [x] Negative stock is impossible in normal and concurrent tests.
- [x] Low-stock state/filter works.
- [x] Inactive behavior works.
- [x] All roles receive correct read/mutation access.
- [x] Responsive and error states work.
- [x] Automated tests and reconciliation checks pass.

---

## 23. Deliverables and evidence

- Product and inventory backend modules.
- Product and stock DTOs.
- Transactional inventory service.
- Product frontend feature.
- Swagger/Postman requests.
- Concurrency and integration test output.
- Screenshots/recording references.
- Git commit hash.

---

## 24. Handoff to Step 7

Step 7 builds sales challans on this inventory contract. It must call the same transaction-safe stock logic, create one movement per item, preserve product snapshots, reject stale or inactive products, and guarantee all-or-nothing confirmation and cancellation.

---

## 25. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined product master data, opening stock, manual IN/OUT, immutable ledger, low-stock behavior, UI, authorization, concurrency, verification, and evidence. |
| 1.1 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.2 | 2026-07-28 | Recorded completed Product & Inventory implementation with transaction, concurrency, reconciliation, responsive UI, and role-access evidence. |

<!-- END 06_PRODUCT_AND_INVENTORY_IMPLEMENTATION.md -->

---

<!-- BEGIN 07_SALES_CHALLAN_IMPLEMENTATION.md -->

# Step 7 — Sales Challan Implementation

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-07  
**Version:** 1.3  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Depends on:** Steps 1–6  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`

---

## 1. Purpose

This document defines the complete Sales Challan module, including Draft creation and editing, automatic numbering, multi-product line items, product snapshots, totals, confirmation, atomic stock deduction, negative-stock prevention, lifecycle immutability, cancellation, stock restoration, audit history, frontend behavior, concurrency tests, and evidence.

This is the highest-risk feature in the case study because it joins authentication, customers, products, inventory, relational persistence, transactions, errors, and UI into one real-world business flow.

---

## 2. Source-derived requirements

**[SOURCE]** A Sales user must be able to:

- Select a customer.
- Add multiple products.
- Add a quantity for each product.
- Generate a challan number automatically.
- Save a challan as Draft or Confirmed.

**[SOURCE]** Important business rules:

- Confirming a challan reduces stock.
- Stock must not go negative.
- Insufficient stock must return a proper API error.
- A challan must store product snapshot data, not only a product ID.

**[SOURCE]** Challan fields include:

- Challan number.
- Customer.
- Products.
- Total quantity.
- Status: Draft, Confirmed, or Cancelled.
- Created by.
- Created date.

---

## 3. Core design decisions

1. A new challan is first persisted as `DRAFT`.
2. Draft creation and editing do not change stock.
3. Product snapshots are captured by the server when Draft items are created or replaced.
4. Snapshot fields become immutable after confirmation.
5. Confirmation is a dedicated transactional command.
6. Confirmed challans cannot be edited.
7. Confirming the same challan twice cannot repeat stock deductions.
8. Insufficient stock for any line rolls back every line.
9. A Draft can be cancelled by Admin or Sales without stock changes.
10. **[ASSUMPTION]** An Admin may cancel a Confirmed challan; the system restores stock through new audit movements.
11. Cancelled challans cannot be restored or edited in this case study.
12. Challan numbers come from the database-backed atomic counter defined in Step 2, never `MAX + 1`.
13. The server calculates total quantity, line totals, and total amount.

---

## 4. Lifecycle state machine

```text
                 edit
          ┌─────────────────┐
          │                 ▼
      ┌─────────┐       ┌─────────┐
      │  DRAFT  │──────▶│  DRAFT  │
      └────┬────┘       └─────────┘
           │
     confirm│
           ▼
      ┌───────────┐
      │ CONFIRMED │
      └─────┬─────┘
            │ admin cancel + stock restoration
            ▼
      ┌───────────┐
      │ CANCELLED │
      └───────────┘

DRAFT may also move directly to CANCELLED without stock movement.
```

### 4.1 Transition matrix

| Current state | Command | Allowed role | Next state | Stock effect |
|---|---|---|---|---|
| DRAFT | Edit | Admin, Sales | DRAFT | None |
| DRAFT | Confirm | Admin, Sales | CONFIRMED | OUT for every item |
| DRAFT | Cancel | Admin, Sales | CANCELLED | None |
| CONFIRMED | Edit | Nobody | — | Reject |
| CONFIRMED | Confirm | Nobody | — | Reject |
| CONFIRMED | Cancel | Admin | CANCELLED | IN for every item |
| CANCELLED | Any mutation | Nobody | — | Reject |

---

## 5. Included scope

- Challan list, search, filters, sorting, pagination.
- Draft creation.
- Draft edit by replacing line items.
- Customer selection.
- Multiple product selection.
- Positive integer quantities.
- Automatic unique challan number.
- Server-generated product snapshots.
- Total quantity and amount.
- Detail page.
- Confirmation with atomic stock deduction.
- Insufficient-stock detail.
- Movement records linked to challan.
- Draft cancellation.
- Admin-only Confirmed cancellation with stock restoration.
- Role-aware responsive UI.
- Unit, integration, transaction, and concurrency tests.

---

## 6. Excluded scope

- Invoice generation or payment collection.
- Dispatch, delivery, or acknowledgement workflow.
- Tax calculation.
- Discounts.
- Product returns.
- Partial confirmation.
- Partial cancellation.
- Approval hierarchy.
- Draft auto-save.
- File attachments or signatures.
- Challan PDF export unless implemented after all P0 work.
- Email/SMS delivery.
- Customer snapshot beyond the required product snapshots.

---

## 7. Authorization

| Action | Admin | Sales | Warehouse | Accounts |
|---|---:|---:|---:|---:|
| List/view | Yes | Yes | Yes | Yes |
| Create Draft | Yes | Yes | No | No |
| Edit Draft | Yes | Yes | No | No |
| Confirm Draft | Yes | Yes | No | No |
| Cancel Draft | Yes | Yes | No | No |
| Cancel Confirmed | Yes | No | No | No |

State-dependent rules must be checked inside the same transaction that changes state. A static route role check alone is insufficient for cancellation.

---

## 8. Backend module structure

```text
apps/api/src/challans/
├── challans.controller.ts
├── challans.module.ts
├── challans.service.ts
├── challan-number.service.ts
├── repositories/
│   ├── challan-lock.repository.ts
│   └── product-lock.repository.ts
├── dto/
│   ├── create-challan.dto.ts
│   ├── update-draft-challan.dto.ts
│   ├── cancel-challan.dto.ts
│   └── list-challans-query.dto.ts
├── mappers/
│   └── challan-response.mapper.ts
├── errors/
│   └── insufficient-stock.error.ts
├── challans.service.spec.ts
└── challans.controller.spec.ts
```

Raw locking queries must be parameterized and narrowly isolated. Controllers do not perform inventory calculations or state transitions.

---

## 9. Challan persistence model

### 9.1 Header

```text
id
sequenceNumber
challanNumber
customerId
status
totalQuantity
totalAmount
createdById
confirmedById
cancelledById
confirmedAt
cancelledAt
cancellationReason
createdAt
updatedAt
```

### 9.2 Item snapshots

Every line stores:

```text
productId
productNameSnapshot
productSkuSnapshot
productCategorySnapshot
unitPriceSnapshot
warehouseLocationSnapshot
quantity
lineTotal
```

The original `productId` preserves traceability, while snapshot fields preserve historical display values.

---

## 10. Snapshot timing and behavior

### 10.1 Draft creation

The server loads each product and captures current fields. The client cannot provide trusted product name, SKU, category, price, location, or line total.

### 10.2 Draft edit

The preferred implementation replaces all Draft line items using the submitted product IDs and quantities. It reloads current product fields and creates fresh snapshots for the edited Draft.

### 10.3 Confirmation

Confirmation does not silently change the saved Draft's product name, price, category, or location snapshots. It rechecks:

- Product still exists.
- Product is active.
- Current stock is sufficient.

This means a product price changed after the last Draft save does not alter the Draft automatically. The stored Draft represents what the Sales user prepared. This is **[ASSUMPTION]** and must be explained in known limitations.

### 10.4 After confirmation

Snapshots and quantities are immutable. Later product changes must not alter the Confirmed challan response.

---

## 11. Challan numbering

### 11.1 Format

```text
CH-{UTC_YEAR}-{6_DIGIT_SEQUENCE}
```

Example:

```text
CH-2026-000001
```

### 11.2 Generation

Inside the Draft creation transaction:

```text
1. Atomically update the `challan_counters` row with key `sales_challan` using `UPDATE ... RETURNING`.
2. Use the returned integer as `sequenceNumber`.
3. Format it with the current UTC year.
4. Insert `sequenceNumber` and `challanNumber` under unique constraints.
```

### 11.3 Rules

- Gaps are acceptable.
- Number never changes after creation.
- Number remains unique under concurrent creation.
- Do not expose sequence generation as a public endpoint.
- Do not allow client-provided challan number.

---

## 12. Draft creation API

Endpoint:

```text
POST /api/v1/challans
```

Request:

```json
{
  "customerId": "customer-uuid",
  "items": [
    {
      "productId": "product-uuid-1",
      "quantity": 3
    },
    {
      "productId": "product-uuid-2",
      "quantity": 5
    }
  ]
}
```

Flow:

```text
BEGIN
  authorize ADMIN or SALES
  validate customer ID and item structure
  require at least one line
  reject duplicate product IDs
  load customer
  require customer exists
  load all products
  require all products exist and are active
  calculate snapshots, line totals, total quantity, total amount
  obtain sequence-safe challan number
  insert DRAFT header with authenticated creator
  insert all items
COMMIT
```

Stock is not checked as an availability guarantee at Draft creation. The UI may show current availability, but stock can change before confirmation. The server may still return current stock in product search responses for user guidance.

---

## 13. Draft creation calculations

For each item:

```text
lineTotal = unitPriceSnapshot × quantity
```

Header:

```text
totalQuantity = sum(item.quantity)
totalAmount = sum(item.lineTotal)
```

Use database/decimal arithmetic or a decimal library. Do not calculate persistent totals with ordinary binary floating-point operations.

Example:

```text
Product A: 3 × 1250.00 = 3750.00
Product B: 5 × 400.00  = 2000.00
Total quantity = 8
Total amount   = 5750.00
```

---

## 14. Duplicate product behavior

The DTO/service rejects the same product ID more than once:

```http
400 Bad Request
```

```json
{
  "error": {
    "code": "DUPLICATE_CHALLAN_PRODUCT",
    "message": "A product can appear only once in a challan.",
    "details": {
      "productId": "uuid"
    },
    "requestId": "..."
  }
}
```

The frontend prevents duplicate selection, but the backend remains authoritative.

---

## 15. Draft edit API

Endpoint:

```text
PATCH /api/v1/challans/:id
```

Request shape matches creation.

Transactional flow:

```text
BEGIN
  lock challan row
  require challan exists
  require status = DRAFT
  require role ADMIN or SALES
  validate customer and products
  rebuild server snapshots and totals
  update header customer/totals
  replace item rows
COMMIT
```

Replacing the complete item set is simpler and safer than multiple add/update/delete line endpoints for this case study.

If the challan is Confirmed or Cancelled, return `409 CHALLAN_NOT_DRAFT`.

---

## 16. Confirmation API

Endpoint:

```text
POST /api/v1/challans/:id/confirm
```

Request body is empty.

Success response — `200 OK`:

```json
{
  "data": {
    "id": "uuid",
    "challanNumber": "CH-2026-000001",
    "status": "CONFIRMED",
    "totalQuantity": 8,
    "totalAmount": "5750.00",
    "confirmedBy": {
      "id": "uuid",
      "name": "Sales User"
    },
    "confirmedAt": "2026-07-28T08:45:00.000Z"
  }
}
```

---

## 17. Confirmation transaction — authoritative sequence

```text
BEGIN
  1. Lock challan row.
  2. Require challan exists.
  3. Require status = DRAFT.
  4. Load challan items.
  5. Require at least one item.
  6. Sort product IDs deterministically.
  7. Lock every product row in sorted order.
  8. Verify every product exists and remains active.
  9. Compare requested quantities with current stock for all items.
 10. If any item is insufficient, throw detailed error and ROLLBACK.
 11. Deduct each product through guarded update.
 12. Insert one OUT stock movement per line:
       referenceType = CHALLAN_CONFIRMATION
       challanId = current challan
       balanceBefore/balanceAfter = locked balances
       reason = "Confirmed challan {challanNumber}"
 13. Update challan:
       status = CONFIRMED
       confirmedById = authenticated user
       confirmedAt = now
 14. COMMIT
```

No partial success is allowed.

---

## 18. Product locking contract

Conceptual PostgreSQL query:

```sql
SELECT id, current_stock, is_active
FROM products
WHERE id = ANY($1::uuid[])
ORDER BY id
FOR UPDATE;
```

Requirements:

- Product IDs are sorted consistently.
- Values are parameterized.
- The returned row count matches the distinct requested products.
- Locks are held only for the transaction duration.
- All validations occur before the first deduction when possible.

If Prisma's query API cannot express `FOR UPDATE`, use a narrow parameterized raw query. Never concatenate IDs into SQL strings.

---

## 19. Guarded deduction

Even after locking, use a guarded condition or verify expected current state:

```sql
UPDATE products
SET current_stock = current_stock - $1,
    updated_at = NOW()
WHERE id = $2
  AND current_stock >= $1;
```

Exactly one row must be affected. Any unexpected zero-row update aborts the transaction.

Movement balances are derived from the locked pre-update stock:

```text
balanceBefore = locked currentStock
balanceAfter  = balanceBefore - quantity
```

---

## 20. Insufficient-stock handling

The service must collect all insufficient lines before failing when possible, so the Sales user can correct the Draft once.

Response — `409 Conflict`:

```json
{
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "One or more products do not have sufficient stock.",
    "details": [
      {
        "productId": "uuid-1",
        "sku": "CBL-10M",
        "productName": "Industrial Cable 10m",
        "requestedQuantity": 12,
        "availableQuantity": 7
      },
      {
        "productId": "uuid-2",
        "sku": "ADP-01",
        "productName": "Power Adapter",
        "requestedQuantity": 4,
        "availableQuantity": 0
      }
    ],
    "requestId": "..."
  }
}
```

Verification after failure:

- Challan remains Draft.
- No product stock changes.
- No confirmation movements exist.
- Confirmation audit fields remain null.

---

## 21. Inactive or missing product at confirmation

Although foreign keys and soft deletion make missing products unlikely:

- Missing product returns a conflict or integrity error mapped to a stable domain response.
- Inactive product returns `409 PRODUCT_INACTIVE` with line details.
- No stock is changed.
- The Draft remains editable so the product can be removed or replaced.

Inactive products are rejected even if stock is sufficient.

---

## 22. Repeated confirmation and idempotency

A second confirmation attempt must not repeat stock changes.

Mechanisms:

1. Challan row lock.
2. Require current state `DRAFT`.
3. Update state inside the same transaction.
4. Unique stock-movement constraint for challan/product/reference type.

Response:

```http
409 Conflict
```

```json
{
  "error": {
    "code": "CHALLAN_NOT_DRAFT",
    "message": "Only a Draft challan can be confirmed.",
    "details": {
      "currentStatus": "CONFIRMED"
    },
    "requestId": "..."
  }
}
```

The API does not claim generic network idempotency; it guarantees lifecycle idempotency for this command.

---

## 23. Concurrent confirmation scenarios

### 23.1 Same challan confirmed twice

Expected:

- One request succeeds.
- One waits for the challan lock, then sees Confirmed and returns 409.
- Stock deducted once.
- One movement per item.

### 23.2 Different challans competing for stock

Initial stock: 10.

```text
Challan A requests 7.
Challan B requests 7.
```

Expected:

- One confirmation succeeds.
- One returns insufficient stock.
- Final stock is 3.
- No negative balance.
- Failed challan remains Draft.

### 23.3 Multi-product deadlock prevention

Two challans contain the same products in opposite input order. Both confirmation services must lock products in the same sorted ID order.

Expected:

- No avoidable circular lock ordering.
- One or both complete according to available stock.
- Any database serialization/deadlock error is retried only through a small bounded server policy if implemented; otherwise it returns a safe retryable error with no partial changes.

---

## 24. Cancellation API

Endpoint:

```text
POST /api/v1/challans/:id/cancel
```

Request:

```json
{
  "reason": "Customer cancelled before dispatch"
}
```

### 24.1 Draft cancellation

Allowed: Admin, Sales.

Flow:

```text
BEGIN
  lock challan
  require DRAFT
  update status to CANCELLED
  record cancelledById, cancelledAt, optional reason
COMMIT
```

No stock movement.

### 24.2 Confirmed cancellation

Allowed: Admin only.

Reason is required.

Flow:

```text
BEGIN
  lock challan
  require CONFIRMED
  load items
  lock products in deterministic order
  for every item:
    increment product.currentStock
    create IN movement:
      referenceType = CHALLAN_CANCELLATION
      challanId = challan
      quantity = item.quantity
      balanceBefore = current stock
      balanceAfter = current stock + quantity
      reason = "Cancelled challan {number}: {reason}"
  update status to CANCELLED
  record cancellation audit fields
COMMIT
```

The stock is restored even when a product is inactive. Historical correction must not be blocked by deactivation.

### 24.3 Repeated cancellation

A Cancelled challan returns `409 CHALLAN_ALREADY_CANCELLED`. No additional movements are created.

### 24.4 Irreversibility

Reopening a Cancelled challan is outside scope. Create a new Draft if business work must resume.

---

## 25. Cancellation assumptions and limitation

The source defines the Cancelled status but does not define stock behavior. The selected approach—Admin-only reversal for Confirmed challans—is an explicit project assumption.

The final README must state:

- Cancellation is a complete reversal, not partial.
- It is permitted once.
- It restores every item quantity.
- It does not produce a credit note, invoice adjustment, or return workflow.

---

## 26. Challan list API

Endpoint:

```text
GET /api/v1/challans
```

Search:

- Challan number.
- Customer name.
- Customer business name.

Filters:

- Status.
- Customer ID.
- Creator ID.
- Created-date range.

Sorting whitelist:

- Challan number.
- Status.
- Total quantity.
- Created date.
- Confirmed date.

Default:

```text
createdAt desc
```

List response row:

```json
{
  "id": "uuid",
  "challanNumber": "CH-2026-000001",
  "customer": {
    "id": "uuid",
    "name": "Anita Sharma",
    "businessName": "Sharma Distributors"
  },
  "status": "CONFIRMED",
  "itemCount": 2,
  "totalQuantity": 8,
  "totalAmount": "5750.00",
  "createdBy": {
    "id": "uuid",
    "name": "Sales User"
  },
  "createdAt": "2026-07-28T08:30:00.000Z",
  "confirmedAt": "2026-07-28T08:45:00.000Z"
}
```

---

## 27. Challan detail API

Endpoint:

```text
GET /api/v1/challans/:id
```

Response:

```json
{
  "data": {
    "id": "uuid",
    "challanNumber": "CH-2026-000001",
    "status": "CONFIRMED",
    "customer": {
      "id": "uuid",
      "name": "Anita Sharma",
      "businessName": "Sharma Distributors",
      "mobileNumber": "+91-9876543210",
      "email": "anita@example.com",
      "address": "Business address"
    },
    "items": [
      {
        "id": "uuid",
        "productId": "uuid",
        "productName": "Industrial Cable 10m",
        "productSku": "CBL-10M",
        "productCategory": "Electrical",
        "unitPrice": "1250.00",
        "warehouseLocation": "Main Warehouse / Rack A3",
        "quantity": 3,
        "lineTotal": "3750.00"
      }
    ],
    "totalQuantity": 8,
    "totalAmount": "5750.00",
    "createdBy": {},
    "confirmedBy": {},
    "cancelledBy": null,
    "createdAt": "...",
    "updatedAt": "...",
    "confirmedAt": "...",
    "cancelledAt": null,
    "cancellationReason": null
  }
}
```

The item display fields come from snapshots, not a live product join. `productId` remains available for navigation when the product exists.

---

## 28. Error catalog

| Scenario | HTTP | Code |
|---|---:|---|
| Invalid payload | 400 | `VALIDATION_FAILED` |
| No line items | 400 | `VALIDATION_FAILED` |
| Duplicate product | 400 | `DUPLICATE_CHALLAN_PRODUCT` |
| Customer missing | 404 | `CUSTOMER_NOT_FOUND` |
| Product missing | 404 | `PRODUCT_NOT_FOUND` |
| Product inactive | 409 | `PRODUCT_INACTIVE` |
| Challan missing | 404 | `CHALLAN_NOT_FOUND` |
| Edit/confirm non-Draft | 409 | `CHALLAN_NOT_DRAFT` |
| Insufficient stock | 409 | `INSUFFICIENT_STOCK` |
| Cancel already Cancelled | 409 | `CHALLAN_ALREADY_CANCELLED` |
| Sales cancels Confirmed | 403 | `FORBIDDEN_ROLE` |
| Other invalid state transition | 409 | `CHALLAN_STATE_CONFLICT` |
| Transaction retry exhausted | 409 | `CONCURRENT_MODIFICATION` |
| Unexpected transaction failure | 500 | `INTERNAL_ERROR` |

---

## 29. Frontend routes

```text
/challans
/challans/new
/challans/:id
/challans/:id/edit
```

Access:

| Route/action | Roles |
|---|---|
| List/detail | All authenticated. |
| New/edit Draft | Admin, Sales. |
| Confirm | Admin, Sales. |
| Cancel Draft | Admin, Sales. |
| Cancel Confirmed | Admin. |

---

## 30. Frontend structure

```text
apps/web/src/features/challans/
├── api/
│   ├── challanApi.ts
│   └── challanKeys.ts
├── components/
│   ├── ChallanFilters.tsx
│   ├── ChallanItemEditor.tsx
│   ├── ChallanItemsTable.tsx
│   ├── ChallanStatusChip.tsx
│   ├── ConfirmChallanDialog.tsx
│   ├── CancelChallanDialog.tsx
│   ├── CustomerAutocomplete.tsx
│   └── ProductAutocomplete.tsx
├── pages/
│   ├── ChallanCreatePage.tsx
│   ├── ChallanDetailPage.tsx
│   ├── ChallanEditPage.tsx
│   └── ChallanListPage.tsx
├── schemas/
│   └── challanFormSchema.ts
├── types.ts
└── utils.ts
```

---

## 31. Challan builder UI

### 31.1 Customer selector

- Searchable autocomplete.
- Displays name, business name, and contact hint.
- Loads server results with debounce.
- Required.
- Does not allow free text as an unregistered customer.

### 31.2 Product selector

- Searchable autocomplete.
- Excludes inactive products.
- Displays name, SKU, current stock, unit price, and location.
- Prevents selecting a product already present.
- Current stock is guidance only.

### 31.3 Item editor

Each row displays:

- Product name/SKU.
- Available stock at last fetch.
- Snapshot unit price preview.
- Quantity input.
- Line total preview.
- Remove action.

The form requires at least one row and positive integer quantities.

### 31.4 Totals

Display:

- Distinct line count.
- Total quantity.
- Total amount.

Client totals are previews; server response replaces them after save.

### 31.5 Actions

```text
Save Draft
Save & Confirm
Cancel/back
```

---

## 32. Save & Confirm behavior

To keep backend commands clear:

```text
1. POST /challans to create Draft.
2. POST /challans/{id}/confirm.
```

Outcomes:

- Both succeed: navigate to Confirmed detail.
- Draft succeeds and confirmation fails for stock: keep the Draft, navigate/show its number, display line-level stock errors, and allow correction.
- Network fails after Draft creation: do not assume confirmation. Refresh/fetch the saved Draft state.
- Confirmation succeeds but response is lost: fetching the Draft shows Confirmed, preventing duplicate deduction.

The UI text must explain when a failed confirmation left a saved Draft.

A future implementation may offer a single create-and-confirm command, but it is not necessary for the assignment.

---

## 33. Draft edit UI

- Load stored customer and item snapshots.
- Re-fetch current product availability for guidance.
- Allow customer and item changes only while Draft.
- Save replaces the Draft items and snapshots.
- If status changed while page was open, server returns conflict and UI refreshes detail.
- Unsaved-change navigation warning.
- No edit route/action for Confirmed or Cancelled records.

---

## 34. Confirmation UX

Before confirmation, show a dialog summarizing:

- Challan number.
- Customer.
- Total line count and quantity.
- Statement that stock will be deducted and the challan will become immutable.

On success:

- Show success feedback.
- Navigate/refetch detail.
- Invalidate challan, product, movement, dashboard, and customer-related summaries.

On insufficient stock:

- Show each product with requested and available quantity.
- Keep Draft intact.
- Offer **Edit Draft**.
- Refresh product availability.

Do not optimistically mark a challan Confirmed before the server transaction succeeds.

---

## 35. Cancellation UX

### Draft

- Confirm user intent.
- Reason optional but encouraged.
- No stock-restoration language.

### Confirmed

- Visible only to Admin.
- Require reason.
- Explicitly state that all quantities will be restored and cancellation is irreversible.
- Show the affected line count and total quantity.

After success, invalidate all affected product and movement queries.

---

## 36. Challan list UI

Desktop columns:

- Challan number.
- Customer/business.
- Status.
- Item count.
- Total quantity.
- Total amount.
- Created by/date.
- Actions.

Filters:

- Search.
- Status.
- Customer.
- Date range.

Actions:

- View for all roles.
- Edit/confirm/cancel based on role and current status.

Narrow screens use cards or a scrollable layout that preserves number, customer, status, and main action.

---

## 37. Challan detail UI

Sections:

```text
Header: number, status, lifecycle actions
Customer: current customer contact data
Items: snapshot product data, quantity, unit price, line total
Totals: total quantity and amount
Lifecycle audit: creator, confirmer, canceller, timestamps, reason
Inventory note: confirmation/cancellation effect
```

For a Confirmed or Cancelled challan, display a clear `Historical product snapshot` label so reviewers understand why values may differ from current product details.

---

## 38. Query keys and invalidation

Suggested keys:

```ts
challanKeys.all
challanKeys.list(filters)
challanKeys.detail(id)
```

Mutation effects:

| Mutation | Invalidate/update |
|---|---|
| Create Draft | Challan lists, customer detail summary. |
| Edit Draft | Challan detail/list. |
| Confirm | Challan detail/list, products, stock movements, dashboard, customer detail. |
| Cancel Draft | Challan detail/list, customer detail. |
| Cancel Confirmed | Challan detail/list, products, stock movements, dashboard, customer detail. |

---

## 39. Backend unit tests

### Draft behavior

- Requires customer and at least one item.
- Rejects duplicate product IDs.
- Rejects inactive/missing products.
- Captures snapshots from database, not request.
- Calculates totals correctly with decimals.
- Generates unique number.
- Does not change stock.
- Edit replaces items and recalculates snapshots/totals.
- Edit rejects non-Draft state.

### Confirmation behavior

- Locks/validates Draft.
- Deducts each product correctly.
- Creates correct movement balances and references.
- Sets audit fields.
- Rejects inactive product.
- Aggregates insufficient-stock detail.
- Rolls back all writes on any line failure.
- Rejects repeated confirmation.

### Cancellation behavior

- Draft cancellation changes no stock.
- Confirmed cancellation restores all stock.
- Creates correct IN movements.
- Requires Admin and reason for Confirmed.
- Rejects repeated cancellation.

---

## 40. Integration tests

1. Sales creates Draft with multiple products.
2. Draft response contains server snapshots and totals.
3. Product changes after Draft do not alter stored snapshots.
4. Draft edit refreshes snapshots for resubmitted lines.
5. Confirmation reduces all stock and creates linked movements.
6. Detail uses snapshots after product rename/price change.
7. Insufficient line rolls back every product and movement.
8. Confirmation twice deducts once.
9. Warehouse and Accounts cannot create or confirm.
10. Sales cannot cancel Confirmed.
11. Admin cancellation restores all stock once.
12. Draft cancellation creates no stock movement.
13. List search/filter/pagination works.
14. Challan number is unique under concurrent creation.

---

## 41. Concurrency test design

Use a real PostgreSQL test database, not mocks.

### Test A — same challan

```text
stock = 10
Draft requests 6
send two confirm requests concurrently
```

Assert:

```text
successes = 1
conflicts = 1
final stock = 4
confirmation movement count = 1
challan status = CONFIRMED
```

### Test B — competing challans

```text
stock = 10
Draft A requests 7
Draft B requests 7
confirm concurrently
```

Assert:

```text
successes = 1
insufficient conflicts = 1
final stock = 3
out movement quantity total = 7
one challan CONFIRMED
one challan DRAFT
```

### Test C — atomic multi-line rollback

```text
Product A stock = 100, request 5
Product B stock = 2, request 3
```

Assert:

```text
confirmation fails
Product A remains 100
Product B remains 2
no confirmation movements
challan remains DRAFT
```

### Test D — cancel race

Send two Admin cancellation requests for the same Confirmed challan. Assert one stock restoration only.

---

## 42. Movement-chain verification

After confirmation or cancellation, verify:

- Movement reason contains challan number.
- `challanId` points to the correct record.
- Reference type is correct.
- Quantity matches snapshot item quantity.
- Before/after balances follow the direction.
- Latest movement balance equals `Product.currentStock`.
- Unique movement constraint prevents duplicates.

---

## 43. Frontend tests

- Customer/product autocompletes search and select.
- Duplicate product cannot be added.
- Quantity validation and totals work.
- Save Draft sends only IDs and quantities.
- Server snapshots replace previews.
- Read-only roles do not see mutation actions.
- Confirmation dialog describes stock effect.
- Insufficient-stock response displays all affected lines.
- Failed Save & Confirm clearly preserves Draft.
- Confirmed detail has no edit action.
- Admin-only Confirmed cancel is enforced in UI.
- Mobile line editor remains operable.

---

## 44. Manual demonstration flow

```text
1. Log in as Sales.
2. Select an existing customer.
3. Add two products and quantities.
4. Save as Draft.
5. Verify product stock is unchanged.
6. Edit the Draft and change one quantity.
7. Confirm the Draft.
8. Verify status, confirmer, and timestamp.
9. Open each product and verify stock deduction.
10. Verify OUT movements linked to the challan.
11. Rename/change the price of one product as Warehouse/Admin.
12. Reopen the challan and verify historical snapshot values remain unchanged.
13. Create another Draft with excessive quantity.
14. Attempt confirmation and verify detailed error plus complete rollback.
15. Log in as Accounts and verify read-only detail.
16. Log in as Admin and cancel the Confirmed challan with a reason.
17. Verify stock restoration and IN movements.
18. Attempt cancellation again and verify conflict with no additional stock.
```

This sequence should be part of the final recording.

---

## 45. Security and audit considerations

- Creator/confirming/cancelling IDs come from authenticated context.
- Client cannot set status, snapshots, totals, number, or audit timestamps.
- Raw SQL is parameterized.
- Confirmation/cancellation failures do not expose SQL or stack traces.
- Lifecycle actions are logged with request IDs.
- Domain audit persists in tables, not only logs.
- Confirmed records are immutable.
- Stock movements are immutable.
- The API verifies roles and state under lock.

---

## 46. Performance considerations

- Paginate list endpoints.
- Load only required list fields.
- Keep confirmation transactions short.
- Lock only challan and relevant products.
- Lock products in deterministic order.
- Avoid external calls inside transaction.
- Use indexed status/customer/date fields.
- Debounce customer and product autocomplete.
- Fetch product suggestions in small pages.
- Do not preload all products into the browser.

---

## 47. Accessibility and usability

- Autocomplete controls have accessible labels and keyboard selection.
- Each line's remove action identifies the product.
- Quantity errors are associated with the correct row.
- Status is text, not color only.
- Confirmation and cancellation dialogs manage focus.
- Insufficient-stock summary is announced and links/focuses affected rows when possible.
- Mobile layout provides adequately sized controls.
- Monetary values and quantities use consistent formatting.

---

## 48. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Race condition creates negative stock. | Row locks, guarded updates, real concurrency tests. |
| One line fails after others deduct. | Single database transaction and rollback. |
| Repeated confirmation duplicates movements. | State lock/check plus unique movement constraint. |
| Product changes rewrite history. | Snapshot fields and explicit response mapper. |
| Deadlocks from opposite product order. | Sort product IDs before locking. |
| Client forges prices or totals. | Ignore client snapshots/totals; calculate server-side. |
| Save & Confirm network failure confuses state. | Persist Draft first, refetch by ID, display actual state. |
| Cancellation interpretation differs from evaluator expectation. | Label as assumption and explain reversal behavior. |
| Draft retains outdated price. | Make snapshot timing explicit; editing refreshes snapshots. |
| Free database latency lengthens locks. | Keep transaction focused and avoid unnecessary reads/writes. |

---

## 49. Step 7 acceptance criteria

Documentation is complete when:

- [x] Source challan requirements are mapped.
- [x] Lifecycle and permissions are defined.
- [x] Snapshot timing and immutability are defined.
- [x] Safe numbering is defined.
- [x] Draft create/edit contracts and calculations are defined.
- [x] Confirmation locking, deduction, movement, and rollback are defined.
- [x] Insufficient-stock and repeated-command behavior are defined.
- [x] Cancellation and reversal assumption are defined.
- [x] Frontend builder, detail, lifecycle UX, and invalidation are defined.
- [x] Unit, integration, concurrency, manual, security, and risk plans are defined.

Implementation is complete only when:

- [x] Draft creation/edit does not change stock.
- [x] Automatic numbering is unique under concurrency.
- [x] Product snapshots are server-sourced and historically stable.
- [x] Confirmation is atomic for multiple products.
- [x] Negative stock is impossible in real PostgreSQL concurrency tests.
- [x] Repeated confirmation/cancellation cannot duplicate movements.
- [x] Cancellation behavior matches this documented assumption.
- [x] All roles and UI states behave correctly.
- [x] Quality gates and complete demonstration pass.
- [x] Implementation evidence is linked below; the final commit hash is deferred to repository publication.

---

## 50. Planned deliverables and evidence

Expected artifacts:

```text
apps/api/src/challans/**
apps/web/src/features/challans/**
docs/screenshots/challans/**
docs/evidence/challans/**
```

Evidence placeholders:

| Evidence | Status | Reference |
| --- | --- | --- |
| Draft no-stock-change test | Pass | `docs/evidence/quality/STEP_09_VERIFICATION.md` |
| Snapshot stability test | Pass | API unit and critical integration suites |
| Unique number concurrency test | Pass | API challan service suite |
| Multi-line confirmation test | Pass | `pnpm test:integration` |
| Atomic rollback test | Pass | API unit and critical integration suites |
| Competing confirmation test | Pass | `pnpm test:integration` |
| Cancellation/restoration test | Pass | `pnpm test:integration` |
| Challan builder/detail screenshots | Complete | `docs/screenshots/README.md` |
| Postman full flow | Complete | `docs/postman/Mini_ERP_CRM.postman_collection.json` |
| Git commit | Deferred | Repository publication phase |

---

## 51. Handoff to Step 8

Step 8 must integrate all completed features into one coherent responsive frontend. It must standardize:

- Navigation and layouts.
- Role-aware page/action visibility.
- Forms, tables/cards, dialogs, feedback, and status components.
- API client and query behavior.
- Loading, empty, error, and offline/network states.
- Responsive behavior and accessibility.
- End-to-end workflow continuity from login through challan cancellation.

---

## 52. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined the complete Draft, snapshot, numbering, confirmation, stock, cancellation, UI, audit, and concurrency plan. |
| 1.1 | 2026-07-28 | Harmonized the counter-based numbering, Draft-then-confirm API flow, persisted totals, and error/status catalog with Step 2. |
| 1.2 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.3 | 2026-07-28 | Recorded completed Sales Challan implementation with lifecycle, snapshot, atomic stock, cancellation, concurrency, role, and responsive UI evidence. |

<!-- END 07_SALES_CHALLAN_IMPLEMENTATION.md -->

---

<!-- BEGIN 08_FRONTEND_INTEGRATION_AND_RESPONSIVE_UI.md -->

# Step 8 — Frontend Integration and Responsive UI

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-08  
**Version:** 1.4  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  
**Depends on:** `07_SALES_CHALLAN_IMPLEMENTATION.md`  
**Next step:** `09_TESTING_SECURITY_AND_QUALITY.md`

---

## 1. Purpose

This document defines the complete React frontend integration for authentication, customers, products, inventory, and sales challans. It establishes application structure, routes, responsive admin layout, API/query behavior, form handling, role-aware actions, loading/empty/error states, accessibility, design constraints, tests, and evidence.

## 2. Source-derived requirements

The source asks for a React frontend, a clean admin-style UI, and responsive behavior. It does not prescribe a component library, state-management library, exact page layout, visual brand, or accessibility framework. Those choices below are project decisions. This step prioritizes a reliable business workflow over decorative complexity.

---

## 3. UX objectives

1. A user can understand where they are and what actions their role permits.
2. Required workflows are discoverable with minimal navigation.
3. Forms prevent avoidable mistakes but defer final authority to the API.
4. Critical mutation outcomes are unambiguous.
5. Tables and forms remain usable on common desktop, tablet, and mobile widths.
6. Loading, empty, error, forbidden, and not-found states are intentionally designed.
7. Keyboard and screen-reader users receive labels, focus, status, and error feedback.
8. The UI never implies an operation succeeded before the server confirms it.

---

## 4. Selected frontend stack

- React + TypeScript.
- Vite.
- React Router.
- Material UI.
- TanStack Query.
- React Hook Form.
- Zod.
- Axios with one configured API instance.
- Vitest + React Testing Library when frontend tests are implemented.

Avoid adding Redux, another component library, a form builder, or a complex state machine unless a concrete problem cannot be solved with the selected stack.

---

## 5. Frontend directory structure

```text
apps/web/src/
├── api/
│   ├── api-client.ts
│   ├── api-error.ts
│   ├── pagination.types.ts
│   └── query-client.ts
├── app/
│   ├── AppProviders.tsx
│   ├── AppRouter.tsx
│   └── app-config.ts
├── components/
│   ├── feedback/
│   │   ├── AppErrorAlert.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingState.tsx
│   │   └── NotFoundState.tsx
│   ├── forms/
│   ├── navigation/
│   └── table/
├── features/
│   ├── auth/
│   ├── customers/
│   ├── products/
│   ├── inventory/
│   └── challans/
├── layouts/
│   └── AdminLayout.tsx
├── pages/
│   ├── DashboardPage.tsx
│   ├── ForbiddenPage.tsx
│   └── NotFoundPage.tsx
├── routes/
│   ├── ProtectedRoute.tsx
│   ├── RoleRoute.tsx
│   └── route-config.tsx
├── theme/
│   ├── theme.ts
│   └── components.ts
├── types/
│   └── common.ts
└── main.tsx
```

Feature folders own their API functions, schemas, query keys, components, pages, and types. Generic UI components remain in `components` only when reused.

---

## 6. Provider composition

```text
ErrorBoundary
└── QueryClientProvider
    └── ThemeProvider + CssBaseline
        └── AuthProvider
            └── RouterProvider
                └── Toast/notification host
```

Rules:

- The error boundary catches unexpected render failures and offers a safe reload path.
- Query errors are handled nearer their pages; they should not all crash the app.
- Auth initialization completes before protected routing decisions.
- Theme and baseline styles load once.

---

## 7. Route map

| Route | Access | Purpose |
|---|---|---|
| `/login` | Public/anonymous | Login |
| `/dashboard` | All roles | Operational summary or lightweight welcome |
| `/customers` | All roles | Customer list |
| `/customers/new` | ADMIN, SALES | Create customer |
| `/customers/:id` | All roles | Customer detail/follow-ups |
| `/customers/:id/edit` | ADMIN, SALES | Edit customer |
| `/products` | All roles | Product list |
| `/products/new` | ADMIN, WAREHOUSE | Create product |
| `/products/:id` | All roles | Product detail/movements |
| `/products/:id/edit` | ADMIN, WAREHOUSE | Edit product |
| `/challans` | All roles | Challan list |
| `/challans/new` | ADMIN, SALES | Create Draft |
| `/challans/:id` | All roles | Challan detail |
| `/challans/:id/edit` | ADMIN, SALES and Draft only | Edit Draft |
| `/403` | Authenticated | Forbidden |
| `*` | Any | Not found |

Route access improves UX; API guards remain authoritative.

---

## 8. Admin layout

### Desktop

- Persistent or collapsible left navigation.
- Top bar with page context, current user/role, and logout.
- Main content constrained to a readable maximum width where useful.
- Breadcrumbs only when they add clarity to nested detail/edit flows.

### Mobile/tablet

- Navigation becomes a drawer controlled by an accessible menu button.
- Main content uses reduced gutters.
- Actions wrap or move into a clearly labelled overflow menu.
- Forms use one column unless two compact fields remain readable.
- Tables use horizontal scroll, column reduction, or responsive summaries without losing essential information.

### Navigation items

```text
Dashboard
Customers
Products
Challans
```

Do not show separate Inventory navigation unless there is a useful global movement page; product detail remains the primary adjustment workflow.

---

## 9. Design system baseline

### Visual language

- Neutral, professional admin interface.
- One primary action emphasis per screen.
- Consistent status chips for Lead/Active/Inactive and Draft/Confirmed/Cancelled.
- Stock IN/OUT and low-stock states use icon/text in addition to color.
- Minimum decorative motion.

### Typography and spacing

- One readable sans-serif system/font stack.
- Clear page title, section heading, field label, helper/error hierarchy.
- Consistent 4/8-pixel spacing scale through theme tokens.
- Avoid tiny text and dense data grids on mobile.

### Component policy

Use Material UI primitives consistently rather than mixing unrelated UI systems. Custom components should wrap business behavior, not merely rename a single MUI component.

---

## 10. API client behavior

### Base configuration

- Base URL from `VITE_API_BASE_URL`.
- JSON request/response.
- Bounded timeout.
- Bearer token from auth session only for the configured API origin.
- Standard API error parsing.
- No write retries in Axios or TanStack Query.

### Response types

```ts
type ApiResponse<T> = { data: T };

type ApiListResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
```

### Error normalization

Normalize network and API errors into:

```ts
type NormalizedApiError = {
  status?: number;
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
  details?: unknown;
  requestId?: string;
};
```

Unknown failures display a safe message and optional request ID for troubleshooting.

---

## 11. TanStack Query conventions

### Query key factories

```text
auth.me()
customers.list(params)
customers.detail(id)
customers.followUps(id, params)
products.list(params)
products.detail(id)
products.movements(id, params)
inventory.movements(params)
challans.list(params)
challans.detail(id)
```

Keys include all parameters that affect output.

### Default behavior

- GET queries may retry a small number of transient network/server failures.
- 400, 401, 403, and 404 do not retry.
- Mutations do not retry automatically.
- Detail data may remain fresh briefly; lists refresh after writes.
- Query cancellation occurs when search/filter parameters change rapidly where supported.

### Invalidations

Follow module documents precisely. Critical lifecycle changes invalidate related product, movement, challan, and dashboard data.

---

## 12. List-page pattern

Every entity list follows one stable pattern:

1. Header and role-aware primary action.
2. Search and filters.
3. Active filter summary/clear action.
4. Loading state.
5. Error with retry.
6. Empty state differentiated between “no records” and “no matches.”
7. Table or responsive list.
8. Pagination with total context.

List query state should be stored in URL parameters when practical:

```text
?page=1&limit=20&search=abc&status=LEAD
```

Changing a filter resets page to 1. Invalid URL parameters are sanitized or rejected into safe defaults rather than generating broken requests.

---

## 13. Form pattern

### Required behavior

- React Hook Form owns form state.
- Zod schema mirrors API format and constraints.
- Inputs have visible labels.
- Required fields are identified in text/semantics.
- Validation messages are associated with fields.
- First invalid field receives focus after submission where feasible.
- Submit prevents duplicates and shows progress.
- Cancel/back behavior is clear.
- Server field errors map to controls.
- Non-field errors appear in a prominent alert.
- Successful writes navigate or update state deliberately.

### Data transformations

- Keep prices as strings.
- Convert numeric quantity inputs deliberately.
- Convert date controls to ISO timestamps at the boundary.
- Normalize SKU/email consistently with backend expectations while still relying on server normalization.
- Never include server-owned fields through object spreading.

---

## 14. Feedback and confirmation behavior

### Toasts

Use short success messages for completed actions:

```text
Customer created
Stock updated
Draft saved
Challan confirmed
Challan cancelled and stock restored
```

Do not rely on a toast alone for critical state; the page must also show the committed status/balance.

### Confirmation dialogs

Required for:

- Product deactivation.
- Challan confirmation.
- Draft cancellation.
- Confirmed-challan cancellation and stock restoration.

The confirmed cancellation dialog requires the reason input and clearly states that stock will be added back.

### Partial Save & Confirm outcome

When Draft save succeeds but confirm fails:

- Do not claim the complete operation failed.
- Keep/navigate to the saved Draft.
- Show “Draft saved, confirmation failed.”
- Render shortage details.
- Offer Edit Draft or retry confirmation after stock correction.

---

## 15. Role-aware interface

Provide a `RoleGate` utility for visual/action gating, but use route guards for protected pages.

Examples:

- Accounts sees read-only lists/details and no mutation buttons.
- Warehouse sees product/stock actions, not customer/challan creation.
- Sales sees customer/challan actions, not stock adjustment.
- Admin sees all actions.

When a role lacks an action, hide it rather than show a permanently disabled control unless explaining the permission is useful. Direct URL access still resolves to 403.

---

## 16. Module-specific integration

### Authentication

- Login form, initialization state, logout, protected routes, 401/403 behavior from Step 4.

### Customers

- List/form/detail/follow-up patterns from Step 5.
- Follow-up timeline paginated independently.

### Products and inventory

- List/form/detail/adjustment patterns from Step 6.
- Current stock read-only outside the adjustment dialog.
- Movement before/after balances visible.

### Challans

- Customer/product searchable selections.
- Multi-row item editor.
- Snapshot-based detail.
- State/role action controls.
- Confirmation/cancellation and shortage behavior from Step 7.

No UI convenience may bypass the documented backend lifecycle.

---

## 17. Searchable selectors

Customer and product selectors must not load unbounded datasets.

Preferred pattern:

- Debounced server search.
- Bounded results such as 10–20.
- Loading/no-results states.
- Display enough context to disambiguate:
  - Customer: name, business, mobile.
  - Product: name, SKU, stock, price, location.
- Selected entity remains visible even when it is outside the current search result.

If the dataset is tiny for the demo, implementation may initially use a bounded list endpoint but must retain pagination/limit.

---

## 18. Responsive behavior matrix

Test at minimum:

```text
360 × 800   small mobile
768 × 1024  tablet
1024 × 768  small laptop/tablet landscape
1366 × 768  common laptop
1440 × 900  desktop
```

Verify:

- No page-level horizontal overflow except intentional table containers.
- Drawer and focus behavior work.
- Dialogs fit viewport and scroll internally.
- Form controls remain readable.
- Product/challan item rows remain operable.
- Primary actions remain reachable.
- Status and errors do not truncate essential meaning.

---

## 19. Accessibility requirements

- Semantic buttons/links rather than clickable generic containers.
- Visible keyboard focus.
- Drawer/dialog focus trap and focus return.
- Every input has a label and error association.
- Icon-only buttons have accessible names.
- Status is not represented by color alone.
- Toasts/alerts use suitable live-region behavior without excessive interruption.
- Table headers are marked correctly.
- Dialog title/description are associated.
- Loading indicators have accessible labels.
- Reduced-motion preference is respected for optional transitions.
- Contrast is checked for text, focus, and status chips.

The case study does not require formal certification, but obvious accessibility failures should not remain.

---

## 20. Date, time, and number display

- API sends ISO UTC.
- UI displays local date/time using one shared formatter.
- Forms convert local input to ISO deliberately.
- Show full dates in business records; avoid ambiguous numeric-only date formats where possible.
- Quantities use integers without decimals.
- Monetary strings format for display without changing persisted values.
- Currency is a UI configuration/label, not a tax/accounting feature.

---

## 21. Dashboard policy

The dashboard is P1, after the core flow.

Minimum acceptable dashboard:

- Current user/role greeting.
- Quick links to permitted workflows.
- A small set of trustworthy counts only if supported efficiently.

Possible cards:

```text
customers
leads due for follow-up
products
low-stock products
draft challans
confirmed challans
```

A dedicated summary API must be added through a documented Step 2 amendment before implementation. Do not issue many large list requests solely to calculate counts on the client. When time is short, use a useful welcome/quick-actions page instead of fake metrics.

---

## 22. Frontend testing

### Component/integration tests

- Provider tree renders.
- Protected/role routes behave correctly.
- List states: loading, data, empty, filtered-empty, error.
- Forms show validation and server field errors.
- Role-gated actions match matrix.
- Stock adjustment handles 409.
- Challan line editor prevents duplicates and calculates preview.
- Save & Confirm handles save-success/confirm-failure correctly.
- Confirmation/cancellation dialogs submit once.
- Query invalidations occur after writes.

### Browser smoke tests

When time permits, automate or manually verify:

1. Login.
2. Create customer and follow-up.
3. Create product and adjust stock.
4. Create/edit/confirm challan.
5. Insufficient-stock behavior.
6. Admin cancellation.
7. Accounts read-only behavior.

---

## 23. Performance guardrails

- Lazy-load route modules if simple to configure, but do not delay delivery for micro-optimization.
- Debounce remote search.
- Bound list/select results.
- Avoid refetch loops caused by unstable query objects.
- Memoize only where measured/obvious; do not blanket-memoize.
- Avoid embedding all movement/follow-up history in detail responses.
- Optimize images only if the optional image feature exists.
- Keep bundle additions justified.

---

## 24. Security considerations

- Never use `dangerouslySetInnerHTML` for notes, reasons, names, or API errors.
- Do not expose secrets in Vite variables.
- Send token only to the configured API origin.
- Clear authenticated query cache on logout.
- Do not trust role/action state from URL or client storage alone.
- Avoid logging forms/tokens to browser console in production.
- Render server messages as text.
- Prevent duplicate critical mutations and disable retry.

---

## 25. Risks and mitigations

| Risk | Mitigation |
|---|---|
| UI polish consumes core implementation time | Complete all business flows before decorative refinement |
| Client and server validation drift | Keep schemas mapped to documented contracts and test server errors |
| Role gate is treated as security | API authorization remains mandatory and tested |
| Critical mutation is retried | Disable mutation retry and duplicate submission |
| Mobile tables become unusable | Responsive scroll/summary and viewport test matrix |
| Save & Confirm produces misleading message | Model two-request partial outcome explicitly |
| Stale stock is shown during Draft | Label as current guidance; confirm API remains authoritative |
| Dashboard uses fake/expensive counts | Implement only with documented summary API or keep lightweight |

---

## 26. Acceptance criteria

- [x] Frontend architecture, routes, providers, and feature ownership are documented.
- [x] Admin layout and responsive behavior are documented.
- [x] API/query/form/error conventions are documented.
- [x] Role-aware and module-specific integration is documented.
- [x] Critical mutation feedback and partial outcomes are documented.
- [x] Accessibility, performance, responsive tests, and security are documented.
- [x] Dashboard scope is controlled.

Implementation completed and verified on 2026-07-28:

- [x] All documented routes and role boundaries are integrated.
- [x] Desktop sidebar and accessible mobile drawer navigation work.
- [x] Dashboard provides trustworthy role-aware quick actions without fake metrics.
- [x] API errors and query retry behavior are normalized.
- [x] Forms, tables, dialogs, loading, empty, error, forbidden, and not-found states are implemented.
- [x] Route-level code splitting removes the original oversized single-page bundle.
- [x] Desktop and 360px mobile browser checks pass without page-level overflow.
- [x] Frontend lint, type-check, tests, and production build pass.

---

## 27. Evidence

- Desktop application screenshots: `docs/screenshots/README.md`
- Responsive browser verification: 360 × 800 CSS viewport, 344.8 px main
  content, 312.8 px page content, 311.2 px table container, and no console
  warnings/errors.
- Route, role, schema, and frontend test evidence:
  `docs/evidence/quality/STEP_09_VERIFICATION.md`
- Production frontend build and full-flow browser smoke:
  `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md`
- Final commit hash remains pending repository author configuration.

---

## 28. Handoff to Step 9

Step 9 validates the complete application. It must run backend, database, frontend, security, authorization, accessibility, build, and critical concurrency checks. It must distinguish verified behavior from planned behavior and block release when stock or lifecycle invariants fail.

---

## 29. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined complete frontend architecture, integration, responsive UX, accessibility, query/form conventions, and tests. |
| 1.1 | 2026-07-28 | Added explicit source-derived frontend requirements and separated them from selected library and UX decisions. |
| 1.2 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.3 | 2026-07-28 | Recorded completed frontend integration, responsive shell, role-aware dashboard, query/error conventions, route splitting, and browser evidence. |
| 1.4 | 2026-07-28 | Fixed mobile flex/grid intrinsic-width collapse discovered during screenshot QA and replaced evidence placeholders with verified references and measurements. |

<!-- END 08_FRONTEND_INTEGRATION_AND_RESPONSIVE_UI.md -->

---

<!-- BEGIN 09_TESTING_SECURITY_AND_QUALITY.md -->

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

<!-- END 09_TESTING_SECURITY_AND_QUALITY.md -->

---

<!-- BEGIN 10_DEPLOYMENT_AND_OPERATIONS.md -->

# Step 10 — Deployment and Operations

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-10  
**Version:** 1.6
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-29
**Depends on:** Steps 1–9  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`

---

## 1. Purpose

This document defines how the verified application is run locally and deployed for assessment. It covers hosting choices, environment variables, PostgreSQL provisioning, migrations, seed data, build/start commands, frontend/API configuration, CORS, health checks, logs, smoke tests, rollback, free-host limitations, secrets, and the complete local fallback required by the assignment.

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

## 3. Deployment architecture

The verified assessment deployment is:

- Frontend: Render static site at
  `https://mini-erp-crm-web.onrender.com`
- API: Render Docker service at
  `https://mini-erp-crm-api.onrender.com/api/v1`
- Ready health:
  `https://mini-erp-crm-api.onrender.com/api/v1/health/ready`
- Swagger: `https://mini-erp-crm-api.onrender.com/api/docs`
- Database: Neon PostgreSQL 17 in Singapore

The architecture below records the provider-neutral plan that the verified
Render/Neon deployment implements.

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
- [x] HTTPS used.
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

The full local-production flow was recorded on 2026-07-28. The public
deployment was verified on 2026-07-29, including HTTPS, exact-origin CORS,
four-role authentication, an authenticated module request, SPA deep-link
fallback, and a warning-free browser console.

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
| 1.6 | 2026-07-29 | Recorded the verified Render/Neon public deployment, live endpoints, HTTPS, exact-origin CORS, and public browser/API smoke results. |

<!-- END 10_DEPLOYMENT_AND_OPERATIONS.md -->

---

<!-- BEGIN 11_SUBMISSION_AND_DEMONSTRATION.md -->

# Step 11 — Submission and Demonstration

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-11  
**Version:** 1.5
**Documentation status:** Complete  
**Implementation status:** In Progress  
**Date:** 2026-07-29
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
| Frontend URL | Yes unless local fallback accepted | Complete | `https://mini-erp-crm-web.onrender.com` |
| Backend/API URL | Yes unless local fallback accepted | Complete | `https://mini-erp-crm-api.onrender.com/api/v1` |
| Health URL | Strongly recommended | Complete | `https://mini-erp-crm-api.onrender.com/api/v1/health/ready` |
| Swagger/OpenAPI URL | Recommended | Complete | `https://mini-erp-crm-api.onrender.com/api/docs` |
| Four role credentials | Yes | Complete | `README.md` evaluator section |
| Postman collection | Yes/API docs alternative | Complete | `docs/postman/Mini_ERP_CRM.postman_collection.json` |
| Postman environment | Recommended | Complete | `docs/postman/Local.postman_environment.json` |
| README setup instructions | Yes | Complete | `README.md` |
| Deployment instructions | Yes | Complete | `README.md` and Step 10 |
| Architecture explanation | Yes | Complete | `README.md` |
| Assumptions | Yes per documentation expectation | Complete | `README.md` |
| Known limitations/incomplete work | Yes | Complete | `README.md` |
| Full-flow recording | Recommended because deployment is complete | Pending | — |
| Screenshots | Recommended | Complete | `docs/screenshots/` |
| Final test/evidence summary | Recommended | Complete | `docs/evidence/` |
| Final commit/tag | Recommended | Complete | `case-study-live-v1` |

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
| E2E/manual full flow | Pass locally; public login/module smoke passed | `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md`, `docs/evidence/deployment/STEP_10_PUBLIC_DEPLOYMENT_SMOKE.md` |
| Security review | Pass with documented non-applicable advisory | `docs/evidence/quality/STEP_09_VERIFICATION.md` |
| Responsive/accessibility | Responsive core flow pass; automated accessibility audit not claimed | Step 8 and deployment evidence |
| Clean-source setup | Pass | `docs/evidence/quality/CLEAN_SOURCE_REHEARSAL.md` |
| Production smoke | Pass for public deployment and local-production fallback | `docs/evidence/deployment/STEP_10_PUBLIC_DEPLOYMENT_SMOKE.md`, `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md` |

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
| Repository | `https://github.com/BikashCoder31/mini-erp-crm` |
| Frontend | `https://mini-erp-crm-web.onrender.com` |
| API | `https://mini-erp-crm-api.onrender.com/api/v1` |
| Swagger | `https://mini-erp-crm-api.onrender.com/api/docs` |
| Recording | Pending |
| Final commit | Release tag `case-study-live-v1` |
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
| 1.5 | 2026-07-29 | Recorded the verified public Render/Neon deployment, live URLs, exact CORS, and public browser/API smoke evidence. |

<!-- END 11_SUBMISSION_AND_DEMONSTRATION.md -->
