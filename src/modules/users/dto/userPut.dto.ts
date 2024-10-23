import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from 'src/core/enums/roles.enum';
 
 
export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userImageUrl: string;
 
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(Role,{message:"The Role is not Valid"})
  role?: Role;
}