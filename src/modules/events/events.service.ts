import { Injectable } from '@nestjs/common';
import { EventsDao } from 'src/database/mssql/dao/event.dao';
import { Event } from "../../database/mssql/models/events.model";


@Injectable()
export class EventsService {

    constructor(private readonly eventsDao: EventsDao){}

    async getAllEvents(){
        return await this.eventsDao.getAllEvents();
    }

    async insertMultipleEvents(eventsData: Partial<Event>[]){
        return await this.eventsDao.insertMultipleEvents(eventsData);
    }

}
