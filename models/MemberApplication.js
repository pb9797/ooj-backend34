const mongoose = require('mongoose');

const MemberApplicationSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  dob: Date,
  sex: String,
  maritalStatus: String,

  fatherName: String,
  motherName: String,
  nextOfKin: String,

  telephone: String,
  email: String,
  ghanaCard: String,

  town: String,
  region: String,
  gpsAddress: String,

  occupation: String,

  passportPhotoUrl: String,

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('MemberApplication', MemberApplicationSchema);
