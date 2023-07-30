import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const configService = app.get(ConfigService);

  // Swagger bootstrap
  const config = new DocumentBuilder()
    .setTitle("Unknown app")
    .setDescription("This app does not have a name yet")
    .setVersion("0")
    .addBearerAuth({ type: "http" })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(Number(configService.get("API_PORT")));
}
bootstrap(); // eslint-disable-line @typescript-eslint/no-floating-promises
