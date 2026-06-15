"use client";

import Link from "next/link";
import { IconPlayerPlay, IconChevronRight } from "@tabler/icons-react";

const CONTINUE = [
  {
    title: "SQL インジェクション基礎",
    category: "Web Security",
    progress: 60,
    color: "#22C55E",
    nextStep: "次: UNION 攻撃の演習",
  },
  {
    title: "Linux 権限昇格",
    category: "Privilege Escalation",
    progress: 40,
    color: "#2B7FFF",
    nextStep: "次: SUID バイナリ探索",
  },
  {
    title: "Wireshark 101",
    category: "ネットワーク解析",
    progress: 80,
    color: "#F59E0B",
    nextStep: "次: TLS 復号ハンズオン",
  },
];

export function MobileContinueList() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[17px] font-bold">続きから学習</h2>
        <Link
          href="/learn"
          className="text-[13px] font-medium text-brand-purple no-underline"
        >
          すべて見る →
        </Link>
      </div>

      <div className="space-y-3 px-4">
        {CONTINUE.map((c) => (
          <Link
            key={c.title}
            href="/learn"
            className="block rounded-2xl border p-4 no-underline transition-transform active:scale-[0.98]"
            style={{
              background: "var(--surf)",
              borderColor: "var(--bd2)",
              minHeight: "48px",
            }}
          >
            {/* ヘッダ */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 mr-3">
                <div
                  className="font-mono text-[11px] uppercase tracking-wider mb-1"
                  style={{ color: c.color }}
                >
                  {c.category}
                </div>
                <h3 className="text-[16px] font-bold leading-tight">
                  {c.title}
                </h3>
              </div>
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  background: `${c.color}20`,
                  border: `2px solid ${c.color}40`,
                }}
              >
                <IconPlayerPlay
                  size={18}
                  stroke={2.5}
                  style={{ color: c.color, marginLeft: "2px" }}
                />
              </div>
            </div>

            {/* 進捗バー(大型) */}
            <div className="mb-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] text-t2">{c.nextStep}</span>
                <span
                  className="font-mono text-[14px] font-bold"
                  style={{ color: c.color }}
                >
                  {c.progress}%
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: "var(--surf3)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${c.progress}%`,
                    background: c.color,
                    boxShadow: `0 0 8px ${c.color}66`,
                  }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
