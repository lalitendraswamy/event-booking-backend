import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from 'src/database/mssql/models/events.model';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService){}


    @Get()
    async getAllEvents(){
        return await this.eventsService.getAllEvents();
    }

    @Post("multiple")
    async insertMultipleEvents(@Body() body:Partial<Event>[]){
        return await this.eventsService.insertMultipleEvents(body)
    }
    

}
