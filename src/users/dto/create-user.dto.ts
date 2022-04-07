import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  readonly username: string;

  //@ApiProperty()
  //@IsString()
  //@IsNotEmpty()
  //@Min(6)
  //readonly password: string;

  @ApiProperty()
  @IsBoolean()
  readonly is_active: boolean;
}
