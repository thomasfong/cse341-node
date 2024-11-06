const mongoose = require('mongoose');

const URI = "mongodb+srv://thomasfong1020:F584G64M8840@cluster0.eiwjh.mongodb.net/";

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopolopy: true, 
        useNewUrlParser: true
    });
    console.log('db connected..!');
};

module.exports = connectDB;