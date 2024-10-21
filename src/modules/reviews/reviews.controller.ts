import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from 'src/database/mssql/models/reviews.model';
import { ApiTags,ApiOperation,ApiResponse, ApiBody, ApiExcludeEndpoint} from '@nestjs/swagger';
import { CreateReviewDto } from './dto/review';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService){}
    
    @ApiOperation({ summary: 'Get all Reviews' })
    @ApiResponse({ status: 200, description: 'Return all Reviews' })
    @Get()
    async getAllReviews(){
        return await this.reviewsService.getAllReviews();
    }

    @ApiBody({description:"the event Review",type:CreateReviewDto})
    @Post()
    async createReview(@Body() body: Partial<Review>){
        return await this.reviewsService.createReview(body);
    }

    @ApiExcludeEndpoint()
    @Post("multiple")
    async insertMultipleReviews(@Body() body:Partial<Review>[]){
        return await this.reviewsService.insertMultipleReviews(body);
    }
}
