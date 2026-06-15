"use client";

import Link from "next/link";
import { IconFlame, IconArrowRight } from "@tabler/icons-react";

export function MobileHero() {
  const streak = 14;
  const streakBest = true;
  const todayTask = {
    title: "SQL インジェクション基礎",
    subtitle: "ラボを完了する",
    xp: 50,
    progress: 60,
  };

  return (
    <section className="space-y-4">
      {/* グリーティング */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
            style={{
              background: "rgba(245,158,11,0.1)",
              borderColor: "rgba(245,158,11,0.3)",
            }}
          >
            <IconFlame size={14} stroke={2} className="text-brand-amber" />
            <span className="font-mono text-[13px] font-bold text-brand-amber">
              {streak}
            </span>
            <span className="text-[12px] text-brand-amber">日連続</span>
          </div>
          {streakBest && (
            <span className="text-[12px] text-t3">🎉 自己ベスト</span>
          )}
        </div>
        <h1 className="text-[24px] font-bold tracking-[-0.02em] leading-tight">
          おかえり、
          <span
            style={{
              background: "linear-gradient(135deg, #A855F7, #22C55E)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            0xFreedom
          </span>
        </h1>
        <p className="text-[15px] text-t2 mt-1">
          今日のゴールまで、あと一歩。
        </p>
      </div>

      {/* 今日のミッション — Duolingo 風大型 CTA */}
      <Link
        href="/learn"
        className="block rounded-2xl border-2 p-5 no-underline relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(34,197,94,0.08) 60%, var(--surf))",
          borderColor: "rgba(168,85,247,0.35)",
          boxShadow: "0 8px 24px rgba(168,85,247,0.15)",
        }}
      >
        {/* グロー装飾 */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <div className="relative">
          <div className="eyebrow mb-2 text-brand-purple">
            ▸ 今日のミッション
          </div>
          <div className="text-[20px] font-bold mb-1 leading-tight">
            {todayTask.title}
          </div>
          <div className="text-[14px] text-t2 mb-4">{todayTask.subtitle}</div>

          {/* 進捗バー(大型) */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[12px] text-t3">進捗</span>
              <span className="font-mono text-[14px] font-bold text-brand-purple">
                {todayTask.progress}%
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "var(--surf3)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${todayTask.progress}%`,
                  background: "linear-gradient(90deg, #A855F7, #22C55E)",
                  boxShadow: "0 0 12px rgba(168,85,247,0.5)",
                }}
              />
            </div>
          </div>

          {/* CTA */}
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3.5"
            style={{
              background: "linear-gradient(135deg, #A855F7, #7C3AED)",
              boxShadow: "0 6px 16px rgba(168,85,247,0.4)",
              minHeight: "48px",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-bold text-white">
                続きから学習
              </span>
              <span
                className="font-mono text-[12px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  color: "white",
                }}
              >
                +{todayTask.xp} XP
              </span>
            </div>
            <IconArrowRight size={20} stroke={2.5} className="text-white" />
          </div>
        </div>
      </Link>
    </section>
  );
}
