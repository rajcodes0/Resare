import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search as SearchIcon, FileText, Image, Archive, Link as LinkIcon, Eye, Download, Users, ChevronRight } from "lucide-react";

const bg = "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)";
const card = { background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: "16px" };
const gradText = {
  background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const fileIcon = (type) => {
  const props = { size: 16 };
  if (type === "pdf" || type === "application/pdf") return <FileText {...props} style={{ color: "#f87171" }} />;
  if (type && type.startsWith("image")) return <Image {...props} style={{ color: "#34d399" }} />;
  if (type === "zip" || type === "application/zip") return <Archive {...props} style={{ color: "#fbbf24" }} />;
  return <LinkIcon {...props} style={{ color: "#60a5fa" }} />;
};

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q") || "";

  const [files, setFiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) {
      setFiles([]);
      setProfiles([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const [filesRes, profilesRes] = await Promise.all([
          fetch(`http://localhost:5000/api/files?q=${encodeURIComponent(q)}`, {
            headers: { "Content-Type": "application/json" }
          }),
          fetch(`http://localhost:5000/api/v1/auth/search?q=${encodeURIComponent(q)}`, {
            headers: { "Content-Type": "application/json" }
          })
        ]);

        if (filesRes.ok) {
          const filesData = await filesRes.json();
          setFiles(filesData.files || []);
        }

        if (profilesRes.ok) {
          const profilesData = await profilesRes.json();
          setProfiles(profilesData.users || []);
        }
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [q]);

  return (
    <div style={{ background: bg, minHeight: "100vh", color: "#e2e8f0" }}>
      <div className="relative px-6 md:px-16 py-10" style={{ zIndex: 1, minHeight: "80vh" }}>
        <div className="mb-10">
          <h1 className="text-3xl font-bold" style={gradText}>Search Results</h1>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            Showing results for "{q}"
          </p>
        </div>

        {loading ? (
          <div className="text-center mt-10" style={{ color: "#94a3b8" }}>Loading results...</div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* FILES */}
            <div className="rounded-2xl overflow-hidden" style={card}>
              <div className="flex items-center gap-3 p-5" style={{ borderBottom: "1px solid #ffffff10" }}>
                <SearchIcon size={18} style={{ color: "#818cf8" }} />
                <h2 className="font-semibold text-base" style={{ color: "#e2e8f0" }}>Files ({files.length})</h2>
              </div>
              <div className="divide-y" style={{ borderColor: "#ffffff08" }}>
                {files.map((file) => (
                  <div key={file._id} className="flex items-center gap-4 px-5 py-3.5 transition-colors duration-200 hover:bg-white/[0.02] group">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#ffffff08" }}>
                      {fileIcon(file.document?.fileType || 'other')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "#e2e8f0" }}>
                        {file.document?.originalName || "Unnamed File"}
                      </p>
                      <p className="text-xs" style={{ color: "#475569" }}>
                        By {file.creatorId?.username || "Unknown"}
                      </p>
                    </div>
                    <Link to={`/FileDetail?id=${file._id}`} className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10" title="View">
                      <ChevronRight size={15} style={{ color: "#818cf8" }} />
                    </Link>
                  </div>
                ))}
                {files.length === 0 && (
                  <div className="text-center py-8 text-sm" style={{ color: "#475569" }}>No files found.</div>
                )}
              </div>
            </div>

            {/* PROFILES */}
            <div className="rounded-2xl overflow-hidden" style={card}>
              <div className="flex items-center gap-3 p-5" style={{ borderBottom: "1px solid #ffffff10" }}>
                <Users size={18} style={{ color: "#34d399" }} />
                <h2 className="font-semibold text-base" style={{ color: "#e2e8f0" }}>Profiles ({profiles.length})</h2>
              </div>
              <div className="divide-y" style={{ borderColor: "#ffffff08" }}>
                {profiles.map((profile) => (
                  <div key={profile._id} className="flex items-center gap-4 px-5 py-3.5 transition-colors duration-200 hover:bg-white/[0.02] group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "#34d39915" }}>
                      <Users size={14} style={{ color: "#34d399" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "#e2e8f0" }}>
                        {profile.username}
                      </p>
                    </div>
                    <Link to={`/CreatorProfile?id=${profile._id}`} className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10" title="View Profile">
                      <ChevronRight size={15} style={{ color: "#34d399" }} />
                    </Link>
                  </div>
                ))}
                {profiles.length === 0 && (
                  <div className="text-center py-8 text-sm" style={{ color: "#475569" }}>No profiles found.</div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
      <style>{`
        .divide-y > * + * { border-top: 1px solid #ffffff08; }
      `}</style>
    </div>
  );
}

export default Search;
