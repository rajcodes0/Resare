import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";
import userImg from "../assets/user.jpg";

import {
  ArrowLeft,
  Edit3,
  LogOut,
  Calendar,
  MapPin,
  Mail,
  User as UserIcon,
  FileText,
  Image,
  Archive,
  Link as LinkIcon,
} from "lucide-react";

function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div
        style={{
          background: theme.bg,
          minHeight: "100vh",
          color: theme.text.primary,
        }}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
            <p style={{ color: theme.text.secondary }} className="mb-6">
              Please log in to view your profile
            </p>
            <Link
              to="/login"
              className="px-6 py-2 rounded-lg font-semibold"
              style={{ background: theme.accent, color: "#fff" }}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        color: theme.text.primary,
      }}
    >
      <div className="px-6 md:px-16 py-10 max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg hover:bg-white/10 transition"
          style={{ color: theme.highlight }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Profile Header Card */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{
            background: `linear-gradient(135deg, ${theme.highlight}20, ${theme.highlight}05)`,
            border: theme.card.border,
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div
              className="w-32 h-32 rounded-2xl overflow-hidden shrink-0"
              style={{
                border: `3px solid ${theme.highlight}`,
                boxShadow: `0 8px 32px ${theme.highlight}20`,
              }}
            >
              <img
                src={user?.avatar || userImg}
                alt={user?.username}
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{user?.username}</h1>
                  <p
                    style={{ color: theme.text.secondary }}
                    className="text-lg"
                  >
                    @{user?.email?.split("@")[0]}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition hover:bg-red-500/20"
                  style={{ color: "#f87171", border: "1px solid #f8717133" }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>

              {/* User Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} style={{ color: theme.highlight }} />
                  <span style={{ color: theme.text.secondary }}>
                    {user?.email}
                  </span>
                </div>

                {user?.location && (
                  <div className="flex items-center gap-3">
                    <MapPin size={16} style={{ color: theme.highlight }} />
                    <span style={{ color: theme.text.secondary }}>
                      {user.location}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar size={16} style={{ color: theme.highlight }} />
                  <span style={{ color: theme.text.secondary }}>
                    Joined{" "}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 flex-wrap">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition hover:opacity-90"
                  style={{
                    background: theme.accent,
                    color: "#fff",
                  }}
                >
                  <FileText size={16} />
                  My Files
                </button>

                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition hover:bg-white/10"
                  style={{
                    background: theme.card.background,
                    border: theme.card.border,
                    color: theme.text.secondary,
                  }}
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: theme.card.background,
              border: theme.card.border,
            }}
          >
            <p
              className="text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              0
            </p>
            <p style={{ color: theme.text.secondary }} className="text-sm mt-2">
              Files Uploaded
            </p>
          </div>

          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: theme.card.background,
              border: theme.card.border,
            }}
          >
            <p
              className="text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {user?.followers || 0}
            </p>
            <p style={{ color: theme.text.secondary }} className="text-sm mt-2">
              Followers
            </p>
          </div>

          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: theme.card.background,
              border: theme.card.border,
            }}
          >
            <p
              className="text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {user?.following || 0}
            </p>
            <p style={{ color: theme.text.secondary }} className="text-sm mt-2">
              Following
            </p>
          </div>
        </div>

        {/* Bio Section */}
        {user?.bio && (
          <div
            className="rounded-2xl p-6 mb-8"
            style={{
              background: theme.card.background,
              border: theme.card.border,
            }}
          >
            <h3 className="font-semibold mb-3">Bio</h3>
            <p style={{ color: theme.text.secondary }}>{user.bio}</p>
          </div>
        )}

        {/* Account Info */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: theme.card.background,
            border: theme.card.border,
          }}
        >
          <h3 className="font-semibold mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span style={{ color: theme.text.secondary }}>User ID:</span>
              <code
                style={{ color: theme.highlight }}
                className="font-mono text-xs"
              >
                {user?._id}
              </code>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.text.secondary }}>
                Account Status:
              </span>
              <span style={{ color: "#34d399" }}>Active</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.text.secondary }}>Joined:</span>
              <span>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
