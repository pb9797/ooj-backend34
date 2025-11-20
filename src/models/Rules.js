
const mongoose = require('mongoose');
const RSchema = new mongoose.Schema({
  text: String
},{ timestamps: true });
module.exports = mongoose.model('Rules', RSchema);
