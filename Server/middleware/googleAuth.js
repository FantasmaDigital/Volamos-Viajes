const { handleGoogleAuth } = require('../services/user.service');

const { generateToken } = require('../utils/token');

const googleAuth = async (req, res) => {
    try {
        const { googleID, email, name, lastname, phoneNumber, country, avatar } = req.body;

        const { user, isNewUser } = await handleGoogleAuth({
            googleID,
            email,
            name,
            lastname,
            phoneNumber,
            country,
            avatar,
        });

        const token = generateToken(user);

        res.status(isNewUser ? 201 : 200).json({ token, user, isNewUser });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { googleAuth };
