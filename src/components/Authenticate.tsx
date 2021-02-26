import React, { ReactElement, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import Session from './Session';

interface Props {
    children: React.ReactNode;
}

const Authenticate: React.FC<Props> = props => {

    const history = useHistory();
    debugger
    if ( sessionStorage.getItem('isLogin') === 'true' ) {
        history.push('/');
        return null;
    }
    
    return <>{props.children}</>
    
}

export default Authenticate;