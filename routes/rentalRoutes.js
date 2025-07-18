const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { validateRental } = require('../middlewares/validation');
const rentalService = require('../services/rentalService');

router.post('/rent', authenticate, validateRental, async (req, res) => {
  try {
    const rental = await rentalService.rentBook({
      ...req.body,
      user_id: req.user.id,
    });
    res.status(201).json(rental);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/return/:id', authenticate, async (req, res) => {
  try {
    const returned = await rentalService.returnBook(req.params.id);
    res.json(returned);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
