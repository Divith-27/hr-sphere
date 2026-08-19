import { useState } from 'react';

const initialOnboardingItems = [
  { id: 1, employee: 'Sanjay Verma', position: 'Backend Developer', department: 'Engineering', startDate: '2026-08-25', stage: 'Offer Accepted', status: 'In Progress' },
  { id: 2, employee: 'Maya Singh', position: 'Marketing Executive', department: 'Marketing', startDate: '2026-09-01', stage: 'Documents Verification', status: 'Pending' },
  { id: 3, employee: 'Vikram Desai', position: 'DevOps Engineer', department: 'Engineering', startDate: '2026-09-15', stage: 'Background Check', status: 'In Progress' },
  { id: 4, employee: 'Neha Patel', position: 'Data Analyst', department: 'Analytics', startDate: '2026-08-20', stage: 'IT Setup', status: 'In Progress' },
  { id: 5, employee: 'Arjun Sharma', position: 'Finance Manager', department: 'Finance', startDate: '2026-10-01', stage: 'Offer Pending', status: 'Pending' },
  { id: 6, employee: 'Isha Mittal', position: 'HR Coordinator', department: 'HR', startDate: '2026-08-18', stage: 'Training', status: 'Completed' },
];

export default function OnboardingPage() {
  const [onboardingItems, setOnboardingItems] = useState(initialOnboardingItems);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleAddCandidate = () => {
    const newCandidate = {
      id: Date.now(),
      employee: 'New Candidate',
      position: 'Operations Analyst',
      department: 'Operations',
      startDate: '2026-08-30',
      stage: 'Offer Pending',
      status: 'Pending',
    };

    setOnboardingItems((prev) => [newCandidate, ...prev]);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSaveEdit = () => {
    setOnboardingItems((prev) => prev.map((item) => (item.id === editingId ? editData : item)));
    setEditingId(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDeleteItem = (id) => {
    setOnboardingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Onboarding</h1>
        <button onClick={handleAddCandidate}>Add Candidate</button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Start Date</th>
              <th>Current Stage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {onboardingItems.map((item) => (
              <tr key={item.id}>
                {editingId === item.id ? (
                  <>
                    <td><input value={editData.employee} onChange={(e) => setEditData({ ...editData, employee: e.target.value })} /></td>
                    <td><input value={editData.position} onChange={(e) => setEditData({ ...editData, position: e.target.value })} /></td>
                    <td><input value={editData.department} onChange={(e) => setEditData({ ...editData, department: e.target.value })} /></td>
                    <td><input value={editData.startDate} onChange={(e) => setEditData({ ...editData, startDate: e.target.value })} /></td>
                    <td><input value={editData.stage} onChange={(e) => setEditData({ ...editData, stage: e.target.value })} /></td>
                    <td><input value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} /></td>
                    <td><button onClick={handleSaveEdit} style={{ marginRight: '8px' }}>Save</button><button onClick={handleCancelEdit} style={{ background: '#666' }}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{item.employee}</td>
                    <td>{item.position}</td>
                    <td>{item.department}</td>
                    <td>{item.startDate}</td>
                    <td>{item.stage}</td>
                    <td><span className={`badge ${item.status.toLowerCase().replace(/\s/g, '')}`}>{item.status}</span></td>
                    <td><button onClick={() => handleEdit(item)} style={{ marginRight: '6px', fontSize: '12px', padding: '4px 8px' }}>Edit</button><button onClick={() => handleDeleteItem(item.id)} style={{ background: '#d32f2f', fontSize: '12px', padding: '4px 8px' }}>Delete</button></td>
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
