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

