# Mini ERP + CRM Operations Portal — Documentation Index

**Project:** Full Stack Developer Case Study — Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-DOC-INDEX  
**Version:** 2.7  
**Documentation status:** Complete  
**Application implementation status:** Complete; source, clean-source rehearsal, CI, GitHub publication, and local-production fallback are verified, while recording, public hosting, and submission closeout remain pending  
**Date:** 2026-07-28  
**Documentation root:** `docs/case-study/`  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`

---

## 1. Purpose

This index is the entry point for the complete case-study documentation set. It defines document authority, source labeling, status vocabulary, implementation order, evidence rules, file inventory, cross-step dependencies, and change control.

The documents record both the implementation contract and the evidence gathered
through the current local-production release candidate. Pending external or
candidate-owned closeout is explicitly marked and must not be inferred as
complete.

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
| 10 | `10_DEPLOYMENT_AND_OPERATIONS.md` | Complete | Complete | Provides and verifies the accepted Docker local-production fallback; public HTTPS hosting remains the next external phase. |
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
Git history, GitHub publication, and the local-production fallback are
complete. Candidate identity, recording, public hosting, and submission receipt
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
