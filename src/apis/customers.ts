import axios, { AxiosPromise } from 'axios';
import { Customer, CustomerSearchResult } from '../types/Customer';
import { Reservation } from '../types/Reservation';
import { TimeFrame } from '../types/TimeFrame';
import { PAGESIZE } from '../utils/Const';
import Storage from '../utils/Storage';
import { getFacility } from './facilities';
import { StorageType } from './localdata';
import { getTimeFrames } from './timeframes';

function getLocalData():Customer[] {
    const customers = Storage.getJSON<Customer[]>(StorageType.Customer) ?? [];
    return customers;
}

export const getCustomersAll = (): Promise<Customer[]> => {
    const url = 'https://localhost:44391/api/customer';
    // return axios.get<Customer[]>(url);
    const customers = getLocalData();
    return Promise.resolve(customers);
}

export const getCustomers = (page: number): Promise<CustomerSearchResult> => {
    const url = 'https://localhost:44391/api/customer';
    // return axios.get<Customer[]>(url);
    const customers = getLocalData();
    return Promise.resolve(
        {
            currentPage: page,
            pageSize: PAGESIZE,
            totalCount: customers.length,
            items:customers.slice(PAGESIZE*(page-1), PAGESIZE*page)
        }
    );
}

export const getCustomer = (id: number): Promise<Customer|undefined> => {
    const url = `https://localhost:44391/api/customer/${id}`;
    //return axios.get<Customer>(url);
    const customers = getLocalData();
    return Promise.resolve(customers.find((c) => c.customerId === id));
}

/*
export const postCustomer = (customer: Customer): Promise<boolean> => {
    const url = 'https://localhost:44391/api/customer';
    return axios.post(url, {
        name: customer.name
    });
   const customers = Storage.getJSON<Customer[]>(StorageType.Customer) ?? [];
   customers.push(customer);
    Storage.setJSON<Customer[]>(StorageType.Customer, customers);
    return Promise.resolve(true);
}
*/

export const patchCustomer = (customer: Customer): Promise<boolean> => {
    const url = `https://localhost:44391/api/customer/${customer.customerId}`;
    /*
    return axios.patch(url, {
        customerId: customer.customerId,
        name: customer.name
    });
    */

   const customers = getLocalData();
   if ( customers.find(e => e.customerId === customer.customerId) ) {
            customers.find((e,index) => {
            if ( e.customerId === customer.customerId ) {
                customers[index].name = customer.name
            }
        });
    } else {
        customers.push({
            ...customer,
            customerId: customers[customers.length-1].customerId + 1,
        });
    }
    Storage.setJSON<Customer[]>(StorageType.Customer, customers);
    return Promise.resolve(true);
}

export const deleteCustomer = (customerId: number): Promise<boolean> => {
    const customers = getLocalData();
    const deleted = customers.filter(e => e.customerId !== customerId);

    Storage.setJSON<Customer[]>(StorageType.Customer, deleted);
    return Promise.resolve(true);

}





/*
export const getReservation = (customerId: number): AxiosPromise<Reservation> => {
    if (customerId === 0) {
        return Promise.reject(null);
    }

    const url = `https://localhost:44391/api/customer/${customerId}/reservation`;
    return axios.get(url);
}
*/



/* 予約保存 */
type ReservationRequest = {
    reservationId: number,
    customerId: number,
    reservationDate: string,
    timeFrameId: number,
    facilityId: number,
};
/*
export const postReservation = (request: ReservationRequest): AxiosPromise => {
    const url = `https://localhost:44391/api/customer/${request.customerId}/reservation`;
    return axios.post(url, {
        reservationId: request.reservationId,
        customerId: request.customerId,
        reservationDate: request.reservationDate.replace(/-/g,''),
        reservationTimeFrameId: request.timeFrameId,
    });
}
*/

/* 予約更新 */
export const patchReservation = async (request: ReservationRequest): Promise<boolean> => {
    const url = `https://localhost:44391/api/customer/${request.customerId}/reservation`;
    /*
    return axios.patch(url, {
        reservationId: request.reservationId,
        customerId: request.customerId,
        reservationDate: request.reservationDate.replace(/-/g,''),
        reservationTimeFrameId: request.timeFrameId,
    });
    */
    const reservations = Storage.getJSON<Reservation[]>(StorageType.Reservation) ?? [];
    const customer = await getCustomer(request.customerId);
    const timeFrame = (await getTimeFrames(1)).find(e => e.timeFrameId === request.timeFrameId) ?? undefined;
    const facility = await getFacility(request.facilityId);

    if ( reservations.find(e => e.reservation.reservationId === request.reservationId) ) {
        reservations.find((e,index) => {
            if ( e.reservation.reservationId === request.reservationId ) {
                reservations[index] = {
                    ...reservations[index],
                    reservation: {
                        ...reservations[index].reservation,
                        reservationDate: request.reservationDate,
                        timeFrameId: request.timeFrameId,
                        timeFrame: {
                            dayOfWeek: timeFrame ? timeFrame.dayOfWeek : 0,
                            startTime: timeFrame ? timeFrame.startTime : '',
                            endTime: timeFrame ? timeFrame.endTime : '',
                            frame: {
                                facilityId: facility ? facility.id : 0,
                                facility: {
                                    facilityName: facility ? facility.name : ''
                                }
                            }
                        }
                    }
                }
            }
        });
    } else {
        const reservation: Reservation = {
            customerId: request.customerId,
            name: customer ? customer.name : '',
            reservation: {
                reservationId: reservations[reservations.length-1].reservation.reservationId+1,
                customerId: request.customerId,
                reservationDate: request.reservationDate,
                timeFrameId: request.timeFrameId,
                timeFrame: {
                    dayOfWeek: timeFrame ? timeFrame.dayOfWeek : 0,
                    startTime: timeFrame ? timeFrame.startTime : '',
                    endTime: timeFrame ? timeFrame.endTime : '',
                    frame: {
                        facilityId: facility ? facility.id : 0,
                        facility: {
                            facilityName: facility ? facility.name : ''
                        }
                    }
                }
            }

        }
        reservations.push(reservation);
    }

    Storage.setJSON<Reservation[]>(StorageType.Reservation, reservations);


    return Promise.resolve(true);
}

/* 予約削除 */
type DeleteReservationRequest = {
    customerId: number,
    reservationId: number,
}
export const deleteReservation = (request: DeleteReservationRequest): Promise<boolean> => {
    const url = `https://localhost:44391/api/customer/${request.customerId}/reservation/${request.reservationId}`;
    // return axios.delete(url);

    const reservations = Storage.getJSON<Reservation[]>(StorageType.Reservation) ?? [];
    const deleted = reservations.filter(e => 
        e.reservation.reservationId !== request.reservationId
    );
    Storage.setJSON<Reservation[]>(StorageType.Reservation, deleted);

    return Promise.resolve(true);
}
