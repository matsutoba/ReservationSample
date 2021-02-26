import React from 'react';
import { StorageType } from '../apis/localdata';
import { User } from '../types/User';
import Storage from '../utils/Storage';

export interface LoginState {
    userId: string,
    password: string,
    login?: boolean,
    message?: string,
}

export enum LoginActionType {
    CHECK = 'check',
    LOGIN = 'login'
}

export interface LoginAction {
    type: LoginActionType,
    payload: LoginState
}

const loginCheck = (id: string, password: string): boolean => {
    const user = Storage.getJSON<User[]>(StorageType.Login)?.find((u) => 
        u.id === id && u.password === password
    );
    return user !== undefined;
}


export const loginReducer: React.Reducer<LoginState, LoginAction> = (state: LoginState, action: LoginAction) => {
    switch (action.type) {
        case LoginActionType.CHECK: {
            let _userId = state.userId;
            let _password = state.password;
            if ( action.payload.userId.length <= 8  ) {
                _userId = action.payload.userId;
            }
            if ( action.payload.password.length <= 8 ) {
                _password = action.payload.password;
            }
            return {
                userId: _userId,
                password: _password,
            }
        }
        case LoginActionType.LOGIN: {
            if ( action.payload.userId === '' || action.payload.password === '' ) {
                return {
                    ...state,
                    login: false,
                    message: 'ユーザID または パスワードが未入力です'
                }
            }
            if ( !loginCheck(action.payload.userId,action.payload.password) ) {
                return {
                    ...state,
                    login: false,
                    message: 'ユーザID または パスワードが違います'
                }
            }

            sessionStorage.setItem('isLogin', 'true');

            return {
                ...state,
                login: true
            }
        }
        default:        
    }
    return {
        ...state
    }

}