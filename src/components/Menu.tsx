import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

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
                    <li onClick={ () => onMenuSelected(1) }>予約</li>
                    <li onClick={ () => onMenuSelected(2) }>顧客マスタ</li>
                    <li onClick={ () => onMenuSelected(3) }>施設マスタ</li>
                </ul>
            </div>
        </div>
    );

}

export default Menu;