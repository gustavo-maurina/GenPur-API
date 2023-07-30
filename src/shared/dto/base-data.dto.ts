import { Expose } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class BaseDataDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
