const { findNewsletter, saveNewsletter } = require("../services/newsletter.service");

const saveNewsletterController = async (req,res) => {
    const email = req.body;
    try {
        const emailExist = await findNewsletter(email);
        if (emailExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        
        const newsLCreated = await saveNewsletter(email);
        res.status(201).json({ message: 'Email created successfully', data: newsLCreated });
    } catch (e) {
        res.status(500).json({ message: "An error occurred while saving" });
    }
}

module.exports = { saveNewsletterController };