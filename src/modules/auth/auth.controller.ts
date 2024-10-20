import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiTags,ApiOperation,ApiResponse, ApiBody} from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @Get()
  async getAuthUrl(){
    return await this.authService.getAuthUrl()
  }

  
  @Post('callback')
  async handleCallback(@Body('code') code: string) {
    return await this.authService.exchangeCodeForTokens(code)
  }
}
