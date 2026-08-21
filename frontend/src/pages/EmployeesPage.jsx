import { useState, useEffect } from 'react';

const initialEmployees = [
  {
    id: 1,
    name: 'Aisha Khan',
    email: 'aisha@hrsphere.com',
    department: 'Engineering',
    role: 'Frontend Developer',
    status: 'Active',
    joinDate: '2023-05-12',
  },
  {
    id: 2,
    name: 'Daniel Rao',
    email: 'daniel@hrsphere.com',
    department: 'HR',
    role: 'HR Manager',
    status: 'Active',
    joinDate: '2022-03-08',
  },
  {
    id: 3,
    name: 'Priya Nair',
    email: 'priya@hrsphere.com',
    department: 'Finance',
    role: 'Accountant',
    status: 'Active',
    joinDate: '2023-07-15',
  },
  {
    id: 4,
    name: 'Sanjay Verma',
    email: 'sanjay@hrsphere.com',
    department: 'Engineering',
    role: 'Backend Developer',
    status: 'Active',
    joinDate: '2024-01-20',
  },
  {
    id: 5,
    name: 'Maya Singh',
    email: 'maya@hrsphere.com',
    department: 'Marketing',
    role: 'Marketing Executive',
    status: 'Active',
    joinDate: '2023-11-10',
  },
  {
    id: 6,
    name: 'Rajesh Kumar',
    email: 'rajesh@hrsphere.com',
    department: 'Operations',
    role: 'Operations Lead',
    status: 'On Leave',
    joinDate: '2022-09-05',
  },
];

const emptyEmployee = {
  name: '',
  email: '',
  department: '',
  role: '',
  status: 'Active',
  joinDate: '',
};

