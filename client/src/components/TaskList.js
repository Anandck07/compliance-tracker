import React from 'react';
import { updateTaskStatus } from '../api';

const STATUSES = ['Pending', 'In Progress', 'Completed'];

function isOverdue(task) {
  return task.status !== 'Completed' && new Date(task.due_date) < new Date();
}

export default function TaskList({ tasks, onUpdated }) {
  const handleStatus = async (task, status) => {
    try {
      const { data } = await updateTaskStatus(task._id, status);
      onUpdated(data);
    } catch (err) {
      alert(err.response?.data?.error || 'Update failed');
    }
  };

  if (!tasks.length) return <p className="empty">No tasks match your filters.</p>;

  return (
    <div className="task-list">
      {tasks.map(task => {
        const overdue = isOverdue(task);
        return (
          <div key={task._id} className={`task-card ${overdue ? 'overdue' : ''} priority-${task.priority.toLowerCase()}`}>
            <div className="task-header">
              <span className="task-title">{task.title}</span>
              <span className={`badge status-${task.status.replace(' ', '-').toLowerCase()}`}>{task.status}</span>
            </div>
            {task.description && <p className="task-desc">{task.description}</p>}
            <div className="task-meta">
              <span className="tag">{task.category}</span>
              <span className={`tag priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
              <span className={`due ${overdue ? 'overdue-text' : ''}`}>
                📅 {new Date(task.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                {overdue && ' ⚠ Overdue'}
              </span>
            </div>
            <div className="task-actions">
              {STATUSES.filter(s => s !== task.status).map(s => (
                <button key={s} className="btn-sm" onClick={() => handleStatus(task, s)}>→ {s}</button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
