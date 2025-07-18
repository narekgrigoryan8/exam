const dotenv = require('dotenv');
dotenv.config();

if (!process.env.DB_NAME || !process.env.JWT_SECRET) {
  throw new Error('Missing required environment variables');
}

module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 3000,
};

