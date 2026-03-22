import React, { useState } from 'react';
import ClientList from './components/ClientList';
import TaskPanel from './components/TaskPanel';
import './App.css';

export default function App() {
  const [selectedClient, setSelectedClient] = useState(null);
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="logo-icon">⚖️</span>
          <span className="logo-text">ComplianceTracker</span>
          <span className="tagline">LedgersCFO</span>
        </div>
      </header>
      <div className="app-body">
        <ClientList selected={selectedClient} onSelect={setSelectedClient} />
        <TaskPanel client={selectedClient} />
      </div>
    </div>
  );
}
