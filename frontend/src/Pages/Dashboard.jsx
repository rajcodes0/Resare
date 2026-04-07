import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";

import {
  LayoutDashboard,
  FileText,
  Image,
  Archive,
  Link as LinkIcon,
  Download,
  Eye,
  Trash2,
  TrendingUp,
  Users,
  HardDrive,
  Search,
  Plus,
  ChevronRight,
  Activity,
} from "lucide-react";

/* helpers */

const fileIcon = (type) => {
  const props = { size: 16 };
  const fileType = (type || "link").toLowerCase();

  if (fileType.includes("pdf"))
    return <FileText {...props} style={{ color: "#f87171" }} />;

  if (fileType.includes("image"))
    return <Image {...props} style={{ color: "#34d399" }} />;

  if (fileType.includes("zip") || fileType.includes("compressed"))
    return <Archive {...props} style={{ color: "#fbbf24" }} />;

  return <LinkIcon {...props} style={{ color: "#60a5fa" }} />;
};

const typeBadge = (type) => {
  const fileType = (type || "link").toLowerCase();

  if (fileType.includes("pdf")) {
    return { bg: "#f8717115", color: "#f87171", label: "PDF" };
  }
  if (fileType.includes("image")) {
    return { bg: "#34d39915", color: "#34d399", label: "Image" };
  }
  if (fileType.includes("zip") || fileType.includes("compressed")) {
    return { bg: "#fbbf2415", color: "#fbbf24", label: "ZIP" };
  }

  return { bg: "#60a5fa15", color: "#60a5fa", label: "Link" };
};

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [followers, setFollowers] = useState(0);
  const [activities, setActivities] = useState([]);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch user's files from the correct endpoint
      const filesRes = await api.get("/api/files/my").catch(() => {
        // Fallback to general files endpoint
        return api.get("/api/files");
      });

      if (filesRes.data?.success && Array.isArray(filesRes.data.files)) {
        setFiles(filesRes.data.files);
      } else if (filesRes.data?.files) {
        setFiles(filesRes.data.files);
      } else {
        setFiles([]);
      }

      // Fetch user profile to get followers count
      if (user?._id) {
        try {
          const userRes = await api.get(`/api/v1/auth/profile/${user._id}`);
          if (userRes.data?.user) {
            setFollowers(userRes.data.user.followers || 0);
            // Update auth context if user data changed
            if (setUser) {
              setUser(userRes.data.user);
            }
          }
        } catch (err) {
          console.warn("Could not fetch profile details:", err);
        }

        // Fetch activities/action logs
        try {
          const activitiesRes = await api.get(`/api/actions`);
          if (activitiesRes.data?.actions) {
            setActivities(activitiesRes.data.actions.slice(0, 5));
          }
        } catch (err) {
          console.warn("Could not fetch activities:", err);
        }
      }
    } catch (error) {
      console.error("Failed to load files:", error);
      toast.error("Failed to load your files");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [user?._id, setUser]);

  // Refetch when user changes
  useEffect(() => {
    if (user?._id) {
      console.log("Dashboard: User ID changed, fetching files for", user._id);
      fetchFiles();
    }
  }, [user?._id]);

  const deleteFile = async (id) => {
    try {
      await api.delete(`/api/files/${id}`);

      setFiles((prev) => prev.filter((f) => f._id !== id));

      toast.success("File deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const filtered = files.filter((f) => {
    const name = (
      f.document?.title ||
      f.document?.originalName ||
      ""
    ).toLowerCase();
    const searchTerm = search.toLowerCase();

    return name.includes(searchTerm);
  });

  const totalSize =
    files.reduce((sum, f) => sum + Number(f.document?.fileSize || 0), 0) /
    (1024 * 1024);

  const stats = [
    {
      icon: HardDrive,
      label: "Total Uploads",
      value: files.length.toString(),
      change: "files uploaded",
    },
    {
      icon: Eye,
      label: "Total Size",
      value: totalSize.toFixed(1) + " MB",
      change: "storage used",
    },
    {
      icon: Download,
      label: "Downloads",
      value: user?.downloads || "0",
      change: "total downloads",
    },
    {
      icon: Users,
      label: "Followers",
      value: followers.toString(),
      change: "followers",
    },
  ];

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        color: theme.text.primary,
      }}
    >
      <div className="relative px-6 md:px-16 py-10">
        {/* header */}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard size={20} style={{ color: theme.highlight }} />
              <span
                className="text-sm font-medium"
                style={{ color: theme.highlight }}
              >
                Dashboard
              </span>
            </div>

            <h1
              className="text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome back, {user?.username || "User"}!
            </h1>

            <p className="text-sm mt-1" style={{ color: theme.text.secondary }}>
              Here's what's happening with your files.{" "}
              {user?.email && `(${user.email})`}
            </p>
          </div>

          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
            style={{
              background: theme.accent,
              color: "#fff",
            }}
          >
            <Plus size={16} />
            New Upload
          </Link>
        </div>

        {/* stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* eslint-disable-next-line no-unused-vars */}
          {stats.map(({ icon: IconComponent, label, value, change }) => (
            <div
              key={label}
              className="p-5 rounded-2xl flex flex-col gap-3"
              style={{
                background: theme.card.background,
                border: theme.card.border,
              }}
            >
              <div className="flex items-center justify-between">
                <IconComponent size={18} style={{ color: theme.highlight }} />
                <TrendingUp size={14} style={{ color: "#34d399" }} />
              </div>

              <div>
                <p
                  className="text-2xl font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </p>

                <p
                  className="text-xs mt-0.5"
                  style={{ color: theme.text.secondary }}
                >
                  {label}
                </p>
              </div>

              <p className="text-xs font-medium" style={{ color: "#34d399" }}>
                {change}
              </p>
            </div>
          ))}
        </div>

        {/* files */}

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: theme.card.background,
            border: theme.card.border,
          }}
        >
          <div
            className="flex items-center justify-between p-5"
            style={{ borderBottom: "1px solid #ffffff10" }}
          >
            <h2 className="font-semibold">My Files</h2>

            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{
                background: theme.accentLight,
                border: `1px solid ${theme.highlight}30`,
              }}
            >
              <Search size={13} style={{ color: theme.text.muted }} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search files"
                className="bg-transparent outline-none text-xs w-28"
                style={{ color: theme.text.primary }}
              />
            </div>
          </div>

          {loading ? (
            <div
              className="text-center py-12 text-sm"
              style={{ color: theme.text.secondary }}
            >
              Loading files...
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-12 text-sm"
              style={{ color: theme.text.secondary }}
            >
              No files found
            </div>
          ) : (
            filtered.map((file) => {
              const isLink = file.isLink || file.document?.fileType === "link";
              const badge = typeBadge(file.document?.fileType || "link");

              return (
                <div
                  key={file._id}
                  className="flex items-center gap-4 px-5 py-3.5 border-b border-white/5"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    {fileIcon(file.document?.fileType || "link")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {file.document?.title ||
                        file.document?.originalName ||
                        (file.url ? file.url.split("/").pop() : "Untitled")}
                    </p>

                    <p
                      className="text-xs"
                      style={{ color: theme.text.secondary }}
                    >
                      {file.document?.fileSize
                        ? `${((file.document.fileSize || 0) / 1024 / 1024).toFixed(1)} MB`
                        : "Link"}
                    </p>
                  </div>

                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: badge.bg,
                      color: badge.color,
                    }}
                  >
                    {badge.label}
                  </span>

                  {!isLink && (
                    <Link
                      to={`/file/${file._id}`}
                      className="p-1.5 rounded-lg hover:bg-white/10"
                    >
                      <ChevronRight
                        size={15}
                        style={{ color: theme.highlight }}
                      />
                    </Link>
                  )}

                  <button
                    onClick={() => deleteFile(file._id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10"
                  >
                    <Trash2 size={14} style={{ color: "#f87171" }} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* activity */}

        <div
          className="rounded-2xl p-5 mt-6"
          style={{
            background: theme.card.background,
            border: theme.card.border,
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity size={15} style={{ color: theme.highlight }} />
            <h2 className="font-semibold text-base">Recent Activity</h2>
          </div>

          {activities.length === 0 ? (
            <div
              className="text-center py-8 text-xs"
              style={{ color: theme.text.secondary }}
            >
              No recent activities
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div
                  key={activity._id || index}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{
                    background: `${theme.highlight}10`,
                    border: `1px solid ${theme.highlight}20`,
                  }}
                >
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: theme.text.primary }}
                    >
                      {activity.action || "Activity"}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: theme.text.secondary }}
                    >
                      {activity.createdAt
                        ? new Date(activity.createdAt).toLocaleDateString()
                        : "Recently"}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: `${theme.highlight}20`,
                      color: theme.highlight,
                    }}
                  >
                    {activity.status || "Recorded"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
