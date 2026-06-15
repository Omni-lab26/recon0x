import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { LivePill } from "@/components/home/LivePill";
import { MOCK_LEADERS } from "@/lib/mock-data";
import {
  IconTrophy,
  IconChartBar,
  IconUsers,
} from "@tabler/icons-react";

export default function LeaderboardPage() {
  const top3 = MOCK_LEADERS.slice(0, 3);
  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="GLOBAL LEADERBOARD · ALL-TIME"
        title={<>トップハンターたち。</>}
        description="グローバル · 月間 · 週間ランキング。XP · 解答数 · 連続日数で算出。"
        live={{ label: "8,420 USERS · 234 ONLINE" }}
        stats={[
          { label: "総ユーザー", value: "8,420" },
          { label: "オンライン", value: "234", color: "var(--g)" },
          { label: "今月の昇格", value: "47" },
          { label: "今週の解答", value: "1,892" },
          { label: "あなたの順位", value: "#248", color: "var(--c)" },
          { label: "次のランクまで", value: "+2,460 XP" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        {/* Filter */}
        <Panel className="col-span-12" hover={false}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[9.5px] text-t3 mr-2">PERIOD:</span>
            {["全期間", "月間", "週間", "今日"].map((p, i) => (
              <button
                key={p}
                className="px-3 py-1.5 rounded-full font-medium text-[11px] cursor-pointer border"
                style={
                  i === 0
                    ? {
                        background: "rgba(34,197,94,0.08)",
                        borderColor: "rgba(34,197,94,0.25)",
                        color: "var(--g)",
                      }
                    : {
                        background: "var(--surf)",
                        borderColor: "var(--bd)",
                        color: "var(--t3)",
                      }
                }
              >
                {p}
              </button>
            ))}
            <div className="w-px h-5 bg-bd mx-2" />
            <span className="font-mono text-[9.5px] text-t3 mr-1">METRIC:</span>
            {["XP 合計", "解答数", "連続日数", "First Blood"].map((m, i) => (
              <button
                key={m}
                className="px-3 py-1.5 rounded-full font-medium text-[11px] cursor-pointer border"
                style={
                  i === 0
                    ? {
                        background: "rgba(0,212,255,0.08)",
                        borderColor: "rgba(0,212,255,0.25)",
                        color: "var(--c)",
                      }
                    : {
                        background: "var(--surf)",
                        borderColor: "var(--bd)",
                        color: "var(--t3)",
                      }
                }
              >
                {m}
              </button>
            ))}
          </div>
        </Panel>

        {/* Podium (cols 1-8) */}
        <Panel
          eyebrow="表彰台"
          title="トップ 3 ハンター"
          icon={<IconTrophy size={13} stroke={1.8} />}
          iconBg="rgba(245,158,11,0.1)"
          iconColor="var(--a)"
          className="col-span-8"
        >
          <div className="grid grid-cols-3 gap-3 items-end">
            {[
              { ...top3[1], em: "🥈", h: "120px", c: "#94A3B8" },
              { ...top3[0], em: "👑", h: "150px", c: "#F59E0B" },
              { ...top3[2], em: "🥉", h: "100px", c: "#B45309" },
            ].map((p) => (
              <div key={p.rank} className="flex flex-col items-center">
                <div className="text-[34px] mb-2">{p.em}</div>
                <div
                  className="w-14 h-14 rounded-xl mb-2 flex items-center justify-center font-mono text-[15px] font-bold border-2"
                  style={{
                    background: `${p.c}1a`,
                    borderColor: `${p.c}66`,
                    color: p.c,
                  }}
                >
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-[12.5px] font-semibold font-mono mb-0.5">
                  {p.name}
                </div>
                <div className="font-mono text-[10px] text-t3 mb-3">
                  {p.rank_name} · Lv.{p.level}
                </div>
                <div
                  className="w-full p-3 text-center rounded-t-lg border border-b-0"
                  style={{
                    height: p.h,
                    background: `${p.c}11`,
                    borderColor: `${p.c}33`,
                  }}
                >
                  <div className="eyebrow mb-1">#{p.rank}</div>
                  <div
                    className="font-mono text-[18px] font-bold mt-2"
                    style={{ color: p.c }}
                  >
                    {p.xp.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-t3 mt-1">XP</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Right side: Your rank + Distribution */}
        <div className="col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="あなたの順位"
            title="現在のスタンディング"
            icon="📍"
            iconBg="rgba(0,212,255,0.1)"
          >
            <div className="text-center py-2">
              <div className="font-mono text-[36px] font-bold text-brand-cyan leading-none mb-1">
                #248
              </div>
              <div className="text-[11px] text-t2 mb-3">
                Top 2.9% · Lv.24 探索者
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-1.5 bg-surf2 border border-bd rounded text-center">
                  <div className="font-mono text-[14px] font-bold text-brand-green">
                    12,540
                  </div>
                  <div className="text-[9.5px] text-t3">XP</div>
                </div>
                <div className="p-1.5 bg-surf2 border border-bd rounded text-center">
                  <div className="font-mono text-[14px] font-bold text-brand-amber">
                    14 日
                  </div>
                  <div className="text-[9.5px] text-t3">連続</div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel
            eyebrow="ランク分布"
            title="グローバル統計"
            icon={<IconChartBar size={13} stroke={1.8} />}
            iconBg="rgba(139,92,246,0.1)"
            iconColor="var(--p)"
          >
            <div className="space-y-1.5">
              {[
                ["🌱 初心者", 3420, "var(--g)", 40],
                ["🔭 探索者", 2580, "var(--c)", 31],
                ["🔬 解析者", 1450, "var(--a)", 17],
                ["⚙️ オペレーター", 620, "var(--p)", 7],
                ["🦅 ハンター", 280, "var(--r)", 3],
                ["💀 エキスパート", 70, "var(--pink)", 1],
              ].map(([n, c, col, pct]) => (
                <div key={String(n)} className="flex items-center gap-2">
                  <span className="text-[10px] text-t2 w-[88px]">{n}</span>
                  <div className="flex-1 h-1 bg-surf3 rounded-full overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${pct as number}%`,
                        background: col as string,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[9.5px] text-t3 w-9 text-right">
                    {c as number}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Full leaderboard table (cols 1-12) */}
        <Panel
          eyebrow="フルランキング"
          title="トップ 10"
          icon={<IconUsers size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="col-span-12"
          right={<LivePill size="sm" />}
          noPadding
        >
          <table className="w-full">
            <thead>
              <tr>
                {["順位", "ユーザー", "ランク", "Lv", "XP 合計", "解答", "連続日数", "今週変動"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-3.5 py-2.5 text-[9.5px] font-mono font-semibold text-t3 border-b border-bd uppercase tracking-[0.06em]"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERS.map((u) => {
                const dn = parseInt(u.delta);
                const dColor = dn > 0 ? "var(--g)" : dn < 0 ? "var(--r)" : "var(--t3)";
                return (
                  <tr
                    key={u.rank}
                    className="hover:bg-surf2 transition-colors cursor-pointer"
                  >
                    <td className="px-3.5 py-2 border-b border-bd">
                      <span
                        className="font-mono text-[14px] font-bold"
                        style={{
                          color:
                            u.rank === 1
                              ? "var(--a)"
                              : u.rank <= 3
                              ? "#94A3B8"
                              : "var(--t3)",
                        }}
                      >
                        #{u.rank}
                      </span>
                    </td>
                    <td className="px-3.5 py-2 border-b border-bd">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center font-mono text-[10px] font-bold border"
                          style={{
                            background: "rgba(34,197,94,0.15)",
                            borderColor: "rgba(34,197,94,0.3)",
                            color: "var(--g)",
                          }}
                        >
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-mono text-[12px] font-semibold">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3.5 py-2 border-b border-bd">
                      <span className="text-[11px] text-t2">{u.rank_name}</span>
                    </td>
                    <td className="px-3.5 py-2 border-b border-bd">
                      <span className="font-mono text-[11.5px] font-semibold text-brand-cyan">
                        {u.level}
                      </span>
                    </td>
                    <td className="px-3.5 py-2 border-b border-bd">
                      <span className="font-mono text-[12px] font-bold text-brand-green">
                        {u.xp.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3.5 py-2 border-b border-bd">
                      <span className="font-mono text-[11px] text-t1">{u.solves}</span>
                    </td>
                    <td className="px-3.5 py-2 border-b border-bd">
                      <span className="font-mono text-[11px] text-brand-amber">
                        🔥 {u.streak}
                      </span>
                    </td>
                    <td className="px-3.5 py-2 border-b border-bd">
                      <span className="font-mono text-[11px] font-semibold" style={{ color: dColor }}>
                        {u.delta === "0" ? "—" : u.delta.startsWith("-") ? `↓ ${u.delta.slice(1)}` : `↑ ${u.delta.slice(1)}`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  );
}
