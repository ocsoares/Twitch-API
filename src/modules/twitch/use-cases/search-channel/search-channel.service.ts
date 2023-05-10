/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/IService';
import axios, { AxiosResponse } from 'axios';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { REDIS_EXPIRATION } from 'src/config/redis';

@Injectable()
export class SearchChannelService implements IService {
    constructor(@InjectRedis() private readonly _redis: Redis) {}

    async execute(channel: string): Promise<AxiosResponse> {
        const url = `https://api.twitch.tv/helix/users?login=${channel}`;

        const headers = {
            Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            'Client-ID': process.env.TWITCH_CLIENT_ID,
        };

        const cachedChannel = await this._redis.get(`channel:${channel}`);

        if (cachedChannel) {
            return JSON.parse(cachedChannel);
        }

        try {
            const returnAxios = await axios.get(url, { headers });

            await this._redis.set(
                `channel:${channel}`,
                JSON.stringify(returnAxios.data),
                'EX',
                REDIS_EXPIRATION,
            );

            return returnAxios.data;
        } catch (error) {
            return error.response;
        }
    }
}
