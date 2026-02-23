import React, { useState } from "react";
import { Link } from "react-router-dom";
import userImg from "../assets/user.jpg";
import {
  FileText,
  Image,
  Archive,
  Link as LinkIcon,
  Download,
  Eye,
  MapPin,
  Calendar,
  Star,
  UserPlus,
  UserCheck,
  Share2,
  ExternalLink,
  Twitter,
  Github,
  Globe,
} from "lucide-react";

/* ─── mock data ─── */
const CREATOR = {
  name: "Raj Sharma",
  handle: "@rajcodes",
  bio: "CS student · sharing notes, projects, and design assets. Love React, Figma & open-source.",
  location: "Bangalore, India",
  joined: "Joined January 2025",
  followers: 128,
  following: 47,
  totalUploads: 42,
  totalViews: "3.2K",
  tags: ["React", "UI/UX", "Notes", "Design"],
  socials: [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Globe, label: "Website", href: "#" },
  ],
};

const FILES = [
  { id: 1, name: "React Notes Ch1.pdf", type: "pdf", size: "2.4 MB", views: 412, downloads: 89, date: "Feb 22" },
  { id: 2, name: "UI Mockup Final.png", type: "image", size: "1.1 MB", views: 307, downloads: 54, date: "Feb 20" },
  { id: 3, name: "project-assets.zip", type: "zip", size: "14.7 MB", views: 198, downloads: 41, date: "Feb 18" },
  { id: 4, name: "Figma Design Crash Course", type: "link", size: "—", views: 653, downloads: 0, date: "Feb 15" },
  { id: 5, name: "Database Schema.pdf", type: "pdf", size: "0.9 MB", views: 214, downloads: 77, date: "Feb 10" },
  { id: 6, name: "Logo Assets Pack.zip", type: "zip", size: "8.2 MB", views: 89, downloads: 22, date: "Feb 8" },
];

/* ─── helpers ─── */
const bg = "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)";
const gradText = {
  background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const card = { background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: "16px" };

const typeConfig = {
  pdf:   { Icon: FileText, color: "#f87171", bg: "#f8717115", label: "PDF" },
  image: { Icon: Image,    color: "#34d399", bg: "#34d39915", label: "Image" },
  zip:   { Icon: Archive,  color: "#fbbf24", bg: "#fbbf2415", label: "ZIP" },
  link:  { Icon: LinkIcon, color: "#60a5fa", bg: "#60a5fa15", label: "Link" },
};

const StatPill = ({ value, label }) => (
  <div className="flex flex-col items-center px-6 py-3">
    <span className="text-xl font-bold" style={gradText}>{value}</span>
    <span className="text-xs mt-0.5" style={{ color: "#64748b" }}>{label}</span>
  </div>
);

/* ─── component ─── */
function CreatorProfile() {
  const [followed, setFollowed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const filtered = FILES.filter(
    (f) => activeFilter === "All" || f.type === activeFilter.toLowerCase()
  );

  return (
    <div style={{ background: bg, minHeight: "100vh", color: "#e2e8f0" }}>
      {/* ambient orbs */}
      <div style={{ position: "fixed", top: "-10%", left: "-8%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #6366f116 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-5%", right: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, #8b5cf612 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── banner ── */}
        <div
          className="w-full h-40 md:h-56"
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* decorative circles */}
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
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, #1a1a3e)" }} />
        </div>

        {/* ── profile card ── */}
        <div className="px-6 md:px-20">
          <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14 md:-mt-16 mb-8">
            {/* avatar */}
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0"
              style={{ border: "3px solid #1a1a3e", boxShadow: "0 8px 32px #00000050" }}
            >
              <img src={userImg} alt={CREATOR.name} className="w-full h-full object-cover" />
            </div>

            {/* name & handle */}
            <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold" style={gradText}>{CREATOR.name}</h1>
                <p className="text-sm" style={{ color: "#64748b" }}>{CREATOR.handle}</p>
              </div>
              {/* actions */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setFollowed((v) => !v)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={
                    followed
                      ? { background: "#ffffff10", border: "1px solid #ffffff20", color: "#94a3b8" }
                      : { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 18px #6366f135" }
                  }
                >
                  {followed ? <UserCheck size={15} /> : <UserPlus size={15} />}
                  {followed ? "Following" : "Follow"}
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-white/10"
                  style={{ background: "#ffffff08", border: "1px solid #ffffff12", color: "#c4b5fd" }}
                >
                  <Share2 size={14} />
                  {copiedShare ? "Link copied!" : "Share"}
                </button>
              </div>
            </div>
          </div>

          {/* bio row */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            {/* left: bio + tags + socials */}
            <div className="flex-1 flex flex-col gap-4">
              <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#94a3b8" }}>{CREATOR.bio}</p>

              <div className="flex flex-wrap gap-2 text-xs" style={{ color: "#64748b" }}>
                <span className="flex items-center gap-1"><MapPin size={12} />{CREATOR.location}</span>
                <span className="flex items-center gap-1"><Calendar size={12} />{CREATOR.joined}</span>
              </div>

              {/* tags */}
              <div className="flex flex-wrap gap-2">
                {CREATOR.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "#6366f118", border: "1px solid #6366f130", color: "#a5b4fc" }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* socials */}
              <div className="flex gap-3">
                {CREATOR.socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    title={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5 hover:bg-white/10"
                    style={{ background: "#ffffff08", border: "1px solid #ffffff10", color: "#818cf8" }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* right: stats pill row */}
            <div
              className="self-start flex rounded-2xl overflow-hidden divide-x"
              style={{ background: "#ffffff06", border: "1px solid #ffffff12", divideColor: "#ffffff10" }}
            >
              <StatPill value={CREATOR.totalUploads} label="Uploads" />
              <StatPill value={CREATOR.totalViews} label="Views" />
              <StatPill value={CREATOR.followers} label="Followers" />
              <StatPill value={CREATOR.following} label="Following" />
            </div>
          </div>

          {/* ── files section ── */}
          <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-lg font-semibold" style={{ color: "#e2e8f0" }}>Files & Resources</h2>
            <div className="flex gap-2 flex-wrap">
              {["All", "PDF", "Image", "ZIP", "Link"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200"
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

          {/* file grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
            {filtered.map((file) => {
              const { Icon, color, bg: iconBg, label } = typeConfig[file.type];
              return (
                <Link
                  to="/FileDetail"
                  key={file.id}
                  className="flex flex-col gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ ...card, boxShadow: "0 4px 20px #00000020" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px #6366f118")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px #00000020")}
                >
                  {/* top: icon + type */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
                      <Icon size={22} style={{ color }} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: iconBg, color }}>
                      {label}
                    </span>
                  </div>

                  {/* name */}
                  <div>
                    <p className="font-semibold text-sm leading-snug" style={{ color: "#e2e8f0" }}>{file.name}</p>
                    <p className="text-xs mt-1" style={{ color: "#475569" }}>{file.size} · {file.date}</p>
                  </div>

                  {/* stats */}
                  <div className="flex items-center justify-between text-xs" style={{ color: "#64748b" }}>
                    <span className="flex items-center gap-1"><Eye size={12} />{file.views} views</span>
                    <span className="flex items-center gap-1"><Download size={12} />{file.downloads} dl</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#818cf8" }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .divide-x > * + * { border-left: 1px solid #ffffff10; }
      `}</style>
    </div>
  );
}

export default CreatorProfile;
