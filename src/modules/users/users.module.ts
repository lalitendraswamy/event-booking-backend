import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserDao } from 'src/database/mssql/dao/user.dao';
import { EmailModule } from '../emailService/email.module';

@Module({
  imports:[
    DatabaseModule,
  ],
  providers: [UsersService,EmailModule],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
