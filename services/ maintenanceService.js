const rentalModel = require('../models/rentalModel');
const overdueModel = require('../models/overdueModel');
const bookModel = require('../models/bookModel');

async function markOverdueRentals() {
  const activeRentals = await rentalModel.getActiveRentals();
  const now = new Date();
  const overdueMarked = [];

  for (const rental of activeRentals) {
    const due = new Date(rental.due_date);
    if (now > due) {
      const record = await overdueModel.createOverdueRecord(rental.id);
      overdueMarked.push(record);
    }
  }

  return overdueMarked;
}

module.exports = {
  markOverdueRentals,
};
