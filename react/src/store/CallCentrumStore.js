import {makeAutoObservable} from "mobx";

export default class CallCentrumStore {

    constructor() {
        this._contacts = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }


    get contacts() {
        return this._contacts;
    }

    setContacts(contacts) {
        this._contacts = contacts;
    }

    get page() {
        return this._page;
    }

    setPage(page) {
        this._page = page;
    }

    get totalCount() {
        return this._totalCount;
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    get limit() {
        return this._limit;
    }

    setLimit(limit) {
        this._limit = limit;
    }
}