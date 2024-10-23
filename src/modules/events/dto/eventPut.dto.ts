import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateEventDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    eventName:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    category:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    eventDateTime:Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    duration:number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    totalTickets: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    location:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    organizerName:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    organizerImage:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    imageUrl:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    ticketPrice:number


}