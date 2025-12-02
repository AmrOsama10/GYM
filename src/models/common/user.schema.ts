import { USER_AGENT } from '@common/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: { virtuals: true },
})
export class User {
  readonly _id: Types.ObjectId;

  @Prop({ type: String, required: true, minLength: 3 })
  userName: string;

  @Prop({ type: String, required: true, unique: true, trim: true })
  email: string;

  @Prop({
    type: String,
    required() {
      if (this.userAgent == USER_AGENT.local) {
        return true;
      }
      return false;
    },
  })
  password: string;

  @Prop({ type: String })
  otp: string;

  @Prop({ type: Date })
  otpExpiry: Date;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: String, enum: USER_AGENT, default: USER_AGENT.local })
  userAgent: string;
}

export const userSchema = SchemaFactory.createForClass(User)