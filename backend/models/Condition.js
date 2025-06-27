const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
  resourceType: { type: String, default: 'Condition' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }, // link to patient
  code: {
    text: String // e.g., "Diabetes Mellitus"
  },
  onsetDateTime: Date,
  clinicalStatus: {
    type: String,
    enum: ['active', 'recurrence', 'inactive', 'resolved']
  }
});

module.exports = mongoose.model('Condition', conditionSchema);
