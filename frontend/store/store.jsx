import {makeAutoObservable, makeObservable, observable} from 'mobx'
import axios from "axios"
import UserService from '../service/UserService';

export default class SimpleStore {
    email = "test@mail.com";
    portfolio = [];
    isLoading = false;

    constructor() {
        makeObservable(this, {
                email: observable,
                portfolio: observable,
                isLoading: observable,
            }
        )
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async setEmail() {

    }

    async setPortfolio() {
        
    }

    async getPortfolio() {
        try {
            const response = await UserService.getPortfolio(this.email)
            console.log(response)

        } catch(e) {
            console.log(e)
        }
    }
    
}

