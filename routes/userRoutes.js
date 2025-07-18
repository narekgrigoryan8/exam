const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../services/userService');
const { validateUserRegistration, validateLogin } = require('../middlewares/validation');

router.post('/register', validateUserRegistration, async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', validateLogin, async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
