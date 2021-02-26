import React, { useState, useEffect, useReducer } from 'react';
import { loginReducer, LoginState, LoginAction, LoginActionType } from '../reducers/login_reducer';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../css/style.css';

const Login = () => {

    const history = useHistory();

    const initState = { userId: '99999', password: 'password', login: false, message: '' };
    const [state, dispatch] = useReducer( loginReducer , initState );

    const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch({
            type: LoginActionType.CHECK,
            payload: { userId: e.target.value, password: state.password }  
        });
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch({
            type: LoginActionType.CHECK,
            payload: { userId: state.userId, password: e.target.value } 
        });
    }
    const handleLogin = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();
        dispatch({
            type: LoginActionType.LOGIN,
            payload: { userId: state.userId, password: state.password } 
        });
        if ( state.login ) {
        }
    
    }

    useEffect(()=>{
        if ( sessionStorage.getItem('isLogin') ) {
            history.push('/main');
        }
    },[state.login])

    return (
        <section className="section background-lightgray">
            <div className="login">
                <div className='login-form'>
                    <h1>ログイン</h1>
                    <div className="errorMessage">{state.message}</div>
                    <div>
                        <div className='entry'>
                            <input className='input' 
                                placeholder='ユーザID'
                                type='text'
                                id='userid' 
                                size={ 20 } 
                                value={ state.userId }
                                onChange={ (e) => handleUserId(e) }    
                            >                                
                            </input>
                        </div>
                        <div className='entry'>
                            <input className='input' 
                                placeholder='パスワード'
                                type='password' 
                                id='password' 
                                size={ 20 } 
                                value={ state.password }
                                onChange={ (e) => handlePassword(e) }
                            >                                
                            </input>
                        </div>
                    </div>
                    <div>
                        <input className='button' 
                            type="button" 
                            id='login' 
                            value='ログイン'
                            onClick={ (e) => handleLogin(e) }
                        >
                        </input>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;