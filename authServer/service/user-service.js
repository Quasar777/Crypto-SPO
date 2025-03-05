const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDTO = require('../dtos/user-dto')

class UserService { 
    async registration(email, password) {  
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error("Данная почта уже зарегистрирована.")
        }
        const hashedPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        
        const user = await UserModel.create({email, password: hashedPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDTO = new UserDTO(user) // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDTO // отправляем инфо о пользователе помимо токенов
        }
    }   

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw new Error('Некорректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }
}

module.exports = new UserService();