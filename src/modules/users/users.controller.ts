import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ReqUser } from "@decorators";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { UserCreateDto, UserDto } from "./dto";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body: UserCreateDto) {
    return this.usersService.create(body);
  }

  @Get()
  @UseGuards(JwtGuard)
  getAll() {
    return this.usersService.getAll();
  }

  @Get("/me")
  @UseGuards(JwtGuard)
  getMe(@ReqUser() user: UserDto) {
    return user;
  }

  @Get("/:id")
  @UseGuards(JwtGuard)
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @Get("report/csv")
  @UseGuards(JwtGuard)
  getAllCsv() {
    return this.usersService.getAllCsv();
  }
}
