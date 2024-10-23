import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TicketBooking } from "../models/ticketBookings.model";
import { Event } from "../models/events.model";
import { handleSequelizeErrors } from "src/modules/utilis/tryCatchHandler";
import { Sequelize } from "sequelize-typescript";
import { messages } from "src/core/shared/responseMessages";
import { User } from "../models/user.model";




@Injectable()
export class BookingDao{
    private readonly logger = new Logger(BookingDao.name);

    constructor(
        @InjectModel(TicketBooking) private readonly bookingModel: typeof TicketBooking,
        @InjectModel(Event) private readonly eventsModel: typeof Event,
        @InjectModel(User) private readonly usersModel: typeof User,
        private readonly sequelize: Sequelize
){}

    // async createBooking(bookingData: Partial<TicketBooking>){
    //     return await this.bookingModel.create(bookingData);
    // }


  async createBooking(bookingData: Partial<TicketBooking>) {
      const transaction = await this.sequelize.transaction();
      try {
      const event = await this.eventsModel.findByPk(bookingData.eventId, { transaction });
    //   console.log("event in booking", event)
      if (!event) {
        // throw new Error('Event not found');
        return {statusCode:HttpStatus.NOT_FOUND, message: messages.notFoundEvent+ " while Booking"};
      }

      const user = await this.usersModel.findByPk(bookingData.userId);
      if(!user){
        return {statusCode:HttpStatus.NOT_FOUND, message:messages.notFoundUser+ " while Booking"};
      }

      if (event.totalTickets < bookingData.numberOfTickets) {
        // throw new Error('Not enough tickets available');
        return {statusCode:HttpStatus.BAD_REQUEST,message:"Number of Tickets must be less than Total Tickets"}
      }      
      event.totalTickets -= bookingData.numberOfTickets;
      await event.save({ transaction });

      
      const newBooking = await this.bookingModel.create(bookingData, { transaction });

      
      await transaction.commit();

      return {statusCode:HttpStatus.CREATED,message:"Ticket Booked", data:newBooking};
    } catch (error) {
      
      await transaction.rollback();
      throw error;
    }
  }


    async getAllBookings(){
        // return await this.bookingModel.findAll({
        //     include:[{
        //         model:Event
        //     }]
        // });
        return handleSequelizeErrors(async () => {
            const bookings = await this.bookingModel.findAll({
                    include:[{
                        model:Event
                    }]
                });
            if(bookings.length===0){
                return {statusCode:HttpStatus.NOT_FOUND, message:"Booking List Not Found"}
            }
            return {statusCode:HttpStatus.OK, message:"Booking List Found Successfully", data: bookings};
        })
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

        if(userOrders.length===0){
            this.logger.error("Orders Not found");
            // throw new HttpException("Orders not Found", HttpStatus.NOT_FOUND);
            return {statusCode:HttpStatus.NOT_FOUND, message:"Orders Not Found"}
        }
        return {statusCode:HttpStatus.OK, message:"Orders Found Successfully", data:userOrders}
    })
    }

    async deleteBookingById(bookingId:string){
        // return await this.bookingModel.destroy({where:{
        //     bookingId:id
        // }});
        const transaction = await this.sequelize.transaction();
        try{
            // console.log("Booking Id in Dao",bookingId);
            // await this.bookingModel.sync({ alter: true });
            const booking = await this.bookingModel.findOne({where:{bookingId}, transaction});
            // console.log("Bookingggg", booking)
            if(!booking){
                return {statusCode:HttpStatus.NOT_FOUND, message:"Booking is not Avaliable"};
            }

            const event  = await this.eventsModel.findByPk(booking.eventId, {transaction});
            event.totalTickets += booking.numberOfTickets;
            await event.save({transaction});

            const deleteBooking = await this.bookingModel.destroy({where:{bookingId},transaction})
            await transaction.commit();
            return {statusCode: HttpStatus.OK,message:"Booking Deleted Successfully" }
        }catch(err){
            await transaction.rollback();
            throw err;
        }
    
    }

}