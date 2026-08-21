import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetToken, setResetToken] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================================================
  // CLEAR MESSAGES
  // =====================================================

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    clearMessages();

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const formData = new URLSearchParams();

      formData.append("username", email.trim());
      formData.append("password", password);

      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 10000,
        }
      );

      const token = response.data?.access_token;

      if (!token) {
        throw new Error("Access token was not received from the server.");
      }

      // Save token
      localStorage.setItem("hrsphere_token", token);

      // Get logged-in user
      const userResponse = await axios.get(
        `${API_BASE_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      // Save user
      localStorage.setItem(
        "hrsphere_user",
        JSON.stringify(userResponse.data)
      );

      // Login successful
      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      if (err.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to the backend. Please make sure your backend server is running on port 8000."
        );
      } else if (err.response) {
        setError(
          err.response.data?.detail ||
            err.response.data?.message ||
            "Login failed. Please check your email and password."
        );
      } else {
        setError(
          err.message ||
            "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const handleRegister = async (e) => {
    e.preventDefault();

    clearMessages();

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Create account
      await axios.post(
        `${API_BASE_URL}/auth/register`,
        {
          email: email.trim(),
          password: password,
          full_name: fullName.trim(),
          role: "admin",
        },
        {
          timeout: 10000,
        }
      );

      // Automatically login after registration
      const formData = new URLSearchParams();

      formData.append("username", email.trim());
      formData.append("password", password);

      const loginResponse = await axios.post(
        `${API_BASE_URL}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 10000,
        }
      );

      const token =
        loginResponse.data?.access_token;

      if (!token) {
        throw new Error(
          "Registration succeeded but login failed."
        );
      }

      localStorage.setItem(
        "hrsphere_token",
        token
      );

      // Get user
      const userResponse = await axios.get(
        `${API_BASE_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      localStorage.setItem(
        "hrsphere_user",
        JSON.stringify(userResponse.data)
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      if (err.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to the backend. Please make sure your backend server is running on port 8000."
        );
      } else if (err.response) {
        setError(
          err.response.data?.detail ||
            err.response.data?.message ||
            "Registration failed."
        );
      } else {
        setError(
          err.message ||
            "Registration failed."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    clearMessages();

    if (!email.trim()) {
      setError("Please enter your registered email.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          email: email.trim(),
        },
        {
          timeout: 10000,
        }
      );

      setSuccess(
        response.data?.message ||
          "If the email exists, a password reset link has been sent."
      );
    } catch (err) {
      console.error(
        "FORGOT PASSWORD ERROR:",
        err
      );

      if (err.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to the backend. Please make sure your backend server is running on port 8000."
        );
      } else {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            "Unable to process password reset request."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    clearMessages();

    if (!resetToken.trim()) {
      setError("Reset token is required.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please enter your new password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/reset-password`,
        {
          token: resetToken.trim(),
          new_password: password,
        },
        {
          timeout: 10000,
        }
      );

      setSuccess(
        response.data?.message ||
          "Password reset successfully."
      );

      setPassword("");
      setConfirmPassword("");
      setResetToken("");

      setTimeout(() => {
        setMode("login");
        setSuccess("");
      }, 2000);
    } catch (err) {
      console.error(
        "RESET PASSWORD ERROR:",
        err
      );

      if (err.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to the backend. Please make sure your backend server is running on port 8000."
        );
      } else {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            "Password reset failed. The reset token may have expired."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // STYLES
  // =====================================================

  const pageStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a, #172033)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 20px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "625px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "22px",
    padding: "60px 62px",
    boxSizing: "border-box",
    boxShadow:
      "0 25px 60px rgba(0, 0, 0, 0.35)",
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 18px",
    boxSizing: "border-box",
    border: "1px solid #475569",
    borderRadius: "10px",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: "16px",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    color: "#e2e8f0",
    fontSize: "16px",
    marginBottom: "9px",
    fontWeight: "500",
  };

  const primaryButtonStyle = {
    width: "100%",
    padding: "16px",
    background:
      "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "17px",
    fontWeight: "700",
    cursor: loading
      ? "not-allowed"
      : "pointer",
    opacity: loading ? 0.7 : 1,
  };

  const linkButtonStyle = {
    background: "none",
    border: "none",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    padding: 0,
  };

  const errorStyle = {
    padding: "13px 15px",
    background:
      "rgba(239, 68, 68, 0.15)",
    border:
      "1px solid rgba(239, 68, 68, 0.45)",
    borderRadius: "9px",
    color: "#fca5a5",
    fontSize: "14px",
    lineHeight: "1.5",
    marginBottom: "22px",
  };

  const successStyle = {
    padding: "13px 15px",
    background:
      "rgba(34, 197, 94, 0.15)",
    border:
      "1px solid rgba(34, 197, 94, 0.45)",
    borderRadius: "9px",
    color: "#86efac",
    fontSize: "14px",
    lineHeight: "1.5",
    marginBottom: "22px",
  };

  // =====================================================
  // HEADER
  // =====================================================

  const renderHeader = (title, subtitle) => (
    <div
      style={{
        textAlign: "center",
        marginBottom: "36px",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, #2563eb, #4f46e5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          color: "#ffffff",
          fontSize: "38px",
          fontWeight: "800",
          boxShadow:
            "0 10px 30px rgba(37, 99, 235, 0.3)",
        }}
      >
        H
      </div>

      <h1
        style={{
          color: "#ffffff",
          margin: "0 0 8px",
          fontSize: "34px",
          fontWeight: "700",
        }}
      >
        {title}
      </h1>

      <p
        style={{
          color: "#94a3b8",
          margin: 0,
          fontSize: "17px",
        }}
      >
        {subtitle}
      </p>
    </div>
  );

  // =====================================================
  // LOGIN UI
  // =====================================================

  const renderLogin = () => (
    <>
      {renderHeader(
        "HRSphere",
        "Sign in to your account"
      )}

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      {success && (
        <div style={successStyle}>
          {success}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label style={labelStyle}>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
            autoComplete="email"
          />
        </div>

        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <label style={labelStyle}>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
            autoComplete="current-password"
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "25px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              clearMessages();
              setMode("forgot");
            }}
            style={linkButtonStyle}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={primaryButtonStyle}
        >
          {loading
            ? "Signing in..."
            : "Login"}
        </button>
      </form>

      <div
        style={{
          textAlign: "center",
          marginTop: "28px",
        }}
      >
        <span
          style={{
            color: "#94a3b8",
            fontSize: "15px",
          }}
        >
          Don't have an account?{" "}
        </span>

        <button
          type="button"
          onClick={() => {
            clearMessages();
            setMode("register");
          }}
          style={linkButtonStyle}
        >
          Register
        </button>
      </div>
    </>
  );

  // =====================================================
  // REGISTER UI
  // =====================================================

  const renderRegister = () => (
    <>
      {renderHeader(
        "Create Account",
        "Create your HRSphere account"
      )}

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      {success && (
        <div style={successStyle}>
          {success}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <label style={labelStyle}>
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            style={inputStyle}
            autoComplete="name"
          />
        </div>

        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <label style={labelStyle}>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
            autoComplete="email"
          />
        </div>

        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <label style={labelStyle}>
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
            autoComplete="new-password"
          />
        </div>

        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <label style={labelStyle}>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            style={inputStyle}
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={primaryButtonStyle}
        >
          {loading
            ? "Creating account..."
            : "Register"}
        </button>
      </form>

      <div
        style={{
          textAlign: "center",
          marginTop: "28px",
        }}
      >
        <span
          style={{
            color: "#94a3b8",
            fontSize: "15px",
          }}
        >
          Already have an account?{" "}
        </span>

        <button
          type="button"
          onClick={() => {
            clearMessages();
            setMode("login");
          }}
          style={linkButtonStyle}
        >
          Login
        </button>
      </div>
    </>
  );

  // =====================================================
  // FORGOT PASSWORD UI
  // =====================================================

  const renderForgotPassword = () => (
    <>
      {renderHeader(
        "Forgot Password?",
        "We'll help you recover your account"
      )}

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      {success && (
        <div style={successStyle}>
          {success}
        </div>
      )}

      <form onSubmit={handleForgotPassword}>
        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <label style={labelStyle}>
            Registered Email
          </label>

          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
            autoComplete="email"
          />

          <p
            style={{
              color: "#64748b",
              fontSize: "13px",
              lineHeight: "1.5",
              marginTop: "9px",
              marginBottom: 0,
            }}
          >
            Enter the email address associated
            with your HRSphere account.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={primaryButtonStyle}
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>
      </form>

      <div
        style={{
          textAlign: "center",
          marginTop: "28px",
        }}
      >
        <button
          type="button"
          onClick={() => {
            clearMessages();
            setMode("login");
          }}
          style={linkButtonStyle}
        >
          ← Back to Login
        </button>
      </div>
    </>
  );

  // =====================================================
  // RESET PASSWORD UI
  // =====================================================

  const renderResetPassword = () => (
    <>
      {renderHeader(
        "Reset Password",
        "Create a new password for your account"
      )}

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      {success && (
        <div style={successStyle}>
          {success}
        </div>
      )}

      <form onSubmit={handleResetPassword}>
        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <label style={labelStyle}>
            Reset Token
          </label>

          <input
            type="text"
            placeholder="Enter reset token"
            value={resetToken}
            onChange={(e) =>
              setResetToken(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <label style={labelStyle}>
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
            autoComplete="new-password"
          />
        </div>

        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <label style={labelStyle}>
            Confirm New Password
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            style={inputStyle}
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={primaryButtonStyle}
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </form>

      <div
        style={{
          textAlign: "center",
          marginTop: "28px",
        }}
      >
        <button
          type="button"
          onClick={() => {
            clearMessages();
            setMode("login");
          }}
          style={linkButtonStyle}
        >
          ← Back to Login
        </button>
      </div>
    </>
  );

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        {mode === "login" &&
          renderLogin()}

        {mode === "register" &&
          renderRegister()}

        {mode === "forgot" &&
          renderForgotPassword()}

        {mode === "reset" &&
          renderResetPassword()}

      </div>
    </div>
  );
}