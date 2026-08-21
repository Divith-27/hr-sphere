import { useState, useEffect } from 'react';

const initialPayrollData = [
  {
    id: 1,
    employee: 'Aisha Khan',
    month: 'August',
    basicSalary: 5000,
    allowances: 800,
    deductions: 600,
    netSalary: 5200,
    status: 'Processed',
  },
  {
    id: 2,
    employee: 'Daniel Rao',
    month: 'August',
    basicSalary: 6000,
    allowances: 1000,
    deductions: 800,
    netSalary: 6200,
    status: 'Processed',
  },
  {
    id: 3,
    employee: 'Priya Nair',
    month: 'August',
    basicSalary: 5500,
    allowances: 900,
    deductions: 700,
    netSalary: 5700,
    status: 'Processed',
  },
  {
    id: 4,
    employee: 'Sanjay Verma',
    month: 'August',
    basicSalary: 5200,
    allowances: 750,
    deductions: 650,
    netSalary: 5300,
    status: 'Pending',
  },
  {
    id: 5,
    employee: 'Maya Singh',
    month: 'August',
    basicSalary: 4800,
    allowances: 700,
    deductions: 550,
    netSalary: 4950,
    status: 'Pending',
  },
  {
    id: 6,
    employee: 'Rajesh Kumar',
    month: 'August',
    basicSalary: 6500,
    allowances: 1200,
    deductions: 900,
    netSalary: 6800,
    status: 'Processed',
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
];

// ==========================================
// MONTH LIST
// ==========================================

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function PayrollPage() {

  // ==========================================
  // LOAD PAYROLL DATA
  // ==========================================

  const [payrollData, setPayrollData] = useState(() => {

    const savedPayroll =
      localStorage.getItem(
        'hrsphere_payroll'
      );

    if (savedPayroll) {
      try {
        return JSON.parse(savedPayroll);
      } catch (error) {
        console.error(
          'Error loading payroll data:',
          error
        );

        return initialPayrollData;
      }
    }

    return initialPayrollData;
  });

  // ==========================================
  // SAVE PAYROLL DATA
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      'hrsphere_payroll',
      JSON.stringify(payrollData)
    );

  }, [payrollData]);

  // ==========================================
  // EDIT STATE
  // ==========================================

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({});

  // ==========================================
  // NEW PAYROLL FORM
  // ==========================================

  const [showPayrollForm, setShowPayrollForm] =
    useState(false);

  const [payrollForm, setPayrollForm] =
    useState({
      employee: '',
      month: 'August',
      basicSalary: '',
      allowances: '',
      deductions: '',
      status: 'Pending',
    });

  // ==========================================
  // OPEN PAYROLL FORM
  // ==========================================

  const handleRunPayroll = () => {

    setPayrollForm({
      employee: '',
      month: 'August',
      basicSalary: '',
      allowances: '',
      deductions: '',
      status: 'Pending',
    });

    setShowPayrollForm(true);
  };

  // ==========================================
  // CLOSE PAYROLL FORM
  // ==========================================

  const handleCancelPayroll = () => {

    setShowPayrollForm(false);

    setPayrollForm({
      employee: '',
      month: 'August',
      basicSalary: '',
      allowances: '',
      deductions: '',
      status: 'Pending',
    });
  };

  // ==========================================
  // HANDLE PAYROLL FORM CHANGE
  // ==========================================

  const handlePayrollFormChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setPayrollForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // CALCULATE NET SALARY
  // ==========================================

  const basicSalary =
    Number(payrollForm.basicSalary) || 0;

  const allowances =
    Number(payrollForm.allowances) || 0;

  const deductions =
    Number(payrollForm.deductions) || 0;

  const calculatedNetSalary =
    basicSalary +
    allowances -
    deductions;

  // ==========================================
  // CONFIRM PAYROLL
  // ==========================================

  const handleConfirmPayroll = () => {

    // Employee validation
    if (!payrollForm.employee) {

      alert(
        'Please select an employee.'
      );

      return;
    }

    // Basic salary validation
    if (
      payrollForm.basicSalary === '' ||
      Number(payrollForm.basicSalary) <= 0
    ) {

      alert(
        'Please enter a valid basic salary.'
      );

      return;
    }

    // Allowance validation
    if (
      payrollForm.allowances === '' ||
      Number(payrollForm.allowances) < 0
    ) {

      alert(
        'Please enter valid allowances.'
      );

      return;
    }

    // Deduction validation
    if (
      payrollForm.deductions === '' ||
      Number(payrollForm.deductions) < 0
    ) {

      alert(
        'Please enter valid deductions.'
      );

      return;
    }

    // Net salary validation
    if (calculatedNetSalary < 0) {

      alert(
        'Deductions cannot be greater than the total salary.'
      );

      return;
    }

    // ==========================================
    // CREATE PAYROLL RECORD
    // ==========================================

    const newPayroll = {
      id: Date.now(),

      employee:
        payrollForm.employee,

      month:
        payrollForm.month,

      basicSalary:
        Number(payrollForm.basicSalary),

      allowances:
        Number(payrollForm.allowances),

      deductions:
        Number(payrollForm.deductions),

      netSalary:
        calculatedNetSalary,

      status:
        payrollForm.status,
    };

    // ==========================================
    // ADD ONLY AFTER CONFIRM
    // ==========================================

    setPayrollData((prev) => [
      newPayroll,
      ...prev,
    ]);

    // Close form
    setShowPayrollForm(false);

    // Reset form
    setPayrollForm({
      employee: '',
      month: 'August',
      basicSalary: '',
      allowances: '',
      deductions: '',
      status: 'Pending',
    });

    alert(
      'Payroll processed successfully!'
    );
  };

  // ==========================================
  // EDIT PAYROLL
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

    const updatedBasic =
      Number(editData.basicSalary) || 0;

    const updatedAllowances =
      Number(editData.allowances) || 0;

    const updatedDeductions =
      Number(editData.deductions) || 0;

    const updatedNetSalary =
      updatedBasic +
      updatedAllowances -
      updatedDeductions;

    setPayrollData((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...editData,

              basicSalary:
                updatedBasic,

              allowances:
                updatedAllowances,

              deductions:
                updatedDeductions,

              netSalary:
                updatedNetSalary,
            }
          : item
      )
    );

    setEditingId(null);

    setEditData({});

    alert(
      'Payroll details updated successfully!'
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
  // DELETE PAYROLL
  // ==========================================

  const handleDeletePayroll = (id) => {

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this payroll record?'
      );

    if (!confirmDelete) {
      return;
    }

    setPayrollData((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    alert(
      'Payroll record deleted successfully!'
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
          Payroll
        </h1>

        <button
          onClick={handleRunPayroll}
        >
          Run Payroll
        </button>

      </div>

      {/* ======================================
          PAYROLL TABLE
      ======================================= */}

      <div className="card">

        <table className="table">

          <thead>

            <tr>

              <th>
                Employee
              </th>

              <th>
                Month
              </th>

              <th>
                Basic Salary
              </th>

              <th>
                Allowances
              </th>

              <th>
                Deductions
              </th>

              <th>
                Net Salary
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

            {payrollData.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign:
                      'center',
                    padding:
                      '30px',
                    color:
                      '#777',
                  }}
                >
                  No payroll records found.
                </td>

              </tr>

            ) : (

              payrollData.map((item) => (

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
                            editData.month
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              month:
                                e.target.value,
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="number"
                          value={
                            editData.basicSalary
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              basicSalary:
                                Number(
                                  e.target.value
                                ),
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="number"
                          value={
                            editData.allowances
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              allowances:
                                Number(
                                  e.target.value
                                ),
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="number"
                          value={
                            editData.deductions
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              deductions:
                                Number(
                                  e.target.value
                                ),
                            })
                          }
                        />

                      </td>

                      <td>

                        <input
                          type="number"
                          value={
                            editData.netSalary
                          }
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              netSalary:
                                Number(
                                  e.target.value
                                ),
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

                          <option value="Processed">
                            Processed
                          </option>

                          <option value="Pending">
                            Pending
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
                        {item.month}
                      </td>

                      <td>
                        ${item.basicSalary}
                      </td>

                      <td>
                        ${item.allowances}
                      </td>

                      <td>
                        ${item.deductions}
                      </td>

                      <td>

                        <strong>
                          ${item.netSalary}
                        </strong>

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
                            handleDeletePayroll(
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
          NEW PAYROLL FORM
      ================================================== */}

      {showPayrollForm && (

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
            padding: '20px',
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
                  Run Payroll
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
                  Enter salary details
                  before processing.
                </p>

              </div>

              <button
                onClick={
                  handleCancelPayroll
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
                MODAL BODY
            ======================================= */}

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
                    payrollForm.employee
                  }
                  onChange={
                    handlePayrollFormChange
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

              {/* MONTH */}

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
                  Payroll Month
                </label>

                <select
                  name="month"
                  value={
                    payrollForm.month
                  }
                  onChange={
                    handlePayrollFormChange
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

                  {months.map(
                    (month) => (

                      <option
                        key={
                          month
                        }
                        value={
                          month
                        }
                      >
                        {month}
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* SALARY FIELDS */}

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

                {/* BASIC SALARY */}

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
                    Basic Salary
                  </label>

                  <input
                    type="number"
                    name="basicSalary"
                    min="0"
                    value={
                      payrollForm.basicSalary
                    }
                    onChange={
                      handlePayrollFormChange
                    }
                    placeholder="5000"
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

                {/* ALLOWANCES */}

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
                    Allowances
                  </label>

                  <input
                    type="number"
                    name="allowances"
                    min="0"
                    value={
                      payrollForm.allowances
                    }
                    onChange={
                      handlePayrollFormChange
                    }
                    placeholder="800"
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

              {/* DEDUCTIONS */}

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
                  Deductions
                </label>

                <input
                  type="number"
                  name="deductions"
                  min="0"
                  value={
                    payrollForm.deductions
                  }
                  onChange={
                    handlePayrollFormChange
                  }
                  placeholder="600"
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

              {/* STATUS */}

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
                  Status
                </label>

                <select
                  name="status"
                  value={
                    payrollForm.status
                  }
                  onChange={
                    handlePayrollFormChange
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

                  <option value="Processed">
                    Processed
                  </option>

                </select>

              </div>

              {/* ======================================
                  SALARY PREVIEW
              ======================================= */}

              <div
                style={{
                  background:
                    '#f8fafc',
                  border:
                    '1px solid #e2e8f0',
                  borderRadius:
                    '12px',
                  padding:
                    '16px',
                  marginBottom:
                    '20px',
                }}
              >

                <div
                  style={{
                    fontSize:
                      '13px',
                    color:
                      '#64748b',
                    marginBottom:
                      '12px',
                    fontWeight:
                      '600',
                  }}
                >
                  Payroll Summary
                </div>

                <div
                  style={{
                    display:
                      'flex',
                    justifyContent:
                      'space-between',
                    marginBottom:
                      '7px',
                    fontSize:
                      '14px',
                  }}
                >

                  <span>
                    Basic Salary
                  </span>

                  <strong>
                    $
                    {basicSalary.toLocaleString()}
                  </strong>

                </div>

                <div
                  style={{
                    display:
                      'flex',
                    justifyContent:
                      'space-between',
                    marginBottom:
                      '7px',
                    fontSize:
                      '14px',
                  }}
                >

                  <span>
                    Allowances
                  </span>

                  <strong
                    style={{
                      color:
                        '#15803d',
                    }}
                  >
                    +
                    $
                    {allowances.toLocaleString()}
                  </strong>

                </div>

                <div
                  style={{
                    display:
                      'flex',
                    justifyContent:
                      'space-between',
                    paddingBottom:
                      '12px',
                    borderBottom:
                      '1px solid #e2e8f0',
                    fontSize:
                      '14px',
                  }}
                >

                  <span>
                    Deductions
                  </span>

                  <strong
                    style={{
                      color:
                        '#dc2626',
                    }}
                  >
                    -
                    $
                    {deductions.toLocaleString()}
                  </strong>

                </div>

                <div
                  style={{
                    display:
                      'flex',
                    justifyContent:
                      'space-between',
                    marginTop:
                      '12px',
                    fontSize:
                      '17px',
                  }}
                >

                  <strong>
                    Net Salary
                  </strong>

                  <strong
                    style={{
                      color:
                        '#2563eb',
                    }}
                  >
                    $
                    {calculatedNetSalary.toLocaleString()}
                  </strong>

                </div>

              </div>

              {/* ======================================
                  EMPLOYEE PREVIEW
              ======================================= */}

              {payrollForm.employee && (

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
                      '20px',
                    fontSize:
                      '13px',
                    color:
                      '#334155',
                  }}
                >

                  <strong>
                    {
                      payrollForm.employee
                    }
                  </strong>

                  {' '}—{' '}

                  {
                    payrollForm.month
                  }

                  {' '}Payroll

                  <div
                    style={{
                      marginTop:
                        '5px',
                      color:
                        '#64748b',
                    }}
                  >
                    Status:{' '}
                    {
                      payrollForm.status
                    }
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
                    handleCancelPayroll
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
                    handleConfirmPayroll
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
                  Confirm Payroll
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}