"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
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
  IconShieldExclamation,
  IconNews,
  IconBook,
  IconUserCircle,
  IconSettings,
  IconSearch,
  IconChevronRight,
} from "@tabler/icons-react";

const NAV = [
  { href: "/", label: "ダッシュボード", icon: <IconHome size={16} stroke={1.6} /> },
  { href: "/learn", label: "学習", icon: <IconRoute size={16} stroke={1.6} /> },
  { href: "/lab", label: "ラボ", icon: <IconTerminal2 size={16} stroke={1.6} /> },
  { href: "/ctf", label: "チャレンジ", icon: <IconFlag size={16} stroke={1.6} /> },
  { href: "/articles", label: "記事", icon: <IconFileText size={16} stroke={1.6} /> },
  { href: "/leaderboard", label: "ランキング", icon: <IconTrophy size={16} stroke={1.6} /> },
  { href: "/community", label: "コミュニティ", icon: <IconUsersGroup size={16} stroke={1.6} /> },
  { href: "/tools", label: "ツール", icon: <IconTool size={16} stroke={1.6} /> },
  { href: "/jobs", label: "求人・案件", icon: <IconBriefcase size={16} stroke={1.6} /> },
  { href: "/settings", label: "設定", icon: <IconSettings size={16} stroke={1.6} /> },
];

interface SidebarProps {
  user?: { name: string; level: number; rank: string; xp?: number } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="hidden lg:flex w-[220px] min-w-[220px] flex-col border-r fixed top-0 left-0 overflow-y-auto"
      style={{
        background: "var(--sidebar-bg)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(139,92,246,0.12)",
        height: "100vh",
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <Logo size="md" href="/" showBadge />
      </div>

      {/* Search */}
      <div className="px-3 mb-2">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-t3 text-[12px] hover:text-t2 transition border"
          style={{
            background: "rgba(139,92,246,0.04)",
            borderColor: "rgba(139,92,246,0.12)",
          }}
        >
          <IconSearch size={13} stroke={1.6} />
          <span>検索...</span>
          <span className="ml-auto font-mono text-[9.5px] px-1.5 py-0.5 rounded text-t3"
            style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}>
            ⌘K
          </span>
        </button>
      </div>

      {/* Nav items — フラット */}
      <nav className="flex-1 overflow-y-auto px-2 py-1">
        {NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 my-0.5 rounded-lg text-[13px] transition-all no-underline",
                active ? "text-t1" : "text-t2 hover:bg-surf2 hover:text-t1"
              )}
              style={
                active
                  ? {
                      background:
                        "linear-gradient(90deg, rgba(168,85,247,0.12), rgba(168,85,247,0.04))",
                      boxShadow: "inset 2px 0 0 #A855F7",
                      color: "#C084FC",
                    }
                  : undefined
              }
            >
              <span
                style={active ? { color: "#A855F7" } : { opacity: 0.7 }}
              >
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
            boxShadow: "0 0 20px rgba(168,85,247,0.1)",
          }}
        >
          {/* 紫グロー */}
          <div
            className="absolute -top-4 -right-4 w-20 h-20 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)",
              filter: "blur(12px)",
            }}
          />
          <div className="relative">
            <div
              className="text-[11.5px] font-bold mb-0.5"
              style={{ color: "#C084FC" }}
            >
              recon0x Premium
            </div>
            <div className="text-[10px] text-t3 mb-2.5 leading-snug">
              すべての機能を解放して<br />スキルを加速させよう
            </div>
            <button
              className="w-full py-1.5 rounded-lg text-[11px] font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #A855F7, #7C3AED)",
                boxShadow: "0 4px 12px rgba(168,85,247,0.4)",
              }}
            >
              今すぐアップグレード
            </button>
          </div>
        </div>
      </div>

      {/* Bottom: Profile + XP bar + dark mode */}
      <div
        className="border-t p-3"
        style={{ borderColor: "rgba(139,92,246,0.12)" }}
      >
        {/* Avatar row */}
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #A855F7, #22C55E)" }}
          >
            {user ? user.name.slice(0, 2).toUpperCase() : "0x"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-semibold truncate leading-none mb-1">
              {user?.name ?? "0xFreedom"}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9.5px] text-t3">
                Level {user?.level ?? 24}
              </span>
              <div
                className="flex-1 h-[3px] rounded-full overflow-hidden"
                style={{ background: "var(--surf3)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "60%",
                    background: "linear-gradient(90deg, #A855F7, #22C55E)",
                  }}
                />
              </div>
              <span className="font-mono text-[9.5px] text-t3">25</span>
            </div>
          </div>
        </div>

        {/* Profile link + dark mode toggle */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/profile"
            className="flex-1 py-1.5 rounded-lg text-[11px] text-center text-t2 hover:text-t1 border hover:border-bd2 transition no-underline"
            style={{ background: "var(--surf2)", borderColor: "var(--bd)" }}
          >
            プロフィールを表示
          </Link>
          <button
            type="button"
            className="hidden"
          />
          <ThemeToggle compact />
        </div>
      </div>
    </aside>
  );
}
