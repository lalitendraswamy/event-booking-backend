import { IsOptional,IsString,IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateReviewDto{
     @ApiProperty({description:"the userId forginkey"})
     @IsOptional()
     @IsString()
     userId: string;
    
     @ApiProperty({description:"the eventId forginkey"})
     @IsOptional()
     @IsString()
     eventId: string;
     
     @ApiProperty({description:"the review description"})
     @IsOptional()
     @IsString()
     review: string;

     @ApiProperty({description:"the user Review"})
     @IsOptional()
     @IsNumber()
     userRating: number;
}