import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Review } from "../models/reviews.model";

@Injectable()
export class ReviewsDao{
    constructor(@InjectModel(Review) private readonly reviewModel: typeof Review){}

    async createReview(reviewData:Partial<Review>){
        return await this.reviewModel.create(reviewData);
    }

    async getAllReviews(){
        return await this.reviewModel.findAll();
    }

    async insertMultipleReviews(reviewsData:Partial<Review>[]){
        return await this.reviewModel.bulkCreate(reviewsData,{
            validate:true,
            individualHooks:true
        });
    }

}