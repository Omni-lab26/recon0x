"use client";

import Link from "next/link";
import { IconTool, IconChevronRight } from "@tabler/icons-react";

const TOOLKIT = [
  {
    name: "Kali Linux",
    role: "OS",
    why: "ペンテスト業界標準",
    price: "無料",
    color: "#557C94",
    emoji: "🐉",
    free: true,
  },
  {
    name: "Hack The Box",
    role: "実践演習",
    why: "実機ペンテスト",
    price: "$15 / 月",
    color: "#9FEF00",
    emoji: "📦",
    free: false,
  },
  {
    name: "1Password",
    role: "認証情報管理",
    why: "プロが使う標準ツール",
    price: "$2.99 / 月",
    color: "#0094F5",
    emoji: "🔑",
    free: false,
  },
];

export function MobileProfessionalToolkit() {
  return (
    <section className="px-5">
      <div className="mb-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 flex items-center gap-2 mb-1">
          <IconTool size={14} stroke={2} />
          Professional Toolkit
        </h2>
        <p className="text-[13px] text-t3">
          現役のセキュリティエンジニアが使う、業界標準セットアップ
        </p>
      </div>

      <div className="space-y-2.5">
        {TOOLKIT.map((t) => (
          <Link
            key={t.name}
            href="/tools"
            className="block rounded-2xl border p-4 no-underline transition-transform active:scale-[0.99]"
            style={{
              background: "var(--surf)",
              borderColor: "var(--bd2)",
              minHeight: "48px",
            }}
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[24px] flex-shrink-0 border"
                style={{
                  background: `${t.color}15`,
                  borderColor: `${t.color}30`,
                }}
              >
                {t.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[15px] font-bold">{t.name}</span>
                  <span
                    className="font-mono text-[9.5px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                    style={{
                      background: `${t.color}1a`,
                      color: t.color,
                    }}
                  >
                    {t.role}
                  </span>
                </div>
                <div className="text-[12.5px] text-t3 font-medium">{t.why}</div>
              </div>

              <div className="text-right flex-shrink-0">
                <div
                  className="font-mono text-[13px] font-bold mb-0.5"
                  style={{ color: t.free ? "#22C55E" : "var(--t2)" }}
                >
                  {t.price}
                </div>
                <IconChevronRight size={14} stroke={1.8} className="text-t3 ml-auto" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-[11px] text-t4 mt-4 leading-relaxed text-center">
        ※ 一部リンクにはアフィリエイトプログラムが含まれます。
        <br />
        recon0x がおすすめするのは私たち自身が使うツールだけです。
      </p>
    </section>
  );
}
