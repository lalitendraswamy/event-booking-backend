import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TicketBookingService } from './ticket-booking.service';
import { TicketBooking } from 'src/database/mssql/models/ticketBookings.model';

@Controller('ticket-booking')
export class TicketBookingController {

    constructor(private readonly bookingService: TicketBookingService){}

    @Post()
    async createBooking(@Body() body: Partial<TicketBooking>){
        console.log(body)
        return await this.bookingService.createBooking(body);
    }
    

    @Get()
    async getAllBookings(){
        return await this.bookingService.getAllBookings();
    }

    @Delete(":id")
    async deleteBookingById(@Param("id") id:string){
        return await this.bookingService.deleteBookingById(id);
    }
}
