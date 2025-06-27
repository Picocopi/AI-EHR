const express = require('express');
const router = express.Router();
const Condition = require('../models/Condition');

// Create condition
router.post('/', async (req, res) => {
  try {
    const condition = new Condition(req.body);
    await condition.save();
    res.status(201).json(condition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all conditions
router.get('/', async (req, res) => {
  const conditions = await Condition.find().populate('subject');
  res.json(conditions);
});

// Get one condition
router.get('/:id', async (req, res) => {
  const condition = await Condition.findById(req.params.id).populate('subject');
  if (!condition) return res.status(404).json({ message: 'Not found' });
  res.json(condition);
});

module.exports = router;
