const nodemailer = require('nodemailer');
const authMiddleware = require('../middleware/authMiddleware');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
        })
    }

    async sendActivationMail(to, link) {}
}

module.exports = new MailService();