import Link from "next/link";
import { MOCK_TOOLS } from "@/lib/mock-data";
import { IconSearch, IconStar } from "@tabler/icons-react";

const CATEGORIES = ["全カテゴリ", "ネットワーク", "Web", "Pwn", "Crypto", "Forensic", "Wireless"];

export default function ToolsPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <header className="mb-6">
        <div className="eyebrow mb-1">TOOLS · ARSENAL</div>
        <h1 className="text-[22px] sm:text-[28px] font-bold tracking-[-0.02em] mb-2">ツール</h1>
        <div className="text-[13px] text-t3 font-mono">
          {MOCK_TOOLS.length} ツール · Kali 標準 9 · OSS
        </div>
      </header>

      <button
        className="w-full flex items-center gap-2 px-3.5 mb-4 rounded-lg border text-[14px] text-t3 hover:text-t2 transition"
        style={{ minHeight: "44px", background: "var(--surf2)", borderColor: "var(--bd)" }}
      >
        <IconSearch size={15} stroke={1.6} />
        <span>ツール名 · 用途 · タグで検索</span>
      </button>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((c, i) => (
          <button
            key={c}
            className="flex-shrink-0 px-3 py-1.5 rounded-full font-medium text-[12px] border whitespace-nowrap"
            style={
              i === 0
                ? { background: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.3)", color: "var(--p)" }
                : { background: "var(--surf)", borderColor: "var(--bd)", color: "var(--t3)" }
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* GitHub topic style — 1 行リスト */}
      <ul className="divide-y" style={{ borderColor: "var(--bd)" }}>
        {MOCK_TOOLS.map((t) => (
          <li key={t.id} className="py-4">
            <Link
              href={`/tools/${t.id}`}
              className="flex items-start gap-3 no-underline group min-w-0"
            >
              {/* アイコン */}
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center text-[20px] sm:text-[22px] flex-shrink-0 border"
                style={{
                  background: `${t.color}1a`,
                  borderColor: `${t.color}40`,
                }}
              >
                {t.emoji}
              </div>

              <div className="flex-1 min-w-0">
                {/* ヘッダ */}
                <div className="flex items-baseline gap-2 mb-1 flex-wrap min-w-0">
                  <span className="text-[15px] sm:text-[16px] font-bold text-brand-purple group-hover:underline">
                    {t.name}
                  </span>
                  <span
                    className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider flex-shrink-0"
                    style={{ background: `${t.color}1a`, color: t.color }}
                  >
                    {t.category}
                  </span>
                  <span className="font-mono text-[11px] text-t3 flex-shrink-0">
                    {t.license}
                  </span>
                </div>

                {/* 説明 */}
                <p className="text-[13px] text-t2 leading-relaxed mb-2 line-clamp-2 break-words">
                  {t.description}
                </p>

                {/* メタ */}
                <div className="flex items-center gap-3 text-[11.5px] font-mono text-t3 flex-wrap min-w-0">
                  <span className="flex items-center gap-1">
                    <IconStar
                      size={12}
                      stroke={1.8}
                      className="text-brand-amber"
                    />
                    {t.rating}
                  </span>
                  <span>{t.users} users</span>
                  <code className="px-1.5 py-0.5 rounded text-t1 text-[11px]"
                    style={{ background: "var(--surf3)" }}>
                    {t.cmd}
                  </code>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
