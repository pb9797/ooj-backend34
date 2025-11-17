const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'admin' }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
