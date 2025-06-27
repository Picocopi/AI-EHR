const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  resourceType: { type: String, default: 'Appointment' },
  status: {
    type: String,
    enum: ['booked', 'arrived', 'cancelled', 'fulfilled'],
    default: 'booked'
  },
  start: Date,
  end: Date,
  description: String,
  participant: [{
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    status: {
      type: String,
      enum: ['accepted', 'declined', 'tentative', 'needs-action'],
      default: 'accepted'
    }
  }]
});

module.exports = mongoose.model('Appointment', appointmentSchema);
