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
  @Length(6, 12)
  readonly username: string;

  @ApiProperty()
  @IsBoolean()
  readonly is_active: boolean;
}
