import React, { useState } from "react";
import { Link } from "react-router-dom";
import userImg from "../assets/user.jpg";
import {
  FileText,
  Download,
  Eye,
  Share2,
  Heart,
  Bookmark,
  ChevronLeft,
  Clock,
  HardDrive,
  Tag,
  Send,
  Copy,
  Check,
  ExternalLink,
  Star,
  MessageCircle,
  Flag,
} from "lucide-react";

/* ─── mock data ─── */
const FILE = {
  name: "React Notes Chapter 1 – Fundamentals.pdf",
  type: "PDF",
  size: "2.4 MB",
  uploadedAt: "February 22, 2026",
  views: 412,
  downloads: 89,
  likes: 34,
  description:
    "A comprehensive set of hand-crafted React notes covering JSX, components, props, state, and the core rendering model. Perfect for beginners or anyone revisiting fundamentals before an interview.",
  tags: ["React", "JavaScript", "Frontend", "Notes"],
  previewLines: [
    "Chapter 1 – What is React?",
    "1.1 Component-based architecture",
    "1.2 The Virtual DOM",
    "1.3 JSX syntax overview",
    "1.4 Functional vs Class components",
    "1.5 Props and one-way data binding",
    "1.6 State with useState hook",
    "1.7 Lifecycle with useEffect hook",
  ],
};

const CREATOR = { name: "Raj Sharma", handle: "@rajcodes" };

const RELATED = [
  { id: 2, name: "React Notes Ch2.pdf", type: "pdf", size: "3.1 MB", views: 287 },
  { id: 3, name: "JS Promises Cheatsheet.pdf", type: "pdf", size: "0.8 MB", views: 509 },
  { id: 4, name: "UI Components Pack.zip", type: "zip", size: "11 MB", views: 134 },
];

const COMMENTS = [
  { id: 1, user: "alex_dev", time: "2 hrs ago", text: "Super helpful notes, saved me hours before my interview 🙌" },
  { id: 2, user: "priya.codes", time: "Yesterday", text: "Very well structured! Could you do one on hooks in depth?" },
  { id: 3, user: "m.hassan99", time: "3 days ago", text: "Finally a clean React note that isn't 80 pages long 😅" },
];

/* ─── helpers ─── */
const bg = "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)";
const gradText = {
  background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const card = { background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: "16px" };

const MetaRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid #ffffff08" }}>
    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#6366f115" }}>
      <Icon size={13} style={{ color: "#818cf8" }} />
    </div>
    <span className="text-xs flex-1" style={{ color: "#64748b" }}>{label}</span>
    <span className="text-xs font-medium" style={{ color: "#cbd5e1" }}>{value}</span>
  </div>
);

