import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitchModule } from './modules/twitch/twitch.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TwitchModule,
    ],
})
export class AppModule {}
