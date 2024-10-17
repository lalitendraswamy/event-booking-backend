import { Injectable } from '@nestjs/common';
import { EventsDao } from 'src/database/mssql/dao/event.dao';
import { Event } from "../../database/mssql/models/events.model";
import { handleSequelizeErrors } from '../utilis/tryCatchHandler';


@Injectable()
export class EventsService {

    constructor(private readonly eventsDao: EventsDao) { }

    async getAllEvents() {
        return handleSequelizeErrors(async () => {
            return await this.eventsDao.getAllEvents();
        })
    }

    async getEventById(id: string) {
        return handleSequelizeErrors(async () => {
            return await this.eventsDao.getEventByEventId(id);
        })
    }

    async addEvent(event: Partial<Event>) {
        return handleSequelizeErrors(async () => {
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
            return await this.eventsDao.updateEventById(id, eventData);
        })
    }

    async deleteEventById(id: string) {
        return handleSequelizeErrors(async () => {
            return await this.eventsDao.deleteEventById(id);
        })
    }

}

