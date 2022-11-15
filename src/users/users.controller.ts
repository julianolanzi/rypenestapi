import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  async create(@Body() body: CreateUserDto) {
    const email = body.email;

    try {
      if (await this.usersService.findByEmail(email)) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const user = await this.usersService.create(body);

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      if (user === null || undefined) {
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
      }

      const response = {
        name: user.name,
        lastname: user.lastname,
        age: user.age,
        email: user.email,
        createdAt: user.createdAt,
      };

      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.remove(id);
      console.log(user);
      if (user.deletedCount == 0) {
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('User remove sucess', HttpStatus.ACCEPTED);
    } catch (error) {
      return error;
    }
  }
}
