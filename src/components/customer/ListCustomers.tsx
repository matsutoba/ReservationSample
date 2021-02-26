import React, { useState, useEffect } from 'react';

import { getCustomers } from '../../apis/customers';
import { useQuery } from 'react-query';

type itsPorps = {
    handleDetail: (id: number) => void;
    handleAddCustomer: () => void;
}

const ListCustomers = (props: itsPorps) => {
    const { handleDetail, handleAddCustomer } = props;

    const customers = useQuery('customers', getCustomers);

    return (
        <>
            <div className="control">
                <button className="btn" onClick={handleAddCustomer}>顧客追加</button>
            </div>
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                        <th className='item'>顧客名</th>
                        <th className='item'></th>
                        </tr>
                    </thead>
                    <tbody>
                    { customers.data?.map(e => {
                        return (
                            <tr>
                                <td>{e.name}</td>
                                <td><button className='btn' onClick={() => handleDetail(e.customerId)}>詳細</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListCustomers;