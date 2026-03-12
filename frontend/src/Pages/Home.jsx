
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

/* helpers */

const GradientText = ({ children, className = "" }) => (
  <span
    className={className}
    style={{
      background: "linear-gradient(135deg,#e0e7ff,#c4b5fd,#818cf8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {children}
  </span>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div
    className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
    style={{
      background: "linear-gradient(135deg,#ffffff08,#ffffff03)",
      border: "1px solid #ffffff12",
      boxShadow: "0 4px 24px #00000030",
    }}
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg,#6366f120,#8b5cf620)",
      }}
    >
      {Icon && <Icon size={20} style={{ color: "#818cf8" }} />}
    </div>

    <h3 className="font-semibold text-lg text-slate-200">
      {title}
    </h3>

    <p className="text-sm leading-relaxed text-slate-400">
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
    {Icon && <Icon size={15} style={{ color: "#818cf8" }} />}
    <span className="text-sm font-medium text-slate-300">
      {label}
    </span>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <span
      className="text-3xl font-bold"
      style={{
        background: "linear-gradient(135deg,#e0e7ff,#818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {value}
    </span>
    <span className="text-sm text-slate-500">{label}</span>
  </div>
);

/* main */

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
        background:
          "linear-gradient(135deg,#0f0c29 0%,#1a1a3e 45%,#24243e 100%)",
        minHeight: "100vh",
        color: "#e2e8f0",
        overflowX: "hidden",
      }}
    >

      {/* ambient orb */}
      <div
        ref={orbRef}
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#6366f118 0%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* HERO */}
      <section className="relative flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-20 pt-24 pb-20">

        <div className="flex-1 flex flex-col gap-6 max-w-xl">

          <div
            className="w-fit flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase"
            style={{
              background: "linear-gradient(135deg,#6366f118,#8b5cf618)",
              border: "1px solid #6366f140",
              color: "#a5b4fc",
            }}
          >
            <Star size={11} fill="#a5b4fc" />
            Free · No account needed
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Share your files with the <GradientText>world</GradientText>
          </h1>

          <p className="text-lg text-slate-400">
            Upload documents, images, archives, and links — then share
            instantly with anyone.
          </p>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/upload"
              className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff",
              }}
            >
              <CloudUpload size={17} />
              Start Uploading
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm"
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

          <div className="flex gap-8 pt-6 border-t border-white/10">
            <StatCard value="25MB" label="Max file size" />
            <StatCard value="4+" label="Formats" />
            <StatCard value="100%" label="Free forever" />
          </div>

        </div>

        {/* hero image */}

        <div className="flex-1 flex justify-center">
          <img
            src={Plane}
            alt="share files"
            className="w-72 md:w-[420px]"
            style={{ filter: "drop-shadow(0 20px 60px #6366f130)" }}
          />
        </div>

      </section>

      {/* FILE TYPES */}

      <div className="flex flex-wrap justify-center gap-3 py-6 border-y border-white/10">
        <FileTypeBadge icon={FileText} label="PDF / Docs" />
        <FileTypeBadge icon={Image} label="Images" />
        <FileTypeBadge icon={Archive} label="ZIP" />
        <FileTypeBadge icon={LinkIcon} label="Links" />
      </div>

      {/* FEATURES */}

      <section className="px-6 md:px-20 py-20">
        <div className="grid md:grid-cols-3 gap-6">

          <FeatureCard
            icon={CloudUpload}
            title="Instant Uploads"
            desc="Upload and share files instantly."
          />

          <FeatureCard
            icon={ShieldCheck}
            title="Safe & Clean"
            desc="Only safe formats allowed."
          />

          <FeatureCard
            icon={Zap}
            title="Lightning Fast"
            desc="Global CDN delivery."
          />

          <FeatureCard
            icon={Users}
            title="Classroom Ready"
            desc="Perfect for students."
          />

          <FeatureCard
            icon={LinkIcon}
            title="Link Sharing"
            desc="Share URLs easily."
          />

          <FeatureCard
            icon={FileText}
            title="Creator Profiles"
            desc="Build your public profile."
          />

        </div>
      </section>

    </div>
  );
}

export default Home;

