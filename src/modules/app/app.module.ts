import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../../database/database.module';
import { EventsModule } from '../events/events.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { EmailModule } from '../emailService/email.module';
import { WishlistModule } from '../wishlist/wishlist.module';
import { TicketBookingModule } from '../ticket-booking/ticket-booking.module';
import { AppLogger } from 'src/core/logger/app-logger';
// import { MyLogger } from 'src/core/logger/logger.service';
import { MyLogger } from 'src/core/logger/logger.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.env'
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    WishlistModule,
    EventsModule,
    ReviewsModule,
    TicketBookingModule
  ],
  controllers: [AppController],
  providers: [AppService,AppLogger],
  exports:[AppService,AppLogger]
})
export class AppModule {}
