import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getReservations } from '../../apis/reservations';
import { useQuery } from 'react-query';
import ListReservations from './ListReservations';
import EditReservation from './EditReservation';
import { ScreenMode } from '../../types/Const';
import Main from '../Main';

const Reservation = () => {
    const [mode, setMode] = useState(ScreenMode.List);

    const [reservationDate, setReservationDate] = useState('20201230');
    const [reservationId, setReservationId] = useState(0);
    const reservations = useQuery(['reservations', reservationDate], ()=>getReservations(reservationDate));

    useEffect(()=>{
        setMode(ScreenMode.List);
    }, []);

    const handleReturn = () => {
        setMode(ScreenMode.List);
    }

    const handleScreenMode = (mode: ScreenMode) => {
        setMode(mode);
    }

    const handleEdit = (reservationId: number) => {
        setReservationId(reservationId);
        setMode(ScreenMode.Edit);
    }

    return (
        <Main>
            <div>
                <div className='reservations'>
                    <h2>
                        <FontAwesomeIcon icon={["fas","calendar-alt"]} />
                        <span>
                            予約管理
                            {mode===ScreenMode.Edit ? ' > 編集' : ''}
                        </span>
                    </h2>
                    <hr></hr>
                    {(()=>{
                        switch (mode) {
                            case ScreenMode.List:
                                return <ListReservations handleEdit={handleEdit}/>
                            case ScreenMode.Edit:
                                return <EditReservation reservationId={reservationId} onEditFinish={() => handleScreenMode(ScreenMode.List) }/>
                            default:
                                return null;
                        }
                    })()}
                </div>
            </div>
        </Main>
    );
}

export default Reservation;