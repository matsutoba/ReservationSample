import axios, { AxiosPromise } from 'axios';
import { TimeFrame } from '../types/TimeFrame';
import Storage from '../utils/Storage';
import { StorageType } from './localdata';

export const getTimeFrames = (facilityId: number): Promise<TimeFrame[]> => {
    const url = `https://localhost:44391/api/timeframe/${facilityId}`;

    const timeFrames = Storage.getJSON<TimeFrame[]>(StorageType.TimeFrame) ?? [];
    
    // return axios.get<TimeFrame[]>(url);
    return Promise.resolve(timeFrames);
}
