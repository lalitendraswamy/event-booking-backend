import { IsString, IsEmail,IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The URL of the user image' })
  @IsOptional()
  @IsString()
  userImageUrl: string;

  @ApiProperty({ description: 'The role of the user' })
  @IsNotEmpty()
  @IsString()
  role: string;
}
