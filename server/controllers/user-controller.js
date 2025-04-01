const User = require('../models/User')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const API_KEY = "X6lLYjNDciSZa0J6SmNIWdxCa/94DbCN5J5KXkuNQAc=";

class userController {
    async getPortfolio(req, res, next) {
        try {
            const { email } = req.body;
    
            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'});
            }
    
            res.json(user.portfolio)
        } catch(e) {
            next(e)
        }
    }

    async addAsset(req, res, next) {
        try {
            const {email, id, amount, price, date} = req.body;
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            const existingCoin = user.portfolio.find(coin => coin.id === id);
            if (existingCoin) {
                existingCoin.amount += amount;
                existingCoin.price = (existingCoin.price + price) / 2;
            } else {
                user.portfolio.push({id, amount, price, date})
            }
    
            await user.save()
            res.json(user.portfolio);
    
        } catch(e) {
            next(e)
        }
    }

    async removeCrypto(req, res, next) {
        try {
            const {userId, coinId} = req.body;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'})
            }
            user.portfolio = user.portfolio.filter(coin => coin.id !== coinId)
            await user.save()
    
        } catch(e) {
            next(e)
        }
    }

    async getCryptoData(req, res, next) {
        try {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": API_KEY,
                },
            };
            
            const response = await fetch('https://openapiv1.coinstats.app/coins', options)
            if (!response.ok) {
                throw new Error("Ошибка при получении данных с COINSTATS API");
            }

            const data = await response.json();
            res.json(data.result)

        } catch(e) {
            next(e)
        }
    }
}


module.exports = new userController();