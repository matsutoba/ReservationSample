import React, { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import { getReservations } from '../../apis/reservations';
import { getTimeFrames } from '../../apis/timeframes';
import { useQuery, QueryClient } from 'react-query';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';


type itsPorps = {
    handleEdit: (reservationId: number) => void;
}

const queryClient = new QueryClient();

const ListReservations = (props: itsPorps) => {
    const { handleEdit } = props;


    const [reservationDate, setReservationDate] = useState( dayjs().format('YYYY/MM/DD') );
    const reservations = useQuery(['reservations', reservationDate], ()=>getReservations(reservationDate));
    const timeFrames = useQuery(['timeFrames', 1], () => getTimeFrames(1));

    const handleReservationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservationDate( e.target.value );
    }

    const renderReservation = () => {
        if ( reservations.data?.length === 0 ) {
            return <div className="rsvMessage">予約はありません</div>;
        }

        const rsvList = reservations.data?.map(e => {
            return (
                <tr key={`r${e.reservation.reservationId}`}>
                    <td>{e.name}</td>
                    <td>{e.reservation.timeFrame.startTime}</td>
                    <td>{e.reservation.timeFrame.frame.facility.facilityName}</td>
                    <td><button className='btn' onClick={() => handleEdit(e.reservation.reservationId)}>詳細</button></td>
                </tr>
            )
        })
        return rsvList;
    }

    const renderTableReservation = (): JSX.Element => {
        const startTimes = timeFrames.data?.map((e) => {
            return {
                startTime: e.startTime
            };
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>開始時間</th>
                        <th>予約者</th>
                    </tr>
                </thead>
                <tbody>
                    {startTimes?.map((e) => {
                        const resvs = reservations.data?.filter((r) => 
                            r.reservation.reservationDate === reservationDate &&
                            r.reservation.timeFrame.startTime === e.startTime
                        );

                        return (
                            <tr>
                                <td>{e.startTime}</td>
                                <td className="rsvBoxContainer">
                                    {resvs?.map((x) => {
                                        return (
                                            <ul onClick={() => handleEdit(x.reservation.reservationId)}>
                                                <li>{x.name}</li>
                                                <li>{x.reservation.timeFrame.frame.facility.facilityName}</li>
                                            </ul>
                                        );
                                    })}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }


    useEffect(()=>{
       queryClient.invalidateQueries('reservations'); 
    }, [])

    return (
        <div>
            <div className="rsvControl">
                <label htmlFor="rsvDate">予約日：</label>
                <DatePicker
                    className="datePicker"
                    dateFormat='yyyy/MM/dd'
                    onChange={(date) => {}}
                    onSelect={(date) => {setReservationDate(dayjs(date).format('YYYY/MM/DD'))} }
                    selected={dayjs(reservationDate).toDate()}
                    locale={ja}
                    disabledKeyboardNavigation />
                <button className="btn" onClick={() => handleEdit(0)}>新規予約</button>
            </div>            
            {/*
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                        <th className='time'>予約時間</th>
                        <th className='item'>お客様名</th>
                        <th className='item'>施設名</th>
                        <th className='item'></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        renderReservation()
                    }
                    </tbody>
                </table>
            </div>
            */}
            <div className='list'>
                { renderTableReservation() }
            </div>
        </div>
    );
}

export default ListReservations;