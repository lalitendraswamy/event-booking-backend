import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Role } from 'src/core/enums/roles.enum';
import { EmailService } from 'src/modules/emailService/email.service';
import { handleSequelizeErrors } from 'src/modules/utilis/tryCatchHandler';


@Injectable()
export class UserDao {
  constructor(@InjectModel(User) private readonly userModel: typeof User, private readonly emailService: EmailService) { }

  async createUser(user): Promise<User> {
    return handleSequelizeErrors(async () => {
      await this.emailService.sendInvitationEmail(user.email, "http://localhost:3000/login");
      return await this.userModel.create(user);
    });
  }

  async insertMultipleUsers(usersData: Partial<User>[]) {
    return handleSequelizeErrors(async () => {
      return await this.userModel.bulkCreate(usersData, {
        validate: true, // Ensures that validation is run on each item
        individualHooks: true,
      })
    });
  }

  async findAll(): Promise<User[]> {
    return handleSequelizeErrors(async () => {
      const users = await this.userModel.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
      // console.log("Users", users)
      if (!users) {
        throw new HttpException("Users Not Found", HttpStatus.NOT_FOUND);
      }
      return users;
    })
  }

  async findUserById(id: string) {
    return handleSequelizeErrors(async () => {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new HttpException("User not Found", HttpStatus.NOT_FOUND);
      }
      return user
    })
  }


  async findUserByName(username: string): Promise<User> {
    return await this.userModel.findOne({
      where: { username: username }
    })
  }


  async findUserByEmail(email: string): Promise<User> {
    return handleSequelizeErrors(async () => {
      const user = await this.userModel.findOne({
        where: { email: email },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
      if (!user) {
        throw new HttpException("User not Found", HttpStatus.NOT_FOUND);
      }
      return user
    })
  }



  async updateUserById(id: string, userData: Partial<User>) {
    return handleSequelizeErrors(async () => {
      const response = await this.userModel.findOne({ where: { userId: id } })
      if (!response) {
        throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
      }

      return await this.userModel.update(userData, {
        where: { userId: id }
      });
    })
  }


  async deleteUserById(id: string) {
    return handleSequelizeErrors(async () => {
      const response = await this.userModel.findOne({ where: { userId: id } })
      if (!response) {
        throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
      }

      return await this.userModel.destroy({ where: { userId: id } })
    })
  }



}
