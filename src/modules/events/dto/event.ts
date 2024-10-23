import { IsString, IsEmail,IsOptional,IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'The eventName of the Event' })
  @IsOptional()
  @IsString()
  eventName: string;

  @ApiProperty({description:"The Event category"})
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({description:"The Event Description"})
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({description:"The Event eventDateTime"})
  @IsOptional()
  @IsDate()
  eventDateTime: Date;

  @ApiProperty({ description: 'The Duration' })
  @IsOptional()
  @IsNumber()
  duration: number;

  @ApiProperty({ description: 'The TotalTickets' })
  @IsOptional()
  @IsNumber()
  totalTickets: number;

  @ApiProperty({ description: 'The Location' })
  @IsOptional()
  @IsString()
  location: string;


  @ApiProperty({ description: 'The AverageRating' })
  @IsOptional()
  @IsString()
  organizerName: string;

  @ApiProperty({ description: 'The AverageRating' })
  @IsOptional()
  @IsString()
  organizerImage: string

  @ApiProperty({ description: 'The AverageRating' })
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: 'The AverageRating' })
  @IsOptional()
  @IsNumber()
  ticketPrice: number;

}
