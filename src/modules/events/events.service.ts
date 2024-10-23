import { Injectable, Logger } from '@nestjs/common';
import { EventsDao } from 'src/database/mssql/dao/event.dao';
import { Event } from "../../database/mssql/models/events.model";
import { handleSequelizeErrors } from '../utilis/tryCatchHandler';
import { UpdateEventDto } from './dto/eventPut.dto';
import { CreateEventDto } from './dto/eventPost.dto';


@Injectable()
export class EventsService {
    private readonly logger = new Logger(EventsService.name)
    constructor(private readonly eventsDao: EventsDao) { }

    async getAllEvents() {
            this.logger.log("Getting All Events from Service");
            return await this.eventsDao.getAllEvents();  
    }

    async getEventById(id: string) {
       
            this.logger.log("Getting a Event by Id from Service");
            return await this.eventsDao.getEventByEventId(id);
       
    }

    async addEvent(event: CreateEventDto) {
       
            this.logger.log("Creating a Event from Service");
            return await this.eventsDao.addEvent(event);
       
    }

    async insertMultipleEvents(eventsData: Partial<Event>[]) {
       
            return await this.eventsDao.insertMultipleEvents(eventsData);
       
    }

    async updateEventById(id: string, eventData:UpdateEventDto) {
       
            this.logger.log("Updating a Event by Id from Service");
            return await this.eventsDao.updateEventById(id, eventData);
       
    }

    async deleteEventById(id: string) {
       
            this.logger.log("Deleting a Event by Id from Service");
            return await this.eventsDao.deleteEventById(id);
       
    }

    async getFilteredEvents(filters){
        return await this.eventsDao.getFilteredEvents(filters)
    }

}

