import React, { useState, useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/fontawesome-free-solid';

type itsProps = {
    children: ReactNode,
    handleMenuIcon: () => void;
}

const Header = (props: itsProps) => {
    const { children, handleMenuIcon } = props;

    fontawesome.library.add(faBars);

    const history = useHistory();

    const logout = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        e.preventDefault();
        sessionStorage.removeItem('isLogin');
        history.push('/');
    }

    return (
        <div className='header'>
            <span className="menu-icon">
                <FontAwesomeIcon icon={["fas","bars"]} onClick={handleMenuIcon} />
            </span>
            <span className="systemName">予約システム</span>
            <div>
                <button className='btn negative' onClick={(e)=>logout(e)}>ログアウト</button>
            </div>
            {children}
        </div>
    );
}

export default Header;