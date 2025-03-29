const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},

    portfolio: [
        {
            id: { type: String, required: true }, // ID валюты 
            amount: { type: Number, required: true }, // Количество монет
            price: { type: Number, required: true }, // Цена покупки
            date: { type: Date, default: Date.now }, // Дата покупки
        }
    ],
})


module.exports = model('User', UserSchema)