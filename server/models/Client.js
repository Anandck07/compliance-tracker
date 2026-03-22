const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  country: { type: String, required: true },
  entity_type: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
