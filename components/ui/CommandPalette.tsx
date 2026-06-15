"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  IconHome,
  IconRoute,
  IconTerminal2,
  IconFlag,
  IconFileText,
  IconTrophy,
  IconUsersGroup,
  IconTool,
  IconBriefcase,
  IconShieldExclamation,
  IconNews,
  IconBook,
  IconUserCircle,
  IconSettings,
  IconSearch,
  IconArrowRight,
  IconCornerDownLeft,
} from "@tabler/icons-react";

interface Cmd {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  group: "ナビゲーション" | "コンテンツ" | "アカウント" | "アクション";
  keywords?: string[];
}

const COMMANDS: Cmd[] = [
  { id: "home", label: "ダッシュボード", href: "/", icon: <IconHome size={15} stroke={1.6} />, group: "ナビゲーション", keywords: ["dashboard", "home", "ホーム"] },
  { id: "learn", label: "学習パス", href: "/learn", icon: <IconRoute size={15} stroke={1.6} />, group: "ナビゲーション" },
  { id: "lab", label: "ラボ", href: "/lab", icon: <IconTerminal2 size={15} stroke={1.6} />, group: "ナビゲーション" },
  { id: "ctf", label: "CTF チャレンジ", href: "/ctf", icon: <IconFlag size={15} stroke={1.6} />, group: "ナビゲーション" },
  { id: "articles", label: "記事 / ドキュメント", href: "/articles", icon: <IconFileText size={15} stroke={1.6} />, group: "ナビゲーション" },
  { id: "leaderboard", label: "ランキング", href: "/leaderboard", icon: <IconTrophy size={15} stroke={1.6} />, group: "ナビゲーション" },
  { id: "community", label: "コミュニティ", href: "/community", icon: <IconUsersGroup size={15} stroke={1.6} />, group: "ナビゲーション" },
  { id: "tools", label: "ツール", href: "/tools", icon: <IconTool size={15} stroke={1.6} />, group: "ナビゲーション" },
  { id: "jobs", label: "求人・案件", href: "/jobs", icon: <IconBriefcase size={15} stroke={1.6} />, group: "ナビゲーション" },

  { id: "cve", label: "CVE データベース", href: "/cve", icon: <IconShieldExclamation size={15} stroke={1.6} />, group: "コンテンツ" },
  { id: "news", label: "セキュリティニュース", href: "/news", icon: <IconNews size={15} stroke={1.6} />, group: "コンテンツ" },
  { id: "glossary", label: "用語集", href: "/glossary", icon: <IconBook size={15} stroke={1.6} />, group: "コンテンツ" },

  { id: "profile", label: "プロフィール", href: "/profile", icon: <IconUserCircle size={15} stroke={1.6} />, group: "アカウント" },
  { id: "settings", label: "設定", href: "/settings", icon: <IconSettings size={15} stroke={1.6} />, group: "アカウント" },
  { id: "login", label: "ログイン", href: "/login", icon: <IconArrowRight size={15} stroke={1.6} />, group: "アカウント" },
  { id: "signup", label: "アカウント作成", href: "/signup", icon: <IconArrowRight size={15} stroke={1.6} />, group: "アカウント" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Global hotkey
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Custom open trigger from Topbar / Sidebar
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-command-palette", handler);
    return () => window.removeEventListener("open-command-palette", handler);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  // Filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => {
      const haystack = [c.label, c.href, ...(c.keywords ?? [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  // Group filtered results
  const grouped = useMemo(() => {
    const map = new Map<Cmd["group"], Cmd[]>();
    filtered.forEach((c) => {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const select = (cmd: Cmd) => {
    router.push(cmd.href);
    setOpen(false);
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[selectedIdx];
      if (cmd) select(cmd);
    }
  };

  if (!open) return null;

  let flatIdx = 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] sm:pt-[12vh] px-3 sm:px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full sm:max-w-[580px] rounded-[14px] border overflow-hidden flex flex-col"
        style={{
          background: "rgba(10,9,13,0.96)",
          backdropFilter: "blur(28px)",
          borderColor: "rgba(168,85,247,0.3)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(168,85,247,0.15)",
          maxHeight: "70vh",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onListKeyDown}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: "rgba(168,85,247,0.15)" }}
        >
          <IconSearch size={16} className="text-t3" stroke={1.6} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent outline-none text-[16px] sm:text-[14px] text-t1 placeholder:text-t3"
          />
          <kbd
            className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
            style={{
              background: "rgba(168,85,247,0.1)",
              borderColor: "rgba(168,85,247,0.3)",
              color: "var(--p)",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-[12.5px] text-t3 mb-1">該当なし</div>
              <div className="font-mono text-[10px] text-t3">
                別のキーワードで検索してみてください
              </div>
            </div>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group} className="mb-2">
                <div className="eyebrow px-2 py-1.5">{group}</div>
                {items.map((c) => {
                  const isSelected = flatIdx === selectedIdx;
                  const myIdx = flatIdx;
                  flatIdx++;
                  return (
                    <button
                      key={c.id}
                      onClick={() => select(c)}
                      onMouseEnter={() => setSelectedIdx(myIdx)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition cursor-pointer"
                      style={{
                        background: isSelected
                          ? "rgba(168,85,247,0.12)"
                          : "transparent",
                        color: isSelected ? "#C084FC" : "var(--t1)",
                      }}
                    >
                      <span
                        style={{
                          color: isSelected ? "var(--p)" : "var(--t3)",
                        }}
                      >
                        {c.icon}
                      </span>
                      <span className="flex-1 text-[12.5px]">{c.label}</span>
                      <span className="font-mono text-[10px] text-t3">
                        {c.href}
                      </span>
                      {isSelected && (
                        <IconCornerDownLeft
                          size={12}
                          stroke={1.6}
                          style={{ color: "var(--p)" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-2 border-t flex items-center justify-between font-mono text-[9.5px] text-t3"
          style={{ borderColor: "rgba(168,85,247,0.15)" }}
        >
          <div className="flex items-center gap-3">
            <span>
              <kbd className="bg-surf2 border border-bd px-1 rounded">↑↓</kbd>{" "}
              移動
            </span>
            <span>
              <kbd className="bg-surf2 border border-bd px-1 rounded">↵</kbd>{" "}
              選択
            </span>
            <span>
              <kbd className="bg-surf2 border border-bd px-1 rounded">ESC</kbd>{" "}
              閉じる
            </span>
          </div>
          <span style={{ color: "var(--p)" }}>{filtered.length} 件</span>
        </div>
      </div>
    </div>
  );
}
