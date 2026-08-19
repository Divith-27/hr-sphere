import { NavLink, Outlet, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard" },
  { path: "/employees", label: "Employees" },
  { path: "/attendance", label: "Attendance" },
  { path: "/leaves", label: "Leaves" },
  { path: "/payroll", label: "Payroll" },
  { path: "/onboarding", label: "Onboarding" },
  { path: "/recruitment", label: "Recruitment" },
  { path: "/performance", label: "Performance" },
  { path: "/ai", label: "AI Assistant" },
  { path: "/handbook", label: "Handbook" },
];

export default function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("hrsphere_user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("hrsphere_token");
    localStorage.removeItem("hrsphere_user");
    navigate("/login");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>HRSphere</h1>
        <nav>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ marginTop: "auto", paddingTop: "20px" }}>
          <div className="profile">
            <div className="avatar">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "A"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.full_name || "Admin"}
              </div>
              <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                {user?.role || "admin"}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "8px",
              background: "transparent",
              color: "#f87171",
              border: "1px solid #374151",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
