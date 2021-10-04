import {makeAutoObservable} from "mobx";

export default class AreaStore {

    constructor() {
        this._areas = []
        makeAutoObservable(this)
    }

    get areas() {
        return this._areas;
    }

    setAreas(value) {
        this._areas = value;
    }
}