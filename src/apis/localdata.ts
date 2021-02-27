import dayjs from 'dayjs';
import { Customer } from '../types/Customer';
import { Facility } from '../types/Facility';
import { Reservation } from '../types/Reservation';
import { TimeFrame } from '../types/TimeFrame';
import { User } from '../types/User';
import Storage from '../utils/Storage';

export enum StorageType {
    Login = 'Login',
    Customer = 'Customer',
    Reservation = 'Reservation',
    TimeFrame = 'TimeFrame',
    Facility = 'Facility',
}

const localDataSetup = () => {

    // Login
    Storage.setJSON<User[]>(StorageType.Login, [
        { id: '99999', password: '12345' },
    ]);

    // Customers
    Storage.setJSON<Customer[]>(StorageType.Customer, [
        {
            customerId: 1,
            name: 'やまだたろう',
        },
        {
            customerId: 2,
            name: 'いしかわごえもん',
        },
        {
            customerId: 3,
            name: 'じげんだいすけ',
        }        
    ]);

    // Facilities
    Storage.setJSON<Facility[]>(StorageType.Facility, [
        {
            id: 1,
            name: 'A会議室',
        },
        {
            id: 2,
            name: 'B会議室',
        },
        {
            id: 3,
            name: 'C会議室',
        },
        {
            id: 4,
            name: 'D会議室',
        },
        {
            id: 5,
            name: 'E会議室',
        },    
    ]);

    // TimeFrames
    Storage.setJSON<TimeFrame[]>(StorageType.TimeFrame, [
        {
            timeFrameId: 1,
            dayOfWeek: 0,
            startTime: '10:00',
            endTime: '11:00',
            frameId: 1,   
        },
        {
            timeFrameId: 2,
            dayOfWeek: 0,
            startTime: '11:00',
            endTime: '12:00',
            frameId: 1,   
        },
        {
            timeFrameId: 3,
            dayOfWeek: 0,
            startTime: '12:00',
            endTime: '13:00',
            frameId: 1,   
        },
        {
            timeFrameId: 4,
            dayOfWeek: 0,
            startTime: '13:00',
            endTime: '14:00',
            frameId: 1,   
        },
        {
            timeFrameId: 5,
            dayOfWeek: 0,
            startTime: '14:00',
            endTime: '15:00',
            frameId: 1,   
        },       
        {
            timeFrameId: 6,
            dayOfWeek: 0,
            startTime: '15:00',
            endTime: '16:00',
            frameId: 1,   
        },       
        {
            timeFrameId: 7,
            dayOfWeek: 0,
            startTime: '16:00',
            endTime: '17:00',
            frameId: 1,   
        },       
        {
            timeFrameId: 8,
            dayOfWeek: 0,
            startTime: '17:00',
            endTime: '18:00',
            frameId: 1,   
        },       
    ]);

    // Reservations
    const customers = Storage.getJSON<Customer[]>(StorageType.Customer) ?? [];
    const facilities = Storage.getJSON<Facility[]>(StorageType.Facility) ?? [];

    const customer = customers[0];
    const facility = facilities[0];
    Storage.setJSON<Reservation[]>(StorageType.Reservation, [
        {
            customerId: customer.customerId,
            name: customer.name,
            reservation: {
                reservationId: 1,
                customerId: customer.customerId,
                reservationDate: dayjs().format('YYYY/MM/DD'),
                timeFrameId: 1,
                timeFrame: {
                    dayOfWeek: 4,
                    startTime: '10:00',
                    endTime: '11:00',
                    frame: {
                        facilityId: facility.id,
                        facility: {
                            facilityName: facility.name,
                        },
                    },
                },
                        
            }
        },
        {
            customerId: customer.customerId,
            name: customer.name,
            reservation: {
                reservationId: 2,
                customerId: customer.customerId,
                reservationDate: dayjs().format('YYYY/MM/DD'),
                timeFrameId: 1,
                timeFrame: {
                    dayOfWeek: 4,
                    startTime: '10:00',
                    endTime: '11:00',
                    frame: {
                        facilityId: facility.id,
                        facility: {
                            facilityName: facility.name,
                        },
                    },
                },
                        
            }
        },   
        {
            customerId: customer.customerId,
            name: customer.name,
            reservation: {
                reservationId: 3,
                customerId: customer.customerId,
                reservationDate: dayjs().format('YYYY/MM/DD'),
                timeFrameId: 1,
                timeFrame: {
                    dayOfWeek: 4,
                    startTime: '10:00',
                    endTime: '11:00',
                    frame: {
                        facilityId: facility.id,
                        facility: {
                            facilityName: facility.name,
                        },
                    },
                },
                        
            }
        },   
        {
            customerId: customer.customerId,
            name: customer.name,
            reservation: {
                reservationId: 4,
                customerId: customer.customerId,
                reservationDate: dayjs().format('YYYY/MM/DD'),
                timeFrameId: 1,
                timeFrame: {
                    dayOfWeek: 4,
                    startTime: '10:00',
                    endTime: '11:00',
                    frame: {
                        facilityId: facility.id,
                        facility: {
                            facilityName: facility.name,
                        },
                    },
                },
                        
            }
        },   
        {
            customerId: customer.customerId,
            name: customer.name,
            reservation: {
                reservationId: 5,
                customerId: customer.customerId,
                reservationDate: dayjs().format('YYYY/MM/DD'),
                timeFrameId: 1,
                timeFrame: {
                    dayOfWeek: 4,
                    startTime: '10:00',
                    endTime: '11:00',
                    frame: {
                        facilityId: facility.id,
                        facility: {
                            facilityName: facility.name,
                        },
                    },
                },
                        
            }
        },   

    ]);

}

export default localDataSetup;

