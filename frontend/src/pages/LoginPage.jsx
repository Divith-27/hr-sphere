import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("hrsphere_token", res.data.access_token);

      const meRes = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${res.data.access_token}` },
      });
      localStorage.setItem("hrsphere_user", JSON.stringify(meRes.data));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !fullName) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
        full_name: fullName,
        role: "admin",
      });

      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const loginRes = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("hrsphere_token", loginRes.data.access_token);

      const meRes = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${loginRes.data.access_token}` },
      });
      localStorage.setItem("hrsphere_user", JSON.stringify(meRes.data));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{
        width: "400px",
        padding: "40px",
        background: "#1e293b",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        border: "1px solid #334155",
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#fff", marginBottom: "8px", fontSize: "28px" }}>HRSphere</h1>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "14px" }}>
            {isRegister ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        {error && (
          <div style={{
            padding: "10px 14px",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            color: "#fca5a5",
            fontSize: "13px",
            marginBottom: "16px",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", marginBottom: "6px", fontWeight: "500" }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px", boxSizing: "border-box",
                  border: "1px solid #475569", borderRadius: "8px", background: "#0f172a",
                  color: "#fff", fontSize: "14px", outline: "none",
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", marginBottom: "6px", fontWeight: "500" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", padding: "12px 14px", boxSizing: "border-box",
                border: "1px solid #475569", borderRadius: "8px", background: "#0f172a",
                color: "#fff", fontSize: "14px", outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", marginBottom: "6px", fontWeight: "500" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%", padding: "12px 14px", boxSizing: "border-box",
                border: "1px solid #475569", borderRadius: "8px", background: "#0f172a",
                color: "#fff", fontSize: "14px", outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "12px", background: "#2563eb", color: "#fff",
              border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ color: "#94a3b8", fontSize: "13px" }}>
            {isRegister ? "Already have an account? " : "Don't have an account? "}
          </span>
          <button
            onClick={() => { setIsRegister(!isRegister); setError(""); }}
            style={{
              background: "none", border: "none", color: "#60a5fa", cursor: "pointer",
              fontSize: "13px", fontWeight: "500", padding: 0,
            }}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
