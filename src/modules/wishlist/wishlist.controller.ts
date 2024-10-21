import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Wishlist } from 'src/database/mssql/models/wishlist.model';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import {CreateWishListDto} from "./dto/wishlist";
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from 'src/core/enums/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.guard';

@ApiTags("whishlist")
@Controller('wishlist')
export class WishlistController {
    constructor (private readonly wishlistService: WishlistService){}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Get all wishlist"})
    @ApiResponse({status:200, description:"Return all apis"})
    @Get()
    async getAllWishListdata(){
      return await this.wishlistService.getAllWishList();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({description:"data added successlu", type:CreateWishListDto})
    @ApiOperation({summary:"Add Wishlist Data"})
    @ApiResponse({status:200, description:"wishlist added"})
    @Post()
    async insertNewWishList(@Body() body:Partial<Wishlist>){
      console.log(body)
      return await this.wishlistService.insertWishList(body);
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Wishlist Deleted"})
    @ApiResponse({status:200, description:"wishlist deleted successly"})
    @Delete(":id")
    async deleteWishListdata(@Param('id') id:string){
      return await this.wishlistService.deleteWishList(id);
    }
}
