import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import EditCustomer from '../customer/EditCustomer';
import ListCustomers from '../customer/ListCustomers';
import { ScreenMode } from '../../types/Const';
import Main from '../Main';

const NewRecordId = -1;

const Customer = () => {
    const [mode, setMode] = useState(ScreenMode.List);
    const [customerId, setCustomerId] = useState(-1);

    const handleDetail = (id: number) => {
        setCustomerId(id);
        setMode(ScreenMode.Edit);
    }

    const handleScreenMode = (mode: ScreenMode) => {
        setMode(mode);
    }

    return (
        <Main>
            <div className='content'>
                <div className='reservations'>
                    <h2>顧客マスタ</h2>
                    {(()=>{
                        switch (mode) {
                            case ScreenMode.List:
                                return <ListCustomers
                                    handleDetail={ handleDetail }
                                    handleAddCustomer={() => handleDetail(NewRecordId)} 
                                />;
                            case ScreenMode.Edit:
                                return <EditCustomer customerId={customerId}
                                handleScreenMode={() => handleScreenMode(ScreenMode.List)} 
                                />;
                            default:
                                return <></>
                        }
                    })()}
                </div>
            </div>
        </Main>            
    );
}

export default Customer;