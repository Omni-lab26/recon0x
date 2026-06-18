"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconBolt,
  IconUsers,
  IconClock,
  IconBookmark,
  IconDownload,
  IconFlag,
  IconCircleCheck,
} from "@tabler/icons-react";

interface Props {
  id: string;
  title?: string;
  category?: string;
  difficulty?: string;
  points?: number;
  solves?: number;
  description?: string;
  color?: string;
}

const FILES = [
  { name: "vulnerable.c", size: "2.1 KB", type: "source" },
  { name: "vulnerable", size: "16.8 KB", type: "ELF binary" },
  { name: "Dockerfile", size: "412 B", type: "container" },
  { name: "README.md", size: "1.4 KB", type: "instructions" },
];

const HINTS = [
  { id: 1, cost: 50, locked: false, text: "やんわりとした方向性" },
  { id: 2, cost: 100, locked: true, text: "" },
  { id: 3, cost: 200, locked: true, text: "" },
];

const HISTORY = [
  { who: "公開", time: "5/12 21:00", color: "var(--t3)" },
  { who: "First Blood", time: "recon_master · 8m 32s", color: "var(--a)" },
  { who: "100 ソルブ到達", time: "5/15 14:23", color: "var(--g)" },
];

export function MobileCtfDetail({
  id,
  title = "Buffer Overflow 101",
  category = "Pwn",
  difficulty = "Medium",
  points = 250,
  solves = 67,
  description = "スタックバッファオーバーフローの基本。win() 関数にジャンプしてフラグを取得せよ。",
  color = "#EF4444",
}: Props) {
  const diffColor =
    difficulty === "Easy"
      ? "#22C55E"
      : difficulty === "Medium"
      ? "#F59E0B"
      : difficulty === "Hard"
      ? "#EF4444"
      : "#EC4899";

  return (
    <div className="lg:hidden flex flex-col gap-5 pb-6">
      {/* 戻る */}
      <div className="px-4 pt-3">
        <Link
          href="/ctf"
          className="inline-flex items-center gap-1.5 text-[13px] text-t2 no-underline"
        >
          <IconArrowLeft size={14} stroke={1.8} />
          チャレンジ一覧
        </Link>
      </div>

      {/* HERO */}
      <section className="px-4">
        <div className="flex items-center gap-2 mb-3 flex-wrap min-w-0">
          <span
            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
            style={{ background: `${color}1a`, color: color }}
          >
            {category}
          </span>
          <span
            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
            style={{ background: `${diffColor}1a`, color: diffColor }}
          >
            {difficulty}
          </span>
          <span
            className="font-mono text-[11px] font-bold text-brand-amber ml-auto flex items-center gap-1"
          >
            <IconBolt size={12} stroke={2} />
            +{points} XP
          </span>
        </div>
        <h1 className="text-[24px] font-bold leading-tight mb-3 break-words">
          {title}
        </h1>
        <p className="text-[14px] text-t2 leading-relaxed mb-4 break-words">
          {description}
        </p>

        {/* メタ行 */}
        <div className="flex items-center gap-4 text-[12px] font-mono text-t3 flex-wrap min-w-0">
          <span className="flex items-center gap-1">
            <IconUsers size={12} stroke={1.8} />
            {solves} ソルブ
          </span>
          <span className="flex items-center gap-1">
            <IconClock size={12} stroke={1.8} />
            平均 42 分
          </span>
          <span className="text-brand-green flex items-center gap-1">
            <IconCircleCheck size={12} stroke={1.8} />
            正答率 47%
          </span>
        </div>
      </section>

      {/* 想定環境 */}
      <section className="px-4">
        <div
          className="rounded-xl border grid grid-cols-3 divide-x"
          style={{ background: "var(--surf)", borderColor: "var(--bd2)" }}
        >
          {[
            { label: "必要スキル", value: "Pwn", color: color },
            { label: "推奨ツール", value: "GDB", color: "var(--c)" },
            { label: "アーキ", value: "x86_64", color: "var(--p)" },
          ].map((s) => (
            <div
              key={s.label}
              className="px-3 py-3 text-center min-w-0"
              style={{ borderColor: "var(--bd)" }}
            >
              <div className="font-mono text-[10px] text-t3 mb-1 uppercase tracking-wider">
                {s.label}
              </div>
              <div
                className="font-mono text-[14px] font-bold break-words"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 接続情報 */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-2">
          ◆ 接続情報
        </h2>
        <div
          className="rounded-xl border p-3 font-mono text-[12px] flex items-center justify-between gap-2 min-w-0"
          style={{
            background: "var(--terminal-bg)",
            borderColor: "var(--bd2)",
            color: "#22C55E",
          }}
        >
          <code className="break-all min-w-0 flex-1">nc challenge.recon0x.dev 31337</code>
          <button
            className="font-mono text-[10px] px-2 py-1 rounded flex-shrink-0"
            style={{
              background: "rgba(34,197,94,0.15)",
              color: "#22C55E",
              border: "1px solid rgba(34,197,94,0.3)",
            }}
          >
            COPY
          </button>
        </div>
      </section>

      {/* 配布ファイル */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-2">
          ◆ 配布ファイル
        </h2>
        <ul
          className="rounded-xl border divide-y"
          style={{ background: "var(--surf)", borderColor: "var(--bd2)" }}
        >
          {FILES.map((f) => (
            <li
              key={f.name}
              className="flex items-center gap-3 px-3.5 py-3 min-w-0"
              style={{ borderColor: "var(--bd)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--surf2)" }}
              >
                <IconDownload size={15} stroke={1.8} className="text-t2" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-mono font-semibold truncate">
                  {f.name}
                </div>
                <div className="text-[11px] text-t3 font-mono truncate">
                  {f.size} · {f.type}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ヒント */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-2">
          ◆ ヒント(3 段階)
        </h2>
        <div className="space-y-2">
          {HINTS.map((h) => (
            <div
              key={h.id}
              className="rounded-xl border p-3 flex items-center gap-3 min-w-0"
              style={{
                background: h.locked ? "var(--surf2)" : "var(--surf)",
                borderColor: "var(--bd2)",
                opacity: h.locked ? 0.65 : 1,
              }}
            >
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center font-mono text-[12px] font-bold flex-shrink-0"
                style={{
                  background: "var(--surf3)",
                  color: "var(--t2)",
                }}
              >
                {h.id}
              </div>
              <div className="flex-1 min-w-0">
                {h.locked ? (
                  <div className="text-[13px] text-t3">解放すると -{h.cost} XP</div>
                ) : (
                  <div className="text-[13px] text-t2 break-words">{h.text}</div>
                )}
              </div>
              {h.locked && (
                <button
                  className="font-mono text-[11px] font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{
                    background: "rgba(245,158,11,0.15)",
                    color: "var(--a)",
                    border: "1px solid rgba(245,158,11,0.3)",
                  }}
                >
                  -{h.cost} XP
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 履歴 */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-2">
          ◆ チャレンジ履歴
        </h2>
        <ul
          className="rounded-xl border divide-y"
          style={{ background: "var(--surf)", borderColor: "var(--bd2)" }}
        >
          {HISTORY.map((h, i) => (
            <li
              key={i}
              className="flex items-center gap-3 px-3.5 py-2.5 min-w-0"
              style={{ borderColor: "var(--bd)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: h.color }}
              />
              <span
                className="text-[13px] font-medium flex-shrink-0"
                style={{ color: h.color }}
              >
                {h.who}
              </span>
              <span className="text-[12px] text-t3 font-mono ml-auto truncate">
                {h.time}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* フラグ提出 — sticky 下部 */}
      <section className="px-4 mt-2">
        <div
          className="rounded-2xl border-2 p-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.02))",
            borderColor: "rgba(34,197,94,0.4)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <IconFlag size={16} stroke={2} className="text-brand-green" />
            <span className="text-[14px] font-bold">フラグ提出</span>
          </div>
          <div className="flex items-stretch gap-2 mb-2">
            <input
              type="text"
              placeholder="RECON{...}"
              className="flex-1 rounded-lg px-3 font-mono text-[14px] border min-w-0"
              style={{
                background: "var(--surf2)",
                borderColor: "var(--bd2)",
                color: "var(--t1)",
                minHeight: "48px",
              }}
            />
            <button
              className="rounded-lg px-4 font-bold text-[14px] text-white flex-shrink-0"
              style={{
                minHeight: "48px",
                background: "linear-gradient(135deg, #22C55E, #16A34A)",
                boxShadow: "0 4px 12px rgba(34,197,94,0.35)",
              }}
            >
              提出
            </button>
          </div>
          <div className="font-mono text-[10.5px] text-t3">
            フォーマット: <code className="text-t2">RECON{`{...}`}</code> · 正解で +{points} XP
          </div>
        </div>
      </section>
    </div>
  );
}
