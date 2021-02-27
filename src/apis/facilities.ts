import axios, { AxiosPromise } from 'axios';
import { Facility, FacilitySearchResult } from '../types/Facility';
import { PAGESIZE } from '../utils/Const';
import Storage from '../utils/Storage';
import { StorageType } from './localdata';

function getLocalData(): Facility[] {
    const data = Storage.getJSON<Facility[]>(StorageType.Facility) ?? [];
    return data;
}

export const getFacilitiesAll = (): Promise<Facility[]> => {
    const url = `https://localhost:44391/api/facility`;
    // return axios.get<Facility[]>(url);

    const facilities = getLocalData();
    return Promise.resolve(facilities);
}

export const getFacilities = (page: number): Promise<FacilitySearchResult> => {
    const url = `https://localhost:44391/api/facility`;
    // return axios.get<Facility[]>(url);

    const facilities = getLocalData();
    return Promise.resolve(
        {
            currentPage: page,
            pageSize: PAGESIZE,
            totalCount: facilities.length,
            items:facilities.slice(PAGESIZE*(page-1), PAGESIZE*page)
        }
    );

}

export const getFacility = (id: number): Promise<Facility|undefined> => {
    const url = `https://localhost:44391/api/facility/${id}`;
    //return axios.get<Facility>(url);

    const facilities = getLocalData();
    const r = facilities?.find((f) => f.id === id);
    return Promise.resolve(facilities?.find((f) => f.id === id));
}

export const postFacility = (data:Facility): Promise<boolean> => {
    const url = `https://localhost:44391/api/facility/${data.id}`;
    /*
    return axios.post(url, {
        id: data.id, 
        name: data.name
    });
    */

    const facilities = getLocalData();
    if ( facilities.find(e => e.id === data.id) ) {
        facilities.find((e,index) => {
            if ( e.id === data.id ) {
                facilities[index].name = data.name
            }
        });
    } else {
        facilities.push({
            ...data,
            id: facilities[facilities.length-1].id + 1,
        });
    }

    Storage.setJSON<Facility[]>(StorageType.Facility, facilities);
    return Promise.resolve(true);
}

export const deleteFacility = (facilityId: number): Promise<boolean> => {
    const facilities = getLocalData();
    const deleted = facilities.filter(e => e.id !== facilityId);

    Storage.setJSON<Facility[]>(StorageType.Facility, deleted);
    return Promise.resolve(true);

}

