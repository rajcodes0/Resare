import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

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

function ResetEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email", { style: toastStyle(false) });
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("api/v1/auth/forgot-password", { email });
      if (data.success) {
        setSent(true);
        toast.success("Reset link sent! Check your inbox 📬", {
          style: toastStyle(true),
        });
      } else {
        toast.error(data.message || "Something went wrong", {
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
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: bg }}
    >
      {/* orbs */}
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

        {/* icon */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 8px 24px #6366f135",
            }}
          >
            <Mail size={26} style={{ color: "#fff" }} />
          </div>
          <h1 className="text-2xl font-bold" style={gradText}>
            Reset Password
          </h1>
          <p className="text-sm text-center" style={{ color: "#64748b" }}>
            {sent
              ? "Check your email for a password reset link"
              : "Enter your email to receive a password reset link"}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "#64748b" }}
              >
                Email Address
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: "#ffffff08",
                  border: focused
                    ? "1px solid #6366f160"
                    : "1px solid #ffffff12",
                  boxShadow: focused ? "0 0 0 3px #6366f110" : "none",
                }}
              >
                <Mail
                  size={16}
                  style={{
                    color: focused ? "#818cf8" : "#475569",
                    flexShrink: 0,
                  }}
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "#e2e8f0" }}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 8px 24px #6366f135",
              }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {/* Back to Login Link */}
            <p className="text-center text-sm" style={{ color: "#64748b" }}>
              Remembered your password?{" "}
              <Link
                to="/login"
                className="transition-colors hover:text-indigo-400"
                style={{ color: "#818cf8" }}
              >
                Sign in
              </Link>
            </p>
          </form>
        ) : (
          /* Success State */
          <div className="flex flex-col items-center gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                boxShadow: "0 8px 24px #4ade8035",
              }}
            >
              <CheckCircle2 size={32} style={{ color: "#fff" }} />
            </div>
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-lg font-semibold" style={gradText}>
                Email Sent!
              </h2>
              <p style={{ color: "#64748b" }} className="text-sm">
                We've sent a password reset link to{" "}
                <span style={{ color: "#e2e8f0" }} className="font-medium">
                  {email}
                </span>
              </p>
              <p style={{ color: "#64748b" }} className="text-xs">
                The link expires in 10 minutes
              </p>
            </div>

            {/* Reset or Back */}
            <button
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              className="w-full py-2 rounded-lg text-sm transition-colors"
              style={{
                background: "#ffffff08",
                color: "#818cf8",
                border: "1px solid #6366f133",
              }}
            >
              Send Another Link
            </button>
            <Link
              to="/login"
              className="w-full py-2 rounded-lg text-sm text-center transition-colors hover:text-indigo-400"
              style={{ color: "#64748b" }}
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetEmail;
