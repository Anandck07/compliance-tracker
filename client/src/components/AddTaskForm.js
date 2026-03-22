import React, { useState } from 'react';
import { createTask } from '../api';

const CATEGORIES = ['Tax', 'Audit', 'Legal', 'Payroll', 'Other'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function AddTaskForm({ clientId, onAdded }) {
  const [form, setForm] = useState({ title: '', description: '', category: 'Tax', due_date: '', priority: 'Medium' });
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTask({ ...form, client_id: clientId });
      onAdded(data);
      setForm({ title: '', description: '', category: 'Tax', due_date: '', priority: 'Medium' });
      setOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add task');
    }
  };

  if (!open) return (
    <button className="btn-primary" onClick={() => setOpen(true)}>+ Add Task</button>
  );

  return (
    <div className="add-task-form">
      <h4>New Task</h4>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <input placeholder="Title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })} />
        <div className="form-row">
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
            {PRIORITIES.map(p => <option key={p}>{p}</option>)}
          </select>
          <input type="date" value={form.due_date}
            onChange={e => setForm({ ...form, due_date: e.target.value })} required />
        </div>
        <div className="modal-actions">
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
