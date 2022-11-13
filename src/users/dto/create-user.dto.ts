import { Date } from 'mongoose';

export class CreateUserDto {
  name: string;
  lastaname: string;
  age: number;
  email: string;
  password: string;
  passwordResetToken: Date;
  passwordResetExpires: Date;
  createdAt: Date;
}
