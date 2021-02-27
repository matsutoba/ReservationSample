import React, { useState, useEffect, useRef } from 'react';

import { getCustomersAll, patchReservation } from '../../apis/customers';
import { getFacilities, getFacilitiesAll } from '../../apis/facilities';
import { getTimeFrames } from '../../apis/timeframes';

import { useQuery, QueryClient, useMutation } from 'react-query';
import { ReservationResponse } from '../../types/Reservation';
import { deleteReservation } from '../../apis/customers';
import { getReservation } from '../../apis/reservations';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';

import dayjs from 'dayjs';

type itsPorps = {
    reservationId: number;
    onEditFinish: () => void;
}

const queryClient = new QueryClient();

const EditReservation = (props: itsPorps) => {
    const { reservationId, onEditFinish } = props;

    const isNew = () => {
        return reservationId === 0;
    }

    /* modal */
    const [isShowSaveModal, setIsShowSaveModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [goSave, setGoSave] = useState(false);
    const [goDelete, setGoDelete] = useState(false);

    /* customers */
    const refCustomer = useRef<HTMLSelectElement>(null);
    const [customerId, setCustomerId] = useState(0);
    const customers = useQuery('customers', getCustomersAll);
    const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomerId(Number(e.target.value));
    }
    useEffect(()=>{
        if (refCustomer.current && customers.data ) {
            refCustomer.current.selectedIndex = customers.data.findIndex(e => e.customerId === customerId) + 1;
        }
    },[customerId]);

    /* facilities */
    const refFacility = useRef<HTMLSelectElement>(null);
    const [facilityId, setFacilityId] = useState(0);
    const facilities = useQuery('facilities', getFacilitiesAll);
    const handleFacilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFacilityId(Number(e.target.value));
    }
    useEffect(()=>{
        if (refFacility.current && facilities.data) {
            refFacility.current.selectedIndex = facilities.data.findIndex(e => e.id === facilityId) + 1;
        }
    }, [facilityId]);

    /* reservationDate */
    const [reservationDate, setReservationDate] = useState(dayjs().format('YYYY/MM/DD'));
    const handleReservationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservationDate(e.target.value);
    }

    /* timeframes */
    const refTimeFrame = useRef<HTMLSelectElement>(null);
    const [timeFrameId, setTimeFrameId] = useState(0);
    const timeframes = useQuery(['timeframes', facilityId], () => getTimeFrames(facilityId));
    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeFrameId(Number(e.target.value));
    }

    /* save button state */
    const [canSave, setCanSave] = useState(customerId>0 && facilityId>0 && timeFrameId>0);

    /* reservation : 編集時に reservationId から取得 */
    const reservation = useQuery(
        ['reservation', reservationId], 
        () => getReservation(reservationId),
        {
            enabled: reservationId>0   // 編集用にIDが指定されているときは自動でクエリ実行
        });

    /* 予約保存 */
    const mutation = useMutation(
        //reservationId > 0 ? patchReservation : postReservation,
        patchReservation,
        {
            onSuccess: (data, veriables, context) => {
                queryClient.invalidateQueries();
                onEditFinish();
            }
        }
    );
    const handleSaveConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsShowSaveModal(true);
    }
    const cancelSaveConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsShowSaveModal(false);
    }

    const handleSaveReservation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsShowSaveModal(false);

        const request = {
            reservationId: reservationId,
            customerId: customerId,
            reservationDate: reservationDate,
            timeFrameId: timeFrameId,
            facilityId: facilityId,
        }
        mutation.mutate(request);
        queryClient.invalidateQueries('reservations');
    }
    
    /* 削除 */
    const handleDeleteConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsShowDeleteModal(true);
    }
    const cancelDeleteConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsShowDeleteModal(false);
    }
    const deleteMutation = useMutation(
        deleteReservation,
        {
            onSuccess: (data, veriables, context) => {
                queryClient.invalidateQueries('reservations');
                onEditFinish();
            }
        }
    );
    const handleDeleteReservation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const request = {
            reservationId: reservationId,
            customerId: customerId,
            reservationDate: reservationDate,
            timeFrameId: timeFrameId,
        }
        deleteMutation.mutate(request);
    }

    /* UseEffect Handlers */
    useEffect(()=>{
        if (refTimeFrame.current && timeframes.data) {
            refTimeFrame.current.selectedIndex = timeframes.data.findIndex(e => e.timeFrameId === timeFrameId) + 1;
        }
    },[timeframes]);

    useEffect(() => {
        if (reservation.data) {
            const r = reservation.data;
            setCustomerId(r.customerId);
            setFacilityId(r.reservation.timeFrame.frame.facilityId);
            setReservationDate(dayjs(r.reservation.reservationDate, 'YYYYMMDD').format('YYYY/MM/DD'));
            setTimeFrameId(r.reservation.timeFrameId);
        }
    }, [reservation])

    useEffect(() => {
        setCanSave(customerId>0 && facilityId>0 && timeFrameId>0);
    }, [customerId, facilityId, timeFrameId])

    return (
        <div className='edit'>
            {customerId>0 ? (
                <p>予約内容の編集を行います。</p>
            ) : (
                <p>新規の予約を作成します。</p>
            )}
            <table>
                <tbody>
                    <tr>
                        <th>お客様</th>
                        <td>
                            {( ()=>{
                                if ( reservationId > 0) {
                                    return (
                                        <span>{reservation.data?.name}</span>
                                    );
                                } 

                                return (                                
                                    <select ref={refCustomer} id='customer' onChange={handleCustomerChange}>
                                        <option>選択してください</option>
                                        {
                                            customers.data?.map(e => {
                                                return <option key={`c${e.customerId}`} value={e.customerId}>{e.name}</option>
                                            })
                                        }
                                    </select>
                                );
                            })()}
                        </td>
                    </tr>
                    <tr>
                        <th>施設</th>
                        <td>
                            <select ref={refFacility} id='facility' onChange={handleFacilityChange}>
                                    <option>選択してください</option>
                                    {
                                        facilities.data?.map(e => {
                                            return <option key={`f${e.id}`} value={e.id}>{e.name}</option>
                                        })
                                    }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>日付</th>
                        <td>
                            <DatePicker
                                className="datePicker"
                                dateFormat='yyyy/MM/dd'
                                onChange={(date) => {}}
                                onSelect={(date) => {setReservationDate(dayjs(date).format('YYYY/MM/DD'))} }
                                selected={dayjs(reservationDate).toDate()}
                                locale={ja}
                                disabledKeyboardNavigation />
                        </td>
                    </tr>
                    <tr>
                        <th>時間</th>
                        <td>
                            <select id='customer' ref={refTimeFrame} onChange={handleTimeChange}>
                                <option>選択してください</option>
                                {
                                    timeframes.data?.map(e => {
                                        return <option key={`t${e.timeFrameId}`} value={e.timeFrameId}>{e.startTime}</option>
                                    })
                                }
                        </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='btn-group'>
                <button className='btn negative' onClick={onEditFinish}>戻る</button>
                <button className='btn' onClick={handleSaveConfirm} disabled={!canSave} >保存</button>
                { (()=>{
                    if (reservationId>0) {
                        return <button className='btn delete' onClick={handleDeleteConfirm}>削除</button>
                    }
                })() }
            </div>
            <div className={`modal_overlay ${isShowSaveModal ? '' : 'none'}`}>
                <div className="modal_window">
                    <div className="rsvModalContent">
                        <p>保存してよろしいですか？</p>
                        <div className='btn-group'>
                            <button className="btn negative" onClick={ cancelSaveConfirm } >いいえ</button>
                            <button className="btn" onClick={ handleSaveReservation }>はい</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal_overlay ${isShowDeleteModal ? '' : 'none'}`}>
                <div className="modal_window">
                    <div className="rsvModalContent">
                        <p>削除してよろしいですか？</p>
                        <div className='btn-group'>
                            <button className="btn negative" onClick={ cancelDeleteConfirm } >いいえ</button>
                            <button className="btn" onClick={ handleDeleteReservation }>はい</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditReservation;