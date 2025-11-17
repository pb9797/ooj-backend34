const mongoose = require('mongoose');

const ManagementBoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  phone: String,
  email: String,
  photoUrl: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('ManagementBoard', ManagementBoardSchema);
