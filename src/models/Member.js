
const mongoose = require('mongoose');
const MemberSchema = new mongoose.Schema({
  fop_id: String,
  name: String,
  dob: String,
  sex: String,
  marital_status: String,
  father_name: String,
  mother_name: String,
  next_of_kin: String,
  telephone: String,
  email: String,
  ghana_card: String,
  town: String,
  region: String,
  gps: String,
  occupation: String,
  photo: String,
  raw: String
},{ timestamps: true });
module.exports = mongoose.model('Member', MemberSchema);
