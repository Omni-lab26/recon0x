"use client";

import Link from "next/link";
import { IconUsersGroup, IconMessageCircle, IconArrowRight } from "@tabler/icons-react";

const ACTIVITY = {
  topPost: {
    title: "XSS フィルタリング回避のコツ",
    author: "h4ck3r_x",
    avatar: "h4",
    replies: 23,
    minutesAgo: 12,
    tag: "Web",
    tagColor: "#2B7FFF",
  },
  liveCount: 234,
};

export function MobileCommunityActivity() {
  return (
    <section className="px-5">
      <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-4">
        ◆ Community Activity
      </h2>

      <Link
        href="/community"
        className="block rounded-3xl border no-underline overflow-hidden active:scale-[0.99] transition-transform"
        style={{
          background: "var(--surf)",
          borderColor: "var(--bd2)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{ borderColor: "var(--bd)", background: "var(--surf2)" }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ background: "#22C55E" }}
              />
              <span
                className="relative inline-flex w-2 h-2 rounded-full"
                style={{ background: "#22C55E" }}
              />
            </span>
            <span className="text-[13px] text-t1 font-medium">
              <span className="font-mono font-bold text-brand-green">
                {ACTIVITY.liveCount}
              </span>
              <span className="text-t2"> 人がオンライン</span>
            </span>
          </div>
          <IconUsersGroup size={16} stroke={1.8} className="text-t3" />
        </div>

        <div className="p-5">
          <div className="eyebrow mb-3 text-brand-cyan">🔥 注目の投稿</div>
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-mono text-[12px] font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #2B7FFF, #1E40AF)" }}
            >
              {ACTIVITY.topPost.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="font-mono text-[10.5px] font-semibold px-1.5 py-0.5 rounded border"
                  style={{
                    background: `${ACTIVITY.topPost.tagColor}1a`,
                    borderColor: `${ACTIVITY.topPost.tagColor}40`,
                    color: ACTIVITY.topPost.tagColor,
                  }}
                >
                  {ACTIVITY.topPost.tag}
                </span>
                <span className="font-mono text-[12px] text-t3">
                  @{ACTIVITY.topPost.author} · {ACTIVITY.topPost.minutesAgo}分前
                </span>
              </div>
              <div className="text-[16px] font-bold leading-snug mb-2">
                {ACTIVITY.topPost.title}
              </div>
              <div className="flex items-center gap-1.5 text-t3">
                <IconMessageCircle size={14} stroke={1.8} />
                <span className="font-mono text-[12px]">
                  {ACTIVITY.topPost.replies} 件の返信
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-between rounded-xl px-4"
            style={{
              minHeight: "48px",
              background: "var(--surf2)",
              border: "1px solid var(--bd2)",
            }}
          >
            <span className="text-[14px] font-medium text-t1">フォーラムを開く</span>
            <IconArrowRight size={16} stroke={2} className="text-t3" />
          </div>
        </div>
      </Link>
    </section>
  );
}
