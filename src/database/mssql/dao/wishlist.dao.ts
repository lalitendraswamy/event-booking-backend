import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Wishlist } from "../models/wishlist.model";
import { Review } from "../models/reviews.model";
import { User } from "../models/user.model";
import {Event} from "../models/events.model"

@Injectable()
export class WishListDao{
    constructor(@InjectModel(Wishlist) private readonly wishlistModel: typeof Wishlist){}

    async getAllWishListData(){
        return await this. wishlistModel.findAll({
            include:[
                {
                    model:Event,
                    attributes:{
                        exclude:["createdAt","updatedAt"]
                    }
                }
            ]
        })
    }

    async createWishList(wishlist:Partial<Wishlist>){
        return await this.wishlistModel.create({
            userId: wishlist.userId,
            eventId:wishlist.eventId
        });
    }

    // async insertWishListData(wishListData:Partial<Wishlist>[]){
    //     return await this.wishlistModel.bulkCreate(wishListData,{
    //         validate:true,
    //         individualHooks:true
    //     }

    // )}

    async deleteWishListItem(id:string){
        return await this.wishlistModel.destroy({where:{eventId:id}})
    }

}