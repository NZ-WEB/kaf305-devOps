if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

const port = process.env.PORT;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
