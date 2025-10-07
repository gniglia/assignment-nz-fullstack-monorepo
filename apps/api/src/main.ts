import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      },
    }),
  );

  // Set global API prefix
  app.setGlobalPrefix("api");

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

  await app.listen(port, host);

  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://${host}:${port}`);
  // eslint-disable-next-line no-console
  console.log(`📊 Dashboard API available at http://${host}:${port}/`);
}

bootstrap();
