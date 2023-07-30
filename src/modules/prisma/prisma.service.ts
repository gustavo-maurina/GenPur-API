import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get("DATABASE_URL"),
        },
      },
    });
  }

  /** check and implement this in the future in case memory leaks start to happen.
   *  Obs: tests are a good place to try and reproduce it
   */

  // async onModuleInit() {
  //   await this.$connect();
  // }
  // async onModuleDestroy() {
  //   await this.$disconnect();
  // }
}
