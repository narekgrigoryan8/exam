const express = require('express');
const app = express();
require('dotenv').config();

const { connectDatabase } = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');

connectDatabase();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/rentals', rentalRoutes);
app.use('/maintenance', maintenanceRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Book Rental API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
