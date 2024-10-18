import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TicketBooking } from "../models/ticketBookings.model";
import { Event } from "../models/events.model";


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
            }],
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        });
    }

    async deleteBookingById(id:string){
        return await this.bookingModel.destroy({where:{
            bookingId:id
        }});
    }

}