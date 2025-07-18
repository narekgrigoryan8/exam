const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../models/userModel');
const { JWT_SECRET } = require('../config/config');

async function registerUser({ email, password, name, role }) {
  const existing = await getUserByEmail(email);
  if (existing) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashedPassword, name, role });
  return user;
}

async function loginUser({ email, password }) {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
}

module.exports = {
  registerUser,
  loginUser,
};
