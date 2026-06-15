"use client";

import Link from "next/link";
import { IconUsersGroup, IconMessageCircle } from "@tabler/icons-react";

const POSTS = [
  {
    title: "XSS フィルタリング回避のコツ",
    author: "h4ck3r_x",
    replies: 23,
    tag: "Web",
    color: "#2B7FFF",
  },
  {
    title: "リバエンを独学で習得した話",
    author: "zer0day_jp",
    replies: 18,
    tag: "Reversing",
    color: "#8B5CF6",
  },
];

export function MobileCommunityCard() {
  return (
    <section className="px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[17px] font-bold flex items-center gap-2">
          <IconUsersGroup size={18} stroke={2} className="text-brand-cyan" />
          コミュニティ
        </h2>
        <Link
          href="/community"
          className="text-[13px] font-medium text-brand-purple no-underline"
        >
          フォーラム →
        </Link>
      </div>

      <div className="space-y-2">
        {POSTS.map((p) => (
          <Link
            key={p.title}
            href="/community"
            className="block rounded-2xl border p-4 no-underline"
            style={{
              background: "var(--surf)",
              borderColor: "var(--bd2)",
              minHeight: "48px",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{
                      background: `${p.color}1a`,
                      borderColor: `${p.color}40`,
                      color: p.color,
                    }}
                  >
                    {p.tag}
                  </span>
                  <span className="font-mono text-[12px] text-t3">
                    @{p.author}
                  </span>
                </div>
                <div className="text-[15px] font-bold leading-snug">
                  {p.title}
                </div>
              </div>
              <div className="flex items-center gap-1 text-t3 flex-shrink-0">
                <IconMessageCircle size={14} stroke={1.8} />
                <span className="font-mono text-[12px]">{p.replies}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
