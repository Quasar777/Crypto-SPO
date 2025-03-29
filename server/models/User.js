const mongoose = require('mongoose')

const PortfolioSchema = new mongoose.Schema({
    id: {type: String, required: true},
    amount: {type: Number, required: true},
    price: {type: Number, required: true},
    date: {type: Date, default: Date.now }
})

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: { type: String, required: true },
    portfolio: [PortfolioSchema] // Портфель пользователя
})

module.exports = mongoose.model('User', UserSchema)