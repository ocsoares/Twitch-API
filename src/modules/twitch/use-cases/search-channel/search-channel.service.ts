/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@nestjs/common';
import { IService } from 'src/interfaces/IService';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class SearchChannelService implements IService {
    async execute(channel: string): Promise<AxiosResponse> {
        const url = `https://api.twitch.tv/helix/users?login=${channel}`;

        const headers = {
            Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            'Client-ID': process.env.TWITCH_CLIENT_ID,
        };

        try {
            const returnAxios = await axios.get(url, { headers });

            return returnAxios.data;
        } catch (error) {
            return error.response;
        }
    }
}
