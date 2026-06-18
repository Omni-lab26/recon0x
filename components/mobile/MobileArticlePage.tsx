"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconBookmark,
  IconClock,
  IconEye,
  IconArrowRight,
} from "@tabler/icons-react";

const TOC = [
  { idx: 1, label: "SQLi とは何か", done: true },
  { idx: 2, label: "影響と被害事例", done: true },
  { idx: 3, label: "検出方法", done: true },
  { idx: 4, label: "UNION-based 攻撃", current: true },
  { idx: 5, label: "Blind SQLi" },
  { idx: 6, label: "防御策と対策" },
  { idx: 7, label: "実演 — ログインバイパス" },
  { idx: 8, label: "関連法律と倫理" },
];

const GOALS = [
  { text: "SQLi の仕組みを説明できる", done: true },
  { text: "脆弱なコードを発見できる", done: true },
  { text: "UNION 攻撃を実装できる", done: false },
  { text: "Prepared Statement で防御できる", done: false },
];

export function MobileArticlePage({ slug }: { slug: string }) {
  const readPct = 40;
  const remainingMin = 7;
  const doneSections = TOC.filter((t) => t.done).length;

  return (
    <div className="lg:hidden flex flex-col gap-6 pb-8">
      {/* ── 戻る ── */}
      <div className="px-4 pt-3">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-[13px] text-t2 no-underline"
        >
          <IconArrowLeft size={14} stroke={1.8} />
          記事一覧
        </Link>
      </div>

      {/* ── 記事ヘッダ ── */}
      <header className="px-4">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
            style={{ background: "rgba(43,127,255,0.12)", color: "#2B7FFF" }}
          >
            WEB
          </span>
          <span
            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
            style={{ background: "rgba(34,197,94,0.12)", color: "var(--g)" }}
          >
            L1
          </span>
          <span className="font-mono text-[11px] text-t3 ml-auto">5/30 公開</span>
        </div>
        <h1 className="text-[24px] font-bold tracking-[-0.02em] leading-tight mb-3 break-words">
          SQL インジェクションの仕組み
        </h1>
        <p className="text-[14px] text-t2 leading-relaxed mb-4 break-words">
          SQL
          インジェクションはアプリケーションの入力欄に悪意のある SQL
          を注入し、データベースを不正に操作する攻撃。OWASP Top 10 で長年にわたり上位を維持する代表的な Web 脆弱性。
        </p>
        <div className="flex items-center gap-4 text-[12px] font-mono text-t3">
          <span className="flex items-center gap-1">
            <IconClock size={12} stroke={1.8} />
            12 分
          </span>
          <span className="flex items-center gap-1">
            <IconEye size={12} stroke={1.8} />
            1,248
          </span>
          <button
            aria-label="ブックマーク"
            className="ml-auto w-9 h-9 rounded-lg flex items-center justify-center text-t3 hover:text-brand-amber"
            style={{ background: "var(--surf2)", border: "1px solid var(--bd)" }}
          >
            <IconBookmark size={15} stroke={1.6} />
          </button>
        </div>
      </header>

      {/* ── 進捗バー ── */}
      <section className="px-4">
        <div
          className="rounded-xl border p-3.5"
          style={{ background: "var(--surf)", borderColor: "var(--bd2)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[12px] text-t2">読書進捗</span>
            <span className="font-mono text-[13px] font-bold text-brand-green">
              {readPct}%
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden mb-2"
            style={{ background: "var(--surf3)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${readPct}%`,
                background: "linear-gradient(90deg, #A855F7, #22C55E)",
              }}
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-t3">
            <span>
              {doneSections} / {TOC.length} セクション
            </span>
            <span>残り {remainingMin} 分</span>
          </div>
        </div>
      </section>

      {/* ── 記事本文 ── */}
      <article className="px-4">
        <div className="text-[15px] text-t2 leading-[1.85] space-y-4">
          <p className="break-words">
            <strong className="text-t1">SQL インジェクション (SQLi)</strong>{" "}
            は、Web
            アプリケーションの入力欄に悪意のある SQL
            文を注入することで、データベースを不正に操作する攻撃手法です。OWASP Top 10 の最重要脆弱性として 20 年以上君臨している、Web セキュリティの基礎中の基礎。
          </p>

          <h2 className="text-[18px] font-bold text-t1 mt-5 mb-2 break-words">
            1. SQLi とは何か
          </h2>
          <p className="break-words">
            ユーザー入力を SQL 文に直接結合するコードがあると、攻撃者は SQL 構文を破壊して別のクエリを実行できます。最も古典的な例:
          </p>
          <div
            className="rounded-lg border p-3 font-mono text-[12px] leading-[1.7] overflow-x-auto"
            style={{
              background: "var(--terminal-bg)",
              borderColor: "var(--bd)",
              color: "#F4F4F5",
            }}
          >
            <div className="text-t3">// 脆弱なコード例 (PHP)</div>
            <div>
              <span style={{ color: "#8B5CF6" }}>$query</span> ={" "}
              <span style={{ color: "#F59E0B" }}>"SELECT * FROM users</span>
            </div>
            <div>
              <span style={{ color: "#F59E0B" }}>
                {`  WHERE name='$_GET[name]'`}
              </span>
              <span style={{ color: "#F59E0B" }}>"</span>;
            </div>
          </div>
          <p className="break-words">
            ここで{" "}
            <code
              className="font-mono px-1.5 py-0.5 rounded text-[12.5px] break-all"
              style={{ background: "var(--surf2)", color: "var(--c)" }}
            >
              ?name=&apos; OR 1=1--
            </code>{" "}
            というパラメータを送ると、クエリは全ユーザー情報を返してしまう。
          </p>

          <h2 className="text-[18px] font-bold text-t1 mt-5 mb-2 break-words">
            2. 影響と被害事例
          </h2>
          <p className="break-words">SQLi の被害は単なる情報漏洩にとどまらない。代表的な実害:</p>
          <ul className="space-y-1.5 pl-5 list-disc text-[14px]">
            <li className="break-words">顧客データベース全体の流出</li>
            <li className="break-words">認証バイパスによる管理画面への侵入</li>
            <li className="break-words">データの改ざん・削除</li>
            <li className="break-words">OS コマンド実行への足がかり</li>
          </ul>
          <p className="break-words">
            2008 年の Heartland Payment Systems 事件では SQLi により{" "}
            <strong className="text-brand-red">1 億 3,400 万件</strong>{" "}
            のクレジットカード情報が流出。
          </p>

          <div
            className="rounded-xl border p-4 mt-5"
            style={{
              background: "rgba(245,158,11,0.06)",
              borderColor: "rgba(245,158,11,0.3)",
            }}
          >
            <div className="font-mono text-[11px] font-bold text-brand-amber mb-1 uppercase tracking-wider">
              ⚠ 続きを読むには
            </div>
            <div className="text-[13.5px] text-t2 leading-relaxed break-words">
              次のセクションでは UNION-based 攻撃の実装例を解説します。
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 mt-6">
          <button
            className="flex-1 rounded-xl border text-[14px] font-medium text-t2"
            style={{
              minHeight: "48px",
              background: "var(--surf2)",
              borderColor: "var(--bd2)",
            }}
          >
            <IconArrowLeft size={14} stroke={1.8} className="inline mr-1" />
            前へ
          </button>
          <button
            className="flex-[2] rounded-xl text-[14px] font-bold text-white flex items-center justify-center gap-2"
            style={{
              minHeight: "48px",
              background: "linear-gradient(135deg, #22C55E, #16A34A)",
              boxShadow: "0 4px 12px rgba(34,197,94,0.35)",
            }}
          >
            次のセクション
            <IconArrowRight size={16} stroke={2.5} />
          </button>
        </div>
      </article>

      {/* ── 目次 ── */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-3">
          ◆ 目次
        </h2>
        <ol
          className="rounded-xl border divide-y"
          style={{ background: "var(--surf)", borderColor: "var(--bd2)" }}
        >
          {TOC.map((s) => (
            <li
              key={s.idx}
              className="flex items-center gap-3 px-3.5 py-3 min-w-0"
              style={{ borderColor: "var(--bd)" }}
            >
              <span
                className="font-mono text-[11px] font-bold w-5 flex-shrink-0"
                style={{
                  color: s.done ? "var(--g)" : s.current ? "var(--p)" : "var(--t3)",
                }}
              >
                {s.done ? "✓" : s.idx}
              </span>
              <span
                className="text-[14px] flex-1 break-words"
                style={{
                  color: s.current ? "var(--p)" : s.done ? "var(--t3)" : "var(--t2)",
                  fontWeight: s.current ? 600 : 400,
                }}
              >
                {s.label}
              </span>
              {s.current && (
                <span className="font-mono text-[10px] font-bold text-brand-purple flex-shrink-0">
                  ▸ 学習中
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ── 学習目標 ── */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-3">
          ◆ 学習目標
        </h2>
        <div className="space-y-2">
          {GOALS.map((g, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border p-3 min-w-0"
              style={{ background: "var(--surf)", borderColor: "var(--bd)" }}
            >
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: g.done ? "var(--g)" : "var(--surf3)",
                  border: g.done ? "1.5px solid var(--g)" : "1.5px solid var(--bd2)",
                }}
              >
                {g.done && (
                  <span className="text-[10px] text-black font-bold">✓</span>
                )}
              </div>
              <span
                className="text-[13.5px] leading-relaxed break-words"
                style={{ color: g.done ? "var(--t3)" : "var(--t1)" }}
              >
                {g.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── キーコンセプト ── */}
      <section className="px-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase text-t3 mb-3">
          ◆ キーコンセプト
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {["SQL", "injection", "UNION", "WHERE", "1=1", "auth-bypass", "OWASP", "Prepared Stmt", "PDO"].map((t) => (
            <span
              key={t}
              className="font-mono text-[12px] px-2.5 py-1 rounded-full border break-all"
              style={{
                background: "var(--surf2)",
                borderColor: "var(--bd2)",
                color: "var(--t2)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
