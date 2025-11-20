
const mongoose = require('mongoose');
const PSchema = new mongoose.Schema({
  day: String,
  time: String,
  desc: String
},{ timestamps: true });
module.exports = mongoose.model('Program', PSchema);
