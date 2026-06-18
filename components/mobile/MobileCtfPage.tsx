"use client";

import Link from "next/link";
import { MOCK_CTFS } from "@/lib/mock-data";
import {
  IconBolt,
  IconUsers,
  IconCircleCheck,
  IconSearch,
} from "@tabler/icons-react";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#22C55E",
  Medium: "#F59E0B",
  Hard: "#EF4444",
};

const CAT_META: Record<string, { color: string; icon: string; label: string }> = {
  web: { color: "#2B7FFF", icon: "🌐", label: "WEB" },
  crypto: { color: "#8B5CF6", icon: "🔐", label: "CRYPTO" },
  forensic: { color: "#F59E0B", icon: "🔍", label: "FORENSIC" },
  pwn: { color: "#EF4444", icon: "💥", label: "PWN" },
  osint: { color: "#22C55E", icon: "👁", label: "OSINT" },
  misc: { color: "#06B6D4", icon: "🎲", label: "MISC" },
};

const FILTERS = [
  { label: "全て", count: 12 },
  { label: "Web", count: 4 },
  { label: "Crypto", count: 2 },
  { label: "Forensic", count: 2 },
  { label: "Pwn", count: 2 },
  { label: "未解答", count: 7 },
];

export function MobileCtfPage() {
  const userSolves = MOCK_CTFS.filter((c) => c.solved).length;
  const totalChallenges = MOCK_CTFS.length;
  const userScore = MOCK_CTFS.filter((c) => c.solved).reduce(
    (s, c) => s + c.points,
    0
  );

  return (
    <div className="lg:hidden flex flex-col gap-6 pb-8">
      {/* ── HERO: イベント告知 ── */}
      <section className="px-4 pt-4">
        <div
          className="rounded-2xl border p-5 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(34,197,94,0.06) 60%, var(--surf))",
            borderColor: "rgba(168,85,247,0.4)",
          }}
        >
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)",
              filter: "blur(24px)",
            }}
          />
          <div className="relative">
            <div
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border mb-2"
              style={{ background: "rgba(168,85,247,0.15)", borderColor: "rgba(168,85,247,0.4)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse-soft" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-purple">
                UPCOMING EVENT
              </span>
            </div>
            <div className="font-mono text-[11px] text-t3 mb-1.5">
              EVT-001 · OPEN-RECON-2026
            </div>
            <h2 className="text-[20px] font-bold leading-tight mb-2 break-words">
              プラットフォーム公式オープン CTF
            </h2>
            <p className="text-[13px] text-t2 leading-relaxed mb-4 break-words">
              Web · Crypto · Forensic · Pwn · OSINT · Misc の各カテゴリを揃え、24時間のオンライン競技形式で開催。
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="rounded-lg p-2.5 text-center" style={{ background: "var(--surf2)" }}>
                <div className="font-mono text-[10px] text-t3 mb-0.5">開始</div>
                <div className="font-mono text-[12px] font-bold">6/22</div>
                <div className="font-mono text-[10px] text-t3">21:00 JST</div>
              </div>
              <div className="rounded-lg p-2.5 text-center" style={{ background: "var(--surf2)" }}>
                <div className="font-mono text-[10px] text-t3 mb-0.5">参加</div>
                <div className="font-mono text-[14px] font-bold text-brand-cyan">142</div>
                <div className="font-mono text-[10px] text-t3">人/同時</div>
              </div>
              <div className="rounded-lg p-2.5 text-center" style={{ background: "var(--surf2)" }}>
                <div className="font-mono text-[10px] text-t3 mb-0.5">総得点</div>
                <div className="font-mono text-[14px] font-bold text-brand-amber">2,300</div>
                <div className="font-mono text-[10px] text-t3">pt</div>
              </div>
            </div>
            <button
              className="w-full rounded-xl font-bold text-[14px] text-white"
              style={{
                minHeight: "48px",
                background: "linear-gradient(135deg, #A855F7, #7C3AED)",
                boxShadow: "0 6px 16px rgba(168,85,247,0.4)",
              }}
            >
              参加登録(無料)
            </button>
          </div>
        </div>
      </section>

      {/* ── ユーザー進捗バー ── */}
      <section className="px-4">
        <div
          className="rounded-xl border p-4 flex items-center gap-3 min-w-0"
          style={{ background: "var(--surf)", borderColor: "var(--bd2)" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2"
            style={{ background: "rgba(34,197,94,0.1)", borderColor: "rgba(34,197,94,0.3)" }}
          >
            <IconCircleCheck size={22} stroke={2} className="text-brand-green" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] text-t3 mb-0.5">あなたの解答状況</div>
            <div className="text-[16px] font-bold">
              <span className="text-brand-green">{userSolves}</span>
              <span className="text-t3"> / {totalChallenges} 問</span>
              <span className="text-t3"> · </span>
              <span className="font-mono text-brand-amber">{userScore} pt</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 検索 ── */}
      <section className="px-4">
        <button
          className="w-full flex items-center gap-2 px-3.5 rounded-lg border text-[14px] text-t3"
          style={{ minHeight: "44px", background: "var(--surf2)", borderColor: "var(--bd)" }}
        >
          <IconSearch size={15} stroke={1.6} />
          <span>チャレンジを検索</span>
        </button>
      </section>

      {/* ── フィルタチップ ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-4 no-scrollbar">
        {FILTERS.map((f, i) => (
          <button
            key={f.label}
            className="flex-shrink-0 px-3 py-1.5 rounded-full font-medium text-[12px] border whitespace-nowrap"
            style={
              i === 0
                ? { background: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.3)", color: "var(--p)" }
                : { background: "var(--surf)", borderColor: "var(--bd)", color: "var(--t3)" }
            }
          >
            {f.label} <span className="font-mono text-[10px] ml-0.5">{f.count}</span>
          </button>
        ))}
      </div>

      {/* ── チャレンジリスト ── */}
      <section className="px-4">
        <h3 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-3">
          ◆ Challenges
        </h3>
        <div className="space-y-2.5">
          {MOCK_CTFS.map((c) => {
            const cat = CAT_META[c.category];
            const dColor = DIFFICULTY_COLOR[c.difficulty] ?? "#22C55E";
            const solved = c.solved;
            return (
              <Link
                key={c.id}
                href={`/ctf/${c.id}`}
                className="block rounded-xl border p-4 no-underline transition-transform active:scale-[0.99]"
                style={{
                  background: solved
                    ? "linear-gradient(135deg, rgba(34,197,94,0.05), var(--surf))"
                    : "var(--surf)",
                  borderColor: solved ? "rgba(34,197,94,0.3)" : "var(--bd2)",
                  minHeight: "48px",
                }}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] flex-shrink-0 border"
                    style={{ background: `${cat.color}1a`, borderColor: `${cat.color}40` }}
                  >
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap min-w-0">
                      <span
                        className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                        style={{ background: `${cat.color}1a`, color: cat.color }}
                      >
                        {cat.label}
                      </span>
                      <span
                        className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: `${dColor}1a`, color: dColor }}
                      >
                        {c.difficulty}
                      </span>
                      {solved && (
                        <span
                          className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(34,197,94,0.15)", color: "var(--g)" }}
                        >
                          ✓ 解答済
                        </span>
                      )}
                    </div>
                    <div className="text-[14.5px] font-bold leading-tight mb-1.5 break-words">
                      {c.title}
                    </div>
                    <p className="text-[12.5px] text-t2 leading-relaxed mb-2 line-clamp-2 break-words">
                      {c.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-t3 flex-wrap min-w-0">
                      <span className="flex items-center gap-1">
                        <IconUsers size={11} stroke={1.8} />
                        {c.solves}
                      </span>
                      <span className="font-bold flex items-center gap-1" style={{ color: dColor }}>
                        <IconBolt size={11} stroke={1.8} />+{c.points} pt
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
