const { pool } = require('../config/database');

async function getUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
}

async function createUser({ email, password, name, role = 'user' }) {
  const query = `
    INSERT INTO users (email, password, name, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, name, role;
  `;
  const values = [email, password, name, role];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function getAllUsers() {
  const query = `SELECT id, email, name, role FROM users ORDER BY id DESC;`;
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getUserByEmail,
  createUser,
  getAllUsers,
};
