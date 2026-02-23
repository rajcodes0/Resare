import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Image,
  Archive,
  Link as LinkIcon,
  Download,
  Eye,
  ExternalLink,
} from "lucide-react";

/* ── type config ── */
const TYPE_CONFIG = {
  pdf:   { Icon: FileText, color: "#f87171", bg: "#f8717115", label: "PDF" },
  image: { Icon: Image,    color: "#34d399", bg: "#34d39915", label: "Image" },
  zip:   { Icon: Archive,  color: "#fbbf24", bg: "#fbbf2415", label: "ZIP" },
  link:  { Icon: LinkIcon, color: "#60a5fa", bg: "#60a5fa15", label: "Link" },
  doc:   { Icon: FileText, color: "#818cf8", bg: "#818cf815", label: "Doc" },
};

/**
 * FileCard component
 *
 * Props:
 *  - name      {string}  File name
 *  - type      {string}  "pdf" | "image" | "zip" | "link" | "doc"
 *  - size      {string}  e.g. "2.4 MB"
 *  - views     {number}
 *  - downloads {number}
 *  - date      {string}  e.g. "Feb 22"
 *  - creator   {string}  uploader's display name  (optional)
 *  - to        {string}  react-router link target  (default: "/FileDetail")
 *  - compact   {bool}    slim horizontal layout    (default: false)
 */
function FileCard({
  name = "Untitled File",
  type = "pdf",
  size = "—",
  views = 0,
  downloads = 0,
  date = "",
  creator = "",
  to = "/FileDetail",
  compact = false,
}) {
  const { Icon, color, bg: iconBg, label } = TYPE_CONFIG[type] || TYPE_CONFIG.doc;

  /* ── COMPACT (horizontal row) ── */
  if (compact) {
    return (
      <Link
        to={to}
        className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/[0.04] group"
        style={{ border: "1px solid #ffffff08" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg }}
        >
          <Icon size={17} style={{ color }} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: "#e2e8f0" }}>{name}</p>
          <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
            {size}{date ? ` · ${date}` : ""}{creator ? ` · by ${creator}` : ""}
          </p>
        </div>

        <span
          className="hidden sm:inline text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0"
          style={{ background: iconBg, color }}
        >
          {label}
        </span>

        <div className="hidden sm:flex items-center gap-3 text-xs shrink-0" style={{ color: "#64748b" }}>
          <span className="flex items-center gap-1"><Eye size={12} />{views}</span>
          <span className="flex items-center gap-1"><Download size={12} />{downloads}</span>
        </div>

        <ExternalLink
          size={13}
          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          style={{ color: "#818cf8" }}
        />
      </Link>
    );
  }

  /* ── CARD (vertical grid card) ── */
  return (
    <Link
      to={to}
      className="flex flex-col gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
      style={{
        background: "#ffffff08",
        border: "1px solid #ffffff12",
        boxShadow: "0 4px 20px #00000020",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px #6366f120")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px #00000020")}
    >
      {/* top: icon + badge */}
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

      {/* name + meta */}
      <div>
        <p className="font-semibold text-sm leading-snug" style={{ color: "#e2e8f0" }}>{name}</p>
        <p className="text-xs mt-1" style={{ color: "#475569" }}>
          {size}{date ? ` · ${date}` : ""}
        </p>
        {creator && (
          <p className="text-xs mt-0.5" style={{ color: "#334155" }}>by {creator}</p>
        )}
      </div>

      {/* footer: stats + arrow */}
      <div
        className="flex items-center justify-between text-xs"
        style={{ color: "#64748b", borderTop: "1px solid #ffffff08", paddingTop: "12px" }}
      >
        <span className="flex items-center gap-1"><Eye size={12} />{views} views</span>
        <span className="flex items-center gap-1"><Download size={12} />{downloads} dl</span>
        <ExternalLink
          size={12}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "#818cf8" }}
        />
      </div>
    </Link>
  );
}

export default FileCard;
