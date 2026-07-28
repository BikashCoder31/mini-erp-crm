import {
  Controller,
  Get,
  HttpCode,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Aggregate API and database health check' })
  @ApiResponse({ status: 200, description: 'The API and database are ready.' })
  @ApiResponse({
    status: 503,
    description: 'A required dependency is unavailable.',
  })
  health(): Promise<{
    data: { status: string; service: string; timestamp: string };
  }> {
    return this.ready();
  }

  @Get('live')
  @HttpCode(200)
  @ApiOperation({ summary: 'Process liveness check' })
  @ApiResponse({ status: 200, description: 'The API process is running.' })
  live(): { data: { status: string; service: string; timestamp: string } } {
    return {
      data: {
        status: 'ok',
        service: 'mini-erp-api',
        timestamp: new Date().toISOString(),
      },
    };
  }

  @Get('ready')
  @HttpCode(200)
  @ApiOperation({ summary: 'Database readiness check' })
  @ApiResponse({ status: 200, description: 'The API and database are ready.' })
  @ApiResponse({
    status: 503,
    description: 'A required dependency is unavailable.',
  })
  async ready(): Promise<{
    data: { status: string; service: string; timestamp: string };
  }> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        data: {
          status: 'ready',
          service: 'mini-erp-api',
          timestamp: new Date().toISOString(),
        },
      };
    } catch {
      throw new ServiceUnavailableException(
        'A required dependency is unavailable.',
      );
    }
  }
}
