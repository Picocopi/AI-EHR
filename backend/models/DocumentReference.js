const mongoose = require('mongoose');

const documentReferenceSchema = new mongoose.Schema({
  resourceType: { type: String, default: 'DocumentReference' },
  status: {
    type: String,
    enum: ['current', 'superseded', 'entered-in-error'],
    default: 'current'
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  type: {
    text: String, // e.g. “Skin lesion photo”
    coding: [{
      system: String, // e.g., "http://loinc.org"
      code: String,
      display: String
    }]
  },
  date: { type: Date, default: Date.now },
  content: [{
    attachment: {
      contentType: String, // e.g. "image/jpeg"
      url: String,         // Cloudinary URL
      title: String,
      creation: Date
    }
  }],
  description: String,
  author: [{
    reference: String, // e.g., "Practitioner/123"
    display: String
  }]
});

module.exports = mongoose.model('DocumentReference', documentReferenceSchema);
