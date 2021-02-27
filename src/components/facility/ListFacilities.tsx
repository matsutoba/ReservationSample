import React, { useState, useEffect } from 'react';

import { getFacilities } from '../../apis/facilities';
import { useQuery } from 'react-query';
import Pagination from '../common/Pagination';
import { PAGESIZE } from '../../utils/Const';

type itsPorps = {
    handleDetail: (id: number) => void;
    handleAddFacility: () => void;
}

const ListFacilities = (props: itsPorps) => {
    const { handleDetail, handleAddFacility } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const searchResult = useQuery(['facilityies',currentPage], () => getFacilities(currentPage));

    return (
        <>
            <div className="control">
                <button className="btn" onClick={handleAddFacility}>施設追加</button>
            </div>
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                        <th className='item'>施設名</th>
                        <th className='item'></th>
                        </tr>
                    </thead>
                    <tbody>
                    { searchResult.data?.items.map(e => {
                        return (
                            <tr key={`f${e.id}`}>
                                <td>{e.name}</td>
                                <td><button className='btn' onClick={() => handleDetail(e.id)}>詳細</button></td>
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

export default ListFacilities;