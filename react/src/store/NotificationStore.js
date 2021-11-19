import {makeAutoObservable} from "mobx";

export default class NotificationStore {

    constructor() {
        this._notifications = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    get notifications() {
        return this._notifications;
    }

    setNotifications(notifications) {
        this._notifications= notifications;
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