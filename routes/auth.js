const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const u = await User.findOne({ email });
  if (!u) return res.status(401).json({ msg: 'Invalid email or password' });

  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) return res.status(401).json({ msg: 'Invalid email or password' });

  const token = jwt.sign(
    { id: u._id, email: u.email, role: u.role },
    process.env.JWT_SECRET || 'devsecret',
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: { name: u.name, email: u.email, role: u.role }
  });
});

// Register Admin (first time setup)
router.post('/register-admin', async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ email }))
    return res.status(400).json({ msg: 'Admin already exists' });

  const hash = await bcrypt.hash(password, 10);

  const u = new User({
    name,
    email,
    passwordHash: hash,
    role: 'admin'
  });

  await u.save();
  res.json({ ok: true });
});

module.exports = router;
