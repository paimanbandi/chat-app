import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Chat {
  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Users' }) 
  sender: Types.ObjectId;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export type HydratedChat = HydratedDocument<Chat>;

export const ChatSchema = SchemaFactory.createForClass(Chat);

export const NestChatModelProvider = {
  provide: Chat.name,
  useFactory: (mongoose: Mongoose) =>
    mongoose.model('Chat', ChatSchema),
  inject: ['DATABASE_CONNECTION'],
};
