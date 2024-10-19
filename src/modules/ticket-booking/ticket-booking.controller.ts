import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TicketBookingService } from './ticket-booking.service';
import { TicketBooking } from 'src/database/mssql/models/ticketBookings.model';
import Stripe from 'stripe';

@Controller('ticket-booking')
export class TicketBookingController {
    private stripe: Stripe;

    constructor(private readonly bookingService: TicketBookingService) {
        // Initialize Stripe with your secret key
        this.stripe = new Stripe('sk_test_51Q8hB3Rq55caQ1GVjwUiAwOdyX4l7CcpooFoP9eQ5TAdrhqxRIEZKcT9YPHxX20w5FZnNOnJDYJdJv0rfsGWC6hG000ebC3AYr');
    }

    @Post()
    async createBooking(@Body() body: Partial<TicketBooking>) {
        console.log(body);
        return await this.bookingService.createBooking(body);
    }

    @Get()
    async getAllBookings() {
        return await this.bookingService.getAllBookings();
    }

    @Delete(':id')
    async deleteBookingById(@Param('id') id: string) {
        return await this.bookingService.deleteBookingById(id);
    }

    // Stripe Payment Intent API
    @Post('create-checkout') 
async createPaymentIntent(@Body() body: { ticketPrice: number; numberOfTickets: number }) {
    const { ticketPrice, numberOfTickets } = body;

    const lineItems = [{
        price_data: {
            currency: "usd",
            product_data: {
                name: "Event Ticket", // Customize this as needed
                // You can add additional properties like description or images if necessary
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

        return { id: session.id };
    } catch (error) {
        console.error("Error creating checkout session:", error);
        throw new BadRequestException("Invalid request parameters"); // You can customize this message
    }
}

}
