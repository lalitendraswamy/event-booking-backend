import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from 'src/database/mssql/models/events.model';
import { ApiTags,ApiOperation,ApiResponse} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from 'src/core/enums/roles.enum';


@ApiTags('events')
@Controller('events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name)
    constructor(private readonly eventsService: EventsService){}

    @UseGuards(JwtAuthGuard)
    // @Roles(Role.admin,Role.user)
    @ApiOperation({ summary: 'Get all Events' })
    @ApiResponse({ status: 200, description: 'Return all Events' })
    @Get()
    async getAllEvents(){
        this.logger.log("Handling Get all Events Request in Events Controller")
        return await this.eventsService.getAllEvents();
        // return handler(req,res,this.eventsService.getAllEvents);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get/:id")
    async getEventById(@Param('id') id:string){
        this.logger.log("Handling Get Event by Id Request in Events Controller")
        return await this.eventsService.getEventById(id);
    }

    @Post("multiple")
    async insertMultipleEvents(@Body() body:Partial<Event>[]){
        return await this.eventsService.insertMultipleEvents(body)
    }
    
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Post("add")
    async addEvent(@Body() body :Partial<Event>){
        this.logger.log("Handling creating a Event Request in Events Controller")
        return await this.eventsService.addEvent(body);
    }

    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Put("update/:id")
    async updateEventById(@Param('id') id:string, @Body() body:Partial<Event>){
        this.logger.log("Handling Updating a Event by Id Request in Events Controller")
        return await this.eventsService.updateEventById(id,body);
    }

    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(Role.admin)
    @Delete("remove/:id")
    async deleteEventById(@Param("id") id:string){
        this.logger.log("Handling delete a Event by Id Request in Events Controller")
        return await this.eventsService.deleteEventById(id);
    }

}
