import React, { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

const THEMES = {
  crimson: {
    name: "Crimson Fire",
    bg: "linear-gradient(135deg, #1a0f0f 0%, #2d1515 45%, #3d1a1a 100%)",
    bgSecondary: "rgba(26, 15, 15, 0.95)",
    card: {
      background: "rgba(220, 38, 38, 0.08)",
      border: "1px solid rgba(220, 38, 38, 0.2)",
    },
    text: {
      primary: "#fef2f2",
      secondary: "#fecaca",
      muted: "#fca5a5",
    },
    accent: "linear-gradient(135deg, #dc2626, #b91c1c)",
    accentLight: "rgba(220, 38, 38, 0.2)",
    highlight: "#ef4444",
  },
  sunburst: {
    name: "Sunburst",
    bg: "linear-gradient(135deg, #1f1600 0%, #3d2600 45%, #4d3000 100%)",
    bgSecondary: "rgba(31, 22, 0, 0.95)",
    card: {
      background: "rgba(234, 179, 8, 0.08)",
      border: "1px solid rgba(234, 179, 8, 0.18)",
    },
    text: {
      primary: "#fffbeb",
      secondary: "#fef08a",
      muted: "#fde047",
    },
    accent: "linear-gradient(135deg, #eab308, #facc15)",
    accentLight: "rgba(234, 179, 8, 0.2)",
    highlight: "#fbbf24",
  },
  neon: {
    name: "Neon Vibes",
    bg: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 45%, #15213e 100%)",
    bgSecondary: "rgba(15, 15, 35, 0.95)",
    card: {
      background: "rgba(0, 217, 255, 0.06)",
      border: "1px solid rgba(0, 217, 255, 0.18)",
    },
    text: {
      primary: "#e0ffff",
      secondary: "#80ffff",
      muted: "#00ffff",
    },
    accent: "linear-gradient(135deg, #00d9ff, #00ffff)",
    accentLight: "rgba(0, 217, 255, 0.2)",
    highlight: "#06f",
  },
  blood: {
    name: "Blood Orange",
    bg: "linear-gradient(135deg, #2d1f15 0%, #4a2416 45%, #5a2f1f 100%)",
    bgSecondary: "rgba(45, 31, 21, 0.95)",
    card: {
      background: "rgba(255, 69, 0, 0.08)",
      border: "1px solid rgba(255, 69, 0, 0.18)",
    },
    text: {
      primary: "#fff5f0",
      secondary: "#ffe4d6",
      muted: "#ffb8a8",
    },
    accent: "linear-gradient(135deg, #ff4500, #ff6347)",
    accentLight: "rgba(255, 69, 0, 0.2)",
    highlight: "#ff6347",
  },
  electric: {
    name: "Electric Magenta",
    bg: "linear-gradient(135deg, #1f0a2e 0%, #3d1a4e 45%, #4d2a5e 100%)",
    bgSecondary: "rgba(31, 10, 46, 0.95)",
    card: {
      background: "rgba(217, 70, 239, 0.08)",
      border: "1px solid rgba(217, 70, 239, 0.18)",
    },
    text: {
      primary: "#fdf2f8",
      secondary: "#fbcfe8",
      muted: "#f9a8d4",
    },
    accent: "linear-gradient(135deg, #d946ef, #ec4899)",
    accentLight: "rgba(217, 70, 239, 0.2)",
    highlight: "#ec4899",
  },
  toxic: {
    name: "Toxic Green",
    bg: "linear-gradient(135deg, #0f2a1f 0%, #1a4d35 45%, #1f5f42 100%)",
    bgSecondary: "rgba(15, 42, 31, 0.95)",
    card: {
      background: "rgba(34, 197, 94, 0.08)",
      border: "1px solid rgba(34, 197, 94, 0.18)",
    },
    text: {
      primary: "#f0fdf4",
      secondary: "#bbf7d0",
      muted: "#86efac",
    },
    accent: "linear-gradient(135deg, #22c55e, #10b981)",
    accentLight: "rgba(34, 197, 94, 0.2)",
    highlight: "#34d399",
  },
  sunset: {
    name: "Golden Sunset",
    bg: "linear-gradient(135deg, #3d2817 0%, #5c3d2e 45%, #6b4423 100%)",
    bgSecondary: "rgba(61, 40, 23, 0.95)",
    card: {
      background: "rgba(249, 115, 22, 0.1)",
      border: "1px solid rgba(234, 88, 12, 0.2)",
    },
    text: {
      primary: "#fef3c7",
      secondary: "#fed7aa",
      muted: "#f5a962",
    },
    accent: "linear-gradient(135deg, #f97316, #fb923c)",
    accentLight: "rgba(249, 115, 22, 0.2)",
    highlight: "#f97316",
  },
  cyber: {
    name: "Cyber Purple",
    bg: "linear-gradient(135deg, #1f0a4e 0%, #3d1a8e 45%, #4d2a9e 100%)",
    bgSecondary: "rgba(31, 10, 78, 0.95)",
    card: {
      background: "rgba(168, 85, 247, 0.08)",
      border: "1px solid rgba(168, 85, 247, 0.18)",
    },
    text: {
      primary: "#faf5ff",
      secondary: "#e9d5ff",
      muted: "#d8b4fe",
    },
    accent: "linear-gradient(135deg, #a855f7, #d946ef)",
    accentLight: "rgba(168, 85, 247, 0.2)",
    highlight: "#d946ef",
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("resareTheme");
    return saved && THEMES[saved] ? saved : "crimson";
  });

  useEffect(() => {
    localStorage.setItem("resareTheme", currentTheme);
  }, [currentTheme]);

  const switchTheme = (themeName) => {
    if (THEMES[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const theme = THEMES[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, switchTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}
