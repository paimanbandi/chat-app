import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose } from 'mongoose';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export type HydratedUser = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

export const NestUserModelProvider = {
  provide: User.name,
  useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
  inject: ['DATABASE_CONNECTION'],
};
