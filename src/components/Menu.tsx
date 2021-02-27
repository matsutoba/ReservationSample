import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type itsProps = {
    isShow: boolean;
    onCancel: ()=>void;
    onMenuSelected: (menu: number)=>void;
};

const Menu = (props: itsProps) => {
    const { isShow, onCancel, onMenuSelected } = props;

    return (
        <div className={`menu ${isShow ? '' : 'close'}`} onClick={ () => onCancel() }>
                <span className="closeButton">
                    <FontAwesomeIcon icon={["fas","times"]} onClick={onCancel} />
                </span>
            <div>
                <ul>
                    <li onClick={ () => onMenuSelected(1) }>
                        <FontAwesomeIcon icon={["fas","calendar-alt"]} />
                        <span>予約管理</span>
                    </li>
                    <li onClick={ () => onMenuSelected(2) }>
                        <FontAwesomeIcon icon={["fas","user-circle"]} />
                        <span>顧客管理</span>
                    </li>
                    <li onClick={ () => onMenuSelected(3) }>
                        <FontAwesomeIcon icon={["fas","building"]} />
                        <span>施設管理</span>
                    </li>
                </ul>
            </div>
        </div>
    );

}

export default Menu;