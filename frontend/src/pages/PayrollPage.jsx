import { useState } from 'react';

const initialPayrollData = [
  { id: 1, employee: 'Aisha Khan', month: 'August', basicSalary: 5000, allowances: 800, deductions: 600, netSalary: 5200, status: 'Processed' },
  { id: 2, employee: 'Daniel Rao', month: 'August', basicSalary: 6000, allowances: 1000, deductions: 800, netSalary: 6200, status: 'Processed' },
  { id: 3, employee: 'Priya Nair', month: 'August', basicSalary: 5500, allowances: 900, deductions: 700, netSalary: 5700, status: 'Processed' },
  { id: 4, employee: 'Sanjay Verma', month: 'August', basicSalary: 5200, allowances: 750, deductions: 650, netSalary: 5300, status: 'Pending' },
  { id: 5, employee: 'Maya Singh', month: 'August', basicSalary: 4800, allowances: 700, deductions: 550, netSalary: 4950, status: 'Pending' },
  { id: 6, employee: 'Rajesh Kumar', month: 'August', basicSalary: 6500, allowances: 1200, deductions: 900, netSalary: 6800, status: 'Processed' },
];

export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState(initialPayrollData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleRunPayroll = () => {
    setPayrollData((prev) =>
      prev.map((item) =>
        item.status === 'Pending'
          ? { ...item, status: 'Processed', netSalary: item.netSalary + 50 }
          : item
      )
    );
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSaveEdit = () => {
    setPayrollData((prev) => prev.map((item) => (item.id === editingId ? editData : item)));
    setEditingId(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDeletePayroll = (id) => {
    setPayrollData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Payroll</h1>
        <button onClick={handleRunPayroll}>Run Payroll</button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Month</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((item) => (
              <tr key={item.id}>
                {editingId === item.id ? (
                  <>
                    <td><input value={editData.employee} onChange={(e) => setEditData({ ...editData, employee: e.target.value })} /></td>
                    <td><input value={editData.month} onChange={(e) => setEditData({ ...editData, month: e.target.value })} /></td>
                    <td><input type="number" value={editData.basicSalary} onChange={(e) => setEditData({ ...editData, basicSalary: parseInt(e.target.value) })} /></td>
                    <td><input type="number" value={editData.allowances} onChange={(e) => setEditData({ ...editData, allowances: parseInt(e.target.value) })} /></td>
                    <td><input type="number" value={editData.deductions} onChange={(e) => setEditData({ ...editData, deductions: parseInt(e.target.value) })} /></td>
                    <td><input type="number" value={editData.netSalary} onChange={(e) => setEditData({ ...editData, netSalary: parseInt(e.target.value) })} /></td>
                    <td><input value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} /></td>
                    <td><button onClick={handleSaveEdit} style={{ marginRight: '8px' }}>Save</button><button onClick={handleCancelEdit} style={{ background: '#666' }}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{item.employee}</td>
                    <td>{item.month}</td>
                    <td>${item.basicSalary}</td>
                    <td>${item.allowances}</td>
                    <td>${item.deductions}</td>
                    <td><strong>${item.netSalary}</strong></td>
                    <td><span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                    <td><button onClick={() => handleEdit(item)} style={{ marginRight: '6px', fontSize: '12px', padding: '4px 8px' }}>Edit</button><button onClick={() => handleDeletePayroll(item.id)} style={{ background: '#d32f2f', fontSize: '12px', padding: '4px 8px' }}>Delete</button></td>
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
