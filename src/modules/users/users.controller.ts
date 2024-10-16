import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/database/mssql/models/user.model';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.guard';
import { Role } from 'src/core/enums/roles.enum';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}


    

    // @UseGuards(JwtAuthGuard,RoleGuard)
    // @Roles(Role.admin)
    @Post()
    async create(@Body() body: { username: string; email: string, role?:Role }) {
        return this.userService.createUser(body);
    }

    @Post("multiple")
    async insertMultipleUsers(@Body() body: Partial<User>[]){
        return await this.userService.insertMultipleUsers(body)
    }

    // @UseGuards(JwtAuthGuard,RoleGuard)
    // @Roles(Role.admin)
    @ApiOperation({ summary: 'Get all users' })
    @Get()
    async findAll(){
        return this.userService.findAllUsers()
    }

    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)    
    @Get(":id")
    async findUserById(@Param("id") id:string){
        return await this.userService.findUserById(id);
    }

    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Get("username/:username")
    async findUserByName(@Param("username") username:string){
        return await this.userService.findUserByName(username);
    }
    

    @Get("email/:email")
    async findUserByEmail(@Param("email") email:string){
        return await this.userService.findUserByEmail(email);
    }

    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Put("update/:id")
    async updateUserById(@Param("id") id:string, @Body() body:Partial<User> ){
        return await this.userService.updateUserById(id,body)
    }


    // @UseGuards(JwtAuthGuard,RoleGuard)
    // @Roles(Role.admin)
    @Delete("remove/:id")
    async deleteUserById(@Param("id") id:string){
        return await this.userService.deleteUserById(id);
    }

}
