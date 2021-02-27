import axios, { AxiosPromise } from 'axios';
import { Facility } from '../types/Facility';
import Storage from '../utils/Storage';
import { StorageType } from './localdata';


export const getFacilities = (): Promise<Facility[]> => {
    const url = `https://localhost:44391/api/facility`;
    // return axios.get<Facility[]>(url);

    const data = Storage.getJSON<Facility[]>(StorageType.Facility);
    return Promise.resolve(data ?? []);
}

export const getFacility = (id: number): Promise<Facility|undefined> => {
    const url = `https://localhost:44391/api/facility/${id}`;
    //return axios.get<Facility>(url);

    const data = Storage.getJSON<Facility[]>(StorageType.Facility);
    const r = data?.find((f) => f.id === id);
    return Promise.resolve(data?.find((f) => f.id === id));
}

export const postFacility = (data:Facility): Promise<boolean> => {
    const url = `https://localhost:44391/api/facility/${data.id}`;
    /*
    return axios.post(url, {
        id: data.id, 
        name: data.name
    });
    */

    const facilities = Storage.getJSON<Facility[]>(StorageType.Facility) ?? [];
    if ( facilities.find(e => e.id === data.id) ) {
        facilities.find((e,index) => {
            if ( e.id === data.id ) {
                facilities[index].name = data.name
            }
        });
    } else {
        facilities.push(data);
    }

    Storage.setJSON<Facility[]>(StorageType.Facility, facilities);
    return Promise.resolve(true);
}

export const deleteFacility = (facilityId: number): Promise<boolean> => {
    const facilities = Storage.getJSON<Facility[]>(StorageType.Facility) ?? [];
    const deleted = facilities.filter(e => e.id !== facilityId);

    Storage.setJSON<Facility[]>(StorageType.Facility, deleted);
    return Promise.resolve(true);

}

