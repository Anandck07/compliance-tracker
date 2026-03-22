const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// GET all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create client
router.post('/', async (req, res) => {
  try {
    const { company_name, country, entity_type } = req.body;
    if (!company_name || !country || !entity_type)
      return res.status(400).json({ error: 'All fields are required' });
    const client = await Client.create({ company_name, country, entity_type });
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
