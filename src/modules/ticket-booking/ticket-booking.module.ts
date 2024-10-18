import { Module } from '@nestjs/common';
import { TicketBookingService } from './ticket-booking.service';
import { TicketBookingController } from './ticket-booking.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[
    DatabaseModule
  ],
  providers: [TicketBookingService],
  controllers: [TicketBookingController],
  exports:[TicketBookingService]
})
export class TicketBookingModule {}
