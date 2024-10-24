import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Role } from 'src/core/enums/roles.enum';
import { EmailService } from 'src/modules/emailService/email.service';
import { handleSequelizeErrors } from 'src/modules/utilis/tryCatchHandler';
import { messages } from 'src/core/shared/responseMessages';
import { CreateUserDto } from 'src/modules/users/dto/userPost.dto';
import { Op } from 'sequelize';



@Injectable()
export class UserDao {
  private readonly logger = new Logger(UserDao.name)
  constructor(@InjectModel(User) private readonly userModel: typeof User, private readonly emailService: EmailService) { }

  async createUser(user:CreateUserDto){
    return handleSequelizeErrors(async () => {
      this.logger.log("User Creating in Dao")
      const response =  await this.userModel.create(user);
      await this.emailService.sendInvitationEmail(user.email, "http://localhost:3000/login");
      // console.log(response);
  
      return {statusCode :HttpStatus.CREATED, message: messages.postUser}
    });
  }

  async insertMultipleUsers(usersData: Partial<User>[]) {
    return handleSequelizeErrors(async () => {
      return await this.userModel.bulkCreate(usersData, {
        validate: true, 
        individualHooks: true,
      })
    });
  }

  async findAll(): Promise<any> {
    return handleSequelizeErrors(async () => {
      this.logger.log("Getting Users from Dao")
      const users = await this.userModel.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
      // console.log("Users", users)
      if (users.length === 0) {
        return {statusCode : HttpStatus.NOT_FOUND, message:messages.notFoundUsers};
      }
    
      return {data:users, statusCode :HttpStatus.OK,message:messages.usersFound };
    })
  }

  async findUserById(id: string) {
    return handleSequelizeErrors(async () => {
      this.logger.log("Getting User By Id")
      const user = await this.userModel.findByPk(id);
      if (!user) {
        this.logger.error(messages.notFoundUser);
        // throw new HttpException("User not Found", HttpStatus.NOT_FOUND);
        return {statusCode :HttpStatus.NOT_FOUND, message:messages.notFoundUser}
      }
     
      return {data:user, statusCode :HttpStatus.OK, message:messages.userFound}
    })
  }


  async findUserByName(username: string){
    // return await this.userModel.findOne({
    //   where: { username: {[Op.like] : `%${username}%`} }
    // })
    return handleSequelizeErrors(async () =>{
      const user = await this.userModel.findOne({
          where: { username: {[Op.like] : `%${username}%`} }
        })
        if(!user){
          return {statusCode :HttpStatus.NOT_FOUND, message:messages.notFoundUser+ " while searching by Username"}; 
        }

        return {statusCode:HttpStatus.OK,message:messages.userFound,data:user};
    })
  }


  async findUserByEmail(email: string) {
    return handleSequelizeErrors(async () => {
      const user = await this.userModel.findOne({
        where: { email: email },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
      if (!user) {
        // throw new HttpException("User not Found", HttpStatus.NOT_FOUND);
        return {statusCode : HttpStatus.NOT_FOUND, message:messages.notFoundUser}
      }
      return {statusCode :HttpStatus.OK,message:messages.userFound, data:user}
    })
  }



  async updateUserById(id: string, userData: Partial<User>) {
    return handleSequelizeErrors(async () => {
      this.logger.log("Updating User by Id in Dao")
      const response = await this.userModel.findOne({ where: { userId: id } })
      // console.log("Update User", response)
      if (!response) {
        // throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
        return {statusCode : HttpStatus.NOT_FOUND, message:messages.notFoundUser+ " while Updating"};
      }else{

        const updatedUser =  await this.userModel.update(userData, {
          where: { userId: id }
        });
  
        // console.log("updatedUser",updatedUser)
        return {statusCode :HttpStatus.NO_CONTENT, message:messages.updateUser};
      }


    })
  }


  async deleteUserById(id: string) {
    return handleSequelizeErrors(async () => {
      const response = await this.userModel.findOne({ where: { userId: id } })
      // console.log("Delete responsee", response)
      if (!response) {
        return {statusCode :HttpStatus.NOT_FOUND, message:messages.notFoundUser + " while Deleting"}
      }
      const deletedUser = await this.userModel.destroy({ where: { userId: id } })
      // console.log("Deleted", deletedUser)
      
      return {statusCode :HttpStatus.NO_CONTENT, message:messages.deleteUser};
    })
  }

}
