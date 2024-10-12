import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model'; 

@Injectable()
export class UserDao  {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(username: string, email: string): Promise<User> {

    return await this.userModel.create({ username, email });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }
}