export default function EmployeesPage() {

  // ==========================================
  // EMPLOYEE DATA
  // ==========================================

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('hrsphere_employees');

    if (savedEmployees) {
      try {
        return JSON.parse(savedEmployees);
      } catch (error) {
        console.error('Error loading employees:', error);
        return initialEmployees;
      }
    }

    return initialEmployees;
  });

  // ==========================================
  // SAVE EMPLOYEES TO LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      'hrsphere_employees',
      JSON.stringify(employees)
    );
  }, [employees]);

  // ==========================================
  // ADD EMPLOYEE
  // ==========================================

  const [showAddForm, setShowAddForm] = useState(false);

  const [newEmployee, setNewEmployee] =
    useState(emptyEmployee);

  const handleOpenAddForm = () => {
    setNewEmployee(emptyEmployee);
    setShowAddForm(true);
  };

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;

    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmAdd = (e) => {
    e.preventDefault();

    // Check required fields
    if (
      !newEmployee.name.trim() ||
      !newEmployee.email.trim() ||
      !newEmployee.department ||
      !newEmployee.role.trim() ||
      !newEmployee.joinDate
    ) {
      alert('Please fill all employee details.');
      return;
    }

    // Email validation
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(newEmployee.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Create employee
    const employeeToAdd = {
      id: Date.now(),
      name: newEmployee.name.trim(),
      email: newEmployee.email.trim(),
      department: newEmployee.department,
      role: newEmployee.role.trim(),
      status: newEmployee.status,
      joinDate: newEmployee.joinDate,
    };

    // Add employee
    setEmployees((prev) => [
      employeeToAdd,
      ...prev,
    ]);

    // Reset form
    setNewEmployee(emptyEmployee);

    // Close popup
    setShowAddForm(false);

    alert('Employee added successfully!');
  };

  const handleCancelAdd = () => {
    setNewEmployee(emptyEmployee);
    setShowAddForm(false);
  };

  // ==========================================
  // EDIT EMPLOYEE
  // ==========================================

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({});

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setEditData({
      ...employee,
    });
  };

  const handleSaveEdit = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editingId
          ? editData
          : emp
      )
    );

    setEditingId(null);
    setEditData({});

    alert('Employee updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  // ==========================================
  // DELETE EMPLOYEE
  // ==========================================

  const handleDeleteEmployee = (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmDelete) {
      return;
    }

    setEmployees((prev) =>
      prev.filter((emp) => emp.id !== id)
    );

    alert('Employee deleted successfully!');
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="page">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <div className="page-header">

        <h1>Employees</h1>

        <button
          onClick={handleOpenAddForm}
        >
          Add Employee
        </button>

      </div>

      {/* ================================
          EMPLOYEE TABLE
      ================================= */}

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

            {employees.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign: 'center',
                    padding: '30px',
                    color: '#777',
                  }}
                >
                  No employees found.
                </td>

              </tr>

            ) : (

              employees.map((employee) => (

                <tr key={employee.id}>

                  {/* =========================
                      EDIT MODE
                  ========================== */}

                  {editingId === employee.id ? (

                    <>

                      <td>

                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              name: e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              email: e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <select
                          value={editData.department}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              department:
                                e.target.value,
                            })
                          }
                        >

                          <option value="Engineering">
                            Engineering
                          </option>

                          <option value="HR">
                            HR
                          </option>

                          <option value="Finance">
                            Finance
                          </option>

                          <option value="Marketing">
                            Marketing
                          </option>

                          <option value="Operations">
                            Operations
                          </option>

                        </select>

                      </td>

                      <td>

                        <input
                          type="text"
                          value={editData.role}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              role: e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="date"
                          value={editData.joinDate}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              joinDate:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <select
                          value={editData.status}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              status:
                                e.target.value,
                            })
                          }
                        >

                          <option value="Active">
                            Active
                          </option>

                          <option value="On Leave">
                            On Leave
                          </option>

                        </select>

                      </td>

                      <td>

                        <button
                          onClick={handleSaveEdit}
                          style={{
                            marginRight: '8px',
                          }}
                        >
                          Save
                        </button>

                        <button
                          onClick={handleCancelEdit}
                          style={{
                            background: '#666',
                          }}
                        >
                          Cancel
                        </button>

                      </td>

                    </>

                  ) : (

                    /* =========================
                       NORMAL MODE
                    ========================== */

                    <>

                      <td>
                        {employee.name}
                      </td>

                      <td>
                        {employee.email}
                      </td>

                      <td>
                        {employee.department}
                      </td>

                      <td>
                        {employee.role}
                      </td>

                      <td>
                        {employee.joinDate}
                      </td>

                      <td>

                        <span
                          className={`badge ${employee.status
                            .toLowerCase()
                            .replace(/\s/g, '')}`}
                        >
                          {employee.status}
                        </span>

                      </td>

                      <td>

                        <button
                          onClick={() =>
                            handleEdit(employee)
                          }
                          style={{
                            marginRight: '6px',
                            fontSize: '12px',
                            padding: '4px 8px',
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteEmployee(
                              employee.id
                            )
                          }
                          style={{
                            background: '#d32f2f',
                            fontSize: '12px',
                            padding: '4px 8px',
                          }}
                        >
                          Delete
                        </button>

                      </td>

                    </>

                  )}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* ==========================================
          ADD EMPLOYEE POPUP
      =========================================== */}

      {showAddForm && (

        <div className="employee-modal-overlay">

          <div className="employee-modal">

            {/* HEADER */}

            <div className="employee-modal-header">

              <div>

                <h2>
                  Add New Employee
                </h2>

                <p>
                  Enter the employee details below
                </p>

              </div>

              <button
                className="close-modal-btn"
                onClick={handleCancelAdd}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleConfirmAdd}
            >

              <div className="form-grid">

                {/* FULL NAME */}

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={newEmployee.name}
                    onChange={
                      handleNewEmployeeChange
                    }
                  />

                </div>

                {/* EMAIL */}

                <div className="form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="employee@hrsphere.com"
                    value={newEmployee.email}
                    onChange={
                      handleNewEmployeeChange
                    }
                  />

                </div>

                {/* DEPARTMENT */}

                <div className="form-group">

                  <label>
                    Department
                  </label>

                  <select
                    name="department"
                    value={
                      newEmployee.department
                    }
                    onChange={
                      handleNewEmployeeChange
                    }
                  >

                    <option value="">
                      Select Department
                    </option>

                    <option value="Engineering">
                      Engineering
                    </option>

                    <option value="HR">
                      HR
                    </option>

                    <option value="Finance">
                      Finance
                    </option>

                    <option value="Marketing">
                      Marketing
                    </option>

                    <option value="Operations">
                      Operations
                    </option>

                  </select>

                </div>

                {/* ROLE */}

                <div className="form-group">

                  <label>
                    Role
                  </label>

                  <input
                    type="text"
                    name="role"
                    placeholder="Enter employee role"
                    value={newEmployee.role}
                    onChange={
                      handleNewEmployeeChange
                    }
                  />

                </div>

                {/* JOIN DATE */}

                <div className="form-group">

                  <label>
                    Join Date
                  </label>

                  <input
                    type="date"
                    name="joinDate"
                    value={
                      newEmployee.joinDate
                    }
                    onChange={
                      handleNewEmployeeChange
                    }
                  />

                </div>

                {/* STATUS */}

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={newEmployee.status}
                    onChange={
                      handleNewEmployeeChange
                    }
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="On Leave">
                      On Leave
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="employee-modal-actions">

                <button
                  type="button"
                  className="cancel-add-btn"
                  onClick={handleCancelAdd}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="confirm-add-btn"
                >
                  Confirm & Add Employee
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ==========================================
          MODAL CSS
      =========================================== */}

      <style>{`

        .employee-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 20px;
        }

        .employee-modal {
          width: 100%;
          max-width: 650px;
          background: #ffffff;
          border-radius: 16px;
          padding: 28px;
          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.25);
          animation: employeeModalOpen
            0.2s ease-out;
        }

        @keyframes employeeModalOpen {

          from {
            opacity: 0;
            transform:
              translateY(-15px)
              scale(0.98);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }

        }

        .employee-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
          border-bottom:
            1px solid #e5e7eb;
          padding-bottom: 18px;
        }

        .employee-modal-header h2 {
          margin: 0;
          font-size: 24px;
          color: #172033;
        }

        .employee-modal-header p {
          margin: 6px 0 0;
          color: #6b7280;
          font-size: 14px;
        }

        .close-modal-btn {
          width: 34px;
          height: 34px;
          border: none;
          background: #f1f5f9;
          color: #475569;
          border-radius: 50%;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
        }

        .close-modal-btn:hover {
          background: #e2e8f0;
        }

        .form-grid {
          display: grid;
          grid-template-columns:
            1fr 1fr;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          height: 44px;
          padding: 0 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #ffffff;
          color: #1f2937;
          font-size: 14px;
          outline: none;
          transition: 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #2563eb;
          box-shadow:
            0 0 0 3px
            rgba(37, 99, 235, 0.12);
        }

        .form-group input::placeholder {
          color: #9ca3af;
        }

        .employee-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 28px;
          padding-top: 20px;
          border-top:
            1px solid #e5e7eb;
        }

        .cancel-add-btn,
        .confirm-add-btn {
          height: 42px;
          padding: 0 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .cancel-add-btn {
          background: #f1f5f9;
          color: #475569;
          border:
            1px solid #d1d5db;
        }

        .cancel-add-btn:hover {
          background: #e2e8f0;
        }

        .confirm-add-btn {
          background: #2563eb;
          color: white;
          border: none;
        }

        .confirm-add-btn:hover {
          background: #1d4ed8;
        }

        @media (max-width: 650px) {

          .employee-modal {
            padding: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .employee-modal-actions {
            flex-direction: column;
          }

          .cancel-add-btn,
          .confirm-add-btn {
            width: 100%;
          }

        }

      `}</style>

    </div>
  );
}