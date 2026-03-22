import React, { useEffect, useState } from 'react';
import { getClients } from '../api';
import AddClientModal from './AddClientModal';

export default function ClientList({ selected, onSelect }) {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getClients().then(({ data }) => setClients(data));
  }, []);

  return (
    <div className="client-list">
      <div className="client-list-header">
        <h2>Clients</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add</button>
      </div>
      <div className="client-scroll">
        {clients.map(c => (
          <div key={c._id}
            className={`client-item ${selected?._id === c._id ? 'active' : ''}`}
            onClick={() => onSelect(c)}>
            <div className="client-info">
              <div className="client-avatar">{c.company_name[0].toUpperCase()}</div>
              <div>
                <div className="client-name">{c.company_name}</div>
                <div className="client-meta">{c.entity_type} · {c.country}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <AddClientModal
          onClose={() => setShowModal(false)}
          onAdded={(c) => setClients(prev => [c, ...prev])}
        />
      )}
    </div>
  );
}
