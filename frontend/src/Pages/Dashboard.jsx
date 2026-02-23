import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CloudUpload,
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
  Star,
  MoreVertical,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Activity,
  Clock,
  CheckCircle2,
} from "lucide-react";

/* ─── mock data ─── */
const STATS = [
  { icon: HardDrive, label: "Total Uploads", value: "42", change: "+6 this week", up: true },
  { icon: Eye, label: "Total Views", value: "3.2K", change: "+18% this month", up: true },
  { icon: Download, label: "Downloads", value: "891", change: "+12% this month", up: true },
  { icon: Users, label: "Followers", value: "128", change: "+3 today", up: true },
];

const FILES = [
  { id: 1, name: "React Notes Ch1.pdf", type: "pdf", size: "2.4 MB", views: 412, downloads: 89, date: "Feb 22", status: "live" },
  { id: 2, name: "UI Mockup Final.png", type: "image", size: "1.1 MB", views: 307, downloads: 54, date: "Feb 20", status: "live" },
  { id: 3, name: "project-assets.zip", type: "zip", size: "14.7 MB", views: 198, downloads: 41, date: "Feb 18", status: "live" },
  { id: 4, name: "Figma Design Crash Course", type: "link", size: "—", views: 653, downloads: 0, date: "Feb 15", status: "live" },
  { id: 5, name: "Database Schema.pdf", type: "pdf", size: "0.9 MB", views: 214, downloads: 77, date: "Feb 10", status: "live" },
  { id: 6, name: "Logo Assets Pack.zip", type: "zip", size: "8.2 MB", views: 89, downloads: 22, date: "Feb 8", status: "live" },
];

const ACTIVITY = [
  { icon: Download, color: "#818cf8", text: "Someone downloaded React Notes Ch1.pdf", time: "2 min ago" },
  { icon: Eye, color: "#34d399", text: "UI Mockup Final.png got 15 new views", time: "18 min ago" },
  { icon: Star, color: "#fbbf24", text: "@alex_dev starred your profile", time: "1 hr ago" },
  { icon: CloudUpload, color: "#60a5fa", text: "project-assets.zip uploaded successfully", time: "3 hrs ago" },
  { icon: Users, color: "#a78bfa", text: "5 new followers this week", time: "Yesterday" },
];

