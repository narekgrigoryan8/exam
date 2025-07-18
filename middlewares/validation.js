const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
  body('email').isEmail().withMessage('Invalid email format, please check it and try again...'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const validateRental = [
  body('book_id').isInt().withMessage('Book ID must be an integer'),
  body('due_date').isISO8601().withMessage('Due date must be a valid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = {
  validateUserRegistration,
  validateLogin,
  validateRental,
};
