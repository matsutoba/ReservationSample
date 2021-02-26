import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from "react-router-dom";
import { useQuery, useIsFetching } from 'react-query';
import Header from './Header';
import Menu from './Menu';
import Reservation from './reservation/Reservation';
import Facility from './facility/Facility';
import Customer from './customer/Customer';
import { MenuEnum } from '../types/Const';

type itsProps = {
    children: JSX.Element;
};

const Main = (props:itsProps) => {
    const { children } = props;

    const history = useHistory();
    const isFetching = useIsFetching();

    const [isShowMenu, setShowMenu] = useState(false);
    const handleMenuCancel = () => {
        setShowMenu(!isShowMenu);
    }
    const handleMenuSelected = (num: number) => {
        switch (num) {
            case MenuEnum.Reservation:
                history.push('/reservation');
                return;
            case MenuEnum.Customer:
                history.push('/customer');                                
                return;
            case MenuEnum.Facility:
                history.push('/facility');                                
                return;
            default:
                history.push('/');                                
                return;
        }
    }

    return (
        <section className='main'>
            <Header handleMenuIcon={handleMenuCancel}>
                <Menu isShow={isShowMenu} onCancel={handleMenuCancel} onMenuSelected={handleMenuSelected} />
            </Header>
            <div className='body'>
                {(()=>{
                    if ( isFetching ) {
                        return ( 
                            <div className="loader-bg">
                                <div className="loader">Loading...</div>
                            </div>
                        )
                    }
                })()}            
                <div className='content'>
                    { children }
                </div>
            </div>
        </section>
    );
}

export default Main;