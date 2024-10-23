import { Injectable } from '@nestjs/common';
import { WishListDao } from 'src/database/mssql/dao/wishlist.dao';

@Injectable()
export class WishlistService {
    constructor(private readonly wishlistDao:WishListDao){}

    async getAllWishList(userId:string){
        return await this.wishlistDao.getAllWishListData(userId);
    }

    async insertWishList(wishlist){
        return await this.wishlistDao.createWishList(wishlist);
    }

    async deleteWishList(id:string){
        return await this.wishlistDao.deleteWishListItem(id);
    }

}
