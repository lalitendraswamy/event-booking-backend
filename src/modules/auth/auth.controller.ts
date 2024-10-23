import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @ApiExcludeEndpoint()
  @Get()
  async getAuthUrl(){
    return await this.authService.getAuthUrl()
  }
 
  
  @ApiExcludeEndpoint()
  @Post('callback')
  async handleCallback(@Body('code') code: string) {
    return await this.authService.exchangeCodeForTokens(code)
  }
}
