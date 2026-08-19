import { useState } from 'react';

const initialCompletionTasks = [
  { title: 'Employee onboarding checklist', owner: 'HR Team', due: '2026-08-20', progress: 100 },
  { title: 'Payroll verification', owner: 'Finance', due: '2026-08-21', progress: 85 },
  { title: 'Policy acknowledgment', owner: 'Compliance', due: '2026-08-22', progress: 72 },
  { title: 'Training completion', owner: 'Learning', due: '2026-08-25', progress: 58 },
];

export default function CompletionPage() {
  const [completionTasks, setCompletionTasks] = useState(initialCompletionTasks);

  const handleFinalizeChecklist = () => {
    setCompletionTasks((prev) => prev.map((task) => ({ ...task, progress: 100 })));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Project Completion</h1>
        <button onClick={handleFinalizeChecklist}>Finalize Checklist</button>
      </div>

      <div className="stats-strip">
        <div className="mini-card">
          <span>Completed</span>
          <strong>64%</strong>
        </div>
        <div className="mini-card">
          <span>Pending</span>
          <strong>12</strong>
        </div>
        <div className="mini-card">
          <span>At Risk</span>
          <strong>2</strong>
        </div>
        <div className="mini-card">
          <span>Due This Week</span>
          <strong>6</strong>
        </div>
      </div>

      <div className="card">
        <h3>Completion Checklist</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Owner</th>
              <th>Due Date</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {completionTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.owner}</td>
                <td>{task.due}</td>
                <td>{task.progress}%</td>
                <td>
                  <span className={`badge ${task.progress === 100 ? 'success' : task.progress >= 75 ? 'warning' : 'danger'}`}>
                    {task.progress === 100 ? 'Completed' : task.progress >= 75 ? 'In Progress' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
