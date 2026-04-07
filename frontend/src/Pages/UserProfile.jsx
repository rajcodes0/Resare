import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
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
  Globe,
  ExternalLink,
  Save,
  X,
} from "lucide-react";

function UserProfile() {
  const { user, logout, setUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    bio: user?.bio || "",
    location: user?.location || "",
    socialLinks: {
      instagram: user?.socialLinks?.instagram || "",
      twitter: user?.socialLinks?.twitter || "",
      linkedin: user?.socialLinks?.linkedin || "",
      portfolio: user?.socialLinks?.portfolio || "",
      website: user?.socialLinks?.website || "",
    },
  });

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

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const res = await api.put("/api/v1/auth/profile", formData);
      if (res.data?.success) {
        toast.success("Profile updated successfully!");
        setUser(res.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.startsWith("social_")) {
      const socialField = field.replace("social_", "");
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [socialField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
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
          onClick={() => {
            if (isEditing) setIsEditing(false);
            else navigate(-1);
          }}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg hover:bg-white/10 transition"
          style={{ color: theme.highlight }}
        >
          {isEditing ? <X size={18} /> : <ArrowLeft size={18} />}
          {isEditing ? "Cancel" : "Back"}
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

              {isEditing ? (
                // Edit Form
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" style={{ color: theme.highlight }}>
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Tell us about yourself"
                      className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border"
                      style={{
                        borderColor: `${theme.highlight}30`,
                        color: theme.text.primary,
                      }}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" style={{ color: theme.highlight }}>
                      Location
                    </label>
                    <input
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Where are you from?"
                      className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border"
                      style={{
                        borderColor: `${theme.highlight}30`,
                        color: theme.text.primary,
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block" style={{ color: theme.highlight }}>
                      Social Links
                    </label>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs" style={{ color: theme.text.secondary }}>
                          Instagram Username
                        </label>
                        <input
                          value={formData.socialLinks.instagram}
                          onChange={(e) => handleInputChange("social_instagram", e.target.value)}
                          placeholder="your_instagram"
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border text-sm"
                          style={{
                            borderColor: `${theme.highlight}30`,
                            color: theme.text.primary,
                          }}
                        />
                      </div>

                      <div>
                        <label className="text-xs" style={{ color: theme.text.secondary }}>
                          Twitter Username
                        </label>
                        <input
                          value={formData.socialLinks.twitter}
                          onChange={(e) => handleInputChange("social_twitter", e.target.value)}
                          placeholder="your_twitter"
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border text-sm"
                          style={{
                            borderColor: `${theme.highlight}30`,
                            color: theme.text.primary,
                          }}
                        />
                      </div>

                      <div>
                        <label className="text-xs" style={{ color: theme.text.secondary }}>
                          LinkedIn Username
                        </label>
                        <input
                          value={formData.socialLinks.linkedin}
                          onChange={(e) => handleInputChange("social_linkedin", e.target.value)}
                          placeholder="your_linkedin"
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border text-sm"
                          style={{
                            borderColor: `${theme.highlight}30`,
                            color: theme.text.primary,
                          }}
                        />
                      </div>

                      <div>
                        <label className="text-xs" style={{ color: theme.text.secondary }}>
                          Portfolio URL
                        </label>
                        <input
                          value={formData.socialLinks.portfolio}
                          onChange={(e) => handleInputChange("social_portfolio", e.target.value)}
                          placeholder="https://yourportfolio.com"
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border text-sm"
                          style={{
                            borderColor: `${theme.highlight}30`,
                            color: theme.text.primary,
                          }}
                        />
                      </div>

                      <div>
                        <label className="text-xs" style={{ color: theme.text.secondary }}>
                          Website URL
                        </label>
                        <input
                          value={formData.socialLinks.website}
                          onChange={(e) => handleInputChange("social_website", e.target.value)}
                          placeholder="https://yourwebsite.com"
                          className="w-full mt-1 px-3 py-2 rounded-lg bg-transparent border text-sm"
                          style={{
                            borderColor: `${theme.highlight}30`,
                            color: theme.text.primary,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
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

                    {user?.bio && (
                      <div>
                        <p className="text-sm" style={{ color: theme.text.secondary }}>
                          {user.bio}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  {(user?.socialLinks?.instagram ||
                    user?.socialLinks?.twitter ||
                    user?.socialLinks?.linkedin ||
                    user?.socialLinks?.portfolio ||
                    user?.socialLinks?.website) && (
                    <div
                      className="mt-6 pt-6 border-t"
                      style={{ borderColor: `${theme.highlight}20` }}
                    >
                      <p
                        className="text-sm font-semibold mb-3"
                        style={{ color: theme.highlight }}
                      >
                        Connect With Me
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {user?.socialLinks?.instagram && (
                          <a
                            href={`https://instagram.com/${user.socialLinks.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition hover:opacity-80"
                            style={{
                              background: `${theme.highlight}15`,
                              color: theme.highlight,
                              border: `1px solid ${theme.highlight}30`,
                            }}
                          >
                            <LinkIcon size={14} />
                            <span className="text-xs font-medium">Instagram</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                        {user?.socialLinks?.twitter && (
                          <a
                            href={`https://twitter.com/${user.socialLinks.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition hover:opacity-80"
                            style={{
                              background: `${theme.highlight}15`,
                              color: theme.highlight,
                              border: `1px solid ${theme.highlight}30`,
                            }}
                          >
                            <LinkIcon size={14} />
                            <span className="text-xs font-medium">Twitter</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                        {user?.socialLinks?.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${user.socialLinks.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition hover:opacity-80"
                            style={{
                              background: `${theme.highlight}15`,
                              color: theme.highlight,
                              border: `1px solid ${theme.highlight}30`,
                            }}
                          >
                            <LinkIcon size={14} />
                            <span className="text-xs font-medium">LinkedIn</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                        {user?.socialLinks?.portfolio && (
                          <a
                            href={user.socialLinks.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition hover:opacity-80"
                            style={{
                              background: `${theme.highlight}15`,
                              color: theme.highlight,
                              border: `1px solid ${theme.highlight}30`,
                            }}
                          >
                            <Globe size={14} />
                            <span className="text-xs font-medium">Portfolio</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                        {user?.socialLinks?.website && (
                          <a
                            href={user.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition hover:opacity-80"
                            style={{
                              background: `${theme.highlight}15`,
                              color: theme.highlight,
                              border: `1px solid ${theme.highlight}30`,
                            }}
                          >
                            <Globe size={14} />
                            <span className="text-xs font-medium">Website</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 flex-wrap">
                {!isEditing ? (
                  <>
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
                      onClick={() => setIsEditing(true)}
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
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
                      style={{
                        background: theme.accent,
                        color: "#fff",
                      }}
                    >
                      <Save size={16} />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
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
                background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
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
                background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
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
                background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
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