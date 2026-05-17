import React, { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

const THEMES = {
  dark: {
    name: "Dark",
    bg: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)",
    bgSecondary: "rgba(15, 12, 41, 0.95)",
    card: {
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.07)",
    },
    text: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
      muted: "#64748b",
    },
    accent: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    accentLight: "rgba(99, 102, 241, 0.15)",
    highlight: "#818cf8",
  },
  light: {
    name: "Light",
    bg: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 45%, #f1f5f9 100%)",
    bgSecondary: "rgba(248, 250, 252, 0.95)",
    card: {
      background: "rgba(255, 255, 255, 0.9)",
      border: "1px solid rgba(0, 0, 0, 0.08)",
    },
    text: {
      primary: "#0f172a",
      secondary: "#334155",
      muted: "#475569",
    },
    accent: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    accentLight: "rgba(79, 70, 229, 0.1)",
    highlight: "#6366f1",
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("resareTheme");
    return saved && THEMES[saved] ? saved : "dark";
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