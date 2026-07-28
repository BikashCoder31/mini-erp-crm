import assert from 'node:assert/strict';
import { spawn, type ChildProcess } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PrismaClient } from '@prisma/client';

function loadLocalEnvironment(): void {
  const environmentPath = resolve('.env');
  if (!existsSync(environmentPath)) return;
  const contents = readFileSync(environmentPath, 'utf8');
  for (const line of contents.split(/\r?\n/)) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (!match || process.env[match[1]] !== undefined) continue;
    process.env[match[1]] = match[2];
  }
}

loadLocalEnvironment();

function requiredEnvironment(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required for integration tests.`);
  }
  return value;
}

if (!process.env.DATABASE_URL_TEST) {
  throw new Error('DATABASE_URL_TEST is required for integration tests.');
}
process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

const prisma = new PrismaClient();
const port = 4012;
const baseUrl = `http://localhost:${port}/api/v1`;
const createdCustomerIds: string[] = [];
const createdProductIds: string[] = [];
const createdChallanIds: string[] = [];

type ApiResult<T = unknown> = {
  status: number;
  body: T;
};

async function api<T>(
  method: string,
  path: string,
  token?: string,
  body?: unknown,
): Promise<ApiResult<T>> {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  return {
    status: response.status,
    body: (await response.json()) as T,
  };
}

async function waitForApi(child: ChildProcess): Promise<void> {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Test API exited with code ${child.exitCode}`);
    }
    try {
      const response = await fetch(`${baseUrl}/health/ready`);
      if (response.ok) return;
    } catch {
      // The process is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 150));
  }
  throw new Error('Timed out waiting for the test API.');
}

async function login(email: string, password: string): Promise<string> {
  const result = await api<{
    data: { accessToken: string };
  }>('POST', '/auth/login', undefined, { email, password });
  assert.equal(result.status, 200);
  return result.body.data.accessToken;
}

async function createProduct(
  token: string,
  suffix: string,
  code: string,
  openingStock: number,
) {
  const result = await api<{
    data: { id: string; currentStock: number; sku: string };
  }>('POST', '/products', token, {
    name: `Quality Product ${code}`,
    sku: `QA-${code}-${suffix}`,
    category: 'Quality Verification',
    unitPrice: code === 'A' ? '100.50' : '25.25',
    openingStock,
    minimumStockAlertQuantity: 2,
    warehouseLocation: 'QA Rack',
  });
  assert.equal(result.status, 201);
  createdProductIds.push(result.body.data.id);
  return result.body.data;
}

async function cleanup(): Promise<void> {
  if (createdProductIds.length > 0 || createdChallanIds.length > 0) {
    await prisma.stockMovement.deleteMany({
      where: {
        OR: [
          ...(createdProductIds.length > 0
            ? [{ productId: { in: createdProductIds } }]
            : []),
          ...(createdChallanIds.length > 0
            ? [{ challanId: { in: createdChallanIds } }]
            : []),
        ],
      },
    });
  }
  if (createdChallanIds.length > 0) {
    await prisma.challanItem.deleteMany({
      where: { challanId: { in: createdChallanIds } },
    });
    await prisma.challan.deleteMany({
      where: { id: { in: createdChallanIds } },
    });
  }
  if (createdProductIds.length > 0) {
    await prisma.product.deleteMany({
      where: { id: { in: createdProductIds } },
    });
  }
  if (createdCustomerIds.length > 0) {
    await prisma.customerFollowUp.deleteMany({
      where: { customerId: { in: createdCustomerIds } },
    });
    await prisma.customer.deleteMany({
      where: { id: { in: createdCustomerIds } },
    });
  }
}

async function run(): Promise<void> {
  const apiProcess = spawn(process.execPath, ['dist/main.js'], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      HOST: '127.0.0.1',
      PORT: String(port),
      NODE_ENV: 'test',
    },
    stdio: ['ignore', 'inherit', 'inherit'],
  });

  try {
    await waitForApi(apiProcess);
    const [adminToken, salesToken, warehouseToken, accountsToken] =
      await Promise.all([
        login(
          process.env.ADMIN_SEED_EMAIL ?? 'admin@example.com',
          requiredEnvironment('ADMIN_SEED_PASSWORD'),
        ),
        login(
          process.env.SALES_SEED_EMAIL ?? 'sales@example.com',
          requiredEnvironment('SALES_SEED_PASSWORD'),
        ),
        login(
          process.env.WAREHOUSE_SEED_EMAIL ?? 'warehouse@example.com',
          requiredEnvironment('WAREHOUSE_SEED_PASSWORD'),
        ),
        login(
          process.env.ACCOUNTS_SEED_EMAIL ?? 'accounts@example.com',
          requiredEnvironment('ACCOUNTS_SEED_PASSWORD'),
        ),
      ]);
    const suffix = String(Date.now());

    const unauthenticated = await api('GET', '/customers');
    assert.equal(unauthenticated.status, 401);

    const customerResult = await api<{
      data: { id: string };
    }>('POST', '/customers', salesToken, {
      name: `Quality Customer ${suffix}`,
      mobileNumber: '+977 980-000-0000',
      email: `quality-${suffix}@example.com`,
      businessName: `Quality Business ${suffix}`,
      customerType: 'WHOLESALE',
      address: 'Kathmandu quality test address',
      status: 'ACTIVE',
      followUpDate: '2026-12-31T00:00:00.000Z',
      notes: 'Synthetic integration verification record.',
    });
    assert.equal(customerResult.status, 201);
    const customerId = customerResult.body.data.id;
    createdCustomerIds.push(customerId);

    const forbiddenCustomer = await api(
      'POST',
      '/customers',
      warehouseToken,
      {},
    );
    assert.equal(forbiddenCustomer.status, 403);

    const productA = await createProduct(warehouseToken, suffix, 'A', 10);
    const productB = await createProduct(warehouseToken, suffix, 'B', 3);
    const productC = await createProduct(warehouseToken, suffix, 'C', 10);

    const directStockWrite = await api<{
      error: { code: string };
    }>('PATCH', `/products/${productA.id}`, warehouseToken, {
      currentStock: 999,
    });
    assert.equal(directStockWrite.status, 400);
    assert.equal(directStockWrite.body.error.code, 'CURRENT_STOCK_READ_ONLY');

    const forbiddenStock = await api(
      'POST',
      `/products/${productA.id}/stock-movements`,
      salesToken,
      { movementType: 'IN', quantity: 1, reason: 'Must be forbidden' },
    );
    assert.equal(forbiddenStock.status, 403);

    const draft = await api<{
      data: {
        id: string;
        status: string;
        totalQuantity: number;
        totalAmount: string;
        items: Array<{ productName: string; unitPrice: string }>;
      };
    }>('POST', '/challans', salesToken, {
      customerId,
      items: [
        { productId: productA.id, quantity: 4 },
        { productId: productB.id, quantity: 2 },
      ],
    });
    assert.equal(draft.status, 201);
    createdChallanIds.push(draft.body.data.id);
    assert.equal(draft.body.data.status, 'DRAFT');
    assert.equal(draft.body.data.totalQuantity, 6);
    assert.equal(draft.body.data.totalAmount, '452.50');

    const beforeConfirmation = await Promise.all([
      api<{ data: { currentStock: number } }>(
        'GET',
        `/products/${productA.id}`,
        accountsToken,
      ),
      api<{ data: { currentStock: number } }>(
        'GET',
        `/products/${productB.id}`,
        accountsToken,
      ),
    ]);
    assert.deepEqual(
      beforeConfirmation.map((result) => result.body.data.currentStock),
      [10, 3],
    );

    const confirmed = await api<{
      data: { status: string; items: Array<{ productName: string }> };
    }>('POST', `/challans/${draft.body.data.id}/confirm`, salesToken, {});
    assert.equal(confirmed.status, 200);
    assert.equal(confirmed.body.data.status, 'CONFIRMED');

    const afterConfirmation = await Promise.all([
      api<{ data: { currentStock: number } }>(
        'GET',
        `/products/${productA.id}`,
        accountsToken,
      ),
      api<{ data: { currentStock: number } }>(
        'GET',
        `/products/${productB.id}`,
        accountsToken,
      ),
    ]);
    assert.deepEqual(
      afterConfirmation.map((result) => result.body.data.currentStock),
      [6, 1],
    );

    const repeatConfirm = await api<{ error: { code: string } }>(
      'POST',
      `/challans/${draft.body.data.id}/confirm`,
      salesToken,
      {},
    );
    assert.equal(repeatConfirm.status, 409);
    assert.equal(repeatConfirm.body.error.code, 'CHALLAN_NOT_DRAFT');

    const salesConfirmedCancel = await api(
      'POST',
      `/challans/${draft.body.data.id}/cancel`,
      salesToken,
      { reason: 'Sales cannot reverse this challan' },
    );
    assert.equal(salesConfirmedCancel.status, 403);

    const cancelled = await api<{ data: { status: string } }>(
      'POST',
      `/challans/${draft.body.data.id}/cancel`,
      adminToken,
      { reason: 'Quality audit complete reversal' },
    );
    assert.equal(cancelled.status, 200);
    assert.equal(cancelled.body.data.status, 'CANCELLED');

    const restored = await Promise.all([
      api<{ data: { currentStock: number } }>(
        'GET',
        `/products/${productA.id}`,
        accountsToken,
      ),
      api<{ data: { currentStock: number } }>(
        'GET',
        `/products/${productB.id}`,
        accountsToken,
      ),
    ]);
    assert.deepEqual(
      restored.map((result) => result.body.data.currentStock),
      [10, 3],
    );

    const repeatCancel = await api<{ error: { code: string } }>(
      'POST',
      `/challans/${draft.body.data.id}/cancel`,
      adminToken,
      { reason: 'Must not restore twice' },
    );
    assert.equal(repeatCancel.status, 409);
    assert.equal(repeatCancel.body.error.code, 'CHALLAN_ALREADY_CANCELLED');

    const concurrentOutcomes = await Promise.all([
      api('POST', `/products/${productC.id}/stock-movements`, warehouseToken, {
        movementType: 'OUT',
        quantity: 7,
        reason: 'Concurrency request A',
      }),
      api('POST', `/products/${productC.id}/stock-movements`, warehouseToken, {
        movementType: 'OUT',
        quantity: 7,
        reason: 'Concurrency request B',
      }),
    ]);
    assert.deepEqual(
      concurrentOutcomes.map((result) => result.status).sort(),
      [201, 409],
    );
    const concurrentProduct = await api<{
      data: { currentStock: number };
    }>('GET', `/products/${productC.id}`, accountsToken);
    assert.equal(concurrentProduct.body.data.currentStock, 3);

    const accountsRead = await api(
      'GET',
      `/challans/${draft.body.data.id}`,
      accountsToken,
    );
    assert.equal(accountsRead.status, 200);

    process.stdout.write(
      `${JSON.stringify(
        {
          authentication: '4 roles verified',
          authorization: 'representative allow/deny matrix verified',
          draftStockUnchanged: true,
          confirmedBalances: [6, 1],
          cancelledBalances: [10, 3],
          repeatedCommandsBlocked: true,
          concurrentOutStatuses: [201, 409],
          concurrentFinalStock: 3,
        },
        null,
        2,
      )}\n`,
    );
  } finally {
    await cleanup();
    await prisma.$disconnect();
    apiProcess.kill();
  }
}

void run().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
