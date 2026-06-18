import matter from "gray-matter";

// ── 設定 ──────────────────────────────────────────────
const GITHUB_USER = "Omni-lab26";
const GITHUB_REPO = "recon0x-content";
const GITHUB_BRANCH = "main";
const REVALIDATE = 60; // 1 時間キャッシュ

// GitHub Raw ベース URL
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// GitHub API ベース URL(記事一覧取得用)
const API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/articles`;

// ── 型定義 ────────────────────────────────────────────
export interface ArticleFrontmatter {
  title: string;
  slug: string;
  field: string;
  level: string;
  readMin: number;
  publishedAt: string;
  heroImage?: string;
  tags?: string[];
  prerequisites?: string[];
  relatedCves?: string[];
  description?: string;
  views?: number;
}

export interface Article extends ArticleFrontmatter {
  content: string; // MDX 本文
}

// ── 単一記事を取得 ────────────────────────────────────
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const url = `${RAW_BASE}/articles/${slug}/index.md`;
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE },
      headers: process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {},
    });

    if (!res.ok) return null;

    const raw = await res.text();
    const { data: frontmatter, content } = matter(raw);

    return {
      slug,
      title: frontmatter.title ?? slug,
      field: frontmatter.field ?? "Unknown",
      level: frontmatter.level ?? "L1",
      readMin: frontmatter.readMin ?? 10,
      publishedAt: frontmatter.publishedAt ?? "",
      heroImage: frontmatter.heroImage,
      tags: frontmatter.tags ?? [],
      prerequisites: frontmatter.prerequisites ?? [],
      relatedCves: frontmatter.relatedCves ?? [],
      description: frontmatter.description ?? "",
      content,
    };
  } catch {
    return null;
  }
}

// ── 全記事のメタ情報を取得(一覧ページ用) ─────────────
export async function getAllArticles(): Promise<ArticleFrontmatter[]> {
  try {
    // GitHub API でディレクトリ一覧を取得
    const res = await fetch(API_BASE, {
      next: { revalidate: REVALIDATE },
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    });

    if (!res.ok) return FALLBACK_ARTICLES;

    const dirs: { name: string; type: string }[] = await res.json();
    const slugs = dirs.filter((d) => d.type === "dir").map((d) => d.name);

    // 各記事のフロントマターだけ取得
    const articles = await Promise.all(
      slugs.map(async (slug) => {
        const article = await getArticleBySlug(slug);
        if (!article) return null;
        const { content: _, ...meta } = article;
        return meta;
      })
    );

    const valid = articles.filter(Boolean) as ArticleFrontmatter[];
    return valid.length > 0 ? valid : FALLBACK_ARTICLES;
  } catch {
    return FALLBACK_ARTICLES;
  }
}

// ── 画像 URL を GitHub Raw から解決 ──────────────────
export function resolveArticleImage(slug: string, filename: string): string {
  return `${RAW_BASE}/articles/${slug}/images/${filename}`;
}

// ── GitHub 未接続時のフォールバック ──────────────────
// recon0x-content が未作成の間はこれを表示
const FALLBACK_ARTICLES: ArticleFrontmatter[] = [
  {
    slug: "sqli-basics",
    title: "SQL インジェクション基礎 — 仕組み・攻撃手順・完全防御ガイド",
    field: "Web",
    level: "L2",
    readMin: 20,
    publishedAt: "2026-06-16",
    tags: ["sqli", "injection", "owasp", "auth-bypass"],
    description: "SQLi の仕組みから UNION 攻撃・防御まで実コード付きで解説",
  },
];
