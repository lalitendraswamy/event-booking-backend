import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppService } from 'src/modules/app/app.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtAuthService } from './jwtAuth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'A', 
      signOptions: { expiresIn: '72h' },  
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AppService,AuthService,JwtAuthService,JwtStrategy],
})
export class AuthModule {}
