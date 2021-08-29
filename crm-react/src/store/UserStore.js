import {makeAutoObservable} from "mobx";

export default class UserStore{

    constructor() {
        this._isAuth = false;
        this._user = {}
        this._role = null
        makeAutoObservable(this)
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get role(){
        return this._role
    }

    setRole(role){
        this._role = role
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
}