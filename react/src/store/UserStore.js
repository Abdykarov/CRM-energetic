import {makeAutoObservable} from "mobx";

export default class UserStore{

    constructor() {
        this._isAuth = false;
        this._user = {}
        this._role = null
        this._id = null
        this._username = null
        makeAutoObservable(this)
    }

    setId(id){
        this._id = id;
    }

    get userId(){
        return this._id;
    }

    get id(){
        return this._id;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get username(){
        return this._username
    }

    get role(){
        return this._role
    }

    setUsername(username){
        this._username = username
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