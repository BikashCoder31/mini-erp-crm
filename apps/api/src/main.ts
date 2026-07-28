import { json, urlencoded, type NextFunction, type Response } from 'express';
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import type { RequestWithId } from './common/types/request-with-id';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  const apiPrefix = config
    .getOrThrow<string>('API_PREFIX')
    .replace(/^\/|\/$/g, '');
  const origins = config
    .getOrThrow<string>('CORS_ORIGINS')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableShutdownHooks();
  app.setGlobalPrefix(apiPrefix);
  app.use(helmet());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: false, limit: '1mb' }));
  app.use(
    (
      request: RequestWithId,
      response: { setHeader(name: string, value: string): void },
      next: () => void,
    ) => {
      const candidate = request.header('x-request-id')?.trim();
      request.requestId =
        candidate && /^[A-Za-z0-9._:-]{1,100}$/.test(candidate)
          ? candidate
          : randomUUID();
      response.setHeader('X-Request-Id', request.requestId);
      next();
    },
  );
  const httpLogger = new Logger('HTTP');
  app.use(
    (request: RequestWithId, response: Response, next: NextFunction): void => {
      const startedAt = performance.now();
      response.on('finish', () => {
        httpLogger.log({
          requestId: request.requestId,
          method: request.method,
          path: request.path,
          status: response.statusCode,
          durationMs: Math.round((performance.now() - startedAt) * 100) / 100,
        });
      });
      next();
    },
  );
  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'X-Request-Id'],
    exposedHeaders: ['X-Request-Id'],
    credentials: false,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      stopAtFirstError: false,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  if (config.get<string>('NODE_ENV') !== 'test') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Mini ERP + CRM API')
      .setDescription('Customer, inventory, and sales challan operations API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    SwaggerModule.setup(
      'api/docs',
      app,
      SwaggerModule.createDocument(app, swaggerConfig),
      {
        jsonDocumentUrl: 'api/docs-json',
      },
    );
  }

  const port = config.getOrThrow<number>('PORT');
  const host = config.getOrThrow<string>('HOST');
  await app.listen(port, host);
  logger.log(`API listening on http://${host}:${port}/${apiPrefix}`);
}

void bootstrap();
