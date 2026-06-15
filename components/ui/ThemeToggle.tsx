"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun, IconBolt } from "@tabler/icons-react";

type Theme = "dark" | "cyber" | "light";

const THEMES: { value: Theme; icon: React.ReactNode; label: string }[] = [
  { value: "dark", icon: <IconMoon size={13} stroke={1.6} />, label: "ダーク" },
  { value: "cyber", icon: <IconBolt size={13} stroke={1.6} />, label: "サイバー" },
  { value: "light", icon: <IconSun size={13} stroke={1.6} />, label: "ライト" },
];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "dark";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("theme-dark", "theme-cyber", "theme-light");
    root.classList.add(`theme-${t}`);
    localStorage.setItem("theme", t);
  };

  const cycle = () => {
    const idx = THEMES.findIndex((t) => t.value === theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next.value);
    applyTheme(next.value);
  };

  const current = THEMES.find((t) => t.value === theme) ?? THEMES[0];

  if (compact) {
    return (
      <button
        onClick={cycle}
        className="w-8 h-8 rounded-lg border flex items-center justify-center transition flex-shrink-0"
        style={{
          background: "var(--surf2)",
          borderColor: "var(--bd)",
          color: "var(--t2)",
        }}
        title={`テーマ: ${current.label}(クリックで切替)`}
      >
        {current.icon}
      </button>
    );
  }

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-lg border"
      style={{ background: "var(--surf2)", borderColor: "var(--bd)" }}
    >
      {THEMES.map((t) => (
        <button
          key={t.value}
          onClick={() => {
            setTheme(t.value);
            applyTheme(t.value);
          }}
          className="px-2 py-1 rounded-md flex items-center gap-1 text-[10.5px] transition"
          style={{
            background: t.value === theme ? "rgba(168,85,247,0.15)" : "transparent",
            color: t.value === theme ? "var(--p)" : "var(--t3)",
          }}
          title={t.label}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
