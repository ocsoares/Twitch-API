import { Module } from '@nestjs/common';
import { SearchChannelController } from './use-cases/search-channel/search-channel.controller';
import { SearchChannelService } from './use-cases/search-channel/search-channel.service';

@Module({
    controllers: [SearchChannelController],
    providers: [SearchChannelService],
})
export class TwitchModule {}
