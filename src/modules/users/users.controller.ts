import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

    @Post()
    async create(@Body() body: { username: string; email: string }) {
        return this.userService.createUser(body.username, body.email);
    }

    @Get()
    async findAll(){
        return this.userService.findAllUsers()
    }
}
