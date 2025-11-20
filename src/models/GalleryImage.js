
const mongoose = require('mongoose');
const GSchema = new mongoose.Schema({
  url: String,
  title: String
},{ timestamps: true });
module.exports = mongoose.model('GalleryImage', GSchema);
