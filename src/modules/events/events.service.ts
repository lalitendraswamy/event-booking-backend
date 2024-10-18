import { Injectable, Logger } from '@nestjs/common';
import { EventsDao } from 'src/database/mssql/dao/event.dao';
import { Event } from "../../database/mssql/models/events.model";
import { handleSequelizeErrors } from '../utilis/tryCatchHandler';


@Injectable()
export class EventsService {
    private readonly logger = new Logger(EventsService.name)
    constructor(private readonly eventsDao: EventsDao) { }

    async getAllEvents() {
        return handleSequelizeErrors(async () => {
            this.logger.log("Getting All Events from Service");
            return await this.eventsDao.getAllEvents();
        })
    }

    async getEventById(id: string) {
        return handleSequelizeErrors(async () => {
            this.logger.log("Getting a Event by Id from Service");
            return await this.eventsDao.getEventByEventId(id);
        })
    }

    async addEvent(event: Partial<Event>) {
        return handleSequelizeErrors(async () => {
            this.logger.log("Creating a Event from Service");
            return await this.eventsDao.addEvent(event);
        })
    }

    async insertMultipleEvents(eventsData: Partial<Event>[]) {
        return handleSequelizeErrors(async () => {
            return await this.eventsDao.insertMultipleEvents(eventsData);
        })
    }

    async updateEventById(id: string, eventData: Partial<Event>) {
        return handleSequelizeErrors(async () => {
            this.logger.log("Updating a Event by Id from Service");
            return await this.eventsDao.updateEventById(id, eventData);
        })
    }

    async deleteEventById(id: string) {
        return handleSequelizeErrors(async () => {
            this.logger.log("Deleting a Event by Id from Service");
            return await this.eventsDao.deleteEventById(id);
        })
    }

}

