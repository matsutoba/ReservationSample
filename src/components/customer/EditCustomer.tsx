import React, { useState, useEffect } from 'react';
import { Customer } from '../../types/Customer';
import { deleteCustomer, getCustomer, patchCustomer } from '../../apis/customers';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/fontawesome-free-solid';

type itsPorps = {
    customerId: number,
    handleScreenMode: () => void;
}

const EditCustomer = (props: itsPorps) => {
    const { customerId, handleScreenMode } = props;

    const queryClient = useQueryClient();
    const query = useQuery(['customer', customerId], ()=>getCustomer(customerId));
    const mutation = useMutation(patchCustomer, {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('customers');
            handleScreenMode();
        }
    });
    const deleteMutation = useMutation(deleteCustomer, {
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries('customers');
            handleScreenMode();
        }
    })

    const [customer, setCustomer] = useState<Customer>({
        customerId: -1,
        name: '',
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [canSave, setCanSave] = useState(false);

    const [isShowSaveModal, setIsShowSaveModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    /* UseEffect Handlers */
    useEffect(()=>{
        setCustomer({
            customerId: -1,
            name: '',
        })
    }, []);

    useEffect(()=>{
        if (query.data) {
            setCustomer(query.data);
        }
        setCanSave(true);
    },[query.data])

    /* Handlers */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({
            customerId: customer?.customerId,
            name: e.target.value
        });
        if (!e.target.value) {
            setAlertMessage('顧客名は必須です。');
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
        if (customer) {
            mutation.mutate(customer);    
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
        deleteMutation.mutate(customerId);
    }

    /* Rendering */
    return (
        <div className='edit'>
            {customerId>0 ? (
                <p>顧客情報の編集を行います。</p>
            ) : (
                <p>顧客情報を追加します。</p>
            )}
            <table>
                <tbody>
                    <tr>
                        <th className='item'>顧客名</th>
                        <td>
                            <input 
                                type="text" 
                                value={customer.name}
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
                <button className='btn negative' onClick={handleScreenMode}>戻る</button>
                <button className='btn' onClick={handleSaveConfirm} disabled={!canSave}>保存</button>
                { (()=>{
                    if (customerId>0) {
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

export default EditCustomer;