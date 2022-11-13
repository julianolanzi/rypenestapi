import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;
  lastaname: string;
  age: number;
  email: string;
  password: string;
}
