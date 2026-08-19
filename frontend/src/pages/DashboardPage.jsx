const stats = [
  { label: 'Total Employees', value: '248' },
  { label: 'Attendance Rate', value: '96.2%' },
  { label: 'Pending Leaves', value: '17' },
  { label: 'Monthly Payroll', value: '$84.2K' },
];

const recentActivities = [
  { id: 1, action: 'Employee Added', name: 'Sanjay Verma', date: '2026-08-18', time: '10:30 AM', status: 'Completed' },
  { id: 2, action: 'Leave Approved', name: 'Aisha Khan', date: '2026-08-18', time: '09:15 AM', status: 'Approved' },
  { id: 3, action: 'Payroll Processed', name: 'Monthly Run', date: '2026-08-17', time: '02:00 PM', status: 'Completed' },
  { id: 4, action: 'Attendance Mark', name: 'Daniel Rao', date: '2026-08-17', time: '08:45 AM', status: 'Present' },
  { id: 5, action: 'Document Updated', name: 'Priya Nair', date: '2026-08-16', time: '11:20 AM', status: 'Pending' },
  { id: 6, action: 'Onboarding Started', name: 'Maya Singh', date: '2026-08-16', time: '03:30 PM', status: 'In Progress' },
];

export default function DashboardPage() {
  const handleGenerateReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: stats,
      activities: recentActivities,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hrsphere-dashboard-report.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>

      <div className="card-grid">
        {stats.map((item) => (
          <div className="card" key={item.label}>
            <h3>{item.label}</h3>
            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Recent Activities</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Details</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.action}</td>
                <td>{activity.name}</td>
                <td>{activity.date}</td>
                <td>{activity.time}</td>
                <td><span className={`badge ${activity.status.toLowerCase().replace(/\s/g, '')}`}>{activity.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
