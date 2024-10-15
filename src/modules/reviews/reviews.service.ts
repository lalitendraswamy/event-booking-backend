import { Injectable } from '@nestjs/common';
import { ReviewsDao } from 'src/database/mssql/dao/reviews.dao';
import { Review } from 'src/database/mssql/models/reviews.model';

@Injectable()
export class ReviewsService {
    constructor(private readonly reviewsDao: ReviewsDao){}

    async createReview(reviewData:Partial<Review>){
        return await this.reviewsDao.createReview(reviewData);
    }

    async getAllReviews(){
        return await this.reviewsDao.getAllReviews();
    }

    async insertMultipleReviews(reviewsData:Partial<Review>[]){
        return await this.reviewsDao.insertMultipleReviews(reviewsData);
    }


}
