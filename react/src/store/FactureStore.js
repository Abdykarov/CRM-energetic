import {makeAutoObservable} from "mobx";

export default class FactureStore {

    constructor() {
        this._factures = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }


    get factures() {
        return this._factures;
    }

    setFactures(factures) {
        this._factures = factures;
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