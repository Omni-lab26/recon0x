import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { FIELDS } from "@/lib/tokens";
import { IconEye, IconClock, IconSearch } from "@tabler/icons-react";

const FIELD_COLOR: Record<string, string> = {
  Web: "#2B7FFF",
  Linux: "#22C55E",
  Network: "#06B6D4",
  Crypto: "#8B5CF6",
  Pwn: "#EF4444",
  Forensic: "#F59E0B",
  OSINT: "#F4564A",
};

const TAGS_BY_FIELD: Record<string, string[]> = {
  Web: ["sqli", "xss", "csrf"],
  Linux: ["bash", "privesc", "kernel"],
  Network: ["tcp", "scan", "wireshark"],
  Crypto: ["rsa", "aes", "hash"],
  Pwn: ["rop", "heap", "buffer"],
  Forensic: ["memory", "disk", "log"],
  OSINT: ["recon", "dox", "geoint"],
};

export default async function ArticlesPage() {
  const MOCK_ARTICLES = await getAllArticles();
  const fieldCounts = FIELDS.map((f) => ({
    ...f,
    count: MOCK_ARTICLES.filter((a) => a.field === f.name.split(" ")[0]).length,
  }));
  const total = MOCK_ARTICLES.length;
  const totalViews = MOCK_ARTICLES.reduce((s, a) => s + (a.views ?? 0), 0);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <header className="mb-6">
        <div className="eyebrow mb-1">ARTICLES · KNOWLEDGE BASE</div>
        <h1 className="text-[22px] sm:text-[28px] font-bold tracking-[-0.02em] mb-2">記事</h1>
        <div className="text-[13px] text-t3 font-mono">
          {total} 件 · 累計 {totalViews.toLocaleString()} views · 平均 16 分
        </div>
      </header>

      <button
        className="w-full flex items-center gap-2 px-3.5 mb-5 rounded-lg border text-[14px] text-t3 hover:text-t2 transition"
        style={{ minHeight: "44px", background: "var(--surf2)", borderColor: "var(--bd)" }}
      >
        <IconSearch size={15} stroke={1.6} />
        <span>タイトル · 著者 · タグで検索</span>
        <span className="ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded text-t3 hidden sm:inline"
          style={{ background: "var(--surf3)", border: "1px solid var(--bd)" }}>⌘K</span>
      </button>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}>
        <button
          className="flex-shrink-0 px-3 py-1.5 rounded-full font-medium text-[12px] border"
          style={{ background: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.3)", color: "var(--p)" }}
        >
          すべて {total}
        </button>
        {fieldCounts.map((f) => (
          <button
            key={f.key}
            className="flex-shrink-0 px-3 py-1.5 rounded-full font-medium text-[12px] border text-t3"
            style={{ background: "var(--surf)", borderColor: "var(--bd)" }}
          >
            {f.name.split(" ")[0]} {f.count}
          </button>
        ))}
      </div>

      <div className="divide-y" style={{ borderColor: "var(--bd)" }}>
        {MOCK_ARTICLES.map((a) => {
          const color = FIELD_COLOR[a.field] ?? "#22C55E";
          const tags = TAGS_BY_FIELD[a.field] ?? [];
          return (
            <article key={a.slug} className="py-4 sm:py-5 first:pt-0">
              <Link href={`/articles/${a.slug}`} className="block group no-underline">
                <div className="flex items-center gap-2 mb-2 text-[12px] font-mono text-t3">
                  <span className="font-semibold px-1.5 py-0.5 rounded"
                    style={{ background: `${color}1a`, color: color }}>
                    {a.field}
                  </span>
                  <span className="text-t3">·</span>
                  <span>{a.level}</span>
                  <span className="text-t3">·</span>
                  <span>2026/05/30</span>
                </div>
                <h2 className="text-[16px] sm:text-[18px] font-bold leading-snug mb-1.5 break-words group-hover:text-brand-purple transition-colors">
                  {a.title}
                </h2>
                <p className="text-[13.5px] text-t2 leading-relaxed line-clamp-2 mb-2.5 break-words">
                  Web アプリケーションの代表的脆弱性 SQL インジェクションを実際の脆弱コードと共に解説。攻撃手法から防御策まで段階的に学べる入門記事。
                </p>
                <div className="flex items-center gap-3 text-[12px] font-mono text-t3 flex-wrap min-w-0">
                  {tags.map((t) => (<span key={t}>#{t}</span>))}
                  <span className="ml-auto flex items-center gap-1">
                    <IconEye size={12} stroke={1.8} />
                    {((a.views ?? 0) ?? 0).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconClock size={12} stroke={1.8} />
                    {a.readMin}分
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-8 text-center text-[12px] text-t3 font-mono">
        — {total} 件すべて表示しました —
      </div>
    </div>
  );
}
