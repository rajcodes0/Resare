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

  if (type === "pdf")
    return <FileText {...props} style={{ color: "#f87171" }} />;

  if (type === "image")
    return <Image {...props} style={{ color: "#34d399" }} />;

  if (type === "zip")
    return <Archive {...props} style={{ color: "#fbbf24" }} />;

  return <LinkIcon {...props} style={{ color: "#60a5fa" }} />;
};

const typeBadge = (type) => {
  const map = {
    pdf: { bg: "#f8717115", color: "#f87171", label: "PDF" },
    image: { bg: "#34d39915", color: "#34d399", label: "Image" },
    zip: { bg: "#fbbf2415", color: "#fbbf24", label: "ZIP" },
    link: { bg: "#60a5fa15", color: "#60a5fa", label: "Link" },
  };

  return map[type] || map.link;
};

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);

      // Try to fetch user's files specifically
      const { data } = await api.get("/v1/files/my").catch(() => {
        // Fallback to general files endpoint if /my doesn't exist
        return api.get("/files");
      });

      if (data?.success && Array.isArray(data.files)) {
        // Filter to show only current user's files
        const userFiles = data.files.filter(
          (f) => f.creatorId === user._id || f.creatorId?._id === user._id,
        );
        setFiles(userFiles);
      } else if (data?.files) {
        // If no success flag but has files array
        const userFiles = data.files.filter(
          (f) => f.creatorId === user._id || f.creatorId?._id === user._id,
        );
        setFiles(userFiles);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error("Failed to load files:", error);
      toast.error("Failed to load your files");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  // Refetch when user changes
  useEffect(() => {
    if (user?._id) {
      fetchFiles();
    }
  }, [user?._id, fetchFiles]);

  const deleteFile = async (id) => {
    try {
      await api.delete(`/files/${id}`);

      setFiles((prev) => prev.filter((f) => f._id !== id));

      toast.success("File deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const filtered = files.filter((f) => {
    const name = f.document?.originalName?.toLowerCase() || "";

    return name.includes(search.toLowerCase());
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
      value: "0",
      change: "coming soon",
    },
    {
      icon: Users,
      label: "Followers",
      value: "0",
      change: "coming soon",
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
                      {isLink && file.url
                        ? file.url.split("/").pop() || file.url
                        : file.document?.originalName || "Untitled"}
                    </p>

                    <p
                      className="text-xs"
                      style={{ color: theme.text.secondary }}
                    >
                      {isLink && file.url ? (
                        <span
                          className="text-blue-400 hover:underline cursor-pointer"
                          onClick={() => window.open(file.url, "_blank")}
                        >
                          {file.url}
                        </span>
                      ) : (
                        `${((file.document?.fileSize || 0) / 1024 / 1024).toFixed(1)} MB`
                      )}
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
          <div className="flex items-center gap-2 mb-2">
            <Activity size={15} style={{ color: theme.highlight }} />
            <h2 className="font-semibold text-base">Recent Activity</h2>
          </div>

          <div
            className="text-center py-8 text-xs"
            style={{ color: theme.text.secondary }}
          >
            Activity tracking coming soon
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
