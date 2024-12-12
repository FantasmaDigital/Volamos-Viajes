const express = require('express');
const router = express.Router();
const {validateEmail} = require('../middleware/verify.email');
const { saveNewsletterController } = require('../controllers/newsletter.controllers');

const newsletterRouter = router;

newsletterRouter.post('/suscribe', validateEmail, saveNewsletterController);

module.exports = { newsletterRouter };
