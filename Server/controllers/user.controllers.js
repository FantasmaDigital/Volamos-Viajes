const { saveUser, findByEmailAndSave, updateUser, findUserByEmail, getAllUsers, findUserByEmailAndID, findUserByID, updateUserResetToken, updateUserPassword, createOrLoginUser } = require("../services/user.service");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { transporter } = require("../middleware/trasnporter.email");
const fetch = require("node-fetch");

dotenv.config();

const saveUserController = async (req, res) => {
    const user = req.body;
    try {
        const existUser = await findByEmailAndSave(user.email);
        if (existUser) {
            return res.status(400).json({ status: 400, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT)); // Genera el salt
        const hashedPassword = await bcrypt.hash(user.password, salt); // Hashea la contraseña
        user.password = hashedPassword; // Actualiza la contraseña del objeto usuario

        const userCreated = await saveUser(user);
        res.status(201).json({ status: 201, message: 'User created successfully', data: userCreated });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: 500, message: "An error occurred while saving" });
    }
};

const updateUserController = async (req, res) => {
    const userID = req.params.userID;
    const userUpdate = req.body;

    try {
        const updateSuccess = await updateUser(userID, userUpdate)
        if (!updateSuccess) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updateSuccess });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

const getUserController = async (req, res) => {
    const email = req.body.email;

    try {
        const emailFound = await findUserByEmail(email)

        if (!emailFound) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User found successfully', user: emailFound });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por correo electrónico
        const emailFound = await findUserByEmail(email);
        if (!emailFound) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, emailFound.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Convertir el documento a un objeto para manipularlo
        const user = emailFound.toObject();

        // Eliminar información sensible
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.__v;

        // Crear el payload para el token JWT
        const payload = {
            userId: emailFound._id, // Asegúrate de usar el _id del usuario encontrado
            email: user.email,
            name: user.name
        };

        // Generar el token JWT
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

        // Responder con el usuario y el token
        res.json({
            status: 200,
            message: 'Login successful',
            user,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(201).json({ message: 'Users found successfully', users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const user = await findUserByEmail(email); // Asegúrate de que esta función sea asíncrona
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Generar el token de restablecimiento y su expiración
        const resetToken = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.SECRET,
            { expiresIn: '1h' }
        );
        const resetTokenExpires = Date.now() + 3600000; // 1 hora en milisegundos

        // Actualizar el token y su expiración en la base de datos
        await updateUserResetToken(user._id, resetToken, resetTokenExpires);

        // Construir la URL de restablecimiento
        const resetUrl = `${process.env.CLIENT_URL}/new-password/${resetToken}`;

        // Configuración del correo
        const mailOptions = {
            from: process.env.ZOHO_USER,
            to: user.email,
            subject: '🔑 Restablecimiento de contraseña',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Restablecimiento de Contraseña</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f7;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .header {
                        background-color: #0e3d5e;
                        padding: 20px;
                        text-align: center;
                        color: #ffffff;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                    }
                    .content p {
                        font-size: 16px;
                        line-height: 1.5;
                        color: #555555;
                    }
                    .content a {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 10px 20px;
                        background-color: #0e3d5e;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 4px;
                        font-weight: bold;
                    }
                    .content a:hover {
                        background-color: #45a049;
                    }
                    .footer {
                        text-align: center;
                        padding: 15px;
                        font-size: 14px;
                        color: #999999;
                        background: #0e3d5e;
                    }
                    .footer a {
                        color: #4CAF50;
                        text-decoration: none;
                    }
                    .footer a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔑 Restablece tu Contraseña</h1>
                    </div>
                    <div class="content">
                        <p>Hola,</p>
                        <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para proceder:</p>
                        <a href="${resetUrl}">Restablecer Contraseña</a>
                        <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
                        <p>Gracias,<br>El equipo de Soporte</p>
                    </div>
                    <div class="footer">
                        <p>¿Necesitas ayuda? Visita nuestro <a href="https://example.com/support">Centro de Ayuda</a>.</p>
                        <p>&copy; ${new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
            `,
        };


        const emailSent = await transporter.sendMail(mailOptions);

        // Verificación del envío del correo
        if (!emailSent) {
            return res.status(500).json({ message: 'Hubo un problema al enviar el correo.' });
        }

        // Si todo sale bien, respondemos con 200
        res.status(200).json({ ok: true, message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.' });
    } catch (error) {
        console.error('Error en requestPasswordReset:', error);
        res.status(500).json({ message: 'Ocurrió un error al procesar tu solicitud.' });
    }
};

const verifyResetToken = async (req, res) => {
    const { token } = req.body;

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.SECRET);
        const { email, userId } = decoded; // Extraemos el email y userId del payload del token

        // Buscar al usuario con los parámetros requeridos
        const user = await findUserByEmailAndID({
            _id: userId,
            email: email,
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado o token no válido' });
        }

        // Si el token es válido, se devuelve un mensaje indicando que el formulario de cambio de contraseña puede ser mostrado
        res.status(200).json({
            ok: true,
            message: 'Token válido. Ahora puedes restablecer tu contraseña.',
            userId: user._id, // Se envía el userId para usarlo en el siguiente paso
        });
    } catch (error) {
        console.error("Error during token verification:", error.message);
        res.status(400).json({ message: 'Token inválido o expirado' });
    }
};


const resetPassword = async (req, res) => {
    const { userId } = req.body; // El userId se debe enviar después de verificar el token
    const { newPassword } = req.body;

    try {
        // Buscar al usuario en la base de datos usando el userId
        console.log(userId)
        console.log(newPassword)
        const user = findUserByID(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Actualizar la contraseña en la base de datos
        user.password = hashedPassword;
        await updateUserPassword(userId, hashedPassword);

        res.status(200).json({ ok: true, message: 'Contraseña actualizada correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocurrió un error al restablecer la contraseña.' });
    }
};

const googleAuth = async (req, res) => {
    try {
        const { googleToken } = req.body;

        // Llamamos al servicio para obtener los datos del usuario
        const googlePayload = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${googleToken}`)
            .then((res) => res.json());

        if (!googlePayload.sub) {
            return res.status(400).json({ message: 'Token inválido' });
        }

        // Preparar los datos del usuario
        const userData = {
            googleID: googlePayload.sub,
            email: googlePayload.email,
            name: googlePayload.given_name || " ",
            lastname: googlePayload.family_name || " ",
            avatar: googlePayload.picture || null,
            phoneNumber: " ",  // Puedes asignar un valor predeterminado o vacío
            country: " ",  // Lo mismo con el país
        };

        // Llamar al servicio para crear o autenticar el usuario
        const { user, token } = await createOrLoginUser(userData);

        res.status(200).json({
            ok: true,
            message: user ? 'Inicio de sesión exitoso' : 'Cuenta creada exitosamente',
            token,
            user,
            isNewUser: !user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { googleAuth, saveUserController, updateUserController, getUserController, getAllUsersController, loginController, requestPasswordReset, verifyResetToken, resetPassword };
