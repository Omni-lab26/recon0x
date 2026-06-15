import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { Sparkline } from "@/components/ui/Sparkline";
import { LivePill } from "@/components/home/LivePill";
import { MOCK_CTFS } from "@/lib/mock-data";
import {
  IconFlag,
  IconTrophy,
  IconUsers,
  IconArrowRight,
  IconFlame,
  IconChartBar,
  IconCalendarEvent,
} from "@tabler/icons-react";

const CAT_META: Record<string, { name: string; color: string; glyph: string }> = {
  web: { name: "Web", color: "#2B7FFF", glyph: "</>" },
  crypto: { name: "Crypto", color: "#8B5CF6", glyph: "#" },
  forensic: { name: "Forensic", color: "#F59E0B", glyph: "◎" },
  pwn: { name: "Pwn", color: "#EF4444", glyph: "!" },
  osint: { name: "OSINT", color: "#F4564A", glyph: "@" },
  misc: { name: "Misc", color: "#06B6D4", glyph: "*" },
};

const DIFF_META: Record<string, { color: string; bg: string }> = {
  Easy: { color: "var(--g)", bg: "rgba(34,197,94,0.1)" },
  Medium: { color: "var(--a)", bg: "rgba(245,158,11,0.1)" },
  Hard: { color: "var(--r)", bg: "rgba(239,68,68,0.1)" },
};

