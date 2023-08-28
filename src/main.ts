import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/app';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { SwaggerCustomizationUtil } from './utils/swagger-customization.util';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('twitch/api');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Twitch API')
        .setDescription('A Twitch API with OAuth for applications')
        .setVersion('1.0')
        .addTag('search-channel')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    const swaggerCssUrl = SwaggerCustomizationUtil.cssUrl();

    const swaggerBundleJs = SwaggerCustomizationUtil.bundleJs();

    const swaggerStandalonePresetJs =
        SwaggerCustomizationUtil.standalonePresetJs();

    const swaggerFavIcon = SwaggerCustomizationUtil.favIcon();

    SwaggerModule.setup('docs', app, document, {
        customCssUrl: swaggerCssUrl,
        customJs: [swaggerBundleJs, swaggerStandalonePresetJs],
        customfavIcon: swaggerFavIcon,
    });

    const server = app.getHttpAdapter();

    server.get('/', (req: Request, res: Response) => {
        res.redirect('/docs');
    });

    app.enableCors();

    await app.listen(PORT);
}

bootstrap();
