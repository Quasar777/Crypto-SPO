const express = require('express')
const userController = require('../controllers/user-controller')

const router = express.Router();

router.get('/getportfolio', userController.getPortfolio);
// router.post('/addasset', addCrypto);
// router.delete('/removeasset', removeCrypto);

module.exports = router;