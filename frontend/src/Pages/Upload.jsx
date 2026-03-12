import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  File,
  FileArchive,
  ImageUp,
  CloudUpload,
  CheckCircle2,
} from "lucide-react";
import api from "../utils/api";

function Upload() {
  const [file, setFile] = useState(null);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [_loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setActive(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size exceeds 50MB limit");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success || res.status === 201) {
        setActive(true);
        toast.success("Upload Complete!");
        console.log("File uploaded:", res.data.file);
        // Reset after 2 seconds
        setTimeout(() => {
          setFile(null);
          setActive(false);
        }, 2000);
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Upload failed";
      toast.error(errorMsg);
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="w-full px-6 py-10 md:px-16 lg:px-28"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 40%, #24243e 100%)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        {/* Header row */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Upload Files
            </h1>
            <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
              Drag & drop or browse to upload your resources
            </p>
          </div>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300"
            style={{
              background: active
                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              boxShadow: active
                ? "0 4px 20px #22c55e30"
                : "0 4px 20px #6366f130",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {active ? "✓ Uploaded" : "Upload"}
          </button>
        </div>

        {/* Drop Zone — full width, compact height */}
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="w-full rounded-2xl py-12 px-6 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300"
          style={{
            background: dragging
              ? "linear-gradient(135deg, #6366f110, #8b5cf610)"
              : "linear-gradient(135deg, #ffffff05, #ffffff02)",
            border: dragging ? "2px dashed #818cf8" : "2px dashed #334155",
            boxShadow: dragging
              ? "0 0 30px #6366f112, inset 0 0 30px #6366f106"
              : "none",
            transform: dragging ? "scale(1.005)" : "scale(1)",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <CloudUpload
            size={36}
            style={{ color: "#818cf8" }}
            className={dragging ? "animate-bounce" : ""}
          />

          <p className="text-sm font-medium" style={{ color: "#cbd5e1" }}>
            {dragging ? "Drop it here!" : "Click or drag & drop your file here"}
          </p>

          {/* File type icons row */}
          <div className="flex items-center gap-5 mt-1">
            {[
              { component: FileArchive, label: "Archive" },
              { component: File, label: "Document" },
              { component: ImageUp, label: "Image" },
            ].map(({ component: FileTypeIcon }) => (
              <div
                key={FileTypeIcon.displayName || FileTypeIcon.name || "icon"}
                className="flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <FileTypeIcon size={14} style={{ color: "#64748b" }} />
                <span className="text-xs" style={{ color: "#64748b" }}>
                  {FileTypeIcon.displayName || FileTypeIcon.name || "File"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected file info */}
        {file && (
          <div
            className="w-full rounded-xl px-5 py-3.5 flex items-center gap-4"
            style={{
              background: "#ffffff06",
              border: "1px solid #ffffff10",
              animation: "fadeSlideIn 0.25s ease-out",
            }}
          >
            <div
              className="rounded-lg p-2 shrink-0"
              style={{
                background: active
                  ? "linear-gradient(135deg, #4ade8018, #22c55e14)"
                  : "linear-gradient(135deg, #6366f118, #8b5cf614)",
              }}
            >
              {active ? (
                <CheckCircle2 size={18} style={{ color: "#4ade80" }} />
              ) : (
                <File size={18} style={{ color: "#818cf8" }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{ color: "#e2e8f0" }}
              >
                {file.name}
              </p>
              <p className="text-xs" style={{ color: "#64748b" }}>
                {formatSize(file.size)}
              </p>
            </div>
            {active && (
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: "#4ade8012",
                  color: "#4ade80",
                  border: "1px solid #4ade8020",
                }}
              >
                Done
              </span>
            )}
          </div>
        )}
      </form>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Upload;
