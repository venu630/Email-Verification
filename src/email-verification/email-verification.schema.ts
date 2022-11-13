import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type EmailVerificationDocument = HydratedDocument<EmailVerification>;

@Schema({ versionKey: false })
export class EmailVerification {
  @Prop({ required: true })
  username: string;

  @Prop()
  otp: number;
}

export const EmailVerificationSchema =
  SchemaFactory.createForClass(EmailVerification);
