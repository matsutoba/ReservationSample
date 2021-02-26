import React, { useState, useEffect } from 'react';

import { getFacilities } from '../../apis/facilities';
import { useQuery } from 'react-query';

type itsPorps = {
    handleDetail: (id: number) => void;
    handleAddFacility: () => void;
}

const ListFacilities = (props: itsPorps) => {
    const { handleDetail, handleAddFacility } = props;

    const reservations = useQuery('facilityies', getFacilities);

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
                    { reservations.data?.map(e => {
                        return (
                            <tr key={`f${e.id}`}>
                                <td>{e.name}</td>
                                <td><button className='btn' onClick={() => handleDetail(e.id)}>詳細</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListFacilities;