import { BadRequestException, ValidationPipe as NestValidator } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
  readonly error: Record<string, string[]>;

  constructor(readonly errors: ValidationError[]) {
    super();
    this.error = {};
    errors.forEach((error) => {
      this.error[error.property] = Object.keys(error.constraints);
    });
  }
}

export class ValidationPipe extends NestValidator {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validationError: {
        target: true,
        value: false,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(errors);
      },
    });
  }
}
