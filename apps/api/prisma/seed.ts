import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const accounts: Array<{
  role: UserRole;
  name: string;
  emailKey: string;
  passwordKey: string;
}> = [
  {
    role: UserRole.ADMIN,
    name: 'Admin User',
    emailKey: 'ADMIN_SEED_EMAIL',
    passwordKey: 'ADMIN_SEED_PASSWORD',
  },
  {
    role: UserRole.SALES,
    name: 'Sales User',
    emailKey: 'SALES_SEED_EMAIL',
    passwordKey: 'SALES_SEED_PASSWORD',
  },
  {
    role: UserRole.WAREHOUSE,
    name: 'Warehouse User',
    emailKey: 'WAREHOUSE_SEED_EMAIL',
    passwordKey: 'WAREHOUSE_SEED_PASSWORD',
  },
  {
    role: UserRole.ACCOUNTS,
    name: 'Accounts User',
    emailKey: 'ACCOUNTS_SEED_EMAIL',
    passwordKey: 'ACCOUNTS_SEED_PASSWORD',
  },
];

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required seed variable: ${name}`);
  }
  return value;
}

async function main(): Promise<void> {
  for (const account of accounts) {
    const email = required(account.emailKey).toLowerCase();
    const password = required(account.passwordKey);

    if (
      process.env.NODE_ENV !== 'test' &&
      /replace-me|password/i.test(password)
    ) {
      throw new Error(
        `${account.passwordKey} must not use a placeholder password`,
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.upsert({
      where: { email },
      update: {
        name: account.name,
        passwordHash,
        role: account.role,
        isActive: true,
      },
      create: { name: account.name, email, passwordHash, role: account.role },
    });
  }

  await prisma.challanCounter.upsert({
    where: { key: 'sales_challan' },
    update: {},
    create: { key: 'sales_challan', nextValue: 1 },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error instanceof Error ? error.message : 'Seed failed');
    await prisma.$disconnect();
    process.exit(1);
  });
