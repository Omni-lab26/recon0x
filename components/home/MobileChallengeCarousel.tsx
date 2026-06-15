"use client";

import Link from "next/link";
import { IconFlag, IconUsers, IconBolt } from "@tabler/icons-react";

const CHALLENGES = [
  {
    id: "web-01",
    difficulty: "Easy",
    title: "ハッキングの世界へようこそ！",
    subtitle: "Rookie CTF",
    description: "初心者向けの最初の一歩。ソースコードを読んでフラグを見つけよう。",
    solves: 287,
    xp: 100,
    color: "#22C55E",
    bgFrom: "#22C55E",
    bgTo: "#16A34A",
    icon: "🌱",
  },
  {
    id: "web-02",
    difficulty: "Medium",
    title: "この脆弱性を悪用できる？",
    subtitle: "Web War",
    description: "ログインフォームに潜む SQLi を発見し、認証を突破せよ。",
    solves: 156,
    xp: 250,
    color: "#F59E0B",
    bgFrom: "#F59E0B",
    bgTo: "#D97706",
    icon: "⚔",
  },
  {
    id: "crypto-01",
    difficulty: "Hard",
    title: "暗号を突破せよ",
    subtitle: "Crypto Crack",
    description: "暗号化されたメッセージを解読する。Hint: フェルマーの小定理。",
    solves: 98,
    xp: 500,
    color: "#EF4444",
    bgFrom: "#EF4444",
    bgTo: "#DC2626",
    icon: "🔐",
  },
  {
    id: "pwn-01",
    difficulty: "Insane",
    title: "カーネルを掌握せよ",
    subtitle: "Kernel Panic",
    description: "Linux カーネルの ROP チェーンを構築し、root を奪取。",
    solves: 23,
    xp: 1000,
    color: "#EC4899",
    bgFrom: "#EC4899",
    bgTo: "#BE185D",
    icon: "💀",
  },
];

export function MobileChallengeCarousel() {
  return (
    <section>
      <div className="flex items-center justify-between px-4 mb-3">
        <div>
          <h2 className="text-[17px] font-bold flex items-center gap-2">
            <IconFlag size={18} stroke={2} className="text-brand-purple" />
            今日のチャレンジ
          </h2>
          <div className="text-[12px] text-t3 mt-0.5">
            タップして挑戦 · {CHALLENGES.length} 問
          </div>
        </div>
        <Link
          href="/ctf"
          className="text-[13px] font-medium text-brand-purple no-underline"
        >
          すべて →
        </Link>
      </div>

      <div
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {CHALLENGES.map((c) => (
          <Link
            key={c.id}
            href={`/ctf/${c.id}`}
            className="flex-shrink-0 snap-start rounded-3xl no-underline overflow-hidden border-2 transition-transform active:scale-[0.97] relative"
            style={{
              width: "280px",
              minHeight: "320px",
              background: `linear-gradient(180deg, ${c.bgFrom}1f, ${c.bgTo}05 60%, var(--surf))`,
              borderColor: `${c.color}55`,
              boxShadow: `0 12px 32px ${c.color}1f`,
            }}
          >
            {/* グロー装飾 */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${c.color}40, transparent 70%)`,
                filter: "blur(24px)",
              }}
            />

            <div className="relative p-5 flex flex-col h-full">
              {/* 上部:アイコン + 難易度バッジ */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2"
                  style={{
                    background: `${c.color}25`,
                    borderColor: `${c.color}55`,
                  }}
                >
                  {c.icon}
                </div>
                <div
                  className="px-3 py-1.5 rounded-full border-2 font-mono text-[12px] font-bold uppercase tracking-wider"
                  style={{
                    background: `${c.color}1a`,
                    borderColor: `${c.color}55`,
                    color: c.color,
                  }}
                >
                  {c.difficulty}
                </div>
              </div>

              {/* タイトル */}
              <div className="mb-3 flex-1">
                <div
                  className="font-mono text-[12px] uppercase tracking-wider mb-1.5"
                  style={{ color: c.color }}
                >
                  {c.subtitle}
                </div>
                <h3 className="text-[20px] font-bold leading-tight mb-2">
                  {c.title}
                </h3>
                <p className="text-[14px] text-t2 leading-relaxed">
                  {c.description}
                </p>
              </div>

              {/* 下部:メタ + CTA */}
              <div>
                <div className="flex items-center gap-4 mb-3 text-[13px] text-t2">
                  <div className="flex items-center gap-1.5">
                    <IconUsers size={14} stroke={1.8} />
                    <span className="font-mono">{c.solves}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IconBolt
                      size={14}
                      stroke={1.8}
                      className="text-brand-amber"
                    />
                    <span
                      className="font-mono font-bold text-[15px]"
                      style={{ color: c.color }}
                    >
                      +{c.xp} XP
                    </span>
                  </div>
                </div>
                <div
                  className="flex items-center justify-center rounded-xl text-white font-bold text-[15px]"
                  style={{
                    minHeight: "48px",
                    background: `linear-gradient(135deg, ${c.bgFrom}, ${c.bgTo})`,
                    boxShadow: `0 4px 14px ${c.color}55`,
                  }}
                >
                  挑戦する
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
