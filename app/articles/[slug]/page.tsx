import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MOCK_ARTICLES } from "@/lib/mock-data";
import { LivePill } from "@/components/home/LivePill";
import {
  IconArrowLeft,
  IconBookmark,
  IconNotebook,
  IconCheck,
  IconList,
  IconTarget,
  IconBulb,
  IconLink,
  IconClock,
  IconArrowRight,
} from "@tabler/icons-react";

const TOC = [
  "1. SQLi とは何か",
  "2. 影響と被害事例",
  "3. 検出方法",
  "4. UNION-based 攻撃",
  "5. Blind SQLi",
  "6. 防御策と対策",
  "7. 実演 — ログインバイパス",
  "8. 関連法律と倫理",
];

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug) ?? MOCK_ARTICLES[0];
  return (
    <div className="max-w-[1400px] mx-auto">
      <a
        href="/articles"
        className="inline-flex items-center gap-1.5 text-[12px] text-t2 hover:text-t1 transition mb-3 no-underline"
      >
        <IconArrowLeft size={13} stroke={1.8} />
        記事一覧に戻る
      </a>

      <OpsHeader
        eyebrow={`ARTICLE · ${article.field.toUpperCase()} · ${article.level}`}
        title={<>{article.title}</>}
        description="SQL インジェクションはアプリケーションの入力欄に悪意のある SQL を注入し、データベースを不正に操作する攻撃。OWASP Top 10 で長年にわたり上位を維持する代表的な Web 脆弱性。"
        live={{ label: `${article.views.toLocaleString()} 閲覧` }}
        stats={[
          { label: "難易度", value: article.level, color: "var(--g)" },
          { label: "読了時間", value: `${article.readMin} 分` },
          { label: "セクション", value: "8" },
          { label: "チェックポイント", value: "3" },
          { label: "更新", value: "5/30" },
          { label: "閲覧数", value: article.views.toLocaleString() },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        {/* LEFT: TOC + Reading progress (cols 1-3) */}
        <div className="col-span-3 flex flex-col gap-3 self-start">
          <Panel
            eyebrow="読書進捗"
            title="このページ内"
            icon={<IconClock size={13} stroke={1.8} />}
            iconBg="rgba(34,197,94,0.1)"
            iconColor="var(--g)"
          >
            <div className="flex items-baseline gap-2 mb-2">
              <div className="font-mono text-[22px] font-bold text-brand-green leading-none">
                40%
              </div>
              <div className="text-[10.5px] text-t3">読了</div>
            </div>
            <div className="h-1 bg-surf3 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-brand-green" style={{ width: "40%" }} />
            </div>
            <div className="font-mono text-[9.5px] text-t3">
              3 / 8 セクション · 残り 7 分
            </div>
          </Panel>

          <Panel
            eyebrow="目次"
            title="セクション"
            icon={<IconList size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
          >
            <div className="space-y-1">
              {TOC.map((s, i) => {
                const done = i < 3;
                const current = i === 3;
                return (
                  <div
                    key={s}
                    className="flex items-center gap-2 px-2 py-1.5 rounded text-[10.5px] cursor-pointer transition"
                    style={
                      current
                        ? {
                            background: "rgba(0,212,255,0.08)",
                            color: "var(--c)",
                          }
                        : { color: done ? "var(--t3)" : "var(--t2)" }
                    }
                  >
                    <span
                      className="font-mono w-3 text-center"
                      style={{
                        color: done
                          ? "var(--g)"
                          : current
                          ? "var(--c)"
                          : "var(--t3)",
                      }}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span className="flex-1 line-clamp-1">{s.replace(/^\d+\. /, "")}</span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        {/* CENTER: Article body (cols 4-8) */}
        <article
          className="col-span-5 p-6 rounded-[11px] border bg-surf"
          style={{ borderColor: "var(--bd)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className="font-mono text-[10px] font-semibold px-2 py-1 rounded border"
              style={{
                background: "rgba(43,127,255,0.08)",
                borderColor: "rgba(43,127,255,0.22)",
                color: "#2B7FFF",
              }}
            >
              WEB
            </span>
            <span
              className="font-mono text-[10px] font-semibold px-2 py-1 rounded border"
              style={{
                background: "rgba(34,197,94,0.08)",
                borderColor: "rgba(34,197,94,0.22)",
                color: "var(--g)",
              }}
            >
              L1
            </span>
            <span className="font-mono text-[10.5px] text-t3 ml-auto">
              5/30 公開 · {article.readMin} 分
            </span>
          </div>

          <h1 className="text-[24px] font-semibold tracking-[-0.025em] leading-[1.2] mb-4">
            SQL インジェクションの仕組み
          </h1>

          <div className="text-[13px] text-t2 leading-[1.75] space-y-3.5">
            <p>
              <strong className="text-t1">SQL インジェクション (SQLi)</strong>{" "}
              は、Web アプリケーションの入力欄に悪意のある SQL 文を注入することで、データベースを不正に操作する攻撃手法です。OWASP Top 10 の最重要脆弱性として 20 年以上君臨している、Web セキュリティの基礎中の基礎。
            </p>

            <h2 className="text-[17px] font-semibold text-t1 mt-5 mb-2">
              1. SQLi とは何か
            </h2>
            <p>
              ユーザー入力を SQL 文に直接結合するコードがあると、攻撃者は SQL 構文を破壊して別のクエリを実行できます。最も古典的な例:
            </p>
            <div
              className="rounded-lg border border-bd p-3 font-mono text-[11.5px] leading-[1.65]"
              style={{ background: "#020203" }}
            >
              <div className="text-t3">// 脆弱なコード例 (PHP)</div>
              <div>
                <span style={{ color: "#8B5CF6" }}>$query</span> ={" "}
                <span style={{ color: "#F59E0B" }}>"SELECT * FROM users</span>
              </div>
              <div>
                <span style={{ color: "#F59E0B" }}>
                  {"  WHERE name='$_GET[name]'"}
                </span>
                <span style={{ color: "#F59E0B" }}>"</span>;
              </div>
            </div>
            <p>
              ここで{" "}
              <code className="font-mono bg-surf2 px-1.5 py-0.5 rounded text-brand-cyan text-[11.5px]">
                ?name=' OR 1=1--
              </code>{" "}
              というパラメータを送ると、クエリは{" "}
              <code className="font-mono bg-surf2 px-1.5 py-0.5 rounded text-brand-cyan text-[11.5px]">
                SELECT * FROM users WHERE name='' OR 1=1--'
              </code>{" "}
              となり、全ユーザー情報を返してしまう。
            </p>

            <h2 className="text-[17px] font-semibold text-t1 mt-5 mb-2">
              2. 影響と被害事例
            </h2>
            <p>
              SQLi の被害は単なる情報漏洩にとどまらない。代表的な実害:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-[12.5px]">
              <li>顧客データベース全体の流出 (氏名、メール、ハッシュ化パスワード)</li>
              <li>認証バイパスによる管理画面への侵入</li>
              <li>データの改ざん・削除</li>
              <li>OS コマンド実行への足がかり</li>
            </ul>
            <p>
              2008 年の Heartland Payment Systems 事件では SQLi により{" "}
              <strong className="text-brand-red">1 億 3,400 万件</strong>{" "}
              のクレジットカード情報が流出。最近の事例では 2023 年の MOVEit 脆弱性が世界中の組織に影響を与えた。
            </p>

            <div
              className="rounded-lg border p-3 mt-4 text-[11.5px] leading-[1.6]"
              style={{
                background: "rgba(245,158,11,0.05)",
                borderColor: "rgba(245,158,11,0.22)",
              }}
            >
              <div className="font-mono text-[9.5px] font-semibold text-brand-amber mb-1">
                ⚠ 続きを読むには
              </div>
              次のセクションでは UNION-based 攻撃の実装例を解説します...
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-bd">
            <button className="flex-1 px-3.5 py-2 bg-surf2 border border-bd2 text-t1 rounded-lg text-[11.5px] inline-flex items-center justify-center gap-1.5 hover:bg-surf3 transition">
              <IconArrowLeft size={12} stroke={1.8} />
              前のセクション
            </button>
            <button
              className="flex-[2] px-3.5 py-2 rounded-lg text-[11.5px] inline-flex items-center justify-center gap-1.5 font-semibold text-black"
              style={{
                background: "linear-gradient(135deg,#22C55E,#16A34A)",
              }}
            >
              次のセクション (UNION-based)
              <IconArrowRight size={12} stroke={1.8} />
            </button>
          </div>
        </article>

        {/* RIGHT INTELLIGENCE RAIL (cols 9-12) */}
        <div className="col-span-4 flex flex-col gap-3 self-start">
          <Panel
            eyebrow="学習目標"
            title="この記事で習得"
            icon={<IconTarget size={13} stroke={1.8} />}
            iconBg="rgba(34,197,94,0.1)"
            iconColor="var(--g)"
          >
            <div className="space-y-1.5">
              {[
                ["SQLi の仕組みを説明できる", true],
                ["脆弱なコードを発見できる", true],
                ["UNION 攻撃を実装できる", false],
                ["Prepared Statement で防御できる", false],
              ].map(([t, done]) => (
                <div
                  key={t as string}
                  className="flex items-start gap-2 p-2 bg-surf2 border border-bd rounded-md"
                >
                  <div
                    className="w-3 h-3 rounded border mt-0.5 flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: done ? "var(--g)" : "var(--surf2)",
                      borderColor: done ? "var(--g)" : "var(--bd2)",
                    }}
                  >
                    {done && (
                      <span className="text-[7px] text-black font-bold">✓</span>
                    )}
                  </div>
                  <span className="text-[10.5px] leading-snug">{t as string}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-bd text-center font-mono text-[9.5px] text-brand-green font-semibold">
              2 / 4 目標達成
            </div>
          </Panel>

          <Panel
            eyebrow="キーコンセプト"
            title="この記事の重要用語"
            icon={<IconBulb size={13} stroke={1.8} />}
            iconBg="rgba(245,158,11,0.1)"
            iconColor="var(--a)"
          >
            <div className="flex flex-wrap gap-1.5">
              {[
                "SQL",
                "injection",
                "UNION",
                "WHERE",
                "1=1",
                "auth-bypass",
                "OWASP",
                "Prepared Stmt",
                "PDO",
                "MySQL",
              ].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-1 rounded border text-t2 cursor-pointer hover:text-t1 hover:border-bd2 transition"
                  style={{
                    background: "var(--surf2)",
                    borderColor: "var(--bd)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-bd font-mono text-[9.5px] text-t3">
              タップで用語集を開く
            </div>
          </Panel>

          <Panel
            eyebrow="チェックポイント"
            title="理解度確認"
            icon={<IconCheck size={13} stroke={1.8} />}
            iconBg="rgba(139,92,246,0.1)"
            iconColor="var(--p)"
          >
            <div className="text-center py-2 mb-2">
              <div className="font-mono text-[20px] font-bold text-brand-purple">
                1 / 3
              </div>
              <div className="text-[10.5px] text-t3">小テスト完了</div>
            </div>
            <div className="space-y-1">
              {[
                ["Q1: SQLi の被害は?", true],
                ["Q2: UNION-based とは", false],
                ["Q3: 適切な防御策", false],
              ].map(([q, done]) => (
                <div
                  key={q as string}
                  className="flex items-center gap-2 text-[10.5px] p-1.5 bg-surf2 border border-bd rounded"
                >
                  <span style={{ color: done ? "var(--g)" : "var(--t3)" }}>
                    {done ? "✓" : "○"}
                  </span>
                  <span className="flex-1">{q as string}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="関連リソース"
            title="次のステップ"
            icon={<IconLink size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
          >
            <div className="space-y-1.5">
              {[
                ["🧪", "SQLi ラボ — 認証バイパス", "/lab"],
                ["⚑", "CTF: SQL インジェクション", "/ctf/web-03"],
                ["📖", "CSRF 完全ガイド", "/articles/csrf-token"],
                ["🛠", "SQLMap マニュアル", "/tools/sqlmap"],
              ].map(([em, t, href]) => (
                <a
                  key={String(t)}
                  href={href as string}
                  className="flex items-center gap-2 p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                >
                  <span className="text-sm">{em}</span>
                  <span className="flex-1 text-[10.5px] font-medium">{t}</span>
                  <IconArrowRight size={11} className="text-t3" />
                </a>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="アクション"
            title="この記事を"
            icon={<IconNotebook size={13} stroke={1.8} />}
            iconBg="rgba(34,197,94,0.1)"
            iconColor="var(--g)"
          >
            <div className="space-y-1.5">
              {[
                [<IconBookmark size={12} stroke={1.8} key="b" />, "ブックマーク"],
                [<IconCheck size={12} stroke={1.8} key="c" />, "読了マーク"],
                [<IconNotebook size={12} stroke={1.8} key="n" />, "ノートを書く"],
              ].map(([ic, t]) => (
                <button
                  key={String(t)}
                  className="w-full px-2.5 py-2 bg-surf2 border border-bd rounded-md text-[10.5px] text-t1 hover:bg-surf3 hover:border-bd2 transition text-left flex items-center gap-2"
                >
                  {ic}
                  {t}
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
