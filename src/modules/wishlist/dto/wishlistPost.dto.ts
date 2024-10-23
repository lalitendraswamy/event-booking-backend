import { IsOptional,IsString,IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWishListDto{
    @ApiProperty({description:"create the userId"})
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({description:"create the eventId"})
    @IsString()
    @IsNotEmpty()
    eventId: string;
}