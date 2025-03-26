import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExcetionsFilter } from './common/filters/all-exception-filter';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
        .addTag('API')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter(), new AllExcetionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
