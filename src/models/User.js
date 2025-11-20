
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, default: 'admin' }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
