import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChallanNumberService {
  async next(transaction: Prisma.TransactionClient) {
    const rows = await transaction.$queryRaw<Array<{ sequenceNumber: number }>>`
      INSERT INTO challan_counters (key, next_value, updated_at)
      VALUES ('sales_challan', 2, NOW())
      ON CONFLICT (key)
      DO UPDATE SET
        next_value = challan_counters.next_value + 1,
        updated_at = NOW()
      RETURNING next_value - 1 AS "sequenceNumber"
    `;
    const sequenceNumber = rows[0].sequenceNumber;
    const year = new Date().getUTCFullYear();
    return {
      sequenceNumber,
      challanNumber: `CH-${year}-${String(sequenceNumber).padStart(6, '0')}`,
    };
  }
}
