import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Event } from "../models/events.model";

@Injectable()
export class EventsDao{
    constructor(@InjectModel(Event) private readonly eventsModel: typeof Event){}


    async getAllEvents(){
        return await this.eventsModel.findAll();
    }

    async getEventByEventId(id:string){
        return await this.eventsModel.findByPk(id);
    }

}