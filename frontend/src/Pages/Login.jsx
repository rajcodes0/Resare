import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn, Eye, EyeOff, CloudUpload } from "lucide-react";

const bg = "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)";
const gradText = {
  background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const toastStyle = (success) => ({
  borderRadius: "12px",
  background: "#1e1e2e",
  color: success ? "#4ade80" : "#f87171",
  border: `1px solid ${success ? "#4ade8033" : "#f8717133"}`,
});

function InputField({ icon: Icon, type, name, placeholder, value, onChange }) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200"
      style={{
        background: "#ffffff08",
        border: focused ? "1px solid #6366f160" : "1px solid #ffffff12",
        boxShadow: focused ? "0 0 0 3px #6366f110" : "none",
      }}
    >
      {Icon && (
        <Icon
          size={16}
          style={{ color: focused ? "#818cf8" : "#475569", flexShrink: 0 }}
        />
      )}
      <input
        type={isPassword && showPw ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent outline-none text-sm"
        style={{ color: "#e2e8f0" }}
        autoComplete={isPassword ? "current-password" : "email"}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPw((v) => !v)}
          style={{ color: "#475569" }}
          className="hover:text-indigo-400 transition-colors"
        >
          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      )}
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (data.success) {
        // Ensure user object has all required fields
        const userWithDefaults = {
          ...data.user,
          _id: data.user.id || data.user._id,
          bio: data.user.bio || "",
          downloads: data.user.downloads || 0,
          followers: data.user.followers || 0,
          socialLinks: data.user.socialLinks || {},
        };
        // Use AuthContext to update app state with token from response
        login(userWithDefaults, data.accessToken);
        toast.success("Welcome back! 🎉", {
          style: toastStyle(true),
        });
        // Navigate to dashboard after brief delay
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 50);
      } else {
        toast.error(data.message || "Login failed", {
          style: toastStyle(false),
        });
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message;

      // Provide specific error messages
      let finalMessage = "Server error. Try again.";
      if (errorMessage) {
        finalMessage = errorMessage;
      } else if (err?.response?.status === 401) {
        finalMessage = "Invalid email or password";
      } else if (err?.message === "Network Error") {
        finalMessage = "Cannot connect to server";
      }

      toast.error(finalMessage, {
        style: toastStyle(false),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: bg }}
    >
      {/* ambient orb */}
      <div
        style={{
          position: "fixed",
          top: "-10%",
          left: "-8%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6366f116 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-8%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #8b5cf612 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="relative w-full max-w-md rounded-3xl p-8 flex flex-col gap-6"
        style={{
          background: "linear-gradient(135deg, #ffffff0a, #ffffff04)",
          border: "1px solid #ffffff14",
          boxShadow: "0 24px 64px #00000050",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* logo */}
        <div className="flex flex-col items-center gap-3 mb-2">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 8px 24px #6366f135",
            }}
          >
            <CloudUpload size={22} style={{ color: "#fff" }} />
          </div>
          <h1 className="text-2xl font-bold" style={gradText}>
            Welcome back
          </h1>
          <p className="text-sm text-center" style={{ color: "#64748b" }}>
            Sign in to your Resare account
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: "#64748b" }}>
              Email
            </label>
            <InputField
              icon={Mail}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                className="text-xs font-medium"
                style={{ color: "#64748b" }}
              >
                Password
              </label>
              <Link
                to="/reset-email"
                className="text-xs transition-colors hover:text-indigo-400"
                style={{ color: "#818cf8" }}
              >
                Forgot password?
              </Link>
            </div>
            <InputField
              icon={Lock}
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              boxShadow: "0 6px 20px #6366f135",
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              <>
                <LogIn size={15} /> Sign In
              </>
            )}
          </button>
        </form>

        {/* divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "#ffffff10" }} />
          <span className="text-xs" style={{ color: "#334155" }}>
            New here?
          </span>
          <div className="flex-1 h-px" style={{ background: "#ffffff10" }} />
        </div>

        <Link
          to="/register"
          className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: "#ffffff08",
            border: "1px solid #ffffff12",
            color: "#c4b5fd",
          }}
        >
          Create an account →
        </Link>
      </div>
    </div>
  );
}

export default Login;
