const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const appointments = await Appointment.find().populate('participant.actor');
  res.json(appointments);
});

router.get('/:id', async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate('participant.actor');
  if (!appointment) return res.status(404).json({ message: 'Not found' });
  res.json(appointment);
});

module.exports = router;
