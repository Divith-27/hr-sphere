import { useState, useEffect } from 'react';

const initialAttendance = [
  {
    id: 1,
    name: 'Aisha Khan',
    date: '2026-08-18',
    checkIn: '09:00 AM',
    checkOut: '06:30 PM',
    status: 'Present',
    hours: '9.5h',
  },
  {
    id: 2,
    name: 'Daniel Rao',
    date: '2026-08-18',
    checkIn: '09:15 AM',
    checkOut: '06:15 PM',
    status: 'Late',
    hours: '9h',
  },
  {
    id: 3,
    name: 'Priya Nair',
    date: '2026-08-18',
    checkIn: '-',
    checkOut: '-',
    status: 'Absent',
    hours: '0h',
  },
  {
    id: 4,
    name: 'Sanjay Verma',
    date: '2026-08-18',
    checkIn: '08:45 AM',
    checkOut: '06:45 PM',
    status: 'Present',
    hours: '10h',
  },
  {
    id: 5,
    name: 'Maya Singh',
    date: '2026-08-18',
    checkIn: '09:30 AM',
    checkOut: '05:30 PM',
    status: 'Present',
    hours: '8h',
  },
  {
    id: 6,
    name: 'Rajesh Kumar',
    date: '2026-08-18',
    checkIn: '-',
    checkOut: '-',
    status: 'On Leave',
    hours: '0h',
  },
];

// Employee list for attendance form
const employees = [
  'Aisha Khan',
  'Daniel Rao',
  'Priya Nair',
  'Sanjay Verma',
  'Maya Singh',
  'Rajesh Kumar',
  'New Employee',
];

// Get today's date
const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// Convert 24-hour time to AM/PM
const formatTime = (time) => {
  if (!time) return '-';

  const [hours, minutes] = time.split(':');

  let hour = parseInt(hours, 10);

  const period = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  return `${String(hour).padStart(2, '0')}:${minutes} ${period}`;
};

// Calculate hours between check-in and check-out
const calculateHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) {
    return '0h';
  }

  const [inHour, inMinute] = checkIn
    .split(':')
    .map(Number);

  const [outHour, outMinute] = checkOut
    .split(':')
    .map(Number);

  const startMinutes =
    inHour * 60 + inMinute;

  const endMinutes =
    outHour * 60 + outMinute;

  let difference =
    endMinutes - startMinutes;

  // Handles overnight shift
  if (difference < 0) {
    difference += 24 * 60;
  }

  const hours = difference / 60;

  if (Number.isInteger(hours)) {
    return `${hours}h`;
  }

  return `${hours.toFixed(1)}h`;
};

