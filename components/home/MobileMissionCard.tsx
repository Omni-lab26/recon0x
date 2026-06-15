"use client";

import Link from "next/link";
import { IconBookmark, IconClock, IconBolt, IconArrowRight } from "@tabler/icons-react";

const MISSION = {
  id: "sqli-basics",
  category: "WEB SECURITY · LV.2",
  title: "SQL インジェクション 完全攻略",
  subtitle: "UNION-based 攻撃で認証バイパス",
  progress: 60,
  totalSteps: 8,
  doneSteps: 5,
  remainingMin: 12,
  reward: 250,
  color: "#22C55E",
  href: "/articles/sqli-basics",
};

export function MobileMissionCard() {
  return (
    <section className="px-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3">
          ◆ Current Mission
        </h2>
        <button
          aria-label="ブックマーク"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-t3 hover:text-brand-amber transition tap-sm"
          style={{ background: "var(--surf2)", border: "1px solid var(--bd)" }}
        >
          <IconBookmark size={16} stroke={1.6} />
        </button>
      </div>

      <Link
        href={MISSION.href}
        className="block rounded-3xl border-2 no-underline overflow-hidden relative active:scale-[0.99] transition-transform"
        style={{
          background: "linear-gradient(180deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.02) 35%, var(--surf))",
          borderColor: "rgba(34,197,94,0.35)",
          boxShadow: "0 16px 40px rgba(34,197,94,0.15)",
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(34,197,94,0.3), transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        <div className="relative p-6">
          <div
            className="font-mono text-[11px] font-bold tracking-[0.1em] mb-3"
            style={{ color: MISSION.color }}
          >
            {MISSION.category}
          </div>

          <h3 className="text-[22px] font-bold leading-tight mb-2 tracking-[-0.01em]">
            {MISSION.title}
          </h3>
          <p className="text-[15px] text-t2 leading-relaxed mb-5">
            {MISSION.subtitle}
          </p>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[13px] text-t2">
                {MISSION.doneSteps} / {MISSION.totalSteps} ステップ
              </span>
              <span
                className="font-mono text-[18px] font-bold"
                style={{ color: MISSION.color }}
              >
                {MISSION.progress}%
              </span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--surf3)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${MISSION.progress}%`,
                  background: `linear-gradient(90deg, ${MISSION.color}, ${MISSION.color}cc)`,
                  boxShadow: `0 0 12px ${MISSION.color}66`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 mb-5">
            <div className="flex items-center gap-1.5">
              <IconClock size={14} stroke={1.8} className="text-t3" />
              <span className="text-[13px] text-t2">残り {MISSION.remainingMin} 分</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconBolt size={14} stroke={1.8} className="text-brand-amber" />
              <span
                className="font-mono text-[13px] font-bold"
                style={{ color: MISSION.color }}
              >
                +{MISSION.reward} XP
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between rounded-2xl px-5"
            style={{
              minHeight: "56px",
              background: `linear-gradient(135deg, ${MISSION.color}, ${MISSION.color}cc)`,
              boxShadow: `0 8px 20px ${MISSION.color}55`,
            }}
          >
            <span className="text-[16px] font-bold text-white">続きから挑戦</span>
            <IconArrowRight size={20} stroke={2.5} className="text-white" />
          </div>
        </div>
      </Link>
    </section>
  );
}
