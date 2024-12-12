const Newsletter = require("../models/newsletter.model");
const ServiceError = require("../utils/errors/serviceError");
const userErrorsCode = require("../utils/errors/user.error");

// Método para buscar un correo en la colección
const findNewsletter = async ({email}) => {
    if (!email) {
        throw new ServiceError("Invalid user data", userErrorsCode.USER_FETCH_FAILED);
    }
    try {
        const newsl = await Newsletter.findOne({ email });
        if (!newsl) {
            console.log("Email not found in the newsletter collection.");
        }
        return newsl;
    } catch (error) {
        console.error("Error searching for email:", error);
        throw new ServiceError("Error searching for email", userErrorsCode.USER_SEARCH_FAILED);
    }
};

// Método para guardar un correo en la colección
const saveNewsletter = async ({email}) => {
    if (!email) {
        throw new ServiceError("Invalid user data", userErrorsCode.USER_FETCH_FAILED);
    }
    try {
        // Crear instancia del modelo con los datos
        const newNewsletter = new Newsletter({ email });
        // Guardar en la base de datos
        const savedNewsletter = await newNewsletter.save();
        console.log("Email saved successfully:", savedNewsletter);
        return savedNewsletter;
    } catch (error) {
        console.error("Error saving email:", error);
        throw new ServiceError("Error saving email", userErrorsCode.USER_SAVE_FAILED);
    }
};

module.exports = { findNewsletter, saveNewsletter };
