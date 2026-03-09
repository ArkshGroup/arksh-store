require('dotenv').config();
const mongoose = require('mongoose');
const { secret } = require('./secret');

mongoose.set('strictQuery', false);

// it is local url 
const DB_URL = 'mongodb://127.0.0.1:27017/arkshstore';
// it is mongodb url
const MONGO_URI = secret.db_url || DB_URL;

const connectDB = async () => {
  try { 
    await mongoose.connect(MONGO_URI);
    console.log('mongodb connection success!');
  } catch (err) {
    console.error('mongodb connection failed!', err.message);
    throw err;
  }
};

module.exports = connectDB;
