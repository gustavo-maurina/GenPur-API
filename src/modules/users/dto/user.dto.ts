import { IntersectionType } from "@nestjs/mapped-types";
import { User } from "@prisma/client";
import { BaseDataDto } from "@shared-dto";
import { Exclude, Expose } from "class-transformer";
import { UserCreateDto } from "./user-create.dto";

export class UserDto
  extends IntersectionType(UserCreateDto, BaseDataDto)
  implements User
{
  @Expose()
  lastName: string | null;

  @Exclude()
  password: string;
}
