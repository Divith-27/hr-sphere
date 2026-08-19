import { useState } from 'react';

const initialAttendance = [
  { id: 1, name: 'Aisha Khan', date: '2026-08-18', checkIn: '09:00 AM', checkOut: '06:30 PM', status: 'Present', hours: '9.5h' },
  { id: 2, name: 'Daniel Rao', date: '2026-08-18', checkIn: '09:15 AM', checkOut: '06:15 PM', status: 'Late', hours: '9h' },
  { id: 3, name: 'Priya Nair', date: '2026-08-18', checkIn: '-', checkOut: '-', status: 'Absent', hours: '0h' },
  { id: 4, name: 'Sanjay Verma', date: '2026-08-18', checkIn: '08:45 AM', checkOut: '06:45 PM', status: 'Present', hours: '10h' },
  { id: 5, name: 'Maya Singh', date: '2026-08-18', checkIn: '09:30 AM', checkOut: '05:30 PM', status: 'Present', hours: '8h' },
  { id: 6, name: 'Rajesh Kumar', date: '2026-08-18', checkIn: '-', checkOut: '-', status: 'On Leave', hours: '0h' },
];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleMarkAttendance = () => {
    const newEntry = {
      id: Date.now(),
      name: 'New Employee',
      date: '2026-08-18',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      status: 'Present',
      hours: '9h',
    };

    setAttendance((prev) => [newEntry, ...prev]);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSaveEdit = () => {
    setAttendance((prev) => prev.map((item) => (item.id === editingId ? editData : item)));
    setEditingId(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDeleteAttendance = (id) => {
    setAttendance((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Attendance</h1>
        <button onClick={handleMarkAttendance}>Mark Attendance</button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours Worked</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((item) => (
              <tr key={item.id}>
                {editingId === item.id ? (
                  <>
                    <td><input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /></td>
                    <td><input value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} /></td>
                    <td><input value={editData.checkIn} onChange={(e) => setEditData({ ...editData, checkIn: e.target.value })} /></td>
                    <td><input value={editData.checkOut} onChange={(e) => setEditData({ ...editData, checkOut: e.target.value })} /></td>
                    <td><input value={editData.hours} onChange={(e) => setEditData({ ...editData, hours: e.target.value })} /></td>
                    <td><input value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} /></td>
                    <td><button onClick={handleSaveEdit} style={{ marginRight: '8px' }}>Save</button><button onClick={handleCancelEdit} style={{ background: '#666' }}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.checkIn}</td>
                    <td>{item.checkOut}</td>
                    <td>{item.hours}</td>
                    <td><span className={`badge ${item.status.toLowerCase().replace(/\s/g, '')}`}>{item.status}</span></td>
                    <td><button onClick={() => handleEdit(item)} style={{ marginRight: '6px', fontSize: '12px', padding: '4px 8px' }}>Edit</button><button onClick={() => handleDeleteAttendance(item.id)} style={{ background: '#d32f2f', fontSize: '12px', padding: '4px 8px' }}>Delete</button></td>
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
