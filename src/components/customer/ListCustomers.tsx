import React, { useState, useEffect } from 'react';

import { getCustomers } from '../../apis/customers';
import { useQuery } from 'react-query';
import Pagination from '../common/Pagination';
import { PAGESIZE } from '../../utils/Const';
import { current } from '@reduxjs/toolkit';

type itsPorps = {
    handleDetail: (id: number) => void;
    handleAddCustomer: () => void;
}

const ListCustomers = (props: itsPorps) => {
    const { handleDetail, handleAddCustomer } = props;
    const [currentPage, setCurrentPage] = useState(1);

    const searchResult = useQuery(['customers',currentPage], () => getCustomers(currentPage));

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
                    { searchResult.data?.items.map(e => {
                        return (
                            <tr key={e.customerId}>
                                <td>{e.name}</td>
                                <td><button className='btn' onClick={() => handleDetail(e.customerId)}>詳細</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <Pagination 
                    currentPage={currentPage}
                    pageCount={PAGESIZE}
                    totalCount={searchResult.data ? searchResult.data.totalCount : 0}
                    onClickNext={()=>{setCurrentPage(currentPage+1)}}
                    onClickPrev={()=>{setCurrentPage(currentPage-1)}}
                    onClickPage={(e)=>{setCurrentPage(e)}}
                />
            </div>
        </>
    );
}

export default ListCustomers;