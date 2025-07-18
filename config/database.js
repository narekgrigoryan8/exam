const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectDatabase = async () => {
  try {
    await pool.connect();
    console.log('Connection to the database successful');
  } catch (err) {
    console.error('Connection to the database failed:', err.message);
    process.exit(1);
  }
};

module.exports = {
  pool,
  connectDatabase,
};
