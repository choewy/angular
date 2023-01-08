import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { createErrorMessage } from '../helpers';
import { ValidationException } from '../pipes';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const statusCode = exception.getStatus();
    const name = exception.name.replace('Exception', '');

    let data = null;

    if (exception instanceof ValidationException) {
      data = exception.error;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const message = createErrorMessage(name, statusCode, request);

    if (statusCode >= 500) {
      data = exception.cause;
      this.logger.error(message, exception.stack, request['context']);
    } else {
      this.logger.warn(message, request['context']);
    }

    const response = ctx.getResponse<Response>();
    return response.status(statusCode).send({ statusCode, name, data });
  }
}
