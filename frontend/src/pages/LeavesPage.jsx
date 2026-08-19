import { useState } from 'react';

const initialLeaveRequests = [
  { id: 1, employee: 'Aisha Khan', type: 'Annual', startDate: '2026-08-20', endDate: '2026-08-22', days: 3, status: 'Pending', reason: 'Family Vacation' },
  { id: 2, employee: 'Daniel Rao', type: 'Emergency', startDate: '2026-08-18', endDate: '2026-08-18', days: 1, status: 'Approved', reason: 'Family Medical Emergency' },
  { id: 3, employee: 'Priya Nair', type: 'Annual', startDate: '2026-09-01', endDate: '2026-09-08', days: 8, status: 'Approved', reason: 'Holiday Travel' },
  { id: 4, employee: 'Sanjay Verma', type: 'Casual', startDate: '2026-08-20', endDate: '2026-08-20', days: 1, status: 'Pending', reason: 'Personal Work' },
  { id: 5, employee: 'Maya Singh', type: 'Maternity', startDate: '2026-09-15', endDate: '2026-12-15', days: 92, status: 'Pending', reason: 'Maternity Leave' },
  { id: 6, employee: 'Rajesh Kumar', type: 'Emergency', startDate: '2026-08-19', endDate: '2026-08-20', days: 2, status: 'Pending', reason: 'Urgent Family Matter' },
];

const leaveSummary = [
  { label: 'Annual', value: 2 },
  { label: 'Emergency', value: 2 },
  { label: 'Casual', value: 1 },
  { label: 'Maternity', value: 1 },
];

export default function LeavesPage() {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleNewRequest = () => {
    const newRequest = {
      id: Date.now(),
      employee: 'New Employee',
      type: 'Emergency',
      startDate: '2026-08-22',
      endDate: '2026-08-22',
      days: 1,
      status: 'Pending',
      reason: 'Urgent personal issue',
    };

    setLeaveRequests((prev) => [newRequest, ...prev]);
  };

  const handleEdit = (request) => {
    setEditingId(request.id);
    setEditData({ ...request });
  };

  const handleSaveEdit = () => {
    setLeaveRequests((prev) => prev.map((req) => (req.id === editingId ? editData : req)));
    setEditingId(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDeleteRequest = (id) => {
    setLeaveRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Leave Requests</h1>
        <button onClick={handleNewRequest}>New Request</button>
      </div>

      <div className="stats-strip">
        {leaveSummary.map((item) => (
          <div className="mini-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((item) => (
              <tr key={item.id}>
                {editingId === item.id ? (
                  <>
                    <td><input value={editData.employee} onChange={(e) => setEditData({ ...editData, employee: e.target.value })} /></td>
                    <td><input value={editData.type} onChange={(e) => setEditData({ ...editData, type: e.target.value })} /></td>
                    <td><input value={editData.startDate} onChange={(e) => setEditData({ ...editData, startDate: e.target.value })} /></td>
                    <td><input value={editData.endDate} onChange={(e) => setEditData({ ...editData, endDate: e.target.value })} /></td>
                    <td><input value={editData.days} onChange={(e) => setEditData({ ...editData, days: e.target.value })} /></td>
                    <td><input value={editData.reason} onChange={(e) => setEditData({ ...editData, reason: e.target.value })} /></td>
                    <td><input value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} /></td>
                    <td><button onClick={handleSaveEdit} style={{ marginRight: '8px' }}>Save</button><button onClick={handleCancelEdit} style={{ background: '#666' }}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{item.employee}</td>
                    <td><span className={`badge ${item.type.toLowerCase() === 'emergency' ? 'danger' : item.type.toLowerCase()}`}>{item.type}</span></td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.days}</td>
                    <td>{item.reason}</td>
                    <td><span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                    <td><button onClick={() => handleEdit(item)} style={{ marginRight: '6px', fontSize: '12px', padding: '4px 8px' }}>Edit</button><button onClick={() => handleDeleteRequest(item.id)} style={{ background: '#d32f2f', fontSize: '12px', padding: '4px 8px' }}>Delete</button></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
