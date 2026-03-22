require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(express.json());

app.use('/api/clients', require('./routes/clients'));
app.use('/api/tasks', require('./routes/tasks'));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => { console.error('DB connection failed:', err); process.exit(1); });
