import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitchModule } from './modules/twitch/twitch.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TwitchModule,
        RedisModule,
    ],
})
export class AppModule {}
