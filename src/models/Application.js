
const mongoose = require('mongoose');
const AppSchema = new mongoose.Schema({
  name: String,
  dob: String,
  telephone: String,
  email: String,
  data: mongoose.Mixed,
  status: { type: String, default: 'pending' }
},{ timestamps: true });
module.exports = mongoose.model('Application', AppSchema);
