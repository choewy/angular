import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { createErrorMessage } from '../helpers';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  async catch(error: any, host: ArgumentsHost) {
    const exception = new InternalServerErrorException();

    const statusCode = exception.getStatus();
    const name = exception.name.replace('Exception', '');
    const data = error;
    const stack = error.stack;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const message = createErrorMessage(name, statusCode, request);

    this.logger.error(message, stack, request['context']);

    const response = ctx.getResponse<Response>();
    return response.status(statusCode).send({ statusCode, name, data });
  }
}
