import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { bookingStatus } from "src/core/enums/bookingStatus.enum";


export class UpdateBookingDto{
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    numberOfTickets:number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsEnum(bookingStatus,{message:"The Status is not Valid"})
    status: bookingStatus;

    // @ApiProperty()
    // @IsOptional()
    // @IsString()
    // sessionId:string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    eventId:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    userId:string;

}