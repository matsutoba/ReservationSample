import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from 'react-query';
import Main from '../Main';
import EditFacility from './EditFacility';
import ListFacilities from './ListFacilities';

enum ScreenMode {
    List = 0,
    Edit = 1,
}

const NewRecordId = -1;

const Facility = () => {
    const [mode, setMode] = useState(ScreenMode.List);
    const [facilityId, setFacilityId] = useState(-1);

    const handleDetail = (id: number) => {
        setFacilityId(id);
        setMode(ScreenMode.Edit);
    }

    const handleScreenMode = (mode: ScreenMode) => {
        setMode(mode);
    }

    return (
        <Main>
            <div className='reservations'>
                <h2>
                    <FontAwesomeIcon icon={["fas","building"]} />
                    <span>
                        施設管理
                        {mode===ScreenMode.Edit ? ' > 編集' : ''}
                    </span>
                </h2>
                <hr></hr>
                {(()=>{
                    switch (mode) {
                        case ScreenMode.List:
                            return <ListFacilities
                                handleDetail={ handleDetail }
                                handleAddFacility={() => handleDetail(NewRecordId)} 
                            />;
                        case ScreenMode.Edit:
                            return <EditFacility facilityId={facilityId}
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

export default Facility;