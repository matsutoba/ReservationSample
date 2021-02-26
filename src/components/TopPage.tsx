import React from 'react';
import { useHistory } from 'react-router-dom';

const TopPage = () => {

    const history = useHistory();


    const logout = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        e.preventDefault();
        sessionStorage.removeItem('isLogin');
        history.push('/');
    }

    return (
        <section>
            <div>TopPage</div>
            <button onClick={(e)=>logout(e)}>Logout</button>
        </section>
    );
}

export default TopPage;