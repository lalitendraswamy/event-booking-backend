import { Injectable, Logger } from '@nestjs/common';
import { BookingDao } from 'src/database/mssql/dao/ticketBooking.dao';
import { TicketBooking } from 'src/database/mssql/models/ticketBookings.model';
import { handleSequelizeErrors } from '../utilis/tryCatchHandler';

@Injectable()
export class TicketBookingService {
    private readonly logger = new Logger(TicketBookingService.name);
    constructor(private readonly bookingDao: BookingDao){}

    async createBooking(bookingData: Partial<TicketBooking>){
        return await this.bookingDao.createBooking(bookingData);
    }

    async getAllBookings(){
        return await this.bookingDao.getAllBookings();
    }

    async updateBookingById(id:string, bookingData:Partial<TicketBooking>){
        return await this.bookingDao.updateBookingById(id,bookingData);
    }

    async deleteBookingById(id:string){
        return await this.bookingDao.deleteBookingById(id);
    }

    async getOrdersByUserId(id:string){
        return handleSequelizeErrors(async () => {
            this.logger.log("Getting Orders by a user from Service")
        return await this.bookingDao.getOrdersByUserId(id);
    })
}
}

