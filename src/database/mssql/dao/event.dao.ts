import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Event } from "../models/events.model";
import { Review } from "../models/reviews.model";
import { User } from "../models/user.model";

@Injectable()
export class EventsDao{
    constructor(@InjectModel(Event) private readonly eventsModel: typeof Event){}


    async getAllEvents(){
        return await this.eventsModel.findAll({
            include:[
                {
            model:Review,
            attributes:["review","userRating"],
            include:[
                {
                    model:User,
                    attributes:["username"]
                }
            ]
        }
        
    ],
    attributes:{
        exclude:["createdAt", "updatedAt"]
    }
    }
    );
    }

    async insertMultipleEvents(eventsData:Partial<Event>[]){
        return await this.eventsModel.bulkCreate(eventsData,{
            validate:true,
            individualHooks:true
        });
    }

    async addEvent(event:Partial<Event>){
        return await this.eventsModel.create(event)
    }

    async getEventByEventId(id:string){
        return await this.eventsModel.findByPk(id);
    }

}