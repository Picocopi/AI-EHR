// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); 

// GET all patients
router.get('/', async (req, res) => {
  const patients = await Patient.find();
  res.json({
    resourceType: "Bundle",
    type: "searchset",
    entry: patients.map(patient => ({ resource: patient }))
  });
});

// POST new patient (FHIR-style request)
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET one patient by ID
router.get('/:id', async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ message: 'Not found' });
  res.json(patient);
});

module.exports = router;
