import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <div className='reservations'>
                <h2>
                    <FontAwesomeIcon icon={["fas","user-circle"]} />
                    <span
                        >顧客管理
                        {mode===ScreenMode.Edit ? ' > 編集' : ''}
                    </span>
                </h2>
                <hr></hr>
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
        </Main>            
    );
}

export default Customer;