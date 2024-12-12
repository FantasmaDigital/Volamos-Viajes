const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: { 
        type: String, 
        trim:true,
        validate: {
          validator: function(v) {
            // Si el usuario tiene un `googleID`, no requiere `password`
            return this.googleID || v != null;
          },
          message: 'Password is required if not authenticated via Google'
        }
      },
    country: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
        default: null,
        trim: true
    },
    resetToken: { 
        type: String, 
        default: null 
    }, 
    resetTokenExpires: { 
        type: Date, 
        default: null 
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
