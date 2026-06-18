import { getArticleBySlug, resolveArticleImage } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconArrowLeft,
  IconClock,
  IconEye,
  IconBookmark,
} from "@tabler/icons-react";

// ── MDX 内で使えるカスタムコンポーネント ──────────────
const MDX_COMPONENTS = {
  // コードブロック — ダークテーマ固定
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="rounded-lg p-4 overflow-x-auto text-[13px] leading-[1.7] my-5"
      style={{ background: "#0d1117", border: "1px solid #30363d" }}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="font-mono text-[12.5px] px-1.5 py-0.5 rounded break-all"
      style={{ background: "var(--surf2)", color: "var(--c)", border: "1px solid var(--bd)" }}
    />
  ),
  // 見出し
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="text-[28px] font-bold mt-10 mb-4 tracking-[-0.02em]" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-[22px] font-bold mt-10 mb-3 tracking-[-0.01em] text-brand-purple border-b pb-2" style={{ borderColor: "var(--bd)" }} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="text-[18px] font-bold mt-6 mb-2" />
  ),
  // 本文
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="text-[15px] text-t2 leading-[1.85] mb-4 break-words" />
  ),
  // リスト
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc pl-5 space-y-1.5 mb-4 text-[14.5px] text-t2" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="list-decimal pl-5 space-y-1.5 mb-4 text-[14.5px] text-t2" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-relaxed break-words" />
  ),
  // テーブル
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-5 rounded-lg border" style={{ borderColor: "var(--bd)" }}>
      <table {...props} className="w-full text-[13.5px]" />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th {...props} className="px-3 py-2.5 text-left font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold" style={{ background: "var(--surf2)", borderBottom: "1px solid var(--bd)" }} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} className="px-3 py-2.5 text-t2 border-t break-words" style={{ borderColor: "var(--bd)" }} />
  ),
  // 引用
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="border-l-4 pl-4 py-2 my-4 text-[14px] text-t2 rounded-r-lg"
      style={{ borderColor: "var(--a)", background: "rgba(245,158,11,0.06)" }}
    />
  ),
  // 水平線
  hr: () => (
    <hr className="my-8" style={{ borderColor: "var(--bd)" }} />
  ),
  // インラインコード
  inlineCode: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="font-mono text-[12.5px] px-1.5 py-0.5 rounded break-all"
      style={{ background: "var(--surf2)", color: "var(--c)", border: "1px solid var(--bd)" }}
    />
  ),
  // 画像 — ./images/ 相対パスは /articles/{slug}/ に変換(slug は後で注入)
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    const resolvedSrc = (src ?? "").replace(/^\.\/images\//, "");
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolvedSrc.startsWith("http") ? resolvedSrc : `/articles/__SLUG__/${resolvedSrc}`}
        alt={alt ?? ""}
        className="w-full rounded-xl my-5 border"
        style={{ borderColor: "var(--bd)" }}
      />
    );
  },
  // リンク
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-brand-purple underline underline-offset-2 hover:opacity-80 transition break-all"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  ),
  // 強調
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-bold text-t1" />
  ),
};

// ── ページ ────────────────────────────────────────────
export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const FIELD_COLOR: Record<string, string> = {
    Web: "#2B7FFF",
    Linux: "#22C55E",
    Network: "#06B6D4",
    Crypto: "#8B5CF6",
    Pwn: "#EF4444",
    Forensic: "#F59E0B",
    OSINT: "#F4564A",
  };
  const fieldColor = FIELD_COLOR[article.field] ?? "#22C55E";

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      {/* 戻る */}
      <Link
        href="/articles"
        className="inline-flex items-center gap-1.5 text-[13px] text-t2 no-underline mb-6 hover:text-t1 transition"
      >
        <IconArrowLeft size={14} stroke={1.8} />
        記事一覧
      </Link>

      {/* ヒーロー画像 */}
      {article.heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.heroImage.startsWith("/articles")
            ? resolveArticleImage(article.slug, "hero.png")
            : article.heroImage}
          alt={article.title}
          className="w-full rounded-2xl mb-8 border"
          style={{ borderColor: "var(--bd)", maxHeight: "380px", objectFit: "cover" }}
        />
      )}

      {/* ヘッダ */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
            style={{ background: `${fieldColor}1a`, color: fieldColor }}
          >
            {article.field}
          </span>
          <span
            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
            style={{ background: "rgba(168,85,247,0.12)", color: "var(--p)" }}
          >
            {article.level}
          </span>
          <span className="font-mono text-[11px] text-t3 ml-auto">
            {article.publishedAt}
          </span>
        </div>

        <h1 className="text-[26px] sm:text-[32px] font-bold leading-tight tracking-[-0.02em] mb-4 break-words">
          {article.title}
        </h1>

        {article.description && (
          <p className="text-[15px] text-t2 leading-relaxed mb-4 break-words">
            {article.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-[12px] font-mono text-t3 flex-wrap">
          <span className="flex items-center gap-1">
            <IconClock size={12} stroke={1.8} />
            {article.readMin} 分
          </span>
          <div className="flex flex-wrap gap-1.5 ml-2">
            {article.tags?.map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                style={{ background: "var(--surf2)", color: "var(--t3)" }}
              >
                #{t}
              </span>
            ))}
          </div>
          <button
            aria-label="ブックマーク"
            className="ml-auto w-9 h-9 rounded-lg flex items-center justify-center text-t3 hover:text-brand-amber transition"
            style={{ background: "var(--surf2)", border: "1px solid var(--bd)" }}
          >
            <IconBookmark size={15} stroke={1.6} />
          </button>
        </div>
      </header>

      {/* 区切り */}
      <hr className="mb-8" style={{ borderColor: "var(--bd)" }} />

      {/* MDX 本文 */}
      <div className="article-body">
        <MDXRemote
          source={article.content.replace(/\/articles\/__SLUG__\//g, `/articles/${article.slug}/`)}
          components={MDX_COMPONENTS}
        />
      </div>

      {/* 前提知識 */}
      {article.prerequisites && article.prerequisites.length > 0 && (
        <div
          className="mt-10 rounded-xl border p-4"
          style={{ background: "var(--surf)", borderColor: "var(--bd2)" }}
        >
          <div className="text-[12px] font-mono font-bold text-t3 uppercase tracking-wider mb-2">
            前提知識
          </div>
          <div className="flex flex-wrap gap-2">
            {article.prerequisites.map((slug) => (
              <Link
                key={slug}
                href={`/articles/${slug}`}
                className="font-mono text-[12px] px-2.5 py-1 rounded-lg no-underline hover:opacity-80 transition"
                style={{
                  background: "rgba(168,85,247,0.1)",
                  color: "var(--p)",
                  border: "1px solid rgba(168,85,247,0.25)",
                }}
              >
                {slug}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
