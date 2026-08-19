import { useState } from 'react';

const initialOpenRoles = [
  { title: 'Senior Frontend Engineer', location: 'Remote', applicants: 28 },
  { title: 'HR Business Partner', location: 'Bengaluru', applicants: 19 },
  { title: 'Data Analyst', location: 'Hybrid', applicants: 34 },
  { title: 'Operations Manager', location: 'Pune', applicants: 12 },
];

const pipeline = [
  { stage: 'Sourcing', count: 58 },
  { stage: 'Shortlist', count: 24 },
  { stage: 'Interview', count: 11 },
  { stage: 'Offer', count: 4 },
];

export default function RecruitmentPage() {
  const [openRoles, setOpenRoles] = useState(initialOpenRoles);

  const handleCreateOpening = () => {
    setOpenRoles((prev) => [
      { title: 'Junior Recruiter', location: 'Hybrid', applicants: 8 },
      ...prev,
    ]);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Recruitment</h1>
        <button onClick={handleCreateOpening}>Create Opening</button>
      </div>

      <div className="stats-strip">
        <div className="mini-card">
          <span>Total Openings</span>
          <strong>14</strong>
        </div>
        <div className="mini-card">
          <span>Shortlisted</span>
          <strong>46</strong>
        </div>
        <div className="mini-card">
          <span>Avg. Time to Hire</span>
          <strong>21 days</strong>
        </div>
        <div className="mini-card">
          <span>Offer Acceptance</span>
          <strong>89%</strong>
        </div>
      </div>

      <div className="recruitment-grid">
        <div className="card">
          <h3>Open Roles</h3>
          <div className="role-list">
            {openRoles.map((role) => (
              <div className="role-item" key={`${role.title}-${role.location}`}>
                <div className="role-meta">
                  <strong>{role.title}</strong>
                  <small>{role.location}</small>
                </div>
                <span className="badge warning">{role.applicants} applicants</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Hiring Pipeline</h3>
          <div className="pipeline-list">
            {pipeline.map((item) => (
              <div className="pipeline-item" key={item.stage}>
                <div className="pipeline-meta">
                  <strong>{item.stage}</strong>
                  <small>{item.count} candidates</small>
                </div>
                <span className="pipeline-step">Live</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
