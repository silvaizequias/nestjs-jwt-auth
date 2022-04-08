import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(RegExHelper.username)
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(RegExHelper.password)
  readonly password: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
