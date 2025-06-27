// models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    default: 'Patient'
  },
  identifier: {
    use: { type: String, default: 'official' },
    system: String, // e.g., NRIC, hospital system
    value: String    // e.g., P123456
  },
  name: [{
    use: { type: String, default: 'official' },
    family: String,
    given: [String]
  }],
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'unknown']
  },
  birthDate: Date,
  address: [{
    use: { type: String, default: 'home' },
    line: [String],
    city: String,
    state: String,
    country: String
  }],
  telecom: [{
    system: { type: String, enum: ['phone', 'email'] },
    value: String,
    use: { type: String, enum: ['home', 'work', 'mobile'] }
  }]
});

module.exports = mongoose.model('Patient', patientSchema);
