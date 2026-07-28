import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { ListProductsQueryDto } from './dto/list-products-query.dto';
import { ListStockMovementsQueryDto } from './dto/list-stock-movements-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List, search, filter, and paginate products' })
  @ApiOkResponse({ description: 'Paginated product list.' })
  list(@Query() query: ListProductsQueryDto) {
    return this.products.list(query);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.WAREHOUSE)
  @ApiOperation({ summary: 'Create a product with optional opening stock' })
  @ApiCreatedResponse({ description: 'The created product.' })
  create(
    @Body() dto: CreateProductDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.products.create(dto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product detail and recent movements' })
  detail(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.products.detail(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.WAREHOUSE)
  @ApiOperation({ summary: 'Update product metadata or active state' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.products.update(id, dto);
  }

  @Post(':id/stock-movements')
  @Roles(UserRole.ADMIN, UserRole.WAREHOUSE)
  @ApiOperation({ summary: 'Create a manual stock IN or OUT movement' })
  @ApiCreatedResponse({ description: 'The immutable stock movement.' })
  createStockMovement(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: CreateStockMovementDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.products.createStockMovement(id, dto, user);
  }

  @Get(':id/stock-movements')
  @ApiOperation({ summary: 'List a product stock ledger' })
  listStockMovements(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query() query: ListStockMovementsQueryDto,
  ) {
    return this.products.listMovements(query, id);
  }
}

@ApiTags('stock-movements')
@ApiBearerAuth()
@Controller('stock-movements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StockMovementsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List and filter the global stock ledger' })
  @ApiOkResponse({ description: 'Paginated stock movement list.' })
  list(@Query() query: ListStockMovementsQueryDto) {
    return this.products.listMovements(query);
  }
}
