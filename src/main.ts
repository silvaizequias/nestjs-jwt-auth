import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('API Sistema Dedicado')
    .setDescription('API principal do Sistema Dedicado')
    .setVersion('1.0')
    .addTag('sd')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    options,
  );
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
  console.log(
    `Application is running on: ${await app.getUrl()}`,
  );
}
bootstrap();
