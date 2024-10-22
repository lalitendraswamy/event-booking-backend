import { Module } from '@nestjs/common';
import { TicketBookingService } from './ticket-booking.service';
import { TicketBookingController } from './ticket-booking.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AppService } from '../app/app.service';
import { MyLogger } from 'src/core/logger/logger.service';

@Module({
  imports:[
    DatabaseModule,
    MyLogger
  ],
  providers: [TicketBookingService,MyLogger,AppService],
  controllers: [TicketBookingController],
  exports:[TicketBookingService]
})
export class TicketBookingModule {}
