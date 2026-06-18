import { MOCK_GLOSSARY } from "@/lib/mock-data";
import { IconSearch } from "@tabler/icons-react";

const CATEGORIES = ["全て", "攻撃手法", "防御技術", "暗号", "ネットワーク", "認証 / 認可", "プロトコル"];

export default function GlossaryPage() {
  // Group by initial letter
  const grouped = MOCK_GLOSSARY.reduce((acc, g) => {
    const initial = g.short[0].toUpperCase();
    (acc[initial] ||= []).push(g);
    return acc;
  }, {} as Record<string, typeof MOCK_GLOSSARY>);

  const sorted = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <header className="mb-6">
        <div className="eyebrow mb-1">GLOSSARY · DICTIONARY</div>
        <h1 className="text-[22px] sm:text-[28px] font-bold tracking-[-0.02em] mb-2">用語集</h1>
        <div className="text-[13px] text-t3 font-mono">
          {MOCK_GLOSSARY.length} 用語 · 7 カテゴリ · 学習済み 12
        </div>
      </header>

      <button
        className="w-full flex items-center gap-2 px-3.5 mb-4 rounded-lg border text-[14px] text-t3 hover:text-t2 transition"
        style={{ minHeight: "44px", background: "var(--surf2)", borderColor: "var(--bd)" }}
      >
        <IconSearch size={15} stroke={1.6} />
        <span>用語 · 別名 · 説明文を検索</span>
      </button>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((c, i) => (
          <button
            key={c}
            className="flex-shrink-0 px-3 py-1.5 rounded-full font-medium text-[12px] border"
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

      {/* Dictionary list */}
      <dl className="space-y-6">
        {sorted.map(([letter, items]) => (
          <section key={letter}>
            {/* セクション見出し */}
            <h2
              className="font-mono text-[12px] uppercase tracking-[0.15em] font-bold text-t3 mb-2 pb-1 border-b"
              style={{ borderColor: "var(--bd)" }}
            >
              {letter}
            </h2>
            <div className="divide-y" style={{ borderColor: "var(--bd)" }}>
              {items.map((g) => (
                <div key={g.term} className="py-3 sm:py-4">
                  <dt className="flex items-baseline gap-2 mb-1 flex-wrap min-w-0">
                    <span className="text-[15px] sm:text-[16px] font-bold break-words">
                      {g.term}
                    </span>
                    <span
                      className="font-mono text-[12px] font-semibold"
                      style={{ color: g.color }}
                    >
                      ({g.short})
                    </span>
                    <span
                      className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider"
                      style={{ background: `${g.color}1a`, color: g.color }}
                    >
                      {g.category}
                    </span>
                  </dt>
                  <dd className="text-[13.5px] text-t2 leading-relaxed break-words">
                    {g.def}
                  </dd>
                </div>
              ))}
            </div>
          </section>
        ))}
      </dl>
    </div>
  );
}
