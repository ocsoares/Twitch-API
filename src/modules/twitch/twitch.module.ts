import { Module } from '@nestjs/common';
import { SearchUserController } from './use-cases/search-user/search-user.controller';
import { SearchUserService } from './use-cases/search-user/search-user.service';

@Module({
    controllers: [SearchUserController],
    providers: [SearchUserService],
})
export class TwitchModule {}
