const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: "Email format not valid" });
        }
    }

    next();
}

module.exports = { validateEmail };