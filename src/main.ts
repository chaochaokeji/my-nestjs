import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // 静态服务器
  app.useStaticAssets('assets', { prefix: '/assets' });

  const config = app.get(ConfigService);

  // 配置 swagger
  const doc = new DocumentBuilder()
    .setTitle('API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('默认')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('doc', app, document);

  // 全局管道
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.get('port'));
}
bootstrap();
