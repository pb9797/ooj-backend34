const express = require('express');
const router = express.Router();
const MemberApplication = require('../models/MemberApplication');
const Member = require('../models/Member');
const auth = require('../middleware/auth');
const { sendCustomEmail } = require('../utils/mailer');

// Create new membership application (public)
router.post('/', async (req, res) => {
  try {
    const app = new MemberApplication(req.body);
    await app.save();

    // Email admin
    try {
      await sendCustomEmail(
        process.env.ADMIN_EMAIL,
        'New Membership Application',
        `New application from ${app.fullname}`,
        `<p>A new membership application has been submitted.</p>`
      );
    } catch (e) {}

    res.json(app);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error saving application' });
  }
});

// Get all applications (admin)
router.get('/', auth, async (req, res) => {
  const apps = await MemberApplication.find().sort({ createdAt: -1 });
  res.json(apps);
});

// Get one application
router.get('/:id', auth, async (req, res) => {
  const app = await MemberApplication.findById(req.params.id);
  res.json(app);
});

// Update application
router.put('/:id', auth, async (req, res) => {
  const app = await MemberApplication.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(app);
});

// Approve application → auto-create member
router.post('/:id/approve', auth, async (req, res) => {
  const a = await MemberApplication.findById(req.params.id);
  if (!a) return res.status(404).json({ msg: 'Not found' });

  // Create member
  const member = new Member({
    fullname: a.fullname,
    email: a.email,
    phone: a.telephone,
    photoUrl: a.passportPhotoUrl,
    joinedAt: new Date(),
    status: 'active'
  });

  await member.save();

  // Update application status
  a.status = 'approved';
  await a.save();

  // Notify applicant
  try {
    await sendCustomEmail(
      a.email,
      'Membership Application Approved',
      'Congratulations! Your membership application has been approved.',
      `<p>Dear ${a.fullname}, your membership application has been approved.</p>`
    );
  } catch (e) {}

  res.json({ ok: true, member, application: a });
});

// Reject application
router.post('/:id/reject', auth, async (req, res) => {
  const a = await MemberApplication.findById(req.params.id);
  if (!a) return res.status(404).json({ msg: 'Not found' });

  a.status = 'rejected';
  if (req.body.notes) a.notes = req.body.notes;
  await a.save();

  // Notify applicant
  try {
    await sendCustomEmail(
      a.email,
      'Membership Application Update',
      'Your application has been updated.',
      `<p>Status: ${a.status}</p>`
    );
  } catch (e) {}

  res.json(a);
});

module.exports = router;
