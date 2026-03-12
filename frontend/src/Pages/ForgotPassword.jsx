import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Mail, ArrowLeft, Send, CloudUpload } from "lucide-react";

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

function ForgotPassword() {
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
      const { data } = await api.post("/v1/auth/forgot-password", { email });
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
            <CloudUpload size={26} style={{ color: "#fff" }} />
          </div>
          <h1 className="text-2xl font-bold" style={gradText}>
            Forgot password?
          </h1>
          <p className="text-sm text-center" style={{ color: "#64748b" }}>
            No worries. Enter your email and we'll send you a reset link.
          </p>
        </div>

        {!sent ? (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-medium"
                  style={{ color: "#64748b" }}
                >
                  Email address
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
                    style={{ color: focused ? "#818cf8" : "#475569" }}
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
                    autoComplete="email"
                  />
                </div>
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
                    Sending…
                  </span>
                ) : (
                  <>
                    <Send size={15} /> Send Reset Link
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* success state */
          <div
            className="flex flex-col items-center gap-4 py-4 px-6 rounded-2xl text-center"
            style={{ background: "#4ade8010", border: "1px solid #4ade8025" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "#4ade8020" }}
            >
              <Mail size={22} style={{ color: "#4ade80" }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#4ade80" }}>
                Check your inbox!
              </p>
              <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                We sent a reset link to{" "}
                <strong style={{ color: "#94a3b8" }}>{email}</strong>. It may
                take a minute.
              </p>
            </div>
            <button
              onClick={() => setSent(false)}
              className="text-xs transition-colors hover:text-indigo-400"
              style={{ color: "#818cf8" }}
            >
              Didn't receive it? Try again
            </button>
          </div>
        )}

        {/* footer link */}
        <p className="text-xs text-center" style={{ color: "#334155" }}>
          Remember your password?{" "}
          <Link
            to="/login"
            className="transition-colors hover:text-indigo-300"
            style={{ color: "#818cf8" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
