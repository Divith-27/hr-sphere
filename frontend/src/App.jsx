import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import LeavesPage from "./pages/LeavesPage";
import PayrollPage from "./pages/PayrollPage";
import OnboardingPage from "./pages/OnboardingPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import PerformancePage from "./pages/PerformancePage";
import AIPage from "./pages/AIPage";
import HandbookPage from "./pages/HandbookPage";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("hrsphere_token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/leaves" element={<LeavesPage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/recruitment" element={<RecruitmentPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/handbook" element={<HandbookPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
