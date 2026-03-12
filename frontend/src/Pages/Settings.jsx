import React, { useContext } from "react";
import { Settings as SettingsIcon, Palette, Check } from "lucide-react";
import ThemeContext from "../context/ThemeContext";

function Settings() {
  const { theme, currentTheme, switchTheme, THEMES } = useContext(ThemeContext);

  const themesList = Object.entries(THEMES).map(([key, themeObj]) => ({
    id: key,
    name: themeObj.name,
  }));

  const getThemePreview = (themeId) => {
    const t = THEMES[themeId];
    return {
      bg: t.bg,
      card: t.card,
      text: t.text,
    };
  };

  return (
    <div
      style={{
        background: theme.bg,
        minHeight: "100vh",
        color: theme.text.primary,
      }}
    >
      <div className="relative px-6 md:px-16 py-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <SettingsIcon size={20} style={{ color: theme.highlight }} />
            <span
              className="text-sm font-medium"
              style={{ color: theme.highlight }}
            >
              Settings
            </span>
          </div>

          <h1
            className="text-3xl font-bold"
            style={{
              background: "linear-gradient(135deg, #e0e7ff, #c4b5fd, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Preferences
          </h1>

          <p className="text-sm mt-2" style={{ color: theme.text.secondary }}>
            Customize your Resare experience
          </p>
        </div>

        {/* Theme Selection */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{
            background: theme.card.background,
            border: theme.card.border,
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette size={18} style={{ color: theme.highlight }} />
            <h2 className="text-xl font-semibold">Theme</h2>
          </div>

          <p className="text-sm mb-6" style={{ color: theme.text.secondary }}>
            Choose your preferred color scheme
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {themesList.map(({ id, name }) => {
              const isActive = currentTheme === id;
              const themeColors = getThemePreview(id);

              return (
                <button
                  key={id}
                  onClick={() => switchTheme(id)}
                  className="relative overflow-hidden rounded-xl transition-all duration-200 p-4 text-left group"
                  style={{
                    background: themeColors.card.background,
                    border: isActive
                      ? `2px solid ${theme.highlight}`
                      : themeColors.card.border,
                    boxShadow: isActive
                      ? `0 0 20px ${theme.highlight}40`
                      : "none",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {/* Color preview circles */}
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: themeColors.text.primary }}
                    >
                      {name}
                    </h3>

                    {isActive && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: theme.highlight }}
                      >
                        <Check size={14} style={{ color: "#fff" }} />
                      </div>
                    )}
                  </div>

                  {/* Color swatches */}
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded-lg border"
                      style={{
                        background: themeColors.text.primary,
                        borderColor: `${themeColors.text.primary}30`,
                      }}
                    />
                    <div
                      className="w-8 h-8 rounded-lg border"
                      style={{
                        background: themeColors.text.secondary,
                        borderColor: `${themeColors.text.secondary}30`,
                      }}
                    />
                    <div
                      className="w-8 h-8 rounded-lg border"
                      style={{
                        background: themeColors.text.muted,
                        borderColor: `${themeColors.text.muted}30`,
                      }}
                    />
                  </div>

                  {/* Hover effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${theme.highlight}10, transparent)`,
                      pointerEvents: "none",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Section */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: theme.card.background,
            border: theme.card.border,
          }}
        >
          <h3 className="font-semibold mb-3">Theme Details</h3>
          <div
            className="space-y-2 text-sm"
            style={{ color: theme.text.secondary }}
          >
            <p>
              <span style={{ color: theme.text.primary }}>Dark:</span> Classic
              dark mode optimized for nighttime viewing
            </p>
            <p>
              <span style={{ color: theme.text.primary }}>Light:</span> Clean
              light theme for daytime use
            </p>
            <p>
              <span style={{ color: theme.text.primary }}>Ocean:</span> Soothing
              ocean-inspired colors for a calm experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
