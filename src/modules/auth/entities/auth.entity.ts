import { Types } from 'mongoose';

export class User {
  readonly _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  otp: string;
  otpExpiry: Date;
  isVerified: boolean;
  userAgent: string;
}
