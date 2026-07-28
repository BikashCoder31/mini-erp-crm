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
