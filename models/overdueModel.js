const { pool } = require('../config/database');

async function createOverdueRecord(rental_id, reason = 'Overdue') {
  const query = `
    INSERT INTO overdue_records (rental_id, reason)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await pool.query(query, [rental_id, reason]);
  return result.rows[0];
}

module.exports = {
  createOverdueRecord,
};
