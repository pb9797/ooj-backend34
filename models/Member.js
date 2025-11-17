const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: String,
  phone: String,
  photoUrl: String,
  joinedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'suspended', 'removed'], default: 'active' },
  duesOwed: { type: Number, default: 0 },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', MemberSchema);
