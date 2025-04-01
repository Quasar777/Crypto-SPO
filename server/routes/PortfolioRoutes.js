const express = require('express')
const userController = require('../controllers/user-controller')

const router = express.Router();

router.post('/getportfolio', userController.getPortfolio);
router.post('/addasset', userController.addAsset);
router.get('/getcryptodata', userController.getCryptoData)
// router.delete('/removeasset', removeCrypto);

module.exports = router;