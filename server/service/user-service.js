const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')

class UserService {
    async registration(email, password, role) {
        if(!email || !password) {
            throw new Error('Некорректный email или password')
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            throw new Error('Пользователь с таким почтовым адресом уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4();

        const user = await User.create({email, role, password: hashPassword, activationLink})
        const basket = await Basket.create({userId: user.id})
        await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();