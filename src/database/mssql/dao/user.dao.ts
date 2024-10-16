import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model'; 
import { Role } from 'src/core/enums/roles.enum';
import { EmailService } from 'src/modules/emailService/email.service';

@Injectable()
export class UserDao  {
  constructor(@InjectModel(User) private readonly userModel: typeof User,private readonly emailService: EmailService) {}

  async createUser(user): Promise<User> {

    await this.emailService.sendInvitationEmail(user.email,"http://localhost:3000/login");
    return await this.userModel.create(user);
  }

  async insertMultipleUsers(usersData:Partial<User>[]){
    return await this.userModel.bulkCreate(usersData, {
      validate: true, // Ensures that validation is run on each item
      individualHooks: true, 
    })
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({
      attributes:{
        exclude:["createdAt", "updatedAt"]
      }
    });
  }

  async findUserById(id:string){
    return await this.userModel.findByPk(id);
  }

  async findUserByName(username:string):Promise<User>{
    return await this.userModel.findOne({
                          where:{username:username}
                        })
  }
  async findUserByEmail(email:string):Promise<User>{
    return await this.userModel.findOne({
                          where:{email:email},
                          attributes:{
                            exclude: ["createdAt", "updatedAt"]
                          }
                        })
  }



  async updateUserById(id:string, userData:Partial<User>){
    return await this.userModel.update(userData,{
      where: {userId:id}
    });
  }


  async deleteUserById(id:string){
    return await this.userModel.destroy({where:{userId:id}})
  }

}
