const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDTO = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService { 
    async registration(email, password) {  
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest("Данная почта уже зарегистрирована.")
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
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email}) 
        if (!user) {
            throw ApiError.BadRequest("Пользователь не найден")
        }
        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            throw ApiError.BadRequest("Неверный пароль")
        }
        const userDto = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto 
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
}

module.exports = new UserService();