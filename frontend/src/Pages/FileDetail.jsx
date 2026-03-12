import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
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
} from "lucide-react";

const bg = "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)";

const gradText = {
  background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

function FileDetail() {
  const { id: fileId } = useParams();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/files/${fileId}`);

        if (data?.success) {
          setFile(data.file);
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
  }, [fileId]);

  const handleDownload = async () => {
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
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  boxShadow: "0 6px 24px #6366f135",
                }}
              >
                <Download size={16} />
                Download
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
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: "#ffffff08",
            border: "1px solid #ffffff12",
          }}
        >
          <h2 className="text-lg font-semibold mb-3">Access</h2>

          <p style={{ color: "#94a3b8" }} className="text-sm">
            {file.accessType === "public" &&
              "🌍 Anyone with the link can view and download this file."}

            {file.accessType === "private" &&
              "🔒 This file is private. Only you can access it."}

            {file.accessType === "follow_to_unlock" &&
              "👥 Follow the creator to unlock this file."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FileDetail;
