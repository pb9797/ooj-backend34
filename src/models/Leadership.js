
const mongoose = require('mongoose');
const LSchema = new mongoose.Schema({
  name: String,
  role: String,
  photo: String,
  bio: String
},{ timestamps: true });
module.exports = mongoose.model('Leadership', LSchema);
