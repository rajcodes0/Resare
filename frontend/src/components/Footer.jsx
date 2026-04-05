import React from "react";
import { Link } from "react-router-dom";
import {
  CloudUpload,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const LINKS = {
  Product: [
    { label: "Upload a File", to: "/Upload" },
    { label: "Dashboard", to: "/Dashboard" },
    { label: "Creator Profiles", to: "/CreatorProfile" },
    { label: "File Details", to: "/FileDetail" },
  ],
  Account: [
    { label: "Login", to: "/Login" },
    { label: "Register", to: "/Register" },
    { label: "Reset Password", to: "/ResetPassword" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "#" },
    { label: "Terms of Service", to: "#" },
    { label: "Cookie Policy", to: "#" },
  ],
};

const SOCIALS = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@resare.app" },
];

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0f0c29 0%, #0a0818 100%)",
        borderTop: "1px solid #ffffff0a",
        color: "#e2e8f0",
      }}
    >
      {/* ── top section ── */}
      <div className="px-6 md:px-16 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* brand col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl w-fit"
              style={{
                background:
                  "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                <CloudUpload size={14} style={{ color: "#fff" }} />
              </div>
              Resare
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "#64748b" }}
            >
              The open platform for sharing files, notes, and creative assets
              with students and teams — instant, free, and under 25 MB.
            </p>

            {/* socials */}
            <div className="flex gap-2 mt-1">
              {/* eslint-disable-next-line no-unused-vars */}
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500/20"
                  style={{
                    background: "#ffffff08",
                    border: "1px solid #ffffff10",
                    color: "#818cf8",
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            {/* newsletter blurb */}
            <div
              className="mt-2 rounded-2xl p-4 flex flex-col gap-3"
              style={{ background: "#ffffff06", border: "1px solid #ffffff0a" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#94a3b8" }}>
                Get updates
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                  style={{
                    background: "#ffffff08",
                    border: "1px solid #ffffff10",
                    color: "#e2e8f0",
                  }}
                />
                <button
                  className="px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    boxShadow: "0 4px 14px #6366f130",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* link cols */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-3">
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#475569" }}
              >
                {section}
              </p>
              {links.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center gap-1 text-sm transition-colors duration-200 group"
                  style={{ color: "#64748b" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#c4b5fd")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#64748b")
                  }
                >
                  {label}
                  <ArrowUpRight
                    size={11}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#818cf8" }}
                  />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── bottom bar ── */}
      <div
        className="px-6 md:px-16 py-4 flex flex-wrap items-center justify-between gap-3 text-xs"
        style={{
          borderTop: "1px solid #ffffff08",
          color: "#334155",
        }}
      >
        <p>© {new Date().getFullYear()} Resare. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with{" "}
          <Heart size={11} fill="#f87171" style={{ color: "#f87171" }} /> by Raj
          Sharma
        </p>
      </div>
    </footer>
  );
}

export default Footer;
