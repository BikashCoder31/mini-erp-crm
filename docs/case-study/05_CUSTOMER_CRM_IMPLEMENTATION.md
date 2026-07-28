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
