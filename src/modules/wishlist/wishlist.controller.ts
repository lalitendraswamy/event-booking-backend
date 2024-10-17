import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Wishlist } from 'src/database/mssql/models/wishlist.model';

@Controller('wishlist')
export class WishlistController {
    constructor (private readonly wishlistService: WishlistService){}

    @Get()
    async getAllWishListdata(){
      return await this.wishlistService.getAllWishList();
    }

    @Post()
    async insertNewWishList(@Body() body:Partial<Wishlist>){
      console.log(body)
      return await this.wishlistService.insertWishList(body);
    }

    @Delete("/:id")
    async deleteWishListdata(@Param('id') id:string){
      return await this.wishlistService.deleteWishList(id);
    }
}
