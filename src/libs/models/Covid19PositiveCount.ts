import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

class InnerResponseModel {
    private _data: Covid19PositiveCountResponseModel[];
    private _moreResult: string;
    private _endCursor: string;

    constructor(
        data: Covid19PositiveCountResponseModel[],
        moreResult: string,
        endCursor: string
    ) {
        this._data = data;
        this._moreResult = moreResult;
        this._endCursor = endCursor;
    }

    get Data() {
        return this._data;
    }
    get EndCursor() {
        if ( this._moreResult === 'MORE_RESULTS_AFTER_LIMIT' )
        {
            return this._endCursor;
        }
        return null;
    }
}

export class Covid19PositiveCountModel {

    public OpenDate: string;
    public Count: number;

    constructor(
        openDate: string,
        count: number
    ) {
        this.OpenDate = openDate;
        this.Count = count;
    }
}

export enum Covid19PositiveCountKey {
    Gender = '患者_性別',
    Nendai = '患者_年代',
    OpenDate = 'OpenDate',
    Count = 'Count',
}

export interface Covid19PositiveCountRequestModel {
    from: string,
    till: string,
    limit: number,
    cursor: string
}

export interface Covid19PositiveCountResponseModel {
    [key: string]: string|number
};


export async function getCovid19PositiveCount(
    { from = '', till = '', limit = 1000, cursor = '' }: Covid19PositiveCountRequestModel
) {    
    let moreResult = true;
    let data: Covid19PositiveCountResponseModel[] = [];
    let response: Covid19PositiveCountModel[] = [];
    let nextCursor: string = cursor;
    console.info("Get Covid19PositiveCount - start ");      
    
    let c = 0;
    while (moreResult) {
        c++;
        console.info("Fetch next data - " + c);                  
        const res = await callCovid19PositiveCount({from, till, limit, cursor:nextCursor});
        data = data.concat( res.Data );

        if ( res.EndCursor === null ) {
            console.info("Nomore result");
            moreResult = false;
        } else {
            console.info("Fetch next data - " + c);
            nextCursor = res.EndCursor
        }
        console.log(data);
        if ( c==10 ) {
            console.warn("Force exit loop: maybe infite loop");
            break;
        }
    }
    console.info("Get Covid19PositiveCount - end ");      

    // 同じキーは合算したい
    response = _.chain(data)
    .uniqBy('No')
    .sortBy('公表_年月日')
    .groupBy('公表_年月日')
    .map((objs, key) => {
        return {
            'OpenDate': key.substr(0,10),
            'Count': _.sum([objs.length])
        }
    })
    .value();
    

    //console.log( JSON.stringify(response) );
    return response;
};

const callCovid19PositiveCount = (
    { from = '', till = '', limit = 1000, cursor = '' }: Covid19PositiveCountRequestModel
) => {
    return new Promise<InnerResponseModel>((resolve, reject)=>{
        axios.get(
            'https://api.data.metro.tokyo.lg.jp/v1/Covid19Patient',
            {
                params: {
                    from: from,
                    till: till,
                    limit: limit,
                    cursor: encodeURI(cursor)
                }
            }
        ).then((res)=>{
            console.log(res);
            console.log(JSON.stringify(res.data[0]));
            //console.log(res.data[1].moreResults);
            //console.log(res.data[1].endCursor);            
            const data: Covid19PositiveCountResponseModel[] = res.data[0];
            const list: Covid19PositiveCountModel[] = [];

            /*
            const sum = _.chain(data)
                //.filter( e => e['退院済フラグ'] !== '1' )
                .unionBy('No')
                .sortBy( '公表_年月日' )
                .groupBy( '公表_年月日' )
                .map((objs, key) => {
                    return {
                        'OpenDate': key.substr(0,10),
                        'Count': _.sum([objs.length])
                    }
                })
                .value();

            sum.forEach( e => {
                list.push( new Covid19PositiveCountModel(e.OpenDate, e.Count) );
            })
            
            console.log("----");
            //console.log(list);
            */
            const response = new InnerResponseModel(
                res.data[0],
                res.data[1].moreResults,
                res.data[1].endCursor
            );
            
            resolve(response);

        }).catch((e)=>{
            reject({});
        });
    });
}

