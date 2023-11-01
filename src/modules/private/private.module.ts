import { Module } from '@nestjs/common';
import { PrivateService } from './private.service';
import { PrivateRepository } from './private.repository';
import { DatabaseModule } from 'src/config/db/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Private, PrivateSchema } from 'src/schemas/private.schema';

@Module({
  imports: [  
    DatabaseModule,
    MongooseModule.forFeature([{ name: Private.name, schema: PrivateSchema }]),
  ],
  providers: [PrivateService, PrivateRepository],
  exports: [PrivateService]
})
export class PrivateModule {}
