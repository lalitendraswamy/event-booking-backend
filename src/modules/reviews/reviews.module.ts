import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports:[ReviewsService]
})
export class ReviewsModule {}
