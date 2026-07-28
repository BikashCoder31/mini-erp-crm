-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS');

-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('RETAIL', 'WHOLESALE', 'DISTRIBUTOR');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('LEAD', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "StockMovementType" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "StockReferenceType" AS ENUM ('OPENING_STOCK', 'MANUAL_ADJUSTMENT', 'CHALLAN_CONFIRMATION', 'CHALLAN_CANCELLATION');

-- CreateEnum
CREATE TYPE "ChallanStatus" AS ENUM ('DRAFT', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password_hash" VARCHAR(100) NOT NULL,
    "role" "UserRole" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "name" VARCHAR(160) NOT NULL,
    "mobile_number" VARCHAR(24) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "business_name" VARCHAR(180) NOT NULL,
    "gst_number" VARCHAR(32),
    "customer_type" "CustomerType" NOT NULL,
    "address" TEXT NOT NULL,
    "status" "CustomerStatus" NOT NULL DEFAULT 'LEAD',
    "follow_up_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_follow_ups" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "note" TEXT NOT NULL,
    "next_follow_up_date" TIMESTAMP(3),
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_follow_ups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "sku" VARCHAR(64) NOT NULL,
    "category" VARCHAR(120) NOT NULL,
    "unit_price" DECIMAL(12,2) NOT NULL,
    "current_stock" INTEGER NOT NULL DEFAULT 0,
    "minimum_stock_alert_quantity" INTEGER NOT NULL DEFAULT 0,
    "warehouse_location" VARCHAR(160) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challan_counters" (
    "key" VARCHAR(40) NOT NULL,
    "next_value" INTEGER NOT NULL DEFAULT 1,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challan_counters_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "challans" (
    "id" UUID NOT NULL,
    "sequence_number" INTEGER NOT NULL,
    "challan_number" VARCHAR(32) NOT NULL,
    "customer_id" UUID NOT NULL,
    "status" "ChallanStatus" NOT NULL DEFAULT 'DRAFT',
    "total_quantity" INTEGER NOT NULL,
    "total_amount" DECIMAL(14,2) NOT NULL,
    "created_by_id" UUID NOT NULL,
    "confirmed_by_id" UUID,
    "cancelled_by_id" UUID,
    "confirmed_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "cancellation_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challan_items" (
    "id" UUID NOT NULL,
    "challan_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "line_number" INTEGER NOT NULL,
    "product_name_snapshot" VARCHAR(180) NOT NULL,
    "product_sku_snapshot" VARCHAR(64) NOT NULL,
    "product_category_snapshot" VARCHAR(120) NOT NULL,
    "unit_price_snapshot" DECIMAL(12,2) NOT NULL,
    "warehouse_location_snapshot" VARCHAR(160) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "line_total" DECIMAL(14,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challan_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_movements" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "movement_type" "StockMovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" VARCHAR(300) NOT NULL,
    "balance_before" INTEGER NOT NULL,
    "balance_after" INTEGER NOT NULL,
    "reference_type" "StockReferenceType" NOT NULL,
    "challan_id" UUID,
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_is_active_idx" ON "users"("role", "is_active");

-- CreateIndex
CREATE INDEX "customers_name_idx" ON "customers"("name");

-- CreateIndex
CREATE INDEX "customers_mobile_number_idx" ON "customers"("mobile_number");

-- CreateIndex
CREATE INDEX "customers_business_name_idx" ON "customers"("business_name");

-- CreateIndex
CREATE INDEX "customers_customer_type_idx" ON "customers"("customer_type");

-- CreateIndex
CREATE INDEX "customers_status_idx" ON "customers"("status");

-- CreateIndex
CREATE INDEX "customers_follow_up_date_idx" ON "customers"("follow_up_date");

-- CreateIndex
CREATE INDEX "customers_created_at_idx" ON "customers"("created_at");

-- CreateIndex
CREATE INDEX "customer_follow_ups_customer_id_created_at_idx" ON "customer_follow_ups"("customer_id", "created_at");

-- CreateIndex
CREATE INDEX "customer_follow_ups_next_follow_up_date_idx" ON "customer_follow_ups"("next_follow_up_date");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE INDEX "products_name_idx" ON "products"("name");

-- CreateIndex
CREATE INDEX "products_category_idx" ON "products"("category");

-- CreateIndex
CREATE INDEX "products_warehouse_location_idx" ON "products"("warehouse_location");

-- CreateIndex
CREATE INDEX "products_is_active_idx" ON "products"("is_active");

-- CreateIndex
CREATE INDEX "products_current_stock_minimum_stock_alert_quantity_idx" ON "products"("current_stock", "minimum_stock_alert_quantity");

-- CreateIndex
CREATE UNIQUE INDEX "challans_sequence_number_key" ON "challans"("sequence_number");

-- CreateIndex
CREATE UNIQUE INDEX "challans_challan_number_key" ON "challans"("challan_number");

-- CreateIndex
CREATE INDEX "challans_status_created_at_idx" ON "challans"("status", "created_at");

-- CreateIndex
CREATE INDEX "challans_customer_id_created_at_idx" ON "challans"("customer_id", "created_at");

-- CreateIndex
CREATE INDEX "challans_created_by_id_created_at_idx" ON "challans"("created_by_id", "created_at");

-- CreateIndex
CREATE INDEX "challan_items_product_id_idx" ON "challan_items"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "challan_items_challan_id_product_id_key" ON "challan_items"("challan_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "challan_items_challan_id_line_number_key" ON "challan_items"("challan_id", "line_number");

-- CreateIndex
CREATE INDEX "stock_movements_product_id_created_at_idx" ON "stock_movements"("product_id", "created_at");

-- CreateIndex
CREATE INDEX "stock_movements_movement_type_created_at_idx" ON "stock_movements"("movement_type", "created_at");

-- CreateIndex
CREATE INDEX "stock_movements_reference_type_created_at_idx" ON "stock_movements"("reference_type", "created_at");

-- CreateIndex
CREATE INDEX "stock_movements_challan_id_idx" ON "stock_movements"("challan_id");

-- CreateIndex
CREATE INDEX "stock_movements_created_by_id_created_at_idx" ON "stock_movements"("created_by_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "stock_movements_challan_id_product_id_reference_type_key" ON "stock_movements"("challan_id", "product_id", "reference_type");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_follow_ups" ADD CONSTRAINT "customer_follow_ups_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_follow_ups" ADD CONSTRAINT "customer_follow_ups_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challans" ADD CONSTRAINT "challans_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challans" ADD CONSTRAINT "challans_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challans" ADD CONSTRAINT "challans_confirmed_by_id_fkey" FOREIGN KEY ("confirmed_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challans" ADD CONSTRAINT "challans_cancelled_by_id_fkey" FOREIGN KEY ("cancelled_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challan_items" ADD CONSTRAINT "challan_items_challan_id_fkey" FOREIGN KEY ("challan_id") REFERENCES "challans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challan_items" ADD CONSTRAINT "challan_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_challan_id_fkey" FOREIGN KEY ("challan_id") REFERENCES "challans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Domain invariants that Prisma cannot express directly.
ALTER TABLE "products"
  ADD CONSTRAINT "products_unit_price_non_negative"
    CHECK ("unit_price" >= 0),
  ADD CONSTRAINT "products_current_stock_non_negative"
    CHECK ("current_stock" >= 0),
  ADD CONSTRAINT "products_minimum_stock_non_negative"
    CHECK ("minimum_stock_alert_quantity" >= 0);

ALTER TABLE "stock_movements"
  ADD CONSTRAINT "stock_movements_quantity_positive"
    CHECK ("quantity" > 0),
  ADD CONSTRAINT "stock_movements_balances_non_negative"
    CHECK ("balance_before" >= 0 AND "balance_after" >= 0),
  ADD CONSTRAINT "stock_movements_direction_matches_balance"
    CHECK (
      ("movement_type" = 'IN' AND "balance_after" = "balance_before" + "quantity")
      OR
      ("movement_type" = 'OUT' AND "balance_after" = "balance_before" - "quantity")
    ),
  ADD CONSTRAINT "stock_movements_reference_consistent"
    CHECK (
      (
        "reference_type" IN ('CHALLAN_CONFIRMATION', 'CHALLAN_CANCELLATION')
        AND "challan_id" IS NOT NULL
      )
      OR
      (
        "reference_type" IN ('OPENING_STOCK', 'MANUAL_ADJUSTMENT')
        AND "challan_id" IS NULL
      )
    );

ALTER TABLE "challans"
  ADD CONSTRAINT "challans_total_quantity_positive"
    CHECK ("total_quantity" > 0),
  ADD CONSTRAINT "challans_total_amount_non_negative"
    CHECK ("total_amount" >= 0),
  ADD CONSTRAINT "challans_confirmation_fields_consistent"
    CHECK (
      ("status" <> 'CONFIRMED')
      OR ("confirmed_at" IS NOT NULL AND "confirmed_by_id" IS NOT NULL)
    ),
  ADD CONSTRAINT "challans_cancellation_fields_consistent"
    CHECK (
      ("status" <> 'CANCELLED')
      OR ("cancelled_at" IS NOT NULL AND "cancelled_by_id" IS NOT NULL)
    );

ALTER TABLE "challan_items"
  ADD CONSTRAINT "challan_items_line_number_positive"
    CHECK ("line_number" > 0),
  ADD CONSTRAINT "challan_items_quantity_positive"
    CHECK ("quantity" > 0),
  ADD CONSTRAINT "challan_items_price_non_negative"
    CHECK ("unit_price_snapshot" >= 0 AND "line_total" >= 0),
  ADD CONSTRAINT "challan_items_line_total_consistent"
    CHECK ("line_total" = ROUND("unit_price_snapshot" * "quantity", 2));
