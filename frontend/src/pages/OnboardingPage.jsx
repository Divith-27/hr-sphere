import { useState, useEffect } from 'react';

const initialOnboardingItems = [
  {
    id: 1,
    employee: 'Sanjay Verma',
    position: 'Backend Developer',
    department: 'Engineering',
    startDate: '2026-08-25',
    stage: 'Offer Accepted',
    status: 'In Progress',
  },
  {
    id: 2,
    employee: 'Maya Singh',
    position: 'Marketing Executive',
    department: 'Marketing',
    startDate: '2026-09-01',
    stage: 'Documents Verification',
    status: 'Pending',
  },
  {
    id: 3,
    employee: 'Vikram Desai',
    position: 'DevOps Engineer',
    department: 'Engineering',
    startDate: '2026-09-15',
    stage: 'Background Check',
    status: 'In Progress',
  },
  {
    id: 4,
    employee: 'Neha Patel',
    position: 'Data Analyst',
    department: 'Analytics',
    startDate: '2026-08-20',
    stage: 'IT Setup',
    status: 'In Progress',
  },
  {
    id: 5,
    employee: 'Arjun Sharma',
    position: 'Finance Manager',
    department: 'Finance',
    startDate: '2026-10-01',
    stage: 'Offer Pending',
    status: 'Pending',
  },
  {
    id: 6,
    employee: 'Isha Mittal',
    position: 'HR Coordinator',
    department: 'HR',
    startDate: '2026-08-18',
    stage: 'Training',
    status: 'Completed',
  },
];

const departments = [
  'Engineering',
  'Marketing',
  'Analytics',
  'Finance',
  'HR',
  'Operations',
  'Sales',
];

const stages = [
  'Offer Pending',
  'Offer Accepted',
  'Documents Verification',
  'Background Check',
  'IT Setup',
  'Training',
];

