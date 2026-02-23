import React, { useEffect, useRef } from "react";
import Plane from "../assets/plane.png";
import { Link } from "react-router-dom";
import {
  CloudUpload,
  ShieldCheck,
  Zap,
  Users,
  FileText,
  Image,
  Archive,
  Link as LinkIcon,
  ArrowRight,
  Star,
} from "lucide-react";

/* ─── tiny helpers ─── */
const GradientText = ({ children, className = "" }) => (
  <span
    className={className}
    style={{
      background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {children}
  </span>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div
    className="rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
    style={{
      background: "linear-gradient(135deg, #ffffff08, #ffffff03)",
      border: "1px solid #ffffff12",
      boxShadow: "0 4px 24px #00000030",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.boxShadow = "0 8px 32px #6366f120")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.boxShadow = "0 4px 24px #00000030")
    }
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #6366f120, #8b5cf620)" }}
    >
      <Icon size={20} style={{ color: "#818cf8" }} />
    </div>
    <h3 className="font-semibold text-lg" style={{ color: "#e2e8f0" }}>
      {title}
    </h3>
    <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
      {desc}
    </p>
  </div>
);

const FileTypeBadge = ({ icon: Icon, label }) => (
  <div
    className="flex items-center gap-2 px-4 py-2 rounded-full"
    style={{
      background: "#ffffff08",
      border: "1px solid #ffffff12",
    }}
  >
    <Icon size={15} style={{ color: "#818cf8" }} />
    <span className="text-sm font-medium" style={{ color: "#cbd5e1" }}>
      {label}
    </span>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <span
      className="text-3xl font-bold"
      style={{
        background: "linear-gradient(135deg, #e0e7ff, #818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {value}
    </span>
    <span className="text-sm" style={{ color: "#64748b" }}>
      {label}
    </span>
  </div>
);

/* ─── main ─── */
function Home() {
  const orbRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!orbRef.current) return;
      const { clientX: x, clientY: y } = e;
      orbRef.current.style.transform = `translate(${x * 0.015}px, ${y * 0.015}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)",
        minHeight: "100vh",
        color: "#e2e8f0",
        overflowX: "hidden",
      }}
    >
      {/* ── ambient orbs ── */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6366f118 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        ref={orbRef}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #8b5cf614 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-20 pt-24 pb-20"
        style={{ zIndex: 1 }}
      >
        {/* left */}
        <div className="flex-1 flex flex-col gap-6 md:max-w-xl">
          {/* badge */}
          <div
            className="w-fit flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              background: "linear-gradient(135deg, #6366f118, #8b5cf618)",
              border: "1px solid #6366f140",
              color: "#a5b4fc",
            }}
          >
            <Star size={11} fill="#a5b4fc" />
            Free · No account needed to browse
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Share your files
            <br />
            with the{" "}
            <GradientText>world</GradientText>
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: "#94a3b8" }}>
            Upload documents, images, archives, and links — then share them
            instantly with fellow students, teammates, or the world. Fast, free,
            and under 25 MB.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              to="/Upload"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                boxShadow: "0 6px 24px #6366f135",
              }}
            >
              <CloudUpload size={17} />
              Start Uploading
            </Link>
            <Link
              to="/Login"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "#ffffff08",
                border: "1px solid #ffffff18",
                color: "#c4b5fd",
              }}
            >
              Get Started
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* stats */}
          <div
            className="flex gap-8 mt-4 pt-6"
            style={{ borderTop: "1px solid #ffffff10" }}
          >
            <StatCard value="25MB" label="Max file size" />
            <StatCard value="4+" label="File formats" />
            <StatCard value="100%" label="Free forever" />
          </div>
        </div>

        {/* right – hero image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div
            className="relative"
            style={{
              filter: "drop-shadow(0 20px 60px #6366f130)",
              animation: "heroFloat 5s ease-in-out infinite",
            }}
          >
            <img
              src={Plane}
              alt="Resare – share your files"
              className="w-72 md:w-[420px] object-contain select-none"
            />
            {/* glow ring */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "radial-gradient(circle, #6366f118 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SUPPORTED FILE TYPES STRIP
      ════════════════════════════════════════ */}
      <div
        className="flex flex-wrap justify-center gap-3 px-6 py-6"
        style={{ borderTop: "1px solid #ffffff08", borderBottom: "1px solid #ffffff08" }}
      >
        <span className="text-sm self-center mr-2" style={{ color: "#475569" }}>
          Supported:
        </span>
        <FileTypeBadge icon={FileText} label="PDF / Docs" />
        <FileTypeBadge icon={Image} label="Images" />
        <FileTypeBadge icon={Archive} label="ZIP / Archives" />
        <FileTypeBadge icon={LinkIcon} label="Links" />
      </div>

      {/* ════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════ */}
      <section className="px-6 md:px-20 py-24" style={{ position: "relative", zIndex: 1 }}>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Everything you need to{" "}
            <GradientText>share smarter</GradientText>
          </h2>
          <p className="text-base" style={{ color: "#64748b" }}>
            Built for students, educators, and teams who move fast.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={CloudUpload}
            title="Instant Uploads"
            desc="Drag and drop your file or click to browse — your resource is live in seconds with a shareable link."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Safe & Clean"
            desc="We only accept images, PDFs, archives, and links. No executables, no viruses — just clean content."
          />
          <FeatureCard
            icon={Zap}
            title="Lightning Fast"
            desc="Our CDN-backed storage ensures your files load instantly for anyone around the globe."
          />
          <FeatureCard
            icon={Users}
            title="Classroom Ready"
            desc="Share lecture notes, assignments, and reference material with your entire class in one link."
          />
          <FeatureCard
            icon={LinkIcon}
            title="Link Sharing"
            desc="Don't have a file? Share a URL directly on the platform — perfect for YouTube tutorials or docs."
          />
          <FeatureCard
            icon={FileText}
            title="Creator Profiles"
            desc="Build your public profile and let others discover all the resources you've shared over time."
          />
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section className="px-6 md:px-20 pb-24" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: "linear-gradient(135deg, #6366f118, #8b5cf614)",
            border: "1px solid #6366f130",
            boxShadow: "0 8px 48px #6366f110",
          }}
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to unlock your potential?
            </h2>
            <p style={{ color: "#94a3b8" }} className="text-base">
              Join other creators and start sharing your knowledge today — it's completely free.
            </p>
          </div>
          <Link
            to="/Upload"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              boxShadow: "0 6px 24px #6366f135",
              whiteSpace: "nowrap",
            }}
          >
            <CloudUpload size={17} />
            Upload Your First File
          </Link>
        </div>
      </section>

      {/* animations */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
}

export default Home;
