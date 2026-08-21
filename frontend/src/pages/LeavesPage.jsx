import { useState, useEffect } from 'react';

const initialLeaveRequests = [
  {
    id: 1,
    employee: 'Aisha Khan',
    type: 'Annual',
    startDate: '2026-08-20',
    endDate: '2026-08-22',
    days: 3,
    status: 'Pending',
    reason: 'Family Vacation',
  },
  {
    id: 2,
    employee: 'Daniel Rao',
    type: 'Emergency',
    startDate: '2026-08-18',
    endDate: '2026-08-18',
    days: 1,
    status: 'Approved',
    reason: 'Family Medical Emergency',
  },
  {
    id: 3,
    employee: 'Priya Nair',
    type: 'Annual',
    startDate: '2026-09-01',
    endDate: '2026-09-08',
    days: 8,
    status: 'Approved',
    reason: 'Holiday Travel',
  },
  {
    id: 4,
    employee: 'Sanjay Verma',
    type: 'Casual',
    startDate: '2026-08-20',
    endDate: '2026-08-20',
    days: 1,
    status: 'Pending',
    reason: 'Personal Work',
  },
  {
    id: 5,
    employee: 'Maya Singh',
    type: 'Maternity',
    startDate: '2026-09-15',
    endDate: '2026-12-15',
    days: 92,
    status: 'Pending',
    reason: 'Maternity Leave',
  },
  {
    id: 6,
    employee: 'Rajesh Kumar',
    type: 'Emergency',
    startDate: '2026-08-19',
    endDate: '2026-08-20',
    days: 2,
    status: 'Pending',
    reason: 'Urgent Family Matter',
  },
];

// ==========================================
// EMPLOYEE LIST
// ==========================================

const employees = [
  'Aisha Khan',
  'Daniel Rao',
  'Priya Nair',
  'Sanjay Verma',
  'Maya Singh',
  'Rajesh Kumar',
  'New Employee',
];

// ==========================================
// GET TODAY'S DATE
// ==========================================

const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(
    today.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    today.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// ==========================================
// CALCULATE LEAVE DAYS
// ==========================================

const calculateDays = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(
    `${startDate}T00:00:00`
  );

  const end = new Date(
    `${endDate}T00:00:00`
  );

  if (end < start) {
    return 0;
  }

  const difference =
    end.getTime() - start.getTime();

  return (
    Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ) + 1
  );
};

