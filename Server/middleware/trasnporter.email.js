const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();  // Lectura de variables de entorno

const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_HOST,  // Servidor SMTP de Zoho
    port: process.env.ZOHO_PORT,  // Puerto para SSL (puedes usar 587 para TLS)
    secure: true,           // Usar conexión segura
    auth: {
        user: process.env.ZOHO_USER, // Tu correo de Zoho
        pass: process.env.ZOHO_USER_PWD  // Tu contraseña de Zoho
    }
});

module.exports = { transporter };