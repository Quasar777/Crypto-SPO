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
        this.setEmail();
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async setEmail() {
        const params =  new URLSearchParams(window.location.search);
        const userEmail = params.get('email');
        this.email = userEmail;
        console.log(this.email)
    }

    async setPortfolio() {
        await this.setCryptoData();
        // this.portfolio = await this.getPortfolio();
    }

    async setCryptoData() {
        const response = await UserService.setCryptoData()
        this.cryptoData = response.result;
        
    }

    // async getPortfolio() {
    //     try {
            
    //         const response = await UserService.getPortfolio(this.email)
    //         const assets = response.data

    //         return assets.map((asset) => {
    //             const coin = this.cryptoData.find((c) => c.id === asset.id);

    //             if (!coin) return asset; 

    //             console.log(asset)
          
    //             return {
    //               grow: asset.price < coin.price,
    //               growPercent: percentDifference(asset.price, coin.price),
    //               totalAmount: asset.amount * coin.price,
    //               totalProfit: asset.amount * coin.price - asset.amount * asset.price,
    //               name: coin.name,
    //               ...asset,
    //             };
    //           });
              

    //     } catch(e) {
    //         console.log(e)
    //     }
    // }
    
}

