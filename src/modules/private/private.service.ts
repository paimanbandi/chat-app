import { Injectable } from '@nestjs/common';
import { PrivateRepository } from './private.repository';

@Injectable()
export class PrivateService {
  constructor(private privateRepo: PrivateRepository){}
  
  async chatToPrivate(message: string, recipient: string) {
    return await this.privateRepo.create(message, recipient);
  }
}
