import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from 'src/database/mssql/models/events.model';
import { ApiTags,ApiOperation,ApiResponse} from '@nestjs/swagger';
import { handler } from '../utilis/tryCatchHandler';

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService){}

    @ApiOperation({ summary: 'Get all Events' })
    @ApiResponse({ status: 200, description: 'Return all Events' })
    @Get()
    async getAllEvents(){
        return await this.eventsService.getAllEvents();
        // return handler(req,res,this.eventsService.getAllEvents);
    }

    @Post("multiple")
    async insertMultipleEvents(@Body() body:Partial<Event>[]){
        return await this.eventsService.insertMultipleEvents(body)
    }
    
    @Post("add")
    async addEvent(@Body() body :Partial<Event>){
        return await this.eventsService.addEvent(body);
    }

    @Put("update/:id")
    async updateEventById(@Param('id') id:string, @Body() body:Partial<Event>){
        return await this.eventsService.updateEventById(id,body);
    }

    @Delete("remove/:id")
    async deleteEventById(@Param("id") id:string){
        return await this.eventsService.deleteEventById(id);
    }

}