export default function LeavesPage() {

  // ==========================================
  // LOAD SAVED LEAVE REQUESTS
  // ==========================================

  const [leaveRequests, setLeaveRequests] =
    useState(() => {

      const savedLeaves =
        localStorage.getItem(
          'hrsphere_leaves'
        );

      if (savedLeaves) {
        try {
          return JSON.parse(savedLeaves);
        } catch (error) {
          console.error(
            'Error loading leave requests:',
            error
          );

          return initialLeaveRequests;
        }
      }

      return initialLeaveRequests;
    });

  // ==========================================
  // SAVE LEAVE REQUESTS
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      'hrsphere_leaves',
      JSON.stringify(leaveRequests)
    );

  }, [leaveRequests]);

  // ==========================================
  // EDIT STATE
  // ==========================================

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({});

  // ==========================================
  // NEW LEAVE FORM STATE
  // ==========================================

  const [showLeaveForm, setShowLeaveForm] =
    useState(false);

  const [leaveForm, setLeaveForm] =
    useState({
      employee: '',
      type: 'Annual',
      startDate: getToday(),
      endDate: getToday(),
      status: 'Pending',
      reason: '',
    });

  // ==========================================
  // OPEN NEW REQUEST FORM
  // ==========================================

  const handleNewRequest = () => {

    setLeaveForm({
      employee: '',
      type: 'Annual',
      startDate: getToday(),
      endDate: getToday(),
      status: 'Pending',
      reason: '',
    });

    setShowLeaveForm(true);
  };

  // ==========================================
  // CANCEL NEW REQUEST
  // ==========================================

  const handleCancelLeave = () => {

    setShowLeaveForm(false);

    setLeaveForm({
      employee: '',
      type: 'Annual',
      startDate: getToday(),
      endDate: getToday(),
      status: 'Pending',
      reason: '',
    });
  };

  // ==========================================
  // HANDLE FORM CHANGE
  // ==========================================

  const handleLeaveFormChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setLeaveForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // CONFIRM LEAVE
  // ==========================================

  const handleConfirmLeave = () => {

    // Employee validation
    if (!leaveForm.employee) {
      alert(
        'Please select an employee.'
      );

      return;
    }

    // Start date validation
    if (!leaveForm.startDate) {
      alert(
        'Please select the start date.'
      );

      return;
    }

    // End date validation
    if (!leaveForm.endDate) {
      alert(
        'Please select the end date.'
      );

      return;
    }

    // Reason validation
    if (!leaveForm.reason.trim()) {
      alert(
        'Please enter the reason for leave.'
      );

      return;
    }

    // Date validation
    const days = calculateDays(
      leaveForm.startDate,
      leaveForm.endDate
    );

    if (days <= 0) {
      alert(
        'End date cannot be before start date.'
      );

      return;
    }

    // ==========================================
    // CREATE NEW LEAVE REQUEST
    // ==========================================

    const newRequest = {
      id: Date.now(),

      employee:
        leaveForm.employee,

      type:
        leaveForm.type,

      startDate:
        leaveForm.startDate,

      endDate:
        leaveForm.endDate,

      days: days,

      status:
        leaveForm.status,

      reason:
        leaveForm.reason.trim(),
    };

    // ==========================================
    // ADD ONLY AFTER CONFIRM
    // ==========================================

    setLeaveRequests((prev) => [
      newRequest,
      ...prev,
    ]);

    // Close form
    setShowLeaveForm(false);

    // Reset form
    setLeaveForm({
      employee: '',
      type: 'Annual',
      startDate: getToday(),
      endDate: getToday(),
      status: 'Pending',
      reason: '',
    });

    alert(
      'Leave request submitted successfully!'
    );
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (request) => {

    setEditingId(request.id);

    setEditData({
      ...request,
    });
  };

  // ==========================================
  // SAVE EDIT
  // ==========================================

  const handleSaveEdit = () => {

    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === editingId
          ? editData
          : req
      )
    );

    setEditingId(null);

    setEditData({});

    alert(
      'Leave request updated successfully!'
    );
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancelEdit = () => {

    setEditingId(null);

    setEditData({});
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDeleteRequest = (id) => {

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this leave request?'
      );

    if (!confirmDelete) {
      return;
    }

    setLeaveRequests((prev) =>
      prev.filter(
        (req) => req.id !== id
      )
    );

    alert(
      'Leave request deleted successfully!'
    );
  };

  // ==========================================
  // LEAVE SUMMARY
  // ==========================================

  const leaveSummary = [
    {
      label: 'Annual',
      value: leaveRequests.filter(
        (item) =>
          item.type === 'Annual'
      ).length,
    },
    {
      label: 'Emergency',
      value: leaveRequests.filter(
        (item) =>
          item.type === 'Emergency'
      ).length,
    },
    {
      label: 'Casual',
      value: leaveRequests.filter(
        (item) =>
          item.type === 'Casual'
      ).length,
    },
    {
      label: 'Maternity',
      value: leaveRequests.filter(
        (item) =>
          item.type === 'Maternity'
      ).length,
    },
  ];

  // ==========================================
  // PREVIEW DAYS
  // ==========================================

  const previewDays =
    calculateDays(
      leaveForm.startDate,
      leaveForm.endDate
    );

  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="page">

      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <div className="page-header">

        <h1>
          Leave Requests
        </h1>

        <button
          onClick={handleNewRequest}
        >
          New Request
        </button>

      </div>

      {/* ======================================
          LEAVE SUMMARY
      ======================================= */}

      <div className="stats-strip">

        {leaveSummary.map((item) => (

          <div
            className="mini-card"
            key={item.label}
          >

            <span>
              {item.label}
            </span>

            <strong>
              {item.value}
            </strong>

          </div>

        ))}

      </div>

      {/* ======================================
          LEAVE TABLE
      ======================================= */}

      <div className="card">

        <table className="table">

          <thead>

            <tr>

              <th>
                Employee
              </th>

              <th>
                Type
              </th>

              <th>
                Start Date
              </th>

              <th>
                End Date
              </th>

              <th>
                Days
              </th>

              <th>
                Reason
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {leaveRequests.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign: 'center',
                    padding: '30px',
                    color: '#777',
                  }}
                >
                  No leave requests found.
                </td>

              </tr>

            ) : (

              leaveRequests.map((item) => (

                <tr key={item.id}>

                  {/* =================================
                      EDIT MODE
                  ================================== */}

                  {editingId === item.id ? (

                    <>

                      <td>

                        <input
                          type="text"
                          value={
                            editData.employee
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              employee:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <select
                          value={
                            editData.type
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              type:
                                e.target.value,
                            })
                          }
                        >

                          <option value="Annual">
                            Annual
                          </option>

                          <option value="Emergency">
                            Emergency
                          </option>

                          <option value="Casual">
                            Casual
                          </option>

                          <option value="Maternity">
                            Maternity
                          </option>

                        </select>

                      </td>

                      <td>

                        <input
                          type="date"
                          value={
                            editData.startDate
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              startDate:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="date"
                          value={
                            editData.endDate
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              endDate:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="number"
                          value={
                            editData.days
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              days:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="text"
                          value={
                            editData.reason
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              reason:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <select
                          value={
                            editData.status
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              status:
                                e.target.value,
                            })
                          }
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Approved">
                            Approved
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>

                        </select>

                      </td>

                      <td>

                        <button
                          onClick={
                            handleSaveEdit
                          }
                          style={{
                            marginRight:
                              '8px',
                          }}
                        >
                          Save
                        </button>

                        <button
                          onClick={
                            handleCancelEdit
                          }
                          style={{
                            background:
                              '#666',
                          }}
                        >
                          Cancel
                        </button>

                      </td>

                    </>

                  ) : (

                    /* =================================
                       NORMAL MODE
                    ================================== */

                    <>

                      <td>
                        {item.employee}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            item.type
                              .toLowerCase() ===
                            'emergency'
                              ? 'danger'
                              : item.type.toLowerCase()
                          }`}
                        >
                          {item.type}
                        </span>

                      </td>

                      <td>
                        {item.startDate}
                      </td>

                      <td>
                        {item.endDate}
                      </td>

                      <td>
                        {item.days}
                      </td>

                      <td>
                        {item.reason}
                      </td>

                      <td>

                        <span
                          className={`badge ${item.status
                            .toLowerCase()}`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td>

                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          style={{
                            marginRight:
                              '6px',
                            fontSize:
                              '12px',
                            padding:
                              '4px 8px',
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteRequest(
                              item.id
                            )
                          }
                          style={{
                            background:
                              '#d32f2f',
                            fontSize:
                              '12px',
                            padding:
                              '4px 8px',
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

      {/* =================================================
          NEW LEAVE REQUEST MODAL
      ================================================== */}

      {showLeaveForm && (

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'rgba(15, 23, 42, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >

          <div
            style={{
              width: '100%',
              maxWidth: '550px',
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow:
                '0 20px 60px rgba(0,0,0,0.25)',
              overflow: 'hidden',
            }}
          >

            {/* ==========================================
                MODAL HEADER
            =========================================== */}

            <div
              style={{
                padding:
                  '22px 26px',
                borderBottom:
                  '1px solid #e5e7eb',
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
              }}
            >

              <div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: '22px',
                    color: '#111827',
                  }}
                >
                  New Leave Request
                </h2>

                <p
                  style={{
                    margin:
                      '5px 0 0',
                    color: '#6b7280',
                    fontSize: '13px',
                  }}
                >
                  Enter leave details
                  before confirming.
                </p>

              </div>

              <button
                onClick={
                  handleCancelLeave
                }
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius:
                    '50%',
                  border: 'none',
                  background:
                    '#f3f4f6',
                  color: '#374151',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                ×
              </button>

            </div>

            {/* ==========================================
                MODAL BODY
            =========================================== */}

            <div
              style={{
                padding:
                  '25px 26px',
              }}
            >

              {/* EMPLOYEE */}

              <div
                style={{
                  marginBottom:
                    '18px',
                }}
              >

                <label
                  style={{
                    display:
                      'block',
                    marginBottom:
                      '7px',
                    fontSize:
                      '14px',
                    fontWeight:
                      '600',
                    color:
                      '#374151',
                  }}
                >
                  Employee
                </label>

                <select
                  name="employee"
                  value={
                    leaveForm.employee
                  }
                  onChange={
                    handleLeaveFormChange
                  }
                  style={{
                    width:
                      '100%',
                    padding:
                      '11px 12px',
                    border:
                      '1px solid #d1d5db',
                    borderRadius:
                      '8px',
                    fontSize:
                      '14px',
                    outline:
                      'none',
                    background:
                      '#fff',
                    boxSizing:
                      'border-box',
                  }}
                >

                  <option value="">
                    Select Employee
                  </option>

                  {employees.map(
                    (employee) => (

                      <option
                        key={
                          employee
                        }
                        value={
                          employee
                        }
                      >
                        {employee}
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* LEAVE TYPE */}

              <div
                style={{
                  marginBottom:
                    '18px',
                }}
              >

                <label
                  style={{
                    display:
                      'block',
                    marginBottom:
                      '7px',
                    fontSize:
                      '14px',
                    fontWeight:
                      '600',
                    color:
                      '#374151',
                  }}
                >
                  Leave Type
                </label>

                <select
                  name="type"
                  value={
                    leaveForm.type
                  }
                  onChange={
                    handleLeaveFormChange
                  }
                  style={{
                    width:
                      '100%',
                    padding:
                      '11px 12px',
                    border:
                      '1px solid #d1d5db',
                    borderRadius:
                      '8px',
                    fontSize:
                      '14px',
                    outline:
                      'none',
                    background:
                      '#fff',
                    boxSizing:
                      'border-box',
                  }}
                >

                  <option value="Annual">
                    Annual
                  </option>

                  <option value="Emergency">
                    Emergency
                  </option>

                  <option value="Casual">
                    Casual
                  </option>

                  <option value="Maternity">
                    Maternity
                  </option>

                </select>

              </div>

              {/* START DATE / END DATE */}

              <div
                style={{
                  display:
                    'grid',
                  gridTemplateColumns:
                    '1fr 1fr',
                  gap: '15px',
                  marginBottom:
                    '18px',
                }}
              >

                <div>

                  <label
                    style={{
                      display:
                        'block',
                      marginBottom:
                        '7px',
                      fontSize:
                        '14px',
                      fontWeight:
                        '600',
                      color:
                        '#374151',
                    }}
                  >
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={
                      leaveForm.startDate
                    }
                    onChange={
                      handleLeaveFormChange
                    }
                    style={{
                      width:
                        '100%',
                      padding:
                        '11px 12px',
                      border:
                        '1px solid #d1d5db',
                      borderRadius:
                        '8px',
                      fontSize:
                        '14px',
                      outline:
                        'none',
                      boxSizing:
                        'border-box',
                    }}
                  />

                </div>

                <div>

                  <label
                    style={{
                      display:
                        'block',
                      marginBottom:
                        '7px',
                      fontSize:
                        '14px',
                      fontWeight:
                        '600',
                      color:
                        '#374151',
                    }}
                  >
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={
                      leaveForm.endDate
                    }
                    min={
                      leaveForm.startDate
                    }
                    onChange={
                      handleLeaveFormChange
                    }
                    style={{
                      width:
                        '100%',
                      padding:
                        '11px 12px',
                      border:
                        '1px solid #d1d5db',
                      borderRadius:
                        '8px',
                      fontSize:
                        '14px',
                      outline:
                        'none',
                      boxSizing:
                        'border-box',
                    }}
                  />

                </div>

              </div>

              {/* DAYS PREVIEW */}

              <div
                style={{
                  background:
                    '#eff6ff',
                  border:
                    '1px solid #bfdbfe',
                  borderRadius:
                    '10px',
                  padding:
                    '12px 15px',
                  marginBottom:
                    '18px',
                  display:
                    'flex',
                  justifyContent:
                    'space-between',
                  alignItems:
                    'center',
                }}
              >

                <span
                  style={{
                    fontSize:
                      '14px',
                    color:
                      '#475569',
                    fontWeight:
                      '500',
                  }}
                >
                  Total Leave Days
                </span>

                <strong
                  style={{
                    fontSize:
                      '18px',
                    color:
                      '#2563eb',
                  }}
                >
                  {previewDays}{' '}
                  {previewDays ===
                  1
                    ? 'Day'
                    : 'Days'}
                </strong>

              </div>

              {/* REASON */}

              <div
                style={{
                  marginBottom:
                    '18px',
                }}
              >

                <label
                  style={{
                    display:
                      'block',
                    marginBottom:
                      '7px',
                    fontSize:
                      '14px',
                    fontWeight:
                      '600',
                    color:
                      '#374151',
                  }}
                >
                  Reason
                </label>

                <textarea
                  name="reason"
                  value={
                    leaveForm.reason
                  }
                  onChange={
                    handleLeaveFormChange
                  }
                  placeholder="Enter reason for leave"
                  rows="3"
                  style={{
                    width:
                      '100%',
                    padding:
                      '11px 12px',
                    border:
                      '1px solid #d1d5db',
                    borderRadius:
                      '8px',
                    fontSize:
                      '14px',
                    outline:
                      'none',
                    resize:
                      'vertical',
                    boxSizing:
                      'border-box',
                    fontFamily:
                      'inherit',
                  }}
                />

              </div>

              {/* STATUS */}

              <div
                style={{
                  marginBottom:
                    '20px',
                }}
              >

                <label
                  style={{
                    display:
                      'block',
                    marginBottom:
                      '7px',
                    fontSize:
                      '14px',
                    fontWeight:
                      '600',
                    color:
                      '#374151',
                  }}
                >
                  Status
                </label>

                <select
                  name="status"
                  value={
                    leaveForm.status
                  }
                  onChange={
                    handleLeaveFormChange
                  }
                  style={{
                    width:
                      '100%',
                    padding:
                      '11px 12px',
                    border:
                      '1px solid #d1d5db',
                    borderRadius:
                      '8px',
                    fontSize:
                      '14px',
                    outline:
                      'none',
                    background:
                      '#fff',
                    boxSizing:
                      'border-box',
                  }}
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

              {/* PREVIEW */}

              {leaveForm.employee && (

                <div
                  style={{
                    background:
                      '#f8fafc',
                    border:
                      '1px solid #e2e8f0',
                    borderRadius:
                      '10px',
                    padding:
                      '14px',
                    marginBottom:
                      '20px',
                  }}
                >

                  <div
                    style={{
                      fontSize:
                        '12px',
                      color:
                        '#64748b',
                      marginBottom:
                        '7px',
                    }}
                  >
                    Leave Request Preview
                  </div>

                  <div
                    style={{
                      display:
                        'flex',
                      justifyContent:
                        'space-between',
                      alignItems:
                        'center',
                    }}
                  >

                    <strong
                      style={{
                        color:
                          '#1e293b',
                      }}
                    >
                      {
                        leaveForm.employee
                      }
                    </strong>

                    <span
                      style={{
                        fontWeight:
                          '600',
                        color:
                          leaveForm.status ===
                          'Approved'
                            ? '#15803d'
                            : leaveForm.status ===
                              'Rejected'
                            ? '#dc2626'
                            : '#d97706',
                      }}
                    >
                      {
                        leaveForm.status
                      }
                    </span>

                  </div>

                  <div
                    style={{
                      marginTop:
                        '8px',
                      fontSize:
                        '13px',
                      color:
                        '#64748b',
                    }}
                  >
                    {
                      leaveForm.type
                    }{' '}
                    •{' '}
                    {
                      leaveForm.startDate
                    }{' '}
                    →{' '}
                    {
                      leaveForm.endDate
                    }{' '}
                    •{' '}
                    {previewDays}{' '}
                    {previewDays ===
                    1
                      ? 'day'
                      : 'days'}
                  </div>

                </div>

              )}

              {/* ======================================
                  BUTTONS
              ======================================= */}

              <div
                style={{
                  display:
                    'flex',
                  justifyContent:
                    'flex-end',
                  gap: '10px',
                }}
              >

                <button
                  onClick={
                    handleCancelLeave
                  }
                  style={{
                    padding:
                      '11px 20px',
                    borderRadius:
                      '8px',
                    border:
                      '1px solid #d1d5db',
                    background:
                      '#fff',
                    color:
                      '#374151',
                    fontSize:
                      '14px',
                    fontWeight:
                      '600',
                    cursor:
                      'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleConfirmLeave
                  }
                  style={{
                    padding:
                      '11px 20px',
                    borderRadius:
                      '8px',
                    border:
                      'none',
                    background:
                      '#2563eb',
                    color:
                      '#fff',
                    fontSize:
                      '14px',
                    fontWeight:
                      '600',
                    cursor:
                      'pointer',
                  }}
                >
                  Confirm Leave
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}