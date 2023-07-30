import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "@modules/app.module";
import { PrismaService } from "@modules/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

export async function setupTests(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.init();

  const config = app.get(ConfigService);
  await app.listen(Number(config.get("API_PORT")));

  const prisma = app.get(PrismaService);
  await wipeDatabase(prisma);

  return app;
}

async function wipeDatabase(prismaService: PrismaService) {
  await prismaService.$transaction([prismaService.user.deleteMany()]);
}
