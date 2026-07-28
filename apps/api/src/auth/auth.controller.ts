import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { RequestWithId } from '../common/types/request-with-id';
import { AuthService } from './auth.service';
import type { AuthenticatedUser, LoginResponse } from './auth.types';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginRateLimitGuard } from './guards/login-rate-limit.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LoginRateLimitGuard)
  @ApiOperation({ summary: 'Sign in with a seeded role account' })
  @ApiOkResponse({ description: 'A bearer token and safe user projection.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  login(
    @Body() dto: LoginDto,
    @Req() request: RequestWithId,
  ): Promise<LoginResponse> {
    return this.auth.login(dto, request.requestId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return the active authenticated user' })
  me(@CurrentUser() user: AuthenticatedUser): { data: AuthenticatedUser } {
    return { data: user };
  }
}
