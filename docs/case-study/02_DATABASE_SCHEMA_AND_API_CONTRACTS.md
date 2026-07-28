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
