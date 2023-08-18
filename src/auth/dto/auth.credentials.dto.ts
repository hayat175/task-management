import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(24)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(24)
  password: string;
}