/* ─── helpers ─── */
const bg = "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)";
const card = { background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: "16px" };
const gradText = {
  background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const fileIcon = (type) => {
  const props = { size: 16 };
  if (type === "pdf") return <FileText {...props} style={{ color: "#f87171" }} />;
  if (type === "image") return <Image {...props} style={{ color: "#34d399" }} />;
  if (type === "zip") return <Archive {...props} style={{ color: "#fbbf24" }} />;
  return <LinkIcon {...props} style={{ color: "#60a5fa" }} />;
};

const typeBadge = (type) => {
  const map = {
    pdf: { bg: "#f8717115", color: "#f87171", label: "PDF" },
    image: { bg: "#34d39915", color: "#34d399", label: "Image" },
    zip: { bg: "#fbbf2415", color: "#fbbf24", label: "ZIP" },
    link: { bg: "#60a5fa15", color: "#60a5fa", label: "Link" },
  };
  const s = map[type] || map.link;
  return (
    <span
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
};

/* ─── component ─── */
function Dashboard() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = FILES.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "All" ||
      f.type === activeFilter.toLowerCase() ||
      (activeFilter === "Link" && f.type === "link");
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ background: bg, minHeight: "100vh", color: "#e2e8f0" }}>
      {/* ambient */}
      <div style={{ position: "fixed", top: "-15%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #6366f116 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div className="relative px-6 md:px-16 py-10" style={{ zIndex: 1 }}>

        {/* ── header ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard size={20} style={{ color: "#818cf8" }} />
              <span className="text-sm font-medium" style={{ color: "#818cf8" }}>Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold" style={gradText}>Welcome back, Creator 👋</h1>
            <p className="text-sm mt-1" style={{ color: "#64748b" }}>Here's what's happening with your files today.</p>
          </div>
          <Link
            to="/Upload"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 6px 24px #6366f135" }}
          >
            <Plus size={16} />
            New Upload
          </Link>
        </div>

        {/* ── stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map(({ icon: Icon, label, value, change, up }) => (
            <div
              key={label}
              className="p-5 rounded-2xl flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
              style={{ ...card, boxShadow: "0 4px 20px #00000025" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px #6366f118")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px #00000025")}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f118, #8b5cf618)" }}>
                  <Icon size={18} style={{ color: "#818cf8" }} />
                </div>
                <TrendingUp size={14} style={{ color: up ? "#34d399" : "#f87171" }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={gradText}>{value}</p>
                <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{label}</p>
              </div>
              <p className="text-xs font-medium" style={{ color: up ? "#34d399" : "#f87171" }}>
                {change}
              </p>
            </div>
          ))}
        </div>

        {/* ── main content: files + activity ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* files table – spans 2 cols */}
          <div className="xl:col-span-2 rounded-2xl overflow-hidden" style={card}>
            {/* table header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-5" style={{ borderBottom: "1px solid #ffffff10" }}>
              <h2 className="font-semibold text-base" style={{ color: "#e2e8f0" }}>My Files</h2>
              <div className="flex gap-2 flex-wrap">
                {/* search */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "#ffffff08", border: "1px solid #ffffff10" }}>
                  <Search size={13} style={{ color: "#64748b" }} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search files…"
                    className="bg-transparent outline-none text-xs w-28"
                    style={{ color: "#cbd5e1" }}
                  />
                </div>
                {/* filters */}
                {["All", "PDF", "Image", "ZIP", "Link"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                    style={{
                      background: activeFilter === f ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#ffffff08",
                      color: activeFilter === f ? "#fff" : "#94a3b8",
                      border: activeFilter === f ? "none" : "1px solid #ffffff10",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* rows */}
            <div className="divide-y" style={{ borderColor: "#ffffff08" }}>
              {filtered.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-4 px-5 py-3.5 transition-colors duration-200 hover:bg-white/[0.02] group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#ffffff08" }}>
                    {fileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#e2e8f0" }}>{file.name}</p>
                    <p className="text-xs" style={{ color: "#475569" }}>{file.size} · {file.date}</p>
                  </div>
                  {typeBadge(file.type)}
                  <div className="hidden sm:flex items-center gap-4 text-xs" style={{ color: "#64748b" }}>
                    <span className="flex items-center gap-1"><Eye size={12} />{file.views}</span>
                    <span className="flex items-center gap-1"><Download size={12} />{file.downloads}</span>
                  </div>
                  <Link to="/FileDetail" className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10" title="View">
                    <ChevronRight size={15} style={{ color: "#818cf8" }} />
                  </Link>
                  <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10" title="Delete">
                    <Trash2 size={14} style={{ color: "#f87171" }} />
                  </button>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-sm" style={{ color: "#475569" }}>No files match your search.</div>
              )}
            </div>
          </div>

          {/* activity feed */}
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={card}>
            <div className="flex items-center gap-2 mb-1">
              <Activity size={15} style={{ color: "#818cf8" }} />
              <h2 className="font-semibold text-base" style={{ color: "#e2e8f0" }}>Recent Activity</h2>
            </div>
            <div className="flex flex-col gap-0.5">
              {ACTIVITY.map(({ icon: Icon, color, text, time }, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl transition-colors hover:bg-white/[0.03]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: color + "18" }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs leading-snug" style={{ color: "#cbd5e1" }}>{text}</p>
                    <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#475569" }}>
                      <Clock size={10} />{time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* quick actions */}
            <div style={{ borderTop: "1px solid #ffffff0a" }} className="pt-4 mt-2">
              <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "#475569" }}>Quick Actions</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Upload a File", to: "/Upload", icon: CloudUpload },
                  { label: "View My Profile", to: "/CreatorProfile", icon: Users },
                ].map(({ label, to, icon: Icon }) => (
                  <Link
                    key={label}
                    to={to}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "#ffffff08", border: "1px solid #ffffff10", color: "#c4b5fd" }}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .divide-y > * + * { border-top: 1px solid #ffffff08; }
      `}</style>
    </div>
  );
}

export default Dashboard;
