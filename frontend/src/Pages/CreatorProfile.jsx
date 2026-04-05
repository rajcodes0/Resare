import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import ThemeContext from "../context/ThemeContext";
import userImg from "../assets/user.jpg";
import { useParams } from "react-router-dom";

import {
  FileText,
  Image,
  Archive,
  Link as LinkIcon,
  Download,
  Eye,
  MapPin,
  Calendar,
  UserPlus,
  UserCheck,
  Share2,
  ExternalLink,
  Loader,
} from "lucide-react";

const bg = "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)";
const gradText = {
  background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const card = {
  background: "#ffffff08",
  border: "1px solid #ffffff12",
  borderRadius: "16px",
};

const typeConfig = {
  pdf: { Icon: FileText, color: "#f87171", bg: "#f8717115", label: "PDF" },
  image: { Icon: Image, color: "#34d399", bg: "#34d39915", label: "Image" },
  zip: { Icon: Archive, color: "#fbbf24", bg: "#fbbf2415", label: "ZIP" },
  link: { Icon: LinkIcon, color: "#60a5fa", bg: "#60a5fa15", label: "Link" },
};

const getFileType = (mimeType) => {
  if (!mimeType) return "link";
  if (mimeType.includes("pdf")) return "pdf";
  if (mimeType.includes("image")) return "image";
  if (mimeType.includes("zip") || mimeType.includes("compressed")) return "zip";
  return "link";
};

const StatPill = ({ value, label }) => (
  <div className="flex flex-col items-center px-6 py-3">
    <span className="text-xl font-bold" style={gradText}>
      {value}
    </span>
    <span className="text-xs mt-0.5" style={{ color: "#64748b" }}>
      {label}
    </span>
  </div>
);

function CreatorProfile() {
  const { id: userId } = useParams();

  const [creator, setCreator] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    const fetchCreatorData = async () => {
      setLoading(true);
      try {
        const [creatorRes, filesRes] = await Promise.all([
          api.get(`/api/v1/auth/profile/${userId}`).catch((err) => {
            console.error("Creator fetch failed:", err);
            return { data: { success: false, user: null } };
          }),
          api.get(`/files`).catch((err) => {
            console.error("Creator files fetch failed:", err);
            return { data: { success: false, files: [] } };
          }),
        ]);

        if (creatorRes.data?.success && creatorRes.data?.user) {
          setCreator(creatorRes.data.user);
        }

        if (filesRes.data?.success && filesRes.data?.files) {
          setFiles(filesRes.data.files);
        }
      } catch (err) {
        console.error("Error fetching creator data:", err);
        toast.error("Failed to load creator profile");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCreatorData();
    }
  }, [userId]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const filtered = files.filter((f) => {
    if (activeFilter === "All") return true;
    const ftype = getFileType(f.document?.fileType);
    return ftype === activeFilter.toLowerCase();
  });

  if (loading) {
    return (
      <div
        style={{
          background: bg,
          minHeight: "100vh",
          color: "#e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader size={40} style={{ animation: "spin 2s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!creator) {
    return (
      <div
        style={{
          background: bg,
          minHeight: "100vh",
          color: "#e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold" style={gradText}>
            Creator Not Found
          </h1>
          <p style={{ color: "#64748b", marginTop: "1rem" }}>
            The creator you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="text-indigo-400 hover:text-indigo-300 mt-4 inline-block"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const fileCount = files.length;

  return (
    <div style={{ background: bg, minHeight: "100vh", color: "#e2e8f0" }}>
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
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-5%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #8b5cf612 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* banner */}
        <div
          className="w-full h-40 md:h-56"
          style={{
            background:
              "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: "1px solid #ffffff15",
                width: `${80 + i * 60}px`,
                height: `${80 + i * 60}px`,
                top: "50%",
                left: `${10 + i * 12}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 60%, #1a1a3e)",
            }}
          />
        </div>

        {/* profile card */}
        <div className="px-6 md:px-20">
          <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14 md:-mt-16 mb-8">
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0"
              style={{
                border: "3px solid #1a1a3e",
                boxShadow: "0 8px 32px #00000050",
              }}
            >
              <img
                src={userImg}
                alt={creator.username}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold" style={gradText}>
                  {creator.username}
                </h1>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  @{creator.username}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setFollowed((v) => !v)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={
                    followed
                      ? {
                          background: "#ffffff10",
                          border: "1px solid #ffffff20",
                          color: "#94a3b8",
                        }
                      : {
                          background:
                            "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          color: "#fff",
                          boxShadow: "0 4px 18px #6366f135",
                        }
                  }
                >
                  {followed ? <UserCheck size={15} /> : <UserPlus size={15} />}
                  {followed ? "Following" : "Follow"}
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-white/10"
                  style={{
                    background: "#ffffff08",
                    border: "1px solid #ffffff12",
                    color: "#c4b5fd",
                  }}
                >
                  <Share2 size={14} />
                  {copiedShare ? "Link copied!" : "Share"}
                </button>
              </div>
            </div>
          </div>

          {/* bio row */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            <div className="flex-1 flex flex-col gap-4">
              <p
                className="text-sm leading-relaxed max-w-lg"
                style={{ color: "#94a3b8" }}
              >
                {creator.bio || "No bio added yet"}
              </p>

              <div
                className="flex flex-wrap gap-2 text-xs"
                style={{ color: "#64748b" }}
              >
                {creator.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {creator.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Joined {new Date(creator.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* stats */}
            <div
              className="self-start flex rounded-2xl overflow-hidden divide-x"
              style={{
                background: "#ffffff06",
                border: "1px solid #ffffff12",
                divideColor: "#ffffff10",
              }}
            >
              <StatPill value={fileCount} label="Files" />
              <StatPill value={creator.followers || 0} label="Followers" />
              <StatPill value={creator.following || 0} label="Following" />
            </div>
          </div>

          {/* files section */}
          <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-lg font-semibold" style={{ color: "#e2e8f0" }}>
              Files & Resources
            </h2>
            <div className="flex gap-2 flex-wrap">
              {["All", "PDF", "Image", "ZIP", "Link"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    background:
                      activeFilter === f
                        ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                        : "#ffffff08",
                    color: activeFilter === f ? "#fff" : "#94a3b8",
                    border: activeFilter === f ? "none" : "1px solid #ffffff10",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* file grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-12" style={{ color: "#64748b" }}>
              No files found in this category
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
              {filtered.map((file) => {
                const ftype = getFileType(file.document?.fileType);
                const { Icon, color, bg: iconBg, label } = typeConfig[ftype];
                return (
                  <Link
                    to={`/file/${file._id}`}
                    key={file._id}
                    className="flex flex-col gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                    style={{ ...card, boxShadow: "0 4px 20px #00000020" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = "0 8px 30px #6366f118")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "0 4px 20px #00000020")
                    }
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: iconBg }}
                      >
                        <Icon size={22} style={{ color }} />
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                        style={{ background: iconBg, color }}
                      >
                        {label}
                      </span>
                    </div>

                    <div>
                      <p
                        className="font-semibold text-sm leading-snug"
                        style={{ color: "#e2e8f0" }}
                      >
                        {file.document?.originalName || "Unnamed File"}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#475569" }}>
                        {((file.document?.fileSize || 0) / 1024 / 1024).toFixed(
                          1,
                        )}{" "}
                        MB · {new Date(file.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div
                      className="flex items-center justify-between text-xs"
                      style={{ color: "#64748b" }}
                    >
                      <span className="flex items-center gap-1">
                        <Eye size={12} />0 views
                      </span>
                      <span className="flex items-center gap-1">
                        <Download size={12} />0 dl
                      </span>
                      <ExternalLink
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "#818cf8" }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .divide-x > * + * { border-left: 1px solid #ffffff10; }
      `}</style>
    </div>
  );
}

export default CreatorProfile;
