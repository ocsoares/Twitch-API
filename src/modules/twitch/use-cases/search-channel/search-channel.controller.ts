import { Controller, Get, Param } from '@nestjs/common';
import { IController, returnHandle } from 'src/interfaces/IController';
import { SearchChannelService } from './search-channel.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class SearchChannelController implements IController {
    constructor(private readonly _searchChannelService: SearchChannelService) {}

    @ApiTags('search-channel')
    @ApiOkResponse()
    @Get('search-channel/:id')
    async handle(@Param('id') channel: string): Promise<returnHandle> {
        const searchChannel = await this._searchChannelService.execute(channel);

        return {
            data: searchChannel.data,
        };
    }
}
