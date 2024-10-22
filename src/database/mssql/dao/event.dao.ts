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
            this.logger.log("Getting All Events From Dao")
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
            this.logger.log("Added a New Event from Dao");
        const response =  await this.eventsModel.create(event)
        return response
        })
    }

    async getEventByEventId(id:string){
        return handleSequelizeErrors(async () => {
            this.logger.log("Got a Event by Id from Dao ")
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
            this.logger.log("Updating Event by Id in Dao");
            const response = await this.eventsModel.findOne({where:{eventId:id}});
            if(!response){
                throw new HttpException("Event not Found to Update", HttpStatus.NOT_FOUND);
            }

        const updatedEvent = await this.eventsModel.update(eventData,{
            where:{eventId:id}
        });
       
        return updatedEvent;
    })
    }

    async deleteEventById(id:string){
        return handleSequelizeErrors(async () => {
            this.logger.log("Deleting Event By Id in Dao");
            const response = await this.eventsModel.findOne({where:{eventId:id}});
            if(!response){
                throw new HttpException("Event not Found to Delete", HttpStatus.NOT_FOUND);
            }
        const deletedEvent =  await this.eventsModel.destroy({where:{eventId:id}})
          
        return deletedEvent
        })
    }

}