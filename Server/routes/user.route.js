const express = require('express');
const router = express.Router();
const { saveUserController, updateUserController, getUserController, getAllUsersController, loginController, requestPasswordReset, verifyResetToken, resetPassword, googleAuth } = require("../controllers/user.controllers");
const {validateEmail} = require('../middleware/verify.email');

const userRouter = router;

userRouter.get('/findAll', getAllUsersController)
userRouter.post('/find', validateEmail, getUserController)
userRouter.post('/create', validateEmail, saveUserController);
userRouter.put('/update/:userID', validateEmail, updateUserController);
userRouter.post('/request-newpassword', requestPasswordReset)
userRouter.post('/verify-token-password', verifyResetToken)
userRouter.post('/reset-password', resetPassword)

userRouter.post('/login', loginController);
userRouter.post('/google-auth', googleAuth);

module.exports = { userRouter };
