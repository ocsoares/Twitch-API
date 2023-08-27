import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        CacheModule.registerAsync<RedisClientOptions>({
            useFactory: () => ({
                store: redisStore,
                url: process.env.REDIS_URL,
                ttl: Number(process.env.REDIS_EXPIRATION),
            }),
        }),
    ],
    exports: [CacheModule],
})
export class RedisModule {}
