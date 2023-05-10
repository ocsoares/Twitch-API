import { Module } from '@nestjs/common';
import { RedisModule as RedisModuleNestJS } from '@nestjs-modules/ioredis';

@Module({
    imports: [
        RedisModuleNestJS.forRoot({
            config: {
                url: process.env.REDIS_URL,
            },
        }),
    ],
})
export class RedisModule {}
