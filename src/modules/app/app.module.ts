import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../../database/database.module';
import { EventsModule } from '../events/events.module';
import { ReviewsModule } from '../reviews/reviews.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.env'
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    EventsModule,
    ReviewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[AppService]
})
export class AppModule {}
