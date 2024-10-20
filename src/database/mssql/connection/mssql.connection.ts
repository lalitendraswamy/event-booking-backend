import { SequelizeModule } from '@nestjs/sequelize';


import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseConnection = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    dialect: 'mssql',
    host:  configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_NAME'),
    // username:"dbadmin",
    // password:"root",
    dialectOptions: {
      authentication: {
        type: 'ntlm',
        options: {
          domain: configService.get<string>('DB_DOMAIN') ,     
          userName:  configService.get<string>('DB_USERNAME'), 
          password:  configService.get<string>('DB_PASSWORD'),
        },
      },
      options: {
        trustServerCertificate: true, 
        trustedConnection: true,
        encrypt: false,  
        enableArithAbort: true,  
      },
    },
    models:[],
    autoLoadModels: true,
    synchronize: true, // Turn off in production, use migrations instead
  }),
});

