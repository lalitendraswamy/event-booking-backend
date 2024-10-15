
import { Module } from '@nestjs/common';
import { DatabaseConnection } from './mssql/connection/mssql.connection';

import { UserDao } from './mssql/dao/user.dao';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseService } from './database.service';
import { Event } from './mssql/models/events.model';
import { Review } from './mssql/models/reviews.model';
import { User } from './mssql/models/user.model';
import { TicketBooking } from './mssql/models/ticketBookings.model';
import { Wishlist } from './mssql/models/wishlist.model';
import { EventsDao } from './mssql/dao/event.dao';
import { ReviewsDao } from './mssql/dao/reviews.dao';

@Module({
  
  imports:[
    DatabaseConnection,
    SequelizeModule.forFeature([User,  Review,Event, TicketBooking,Wishlist])
  ],
  providers: [DatabaseService,UserDao,EventsDao,ReviewsDao],
  exports:[DatabaseService,UserDao,EventsDao,ReviewsDao]
})
export class DatabaseModule {}

