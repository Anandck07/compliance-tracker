import React, { useState } from 'react';
import { createClient } from '../api';

export default function AddClientModal({ onClose, onAdded }) {
  const [form, setForm] = useState({ company_name: '', country: '', entity_type: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createClient(form);
      onAdded(data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add client');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Client</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={submit}>
          <input placeholder="Company Name" value={form.company_name}
            onChange={e => setForm({ ...form, company_name: e.target.value })} required />
          <input placeholder="Country" value={form.country}
            onChange={e => setForm({ ...form, country: e.target.value })} required />
          <input placeholder="Entity Type (e.g. LLC)" value={form.entity_type}
            onChange={e => setForm({ ...form, entity_type: e.target.value })} required />
          <div className="modal-actions">
            <button type="submit" className="btn-primary">Add</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
