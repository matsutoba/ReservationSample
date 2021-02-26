import axios from 'axios';

export enum Covid19CallCenterKey {
    AcceptDate = '受付_年月日',
    ConsultingCount = '相談件数'
}

export class Covid19CallCenterModel {

    private _acceptDate: string;
    private _consultingCount: number;

    constructor(
        acceptDate: string,
        consultingCount: number
    ) {
        this._acceptDate = acceptDate;
        this._consultingCount = consultingCount;
    }

    get AcceptDate() {
        return this._acceptDate.substr(0,10);
    }

    get ConsultingCount() {
        return this._consultingCount;
    }
}

export enum getCovid19CallCenterKey {
    AcceptDate = '受付_年月日',
    ConsultingCount = '相談件数'
}

export interface Covid19CallCenterRequestModel {
    from: string,
    till: string,
    limit: number,
    cursor: string
}

export interface Covid19CallCenterResponseModel {
    [key: string]: string|number
};

export const getCovid19CallCenter = (
    { from = '', till = '', limit = 180, cursor = '' }: Covid19CallCenterRequestModel
) => {
    return new Promise<Covid19CallCenterModel[]>((resolve, reject)=>{
        axios.get(
            'https://api.data.metro.tokyo.lg.jp/v1/Covid19CallCenter',
            {
                params: {
                    from: from,
                    till: till,
                    limit: limit,
                    cursor: cursor
                }
            }
        ).then((res)=>{
            //console.log(res.data[0]);
            const keysAfter = [
                'state',
                'lgCode',
                'acceptDate',
                'consultingCount',
                'dayOfWeek',
            ];
            //const d: Map<string, any>[] = res.data[0];
            //d.map(e => _.mapKeys(e, (v,k) => keysAfter[k]) );
            const data:Covid19CallCenterResponseModel[] = res.data[0];
            const list:Covid19CallCenterModel[] = [];
            data.forEach( e => {
                list.push(
                    new Covid19CallCenterModel(
                        e[Covid19CallCenterKey.AcceptDate] as string,
                        e[Covid19CallCenterKey.ConsultingCount] as number)
                    );
            });

            resolve(list);
        }).catch((e)=>{
            reject({});
        });
    });
}

