const pool = require('../config/database');

async function createBook({ title, author, description, added_by_user_id }) {
  const query = `
    INSERT INTO books (title, author, description, added_by_user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [title, author, description, added_by_user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllBooks() {
  const result = await pool.query('SELECT * FROM books ORDER BY id DESC');
  return result.rows;
}

async function getBookById(id) {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  return result.rows[0];
}

async function updateBook(id, { title, author, description }) {
  const query = `
    UPDATE books SET title = $1, author = $2, description = $3 WHERE id = $4 RETURNING *;
  `;
  const values = [title, author, description, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteBook(id) {
  const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0];
}

async function setAvailability(bookId, isAvailable) {
  const result = await pool.query(
    'UPDATE books SET is_available = $1 WHERE id = $2 RETURNING *',
    [isAvailable, bookId]
  );
  return result.rows[0];
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  setAvailability,
};
