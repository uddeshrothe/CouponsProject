const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('DB connected')
    } catch (error) {
        console.error('Error connecting to DB', error);
    }
};

module.exports = connectDB;