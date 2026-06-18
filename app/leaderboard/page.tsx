import { MOCK_LEADERS } from "@/lib/mock-data";

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function LeaderboardPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <header className="mb-6">
        <div className="eyebrow mb-1">LEADERBOARD · GLOBAL RANKING</div>
        <h1 className="text-[22px] sm:text-[28px] font-bold tracking-[-0.02em] mb-2">ランキング</h1>
        <div className="text-[13px] text-t3 font-mono break-words">
          {MOCK_LEADERS.length}+ ハンター · あなたの順位 <span className="text-brand-purple font-bold">#248</span>
        </div>
      </header>

      {/* Tab */}
      <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-1 border-b -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ borderColor: "var(--bd)", scrollbarWidth: "none" }}>
        {["全期間", "今月", "今週", "今日"].map((s, i) => (
          <button
            key={s}
            className="flex-shrink-0 py-2 text-[13px] font-mono transition-colors"
            style={{
              color: i === 1 ? "var(--p)" : "var(--t3)",
              fontWeight: i === 1 ? 600 : 400,
              borderBottom: i === 1 ? "2px solid var(--p)" : "2px solid transparent",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Top 3 Podium — モバイルでも見える */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        {MOCK_LEADERS.slice(0, 3).map((u, i) => {
          const color = i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : "#CD7F32";
          return (
            <div
              key={u.rank}
              className="rounded-lg p-3 sm:p-4 border text-center min-w-0"
              style={{
                background: `linear-gradient(180deg, ${color}1a, ${color}05 60%, var(--surf))`,
                borderColor: `${color}55`,
              }}
            >
              <div className="text-[28px] sm:text-[32px] leading-none mb-1.5">
                {MEDAL[u.rank]}
              </div>
              <div className="text-[12px] sm:text-[13px] font-bold truncate mb-0.5">
                {u.name}
              </div>
              <div className="font-mono text-[12px] sm:text-[13px] font-bold" style={{ color }}>
                {(u.xp / 1000).toFixed(1)}k
              </div>
            </div>
          );
        })}
      </div>

      {/* ── デスクトップ:テーブル ── */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border" style={{ borderColor: "var(--bd)" }}>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left" style={{ background: "var(--surf2)" }}>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold w-12">#</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold">Hunter</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold">Rank</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold text-right">XP</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold text-right">Solves</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold text-right">Streak</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold text-right w-16">Δ</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LEADERS.map((u) => {
              const positive = u.delta.startsWith("+");
              return (
                <tr
                  key={u.rank}
                  className="border-t hover:bg-surf2 transition-colors"
                  style={{ borderColor: "var(--bd)" }}
                >
                  <td className="px-3 py-3 font-mono font-bold text-t1">{u.rank}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center font-mono text-[10px] font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #A855F7, #22C55E)" }}
                      >
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium truncate">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-t2 whitespace-nowrap">{u.rank_name}</td>
                  <td className="px-3 py-3 font-mono font-bold text-right">{u.xp.toLocaleString()}</td>
                  <td className="px-3 py-3 font-mono text-right text-t2">{u.solves}</td>
                  <td className="px-3 py-3 font-mono text-right text-brand-amber">🔥 {u.streak}</td>
                  <td className="px-3 py-3 font-mono text-right font-bold"
                    style={{ color: positive ? "var(--g)" : "var(--r)" }}>
                    {u.delta}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── モバイル:コンパクトリスト ── */}
      <ul className="sm:hidden divide-y" style={{ borderColor: "var(--bd)" }}>
        {MOCK_LEADERS.map((u) => {
          const positive = u.delta.startsWith("+");
          return (
            <li key={u.rank} className="py-3 flex items-center gap-3 min-w-0">
              <span className="font-mono text-[14px] font-bold text-t1 w-7 flex-shrink-0 text-right">
                {u.rank}
              </span>
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center font-mono text-[11px] font-bold text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #A855F7, #22C55E)" }}
              >
                {u.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold truncate">{u.name}</div>
                <div className="font-mono text-[11px] text-t3 truncate">
                  {u.rank_name} · 🔥 {u.streak}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-mono text-[13px] font-bold">{u.xp.toLocaleString()}</div>
                <div className="font-mono text-[11px] font-bold"
                  style={{ color: positive ? "var(--g)" : "var(--r)" }}>
                  {u.delta}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 自分の順位(常時表示) */}
      <div
        className="mt-6 rounded-lg p-3 sm:p-4 border-2 flex items-center gap-3 min-w-0"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(34,197,94,0.05))",
          borderColor: "rgba(168,85,247,0.4)",
        }}
      >
        <span className="font-mono text-[16px] font-bold text-brand-purple w-12 flex-shrink-0 text-right">
          #248
        </span>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[12px] font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #A855F7, #22C55E)" }}
        >
          0X
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-bold truncate">0xFreedom <span className="text-[11px] text-t3 font-normal">(あなた)</span></div>
          <div className="font-mono text-[11px] text-t3">
            🦅 ハンター · 🔥 14 · 上位 1.2%
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-mono text-[13px] font-bold">12,540</div>
          <div className="font-mono text-[11px] font-bold text-brand-green">+5</div>
        </div>
      </div>
    </div>
  );
}
