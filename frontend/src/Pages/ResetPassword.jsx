import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import {
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  ArrowLeft,
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

function PwInput({ name, placeholder, value, onChange, autoComplete }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
      style={{
        background: "#ffffff08",
        border: focused ? "1px solid #6366f160" : "1px solid #ffffff12",
        boxShadow: focused ? "0 0 0 3px #6366f110" : "none",
      }}
    >
      <Lock
        size={16}
        style={{ color: focused ? "#818cf8" : "#475569", flexShrink: 0 }}
      />
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={autoComplete}
        className="flex-1 bg-transparent outline-none text-sm"
        style={{ color: "#e2e8f0" }}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        style={{ color: "#475569" }}
        className="hover:text-indigo-400 transition-colors"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

const RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "Contains a number", test: (p) => /\d/.test(p) },
  {
    label: "Contains a special character",
    test: (p) => /[^a-zA-Z0-9]/.test(p),
  },
];

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Check for token on page load
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error(
        "No reset token provided. Please request a new password reset.",
        {
          style: toastStyle(false),
        },
      );
      setTimeout(() => {
        navigate("/forgot-password");
      }, 2000);
    }
  }, [searchParams, navigate]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const strength = RULES.filter((r) => r.test(form.password)).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords don't match", { style: toastStyle(false) });
      return;
    }
    if (strength < 2) {
      toast.error("Please choose a stronger password", {
        style: toastStyle(false),
      });
      return;
    }
    setLoading(true);
    try {
      const token = searchParams.get("token") || "";
      if (!token) {
        toast.error("Invalid reset link. Please request a new one.", {
          style: toastStyle(false),
        });
        setLoading(false);
        return;
      }

      const { data } = await api.post(`/api/v1/auth/reset-password/${token}`, {
        password: form.password,
      });
      if (data.success) {
        setDone(true);
        toast.success("Password reset successfully!", {
          style: toastStyle(true),
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message || "Reset failed", {
          style: toastStyle(false),
        });
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Server error. Try again.";
      console.error("Reset password error:", err);
      toast.error(errorMsg, {
        style: toastStyle(false),
      });
    } finally {
      setLoading(false);
    }
  };

  const strengthColor =
    ["#f87171", "#f87171", "#fbbf24", "#4ade80"][strength] || "#f87171";
  const strengthLabel =
    ["Too weak", "Weak", "Fair", "Strong"][strength] || "Too weak";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: bg }}
    >
      {/* orbs */}
      <div
        style={{
          position: "fixed",
          bottom: "-8%",
          right: "-5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6366f114 0%, transparent 70%)",
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
        {/* back */}
        <Link
          to="/login"
          className="flex items-center gap-1.5 text-sm w-fit transition-colors hover:text-indigo-400"
          style={{ color: "#475569" }}
        >
          <ArrowLeft size={14} /> Back to login
        </Link>

        {!done ? (
          <>
            {/* heading */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 8px 24px #6366f135",
                }}
              >
                <KeyRound size={24} style={{ color: "#fff" }} />
              </div>
              <h1 className="text-2xl font-bold" style={gradText}>
                Reset password
              </h1>
              <p className="text-sm text-center" style={{ color: "#64748b" }}>
                Choose a new secure password for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* new password */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-medium"
                  style={{ color: "#64748b" }}
                >
                  New Password
                </label>
                <PwInput
                  name="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                {/* strength bar */}
                {form.password.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-1">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="flex-1 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            background:
                              strength > i ? strengthColor : "#ffffff10",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: strengthColor }}>
                      {strengthLabel}
                    </p>
                  </div>
                )}

                {/* rules */}
                {form.password.length > 0 && (
                  <div className="flex flex-col gap-1 mt-1">
                    {RULES.map(({ label, test }) => {
                      const ok = test(form.password);
                      return (
                        <div key={label} className="flex items-center gap-1.5">
                          <CheckCircle2
                            size={12}
                            style={{
                              color: ok ? "#4ade80" : "#334155",
                              flexShrink: 0,
                            }}
                          />
                          <span
                            className="text-xs"
                            style={{ color: ok ? "#94a3b8" : "#334155" }}
                          >
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* confirm */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-medium"
                  style={{ color: "#64748b" }}
                >
                  Confirm Password
                </label>
                <PwInput
                  name="confirm"
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                {/* mismatch hint */}
                {form.confirm.length > 0 && form.password !== form.confirm && (
                  <p className="text-xs" style={{ color: "#f87171" }}>
                    Passwords don't match
                  </p>
                )}
                {form.confirm.length > 0 && form.password === form.confirm && (
                  <p className="text-xs" style={{ color: "#4ade80" }}>
                    ✓ Passwords match
                  </p>
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
                    Resetting…
                  </span>
                ) : (
                  <>
                    <KeyRound size={15} /> Reset Password
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* success state */
          <div className="flex flex-col items-center gap-5 py-6 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "#4ade8018", border: "1px solid #4ade8030" }}
            >
              <CheckCircle2 size={32} style={{ color: "#4ade80" }} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1" style={gradText}>
                Password updated!
              </h2>
              <p className="text-sm" style={{ color: "#64748b" }}>
                Your password has been reset successfully. You can now sign in.
              </p>
            </div>
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                boxShadow: "0 6px 20px #6366f135",
              }}
            >
              Go to Login →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
