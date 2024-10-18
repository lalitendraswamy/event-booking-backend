import { SequelizeModule } from '@nestjs/sequelize';


import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseConnection = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    dialect: 'mssql',
    host: "localhost",
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_NAME'),
    username:"dbadmin",
    password:"root",
    dialectOptions: {
      // authentication: {
      //   type: 'ntlm',
      //   options: {
      //     domain: "desktop-631q63p",     
      //     userName: "s v l b prasanna", 
      //     password: "prasanna",
      //   },
      // },
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

