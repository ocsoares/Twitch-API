import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/app';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';

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

    const customCSSURLToVercelDeploy =
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui.min.css';

    const customBundleJS =
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui-bundle.js';

    const customStandalonePresetJS =
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui-standalone-preset.js';

    SwaggerModule.setup('docs', app, document, {
        customCssUrl: customCSSURLToVercelDeploy,
        customJs: [customBundleJS, customStandalonePresetJS],
        customfavIcon:
            'https://static-00.iconduck.com/assets.00/swagger-icon-128x128-3vy046ip.png',
    });

    const server = app.getHttpAdapter();

    server.get('/', (req: Request, res: Response) => {
        res.redirect('/docs');
    });

    app.enableCors();

    await app.listen(PORT);
}

bootstrap();
