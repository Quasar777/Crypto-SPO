import {makeAutoObservable, makeObservable, observable} from 'mobx'

export default class SimpleStore {
    email = "";
    portfolio = [];
    isLoading = false;

    constructor() {
        makeAutoObservable
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    
}

