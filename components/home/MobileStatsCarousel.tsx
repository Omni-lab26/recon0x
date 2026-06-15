"use client";

const STATS = [
  {
    label: "総 XP",
    value: "12,540",
    sub: "+340 今週",
    color: "#22C55E",
    icon: "⚡",
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.04))",
  },
  {
    label: "世界ランク",
    value: "#248",
    sub: "上位 1.2%",
    color: "#00D4FF",
    icon: "🌍",
    gradient: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.04))",
  },
  {
    label: "今週の獲得",
    value: "3,250",
    sub: "↑ 12% pt",
    color: "#A855F7",
    icon: "📈",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.04))",
  },
];

export function MobileStatsCarousel() {
  return (
    <section>
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-[15px] font-semibold text-t2">
          📊 あなたの記録
        </h2>
        <span className="font-mono text-[11px] text-t3">スワイプで切替</span>
      </div>

      <div
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-2"
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
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex-shrink-0 snap-start rounded-2xl p-4 border"
            style={{
              width: "180px",
              minHeight: "120px",
              background: s.gradient,
              borderColor: `${s.color}33`,
              boxShadow: `0 4px 16px ${s.color}1a`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] text-t2">{s.label}</span>
              <span className="text-[18px]">{s.icon}</span>
            </div>
            <div
              className="font-mono text-[26px] font-bold leading-none mb-2"
              style={{ color: s.color, letterSpacing: "-0.02em" }}
            >
              {s.value}
            </div>
            <div
              className="font-mono text-[12px] font-medium"
              style={{ color: s.color, opacity: 0.85 }}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
