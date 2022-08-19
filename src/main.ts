import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';
import { CodedValidatorPipe } from './shared/coded-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new CodedValidatorPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);
  if (!configService.envConfig.isProduction) {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setDescription(process.env.npm_package_description)
      .setVersion(process.env.npm_package_version)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(configService.envConfig.httpPort || 3000);
}

bootstrap();
