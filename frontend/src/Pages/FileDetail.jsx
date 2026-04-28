import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import {
  FileText,
  Download,
  Eye,
  Heart,
  ChevronLeft,
  Clock,
  Copy,
  Check,
  Loader,
  Lock,
  UserPlus,
} from "lucide-react";

const bg = "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)";

const gradText = {
  background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

function FileDetail() {
  const { id: fileId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/files/${fileId}`);

        if (data?.success) {
          setFile(data.file);

          // Check access based on file type
          if (data.file.accessType === "follow_to_unlock" && user) {
            // Check if user has followed the creator
            try {
              const creatorId = data.file.creatorId?._id || data.file.creatorId;
              const followRes = await api
                .get(`/api/v1/follow/${creatorId}/status`)
                .catch(() => ({ data: { isFollowing: false } }));

              setIsFollowing(followRes.data?.isFollowing || false);
              setHasAccess(followRes.data?.isFollowing || false);
            } catch (err) {
              console.warn("Could not check follow status:", err);
              setHasAccess(false);
            }
          } else if (data.file.accessType === "private" && user) {
            // Check if user is the creator
            setHasAccess(
              data.file.creatorId?._id === user._id ||
                data.file.creatorId === user._id,
            );
          } else if (data.file.accessType === "public") {
            setHasAccess(true);
          } else if (!user && data.file.accessType !== "public") {
            setHasAccess(false);
          }
        } else {
          toast.error("File not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load file details");
      } finally {
        setLoading(false);
      }
    };

    if (fileId) {
      fetchFile();
    }
  }, [fileId, user]);

  const handleDownload = async () => {
    if (!hasAccess) {
      toast.error("You must follow the creator to download this file");
      return;
    }

    if (!file?.document?.url) {
      toast.error("Download link unavailable");
      return;
    }

    try {
      // Try to track download if backend supports it
      await api.post(`/files/${fileId}/download`).catch(() => {
        // Silently ignore if endpoint doesn't exist, still proceed with download
      });

      // Open file in new tab (browser will handle download)
      window.open(file.document.url, "_blank");
      toast.success("Download started!");
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Failed to download file");
    }
  };

  const handleFollow = async () => {
    if (!user) {
      toast.error("Please log in to follow");
      navigate("/login");
      return;
    }

    if (isFollowing) {
      toast.info("You are already following this creator");
      return;
    }

    setFollowLoading(true);
    try {
      const creatorId = file.creatorId?._id || file.creatorId;
      const res = await api.post(`/api/v1/follow/${creatorId}`, {
        platform: "direct",
      });

      if (res.data?.success) {
        setIsFollowing(true);
        setHasAccess(true);
        toast.success("Following creator! File unlocked 🎉");
      }
    } catch (error) {
      console.error("Follow error:", error);
      toast.error(error?.response?.data?.message || "Could not follow creator");
    } finally {
      setFollowLoading(false);
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/file/${fileId}`;
    navigator.clipboard.writeText(link);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    toast.success("Link copied!");
  };

  if (loading) {
    return (
      <div
        style={{
          background: bg,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <Loader
            size={32}
            style={{ color: "#818cf8", animation: "spin 1s linear infinite" }}
          />
          <p style={{ color: "#94a3b8" }}>Loading file details...</p>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!file) {
    return (
      <div style={{ background: bg, minHeight: "100vh", color: "#e2e8f0" }}>
        <div className="px-6 md:px-16 py-10">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 mb-8 text-sm hover:text-indigo-400 transition-colors"
            style={{ color: "#94a3b8" }}
          >
            <ChevronLeft size={16} />
            Back
          </Link>

          <div className="text-center py-20">
            <p style={{ color: "#64748b" }}>File not found</p>
          </div>
        </div>
      </div>
    );
  }

  const fileSize = ((file.document?.fileSize || 0) / 1024 / 1024).toFixed(1);

  return (
    <div style={{ background: bg, minHeight: "100vh", color: "#e2e8f0" }}>
      <div className="px-6 md:px-16 py-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm hover:text-indigo-400 transition-colors"
          style={{ color: "#94a3b8" }}
        >
          <ChevronLeft size={16} />
          Back to Dashboard
        </Link>
      </div>

      <div className="px-6 md:px-16 py-10 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div
            className="rounded-2xl p-8 flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #6366f118, #8b5cf618)",
              border: "1px solid #ffffff12",
              width: "200px",
              height: "200px",
            }}
          >
            <FileText size={64} style={{ color: "#818cf8" }} />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2" style={gradText}>
              {file.document?.originalName || "Untitled File"}
            </h1>

            <p style={{ color: "#94a3b8" }} className="mb-6">
              {file.document?.fileType?.toUpperCase()} • {fileSize} MB
            </p>

            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Eye size={16} style={{ color: "#818cf8" }} />
                <div>
                  <p className="text-xs" style={{ color: "#64748b" }}>
                    Views
                  </p>
                  <p className="text-lg font-semibold">0</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Download size={16} style={{ color: "#818cf8" }} />
                <div>
                  <p className="text-xs" style={{ color: "#64748b" }}>
                    Downloads
                  </p>
                  <p className="text-lg font-semibold">0</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} style={{ color: "#818cf8" }} />
                <div>
                  <p className="text-xs" style={{ color: "#64748b" }}>
                    Uploaded
                  </p>
                  <p className="text-lg font-semibold">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownload}
                disabled={!hasAccess}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: hasAccess
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "linear-gradient(135deg, #64748b, #475569)",
                  color: "#fff",
                  boxShadow: hasAccess ? "0 6px 24px #6366f135" : "none",
                }}
              >
                <Download size={16} />
                {hasAccess ? "Download" : "Locked"}
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: "#ffffff08",
                  border: "1px solid #ffffff12",
                  color: "#94a3b8",
                }}
              >
                {copied ? (
                  <>
                    <Check size={16} style={{ color: "#34d399" }} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Link
                  </>
                )}
              </button>

              <button
                onClick={() => setLiked(!liked)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: liked ? "#f8717115" : "#ffffff08",
                  border: "1px solid #ffffff12",
                  color: liked ? "#f87171" : "#94a3b8",
                }}
              >
                <Heart size={16} fill={liked ? "currentColor" : "none"} />
                Like
              </button>

              {!hasAccess && file?.accessType === "follow_to_unlock" && (
                <button
                  onClick={handleFollow}
                  disabled={followLoading || isFollowing}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #34d399, #10b981)",
                    color: "#fff",
                    boxShadow: "0 6px 24px #34d39935",
                  }}
                >
                  <UserPlus size={16} />
                  {followLoading
                    ? "Following..."
                    : isFollowing
                      ? "Following"
                      : "Follow to Unlock"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: hasAccess ? "#ffffff08" : "#f8717115",
            border: hasAccess ? "1px solid #ffffff12" : "1px solid #f8717130",
          }}
        >
          <div className="flex items-start gap-3">
            {!hasAccess && (
              <Lock size={20} style={{ color: "#f87171", marginTop: "2px" }} />
            )}
            <div>
              <h2 className="text-lg font-semibold mb-3">
                {hasAccess ? "✅ Access Granted" : "🔒 Access Restricted"}
              </h2>

              <p style={{ color: "#94a3b8" }} className="text-sm">
                {file?.accessType === "public" &&
                  "🌍 Anyone with the link can view and download this file."}

                {file?.accessType === "private" &&
                  "🔒 This file is private. Only you can access it."}

                {file?.accessType === "follow_to_unlock" &&
                  (hasAccess
                    ? "👥 You are following this creator and can access all their files for 30 days."
                    : "👥 Follow the creator to unlock this file and access all their content for 30 days.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileDetail;
