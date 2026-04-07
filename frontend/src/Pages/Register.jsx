import  { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  Eye,
  EyeOff,
  CloudUpload,
  CheckCircle2,
} from "lucide-react";

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

function InputField({
  icon: InputIcon, // eslint-disable-line no-unused-vars
  type,
  name,
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === "password";

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200"
      style={{
        background: "#ffffff08",
        border: focused ? "1px solid #6366f160" : "1px solid #ffffff12",
        boxShadow: focused ? "0 0 0 3px #6366f110" : "none",
      }}
    >
      <InputIcon
        size={16}
        style={{ color: focused ? "#818cf8" : "#475569", flexShrink: 0 }}
      />
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
        autoComplete={autoComplete}
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

const PERKS = [
  "Upload up to 25 MB per file",
  "Share with anyone via link",
  "Build your creator profile",
  "Completely free, forever",
];

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        style: toastStyle(false),
      });
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/api/v1/auth/register", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (data.success) {
        toast.success("Account created! 🎉", { style: toastStyle(true) });
        // Navigation to login page after registration
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 50);
      } else {
        toast.error(data.message || "Registration failed", {
          style: toastStyle(false),
        });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error. Try again.", {
        style: toastStyle(false),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: bg }}
    >
      {/* ambient orbs */}
      <div
        style={{
          position: "fixed",
          top: "-10%",
          right: "-8%",
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
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #8b5cf612 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── left: perks panel ── */}
        <div
          className="hidden md:flex flex-col justify-center gap-8 p-10 rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #6366f118, #8b5cf614)",
            border: "1px solid #6366f130",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 6px 20px #6366f135",
                }}
              >
                <CloudUpload size={18} style={{ color: "#fff" }} />
              </div>
              <span className="text-xl font-bold" style={gradText}>
                Resare
              </span>
            </div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#e2e8f0" }}
            >
              Join thousands of creators
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
              Share your files, notes, and resources with the world in seconds.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {PERKS.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#4ade8015" }}
                >
                  <CheckCircle2 size={13} style={{ color: "#4ade80" }} />
                </div>
                <span className="text-sm" style={{ color: "#94a3b8" }}>
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── right: form ── */}
        <div
          className="rounded-3xl p-8 flex flex-col gap-6"
          style={{
            background: "linear-gradient(135deg, #ffffff0a, #ffffff04)",
            border: "1px solid #ffffff14",
            boxShadow: "0 24px 64px #00000050",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* heading */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold" style={gradText}>
              Create account
            </h1>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Free forever. No credit card needed.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "#64748b" }}
              >
                Username
              </label>
              <InputField
                icon={User}
                type="text"
                name="name"
                placeholder="coolcreator"
                value={formData.name}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "#64748b" }}
              >
                Email
              </label>
              <InputField
                icon={Mail}
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "#64748b" }}
              >
                Password
              </label>
              <InputField
                icon={Lock}
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {/* strength bar */}
              {formData.password.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full transition-all duration-300"
                      style={{
                        background:
                          formData.password.length >= i * 3
                            ? i <= 1
                              ? "#f87171"
                              : i <= 2
                                ? "#fbbf24"
                                : i <= 3
                                  ? "#34d399"
                                  : "#4ade80"
                            : "#ffffff10",
                      }}
                    />
                  ))}
                </div>
              )}
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
                  Creating account…
                </span>
              ) : (
                <>
                  <UserPlus size={15} /> Create Account
                </>
              )}
            </button>
          </form>

          {/* divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "#ffffff10" }} />
            <span className="text-xs" style={{ color: "#334155" }}>
              Already have an account?
            </span>
            <div className="flex-1 h-px" style={{ background: "#ffffff10" }} />
          </div>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#ffffff08",
              border: "1px solid #ffffff12",
              color: "#c4b5fd",
            }}
          >
            Sign in instead →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
