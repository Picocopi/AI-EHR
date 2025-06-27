const express = require('express');
const router = express.Router();
const Observation = require('../models/Observation');

router.post('/', async (req, res) => {
  try {
    const observation = new Observation(req.body);
    await observation.save();
    res.status(201).json(observation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const observations = await Observation.find().populate('subject');
  res.json(observations);
});

router.get('/:id', async (req, res) => {
  const observation = await Observation.findById(req.params.id).populate('subject');
  if (!observation) return res.status(404).json({ message: 'Not found' });
  res.json(observation);
});

module.exports = router;
