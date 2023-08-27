import { Module } from '@nestjs/common';
import { SearchChannelController } from './use-cases/search-channel/search-channel.controller';
import { SearchChannelService } from './use-cases/search-channel/search-channel.service';
import { RedisModule } from '../redis/redis.module';

@Module({
    imports: [RedisModule],
    controllers: [SearchChannelController],
    providers: [SearchChannelService],
})
export class TwitchModule {}
