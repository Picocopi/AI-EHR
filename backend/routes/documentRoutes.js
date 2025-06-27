const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const DocumentReference = require('../models/DocumentReference');

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ehr-documents',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 1024, crop: 'limit' }]
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const docRef = new DocumentReference({
      subject: req.body.subject, // Patient ID
      description: req.body.description || "Clinical image",
      type: {
        text: req.body.typeText || "Skin Lesion Image",
        coding: [{
          system: req.body.codeSystem || "http://loinc.org",
          code: req.body.code || "12345-6",
          display: req.body.display || "Clinical Photo"
        }]
      },
      content: [{
        attachment: {
          contentType: req.file.mimetype,
          url: req.file.path,
          title: req.file.originalname,
          creation: new Date()
        }
      }],
      author: [{
        reference: req.body.authorRef || "Practitioner/001",
        display: req.body.authorName || "Dr. AI"
      }]
    });

    await docRef.save();
    res.status(201).json(docRef);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/patient/:id', async (req, res) => {
  const docs = await DocumentReference.find({ subject: req.params.id });
  res.json(docs);
});

module.exports = router;
