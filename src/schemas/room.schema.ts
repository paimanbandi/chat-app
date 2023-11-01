import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, ObjectId, Types } from 'mongoose';
import { User } from './user.schema';
import { Chat } from './chat.schema';

@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Users' }) 
  creator: Types.ObjectId;


  @Prop([{ type: Types.ObjectId, ref: 'Users' }])
  participants: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Chats' }])
  messages: Types.ObjectId[];
}

export type HydratedRoom = HydratedDocument<Room>;

export const RoomSchema = SchemaFactory.createForClass(Room);

export const NestRoomModelProvider = {
  provide: Room.name,
  useFactory: (mongoose: Mongoose) =>
    mongoose.model('Room', RoomSchema),
  inject: ['DATABASE_CONNECTION'],
};
