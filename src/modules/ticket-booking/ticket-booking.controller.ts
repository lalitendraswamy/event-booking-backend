import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TicketBookingService } from './ticket-booking.service';
import { TicketBooking } from 'src/database/mssql/models/ticketBookings.model';
import Stripe from 'stripe';
import { bookingStatus } from 'src/core/enums/bookingStatus.enum';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.guard';
import { AppService } from '../app/app.service';

@Controller('ticket-booking')
export class TicketBookingController {
    private stripe: Stripe;

    constructor(private readonly bookingService: TicketBookingService,private readonly appService:AppService,) {
        const stripeKey=this.appService.getStripeSecret();
        this.stripe = new Stripe(stripeKey);
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    async createBooking(@Body() body: Partial<TicketBooking>) {
        console.log(body);
        return await this.bookingService.createBooking(body);
    }

    @Put(":id")
    async updateBookingById(@Param('id') id:string, @Body() body:Partial<TicketBooking>){
        return await this.bookingService.updateBookingById(id,body); 
    }

    // @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getOrdersByUserId(@Param("id") id:string){
        
        return await this.bookingService.getOrdersByUserId(id);
    }
    

    @Get()
    async getAllBookings() {
        return await this.bookingService.getAllBookings();
    }

    @Delete('remove/:id')
    async deleteBookingById(@Param('id') id: string) {
        console.log("Booking Id in Controller", id);
        return await this.bookingService.deleteBookingById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('checkout') 
async createPaymentIntent(@Body() body: any) {
    
    const { ticketPrice, numberOfTickets , eventId, imageUrl, eventName, location, category, userId,} = body;

    const lineItems = [{
        price_data: {
            currency: "inr",
            product_data: {
                name: "BLP Evennts Ticket Booking", 
                description: `Join us for an unforgettable experience at ${eventName} in ${location}.`,
                images: [imageUrl], // Using imageUrl from body
                
                
                metadata: {
                    event_id: eventId, // Using eventId from body
                    category: category, // Using category from body
                    user_id: userId, // Using userId from body for tracking
                },
            },
            unit_amount: ticketPrice * 100, // Stripe requires amount in cents
        },
        quantity: numberOfTickets,
    }];
    


    try {
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });
        console.log('session',session)
        await this.bookingService.createBooking({
            numberOfTickets,
            sessionId: session.id,
            eventId,
            userId
        })
        return { id: session.id };
    } catch (error) {
        await this.bookingService.createBooking({
            numberOfTickets,
            status:bookingStatus.failed,
            eventId,
            userId
        })
        console.error("Error creating checkout session:", error);
        throw new BadRequestException("Invalid request parameters"); // You can customize this message
    }
}

}
