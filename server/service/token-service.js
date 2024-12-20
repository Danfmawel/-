const jwt = require('jsonwebtoken');
const { Token, User } = require('../models/models');

class TokenService {
    /**
     * Генерация токенов
     * @param {Object} payload - Данные для токена
     * @returns {Object} - Объект с accessToken и refreshToken
     */
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    }

    /**
     * Сохранение refreshToken в базу данных
     * @param {number} userId - ID пользователя
     * @param {string} refreshToken - Токен для сохранения
     * @returns {Promise<Object>} - Данные токена
     */
    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: { userId } }); // Используйте корректную модель
    
        if (tokenData) {
            tokenData.refreshToken = refreshToken; // Обновить токен
            return tokenData.save(); // Сохранить изменения
        }
    
        // Если запись отсутствует, создаём новую
        const token = await Token.create({ userId, refreshToken });
        return token;
    }
}

module.exports = new TokenService();