const express = require('express');
const router = express.Router();
const { userRouter } = require("./user.route");
const { newsletterRouter } = require('./newsletter.route');

const mainRouter = router;

mainRouter.use('/users', userRouter);
mainRouter.use('/newsletter', newsletterRouter);

module.exports = { mainRouter };
