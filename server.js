const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ROUTES
app.use('/auth', require('./routes/auth'));
app.use('/members', require('./routes/members'));
app.use('/applications', require('./routes/applications'));
app.use('/announcements', require('./routes/announcements'));
app.use('/management-board', require('./routes/management_board'));
app.use('/pages', require('./routes/pages'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'OOJ Backend Running' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
