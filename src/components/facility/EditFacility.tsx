import React, { useState, useEffect } from 'react';
import { Facility } from '../../types/Facility';
import { getFacility, postFacility } from '../../apis/facilities';
import { useQuery, useMutation, useQueryClient } from 'react-query';

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
    const [facility, setFacility] = useState({
        id: -1,
        name: '',
    });

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
    },[query.data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFacility({
            id: facility?.id,
            name: e.target.value
        });
    }

    const handleSave = () => {
        if (facility) {
            mutation.mutate(facility);    
        }
    }

    return (
        <div className='reservations'>
            <h2>施設編集</h2>
            <div className='edit'>
                <table>
                    <tbody>
                        <tr>
                            <th className='item'>施設名</th>
                            <td>
                                <input 
                                    type="text" 
                                    value={facility.name}
                                    onChange={(e) => handleChange(e)}
                                    />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='btn-group'>
                <button className='btn negative' onClick={handleScreenMode}>キャンセル</button>
                <button className='btn' onClick={handleSave}>保存</button>
            </div>
        </div>
    );
}

export default EditFacility;