/* ─── component ─── */
function FileDetail() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(COMMENTS);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const likeCount = FILE.likes + (liked ? 1 : 0);

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments((prev) => [
      { id: Date.now(), user: "you", time: "Just now", text: comment.trim() },
      ...prev,
    ]);
    setComment("");
  };

  return (
    <div style={{ background: bg, minHeight: "100vh", color: "#e2e8f0" }}>
      {/* ambient */}
      <div style={{ position: "fixed", top: "-10%", right: "-5%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, #6366f114 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div className="relative px-6 md:px-16 py-10" style={{ zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>

        {/* back */}
        <Link
          to="/Dashboard"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-indigo-400"
          style={{ color: "#64748b" }}
        >
          <ChevronLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ══ LEFT COLUMN ══ */}
          <div className="xl:col-span-2 flex flex-col gap-6">

            {/* ── preview card ── */}
            <div className="rounded-2xl overflow-hidden" style={card}>
              {/* top bar */}
              <div className="flex items-center gap-3 px-5 py-3" style={{ background: "#ffffff06", borderBottom: "1px solid #ffffff10" }}>
                <div className="flex gap-1.5">
                  {["#f87171", "#fbbf24", "#34d399"].map((c) => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-xs flex-1 text-center" style={{ color: "#475569" }}>{FILE.name}</span>
              </div>

              {/* preview body */}
              <div className="p-8 flex flex-col items-center gap-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #f8717120, #f8717108)", border: "1px solid #f8717120" }}
                >
                  <FileText size={36} style={{ color: "#f87171" }} />
                </div>

                {/* doc preview lines */}
                <div className="w-full max-w-sm rounded-xl p-5 flex flex-col gap-2" style={{ background: "#ffffff06", border: "1px solid #ffffff0a" }}>
                  {FILE.previewLines.map((line, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs w-5 text-right shrink-0" style={{ color: "#334155" }}>{i + 1}</span>
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          background: i === 0 ? "#6366f140" : "#ffffff10",
                          width: i === 0 ? "70%" : `${40 + Math.random() * 45}%`,
                        }}
                      />
                      <span className="text-xs" style={{ color: i === 0 ? "#c4b5fd" : "#334155" }}>{line}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs" style={{ color: "#334155" }}>Preview of first page</p>
              </div>

              {/* action bar */}
              <div
                className="flex items-center justify-between flex-wrap gap-3 px-5 py-4"
                style={{ borderTop: "1px solid #ffffff10" }}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLiked((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                    style={{
                      background: liked ? "#f8717115" : "#ffffff08",
                      color: liked ? "#f87171" : "#64748b",
                      border: liked ? "1px solid #f8717130" : "1px solid #ffffff10",
                    }}
                  >
                    <Heart size={15} fill={liked ? "#f87171" : "none"} />
                    {likeCount}
                  </button>

                  <button
                    onClick={() => setSaved((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                    style={{
                      background: saved ? "#fbbf2415" : "#ffffff08",
                      color: saved ? "#fbbf24" : "#64748b",
                      border: saved ? "1px solid #fbbf2430" : "1px solid #ffffff10",
                    }}
                  >
                    <Bookmark size={15} fill={saved ? "#fbbf24" : "none"} />
                    {saved ? "Saved" : "Save"}
                  </button>

                  <button
                    onClick={() => setShareOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                    style={{ background: "#ffffff08", color: "#64748b", border: "1px solid #ffffff10" }}
                  >
                    <Share2 size={15} />
                    Share
                  </button>
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 18px #6366f135" }}
                >
                  <Download size={15} />
                  Download
                </a>
              </div>
            </div>

            {/* share panel */}
            {shareOpen && (
              <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ ...card, animation: "fadeIn .2s ease" }}>
                <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Share this file</p>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={window.location.href}
                    className="flex-1 rounded-xl px-4 py-2 text-xs outline-none"
                    style={{ background: "#ffffff08", border: "1px solid #ffffff10", color: "#94a3b8" }}
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:-translate-y-0.5"
                    style={{ background: copied ? "linear-gradient(135deg, #22c55e, #16a34a)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            {/* ── description ── */}
            <div className="rounded-2xl p-6 flex flex-col gap-4" style={card}>
              <h2 className="font-semibold" style={{ color: "#e2e8f0" }}>About this file</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{FILE.description}</p>
              <div className="flex flex-wrap gap-2">
                {FILE.tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "#6366f118", border: "1px solid #6366f130", color: "#a5b4fc" }}>
                    <Tag size={10} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ── comments ── */}
            <div className="rounded-2xl p-6 flex flex-col gap-5" style={card}>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} style={{ color: "#818cf8" }} />
                <h2 className="font-semibold" style={{ color: "#e2e8f0" }}>
                  Comments <span style={{ color: "#475569" }}>({comments.length})</span>
                </h2>
              </div>

              {/* input */}
              <form onSubmit={handleComment} className="flex gap-3">
                <img src={userImg} alt="you" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                <div className="flex-1 flex gap-2">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment…"
                    className="flex-1 rounded-xl px-4 py-2 text-sm outline-none transition-all"
                    style={{ background: "#ffffff08", border: "1px solid #ffffff10", color: "#e2e8f0" }}
                    onFocus={(e) => (e.target.style.border = "1px solid #6366f160")}
                    onBlur={(e) => (e.target.style.border = "1px solid #ffffff10")}
                  />
                  <button
                    type="submit"
                    className="px-4 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>

              {/* comment list */}
              <div className="flex flex-col gap-3">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3 group">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold uppercase"
                      style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}>
                      {c.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: "#c4b5fd" }}>@{c.user}</span>
                        <span className="text-xs" style={{ color: "#334155" }}>{c.time}</span>
                      </div>
                      <p className="text-sm mt-0.5 leading-snug" style={{ color: "#94a3b8" }}>{c.text}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-opacity self-start hover:bg-white/5" title="Report">
                      <Flag size={12} style={{ color: "#475569" }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="flex flex-col gap-5">

            {/* metadata */}
            <div className="rounded-2xl p-5" style={card}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "#e2e8f0" }}>File Info</h3>
              <MetaRow icon={FileText} label="Type" value={FILE.type} />
              <MetaRow icon={HardDrive} label="Size" value={FILE.size} />
              <MetaRow icon={Clock} label="Uploaded" value={FILE.uploadedAt} />
              <MetaRow icon={Eye} label="Views" value={FILE.views.toLocaleString()} />
              <MetaRow icon={Download} label="Downloads" value={FILE.downloads.toLocaleString()} />
              <MetaRow icon={Star} label="Likes" value={likeCount} />
            </div>

            {/* creator */}
            <div className="rounded-2xl p-5" style={card}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "#e2e8f0" }}>Uploaded by</h3>
              <div className="flex items-center gap-3">
                <img src={userImg} alt={CREATOR.name} className="w-11 h-11 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={gradText}>{CREATOR.name}</p>
                  <p className="text-xs" style={{ color: "#64748b" }}>{CREATOR.handle}</p>
                </div>
                <Link
                  to="/CreatorProfile"
                  className="p-2 rounded-lg transition-all hover:-translate-y-0.5 hover:bg-white/10"
                  style={{ color: "#818cf8" }}
                  title="View profile"
                >
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>

            {/* related files */}
            <div className="rounded-2xl p-5" style={card}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "#e2e8f0" }}>Related Files</h3>
              <div className="flex flex-col gap-2">
                {RELATED.map((f) => (
                  <Link
                    key={f.id}
                    to="/FileDetail"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:-translate-y-0.5 hover:bg-white/5 group"
                    style={{ border: "1px solid #ffffff08" }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#f8717115" }}>
                      <FileText size={14} style={{ color: "#f87171" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: "#e2e8f0" }}>{f.name}</p>
                      <p className="text-xs" style={{ color: "#475569" }}>{f.size} · {f.views} views</p>
                    </div>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: "#818cf8" }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* report */}
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:bg-red-500/10"
              style={{ background: "#ffffff05", border: "1px solid #ffffff0a", color: "#475569" }}
            >
              <Flag size={12} />
              Report this file
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default FileDetail;