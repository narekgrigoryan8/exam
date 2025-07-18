const rentalModel = require('../models/rentalModel');
const bookModel = require('../models/bookModel');

async function rentBook({ book_id, user_id, due_date }) {
  const book = await bookModel.getBookById(book_id);
  if (!book || !book.is_available) {
    throw new Error('Book not available');
  }

  await bookModel.setAvailability(book_id, false);
  return await rentalModel.createRental({ book_id, user_id, due_date });
}

async function returnBook(rentalId) {
  const rental = await rentalModel.returnRental(rentalId);
  if (rental) {
    await bookModel.setAvailability(rental.book_id, true);
  }
  return rental;
}

module.exports = {
  rentBook,
  returnBook,
};
