import React, { useState, useEffect } from 'react';
import { Facility } from '../../types/Facility';
import { getFacility, postFacility, deleteFacility } from '../../apis/facilities';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type itsPorps = {
    facilityId: number,
    handleScreenMode: () => void;
}

const EditFacility = (props: itsPorps) => {
    const { facilityId, handleScreenMode } = props;

    const queryClient = useQueryClient();
    const query = useQuery(['facility', facilityId], ()=>getFacility(facilityId));
    const mutation = useMutation(postFacility, {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('facilityies');
            handleScreenMode();
        }
    });
    const deleteMutation = useMutation(deleteFacility, {
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries('facilityies');
            handleScreenMode();
        }
    })

    const [facility, setFacility] = useState({
        id: -1,
        name: '',
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [canSave, setCanSave] = useState(false);


    const [isShowSaveModal, setIsShowSaveModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    useEffect(()=>{
        queryClient.invalidateQueries('facility');
        setFacility({
            id: -1,
            name: '',
        });
    }, []);

    useEffect(()=>{
        if (query.data) {
            setFacility(query.data);
        }
        setCanSave(true);
    },[query.data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFacility({
            id: facility?.id,
            name: e.target.value
        });
        if (!e.target.value) {
            setAlertMessage('施設名は必須です。');
            setCanSave(false);
        } else {
            setAlertMessage('');
            setCanSave(true);
        }
    }

    /* 保存 */
    const handleSaveConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsShowSaveModal(true);
    }
    const cancelSaveConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsShowSaveModal(false);
    }    
    const handleSave = () => {
        if (facility) {
            mutation.mutate(facility);    
        }
    }

    /* 削除 */
    const handleDeleteConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsShowDeleteModal(true);
    }
    const cancelDeleteConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsShowDeleteModal(false);
    }
    const handleDelete = () => {
        deleteMutation.mutate(facilityId);
    }

    return (
        <div className='edit'>
            {facilityId>0 ? (
                <p>施設情報の編集を行います。</p>
            ) : (
                <p>施設情報を追加します。</p>
            )}
            <table>
                <tbody>
                    <tr>
                        <th className='item'>施設名</th>
                        <td>
                            <input 
                                type="text" 
                                value={facility.name}
                                onChange={(e) => handleChange(e)}
                                className={alertMessage ? 'inputAlert' : ''}
                                />
                            <span className="alertMessage">
                                {alertMessage ? (
                                    <>
                                        <FontAwesomeIcon icon={["fas","exclamation-circle"]} />
                                        {alertMessage}
                                    </>
                                ) : null 
                                }
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='btn-group'>
                <button className='btn negative' onClick={handleScreenMode}>キャンセル</button>
                <button className='btn' onClick={handleSaveConfirm} disabled={!canSave}>保存</button>
                { (()=>{
                    if (facilityId>0) {
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
                            <button className="btn" onClick={ handleSave }>はい</button>
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
                            <button className="btn" onClick={ handleDelete }>はい</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EditFacility;