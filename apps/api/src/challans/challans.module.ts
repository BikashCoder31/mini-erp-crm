import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { ChallanNumberService } from './challan-number.service';
import { ChallansController } from './challans.controller';
import { ChallansService } from './challans.service';

@Module({
  imports: [ProductsModule],
  controllers: [ChallansController],
  providers: [ChallansService, ChallanNumberService],
})
export class ChallansModule {}
