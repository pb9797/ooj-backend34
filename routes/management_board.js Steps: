const express = require('express');
const router = express.Router();
const MB = require('../models/ManagementBoard');
const auth = require('../middleware/auth');

// Public: Get all management board members
router.get('/', async (req, res) => {
  const list = await MB.find().sort({ createdAt: -1 });
  res.json(list);
});

// Admin: Add new board member
router.post('/', auth, async (req, res) => {
  const m = new MB(req.body);
  await m.save();
  res.json(m);
});

// Admin: Update board member
router.put('/:id', auth, async (req, res) => {
  const updated = await MB.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Admin: Delete board member
router.delete('/:id', auth, async (req, res) => {
  await MB.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
