import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TicketBooking } from "../models/ticketBookings.model";
import { Event } from "../models/events.model";
import { handleSequelizeErrors } from "src/modules/utilis/tryCatchHandler";



@Injectable()
export class BookingDao{
    private readonly logger = new Logger(BookingDao.name);

    constructor(@InjectModel(TicketBooking) private readonly bookingModel: typeof TicketBooking){}

    async createBooking(bookingData: Partial<TicketBooking>){
        return await this.bookingModel.create(bookingData);
    }

    async getAllBookings(){
        return await this.bookingModel.findAll({
            include:[{
                model:Event
            }]
        });
    }

    async updateBookingById(id:string, bookingData:Partial<TicketBooking>){
        return await this.bookingModel.update(bookingData, {where:{bookingId:id}});
    }

    async getOrdersByUserId(id:string){
        return handleSequelizeErrors(async () => {
            this.logger.log("Getting Orders belongs to a User by UserId");
        const userOrders =  await this.bookingModel.findAll({where:{userId:id},
            include:[{
                model:Event
            }]
        });

        if(!userOrders){
            this.logger.error("Orders Not found");
            throw new HttpException("Orders not Found", HttpStatus.NOT_FOUND);
        }
        return userOrders
    })
    }

    async deleteBookingById(id:string){
        return await this.bookingModel.destroy({where:{
            bookingId:id
        }});
    }

}