import { Injectable, NotFoundException } from "@nestjs/common";
import { UserCreateDto, UserDto } from "./dto";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { FilesService } from "@modules/files/files.service";

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private filesService: FilesService
  ) {}

  async create(data: UserCreateDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: await argon.hash(data.password),
      },
    });
    return plainToInstance(UserDto, user);
  }

  async getAll() {
    const users = await this.prismaService.user.findMany();
    return plainToInstance(UserDto, users);
  }

  async getAllCsv() {
    const users = await this.prismaService.user.findMany();
    const headers = [
      "email",
      "firstName",
      "lastName",
      "email",
      "firstName",
      "lastName",
    ];
    const rows = new Array(1e6).fill([
      "email",
      "firstName",
      "lastName",
      "email",
      "firstName",
      "lastName",
    ]);

    this.filesService.buildCsv({ headers, rows });
    return;
  }

  async getById(id: number) {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("Could not find given user");
    }

    return plainToInstance(UserDto, user);
  }
}