export default function AttendancePage() {

  // ==========================================
  // LOAD ATTENDANCE DATA
  // ==========================================

  const [attendance, setAttendance] = useState(() => {
    const savedAttendance =
      localStorage.getItem('hrsphere_attendance');

    if (savedAttendance) {
      try {
        return JSON.parse(savedAttendance);
      } catch (error) {
        console.error(
          'Error loading attendance:',
          error
        );

        return initialAttendance;
      }
    }

    return initialAttendance;
  });

  // ==========================================
  // SAVE ATTENDANCE DATA
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      'hrsphere_attendance',
      JSON.stringify(attendance)
    );
  }, [attendance]);

  // ==========================================
  // EDIT DATA
  // ==========================================

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({});

  // ==========================================
  // ADD ATTENDANCE FORM
  // ==========================================

  const [showAttendanceForm, setShowAttendanceForm] =
    useState(false);

  const [attendanceForm, setAttendanceForm] =
    useState({
      name: '',
      date: getToday(),
      checkIn: '',
      checkOut: '',
      status: 'Present',
    });

  // ==========================================
  // OPEN ATTENDANCE FORM
  // ==========================================

  const handleMarkAttendance = () => {
    setAttendanceForm({
      name: '',
      date: getToday(),
      checkIn: '',
      checkOut: '',
      status: 'Present',
    });

    setShowAttendanceForm(true);
  };

  // ==========================================
  // CLOSE ATTENDANCE FORM
  // ==========================================

  const handleCancelAttendance = () => {
    setShowAttendanceForm(false);

    setAttendanceForm({
      name: '',
      date: getToday(),
      checkIn: '',
      checkOut: '',
      status: 'Present',
    });
  };

  // ==========================================
  // HANDLE FORM CHANGE
  // ==========================================

  const handleAttendanceFormChange = (e) => {
    const { name, value } = e.target;

    setAttendanceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // CONFIRM ATTENDANCE
  // ==========================================

  const handleConfirmAttendance = () => {

    // Validation
    if (!attendanceForm.name) {
      alert('Please select an employee.');
      return;
    }

    if (!attendanceForm.date) {
      alert('Please select a date.');
      return;
    }

    // Present / Late requires check-in and check-out
    if (
      (attendanceForm.status === 'Present' ||
        attendanceForm.status === 'Late') &&
      (!attendanceForm.checkIn ||
        !attendanceForm.checkOut)
    ) {
      alert(
        'Please enter Check In and Check Out time.'
      );
      return;
    }

    // Absent / On Leave
    const isAbsentOrLeave =
      attendanceForm.status === 'Absent' ||
      attendanceForm.status === 'On Leave';

    const newEntry = {
      id: Date.now(),

      name: attendanceForm.name,

      date: attendanceForm.date,

      checkIn: isAbsentOrLeave
        ? '-'
        : formatTime(attendanceForm.checkIn),

      checkOut: isAbsentOrLeave
        ? '-'
        : formatTime(attendanceForm.checkOut),

      status: attendanceForm.status,

      hours: isAbsentOrLeave
        ? '0h'
        : calculateHours(
            attendanceForm.checkIn,
            attendanceForm.checkOut
          ),
    };

    // Add new record
    setAttendance((prev) => [
      newEntry,
      ...prev,
    ]);

    // Close form
    setShowAttendanceForm(false);

    // Reset form
    setAttendanceForm({
      name: '',
      date: getToday(),
      checkIn: '',
      checkOut: '',
      status: 'Present',
    });

    alert(
      'Attendance marked successfully!'
    );
  };

  // ==========================================
  // EDIT ATTENDANCE
  // ==========================================

  const handleEdit = (item) => {

    setEditingId(item.id);

    setEditData({
      ...item,
    });
  };

  // ==========================================
  // SAVE EDIT
  // ==========================================

  const handleSaveEdit = () => {

    setAttendance((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? editData
          : item
      )
    );

    setEditingId(null);

    setEditData({});

    alert(
      'Attendance updated successfully!'
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
  // DELETE ATTENDANCE
  // ==========================================

  const handleDeleteAttendance = (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this attendance record?'
    );

    if (!confirmDelete) {
      return;
    }

    setAttendance((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    alert(
      'Attendance record deleted successfully!'
    );
  };

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
          Attendance
        </h1>

        <button
          onClick={handleMarkAttendance}
        >
          Mark Attendance
        </button>

      </div>

      {/* ======================================
          ATTENDANCE TABLE
      ======================================= */}

      <div className="card">

        <table className="table">

          <thead>

            <tr>

              <th>
                Name
              </th>

              <th>
                Date
              </th>

              <th>
                Check In
              </th>

              <th>
                Check Out
              </th>

              <th>
                Hours Worked
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

            {attendance.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign: 'center',
                    padding: '30px',
                    color: '#777',
                  }}
                >
                  No attendance records found.
                </td>

              </tr>

            ) : (

              attendance.map((item) => (

                <tr key={item.id}>

                  {/* =================================
                      EDIT MODE
                  ================================== */}

                  {editingId === item.id ? (

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
                          type="date"
                          value={editData.date}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              date: e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="text"
                          value={editData.checkIn}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              checkIn:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="text"
                          value={editData.checkOut}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              checkOut:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="text"
                          value={editData.hours}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              hours:
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

                          <option value="Present">
                            Present
                          </option>

                          <option value="Late">
                            Late
                          </option>

                          <option value="Absent">
                            Absent
                          </option>

                          <option value="On Leave">
                            On Leave
                          </option>

                        </select>

                      </td>

                      <td>

                        <button
                          onClick={
                            handleSaveEdit
                          }
                          style={{
                            marginRight: '8px',
                          }}
                        >
                          Save
                        </button>

                        <button
                          onClick={
                            handleCancelEdit
                          }
                          style={{
                            background: '#666',
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
                        {item.name}
                      </td>

                      <td>
                        {item.date}
                      </td>

                      <td>
                        {item.checkIn}
                      </td>

                      <td>
                        {item.checkOut}
                      </td>

                      <td>
                        {item.hours}
                      </td>

                      <td>

                        <span
                          className={`badge ${item.status
                            .toLowerCase()
                            .replace(/\s/g, '')}`}
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
                            marginRight: '6px',
                            fontSize: '12px',
                            padding: '4px 8px',
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteAttendance(
                              item.id
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

      {/* =================================================
          MARK ATTENDANCE FORM / MODAL
      ================================================== */}

      {showAttendanceForm && (

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.55)',
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
              maxWidth: '520px',
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
                padding: '22px 26px',
                borderBottom:
                  '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
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
                  Mark Attendance
                </h2>

                <p
                  style={{
                    margin:
                      '5px 0 0',
                    color: '#6b7280',
                    fontSize: '13px',
                  }}
                >
                  Enter attendance details
                  before confirming.
                </p>

              </div>

              <button
                onClick={
                  handleCancelAttendance
                }
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: 'none',
                  background: '#f3f4f6',
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
                padding: '25px 26px',
              }}
            >

              {/* Employee */}

              <div
                style={{
                  marginBottom: '18px',
                }}
              >

                <label
                  style={{
                    display: 'block',
                    marginBottom: '7px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                  }}
                >
                  Employee
                </label>

                <select
                  name="name"
                  value={attendanceForm.name}
                  onChange={
                    handleAttendanceFormChange
                  }
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    border:
                      '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff',
                  }}
                >

                  <option value="">
                    Select Employee
                  </option>

                  {employees.map(
                    (employee) => (
                      <option
                        key={employee}
                        value={employee}
                      >
                        {employee}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Date */}

              <div
                style={{
                  marginBottom: '18px',
                }}
              >

                <label
                  style={{
                    display: 'block',
                    marginBottom: '7px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                  }}
                >
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={attendanceForm.date}
                  onChange={
                    handleAttendanceFormChange
                  }
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    border:
                      '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />

              </div>

              {/* Check In / Check Out */}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    '1fr 1fr',
                  gap: '15px',
                  marginBottom: '18px',
                }}
              >

                <div>

                  <label
                    style={{
                      display: 'block',
                      marginBottom: '7px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                    }}
                  >
                    Check In
                  </label>

                  <input
                    type="time"
                    name="checkIn"
                    value={
                      attendanceForm.checkIn
                    }
                    onChange={
                      handleAttendanceFormChange
                    }
                    disabled={
                      attendanceForm.status ===
                        'Absent' ||
                      attendanceForm.status ===
                        'On Leave'
                    }
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      border:
                        '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      background:
                        attendanceForm.status ===
                          'Absent' ||
                        attendanceForm.status ===
                          'On Leave'
                          ? '#f3f4f6'
                          : '#fff',
                    }}
                  />

                </div>

                <div>

                  <label
                    style={{
                      display: 'block',
                      marginBottom: '7px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                    }}
                  >
                    Check Out
                  </label>

                  <input
                    type="time"
                    name="checkOut"
                    value={
                      attendanceForm.checkOut
                    }
                    onChange={
                      handleAttendanceFormChange
                    }
                    disabled={
                      attendanceForm.status ===
                        'Absent' ||
                      attendanceForm.status ===
                        'On Leave'
                    }
                    style={{
                      width: '100%',
                      padding: '11px 12px',
                      border:
                        '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      background:
                        attendanceForm.status ===
                          'Absent' ||
                        attendanceForm.status ===
                          'On Leave'
                          ? '#f3f4f6'
                          : '#fff',
                    }}
                  />

                </div>

              </div>

              {/* Status */}

              <div
                style={{
                  marginBottom: '20px',
                }}
              >

                <label
                  style={{
                    display: 'block',
                    marginBottom: '7px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                  }}
                >
                  Status
                </label>

                <select
                  name="status"
                  value={
                    attendanceForm.status
                  }
                  onChange={
                    handleAttendanceFormChange
                  }
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    border:
                      '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff',
                  }}
                >

                  <option value="Present">
                    Present
                  </option>

                  <option value="Late">
                    Late
                  </option>

                  <option value="Absent">
                    Absent
                  </option>

                  <option value="On Leave">
                    On Leave
                  </option>

                </select>

              </div>

              {/* Preview */}

              {attendanceForm.name && (

                <div
                  style={{
                    background: '#f8fafc',
                    border:
                      '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '14px',
                    marginBottom: '20px',
                  }}
                >

                  <div
                    style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginBottom: '5px',
                    }}
                  >
                    Attendance Preview
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      alignItems: 'center',
                    }}
                  >

                    <strong
                      style={{
                        color: '#1e293b',
                      }}
                    >
                      {attendanceForm.name}
                    </strong>

                    <span
                      style={{
                        fontWeight: '600',
                        color:
                          attendanceForm.status ===
                          'Present'
                            ? '#15803d'
                            : attendanceForm.status ===
                              'Late'
                            ? '#b45309'
                            : '#dc2626',
                      }}
                    >
                      {attendanceForm.status}
                    </span>

                  </div>

                  {attendanceForm.checkIn &&
                    attendanceForm.checkOut &&
                    attendanceForm.status !==
                      'Absent' &&
                    attendanceForm.status !==
                      'On Leave' && (

                      <div
                        style={{
                          marginTop: '8px',
                          fontSize: '13px',
                          color: '#64748b',
                        }}
                      >
                        {formatTime(
                          attendanceForm.checkIn
                        )}{' '}
                        →{' '}
                        {formatTime(
                          attendanceForm.checkOut
                        )}{' '}
                        •{' '}
                        {calculateHours(
                          attendanceForm.checkIn,
                          attendanceForm.checkOut
                        )}
                      </div>

                    )}

                </div>

              )}

              {/* ======================================
                  FORM BUTTONS
              ======================================= */}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                }}
              >

                <button
                  onClick={
                    handleCancelAttendance
                  }
                  style={{
                    padding: '11px 20px',
                    borderRadius: '8px',
                    border:
                      '1px solid #d1d5db',
                    background: '#fff',
                    color: '#374151',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleConfirmAttendance
                  }
                  style={{
                    padding: '11px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#2563eb',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Confirm Attendance
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}