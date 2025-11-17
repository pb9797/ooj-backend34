const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: String,
  imageUrl: String,
  createdBy: String,
  published: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
