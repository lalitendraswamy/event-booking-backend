import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Wishlist } from "../models/wishlist.model";
import { User } from "../models/user.model";
import { Event } from "../models/events.model"
import { handleSequelizeErrors } from "src/modules/utilis/tryCatchHandler";
import { privateDecrypt } from "crypto";
import { messages } from "src/core/shared/responseMessages";

@Injectable()
export class WishListDao {
    constructor(
        @InjectModel(Wishlist) private readonly wishlistModel: typeof Wishlist,
        @InjectModel(User) private readonly usersModel: typeof User,
        @InjectModel(Event) private readonly eventsModel: typeof Event
    ) { }

    async getAllWishListData(userId: string) {
        return handleSequelizeErrors(async () => {
            //  await this. wishlistModel.findAll({
            //     where:{
            //         userId
            //     },
            //     include:[
            //         {
            //             model:Event,
            //             attributes:{
            //                 exclude:["createdAt","updatedAt"]
            //             }
            //         }
            //     ]
            // })
            const user = await this.usersModel.findByPk(userId);
            if (!user) {
                return { statusCode: HttpStatus.NOT_FOUND, message: messages.notFoundUser + " while getting Favorite Events" }
            }

            const wishlist = await this.wishlistModel.findAll({
                where: {
                    userId
                },
                include: [
                    {
                        model: Event,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    }
                ]
            })
            if (wishlist.length === 0) {
                return { statusCode: HttpStatus.NOT_FOUND, message: "List of Favorites Not Found" };
            }

            return { statusCode: HttpStatus.OK, message: "List of Favorites FoundSuccessfully", data: wishlist };

        })
    }

    async createWishList(wishlist: Partial<Wishlist>) {
        return handleSequelizeErrors(async () => {
            // return await this.wishlistModel.create({
            //     userId: wishlist.userId,
            //     eventId:wishlist.eventId
            // });
            
            const user = await this.usersModel.findByPk(wishlist.userId);
            if (!user) {
                return { statusCode: HttpStatus.NOT_FOUND, message: messages.notFoundUser + " while Creating Favorite Events" }
            }

            const event = await this.eventsModel.findByPk(wishlist.eventId)
            if (!event) {
                return { statusCode: HttpStatus.NOT_FOUND, message: messages.notFoundEvent + " while Creating Favorite Events" };
            }

            const postFavorite = await this.wishlistModel.create({
                userId: wishlist.userId,
                eventId: wishlist.eventId
            });
            return { statusCode: HttpStatus.CREATED, message: "Favorite Event Created Successfully" };
        })
    }

    // async insertWishListData(wishListData:Partial<Wishlist>[]){
    //     return await this.wishlistModel.bulkCreate(wishListData,{
    //         validate:true,
    //         individualHooks:true
    //     }

    // )}

    async deleteWishListItem(id: string) {
        return handleSequelizeErrors(async () => {
        // return await this.wishlistModel.destroy({ where: { wishListId: id } })
        const favorite = await this.wishlistModel.findByPk(id);
        if(!favorite){
            return {statusCode:HttpStatus.NOT_FOUND, message:"No Favorite Event Found" + " to Delete"};
        }

        const deleteFavorite = await this.wishlistModel.destroy({ where: { wishListId: id } })
        return {statusCode:HttpStatus.NO_CONTENT, message:"Favorite Event Removed Successfully"};

        })
    }

}