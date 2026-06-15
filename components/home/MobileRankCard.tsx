"use client";

import Link from "next/link";
import { IconTrophy, IconChevronRight } from "@tabler/icons-react";

const TOP3 = [
  { rank: 1, name: "recon_master", xp: 89240, color: "#FFD700", medal: "🥇" },
  { rank: 2, name: "h4ck3r_x", xp: 76120, color: "#C0C0C0", medal: "🥈" },
  { rank: 3, name: "zer0day_jp", xp: 64850, color: "#CD7F32", medal: "🥉" },
];

const MY_RANK = { rank: 248, name: "0xFreedom", xp: 12540, diff: -2 };

export function MobileRankCard() {
  return (
    <section className="px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[17px] font-bold flex items-center gap-2">
          <IconTrophy size={18} stroke={2} className="text-brand-amber" />
          ランキング
        </h2>
        <Link
          href="/leaderboard"
          className="text-[13px] font-medium text-brand-purple no-underline"
        >
          全順位 →
        </Link>
      </div>

      {/* Top 3 横並び */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {TOP3.map((u) => (
          <div
            key={u.rank}
            className="rounded-2xl p-3 border text-center"
            style={{
              background: `linear-gradient(180deg, ${u.color}1a, ${u.color}05 60%, var(--surf))`,
              borderColor: `${u.color}55`,
            }}
          >
            <div className="text-[28px] leading-none mb-1.5">{u.medal}</div>
            <div className="text-[12px] font-bold truncate mb-0.5">
              {u.name}
            </div>
            <div
              className="font-mono text-[12px] font-bold"
              style={{ color: u.color }}
            >
              {(u.xp / 1000).toFixed(1)}k
            </div>
          </div>
        ))}
      </div>

      {/* 自分の順位 */}
      <Link
        href="/leaderboard"
        className="block rounded-2xl border-2 p-4 no-underline relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(34,197,94,0.06) 60%, var(--surf))",
          borderColor: "rgba(168,85,247,0.4)",
          minHeight: "72px",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-[13px] font-bold text-white flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #A855F7, #22C55E)",
            }}
          >
            #{MY_RANK.rank}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] text-t3 mb-0.5">あなたの順位</div>
            <div className="text-[16px] font-bold truncate">
              {MY_RANK.name}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[13px] font-bold text-brand-purple">
                {MY_RANK.xp.toLocaleString()} XP
              </span>
              <span className="font-mono text-[12px] text-brand-green">
                {MY_RANK.diff < 0 ? `↑ ${Math.abs(MY_RANK.diff)} 位` : `↓ ${MY_RANK.diff} 位`}
              </span>
            </div>
          </div>
          <IconChevronRight size={20} className="text-t3 flex-shrink-0" />
        </div>
      </Link>
    </section>
  );
}
