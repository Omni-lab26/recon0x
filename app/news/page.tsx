import { MOCK_NEWS } from "@/lib/mock-data";
import { IconSearch, IconExternalLink, IconRss } from "@tabler/icons-react";

const SOURCES = ["全ソース", "CISA", "The Hacker News", "Krebs", "BleepingComputer", "JVN"];

export default function NewsPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <header className="mb-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="eyebrow mb-1">SECURITY NEWS</div>
          <h1 className="text-[22px] sm:text-[28px] font-bold tracking-[-0.02em] mb-2">ニュース</h1>
          <div className="text-[13px] text-t3 font-mono">
            <span className="text-brand-green">●</span> ライブ · 5 分間隔 · 82 本 / 日
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 rounded-lg border text-[13px] text-t3 hover:text-t2 transition flex-shrink-0"
          style={{ minHeight: "44px", background: "var(--surf2)", borderColor: "var(--bd)" }}
        >
          <IconRss size={14} stroke={1.6} />
          <span className="hidden sm:inline">RSS</span>
        </button>
      </header>

      <button
        className="w-full flex items-center gap-2 px-3.5 mb-4 rounded-lg border text-[14px] text-t3 hover:text-t2 transition"
        style={{ minHeight: "44px", background: "var(--surf2)", borderColor: "var(--bd)" }}
      >
        <IconSearch size={15} stroke={1.6} />
        <span>キーワード · CVE-ID · ソース名で検索</span>
      </button>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}>
        {SOURCES.map((s, i) => (
          <button
            key={s}
            className="flex-shrink-0 px-3 py-1.5 rounded-full font-medium text-[12px] border whitespace-nowrap"
            style={
              i === 0
                ? { background: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.3)", color: "var(--p)" }
                : { background: "var(--surf)", borderColor: "var(--bd)", color: "var(--t3)" }
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* Hacker News-style dense list */}
      <ol className="divide-y" style={{ borderColor: "var(--bd)" }}>
        {MOCK_NEWS.map((n, i) => (
          <li key={i} className="py-3 sm:py-3.5">
            <a
              href="#"
              className="flex items-start gap-2.5 no-underline group min-w-0"
            >
              {/* 番号 */}
              <span className="font-mono text-[13px] text-t3 w-6 flex-shrink-0 text-right pt-0.5">
                {i + 1}.
              </span>

              <div className="flex-1 min-w-0">
                {/* タイトル */}
                <h2 className="text-[14.5px] sm:text-[15.5px] font-semibold leading-snug mb-1 break-words group-hover:text-brand-purple transition-colors">
                  {n.title}
                  <IconExternalLink
                    size={11}
                    stroke={1.6}
                    className="inline-block ml-1 text-t3 opacity-50"
                  />
                </h2>

                {/* メタ行 */}
                <div className="flex items-center gap-2 text-[11.5px] font-mono text-t3 flex-wrap min-w-0">
                  <span
                    className="font-semibold px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ background: `${n.color}1a`, color: n.color }}
                  >
                    {n.category}
                  </span>
                  <span className="truncate">{n.source}</span>
                  <span className="text-t3">·</span>
                  <span className="flex-shrink-0">{n.time}</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-6 text-center text-[12px] text-t3 font-mono">
        さらに表示 (続きを読む)
      </div>
    </div>
  );
}
