import { BadRequestException } from '@nestjs/common';

export class InvalidObjectIdException extends BadRequestException {
  constructor(fieldName: string) {
    super(`The provided ObjectId for '${fieldName}' is invalid`);
  }
}
