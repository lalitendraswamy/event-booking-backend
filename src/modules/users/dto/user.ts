import { IsString, IsEmail,IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The URL of the user image' })
  @IsOptional()
  @IsString()
  userImageUrl: string;

  @ApiProperty({ description: 'The role of the user' })
  @IsOptional()
  @IsString()
  role: string;
}
