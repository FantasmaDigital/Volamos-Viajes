const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectionDB = async () => {
    const URI = process.env.URI_MONGODB;

    if(!URI){
        throw new Error('Connection failed with MongoDB');
    }

    try {
        await mongoose.connect(URI);
        console.log('Database connected with MongoDB');
    } catch (error) {
        console.error('Error connecting with MongoDB', error);
        process.exit(1);
    }
}

module.exports = connectionDB;