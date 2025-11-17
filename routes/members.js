const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const auth = require('../middleware/auth');

// Create new member (used when approving application or manually adding)
router.post('/', auth, async (req, res) => {
  const m = new Member(req.body);
  await m.save();
  res.json(m);
});

// Get all members
router.get('/', auth, async (req, res) => {
  const list = await Member.find().sort({ createdAt: -1 });
  res.json(list);
});

// Get one member
router.get('/:id', auth, async (req, res) => {
  const m = await Member.findById(req.params.id);
  res.json(m);
});

// Update member
router.put('/:id', auth, async (req, res) => {
  const m = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(m);
});

// Delete member
router.delete('/:id', auth, async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
