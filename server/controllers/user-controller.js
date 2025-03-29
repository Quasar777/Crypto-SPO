const User = require('../models/User')

exports.getPortfolio = async (req, res) => {
    try {
        const user = await User.findById(req.query.userId);
        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }
        res.json(user.portfolio)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

exports.addCrypto = async (req, res) => {
    try {
        const {userId, id, amount, price} = req.body;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        const existingCoin = user.portfolio.find(coin => coin.id === id);
        if (existingCoin) {
            existingCoin.amount += amount;
            existingCoin.price = (existingCoin.price + price) / 2;
        } else {
            user.portfolio.push({id, amount, price})
        }

        await user.save()
        res.json(user.portfolio);

    } catch(e) {
        res.status(500).json({ message: error.message });
    }
}

exports.removeCrypto = async (req, res) => {
    try {
        const {userId, coinId} = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'})
        }
        user.portfolio = user.portfolio.filter(coin => coin.id !== coinId)
        await user.save()
        
    } catch(e) {
        res.status(500).json({ message: error.message });
    }
}