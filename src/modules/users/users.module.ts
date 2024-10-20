import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserDao } from 'src/database/mssql/dao/user.dao';
import { EmailModule } from '../emailService/email.module';
import { MyLogger } from 'src/core/logger/logger.service';
// import { MyLogger } from "src/core/logger/logger.service";

@Module({
  imports:[
    DatabaseModule,
    MyLogger
  ],
  providers: [UsersService,EmailModule,MyLogger],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
