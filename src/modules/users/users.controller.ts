import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/database/mssql/models/user.model';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.guard';
import { Role } from 'src/core/enums/roles.enum';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth,ApiBody,ApiExcludeEndpoint} from '@nestjs/swagger';
import {CreateUserDto} from "./dto/userPost.dto";
import { MyLogger } from 'src/core/logger/logger.service';
import { UpdateUserDto } from './dto/userPut.dto';


@ApiTags("users")
@Controller('users') 
export class UsersController {
    // private readonly logger = new Logger(UsersController.name);
    constructor(private readonly userService:UsersService,private readonly logger: MyLogger){}

    @ApiBearerAuth() 
    @ApiBody({ description: 'User data to create', type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Post()
    async create(@Body() body: CreateUserDto) {
        this.logger.log("Handling Post request in User Controller")
        return this.userService.createUser(body);
    }


    @ApiExcludeEndpoint()
    @Post("multiple")
    async insertMultipleUsers(@Body() body: Partial<User>[]){
        try{
            return await this.userService.insertMultipleUsers(body)
        }catch(err){
            this.logger.error(err);
        }
    }

    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @ApiOperation({ summary: 'Get all users' })
    @Get()  
    async findAll(){
        this.logger.log("handle get request in Controller")
        return this.userService.findAllUsers()
    }

    @ApiBearerAuth() 
    // @UseGuards(JwtAuthGuard,RoleGuard)
    // @Roles(Role.admin)    
    @Get(":id")
    async findUserById(@Param("id") id:string){
        this.logger.log("handle get User by Id request in Controller")
        return await this.userService.findUserById(id);
    }

    @ApiBearerAuth() 
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

    @ApiBody({ description: 'User data to update', type: CreateUserDto })
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Put("update/:id")
    async updateUserById(@Param("id") id:string, @Body() body:UpdateUserDto ){
        this.logger.log("handle Update user by Id request in Controller");
        return await this.userService.updateUserById(id,body)
    }

    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Delete("remove/:id")
    async deleteUserById(@Param("id") id:string){
        this.logger.log("handle delete User By Id request in Controller");
        return await this.userService.deleteUserById(id);
    }

}
