import { useState } from 'react';

const handbookSections = [
  {
    id: 1,
    title: 'Company Overview',
    content: 'HRSphere is a comprehensive workforce management platform dedicated to streamlining HR operations. Founded in 2024, we are committed to fostering a positive workplace culture.',
    guidelines: [
      'Our mission is to empower HR teams with modern tools',
      'We value innovation, integrity, and inclusivity',
      'Equal opportunity employer for all candidates',
    ],
  },
  {
    id: 2,
    title: 'Work Hours & Attendance',
    content: 'Standard work hours are 9:00 AM to 6:00 PM, Monday to Friday. Employees are expected to maintain consistent attendance.',
    guidelines: [
      'Mark attendance daily via the Attendance system',
      'Late arrivals must be logged and reported',
      'Work from home requests require manager approval',
      'Shift changes must be communicated 48 hours in advance',
    ],
  },
  {
    id: 3,
    title: 'Leave Policy',
    content: 'Employees are entitled to various types of leave as per company policy and local regulations.',
    guidelines: [
      'Annual Leave: 20 days per year for new hires',
      'Casual Leave: 8 days per year for urgent matters',
      'Sick Leave: 10 days per year for medical reasons',
      'Maternity Leave: 180 days as per legal requirements',
      'Emergency Leave: Available for unforeseen family emergencies',
      'Leave requests must be submitted 7 days in advance when possible',
    ],
  },
  {
    id: 4,
    title: 'Code of Conduct',
    content: 'All employees are expected to maintain professional behavior and adhere to company values.',
    guidelines: [
      'Treat colleagues with respect and dignity',
      'Maintain confidentiality of company information',
      'No discrimination, harassment, or bullying',
      'Dress code: Business casual or as per role requirements',
      'Punctuality and reliability are essential',
      'Use company resources responsibly',
    ],
  },
  {
    id: 5,
    title: 'Compensation & Payroll',
    content: 'Salary and compensation are determined based on role, experience, and market rates.',
    guidelines: [
      'Salary is paid on the last business day of each month',
      'Bonus structure: Performance-based annually',
      'Health insurance provided for all full-time employees',
      'Provident Fund (PF) deduction as per government regulations',
      'Professional development allowance available',
      'Overtime compensation eligibility varies by role',
    ],
  },
  {
    id: 6,
    title: 'Onboarding Process',
    content: 'New employees go through a structured onboarding program to ensure smooth integration.',
    guidelines: [
      'Day 1: HR orientation and document collection',
      'Days 2-3: Department introduction and role training',
      'Week 1: System access and process familiarization',
      'Week 2-4: Role-specific training and mentoring',
      'Month 1-3: Probation period with regular feedback',
      '90-day evaluation determines permanent status',
    ],
  },
  {
    id: 7,
    title: 'Benefits & Wellness',
    content: 'HRSphere is committed to employee well-being and offers comprehensive benefits.',
    guidelines: [
      'Health insurance for employee and family',
      'Dental and vision coverage included',
      'Gym membership reimbursement available',
      'Mental health support and counseling services',
      'Flexible work arrangements (Work from Home)',
      'Annual team building and wellness activities',
      'Life insurance coverage for all employees',
    ],
  },
  {
    id: 8,
    title: 'Performance Management',
    content: 'Regular performance reviews ensure career growth and development.',
    guidelines: [
      'Quarterly performance check-ins with managers',
      'Annual 360-degree feedback assessment',
      'Individual Development Plan (IDP) creation',
      'Training and upskilling opportunities',
      'Career progression based on merit and performance',
      'Promotion eligibility after 1 year in current role',
    ],
  },
];

export default function HandbookPage() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleSection = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Employee Handbook</h1>
        <span style={{ fontSize: '14px', color: '#aaa' }}>Guidelines & Company Policies</span>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', color: 'white' }}>
          <h3>Welcome to HRSphere</h3>
          <p>This Employee Handbook contains important information about company policies, benefits, and guidelines. Please read carefully and refer to it regularly.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {handbookSections.map((section) => (
          <div
            key={section.id}
            className="card"
            style={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => toggleSection(section.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{section.title}</h3>
              <span style={{ fontSize: '20px' }}>{expandedId === section.id ? '▼' : '▶'}</span>
            </div>

            <p style={{ fontSize: '13px', color: '#aaa', margin: '0 0 12px 0' }}>{section.content}</p>

            {expandedId === section.id && (
              <div style={{ borderTop: '1px solid #444', paddingTop: '12px', marginTop: '12px' }}>
                <h4 style={{ marginTop: '0', color: '#64b5f6' }}>Guidelines:</h4>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                  {section.guidelines.map((guideline, idx) => (
                    <li key={idx} style={{ marginBottom: '6px', lineHeight: '1.4', color: '#e0e0e0' }}>
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '24px', background: '#1e3a8a', padding: '16px' }}>
        <h3 style={{ color: '#90caf9' }}>Important Notes</h3>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>This handbook is subject to change at management discretion</li>
          <li>In case of policy conflicts, company management decision is final</li>
          <li>For questions or clarifications, contact the HR department</li>
          <li>All employees must acknowledge receipt of this handbook</li>
          <li>Violations of policy may result in disciplinary action</li>
        </ul>
      </div>
    </div>
  );
}
