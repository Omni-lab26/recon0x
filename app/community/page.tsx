import Link from "next/link";
import { MOCK_POSTS } from "@/lib/mock-data";
import {
  IconArrowBigUp,
  IconMessageCircle,
  IconSearch,
  IconPencilPlus,
} from "@tabler/icons-react";

const CATEGORIES = [
  { label: "全て", count: 6, active: true },
  { label: "Web セキュリティ", count: 2 },
  { label: "CTF ヘルプ", count: 1 },
  { label: "バグバウンティ", count: 1 },
  { label: "ツール", count: 1 },
];

export default function CommunityPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <header className="mb-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="eyebrow mb-1">COMMUNITY FORUM</div>
          <h1 className="text-[22px] sm:text-[28px] font-bold tracking-[-0.02em] mb-2">フォーラム</h1>
          <div className="text-[13px] text-t3 font-mono">
            <span className="text-brand-green">●</span> 234 人オンライン · 1,247 投稿
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 sm:px-4 rounded-lg font-semibold text-[13px] text-white flex-shrink-0"
          style={{
            minHeight: "44px",
            background: "linear-gradient(135deg, #A855F7, #7C3AED)",
            boxShadow: "0 4px 12px rgba(168,85,247,0.3)",
          }}
        >
          <IconPencilPlus size={16} stroke={2} />
          <span className="hidden sm:inline">投稿</span>
        </button>
      </header>

      <button
        className="w-full flex items-center gap-2 px-3.5 mb-4 rounded-lg border text-[14px] text-t3 hover:text-t2 transition"
        style={{ minHeight: "44px", background: "var(--surf2)", borderColor: "var(--bd)" }}
      >
        <IconSearch size={15} stroke={1.6} />
        <span>投稿を検索</span>
      </button>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.label}
            className="flex-shrink-0 px-3 py-1.5 rounded-full font-medium text-[12px] border"
            style={
              c.active
                ? { background: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.3)", color: "var(--p)" }
                : { background: "var(--surf)", borderColor: "var(--bd)", color: "var(--t3)" }
            }
          >
            {c.label} {c.count}
          </button>
        ))}
      </div>

      {/* Sort tab */}
      <div className="flex items-center gap-3 py-2 mb-2 border-b text-[13px] font-mono" style={{ borderColor: "var(--bd)" }}>
        {["新着", "人気", "ベスト", "未読"].map((s, i) => (
          <button
            key={s}
            className="py-1 transition-colors"
            style={{
              color: i === 0 ? "var(--p)" : "var(--t3)",
              fontWeight: i === 0 ? 600 : 400,
              borderBottom: i === 0 ? "2px solid var(--p)" : "2px solid transparent",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Reddit-style posts */}
      <ul className="divide-y" style={{ borderColor: "var(--bd)" }}>
        {MOCK_POSTS.map((p, i) => (
          <li key={i} className="py-3 sm:py-4">
            <Link href="#" className="flex items-start gap-3 no-underline group">
              {/* スコア(投票)カラム */}
              <div className="flex flex-col items-center w-8 sm:w-10 flex-shrink-0 pt-0.5">
                <button
                  aria-label="upvote"
                  className="text-t3 hover:text-brand-amber transition-colors p-0.5"
                >
                  <IconArrowBigUp size={20} stroke={1.6} />
                </button>
                <span className="font-mono text-[12px] font-bold text-t1 leading-none">
                  {p.likes}
                </span>
                <button
                  aria-label="downvote"
                  className="text-t3 hover:text-brand-cyan transition-colors p-0.5 rotate-180"
                >
                  <IconArrowBigUp size={20} stroke={1.6} />
                </button>
              </div>

              {/* メイン */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 text-[11.5px] font-mono text-t3 flex-wrap min-w-0">
                  <span
                    className="font-semibold px-1.5 py-0.5 rounded"
                    style={{ background: `${p.color}1a`, color: p.color }}
                  >
                    r/{p.category.replace(/\s/g, "")}
                  </span>
                  <span className="text-t3">·</span>
                  <span className="truncate">@{p.user}</span>
                  <span className="text-t3">·</span>
                  <span className="flex-shrink-0">{p.time}</span>
                </div>
                <h2 className="text-[14.5px] sm:text-[16px] font-semibold leading-snug mb-1.5 break-words group-hover:text-brand-purple transition-colors">
                  {p.title}
                </h2>
                <div className="flex items-center gap-3 text-[11.5px] font-mono text-t3">
                  <span className="flex items-center gap-1">
                    <IconMessageCircle size={12} stroke={1.8} />
                    {p.replies}
                  </span>
                  <span>{p.views} views</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
