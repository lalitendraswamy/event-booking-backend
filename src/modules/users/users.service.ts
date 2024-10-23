import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserDao } from '../../database/mssql/dao/user.dao';
import { User } from '../../database/mssql/models/user.model';
import { Role } from 'src/core/enums/roles.enum';
import { handleSequelizeErrors } from '../utilis/tryCatchHandler';
import { UpdateUserDto } from './dto/userPut.dto';
import { CreateUserDto } from './dto/userPost.dto';


@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)
    constructor(private readonly userDao: UserDao) { }

    async createUser(user:CreateUserDto){
            this.logger.log("Creating a User from Service");
            return await this.userDao.createUser(user);
    }

    async insertMultipleUsers(usersData: Partial<User>[]) {
            return await this.userDao.insertMultipleUsers(usersData);
    }

    async findAllUsers(): Promise<User[]> {
            this.logger.log("Handling get all users in service")
            return await this.userDao.findAll();
    }

    async findUserById(id: string) {
            this.logger.log("Getting a User by Id from service")
            return await this.userDao.findUserById(id);
    }

    async findUserByName(username: string) {
            return await this.userDao.findUserByName(username);
    }


    async findUserByEmail(email: string):Promise<any> {
            return await this.userDao.findUserByEmail(email);
    }




    async updateUserById(id: string, userData: UpdateUserDto) {
            this.logger.log("Updating a User By Id from Service");
            return await this.userDao.updateUserById(id, userData);
    }

    async deleteUserById(id: string) {
            this.logger.log("Deleting a User by Id  from Service");
            return await this.userDao.deleteUserById(id);
    }

}
