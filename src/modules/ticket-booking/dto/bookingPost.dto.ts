import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { bookingStatus } from "src/core/enums/bookingStatus.enum";

export class CreateBookingDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    numberOfTickets: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEnum(bookingStatus,{message:"The Status is not Valid"})
    status: bookingStatus;

    @ApiProperty()
    @IsOptional()
    @IsString()
    sessionId:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    eventId:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId:string;

}