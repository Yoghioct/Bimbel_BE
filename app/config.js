const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  urlDb : process.env.URL_MONGODB_DEV,
  jwtExpiration: process.env.JTW_EXPIRATION,
  jwtSecret: process.env.JTW_SECRET_KEY,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD
};