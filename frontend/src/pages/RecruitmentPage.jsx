import { useState, useEffect } from 'react';

const initialOpenings = [
  {
    id: 1,
    title: 'Junior Recruiter',
    location: 'Hybrid',
    applicants: 8,
  },
  {
    id: 2,
    title: 'Senior Frontend Engineer',
    location: 'Remote',
    applicants: 28,
  },
  {
    id: 3,
    title: 'HR Business Partner',
    location: 'Bengaluru',
    applicants: 19,
  },
  {
    id: 4,
    title: 'Data Analyst',
    location: 'Hybrid',
    applicants: 34,
  },
  {
    id: 5,
    title: 'Operations Manager',
    location: 'Pune',
    applicants: 12,
  },
];

export default function RecruitmentPage() {

  // ==========================================
  // LOAD RECRUITMENT DATA
  // ==========================================

  const [openings, setOpenings] = useState(() => {

    const savedOpenings =
      localStorage.getItem(
        'hrsphere_recruitment'
      );

    if (savedOpenings) {
      try {
        return JSON.parse(savedOpenings);
      } catch (error) {
        console.error(
          'Error loading recruitment data:',
          error
        );

        return initialOpenings;
      }
    }

    return initialOpenings;
  });

  // ==========================================
  // SAVE RECRUITMENT DATA
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      'hrsphere_recruitment',
      JSON.stringify(openings)
    );

  }, [openings]);

  // ==========================================
  // CREATE OPENING FORM
  // ==========================================

  const [showOpeningForm, setShowOpeningForm] =
    useState(false);

  const [openingForm, setOpeningForm] =
    useState({
      title: '',
      location: 'Hybrid',
      department: 'Engineering',
      employmentType: 'Full Time',
      description: '',
    });

  // ==========================================
  // OPEN FORM
  // ==========================================

  const handleCreateOpening = () => {

    setOpeningForm({
      title: '',
      location: 'Hybrid',
      department: 'Engineering',
      employmentType: 'Full Time',
      description: '',
    });

    setShowOpeningForm(true);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCancelOpening = () => {

    setShowOpeningForm(false);

    setOpeningForm({
      title: '',
      location: 'Hybrid',
      department: 'Engineering',
      employmentType: 'Full Time',
      description: '',
    });
  };

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleOpeningFormChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setOpeningForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // CONFIRM OPENING
  // ==========================================

  const handleConfirmOpening = () => {

    if (!openingForm.title.trim()) {

      alert(
        'Please enter the job title.'
      );

      return;
    }

    if (!openingForm.description.trim()) {

      alert(
        'Please enter the job description.'
      );

      return;
    }

    const newOpening = {
      id: Date.now(),

      title:
        openingForm.title.trim(),

      location:
        openingForm.location,

      department:
        openingForm.department,

      employmentType:
        openingForm.employmentType,

      description:
        openingForm.description.trim(),

      applicants: 0,
    };

    setOpenings((prev) => [
      newOpening,
      ...prev,
    ]);

    setShowOpeningForm(false);

    setOpeningForm({
      title: '',
      location: 'Hybrid',
      department: 'Engineering',
      employmentType: 'Full Time',
      description: '',
    });

    alert(
      'Job opening created successfully!'
    );
  };

  // ==========================================
  // DELETE OPENING
  // ==========================================

  const handleDeleteOpening = (id) => {

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this job opening?'
      );

    if (!confirmDelete) {
      return;
    }

    setOpenings((prev) =>
      prev.filter(
        (opening) =>
          opening.id !== id
      )
    );

    alert(
      'Job opening deleted successfully!'
    );
  };

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const totalOpenings =
    openings.length;

  const totalApplicants =
    openings.reduce(
      (total, opening) =>
        total +
        Number(opening.applicants || 0),
      0
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
          Recruitment
        </h1>

        <button
          onClick={
            handleCreateOpening
          }
        >
          Create Opening
        </button>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '22px',
        }}
      >

        {/* TOTAL OPENINGS */}

        <div className="mini-card">

          <span>
            Total Openings
          </span>

          <strong>
            {totalOpenings}
          </strong>

        </div>

        {/* SHORTLISTED */}

        <div className="mini-card">

          <span>
            Shortlisted
          </span>

          <strong>
            {totalApplicants}
          </strong>

        </div>

        {/* AVG TIME */}

        <div className="mini-card">

          <span>
            Avg. Time to Hire
          </span>

          <strong>
            21 days
          </strong>

        </div>

        {/* OFFER ACCEPTANCE */}

        <div className="mini-card">

          <span>
            Offer Acceptance
          </span>

          <strong>
            89%
          </strong>

        </div>

      </div>

      {/* ======================================
          MAIN RECRUITMENT GRID
      ======================================= */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            '1fr 1fr',
          gap: '20px',
        }}
      >

        {/* ====================================
            OPEN ROLES
        ===================================== */}

        <div className="card">

          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems:
                'center',
              marginBottom:
                '18px',
            }}
          >

            <h3
              style={{
                margin: 0,
              }}
            >
              Open Roles
            </h3>

            <span
              style={{
                color:
                  '#64748b',
                fontSize:
                  '14px',
              }}
            >
              {openings.length}{' '}
              openings
            </span>

          </div>

          {/* OPENING LIST */}

          {openings.length === 0 ? (

            <div
              style={{
                textAlign:
                  'center',
                padding:
                  '40px 20px',
                color:
                  '#777',
              }}
            >
              No job openings found.
            </div>

          ) : (

            openings.map(
              (opening) => (

                <div
                  key={
                    opening.id
                  }
                  style={{
                    display:
                      'flex',
                    justifyContent:
                      'space-between',
                    alignItems:
                      'center',
                    padding:
                      '18px 0',
                    borderBottom:
                      '1px solid #e5e7eb',
                  }}
                >

                  {/* JOB INFORMATION */}

                  <div>

                    <div
                      style={{
                        fontWeight:
                          '600',
                        fontSize:
                          '16px',
                        color:
                          '#111827',
                        marginBottom:
                          '7px',
                      }}
                    >
                      {
                        opening.title
                      }
                    </div>

                    <div
                      style={{
                        color:
                          '#94a3b8',
                        fontSize:
                          '14px',
                      }}
                    >
                      {
                        opening.location
                      }
                    </div>

                  </div>

                  {/* RIGHT SIDE */}

                  <div
                    style={{
                      display:
                        'flex',
                      alignItems:
                        'center',
                      gap:
                        '12px',
                    }}
                  >

                    <span
                      style={{
                        background:
                          '#fef3c7',
                        color:
                          '#92400e',
                        padding:
                          '7px 12px',
                        borderRadius:
                          '20px',
                        fontSize:
                          '13px',
                        fontWeight:
                          '600',
                        whiteSpace:
                          'nowrap',
                      }}
                    >
                      {
                        opening.applicants
                      }{' '}
                      applicants
                    </span>

                    <button
                      onClick={() =>
                        handleDeleteOpening(
                          opening.id
                        )
                      }
                      style={{
                        background:
                          '#d32f2f',
                        color:
                          '#fff',
                        border:
                          'none',
                        padding:
                          '6px 12px',
                        borderRadius:
                          '4px',
                        fontSize:
                          '12px',
                        cursor:
                          'pointer',
                      }}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>

        {/* ====================================
            HIRING PIPELINE
        ===================================== */}

        <div className="card">

          <h3
            style={{
              marginTop: 0,
              marginBottom:
                '18px',
            }}
          >
            Hiring Pipeline
          </h3>

          {/* SOURCING */}

          <div
            style={{
              padding:
                '17px 0',
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

              <strong>
                Sourcing
              </strong>

              <div
                style={{
                  color:
                    '#94a3b8',
                  fontSize:
                    '14px',
                  marginTop:
                    '8px',
                }}
              >
                58 candidates
              </div>

            </div>

            <span
              className="badge present"
            >
              Live
            </span>

          </div>

          {/* SHORTLIST */}

          <div
            style={{
              padding:
                '17px 0',
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

              <strong>
                Shortlist
              </strong>

              <div
                style={{
                  color:
                    '#94a3b8',
                  fontSize:
                    '14px',
                  marginTop:
                    '8px',
                }}
              >
                24 candidates
              </div>

            </div>

            <span
              className="badge present"
            >
              Live
            </span>

          </div>

          {/* INTERVIEW */}

          <div
            style={{
              padding:
                '17px 0',
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

              <strong>
                Interview
              </strong>

              <div
                style={{
                  color:
                    '#94a3b8',
                  fontSize:
                    '14px',
                  marginTop:
                    '8px',
                }}
              >
                11 candidates
              </div>

            </div>

            <span
              className="badge present"
            >
              Live
            </span>

          </div>

          {/* OFFER */}

          <div
            style={{
              padding:
                '17px 0',
              display:
                'flex',
              justifyContent:
                'space-between',
              alignItems:
                'center',
            }}
          >

            <div>

              <strong>
                Offer
              </strong>

              <div
                style={{
                  color:
                    '#94a3b8',
                  fontSize:
                    '14px',
                  marginTop:
                    '8px',
                }}
              >
                4 candidates
              </div>

            </div>

            <span
              className="badge present"
            >
              Live
            </span>

          </div>

        </div>

      </div>

      {/* =================================================
          CREATE OPENING FORM MODAL
      ================================================== */}

      {showOpeningForm && (

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
            zIndex:
              9999,
            padding:
              '20px',
          }}
        >

          <div
            style={{
              width:
                '100%',
              maxWidth:
                '560px',
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
                  Create Job Opening
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
                  Enter the details for the new job opening.
                </p>

              </div>

              <button
                onClick={
                  handleCancelOpening
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

              {/* JOB TITLE */}

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
                  Job Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    openingForm.title
                  }
                  onChange={
                    handleOpeningFormChange
                  }
                  placeholder="e.g. Frontend Developer"
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

              {/* LOCATION */}

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
                  Work Location
                </label>

                <select
                  name="location"
                  value={
                    openingForm.location
                  }
                  onChange={
                    handleOpeningFormChange
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
                    background:
                      '#fff',
                    outline:
                      'none',
                    boxSizing:
                      'border-box',
                  }}
                >

                  <option value="Hybrid">
                    Hybrid
                  </option>

                  <option value="Remote">
                    Remote
                  </option>

                  <option value="Bengaluru">
                    Bengaluru
                  </option>

                  <option value="Chennai">
                    Chennai
                  </option>

                  <option value="Coimbatore">
                    Coimbatore
                  </option>

                  <option value="Pune">
                    Pune
                  </option>

                  <option value="Mumbai">
                    Mumbai
                  </option>

                </select>

              </div>

              {/* DEPARTMENT + EMPLOYMENT TYPE */}

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
                      openingForm.department
                    }
                    onChange={
                      handleOpeningFormChange
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
                      background:
                        '#fff',
                      outline:
                        'none',
                      boxSizing:
                        'border-box',
                    }}
                  >

                    <option value="Engineering">
                      Engineering
                    </option>

                    <option value="HR">
                      HR
                    </option>

                    <option value="Marketing">
                      Marketing
                    </option>

                    <option value="Finance">
                      Finance
                    </option>

                    <option value="Analytics">
                      Analytics
                    </option>

                    <option value="Operations">
                      Operations
                    </option>

                    <option value="Sales">
                      Sales
                    </option>

                  </select>

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
                    Employment Type
                  </label>

                  <select
                    name="employmentType"
                    value={
                      openingForm.employmentType
                    }
                    onChange={
                      handleOpeningFormChange
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
                      background:
                        '#fff',
                      outline:
                        'none',
                      boxSizing:
                        'border-box',
                    }}
                  >

                    <option value="Full Time">
                      Full Time
                    </option>

                    <option value="Part Time">
                      Part Time
                    </option>

                    <option value="Contract">
                      Contract
                    </option>

                    <option value="Internship">
                      Internship
                    </option>

                  </select>

                </div>

              </div>

              {/* DESCRIPTION */}

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
                  Job Description
                </label>

                <textarea
                  name="description"
                  value={
                    openingForm.description
                  }
                  onChange={
                    handleOpeningFormChange
                  }
                  placeholder="Enter job responsibilities and requirements..."
                  rows="4"
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
                      'Arial, sans-serif',
                  }}
                />

              </div>

              {/* ======================================
                  PREVIEW
              ======================================= */}

              {openingForm.title && (

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
                        '16px',
                      color:
                        '#111827',
                      marginBottom:
                        '7px',
                    }}
                  >
                    {
                      openingForm.title
                    }
                  </div>

                  <div>
                    Location:{' '}
                    {
                      openingForm.location
                    }
                  </div>

                  <div>
                    Department:{' '}
                    {
                      openingForm.department
                    }
                  </div>

                  <div>
                    Employment:{' '}
                    {
                      openingForm.employmentType
                    }
                  </div>

                  {openingForm.description && (

                    <div
                      style={{
                        marginTop:
                          '7px',
                      }}
                    >
                      Description:{' '}
                      {
                        openingForm.description
                      }
                    </div>

                  )}

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
                    handleCancelOpening
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
                    handleConfirmOpening
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
                  Confirm Opening
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}