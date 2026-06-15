"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  IconHome,
  IconRoute,
  IconFileText,
  IconTerminal2,
  IconFlag,
  IconBriefcase,
  IconUsersGroup,
  IconTrophy,
  IconTool,
  IconSettings,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const NAV = [
  { href: "/", label: "ダッシュボード", icon: <IconHome size={18} stroke={1.6} /> },
  { href: "/learn", label: "学習", icon: <IconRoute size={18} stroke={1.6} /> },
  { href: "/lab", label: "ラボ", icon: <IconTerminal2 size={18} stroke={1.6} /> },
  { href: "/ctf", label: "チャレンジ", icon: <IconFlag size={18} stroke={1.6} /> },
  { href: "/articles", label: "記事", icon: <IconFileText size={18} stroke={1.6} /> },
  { href: "/leaderboard", label: "ランキング", icon: <IconTrophy size={18} stroke={1.6} /> },
  { href: "/community", label: "コミュニティ", icon: <IconUsersGroup size={18} stroke={1.6} /> },
  { href: "/tools", label: "ツール", icon: <IconTool size={18} stroke={1.6} /> },
  { href: "/jobs", label: "求人・案件", icon: <IconBriefcase size={18} stroke={1.6} /> },
  { href: "/settings", label: "設定", icon: <IconSettings size={18} stroke={1.6} /> },
];

interface MobileNavProps {
  user?: { name: string; level: number } | null;
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ハンバーガーボタン — モバイル限定表示 */}
      <button
        onClick={() => setOpen(true)}
        aria-label="メニューを開く"
        className="lg:hidden w-11 h-11 rounded-lg border flex items-center justify-center text-t2 hover:text-t1 transition flex-shrink-0"
        style={{
          background: "rgba(139,92,246,0.04)",
          borderColor: "rgba(139,92,246,0.14)",
        }}
      >
        <IconMenu2 size={20} stroke={1.6} />
      </button>

      {/* オーバーレイ + ドロワー */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[200]"
          onClick={() => setOpen(false)}
        >
          {/* 背景 */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          />

          {/* ドロワー本体 */}
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 left-0 bottom-0 w-[280px] max-w-[85vw] flex flex-col safe-pt safe-pb"
            style={{
              background: "var(--sidebar-bg)",
              backdropFilter: "blur(24px)",
              borderRight: "1px solid var(--bd2)",
            }}
          >
            {/* Logo + close */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--bd)" }}>
              <Logo size="md" href="/" showBadge />
              <button
                onClick={() => setOpen(false)}
                aria-label="メニューを閉じる"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-t2 hover:text-t1 transition"
                style={{ background: "var(--surf2)", border: "1px solid var(--bd)" }}
              >
                <IconX size={18} stroke={1.6} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 my-1 rounded-lg text-[14px] no-underline transition-all"
                    style={{
                      minHeight: "48px",
                      background: active
                        ? "linear-gradient(90deg, rgba(168,85,247,0.14), rgba(168,85,247,0.04))"
                        : "transparent",
                      boxShadow: active ? "inset 3px 0 0 #A855F7" : undefined,
                      color: active ? "#C084FC" : "var(--t2)",
                    }}
                  >
                    <span style={{ color: active ? "#A855F7" : "var(--t3)" }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Premium CTA */}
            <div className="px-3 pb-2">
              <div
                className="p-3 rounded-xl border relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(139,92,246,0.06))",
                  borderColor: "rgba(168,85,247,0.3)",
                }}
              >
                <div className="text-[12px] font-bold mb-0.5" style={{ color: "#C084FC" }}>
                  recon0x Premium
                </div>
                <div className="text-[11px] text-t3 mb-2.5">
                  すべての機能を解放
                </div>
                <button
                  className="w-full rounded-lg text-[12px] font-bold text-white"
                  style={{
                    minHeight: "44px",
                    background: "linear-gradient(135deg, #A855F7, #7C3AED)",
                    boxShadow: "0 4px 12px rgba(168,85,247,0.4)",
                  }}
                >
                  今すぐアップグレード
                </button>
              </div>
            </div>

            {/* Profile + theme */}
            <div className="border-t p-3" style={{ borderColor: "var(--bd)" }}>
              <Link
                href="/profile"
                className="flex items-center gap-3 p-2 rounded-lg no-underline"
                style={{ background: "var(--surf2)", border: "1px solid var(--bd)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[12px] font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #A855F7, #22C55E)" }}
                >
                  {user ? user.name.slice(0, 2).toUpperCase() : "0x"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold truncate">
                    {user?.name ?? "0xFreedom"}
                  </div>
                  <div className="font-mono text-[10.5px] text-t3">
                    Level {user?.level ?? 24}
                  </div>
                </div>
                <ThemeToggle compact />
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
