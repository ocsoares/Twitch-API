import { Inject, Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/IService';
import axios, { AxiosResponse } from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class SearchChannelService implements IService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async execute(channel: string): Promise<AxiosResponse> {
        const url = `https://api.twitch.tv/helix/users?login=${channel}`;

        const headers = {
            Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            'Client-ID': process.env.TWITCH_CLIENT_ID,
        };

        const cachedChannel = await this.cacheManager.get<string>(
            `channel:${channel}`,
        );

        if (cachedChannel) {
            return JSON.parse(cachedChannel);
        }

        try {
            const returnAxios = await axios.get(url, { headers });

            if (returnAxios.data.data[0]) {
                if (returnAxios.data.data[0].display_name.length) {
                    await this.cacheManager.set(
                        `channel:${channel}`,
                        JSON.stringify(returnAxios.data),
                    );
                }
            }

            return returnAxios.data;
        } catch (error) {
            return error.response;
        }
    }
}
