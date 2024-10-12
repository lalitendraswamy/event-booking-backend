import { Inject, Injectable } from '@nestjs/common';
import { UserDao } from '../../database/mssql/doa/user.doa';
import { User } from '../../database/mssql/models/user.model';


@Injectable()
export class UsersService {
    constructor(private readonly userDao:UserDao){}

    async createUser(username: string, email: string): Promise<User> {
        return this.userDao.createUser(username, email);
    }

    async findAllUsers(): Promise<User[]> {
        return this.userDao.findAll();
    }
    
}
