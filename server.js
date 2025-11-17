require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Connect to DB
connectDB();

// Health check
app.get('/', (req, res) => {
  res.send('OOJ Friends of Peace Backend is Running');
});

// Routes
try { app.use('/api/auth', require('./routes/auth')); } catch(e){}
try { app.use('/api/members', require('./routes/members')); } catch(e){}
try { app.use('/api/applications', require('./routes/applications')); } catch(e){}
try { app.use('/api/announcements', require('./routes/announcements')); } catch(e){}
try { app.use('/api/management-board', require('./routes/management_board')); } catch(e){}
try { app.use('/api/pages', require('./routes/pages')); } catch(e){}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
