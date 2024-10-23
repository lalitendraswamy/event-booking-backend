import { IsString, IsEmail,IsOptional,IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'The eventName of the Event' })
  @IsNotEmpty()
  @IsString()
  eventName: string;

  @ApiProperty({description:"The Event category"})
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({description:"The Event Description"})
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({description:"The Event eventDateTime"})
  @IsNotEmpty()
  @IsDate()
  eventDateTime: Date;

  @ApiProperty({ description: 'The Duration' })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({ description: 'The TotalTickets' })
  @IsNotEmpty()
  @IsNumber()
  totalTickets: number;

  @ApiProperty({ description: 'The Location' })
  @IsNotEmpty()
  @IsString()
  location: string;


  @ApiProperty({ description: 'The Organizer Name' })
  @IsNotEmpty()
  @IsString()
  organizerName: string;

  @ApiProperty({ description: 'The Organizer Image' })
  @IsNotEmpty()
  @IsString()
  organizerImage: string

  @ApiProperty({ description: 'The Event Image' })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: 'The Event Ticket Price' })
  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number;

}
