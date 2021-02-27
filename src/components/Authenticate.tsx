import React, { ReactElement, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const Authenticate: React.FC<Props> = props => {

    console.log(`Auth ${sessionStorage.getItem('isLogin')}`)

    const history = useHistory();
    if ( sessionStorage.getItem('isLogin') === 'true' ) {
        console.log("Auth OK")
        return <>{props.children}</>
    }
    
    console.log("Auth NG")
    history.push('/');
    return null;
    
}

export default Authenticate;