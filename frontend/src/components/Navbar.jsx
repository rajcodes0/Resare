import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

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
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Upload", to: "/upload", icon: CloudUpload },
];

const PROFILE_LINKS = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Reset Password", to: "/reset-password", icon: KeyRound },
  { label: "Settings", to: "/settings", icon: Settings },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const dropdownRef = useRef(null);

  const isLoggedIn = !!user;

  /* Close menu when route changes */
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
    // eslint-disable react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* Navbar glass effect on scroll */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(15,12,41,0.88)" : "rgba(15,12,41,0.60)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid #ffffff12"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px #00000040" : "none",
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl select-none"
            style={{
              background: "linear-gradient(135deg,#e0e7ff,#c4b5fd,#818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              }}
            >
              <CloudUpload size={14} style={{ color: "#fff" }} />
            </div>
            Resare
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* eslint-disable-next-line no-unused-vars */}
            {NAV_LINKS.map(({ label, to, icon: NavIcon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive(to) ? "#6366f120" : "transparent",
                  color: isActive(to) ? "#c4b5fd" : "#94a3b8",
                  border: isActive(to)
                    ? "1px solid #6366f130"
                    : "1px solid transparent",
                }}
              >
                <NavIcon size={14} />
                {label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl ml-2 md:ml-4 mr-auto"
            style={{
              background: "#ffffff08",
              border: "1px solid #ffffff10",
              width: window.innerWidth < 640 ? "100px" : window.innerWidth < 768 ? "140px" : "220px",
            }}
          >
            <SearchIcon size={14} style={{ color: "#64748b" }} />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = e.target.search.value.trim();

                if (q) {
                  navigate(`/search?q=${encodeURIComponent(q)}`);
                  e.target.reset();
                }
              }}
            >
              <input
                name="search"
                autoComplete="off"
                placeholder={
                  window.innerWidth < 640 ? "Search" : window.innerWidth < 768 ? "Search..." : "Search files..."
                }
                className="bg-transparent outline-none text-xs w-full"
                style={{ color: "#cbd5e1" }}
              />
            </form>
          </div>

          {/* Auth section */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium"
                  style={{
                    color: "#94a3b8",
                    border: "1px solid #ffffff10",
                    background: "#ffffff06",
                  }}
                >
                  <LogIn size={14} />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    color: "#fff",
                  }}
                >
                  <UserPlus size={14} />
                  Register
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-1.5 py-1 pl-1 pr-2.5 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    border: "1px solid #ffffff12",
                    background: dropOpen ? "#ffffff12" : "transparent",
                  }}
                >
                  <img
                    src={user?.avatar || userImg}
                    alt="user"
                    className="w-7 h-7 rounded-lg object-cover"
                  />

                  <ChevronDown
                    size={13}
                    style={{
                      color: "#64748b",
                      transform: dropOpen ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 200ms ease",
                    }}
                  />
                </button>

                {dropOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(20,18,50,0.95)",
                      border: "1px solid #ffffff12",
                      boxShadow: "0 16px 48px #00000060",
                      zIndex: 1000,
                      animation: "slideDown 200ms ease",
                    }}
                  >
                    <div
                      className="px-4 py-3"
                      style={{
                        borderBottom: "1px solid #ffffff10",
                      }}
                    >
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#e2e8f0" }}
                      >
                        {user?.username || "User"}
                      </p>

                      <p className="text-xs" style={{ color: "#475569" }}>
                        @{user?.email?.split("@")[0]}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-white/5"
                      style={{
                        color: "#94a3b8",
                        borderBottom: "1px solid #ffffff10",
                      }}
                    >
                      <User size={14} />
                      My Profile
                    </Link>

                    {/* eslint-disable-next-line no-unused-vars */}
                    {PROFILE_LINKS.map(({ label, to, icon: ProfileIcon }) => (
                      <Link
                        key={label}
                        to={to}
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-white/5"
                        style={{ color: "#94a3b8" }}
                      >
                        <ProfileIcon size={14} />
                        {label}
                      </Link>
                    ))}

                    <button
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm"
                      style={{ color: "#f87171" }}
                      onClick={async () => {
                        await logout();
                        navigate("/");
                      }}
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#94a3b8" }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden px-5 pb-5 flex flex-col gap-2"
            style={{ borderTop: "1px solid #ffffff10" }}
          >
            {/* eslint-disable-next-line no-unused-vars */}
            {NAV_LINKS.map(({ label, to, icon: MobileIcon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                style={{
                  background: isActive(to) ? "#6366f118" : "transparent",
                  color: "#94a3b8",
                }}
              >
                <MobileIcon size={15} />
                {label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="flex gap-2 mt-2">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2.5 rounded-xl"
                  style={{
                    background: "#ffffff08",
                    border: "1px solid #ffffff10",
                  }}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex-1 text-center py-2.5 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    color: "#fff",
                  }}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                  style={{
                    background: "#6366f110",
                    border: "1px solid #6366f130",
                    color: "#c4b5fd",
                  }}
                >
                  <User size={15} />
                  My Profile
                </Link>
                <button
                  className="w-full text-center py-2.5 rounded-xl transition-colors duration-200 hover:bg-red-600/20"
                  style={{
                    background: "#ef444420",
                    color: "#f87171",
                    border: "1px solid #f8717130",
                  }}
                  onClick={async () => {
                    await logout();
                    setMenuOpen(false);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <div style={{ height: "64px" }} />
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
