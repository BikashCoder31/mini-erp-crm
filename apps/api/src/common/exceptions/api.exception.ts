import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(
    status: number,
    code: string,
    message: string,
    details?: unknown,
  ) {
    super(
      {
        code,
        message,
        ...(details === undefined ? {} : { details }),
      },
      status,
    );
  }
}
