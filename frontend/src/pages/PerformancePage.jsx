import { useState, useEffect } from 'react';

const initialPerformanceData = [
  {
    id: 1,
    employee: 'Aisha Khan',
    period: 'Q2 2026',
    rating: 4.5,
    goals: 'Exceeded',
    feedback: 'Excellent performance and strong teamwork.',
    status: 'Completed',
  },
  {
    id: 2,
    employee: 'Daniel Rao',
    period: 'Q2 2026',
    rating: 4.0,
    goals: 'Achieved',
    feedback: 'Good technical performance and consistent delivery.',
    status: 'Completed',
  },
  {
    id: 3,
    employee: 'Priya Nair',
    period: 'Q2 2026',
    rating: 4.2,
    goals: 'Achieved',
    feedback: 'Strong communication and project contribution.',
    status: 'Completed',
  },
  {
    id: 4,
    employee: 'Sanjay Verma',
    period: 'Q2 2026',
    rating: 3.8,
    goals: 'Partially Achieved',
    feedback: 'Needs improvement in meeting deadlines.',
    status: 'In Progress',
  },
  {
    id: 5,
    employee: 'Maya Singh',
    period: 'Q2 2026',
    rating: 4.7,
    goals: 'Exceeded',
    feedback: 'Outstanding performance and leadership.',
    status: 'Completed',
  },
  {
    id: 6,
    employee: 'Rajesh Kumar',
    period: 'Q2 2026',
    rating: 3.5,
    goals: 'Achieved',
    feedback: 'Good performance with room for improvement.',
    status: 'Pending',
  },
];

