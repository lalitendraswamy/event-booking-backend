import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from 'src/database/mssql/models/events.model';
import { ApiTags,ApiOperation,ApiResponse, ApiExcludeEndpoint, ApiBody, ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from 'src/core/enums/roles.enum';
import {CreateEventDto} from "./dto/event";

@ApiTags('events')
@Controller('events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name)
    constructor(private readonly eventsService: EventsService){}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)

    @ApiOperation({ summary: 'Get all Events' })
    @ApiResponse({ status: 200, description: 'Return all Events' })
    @Get()
    async getAllEvents(){
        this.logger.log("Handling Get all Events Request in Events Controller")
        return await this.eventsService.getAllEvents();
        // return handler(req,res,this.eventsService.getAllEvents);
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("get/:id")
    async getEventById(@Param('id') id:string){
        this.logger.log("Handling Get Event by Id Request in Events Controller")
        return await this.eventsService.getEventById(id);
    }

    @ApiExcludeEndpoint()
    @Post("multiple")
    async insertMultipleEvents(@Body() body:Partial<Event>[]){
        return await this.eventsService.insertMultipleEvents(body)
    }
    
    @ApiBearerAuth()
    @ApiBody({description:"Event added",type:CreateEventDto})
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Post("add")
    async addEvent(@Body() body :Partial<Event>){
        this.logger.log("Handling creating a Event Request in Events Controller")
        return await this.eventsService.addEvent(body);
    }

    @ApiBearerAuth()
    @ApiBody({description:"Event added",type:CreateEventDto})
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Put("update/:id")
    async updateEventById(@Param('id') id:string, @Body() body:Partial<Event>){
        this.logger.log("Handling Updating a Event by Id Request in Events Controller")
        return await this.eventsService.updateEventById(id,body);
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Delete("remove/:id")
    async deleteEventById(@Param("id") id:string){
        this.logger.log("Handling delete a Event by Id Request in Events Controller")
        return await this.eventsService.deleteEventById(id);
    }

}
