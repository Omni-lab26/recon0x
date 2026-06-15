"use client";

import { IconFlame } from "@tabler/icons-react";

const WEEK = [
  { day: "月", active: true },
  { day: "火", active: true },
  { day: "水", active: true },
  { day: "木", active: true },
  { day: "金", active: true },
  { day: "土", active: true },
  { day: "日", active: false, today: true },
];

const STREAK = 14;
const BEST_STREAK = 14;
const IS_BEST = STREAK === BEST_STREAK;

export function MobileStreakStrip() {
  return (
    <section className="px-5">
      <div
        className="rounded-3xl border p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.04) 60%, var(--surf))",
          borderColor: "rgba(245,158,11,0.3)",
        }}
      >
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.35), transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <div className="relative">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="eyebrow mb-1 text-brand-amber">🔥 LEARNING STREAK</div>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-mono text-[44px] font-bold leading-none tracking-[-0.03em]"
                  style={{ color: "var(--a)" }}
                >
                  {STREAK}
                </span>
                <span className="text-[15px] text-t2 font-medium">日連続</span>
              </div>
              {IS_BEST && (
                <div className="text-[13px] font-bold text-brand-amber mt-1">
                  🎉 自己ベスト更新中
                </div>
              )}
            </div>
            <IconFlame size={56} stroke={1.4} className="text-brand-amber opacity-80" />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {WEEK.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-full aspect-square rounded-lg flex items-center justify-center font-mono text-[14px] font-bold transition-all"
                  style={
                    d.active
                      ? {
                          background: "linear-gradient(135deg, #F59E0B, #EF4444)",
                          color: "white",
                          boxShadow: "0 4px 12px rgba(245,158,11,0.35)",
                        }
                      : d.today
                      ? {
                          background: "transparent",
                          color: "var(--t2)",
                          border: "2px dashed rgba(245,158,11,0.4)",
                        }
                      : {
                          background: "var(--surf3)",
                          color: "var(--t3)",
                        }
                  }
                >
                  {d.active ? "✓" : d.day}
                </div>
                <span
                  className={`font-mono text-[10px] ${
                    d.today ? "text-brand-amber font-bold" : "text-t3"
                  }`}
                >
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
