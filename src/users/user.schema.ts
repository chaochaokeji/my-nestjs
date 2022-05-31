import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ default: '' })
  username: string;

  @Prop()
  email: string;

  @Prop({ select: 0 })
  password: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ type: Number, default: 0 })
  status: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
