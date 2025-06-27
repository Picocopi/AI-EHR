const mongoose = require('mongoose');

const observationSchema = new mongoose.Schema({
  resourceType: { type: String, default: 'Observation' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  effectiveDateTime: Date,
  code: {
    text: String // e.g., "Blood Pressure", "HbA1c"
  },
  valueQuantity: {
    value: Number,
    unit: String
  },
  interpretation: String // e.g., "high", "normal"
});

module.exports = mongoose.model('Observation', observationSchema);
