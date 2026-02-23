import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userImg from "../assets/user.jpg";
import {
  Home,
  LayoutDashboard,
  CloudUpload,
  User,
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronDown,
  Settings,
  KeyRound,
  LogOut,
  Search as SearchIcon,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", to: "/", icon: Home },
  { label: "Dashboard", to: "/Dashboard", icon: LayoutDashboard },
  { label: "Upload", to: "/Upload", icon: CloudUpload },
];

const PROFILE_LINKS = [
  { label: "My Profile", to: "/CreatorProfile", icon: User },
  { label: "Dashboard", to: "/Dashboard", icon: LayoutDashboard },
  { label: "Reset Password", to: "/ResetPassword", icon: KeyRound },
  { label: "Settings", to: "#", icon: Settings },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // close dropdown when route changes
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  // glass on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(15, 12, 41, 0.88)"
            : "rgba(15, 12, 41, 0.60)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled ? "1px solid #ffffff12" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px #00000040" : "none",
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-16">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl select-none"
            style={{
              background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <CloudUpload size={14} style={{ color: "#fff" }} />
            </div>
            Resare
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive(to) ? "#6366f120" : "transparent",
                  color: isActive(to) ? "#c4b5fd" : "#94a3b8",
                  border: isActive(to) ? "1px solid #6366f130" : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(to)) e.currentTarget.style.color = "#e2e8f0";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(to)) e.currentTarget.style.color = "#94a3b8";
                }}
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </div>

          {/* ── Search Bar ── */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl ml-4 mr-auto" style={{ background: "#ffffff08", border: "1px solid #ffffff10", width: "220px" }}>
            <SearchIcon size={14} style={{ color: "#64748b" }} />
            <form onSubmit={(e) => {
              e.preventDefault();
              const q = e.target.search.value.trim();
              if (q) navigate(`/Search?q=${encodeURIComponent(q)}`);
            }}>
              <input
                name="search"
                autoComplete="off"
                placeholder="Search files, creators..."
                className="bg-transparent outline-none text-xs w-full"
                style={{ color: "#cbd5e1" }}
              />
            </form>
          </div>

          {/* ── Right: auth + avatar ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/Login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{ color: "#94a3b8", border: "1px solid #ffffff10", background: "#ffffff06" }}
            >
              <LogIn size={14} />
              Login
            </Link>
            <Link
              to="/Register"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                boxShadow: "0 4px 16px #6366f135",
              }}
            >
              <UserPlus size={14} />
              Register
            </Link>

            {/* Avatar dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropOpen((v) => !v)}
                className="flex items-center gap-1.5 py-1 pl-1 pr-2.5 rounded-xl transition-all duration-200 hover:bg-white/5"
                style={{ border: "1px solid #ffffff12" }}
              >
                <img
                  src={userImg}
                  alt="user"
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <ChevronDown
                  size={13}
                  style={{
                    color: "#64748b",
                    transform: dropOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform .2s",
                  }}
                />
              </button>

              {dropOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(20, 18, 50, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid #ffffff12",
                    boxShadow: "0 16px 48px #00000060",
                    animation: "dropIn .15s ease",
                  }}
                >
                  {/* user info */}
                  <div className="px-4 py-3" style={{ borderBottom: "1px solid #ffffff10" }}>
                    <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Raj Sharma</p>
                    <p className="text-xs" style={{ color: "#475569" }}>@rajcodes</p>
                  </div>

                  {PROFILE_LINKS.map(({ label, to, icon: Icon }) => (
                    <Link
                      key={label}
                      to={to}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                      style={{ color: "#94a3b8" }}
                      onClick={() => setDropOpen(false)}
                    >
                      <Icon size={14} style={{ color: "#818cf8" }} />
                      {label}
                    </Link>
                  ))}

                  <div style={{ borderTop: "1px solid #ffffff10" }}>
                    <Link
                      to="/"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-red-500/10"
                      style={{ color: "#f87171" }}
                      onClick={() => setDropOpen(false)}
                    >
                      <LogOut size={14} />
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "#94a3b8" }}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div
            className="md:hidden px-5 pb-5 flex flex-col gap-2"
            style={{
              borderTop: "1px solid #ffffff10",
              animation: "dropIn .15s ease",
            }}
          >
            {NAV_LINKS.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: isActive(to) ? "#6366f118" : "transparent",
                  color: isActive(to) ? "#c4b5fd" : "#94a3b8",
                }}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2">
              <Link
                to="/Login"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "#ffffff08", border: "1px solid #ffffff10", color: "#94a3b8" }}
              >
                <LogIn size={14} /> Login
              </Link>
              <Link
                to="/Register"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
              >
                <UserPlus size={14} /> Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* spacer so page content clears the fixed navbar */}
      <div style={{ height: "64px" }} />

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default Navbar;
