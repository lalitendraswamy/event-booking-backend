
import { Module } from '@nestjs/common';
import { DatabaseConnection } from './mssql/connection/mssql.connection';

import { UserDao } from './mssql/dao/user.dao';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './mssql/models/user.model';
import { DatabaseService } from './database.service';


@Module({
  
  imports:[
    DatabaseConnection,
    SequelizeModule.forFeature([User])
  ],
  providers: [DatabaseService,UserDao],
  exports:[DatabaseService,UserDao]
})
export class DatabaseModule {}
