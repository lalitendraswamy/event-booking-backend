import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Event } from "../models/events.model";
import { User } from "../models/user.model";
import { handleSequelizeErrors } from "src/modules/utilis/tryCatchHandler";
import { messages } from "src/core/shared/responseMessages";
import { Op } from "sequelize";

@Injectable()
export class EventsDao{
    private readonly logger = new Logger(EventsDao.name)
    constructor(@InjectModel(Event) private readonly eventsModel: typeof Event){}


    async getAllEvents(){
        return handleSequelizeErrors(async () => { 
            this.logger.log("Getting All Events From Dao")
        const events =  await this.eventsModel.findAll({
            attributes:{
                 exclude:["createdAt", "updatedAt"]
    }
    }
    );
    if(events.length===0){
        // throw new HttpException("Events Not Found", HttpStatus.NOT_FOUND);
        return {statusCode : HttpStatus.NOT_FOUND, message: messages.notFoundEvents};
    }

    
    return {statusCode:HttpStatus.OK, message: messages.eventsFound, data:events};

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
        const event =  await this.eventsModel.findByPk(id);
        if(!event){
            // throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
            return {statusCode :HttpStatus.NOT_FOUND, message:messages.notFoundEvent}
        }
       

        return {data:event, statusCode :HttpStatus.OK, message:messages.eventFound}
    });
    }

    async updateEventById(id:string,eventData:Partial<Event>){
        return handleSequelizeErrors(async () => {
            this.logger.log("Updating Event by Id in Dao");
            const response = await this.eventsModel.findOne({where:{eventId:id}});
            if(!response){
                // throw new HttpException("Event not Found to Update", HttpStatus.NOT_FOUND);
                return {statusCode : HttpStatus.NOT_FOUND, message:messages.notFoundEvent+ " while Updating"};
            }

        const updatedEvent = await this.eventsModel.update(eventData,{
            where:{eventId:id}
        });
       
        return {statusCode :HttpStatus.NO_CONTENT, message:messages.updateEvent};;
    })
    }

    async deleteEventById(id:string){
        return handleSequelizeErrors(async () => {
            this.logger.log("Deleting Event By Id in Dao");
            const response = await this.eventsModel.findOne({where:{eventId:id}});
            if(!response){
                // throw new HttpException("Event not Found to Delete", HttpStatus.NOT_FOUND);
                return {statusCode : HttpStatus.NOT_FOUND, message:messages.notFoundEvent+ " while Deleting"};
            }
        const deletedEvent =  await this.eventsModel.destroy({where:{eventId:id}})
          
        return {statusCode :HttpStatus.NO_CONTENT, message:messages.deleteEvent};
        })
    }

    // async getFilteredEvents(filters: {
    //     category?: string;
    //     eventDateTime?: string;  
    //     minTicketPrice?: number;
    //     maxTicketPrice?: number;
    //     location?: string;  
    //   }): Promise<Event[]> {
    //     const { category, eventDateTime, minTicketPrice, maxTicketPrice, location } = filters;
    
        
    //     const whereConditions: any = {};
    
       
    //     if (category) {
    //       whereConditions.category = category;
    //     }
    
        
    //     if (eventDateTime) {
    //       const date = new Date(eventDateTime);
    //       whereConditions.eventDateTime = { [Op.eq]: date };
    //     }
    

    //     if (minTicketPrice || maxTicketPrice) {
    //       whereConditions.ticketPrice = {};
    //       if (minTicketPrice) {
    //         whereConditions.ticketPrice[Op.gte] = minTicketPrice;
    //       }
    //       if (maxTicketPrice) {
    //         whereConditions.ticketPrice[Op.lte] = maxTicketPrice;
    //       }
    //     }
    
        
    //     if (location) {
    //       whereConditions.location = { [Op.like]: `%${location}%` };  // Use LIKE for partial matching
    //     }
    
        
    //     return await this.eventsModel.findAll({
    //       where: whereConditions,
    //     });
    //   }

      async getFilteredEvents(filters: {
        category?: string;
        eventDateTime?: string;
        minTicketPrice?: number;
        maxTicketPrice?: number;
        location?: string;
        page?: number; 
      }) {
        const { category, eventDateTime, minTicketPrice, maxTicketPrice, location, page = 1 } = filters;
    
        const whereConditions: any = {};
    
        
        if (category) {
          whereConditions.category = category;
        }
    
        
        if (eventDateTime) {
          const date = new Date(eventDateTime);
          whereConditions.eventDateTime = { [Op.eq]: date };
        }
    
        
        if (minTicketPrice || maxTicketPrice) {
          whereConditions.ticketPrice = {};
          if (minTicketPrice) {
            whereConditions.ticketPrice[Op.gte] = minTicketPrice;
          }
          if (maxTicketPrice) {
            whereConditions.ticketPrice[Op.lte] = maxTicketPrice;
          }
        }
    
        
        if (location) {
          whereConditions.location = { [Op.like]: `%${location}%` };
        }
    
        
        const limit = 6;
        const offset = (page - 1) * limit;
    
        
        const totalItems = await this.eventsModel.count({
          where: whereConditions,
        });
    
        
        const events = await this.eventsModel.findAll({
          where: whereConditions,
          limit,
          offset,
        });
    
        
        return {statusCode:HttpStatus.OK,message:"Filtered List of Events Found Successfully", data: {
          events,
          totalItems,
        }};
      }
}