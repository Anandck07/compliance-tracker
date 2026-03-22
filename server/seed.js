const mongoose = require('mongoose');
const Client = require('./models/Client');
const Task = require('./models/Task');
require('dotenv').config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Client.deleteMany();
  await Task.deleteMany();

  const clients = await Client.insertMany([
    { company_name: 'Acme Corp', country: 'USA', entity_type: 'LLC' },
    { company_name: 'GlobalTech Ltd', country: 'UK', entity_type: 'Ltd' },
    { company_name: 'Sunrise Ventures', country: 'India', entity_type: 'Pvt Ltd' },
  ]);

  const now = new Date();
  const past = (d) => new Date(now - d * 86400000);
  const future = (d) => new Date(now.getTime() + d * 86400000);

  await Task.insertMany([
    { client_id: clients[0]._id, title: 'Q1 Tax Filing', description: 'File quarterly taxes', category: 'Tax', due_date: past(10), status: 'Pending', priority: 'High' },
    { client_id: clients[0]._id, title: 'Annual Audit', description: 'Yearly audit report', category: 'Audit', due_date: future(15), status: 'In Progress', priority: 'High' },
    { client_id: clients[0]._id, title: 'GST Return', description: 'Monthly GST filing', category: 'Tax', due_date: past(3), status: 'Completed', priority: 'Medium' },
    { client_id: clients[1]._id, title: 'VAT Submission', description: 'Submit VAT return', category: 'Tax', due_date: past(5), status: 'Pending', priority: 'High' },
    { client_id: clients[1]._id, title: 'Board Meeting Minutes', description: 'File board minutes', category: 'Legal', due_date: future(7), status: 'Pending', priority: 'Low' },
    { client_id: clients[2]._id, title: 'ROC Filing', description: 'Annual ROC compliance', category: 'Legal', due_date: past(2), status: 'Pending', priority: 'High' },
    { client_id: clients[2]._id, title: 'TDS Payment', description: 'Monthly TDS deposit', category: 'Tax', due_date: future(5), status: 'Pending', priority: 'Medium' },
  ]);

  console.log('Seeded successfully');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
