import { IsOptional,IsString,IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWishListDto{
    @ApiProperty({description:"create the userId"})
    @IsString()
    @IsOptional()
    userId: string;

    @ApiProperty({description:"create the eventId"})
    @IsOptional()
    @IsString()
    eventId: string;
}