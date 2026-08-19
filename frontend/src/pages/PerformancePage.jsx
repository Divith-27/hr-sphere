const initialEmployees = [
  { name: 'Aisha Khan', team: 'Product', score: 94, trend: '+8%' },
  { name: 'Sanjay Verma', team: 'Engineering', score: 91, trend: '+6%' },
  { name: 'Priya Nair', team: 'Finance', score: 89, trend: '+4%' },
  { name: 'Maya Singh', team: 'Marketing', score: 87, trend: '+5%' },
  { name: 'Daniel Rao', team: 'HR', score: 96, trend: '+9%' },
];

const kpis = [
  { label: 'Avg. Productivity', value: '92%' },
  { label: 'Goal Completion', value: '89%' },
  { label: 'Manager Rating', value: '4.8/5' },
  { label: 'Training Hours', value: '1,240' },
];

export default function PerformancePage() {
  const handleExportReview = () => {
    const payload = { generatedAt: new Date().toISOString(), employees: initialEmployees, kpis };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hrsphere-performance-review.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Performance</h1>
        <button onClick={handleExportReview}>Export Review</button>
      </div>

      <div className="stats-strip">
        {kpis.map((item) => (
          <div className="mini-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Team Performance Overview</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Score</th>
              <th>Trend</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {initialEmployees.map((employee) => (
              <tr key={employee.name}>
                <td>{employee.name}</td>
                <td>{employee.team}</td>
                <td>{employee.score}/100</td>
                <td>{employee.trend}</td>
                <td><span className="badge success">Excellent</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
