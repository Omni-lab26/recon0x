"use client";

import Link from "next/link";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { Logo } from "@/components/brand/Logo";

interface TopbarProps {
  user?: { name: string; level: number; xp: number } | null;
}

export function Topbar({ user }: TopbarProps) {
  return (
    <header
      className="flex items-center gap-2 sm:gap-3 px-4 lg:px-5 sticky top-0 z-20 flex-shrink-0 border-b safe-pt"
      style={{
        background: "var(--topbar-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(139,92,246,0.1)",
        minHeight: "56px",
      }}
    >
      {/* ロゴ — モバイル限定(デスクトップはサイドバーにロゴあり) */}
      <div className="lg:hidden">
        <Logo size="sm" href="/" showBadge={false} />
      </div>

      {/* 検索バー — デスクトップ限定 */}
      <button
        onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
        aria-label="検索"
        className="hidden lg:flex flex-1 max-w-[400px] items-center gap-2.5 px-3.5 py-2 rounded-lg text-[12.5px] text-t3 hover:text-t2 transition border"
        style={{
          minHeight: "40px",
          background: "rgba(139,92,246,0.04)",
          borderColor: "rgba(139,92,246,0.14)",
        }}
      >
        <IconSearch size={13} stroke={1.6} className="flex-shrink-0" />
        <span className="truncate">Search topics, labs, tools...</span>
        <span
          className="ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded text-t3 flex-shrink-0"
          style={{
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          Ctrl K
        </span>
      </button>

      {/* 右側 */}
      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto flex-shrink-0">
        {/* 🔥 ストリーク — モバイルではタップ可能(プロフィールへ) */}
        <Link
          href="/profile"
          aria-label="ストリーク"
          className="flex items-center gap-1.5 px-3 rounded-full border no-underline"
          style={{
            minHeight: "40px",
            background: "rgba(245,158,11,0.08)",
            borderColor: "rgba(245,158,11,0.22)",
          }}
        >
          <span className="text-[14px]">🔥</span>
          <span className="font-mono text-[14px] font-bold text-brand-amber">
            7
          </span>
        </Link>

        {/* 検索 — モバイル限定 アイコンボタン */}
        <button
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-command-palette"))
          }
          aria-label="検索を開く"
          className="lg:hidden w-11 h-11 rounded-lg border flex items-center justify-center text-t2 hover:text-t1 transition"
          style={{
            background: "rgba(139,92,246,0.04)",
            borderColor: "rgba(139,92,246,0.14)",
          }}
        >
          <IconSearch size={18} stroke={1.6} />
        </button>

        {/* 通知 */}
        <button
          aria-label="通知"
          className="w-11 h-11 rounded-lg border flex items-center justify-center text-t2 hover:text-t1 transition relative"
          style={{
            background: "rgba(139,92,246,0.04)",
            borderColor: "rgba(139,92,246,0.14)",
          }}
        >
          <IconBell size={17} stroke={1.6} />
          <span
            className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
            style={{
              background: "#A855F7",
              boxShadow: "0 0 6px rgba(168,85,247,0.9)",
            }}
          />
        </button>

        {/* アバター / ログイン — デスクトップ限定 */}
        {user ? (
          <Link
            href="/profile"
            className="hidden lg:flex w-11 h-11 rounded-lg items-center justify-center font-mono text-[12px] font-bold text-white no-underline"
            style={{
              background: "linear-gradient(135deg, #A855F7, #22C55E)",
              boxShadow: "0 0 12px rgba(168,85,247,0.35)",
            }}
          >
            {user.name.slice(0, 2).toUpperCase()}
          </Link>
        ) : (
          <Link
            href="/login"
            className="hidden lg:flex px-3.5 text-[13px] font-medium text-t2 hover:text-t1 border rounded-lg transition no-underline items-center"
            style={{
              minHeight: "40px",
              background: "rgba(139,92,246,0.06)",
              borderColor: "rgba(139,92,246,0.2)",
            }}
          >
            ログイン
          </Link>
        )}
      </div>
    </header>
  );
}
