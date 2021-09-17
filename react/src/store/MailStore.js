import {makeAutoObservable} from "mobx";

export default class MailStore {

    constructor() {
        this._mails = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }


    get mails() {
        return this._mails;
    }

    setMails(mails) {
        this._mails = mails;
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