export default function PerformancePage() {

  // ==========================================
  // LOAD PERFORMANCE DATA
  // ==========================================

  const [performanceData, setPerformanceData] = useState(() => {
    const savedData =
      localStorage.getItem('hrsphere_performance');

    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error(
          'Error loading performance data:',
          error
        );

        return initialPerformanceData;
      }
    }

    return initialPerformanceData;
  });

  // ==========================================
  // SAVE PERFORMANCE DATA
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      'hrsphere_performance',
      JSON.stringify(performanceData)
    );
  }, [performanceData]);

  // ==========================================
  // ADD PERFORMANCE FORM
  // ==========================================

  const [showForm, setShowForm] =
    useState(false);

  const [newPerformance, setNewPerformance] =
    useState({
      employee: '',
      period: 'Q2 2026',
      rating: '',
      goals: 'Achieved',
      feedback: '',
      status: 'Completed',
    });

  // ==========================================
  // EDIT STATE
  // ==========================================

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({});

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const handleAddPerformance = () => {

    setNewPerformance({
      employee: '',
      period: 'Q2 2026',
      rating: '',
      goals: 'Achieved',
      feedback: '',
      status: 'Completed',
    });

    setShowForm(true);
  };

  // ==========================================
  // CLOSE ADD FORM
  // ==========================================

  const handleCancelAdd = () => {

    setShowForm(false);

    setNewPerformance({
      employee: '',
      period: 'Q2 2026',
      rating: '',
      goals: 'Achieved',
      feedback: '',
      status: 'Completed',
    });
  };

  // ==========================================
  // CONFIRM AND ADD PERFORMANCE
  // ==========================================

  const handleConfirmAdd = () => {

    if (!newPerformance.employee.trim()) {
      alert('Please enter employee name.');
      return;
    }

    if (!newPerformance.rating) {
      alert('Please enter performance rating.');
      return;
    }

    if (
      Number(newPerformance.rating) < 1 ||
      Number(newPerformance.rating) > 5
    ) {
      alert('Rating must be between 1 and 5.');
      return;
    }

    const newRecord = {
      id: Date.now(),
      employee: newPerformance.employee,
      period: newPerformance.period,
      rating: Number(newPerformance.rating),
      goals: newPerformance.goals,
      feedback: newPerformance.feedback,
      status: newPerformance.status,
    };

    setPerformanceData((prev) => [
      newRecord,
      ...prev,
    ]);

    setShowForm(false);

    setNewPerformance({
      employee: '',
      period: 'Q2 2026',
      rating: '',
      goals: 'Achieved',
      feedback: '',
      status: 'Completed',
    });

    alert(
      'Performance record added successfully!'
    );
  };

  // ==========================================
  // EDIT
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

    if (!editData.employee.trim()) {
      alert('Please enter employee name.');
      return;
    }

    if (
      Number(editData.rating) < 1 ||
      Number(editData.rating) > 5
    ) {
      alert('Rating must be between 1 and 5.');
      return;
    }

    setPerformanceData((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...editData,
              rating: Number(editData.rating),
            }
          : item
      )
    );

    setEditingId(null);

    setEditData({});

    alert(
      'Performance details updated successfully!'
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

  const handleDeletePerformance = (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this performance record?'
    );

    if (!confirmDelete) {
      return;
    }

    setPerformanceData((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    alert(
      'Performance record deleted successfully!'
    );
  };

  // ==========================================
  // SUMMARY
  // ==========================================

  const completedCount =
    performanceData.filter(
      (item) => item.status === 'Completed'
    ).length;

  const inProgressCount =
    performanceData.filter(
      (item) => item.status === 'In Progress'
    ).length;

  const pendingCount =
    performanceData.filter(
      (item) => item.status === 'Pending'
    ).length;

  const averageRating =
    performanceData.length > 0
      ? (
          performanceData.reduce(
            (total, item) =>
              total + Number(item.rating || 0),
            0
          ) / performanceData.length
        ).toFixed(1)
      : '0.0';

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="page">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="page-header">

        <h1>
          Performance
        </h1>

        <button
          onClick={handleAddPerformance}
        >
          Add Performance
        </button>

      </div>

      {/* ======================================
          SUMMARY CARDS
      ======================================= */}

      <div className="stats-strip">

        <div className="mini-card">
          <span>
            Total Reviews
          </span>

          <strong>
            {performanceData.length}
          </strong>
        </div>

        <div className="mini-card">
          <span>
            Completed
          </span>

          <strong>
            {completedCount}
          </strong>
        </div>

        <div className="mini-card">
          <span>
            In Progress
          </span>

          <strong>
            {inProgressCount}
          </strong>
        </div>

        <div className="mini-card">
          <span>
            Pending
          </span>

          <strong>
            {pendingCount}
          </strong>
        </div>

        <div className="mini-card">
          <span>
            Average Rating
          </span>

          <strong>
            {averageRating}/5
          </strong>
        </div>

      </div>

      {/* ======================================
          ADD PERFORMANCE FORM
      ======================================= */}

      {showForm && (

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >

          <div
            style={{
              background: '#ffffff',
              width: '100%',
              maxWidth: '600px',
              borderRadius: '12px',
              padding: '28px',
              boxShadow:
                '0 20px 50px rgba(0,0,0,0.2)',
            }}
          >

            {/* FORM HEADER */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >

              <h2
                style={{
                  margin: 0,
                  color: '#1f2937',
                }}
              >
                Add Performance Review
              </h2>

              <button
                onClick={handleCancelAdd}
                style={{
                  background: 'transparent',
                  color: '#666',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0',
                }}
              >
                ×
              </button>

            </div>

            {/* EMPLOYEE */}

            <div
              style={{
                marginBottom: '16px',
              }}
            >

              <label
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontWeight: '600',
                }}
              >
                Employee Name
              </label>

              <input
                type="text"
                placeholder="Enter employee name"
                value={
                  newPerformance.employee
                }
                onChange={(e) =>
                  setNewPerformance({
                    ...newPerformance,
                    employee:
                      e.target.value,
                  })
                }
                style={{
                  width: '100%',
                  padding: '11px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              />

            </div>

            {/* PERIOD */}

            <div
              style={{
                marginBottom: '16px',
              }}
            >

              <label
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontWeight: '600',
                }}
              >
                Review Period
              </label>

              <select
                value={
                  newPerformance.period
                }
                onChange={(e) =>
                  setNewPerformance({
                    ...newPerformance,
                    period:
                      e.target.value,
                  })
                }
                style={{
                  width: '100%',
                  padding: '11px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              >

                <option value="Q1 2026">
                  Q1 2026
                </option>

                <option value="Q2 2026">
                  Q2 2026
                </option>

                <option value="Q3 2026">
                  Q3 2026
                </option>

                <option value="Q4 2026">
                  Q4 2026
                </option>

              </select>

            </div>

            {/* RATING */}

            <div
              style={{
                marginBottom: '16px',
              }}
            >

              <label
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontWeight: '600',
                }}
              >
                Rating (1 - 5)
              </label>

              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="Example: 4.5"
                value={
                  newPerformance.rating
                }
                onChange={(e) =>
                  setNewPerformance({
                    ...newPerformance,
                    rating:
                      e.target.value,
                  })
                }
                style={{
                  width: '100%',
                  padding: '11px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              />

            </div>

            {/* GOALS */}

            <div
              style={{
                marginBottom: '16px',
              }}
            >

              <label
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontWeight: '600',
                }}
              >
                Goal Achievement
              </label>

              <select
                value={
                  newPerformance.goals
                }
                onChange={(e) =>
                  setNewPerformance({
                    ...newPerformance,
                    goals:
                      e.target.value,
                  })
                }
                style={{
                  width: '100%',
                  padding: '11px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              >

                <option value="Exceeded">
                  Exceeded
                </option>

                <option value="Achieved">
                  Achieved
                </option>

                <option value="Partially Achieved">
                  Partially Achieved
                </option>

                <option value="Not Achieved">
                  Not Achieved
                </option>

              </select>

            </div>

            {/* FEEDBACK */}

            <div
              style={{
                marginBottom: '16px',
              }}
            >

              <label
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontWeight: '600',
                }}
              >
                Feedback
              </label>

              <textarea
                placeholder="Enter performance feedback"
                value={
                  newPerformance.feedback
                }
                onChange={(e) =>
                  setNewPerformance({
                    ...newPerformance,
                    feedback:
                      e.target.value,
                  })
                }
                rows="3"
                style={{
                  width: '100%',
                  padding: '11px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical',
                }}
              />

            </div>

            {/* STATUS */}

            <div
              style={{
                marginBottom: '24px',
              }}
            >

              <label
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontWeight: '600',
                }}
              >
                Status
              </label>

              <select
                value={
                  newPerformance.status
                }
                onChange={(e) =>
                  setNewPerformance({
                    ...newPerformance,
                    status:
                      e.target.value,
                  })
                }
                style={{
                  width: '100%',
                  padding: '11px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

            {/* BUTTONS */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
              }}
            >

              <button
                onClick={handleCancelAdd}
                style={{
                  background: '#6b7280',
                  padding: '10px 18px',
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAdd}
                style={{
                  background: '#2563eb',
                  padding: '10px 18px',
                }}
              >
                Confirm & Add
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ======================================
          PERFORMANCE TABLE
      ======================================= */}

      <div className="card">

        <table className="table">

          <thead>

            <tr>

              <th>
                Employee
              </th>

              <th>
                Review Period
              </th>

              <th>
                Rating
              </th>

              <th>
                Goals
              </th>

              <th>
                Feedback
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

            {performanceData.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign: 'center',
                    padding: '30px',
                    color: '#777',
                  }}
                >
                  No performance records found.
                </td>

              </tr>

            ) : (

              performanceData.map((item) => (

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
                            editData.period
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              period:
                                e.target.value,
                            })
                          }
                        >

                          <option value="Q1 2026">
                            Q1 2026
                          </option>

                          <option value="Q2 2026">
                            Q2 2026
                          </option>

                          <option value="Q3 2026">
                            Q3 2026
                          </option>

                          <option value="Q4 2026">
                            Q4 2026
                          </option>

                        </select>

                      </td>

                      <td>

                        <input
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          value={
                            editData.rating
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              rating:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <select
                          value={
                            editData.goals
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              goals:
                                e.target.value,
                            })
                          }
                        >

                          <option value="Exceeded">
                            Exceeded
                          </option>

                          <option value="Achieved">
                            Achieved
                          </option>

                          <option value="Partially Achieved">
                            Partially Achieved
                          </option>

                          <option value="Not Achieved">
                            Not Achieved
                          </option>

                        </select>

                      </td>

                      <td>

                        <input
                          type="text"
                          value={
                            editData.feedback
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              feedback:
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

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Completed">
                            Completed
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
                        {item.employee}
                      </td>

                      <td>
                        {item.period}
                      </td>

                      <td>

                        <strong>
                          ⭐ {item.rating}/5
                        </strong>

                      </td>

                      <td>

                        <span
                          className={`badge ${
                            item.goals
                              .toLowerCase()
                              .replace(
                                /\s/g,
                                ''
                              )
                          }`}
                        >
                          {item.goals}
                        </span>

                      </td>

                      <td>
                        {item.feedback}
                      </td>

                      <td>

                        <span
                          className={`badge ${item.status
                            .toLowerCase()
                            .replace(
                              /\s/g,
                              ''
                            )}`}
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
                            handleDeletePerformance(
                              item.id
                            )
                          }
                          style={{
                            background:
                              '#d32f2f',
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

    </div>
  );
}