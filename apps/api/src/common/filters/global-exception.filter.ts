import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import type { RequestWithId } from '../types/request-with-id';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<RequestWithId>();
    const response = context.getResponse<Response>();
    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : 500;
    const payload = isHttp ? exception.getResponse() : undefined;
    const details = this.extractDetails(payload);
    const declaredCode = this.extractCode(payload);
    const code =
      declaredCode ??
      (status === 400
        ? 'VALIDATION_FAILED'
        : status === 404
          ? 'NOT_FOUND'
          : status === 503
            ? 'SERVICE_UNAVAILABLE'
            : status >= 500
              ? 'INTERNAL_ERROR'
              : 'REQUEST_FAILED');

    if (!isHttp || status >= 500) {
      this.logger.error({
        message:
          exception instanceof Error ? exception.message : 'Unknown exception',
        requestId: request.requestId,
        method: request.method,
        path: request.originalUrl,
        stack: exception instanceof Error ? exception.stack : undefined,
      });
    }

    response.status(status).json({
      error: {
        code,
        message:
          status >= 500
            ? 'The service could not complete the request.'
            : this.extractMessage(payload, exception),
        ...(details === undefined ? {} : { details }),
        requestId: request.requestId,
      },
    });
  }

  private extractMessage(payload: unknown, exception: unknown): string {
    if (typeof payload === 'string') return payload;
    if (payload && typeof payload === 'object' && 'message' in payload) {
      const message = payload.message;
      if (typeof message === 'string') return message;
      if (Array.isArray(message)) return 'The request contains invalid values.';
    }
    return exception instanceof Error
      ? exception.message
      : 'The request could not be completed.';
  }

  private extractDetails(payload: unknown): unknown {
    if (!payload || typeof payload !== 'object') return undefined;
    if ('details' in payload) return payload.details;
    if (!('message' in payload)) return undefined;
    const messages = payload.message;
    if (!Array.isArray(messages)) return undefined;
    return messages
      .filter((message): message is string => typeof message === 'string')
      .map((message) => {
        const field = message.split(' ', 1)[0];
        return { ...(field ? { field } : {}), message };
      });
  }

  private extractCode(payload: unknown): string | undefined {
    if (!payload || typeof payload !== 'object' || !('code' in payload))
      return undefined;
    return typeof payload.code === 'string' ? payload.code : undefined;
  }
}
