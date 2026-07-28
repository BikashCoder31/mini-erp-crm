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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { ListCustomersQueryDto } from './dto/list-customers-query.dto';
import { ListFollowUpsQueryDto } from './dto/list-follow-ups-query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('customers')
@ApiBearerAuth()
@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly customers: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'List, search, filter, and paginate customers' })
  @ApiOkResponse({ description: 'Paginated customer list.' })
  list(@Query() query: ListCustomersQueryDto) {
    return this.customers.list(query);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SALES)
  @ApiOperation({ summary: 'Create a customer' })
  @ApiCreatedResponse({ description: 'The created customer.' })
  create(
    @Body() dto: CreateCustomerDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.customers.create(dto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer detail' })
  detail(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.customers.detail(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SALES)
  @ApiOperation({ summary: 'Update editable customer fields' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customers.update(id, dto);
  }

  @Get(':id/follow-ups')
  @ApiOperation({ summary: 'List customer follow-up history' })
  listFollowUps(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query() query: ListFollowUpsQueryDto,
  ) {
    return this.customers.listFollowUps(id, query);
  }

  @Post(':id/follow-ups')
  @Roles(UserRole.ADMIN, UserRole.SALES)
  @ApiOperation({ summary: 'Append a customer follow-up note' })
  @ApiCreatedResponse({
    description: 'The created follow-up and resulting current date.',
  })
  addFollowUp(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: CreateFollowUpDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.customers.addFollowUp(id, dto, user);
  }
}
