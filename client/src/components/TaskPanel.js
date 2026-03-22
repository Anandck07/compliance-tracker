import React, { useEffect, useState } from 'react';
import { getTasks } from '../api';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

const CATEGORIES = ['All', 'Tax', 'Audit', 'Legal', 'Payroll', 'Other'];
const STATUSES = ['All', 'Pending', 'In Progress', 'Completed'];

export default function TaskPanel({ client }) {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!client) return;
    setLoading(true);
    setFilterStatus('All');
    setFilterCategory('All');
    setSearch('');
    getTasks(client._id)
      .then(({ data }) => setTasks(data))
      .finally(() => setLoading(false));
  }, [client]);

  const handleAdded = (task) => setTasks(prev => [...prev, task]);
  const handleUpdated = (updated) => setTasks(prev => prev.map(t => t._id === updated._id ? updated : t));

  const filtered = tasks.filter(t => {
    const matchStatus = filterStatus === 'All' || t.status === filterStatus;
    const matchCat = filterCategory === 'All' || t.category === filterCategory;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchCat && matchSearch;
  });

  const overdue = tasks.filter(t => t.status !== 'Completed' && new Date(t.due_date) < new Date()).length;

  if (!client) return (
    <div className="task-panel empty-panel">
      <div className="empty-icon">📋</div>
      <p>Select a client to view tasks</p>
    </div>
  );

  return (
    <div className="task-panel">
      <div className="panel-header">
        <div>
          <h2>{client.company_name}</h2>
          <div className="sub">{client.entity_type} · {client.country}</div>
        </div>
        <AddTaskForm clientId={client._id} onAdded={handleAdded} />
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <span className="stat-value">{tasks.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{tasks.filter(t => t.status === 'Pending').length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{tasks.filter(t => t.status === 'In Progress').length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{tasks.filter(t => t.status === 'Completed').length}</span>
        </div>
        {overdue > 0 && (
          <div className="stat-card overdue-card">
            <span className="stat-label">⚠ Overdue</span>
            <span className="stat-value">{overdue}</span>
          </div>
        )}
      </div>

      <div className="filters">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {loading ? <p className="empty">Loading tasks...</p> : <TaskList tasks={filtered} onUpdated={handleUpdated} />}
    </div>
  );
}
