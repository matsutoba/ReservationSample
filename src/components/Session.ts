class Session {
    private _isLogin: boolean;
    private _userName: string;

    constructor() {
        this._isLogin = false;
        this._userName = '';
    }

    get isLogin() {
        return this._isLogin;
    }

    set isLogin(isLogin: boolean) {
        this._isLogin = isLogin;
    }

    get UserName() {
        return this._userName;
    }
    set UserName(userName: string) {
        this._userName = userName;
    }

}

export default Session;