import { AxiosResponse } from 'axios';

export interface IService {
    execute(data?: string | object): Promise<AxiosResponse>;
}
