import React, { useState, useEffect, useReducer } from 'react';
import { loginReducer, LoginState, LoginAction, LoginActionType } from '../reducers/login_reducer';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/style.css';

const Login = () => {

    const history = useHistory();

    const initState = { userId: '99999', password: '12345', login: false, message: '' };
    const [state, dispatch] = useReducer( loginReducer , initState );

    const [passwordState, setPasswordState] = useState('password');

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
                    <h1>予約システム ログイン</h1>
                    <p className="errorMessage">{state.message}</p>
                    <div>
                        <div className='entry'>
                            <input className='input' 
                                placeholder='ユーザID'
                                type='text'
                                id='userid' 
                                size={ 20 } 
                                maxLength={ 20 }
                                value={ state.userId }
                                onChange={ (e) => handleUserId(e) }    
                            >                                
                            </input>
                        </div>
                        <div className='entry'>
                            <div className='password'>
                                <input className='input' 
                                    placeholder='パスワード'
                                    type={passwordState} 
                                    id='password' 
                                    size={ 20 } 
                                    maxLength={ 20 }
                                    value={ state.password }
                                    onChange={ (e) => handlePassword(e) }
                                />
                                <span>
                                    {passwordState === 'text' ? 
                                        <FontAwesomeIcon icon={["fas","eye-slash"]} onClick={() => setPasswordState('password')} />
                                        :
                                        <FontAwesomeIcon icon={["fas","eye"]} onClick={() => setPasswordState('text')} />
                                    }
                                </span>
                            </div>
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
                    <p>※ローカルPC内で動作します。</p>
                    <p>※ユーザIDは99999、パスワードは12345です。</p>
                </div>
            </div>
        </section>
    )
}

export default Login;