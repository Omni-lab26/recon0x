"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const RANK = {
  name: "ハンター",
  level: 24,
  nextRankName: "オペレーター",
  xp: 12540,
  nextLevelXp: 13000,
  totalXpInLevel: 460,
  earnedXpInLevel: 460,
};

const progress = Math.min(1, RANK.earnedXpInLevel / RANK.totalXpInLevel);
const remaining = RANK.nextLevelXp - RANK.xp;

export function MobileRankHero() {
  const size = 220;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <section className="relative px-5 pt-6 pb-2 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(168,85,247,0.22), rgba(34,197,94,0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative">
        <div className="text-center mb-5">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-3"
            style={{
              background: "rgba(168,85,247,0.08)",
              borderColor: "rgba(168,85,247,0.3)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse-soft" />
            <span
              className="font-mono text-[12px] font-bold tracking-wider uppercase"
              style={{ color: "#C084FC" }}
            >
              LEVEL {RANK.level} · {RANK.name}
            </span>
          </div>
          <h1
            className="text-[42px] font-bold leading-none tracking-[-0.03em] mb-2"
            style={{
              background: "linear-gradient(135deg, #A855F7, #22C55E)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            0xFreedom
          </h1>
          <p className="text-[15px] text-t2">
            次のレベルまで <span className="font-mono font-bold text-t1">{remaining}</span> XP
          </p>
        </div>

        <div className="flex justify-center mb-7">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surf3)" strokeWidth={stroke} />
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
              </defs>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(168,85,247,0.5))",
                  transition: "stroke-dashoffset 800ms cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="eyebrow mb-1">TOTAL XP</div>
              <div
                className="font-mono text-[44px] font-bold leading-none tracking-[-0.03em]"
                style={{ color: "var(--t1)" }}
              >
                {RANK.xp.toLocaleString()}
              </div>
              <div className="font-mono text-[13px] text-t3 mt-1.5">
                / {RANK.nextLevelXp.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-[13px] text-t3">
            あと <span className="font-mono font-bold text-t1">{remaining}</span> XP で
            <span className="font-bold mx-1" style={{ color: "var(--p)" }}>{RANK.nextRankName}</span>
            に昇格
          </div>
        </div>

        <Link
          href="/learn"
          className="flex items-center justify-between rounded-2xl px-6 no-underline"
          style={{
            minHeight: "60px",
            background: "linear-gradient(135deg, #A855F7, #7C3AED)",
            boxShadow: "0 12px 32px rgba(168,85,247,0.4), 0 4px 12px rgba(168,85,247,0.3)",
          }}
        >
          <span className="text-[17px] font-bold text-white tracking-tight">
            Continue Learning
          </span>
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[12px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
            >
              +50 XP
            </span>
            <IconArrowRight size={22} stroke={2.5} className="text-white" />
          </div>
        </Link>
      </div>
    </section>
  );
}
