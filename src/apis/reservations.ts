import axios, { AxiosPromise } from 'axios';
import { ReservationResponse, ReservationForList, Reservation } from '../types/Reservation';
import Storage from '../utils/Storage';
import { StorageType } from './localdata';

function getLocalData(): Reservation[] {
    const reservations = Storage.getJSON<Reservation[]>(StorageType.Reservation) ?? [];
    return reservations;
}

export const getReservation = (id: number): Promise<Reservation|undefined> => {
    const url = `https://localhost:44391/api/reservation/${id}`;
    // return axios.get<ReservationResponse>(url);
    const reservations = getLocalData();
    const result = reservations.find(e => e.reservation.reservationId === id);
    return Promise.resolve(result);
};

export const getReservations = (date: string): Promise<Reservation[]> => {
    const url = `https://localhost:44391/api/reservation/${date.replace(/-/g, '')}/reservations`;
    // return axios.get<ReservationForList[]>(url);

    const reservations = getLocalData();
    return Promise.resolve(reservations);
};

