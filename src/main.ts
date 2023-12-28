import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api');

  const port = configService.get('SERVER_PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
