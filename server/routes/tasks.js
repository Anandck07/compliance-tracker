const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET tasks for a client
router.get('/:clientId', async (req, res) => {
  try {
    const tasks = await Task.find({ client_id: req.params.clientId }).sort({ due_date: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create task
router.post('/', async (req, res) => {
  try {
    const { client_id, title, description, category, due_date, status, priority } = req.body;
    if (!client_id || !title || !category || !due_date)
      return res.status(400).json({ error: 'client_id, title, category, due_date are required' });
    const task = await Task.create({ client_id, title, description, category, due_date, status, priority });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update task status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'status is required' });
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
