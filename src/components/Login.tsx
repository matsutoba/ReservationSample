import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/style.css';
import { useQuery, useQueryClient } from 'react-query';
import { loginCheck } from '../apis/login';

const Login = () => {

    const history = useHistory();

    const [userId, setUserId] = useState('99999');
    const [password, setPassword] = useState('12345');
    const [message, setMessage] = useState('');
    const [passwordState, setPasswordState] = useState('password');

    const queryClient = useQueryClient();
    const loginQuery = useQuery(
        ['login', {userId, password}], 
        () => loginCheck(userId, password),
        {
            enabled: false,
        });
    const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleLogin = async(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if (!userId || !password) {
            setMessage('ユーザID または パスワードが未入力です');
            return;
        }

        const isLogin = await queryClient.fetchQuery(
            ['login', {userId, password}], 
            () => loginCheck(userId, password)    
        );

        if (!isLogin) {
            setMessage('ユーザID または パスワードが違います');
            return;
        }

        sessionStorage.setItem('isLogin', 'true');
        history.push('/main');
        
    }

    return (
        <section className="section background-lightgray">
            <div className="login">
                <div className='login-form'>
                    <h1>予約システム ログイン</h1>
                    <p className="errorMessage">{message}</p>
                    <div>
                        <div className='entry'>
                            <input className='input' 
                                placeholder='ユーザID'
                                type='text'
                                id='userid' 
                                size={ 20 } 
                                maxLength={ 20 }
                                value={ userId }
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
                                    value={ password }
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