const User = require("../models/user.model");
const ServiceError = require("../utils/errors/serviceError");
const userErrorsCode = require("../utils/errors/user.error");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const saveUser = async (user) => {
    const newUser = new User(user);

    try {
        const userCreated = await newUser.save();
        return userCreated;
    } catch (e) {
        console.error('Error al guardar el usuario:', e);
        if (e.code === userErrorsCode.USER_NOT_FOUND) {
            throw new Error('User not found');
        } else if (e.code === userErrorsCode.USER_SEARCH_FAILED) {
            throw new Error('Error searching for user');
        } else {
            throw e; // Propaga el error si no es manejado
        }
    }
};

const findByEmailAndSave = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user || null;
    } catch (error) {
        throw new ServiceError('Error to search user', userErrorsCode.USER_SEARCH_FAILED);
    }
}

const findUserByEmail = async (email) => {
    if (!email) {
        throw new ServiceError("Invalid user data", userErrorsCode.USER_FETCH_FAILED);
    }

    try {
        const emailFound = await User.findOne({ email: email });
        return emailFound || null;
    } catch (error) {
        throw new ServiceError("Error finding user", userErrorsCode.USER_SEARCH_FAILED);
    }
}

const findUserByID = async (id) => {
    if (!id) {
        throw new ServiceError("Invalid user ID", userErrorsCode.USER_FETCH_FAILED);
    }

    try {
        const idFound = await User.findById(id);
        return idFound || null;
    } catch (error) {
        console.error("Error finding user:", error); // Para una mayor visibilidad en consola
        throw new ServiceError("Error finding user", userErrorsCode.USER_SEARCH_FAILED);
    }
}

const findUserByEmailAndID = async ({ _id, email, resetToken, resetTokenExpires }) => {
    if (!_id || !email || !resetToken || !resetTokenExpires) {
        throw new ServiceError("Invalid user data", userErrorsCode.USER_FETCH_FAILED);
    }

    try {
        // Buscar al usuario por los parámetros proporcionados
        const user = await User.findOne({
            _id,
            email,
            resetToken,
            resetTokenExpires: { $gt: Date.now() } // Verifica que el token no haya expirado
        });
        return user || null;
    } catch (error) {
        throw new ServiceError("Error finding user", userErrorsCode.USER_SEARCH_FAILED);
    }
};

const loginService = async (email, password) => {
    if (!email || !password) {
        throw new ServiceError("Email and password are required", userErrorsCode.USER_FETCH_FAILED);
    }

    try {
        // Buscar al usuario por correo electrónico
        const user = await User.findOne({ email });

        // Si no se encuentra el usuario
        if (!user) {
            throw new ServiceError("Invalid email or password", userErrorsCode.USER_NOT_FOUND);
        }

        // Comparar la contraseña con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new ServiceError("Invalid email or password", userErrorsCode.INVALID_PASSWORD);
        }

        // Si todo es válido, devuelve el usuario
        return user;
    } catch (error) {
        // Propaga el error con un mensaje más claro
        throw new ServiceError(error.message || "Error logging in", userErrorsCode.USER_LOGIN_FAILED);
    }
};

const updateUser = async (id, updatedUser) => {
    if (!id || !updatedUser) {
        throw new ServiceError("Invalid user data", userErrorsCode.USER_FETCH_FAILED);
    }

    try {
        const userUpdated = await User.findByIdAndUpdate(id, updatedUser, { new: true });
        return userUpdated;
    } catch (error) {
        throw new ServiceError("Error updating user", userErrorsCode.USER_UPDATE_FAILED);
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new ServiceError("Error fetching users", userErrorsCode.USER_FETCH_FAILED);
    }
}

const updateUserResetToken = async (userId, resetToken, resetTokenExpires) => {
    try {
        const result = await User.updateOne(
            { _id: userId }, // Filtro: buscar usuario por ID
            {               // Campos a actualizar
                resetToken,
                resetTokenExpires,
            }
        );

        // Verifica si la actualización fue exitosa
        if (result.matchedCount === 0) {
            throw new Error('Usuario no encontrado');
        }

        return result; // Devuelve el resultado de la operación
    } catch (error) {
        console.error('Error actualizando el token de restablecimiento:', error);
        throw new Error('No se pudo actualizar el token de restablecimiento');
    }
};

const updateUserPassword = async (userId, newPassword) => {
    try {
        const result = await User.updateOne(
            { _id: userId }, // Filtro: buscar usuario por ID
            {               // Campos a actualizar
                password: newPassword,
                resetToken: null,
                resetTokenExpires: null,
            }
        );

        // Verifica si la actualización fue exitosa
        if (result.matchedCount === 0) {
            throw new Error('Usuario no encontrado');
        }

        return result; // Devuelve el resultado de la operación
    } catch (error) {
        console.error('Error actualizando el token de restablecimiento:', error);
        throw new Error('No se pudo actualizar el token de restablecimiento');
    }
};


const createOrLoginUser = async (userData) => {
    try {
      // Verifica si el usuario existe
      let user = await User.findOne({
        googleID: userData.googleID,
        email: userData.email,
      });
  
      if (!user) {
        // Si el usuario no existe, crea un nuevo usuario
        user = new User({
          googleID: userData.googleID,
          email: userData.email,
          name: userData.name,
          lastname: userData.lastname,
          avatar: userData.avatar || null,
          phoneNumber: userData.phoneNumber || null,
          country: userData.country || null,
          password: '', // Dejar la contraseña vacía ya que es autenticación con Google
        });
  
        const savedUser = await user.save();
      }
  
      // Generar JWT
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
  
      return { user, token };
  
    } catch (error) {
      console.error("Error en la creación o inicio de sesión del usuario:", error);
      throw new Error('Error en la creación o inicio de sesión del usuario');
    }
  };

module.exports = { createOrLoginUser, saveUser, findByEmailAndSave, updateUser, findUserByEmail, getAllUsers, loginService, findUserByEmailAndID, findUserByID, updateUserResetToken, updateUserPassword }