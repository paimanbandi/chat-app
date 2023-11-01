import { ForbiddenException } from '@nestjs/common';

export class ForbiddenAccessException extends ForbiddenException {
  constructor(something: string) {
    super(`You don't have permissions to access this '${something}'`);
  }
}
