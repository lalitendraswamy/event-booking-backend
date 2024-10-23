import { IsString, IsEmail,IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/core/enums/roles.enum';

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
  @IsEnum(Role,{message:"The Role is not Valid"})
  role: Role;
}
