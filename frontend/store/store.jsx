import {makeAutoObservable, makeObservable, observable} from 'mobx'
import axios from "axios"
import UserService from '../service/UserService';
import { fetchAssets } from '../src/api';
import { percentDifference } from '../src/utils';

export default class SimpleStore {
    email = "test@mail.com";
    isLoading = false;

    constructor() {
        makeObservable(this, {
                email: observable,
                isLoading: observable,
            }
        );
        // this.setEmail();
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async setEmail() {
        const params =  new URLSearchParams(window.location.search);
        const userEmail = params.get('email');
        this.email = userEmail;
    }
    
}

