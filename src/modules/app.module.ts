import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CustomClassSerializerInterceptor } from "@utils/interceptors";
import { AuthModule } from "./auth/auth.module";
import { FilesModule } from "./files/files.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    FilesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
