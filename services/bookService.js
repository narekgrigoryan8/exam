const bookModel = require('../models/bookModel');

async function listBooks() {
  return await bookModel.getAllBooks();
}

async function addBook(data) {
  return await bookModel.createBook(data);
}

async function updateBook(id, data) {
  return await bookModel.updateBook(id, data);
}

async function deleteBook(id) {
  return await bookModel.deleteBook(id);
}

module.exports = {
  listBooks,
  addBook,
  updateBook,
  deleteBook,
};
