import { Controller, Get, Param } from '@nestjs/common';
import { IController, returnHandle } from 'src/interfaces/IController';
import { SearchUserService } from './search-user.service';

@Controller()
export class SearchUserController implements IController {
    constructor(private readonly _searchUserService: SearchUserService) {}

    @Get('search-user/:id')
    async handle(@Param('id') username: string): Promise<returnHandle> {
        const searchUser = await this._searchUserService.execute(username);

        return {
            data: searchUser.data,
        };
    }
}
