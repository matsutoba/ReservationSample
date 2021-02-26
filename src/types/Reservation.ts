export type Reservation = {
    customerId: number,
    name: string,
    reservation: {
        reservationId: number,
        customerId: number,
        reservationDate: string,
        timeFrameId: number,
        timeFrame: {
            dayOfWeek: number,
            startTime: string,
            endTime: string,
            frame: {
                facilityId: number,
                facility: {   
                    facilityName: string,
                }
            }
        }
    }
};

export type ReservationResponse = {
    reservationId: number,
    customerId: number,
    reservationDate: string,
    timeFrameId: number,
    customer: {
        customerId: number,
        name: string,
    },
    timeFrame: {
        dayOfWeek: number,
        startTime: string,
        endTime: string,
        frame: {
            facilityId: number,
            facility: {   
                facilityName: string,
            }
        }
    }
}

export type ReservationForList = {
    customerId: number,
    name: string,
    reservationId: number,
    dayOfWeek: number,    
    startTime: string,
    endTime: string,
    facilityId: number,
    facilityName: string,
}