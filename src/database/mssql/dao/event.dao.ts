import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Event } from "../models/events.model";
import { Review } from "../models/reviews.model";
import { User } from "../models/user.model";
import { handleSequelizeErrors } from "src/modules/utilis/tryCatchHandler";

@Injectable()
export class EventsDao{
    constructor(@InjectModel(Event) private readonly eventsModel: typeof Event){}


    async getAllEvents(){
        return handleSequelizeErrors(async () => {     
        const events =  await this.eventsModel.findAll({
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
    if(!events){
        throw new HttpException("Events Not Found", HttpStatus.NOT_FOUND);
    }
    return events;

})
    }

    async insertMultipleEvents(eventsData:Partial<Event>[]){
        return handleSequelizeErrors(async () => {
        return await this.eventsModel.bulkCreate(eventsData,{
            validate:true,
            individualHooks:true
        });
    })
    }

    async addEvent(event:Partial<Event>){
        return handleSequelizeErrors(async () => {
        return await this.eventsModel.create(event)
        })
    }

    async getEventByEventId(id:string){
        return handleSequelizeErrors(async () => {
        const event =  await this.eventsModel.findByPk(id,
            {
                include:[
                    {
                        model:Review,
                        attributes:["review", "userRating"],
                        include:[
                            {
                                model:User,
                                attributes:["username"]
                            }
                        ]
                    }
                ],
                attributes:{
                    exclude:["updatedAt","createdAt"]
                }            
            }
        );
        if(!event){
            throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
        }

        return event
    });
    }

    async updateEventById(id:string,eventData:Partial<Event>){
        return handleSequelizeErrors(async () => {
            const response = await this.eventsModel.findOne({where:{eventId:id}});
            if(!response){
                throw new HttpException("Event not Found to Update", HttpStatus.NOT_FOUND);
            }
        return await this.eventsModel.update(eventData,{
            where:{eventId:id}
        });
    })
    }

    async deleteEventById(id:string){
        return handleSequelizeErrors(async () => {
            const response = await this.eventsModel.findOne({where:{eventId:id}});
            if(!response){
                throw new HttpException("Event not Found to Delete", HttpStatus.NOT_FOUND);
            }
        return await this.eventsModel.destroy({where:{eventId:id}})
        })
    }

}