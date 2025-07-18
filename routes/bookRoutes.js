const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');
const { authenticate } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/rbacMiddleware');

router.get('/', async (req, res) => {
  const books = await bookService.listBooks();
  res.json(books);
});

router.post('/', authenticate, requireRole(['admin']), async (req, res) => {
  try {
    const newBook = await bookService.addBook({
      ...req.body,
      added_by_user_id: req.user.id,
    });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', authenticate, requireRole(['admin']), async (req, res) => {
  try {
    const updated = await bookService.updateBook(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, requireRole(['admin']), async (req, res) => {
  try {
    const deleted = await bookService.deleteBook(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
