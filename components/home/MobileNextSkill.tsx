"use client";

import Link from "next/link";
import { IconSparkles, IconArrowRight } from "@tabler/icons-react";

const NEXT_SKILL = {
  title: "リバースエンジニアリング 入門",
  reason: "SQL インジェクションを終えたあなたに次のステップ。バイナリ解析の基礎を学べます。",
  modules: 14,
  estHours: 8,
  color: "#8B5CF6",
  emoji: "🔬",
  href: "/learn",
};

export function MobileNextSkill() {
  return (
    <section className="px-5">
      <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-4">
        ◆ Recommended Next Skill
      </h2>

      <Link
        href={NEXT_SKILL.href}
        className="block rounded-3xl border no-underline overflow-hidden active:scale-[0.99] transition-transform"
        style={{
          background: "var(--surf)",
          borderColor: "var(--bd2)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div className="p-6 flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-[32px] flex-shrink-0 border-2"
            style={{
              background: `${NEXT_SKILL.color}1a`,
              borderColor: `${NEXT_SKILL.color}40`,
            }}
          >
            {NEXT_SKILL.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <IconSparkles size={12} stroke={2} style={{ color: NEXT_SKILL.color }} />
              <span
                className="font-mono text-[10px] font-bold tracking-[0.1em]"
                style={{ color: NEXT_SKILL.color }}
              >
                NEXT FOR YOU
              </span>
            </div>
            <div className="text-[17px] font-bold leading-tight mb-1">
              {NEXT_SKILL.title}
            </div>
            <div className="text-[13px] text-t3 font-mono">
              {NEXT_SKILL.modules} モジュール · 約 {NEXT_SKILL.estHours}h
            </div>
          </div>

          <IconArrowRight size={20} stroke={2} className="text-t3 flex-shrink-0" />
        </div>

        <div
          className="px-6 py-4 border-t text-[13.5px] text-t2 leading-relaxed"
          style={{ borderColor: "var(--bd)", background: "var(--surf2)" }}
        >
          {NEXT_SKILL.reason}
        </div>
      </Link>
    </section>
  );
}
