# 📚 Book Rental API

A Node.js + Express.js RESTful API for managing users, books, and rentals in a book rental system. Features role-based access control (admin/user), JWT authentication, and book availability tracking.

---

## 🚀 Features

- 🔐 User registration and login with hashed passwords (bcrypt)
- 🧾 Role-based access: `admin` and `user`
- 📘 Admins can add, update, or delete books
- 📖 Users can rent and return books
- 🕒 Automatically tracks overdue books (optional extension)
- 📦 PostgreSQL for persistent data
- ✅ Input validation with express-validator
- 🛡 JWT-based authentication

---

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- express-validator
- dotenv

---

