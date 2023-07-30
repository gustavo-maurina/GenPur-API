import { FilesModule } from "@modules/files/files.module";
import { FilesService } from "@modules/files/files.service";
import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [AuthModule, FilesModule],
  controllers: [UsersController],
  providers: [UsersService, FilesService],
})
export class UserModule {}
