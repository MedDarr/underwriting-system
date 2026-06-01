import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Underwriting System API')
    .setDescription('API программной системы поддержки андеррайтинга страхования частных домов физических лиц')
    .setVersion('1.0')
    .addTag('applications')
    .addTag('security-checks')
    .addTag('scoring')
    .addTag('recommendations')
    .addTag('audit')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
