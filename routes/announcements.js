const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const auth = require('../middleware/auth');

// Public: Get all published announcements
router.get('/', async (req, res) => {
  const list = await Announcement.find({ published: true })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(list);
});

// Admin: Create announcement
router.post('/', auth, async (req, res) => {
  const a = new Announcement(req.body);
  await a.save();
  res.json(a);
});

// Admin: Delete announcement
router.delete('/:id', auth, async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
