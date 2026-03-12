import React, { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

const THEMES = {
  dark: {
    name: "Dark",
    bg: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)",
    bgSecondary: "rgba(15, 12, 41, 0.95)",
    card: {
      background: "#ffffff08",
      border: "1px solid #ffffff12",
    },
    text: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
      muted: "#64748b",
    },
    accent: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    accentLight: "#6366f120",
    highlight: "#818cf8",
  },
  light: {
    name: "Light",
    bg: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 45%, #e2e8f0 100%)",
    bgSecondary: "rgba(248, 250, 252, 0.95)",
    card: {
      background: "#ffffff",
      border: "1px solid #e2e8f0",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      muted: "#94a3b8",
    },
    accent: "linear-gradient(135deg, #3b82f6, #6366f1)",
    accentLight: "#3b82f620",
    highlight: "#6366f1",
  },
  ocean: {
    name: "Ocean",
    bg: "linear-gradient(135deg, #0a1e3e 0%, #1a3a52 45%, #0d2747 100%)",
    bgSecondary: "rgba(10, 30, 62, 0.95)",
    card: {
      background: "#0a2f5f15",
      border: "1px solid #10b98115",
    },
    text: {
      primary: "#e0f2fe",
      secondary: "#94e2e0",
      muted: "#6ee7b7",
    },
    accent: "linear-gradient(135deg, #06b6d4, #10b981)",
    accentLight: "#06b6d420",
    highlight: "#10b981",
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
