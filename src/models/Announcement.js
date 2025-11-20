
const mongoose = require('mongoose');
const AnnSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String
},{ timestamps: true });
module.exports = mongoose.model('Announcement', AnnSchema);
