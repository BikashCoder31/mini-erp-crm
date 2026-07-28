import { Module } from '@nestjs/common';
import {
  ProductsController,
  StockMovementsController,
} from './products.controller';
import { ProductsService } from './products.service';
import { InventoryService } from './inventory.service';

@Module({
  controllers: [ProductsController, StockMovementsController],
  providers: [ProductsService, InventoryService],
  exports: [InventoryService],
})
export class ProductsModule {}
