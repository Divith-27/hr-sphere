import { useState } from 'react';

const initialEmployees = [
  { id: 1, name: 'Aisha Khan', email: 'aisha@hrsphere.com', department: 'Engineering', role: 'Frontend Developer', status: 'Active', joinDate: '2023-05-12' },
  { id: 2, name: 'Daniel Rao', email: 'daniel@hrsphere.com', department: 'HR', role: 'HR Manager', status: 'Active', joinDate: '2022-03-08' },
  { id: 3, name: 'Priya Nair', email: 'priya@hrsphere.com', department: 'Finance', role: 'Accountant', status: 'Active', joinDate: '2023-07-15' },
  { id: 4, name: 'Sanjay Verma', email: 'sanjay@hrsphere.com', department: 'Engineering', role: 'Backend Developer', status: 'Active', joinDate: '2024-01-20' },
  { id: 5, name: 'Maya Singh', email: 'maya@hrsphere.com', department: 'Marketing', role: 'Marketing Executive', status: 'Active', joinDate: '2023-11-10' },
  { id: 6, name: 'Rajesh Kumar', email: 'rajesh@hrsphere.com', department: 'Operations', role: 'Operations Lead', status: 'On Leave', joinDate: '2022-09-05' },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleAddEmployee = () => {
    const newEmployee = {
      id: Date.now(),
      name: 'New Employee',
      email: 'new.employee@hrsphere.com',
      department: 'Operations',
      role: 'HR Associate',
      status: 'Active',
      joinDate: '2026-08-18',
    };

    setEmployees((prev) => [newEmployee, ...prev]);
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setEditData({ ...employee });
  };

  const handleSaveEdit = () => {
    setEmployees((prev) => prev.map((emp) => (emp.id === editingId ? editData : emp)));
    setEditingId(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Employees</h1>
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                {editingId === employee.id ? (
                  <>
                    <td><input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /></td>
                    <td><input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} /></td>
                    <td><input value={editData.department} onChange={(e) => setEditData({ ...editData, department: e.target.value })} /></td>
                    <td><input value={editData.role} onChange={(e) => setEditData({ ...editData, role: e.target.value })} /></td>
                    <td><input value={editData.joinDate} onChange={(e) => setEditData({ ...editData, joinDate: e.target.value })} /></td>
                    <td><input value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} /></td>
                    <td><button onClick={handleSaveEdit} style={{ marginRight: '8px' }}>Save</button><button onClick={handleCancelEdit} style={{ background: '#666' }}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.role}</td>
                    <td>{employee.joinDate}</td>
                    <td><span className={`badge ${employee.status.toLowerCase().replace(/\s/g, '')}`}>{employee.status}</span></td>
                    <td><button onClick={() => handleEdit(employee)} style={{ marginRight: '6px', fontSize: '12px', padding: '4px 8px' }}>Edit</button><button onClick={() => handleDeleteEmployee(employee.id)} style={{ background: '#d32f2f', fontSize: '12px', padding: '4px 8px' }}>Delete</button></td>
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
