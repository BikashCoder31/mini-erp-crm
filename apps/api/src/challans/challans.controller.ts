import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { ChallansService } from './challans.service';
import { CancelChallanDto } from './dto/cancel-challan.dto';
import { CreateChallanDto } from './dto/create-challan.dto';
import { ListChallansQueryDto } from './dto/list-challans-query.dto';
import { UpdateDraftChallanDto } from './dto/update-draft-challan.dto';

@ApiTags('challans')
@ApiBearerAuth()
@Controller('challans')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChallansController {
  constructor(private readonly challans: ChallansService) {}

  @Get()
  @ApiOperation({ summary: 'List, search, filter, and paginate challans' })
  @ApiOkResponse({ description: 'Paginated challan list.' })
  list(@Query() query: ListChallansQueryDto) {
    return this.challans.list(query);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SALES)
  @ApiOperation({ summary: 'Create a Draft challan' })
  @ApiCreatedResponse({ description: 'The created Draft challan.' })
  create(
    @Body() dto: CreateChallanDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.challans.create(dto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get challan detail and product snapshots' })
  detail(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.challans.detail(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SALES)
  @ApiOperation({ summary: 'Replace a Draft challan customer and items' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateDraftChallanDto,
  ) {
    return this.challans.updateDraft(id, dto);
  }

  @Post(':id/confirm')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SALES)
  @ApiOperation({ summary: 'Confirm a Draft and deduct stock atomically' })
  @ApiOkResponse({ description: 'The Confirmed challan.' })
  confirm(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.challans.confirm(id, user);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SALES)
  @ApiOperation({ summary: 'Cancel a Draft or reverse a Confirmed challan' })
  @ApiOkResponse({ description: 'The Cancelled challan.' })
  cancel(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: CancelChallanDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.challans.cancel(id, dto, user);
  }
}
