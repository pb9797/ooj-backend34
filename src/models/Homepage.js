
const mongoose = require('mongoose');
const HSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  cta: String,
  wh: String
},{ timestamps: true });
module.exports = mongoose.model('Homepage', HSchema);