export default function CTFPage() {
  const totalSolved = MOCK_CTFS.filter((c) => c.solved).length;
  const totalPoints = MOCK_CTFS.filter((c) => c.solved).reduce(
    (s, c) => s + c.points,
    0
  );
  const trending = [...MOCK_CTFS].sort((a, b) => b.solves - a.solves).slice(0, 5);

  // build category × difficulty heatmap
  const categories = Object.keys(CAT_META) as Array<keyof typeof CAT_META>;
  const difficulties: Array<"Easy" | "Medium" | "Hard"> = ["Easy", "Medium", "Hard"];
  const heatmap = categories.map((cat) =>
    difficulties.map(
      (d) => MOCK_CTFS.filter((c) => c.category === cat && c.difficulty === d).length
    )
  );

  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="CTF · CAPTURE THE FLAG ARENA"
        title={<>攻撃と防御を、競技で学ぶ。</>}
        description="Capture The Flag — フラグを取得する形式の演習。実際の脆弱性を再現した環境で、攻撃者の視点を体験します。"
        live={{ label: "ARENA OPEN · 287 SOLVED 24H" }}
        stats={[
          { label: "問題", value: `${MOCK_CTFS.length}` },
          { label: "Easy", value: `${MOCK_CTFS.filter((c) => c.difficulty === "Easy").length}`, color: "var(--g)" },
          { label: "Medium", value: `${MOCK_CTFS.filter((c) => c.difficulty === "Medium").length}`, color: "var(--a)" },
          { label: "Hard", value: `${MOCK_CTFS.filter((c) => c.difficulty === "Hard").length}`, color: "var(--r)" },
          { label: "解答", value: `${totalSolved}/${MOCK_CTFS.length}`, color: "var(--g)" },
          { label: "獲得 pt", value: `${totalPoints}`, color: "var(--a)" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        {/* ROW 1: Active event (cols 1-8) + Personal stats (cols 9-12) */}
        <div
          className="col-span-8 p-5 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(139,92,246,0.05),transparent 60%), var(--surf)",
            borderColor: "var(--bd2)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(0,212,255,0.5), transparent)",
            }}
          />
          <div className="flex items-center gap-2 mb-2.5">
            <LivePill size="sm" label="UPCOMING EVENT" color="cyan" />
            <span className="font-mono text-[10.5px] text-t3">
              EVT-001 · OPEN-RECON-2026 · 24h CTF
            </span>
          </div>
          <div className="text-[22px] font-semibold tracking-[-0.025em] leading-[1.15] mb-2">
            プラットフォーム公式オープン CTF
            <br />
            <span className="text-t3 font-medium text-[16px]">
              — 全 {MOCK_CTFS.length} 問・賞品あり
            </span>
          </div>
          <p className="text-[12.5px] text-t2 leading-[1.6] mb-4 max-w-[600px]">
            初回オープンイベント。Web · Crypto · Forensic · Pwn · OSINT · Misc の各カテゴリを揃え、24 時間のオンライン競技形式で開催予定。
          </p>
          <div className="grid grid-cols-4 gap-2">
            <MiniStat label="開始予定" value="6月22日" color="var(--c)" delta="土 21:00 JST" />
            <MiniStat label="持続時間" value="24h" color="var(--c)" delta="個人戦" />
            <MiniStat label="参加登録" value="142" color="var(--p)" delta="人 / 同時想定" />
            <MiniStat label="総得点" value="2,300pt" color="var(--a)" delta="満点" />
          </div>
        </div>

        <Panel
          eyebrow="あなたのソルブ"
          title="CTF パフォーマンス"
          icon="📊"
          iconBg="rgba(0,212,255,0.1)"
          className="col-span-4"
        >
          <div className="flex items-baseline gap-2 mb-3">
            <div className="font-mono text-[26px] font-bold text-brand-green leading-none">
              {totalSolved}
            </div>
            <div className="text-[11px] text-t3">/ {MOCK_CTFS.length} 解答</div>
            <span className="ml-auto font-mono text-[10px] text-brand-amber font-semibold">
              {totalPoints} pt
            </span>
          </div>
          <Sparkline
            series={[0, 1, 1, 2, 3, 4, 5]}
            color="var(--g)"
            height={28}
          />
          <div className="grid grid-cols-2 gap-1.5 mt-3">
            {[
              ["First Blood", "0"],
              ["挑戦中", "1"],
              ["平均所要", "32分"],
              ["最速", "8分"],
            ].map(([l, v]) => (
              <div
                key={l}
                className="flex items-center justify-between text-[10.5px] px-2 py-1.5 bg-surf2 border border-bd rounded"
              >
                <span className="text-t3">{l}</span>
                <span className="font-mono font-semibold text-t1">{v}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* ROW 2: Trending (cols 1-5) + Difficulty heatmap (cols 6-8) + Global activity (cols 9-12) */}
        <Panel
          eyebrow="トレンディング"
          title="今週の注目チャレンジ"
          icon={<IconFlame size={13} stroke={1.8} />}
          iconBg="rgba(245,158,11,0.1)"
          iconColor="var(--a)"
          className="col-span-5"
        >
          <div className="space-y-1.5">
            {trending.map((c, i) => {
              const meta = CAT_META[c.category];
              return (
                <a
                  key={c.id}
                  href={`/ctf/${c.id}`}
                  className="flex items-center gap-2.5 p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                >
                  <span
                    className="font-mono text-[14px] font-bold leading-none w-5"
                    style={{ color: i < 3 ? "var(--a)" : "var(--t3)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11.5px] font-semibold truncate mb-0.5">
                      {c.title}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-mono text-[8.5px] font-semibold px-1 py-0.5 rounded"
                        style={{ background: `${meta.color}1a`, color: meta.color }}
                      >
                        {meta.name.toUpperCase()}
                      </span>
                      <span className="font-mono text-[9.5px] text-brand-amber">
                        {c.points}pt
                      </span>
                      <span className="font-mono text-[9.5px] text-t3">
                        · {c.solves} 解答
                      </span>
                    </div>
                  </div>
                  {c.solved && (
                    <span
                      className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border"
                      style={{
                        background: "rgba(34,197,94,0.1)",
                        borderColor: "rgba(34,197,94,0.22)",
                        color: "var(--g)",
                      }}
                    >
                      ✓ 済
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </Panel>

        <Panel
          eyebrow="難易度マップ"
          title="カテゴリ × 難易度"
          icon={<IconChartBar size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="col-span-3"
        >
          <div className="space-y-1">
            <div className="grid grid-cols-[60px_1fr_1fr_1fr] gap-1 mb-1.5">
              <span></span>
              {difficulties.map((d) => (
                <span
                  key={d}
                  className="text-center font-mono text-[8.5px] text-t3 uppercase"
                >
                  {d}
                </span>
              ))}
            </div>
            {categories.map((cat, i) => {
              const meta = CAT_META[cat];
              return (
                <div
                  key={cat}
                  className="grid grid-cols-[60px_1fr_1fr_1fr] gap-1 items-center"
                >
                  <span
                    className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.04em]"
                    style={{ color: meta.color }}
                  >
                    {meta.name}
                  </span>
                  {heatmap[i].map((n, j) => (
                    <div
                      key={j}
                      className="h-5 rounded flex items-center justify-center font-mono text-[8.5px] font-semibold"
                      style={{
                        background:
                          n > 0
                            ? n === 1
                              ? `${meta.color}26`
                              : n === 2
                              ? `${meta.color}44`
                              : `${meta.color}66`
                            : "var(--surf3)",
                        border:
                          n > 0
                            ? `1px solid ${meta.color}40`
                            : "1px solid var(--bd)",
                        color: n > 0 ? meta.color : "var(--t4)",
                      }}
                    >
                      {n > 0 ? n : "·"}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="pt-2 mt-2 border-t border-bd text-center font-mono text-[9px] text-t3">
            合計 {MOCK_CTFS.length} 問
          </div>
        </Panel>

        <Panel
          eyebrow="グローバル活動"
          title="他ユーザーの動向"
          icon={<IconUsers size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="col-span-4"
          right={<LivePill size="sm" />}
        >
          <div className="space-y-1.5">
            {[
              ["recon_master が Buffer Overflow 101 で First Blood 🩸", "たった今"],
              ["0xDEADBEEF が ROP ガジェット連結 を解答 +500pt", "8分前"],
              ["cyber_ninja が CVE-2026-1024 Writeup を投稿", "23分前"],
              ["pwn_master が解析者ランクに昇格 🎉", "38分前"],
            ].map(([tx, t]) => (
              <div
                key={String(tx)}
                className="flex items-start gap-2 p-1.5 bg-surf2 border border-bd rounded text-[10.5px]"
              >
                <span className="text-brand-green flex-shrink-0">●</span>
                <span className="flex-1 leading-snug">{tx}</span>
                <span className="font-mono text-[9px] text-t3 flex-shrink-0">
                  {t}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* ROW 3: Challenge grid (cols 1-8) + Right rail (cols 9-12) */}
        <Panel
          eyebrow="チャレンジ一覧"
          title="挑戦可能な問題"
          icon={<IconFlag size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="col-span-8"
          right={
            <span className="font-mono text-[10.5px] text-t3">
              {totalSolved} / {MOCK_CTFS.length} 解答済
            </span>
          }
        >
          <div className="flex items-center gap-1.5 flex-wrap mb-3 pb-3 border-b border-bd">
            <span className="font-mono text-[9.5px] text-t3 mr-1">FILTER:</span>
            <button
              className="px-2.5 py-1 rounded-full font-medium text-[10.5px] cursor-pointer border"
              style={{
                background: "rgba(34,197,94,0.08)",
                borderColor: "rgba(34,197,94,0.25)",
                color: "var(--g)",
              }}
            >
              すべて {MOCK_CTFS.length}
            </button>
            {categories.map((cat) => {
              const meta = CAT_META[cat];
              const count = MOCK_CTFS.filter((c) => c.category === cat).length;
              return (
                <button
                  key={cat}
                  className="px-2.5 py-1 rounded-full font-medium text-[10.5px] cursor-pointer border flex items-center gap-1.5"
                  style={{
                    background: "var(--surf)",
                    borderColor: "var(--bd)",
                    color: "var(--t2)",
                  }}
                >
                  <span style={{ color: meta.color }}>●</span>
                  {meta.name}
                  <span className="font-mono text-[8.5px] text-t3">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_CTFS.map((c) => {
              const meta = CAT_META[c.category];
              const diff = DIFF_META[c.difficulty];
              return (
                <a
                  key={c.id}
                  href={`/ctf/${c.id}`}
                  className="p-2.5 bg-surf2 border border-bd rounded-lg cursor-pointer hover:border-bd2 hover:bg-surf3 transition no-underline relative overflow-hidden"
                >
                  {c.solved && (
                    <div
                      className="absolute -top-1 -right-1 w-12 h-12 rounded-full"
                      style={{ background: "rgba(34,197,94,0.12)", filter: "blur(12px)" }}
                    />
                  )}
                  <div className="flex items-start justify-between gap-1.5 mb-2 relative">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-[0.04em]"
                        style={{
                          background: `${meta.color}1a`,
                          borderColor: `${meta.color}33`,
                          color: meta.color,
                        }}
                      >
                        {meta.name}
                      </span>
                      <span
                        className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border"
                        style={{
                          background: diff.bg,
                          borderColor: `${diff.color}40`,
                          color: diff.color,
                        }}
                      >
                        {c.difficulty}
                      </span>
                    </div>
                    {c.solved ? (
                      <span
                        className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border"
                        style={{
                          background: "rgba(34,197,94,0.12)",
                          borderColor: "rgba(34,197,94,0.28)",
                          color: "var(--g)",
                        }}
                      >
                        ✓ 解答済
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] text-t3">
                        {c.solves} 解答
                      </span>
                    )}
                  </div>
                  <div className="text-[12.5px] font-semibold mb-1 relative">
                    {c.title}
                  </div>
                  <div className="text-[10.5px] text-t3 leading-snug mb-2 relative line-clamp-2">
                    {c.description}
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-bd font-mono text-[10px] relative">
                    <span className="text-brand-amber font-semibold">
                      +{c.points} pt
                    </span>
                    <span className="text-brand-green flex items-center gap-1">
                      {c.solved ? "再挑戦" : "挑戦"}{" "}
                      <IconArrowRight size={10} stroke={1.8} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </Panel>

        <div className="col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="リーダーボード"
            title="トップソルバー"
            icon={<IconTrophy size={13} stroke={1.8} />}
            iconBg="rgba(245,158,11,0.1)"
            iconColor="var(--a)"
            right={<LivePill size="sm" />}
          >
            <div className="space-y-1.5">
              {[
                ["1", "recon_master", "286 解", "🥇"],
                ["2", "0xDEADBEEF", "254 解", "🥈"],
                ["3", "shell_getter", "231 解", "🥉"],
                ["4", "cyber_ninja", "198 解", ""],
                ["5", "pwn_master", "187 解", ""],
              ].map(([rank, name, solves, em]) => (
                <div
                  key={rank}
                  className="flex items-center gap-2 p-1.5 bg-surf2 border border-bd rounded"
                >
                  <span className="font-mono text-[11px] font-bold w-3" style={{ color: parseInt(rank) <= 3 ? "var(--a)" : "var(--t3)" }}>
                    {rank}
                  </span>
                  {em && <span className="text-sm">{em}</span>}
                  <span className="flex-1 text-[11px] font-semibold font-mono">{name}</span>
                  <span className="font-mono text-[9.5px] text-t3">{solves}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="あなたへの推薦"
            title="次に挑戦すべき"
            icon="🎯"
            iconBg="rgba(0,212,255,0.1)"
          >
            <div
              className="p-2.5 rounded-lg border mb-2"
              style={{
                background: "rgba(43,127,255,0.05)",
                borderColor: "rgba(43,127,255,0.22)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span
                  className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    borderColor: "rgba(245,158,11,0.22)",
                    color: "var(--a)",
                  }}
                >
                  Medium
                </span>
                <span
                  className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(43,127,255,0.1)",
                    color: "#2B7FFF",
                  }}
                >
                  WEB
                </span>
                <span className="font-mono text-[9px] text-brand-amber ml-auto font-semibold">
                  +200 pt
                </span>
              </div>
              <div className="text-[12px] font-semibold mb-0.5">
                SQL インジェクション — 認証バイパス
              </div>
              <div className="font-mono text-[9.5px] text-t3">
                推定 18 分 · あなたのスキルに最適
              </div>
            </div>
          </Panel>

          <Panel
            eyebrow="ルール"
            title="提出ガイド"
            icon={<IconCalendarEvent size={13} stroke={1.8} />}
            iconBg="rgba(139,92,246,0.1)"
            iconColor="var(--p)"
          >
            <div className="space-y-1">
              {[
                "フラグ形式: RECON{...}",
                "提出回数制限なし",
                "ヒント使用で XP 減",
                "Writeup 投稿で +XP",
                "First Blood: +50% XP",
              ].map((tx) => (
                <div
                  key={tx}
                  className="flex items-start gap-1.5 text-[10.5px] text-t2 leading-snug"
                >
                  <span className="font-mono text-t3 mt-px">→</span>
                  {tx}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