export default function OnboardingPage() {

  // ==========================================
  // LOAD SAVED ONBOARDING DATA
  // ==========================================

  const [onboardingItems, setOnboardingItems] =
    useState(() => {

      const savedData =
        localStorage.getItem(
          'hrsphere_onboarding'
        );

      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (error) {
          console.error(
            'Error loading onboarding data:',
            error
          );

          return initialOnboardingItems;
        }
      }

      return initialOnboardingItems;
    });

  // ==========================================
  // SAVE ONBOARDING DATA
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      'hrsphere_onboarding',
      JSON.stringify(onboardingItems)
    );

  }, [onboardingItems]);

  // ==========================================
  // EDIT STATE
  // ==========================================

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({});

  // ==========================================
  // NEW ONBOARDING FORM
  // ==========================================

  const [showOnboardingForm, setShowOnboardingForm] =
    useState(false);

  const [onboardingForm, setOnboardingForm] =
    useState({
      employee: '',
      position: '',
      department: 'Engineering',
      startDate: '',
      stage: 'Offer Pending',
      status: 'Pending',
    });

  // ==========================================
  // OPEN ONBOARDING FORM
  // ==========================================

  const handleAddCandidate = () => {

    setOnboardingForm({
      employee: '',
      position: '',
      department: 'Engineering',
      startDate: '',
      stage: 'Offer Pending',
      status: 'Pending',
    });

    setShowOnboardingForm(true);
  };

  // ==========================================
  // CLOSE ONBOARDING FORM
  // ==========================================

  const handleCancelOnboarding = () => {

    setShowOnboardingForm(false);

    setOnboardingForm({
      employee: '',
      position: '',
      department: 'Engineering',
      startDate: '',
      stage: 'Offer Pending',
      status: 'Pending',
    });
  };

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleOnboardingFormChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setOnboardingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // CONFIRM ONBOARDING
  // ==========================================

  const handleConfirmOnboarding = () => {

    if (
      !onboardingForm.employee.trim()
    ) {

      alert(
        'Please enter the candidate name.'
      );

      return;
    }

    if (
      !onboardingForm.position.trim()
    ) {

      alert(
        'Please enter the position.'
      );

      return;
    }

    if (
      !onboardingForm.startDate
    ) {

      alert(
        'Please select the start date.'
      );

      return;
    }

    // ==========================================
    // CREATE NEW CANDIDATE
    // ==========================================

    const newCandidate = {
      id: Date.now(),

      employee:
        onboardingForm.employee.trim(),

      position:
        onboardingForm.position.trim(),

      department:
        onboardingForm.department,

      startDate:
        onboardingForm.startDate,

      stage:
        onboardingForm.stage,

      status:
        onboardingForm.status,
    };

    // ==========================================
    // ADD AFTER CONFIRM
    // ==========================================

    setOnboardingItems((prev) => [
      newCandidate,
      ...prev,
    ]);

    // Close form
    setShowOnboardingForm(false);

    // Reset form
    setOnboardingForm({
      employee: '',
      position: '',
      department: 'Engineering',
      startDate: '',
      stage: 'Offer Pending',
      status: 'Pending',
    });

    alert(
      'Candidate added to onboarding successfully!'
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

    setOnboardingItems((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? editData
          : item
      )
    );

    setEditingId(null);

    setEditData({});

    alert(
      'Onboarding details updated successfully!'
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

  const handleDeleteItem = (id) => {

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this onboarding record?'
      );

    if (!confirmDelete) {
      return;
    }

    setOnboardingItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    alert(
      'Onboarding record deleted successfully!'
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
          Onboarding
        </h1>

        <button
          onClick={
            handleAddCandidate
          }
        >
          Add Candidate
        </button>

      </div>

      {/* ======================================
          ONBOARDING TABLE
      ======================================= */}

      <div className="card">

        <table className="table">

          <thead>

            <tr>

              <th>
                Candidate Name
              </th>

              <th>
                Position
              </th>

              <th>
                Department
              </th>

              <th>
                Start Date
              </th>

              <th>
                Current Stage
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

            {onboardingItems.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign:
                      'center',
                    padding:
                      '30px',
                    color:
                      '#777',
                  }}
                >
                  No onboarding records found.
                </td>

              </tr>

            ) : (

              onboardingItems.map((item) => (

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

                        <input
                          type="text"
                          value={
                            editData.position
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              position:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="text"
                          value={
                            editData.department
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              department:
                                e.target.value,
                            })
                          }
                        />

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

                        <select
                          value={
                            editData.stage
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              stage:
                                e.target.value,
                            })
                          }
                        >

                          {stages.map(
                            (stage) => (

                              <option
                                key={
                                  stage
                                }
                                value={
                                  stage
                                }
                              >
                                {stage}
                              </option>

                            )
                          )}

                        </select>

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
                        {item.position}
                      </td>

                      <td>
                        {item.department}
                      </td>

                      <td>
                        {item.startDate}
                      </td>

                      <td>
                        {item.stage}
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
                            handleEdit(
                              item
                            )
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
                            handleDeleteItem(
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
          ONBOARDING FORM MODAL
      ================================================== */}

      {showOnboardingForm && (

        <div
          style={{
            position:
              'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'rgba(15, 23, 42, 0.55)',
            display:
              'flex',
            alignItems:
              'center',
            justifyContent:
              'center',
            zIndex: 9999,
            padding:
              '20px',
          }}
        >

          <div
            style={{
              width:
                '100%',
              maxWidth:
                '550px',
              background:
                '#ffffff',
              borderRadius:
                '16px',
              boxShadow:
                '0 20px 60px rgba(0,0,0,0.25)',
              overflow:
                'hidden',
            }}
          >

            {/* ======================================
                MODAL HEADER
            ======================================= */}

            <div
              style={{
                padding:
                  '22px 26px',
                borderBottom:
                  '1px solid #e5e7eb',
                display:
                  'flex',
                justifyContent:
                  'space-between',
                alignItems:
                  'center',
              }}
            >

              <div>

                <h2
                  style={{
                    margin: 0,
                    fontSize:
                      '22px',
                    color:
                      '#111827',
                  }}
                >
                  Add Candidate
                </h2>

                <p
                  style={{
                    margin:
                      '5px 0 0',
                    color:
                      '#6b7280',
                    fontSize:
                      '13px',
                  }}
                >
                  Enter the candidate's onboarding details.
                </p>

              </div>

              <button
                onClick={
                  handleCancelOnboarding
                }
                style={{
                  width:
                    '34px',
                  height:
                    '34px',
                  borderRadius:
                    '50%',
                  border:
                    'none',
                  background:
                    '#f3f4f6',
                  color:
                    '#374151',
                  fontSize:
                    '20px',
                  cursor:
                    'pointer',
                  padding: 0,
                }}
              >
                ×
              </button>

            </div>

            {/* ======================================
                FORM BODY
            ======================================= */}

            <div
              style={{
                padding:
                  '25px 26px',
              }}
            >

              {/* CANDIDATE NAME */}

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
                  Candidate Name
                </label>

                <input
                  type="text"
                  name="employee"
                  value={
                    onboardingForm.employee
                  }
                  onChange={
                    handleOnboardingFormChange
                  }
                  placeholder="Enter candidate name"
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

              {/* POSITION */}

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
                  Position
                </label>

                <input
                  type="text"
                  name="position"
                  value={
                    onboardingForm.position
                  }
                  onChange={
                    handleOnboardingFormChange
                  }
                  placeholder="e.g. Software Developer"
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

              {/* DEPARTMENT + START DATE */}

              <div
                style={{
                  display:
                    'grid',
                  gridTemplateColumns:
                    '1fr 1fr',
                  gap:
                    '15px',
                  marginBottom:
                    '18px',
                }}
              >

                {/* DEPARTMENT */}

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
                    Department
                  </label>

                  <select
                    name="department"
                    value={
                      onboardingForm.department
                    }
                    onChange={
                      handleOnboardingFormChange
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

                    {departments.map(
                      (department) => (

                        <option
                          key={
                            department
                          }
                          value={
                            department
                          }
                        >
                          {department}
                        </option>

                      )
                    )}

                  </select>

                </div>

                {/* START DATE */}

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
                      onboardingForm.startDate
                    }
                    onChange={
                      handleOnboardingFormChange
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

              {/* STAGE */}

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
                  Current Stage
                </label>

                <select
                  name="stage"
                  value={
                    onboardingForm.stage
                  }
                  onChange={
                    handleOnboardingFormChange
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

                  {stages.map(
                    (stage) => (

                      <option
                        key={
                          stage
                        }
                        value={
                          stage
                        }
                      >
                        {stage}
                      </option>

                    )
                  )}

                </select>

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
                    onboardingForm.status
                  }
                  onChange={
                    handleOnboardingFormChange
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

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>

              {/* ======================================
                  PREVIEW
              ======================================= */}

              {onboardingForm.employee && (

                <div
                  style={{
                    background:
                      '#eff6ff',
                    border:
                      '1px solid #bfdbfe',
                    borderRadius:
                      '10px',
                    padding:
                      '14px 15px',
                    marginBottom:
                      '20px',
                    fontSize:
                      '13px',
                    color:
                      '#334155',
                  }}
                >

                  <div
                    style={{
                      fontWeight:
                        '700',
                      fontSize:
                        '15px',
                      marginBottom:
                        '6px',
                    }}
                  >
                    {onboardingForm.employee}
                  </div>

                  <div>
                    Position:{' '}
                    {onboardingForm.position ||
                      'Not specified'}
                  </div>

                  <div>
                    Department:{' '}
                    {onboardingForm.department}
                  </div>

                  <div>
                    Start Date:{' '}
                    {onboardingForm.startDate ||
                      'Not selected'}
                  </div>

                  <div>
                    Stage:{' '}
                    {onboardingForm.stage}
                  </div>

                  <div>
                    Status:{' '}
                    {onboardingForm.status}
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
                  gap:
                    '10px',
                }}
              >

                <button
                  onClick={
                    handleCancelOnboarding
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
                    handleConfirmOnboarding
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
                  Confirm Onboarding
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}