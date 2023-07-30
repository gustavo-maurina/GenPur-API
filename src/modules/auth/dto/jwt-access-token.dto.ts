import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class JwtAccessTokenDto {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  accessToken: string;
}
