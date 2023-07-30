import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class UserSignInDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: "test@gmail.com" })
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: "Test123!" })
  password: string;
}
