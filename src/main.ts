import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

//creating env variables usinG syntax like MY_VARIABLE=value nest start in terminal
async function bootstrap() {
  const logger = new Logger(); //for logging purpose
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3000;
  await app.listen(port);
  logger.log(`Application is listening at PORT ${port}`);
}
bootstrap();
