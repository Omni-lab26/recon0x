"use client";

import Link from "next/link";
import { FIELDS, RANKS } from "@/lib/tokens";
import {
  IconRoute,
  IconCircleCheck,
  IconCircle,
  IconBook,
  IconClock,
  IconPlayerPlay,
  IconLock,
  IconChevronRight,
} from "@tabler/icons-react";

// 各分野のレベル毎ステップ
const PATH_STEPS: { level: string; title: string; locked?: boolean; current?: boolean; done?: boolean }[][] = [
  [
    { level: "L1", title: "ターミナル入門", done: true },
    { level: "L2", title: "ファイル操作 / パイプ", done: true },
    { level: "L3", title: "権限とユーザー管理", current: true },
    { level: "L4", title: "プロセスとサービス", locked: true },
    { level: "L5", title: "カーネル / システムコール", locked: true },
  ],
];

const STATS = {
  totalFields: 7,
  totalSteps: 35,
  progress: 22,
  level: 24,
  rankName: "ハンター",
  estHours: 120,
};

export function MobileLearnPage() {
  return (
    <div className="lg:hidden flex flex-col gap-6 pb-8">
      {/* ── HERO ── */}
      <section className="px-4 pt-4">
        <div className="eyebrow mb-1">LEARNING PATHS · MISSION CONTROL</div>
        <h1 className="text-[22px] font-bold tracking-[-0.02em] leading-tight mb-2 break-words">
          7 つの専門分野。<br />
          35 ステップで実戦力へ。
        </h1>
        <p className="text-[14px] text-t2 leading-relaxed break-words">
          recon0x の学習パスは Hack The Box Academy / OffSec / SANS
          の研修体系を元に設計。L1 入門から L5 到達点まで段階的に実戦スキルを習得します。
        </p>
      </section>

      {/* ── ステータスストリップ ── */}
      <section className="px-4">
        <div
          className="rounded-xl border grid grid-cols-3 divide-x"
          style={{
            background: "var(--surf)",
            borderColor: "var(--bd2)",
          }}
        >
          {[
            { label: "分野", value: STATS.totalFields, color: "var(--c)" },
            { label: "ステップ", value: STATS.totalSteps, color: "var(--p)" },
            { label: "達成率", value: `${STATS.progress}%`, color: "var(--g)" },
          ].map((s) => (
            <div key={s.label} className="px-3 py-3 text-center min-w-0" style={{ borderColor: "var(--bd)" }}>
              <div className="font-mono text-[10px] text-t3 mb-0.5 uppercase tracking-wider">
                {s.label}
              </div>
              <div
                className="font-mono text-[18px] font-bold leading-none"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 今すぐ始めるステップ(主役 CTA) ── */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-3">
          ◆ 今すぐ始めるステップ
        </h2>
        <Link
          href="/learn"
          className="block rounded-2xl border-2 p-5 no-underline relative overflow-hidden active:scale-[0.99] transition-transform"
          style={{
            background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.03) 60%, var(--surf))",
            borderColor: "rgba(34,197,94,0.4)",
            boxShadow: "0 8px 24px rgba(34,197,94,0.15)",
          }}
        >
          <div
            className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(34,197,94,0.3), transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                style={{ background: "rgba(34,197,94,0.15)", color: "var(--g)" }}
              >
                L1 · LINUX
              </span>
              <span
                className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: "rgba(34,197,94,0.15)", color: "var(--g)" }}
              >
                Easy
              </span>
            </div>
            <h3 className="text-[18px] font-bold leading-tight mb-2">
              ターミナル入門
            </h3>
            <p className="text-[13px] text-t2 leading-relaxed mb-4 break-words">
              シェル / ファイル操作 / パイプ / 環境変数
            </p>
            <div className="flex items-center gap-4 mb-4 text-[12px] font-mono text-t3">
              <span className="flex items-center gap-1">
                <IconClock size={12} stroke={1.8} />
                推定 45 分
              </span>
              <span className="font-bold text-brand-green">+200 XP</span>
            </div>
            <div
              className="flex items-center justify-between rounded-xl px-5"
              style={{
                minHeight: "48px",
                background: "linear-gradient(135deg, #22C55E, #16A34A)",
                boxShadow: "0 4px 12px rgba(34,197,94,0.4)",
              }}
            >
              <span className="text-[15px] font-bold text-white">開始する</span>
              <IconPlayerPlay size={18} stroke={2.5} className="text-white" />
            </div>
          </div>
        </Link>
      </section>

      {/* ── 7 つの専門分野 ── */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-3">
          ◆ 7 つの専門エリア
        </h2>
        <div className="space-y-2">
          {FIELDS.map((f) => (
            <Link
              key={f.key}
              href="/learn"
              className="flex items-center gap-3 rounded-xl border p-3.5 no-underline active:scale-[0.99] transition-transform min-w-0"
              style={{
                background: "var(--surf)",
                borderColor: "var(--bd2)",
                minHeight: "60px",
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center text-[18px] font-mono font-bold flex-shrink-0 border"
                style={{
                  background: `${f.c}1a`,
                  borderColor: `${f.c}40`,
                  color: f.c,
                }}
              >
                {f.glyph}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-bold leading-tight mb-0.5 break-words">
                  {f.name}
                </div>
                <div className="text-[12px] text-t3 break-words line-clamp-1">
                  {f.desc}
                </div>
                {/* 進捗バー */}
                <div className="mt-1.5 flex items-center gap-2">
                  <div
                    className="flex-1 h-1 rounded-full overflow-hidden"
                    style={{ background: "var(--surf3)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${30 + (FIELDS.indexOf(f) % 4) * 15}%`,
                        background: f.c,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-t3 flex-shrink-0">
                    L1〜L5
                  </span>
                </div>
              </div>
              <IconChevronRight
                size={18}
                stroke={1.8}
                className="text-t3 flex-shrink-0"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── 選択中分野のロードマップ(ステップ表示) ── */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3">
            ◆ Linux 基礎 ロードマップ
          </h2>
          <span className="font-mono text-[11px] text-brand-green font-bold">
            2/5 完了
          </span>
        </div>
        <ol className="relative space-y-3 pl-7">
          {/* 縦の進捗ライン */}
          <div
            className="absolute left-3 top-2 bottom-2 w-px"
            style={{ background: "var(--bd2)" }}
          />
          {PATH_STEPS[0].map((s, i) => (
            <li key={i} className="relative">
              {/* ドット */}
              <div
                className="absolute -left-[26px] top-[14px] w-3 h-3 rounded-full flex items-center justify-center"
                style={{
                  background: s.done
                    ? "var(--g)"
                    : s.current
                    ? "var(--p)"
                    : "var(--surf3)",
                  border: "2px solid var(--bg)",
                  boxShadow: s.current ? "0 0 0 3px rgba(168,85,247,0.25)" : undefined,
                }}
              >
                {s.done && (
                  <IconCircleCheck size={10} stroke={3} className="text-white" />
                )}
              </div>
              <div
                className="rounded-xl border p-3.5 min-w-0"
                style={{
                  background: s.current
                    ? "linear-gradient(135deg, rgba(168,85,247,0.08), var(--surf))"
                    : "var(--surf)",
                  borderColor: s.current
                    ? "rgba(168,85,247,0.4)"
                    : "var(--bd2)",
                  opacity: s.locked ? 0.55 : 1,
                  minHeight: "48px",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: s.done
                        ? "rgba(34,197,94,0.15)"
                        : s.current
                        ? "rgba(168,85,247,0.15)"
                        : "var(--surf2)",
                      color: s.done
                        ? "var(--g)"
                        : s.current
                        ? "var(--p)"
                        : "var(--t3)",
                    }}
                  >
                    {s.level}
                  </span>
                  {s.current && (
                    <span className="font-mono text-[10px] font-bold text-brand-purple">
                      ▸ 学習中
                    </span>
                  )}
                  {s.locked && (
                    <IconLock size={11} stroke={1.8} className="text-t3 ml-auto" />
                  )}
                </div>
                <div className="text-[14px] font-bold leading-tight break-words">
                  {s.title}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── スキル分布(コンパクト) ── */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-3">
          ◆ あなたのスキル分布
        </h2>
        <div
          className="rounded-xl border p-4"
          style={{ background: "var(--surf)", borderColor: "var(--bd2)" }}
        >
          <div className="space-y-2.5">
            {FIELDS.map((f, i) => {
              const pct = [40, 25, 60, 15, 5, 30, 20][i] ?? 10;
              return (
                <div key={f.key} className="flex items-center gap-3 min-w-0">
                  <span
                    className="font-mono text-[11px] font-bold w-16 flex-shrink-0 truncate"
                    style={{ color: f.c }}
                  >
                    {f.name.split(" ")[0]}
                  </span>
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
                    style={{ background: "var(--surf3)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: f.c,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-t3 w-9 text-right flex-shrink-0">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
