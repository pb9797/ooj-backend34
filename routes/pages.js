const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const auth = require('../middleware/auth');

// Public: Get all published pages
router.get('/', async (req, res) => {
  const list = await Page.find({ published: true }).sort({ order: 1 });
  res.json(list);
});

// Public: Get single page by slug
router.get('/:slug', async (req, res) => {
  const p = await Page.findOne({ slug: req.params.slug });
  if (!p) return res.status(404).json({ msg: 'Page not found' });
  res.json(p);
});

// Admin: Create page
router.post('/', auth, async (req, res) => {
  const p = new Page(req.body);
  await p.save();
  res.json(p);
});

// Admin: Update page
router.put('/:id', auth, async (req, res) => {
  const p = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

// Admin: Delete page
router.delete('/:id', auth, async (req, res) => {
  await Page.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
