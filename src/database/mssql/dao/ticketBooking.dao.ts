import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TicketBooking } from "../models/ticketBookings.model";
import { Event } from "../models/events.model";
import { handleSequelizeErrors } from "src/modules/utilis/tryCatchHandler";


@Injectable()
export class BookingDao{
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
            const result =  await this.bookingModel.findAll({where:{userId:id},
                include:[{
                    model:Event
                }]
            });
            // console.log(result)
            if(!result){
                throw new HttpException("Data Not Found", HttpStatus.NOT_FOUND )
            }
            return result;
        })
    }

    async deleteBookingById(id:string){
        return await this.bookingModel.destroy({where:{
            bookingId:id
        }});
    }

}