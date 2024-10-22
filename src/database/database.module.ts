
import { Module } from '@nestjs/common';
import { DatabaseConnection } from './mssql/connection/mssql.connection';

import { UserDao } from './mssql/dao/user.dao';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseService } from './database.service';
import { Event } from './mssql/models/events.model';
import { User } from './mssql/models/user.model';
import { TicketBooking } from './mssql/models/ticketBookings.model';
import { Wishlist } from './mssql/models/wishlist.model';
import { EventsDao } from './mssql/dao/event.dao';
import { EmailService } from 'src/modules/emailService/email.service';
import { AppService } from 'src/modules/app/app.service';
import { WishListDao } from './mssql/dao/wishlist.dao';
import { BookingDao } from './mssql/dao/ticketBooking.dao';

@Module({
  
  imports:[
    DatabaseConnection,
    SequelizeModule.forFeature([User,Event, TicketBooking,Wishlist])
  ],
  providers: [DatabaseService,UserDao,EventsDao,WishListDao,BookingDao,EmailService,AppService],
  exports:[DatabaseService,UserDao,EventsDao,WishListDao,BookingDao]
})
export class DatabaseModule {}

