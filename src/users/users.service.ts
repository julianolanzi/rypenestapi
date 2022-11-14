import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const payload = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const user = new this.UserModel(payload);
    const data = await user.save();

    const response = {
      id: data._id,
      name: data.name,
      lastname: data.lastname,
      age: data.age,
      email: data.email,
    };
    return response;
  }

  findAll() {
    return this.UserModel.find();
  }

  async findOne(id: string) {
    const user = await this.UserModel.findById(id);

    return user;
  }

  findByEmail(email: string) {
    return this.UserModel.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );

    const response = {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      email: user.email,
    };
    return response;
  }

  async remove(id: string) {
    return await this.UserModel.deleteOne({
      _id: id,
    }).exec();
  }
}
