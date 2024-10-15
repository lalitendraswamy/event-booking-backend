import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from 'src/database/mssql/models/reviews.model';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService){}

    @Get()
    async getAllReviews(){
        return await this.reviewsService.getAllReviews();
    }

    @Post()
    async createReview(@Body() body: Partial<Review>){
        return await this.reviewsService.createReview(body);
    }

    @Post("multiple")
    async insertMultipleReviews(@Body() body:Partial<Review>[]){
        return await this.reviewsService.insertMultipleReviews(body);
    }
}
