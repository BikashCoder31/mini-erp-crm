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
