const { pool } = require('../config/database');

async function createRental({ book_id, user_id, due_date }) {
  const query = `
    INSERT INTO rentals (book_id, user_id, due_date)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [book_id, user_id, due_date];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function returnRental(rentalId) {
  const query = `
    UPDATE rentals
    SET return_date = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [rentalId]);
  return result.rows[0];
}

async function getRentalById(rentalId) {
  const result = await pool.query('SELECT * FROM rentals WHERE id = $1', [rentalId]);
  return result.rows[0];
}

async function getActiveRentals() {
  const result = await pool.query('SELECT * FROM rentals WHERE return_date IS NULL');
  return result.rows;
}

module.exports = {
  createRental,
  returnRental,
  getRentalById,
  getActiveRentals,
};
