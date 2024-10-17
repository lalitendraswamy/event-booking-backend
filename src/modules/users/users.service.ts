import { Inject, Injectable } from '@nestjs/common';
import { UserDao } from '../../database/mssql/dao/user.dao';
import { User } from '../../database/mssql/models/user.model';
import { Role } from 'src/core/enums/roles.enum';
import { handleSequelizeErrors } from '../utilis/tryCatchHandler';


@Injectable()
export class UsersService {
    constructor(private readonly userDao: UserDao) { }

    async createUser(user): Promise<User> {
        return handleSequelizeErrors(async () => {
            return await this.userDao.createUser(user);
        })
    }

    async insertMultipleUsers(usersData: Partial<User>[]) {
        return handleSequelizeErrors(async () => {
            return await this.userDao.insertMultipleUsers(usersData);
        })
    }

    async findAllUsers(): Promise<User[]> {
        return handleSequelizeErrors(async () => {
            return await this.userDao.findAll();
        })
    }

    async findUserById(id: string) {
        return handleSequelizeErrors(async () => {
            return await this.userDao.findUserById(id);
        })
    }

    async findUserByName(username: string) {
        return handleSequelizeErrors(async () => {
            return await this.userDao.findUserByName(username);
        })
    }
    async findUserByEmail(email: string) {
        return handleSequelizeErrors(async () => {
            return await this.userDao.findUserByEmail(email);
        })
    }




    async updateUserById(id: string, userData: Partial<User>) {
        return handleSequelizeErrors(async () => {
            return await this.userDao.updateUserById(id, userData);
        })
    }

    async deleteUserById(id: string) {
        return handleSequelizeErrors(async () => {
            return await this.userDao.deleteUserById(id);
        })
    }

}
