import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Private {
  @Prop({ type: Types.ObjectId, ref: 'Chats' }) 
  message: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Users' }) 
  recipient: Types.ObjectId;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export type HydratedPrivate = HydratedDocument<Private>;

export const PrivateSchema = SchemaFactory.createForClass(Private);

export const NestPrivateModelProvider = {
  provide: Private.name,
  useFactory: (mongoose: Mongoose) =>
    mongoose.model('Private', PrivateSchema),
  inject: ['DATABASE_CONNECTION'],
};
