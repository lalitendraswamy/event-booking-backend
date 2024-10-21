import { Module } from '@nestjs/common';
import { TicketBookingService } from './ticket-booking.service';
import { TicketBookingController } from './ticket-booking.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AppService } from '../app/app.service';

@Module({
  imports:[
    DatabaseModule
  ],
  providers: [TicketBookingService,AppService],
  controllers: [TicketBookingController],
  exports:[TicketBookingService]
})
export class TicketBookingModule {}
