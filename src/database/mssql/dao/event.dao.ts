import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Event } from "../models/events.model";
import { Review } from "../models/reviews.model";
import { User } from "../models/user.model";
import { handleSequelizeErrors } from "src/modules/utilis/tryCatchHandler";

@Injectable()
export class EventsDao{
    private readonly logger = new Logger(EventsDao.name)
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

    this.logger.log("Getting All Events From Dao")
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
        const response =  await this.eventsModel.create(event)
        this.logger.log("Added a New Event from Dao");
        return response
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
        this.logger.log("Got a Event by Id from Dao ")

        return event
    });
    }

    async updateEventById(id:string,eventData:Partial<Event>){
        return handleSequelizeErrors(async () => {
            const response = await this.eventsModel.findOne({where:{eventId:id}});
            if(!response){
                throw new HttpException("Event not Found to Update", HttpStatus.NOT_FOUND);
            }
        const updatedEvent = await this.eventsModel.update(eventData,{
            where:{eventId:id}
        });
        this.logger.log("Updated Event by Id in Dao");
        return updatedEvent;
    })
    }

    async deleteEventById(id:string){
        return handleSequelizeErrors(async () => {
            const response = await this.eventsModel.findOne({where:{eventId:id}});
            if(!response){
                throw new HttpException("Event not Found to Delete", HttpStatus.NOT_FOUND);
            }
        const deletedEvent =  await this.eventsModel.destroy({where:{eventId:id}})
            this.logger.log("Deleted Event By Id in Dao");
        return deletedEvent
        })
    }

}