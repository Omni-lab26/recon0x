import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { Sparkline } from "@/components/ui/Sparkline";
import { FIELDS } from "@/lib/tokens";
import { MOCK_ARTICLES } from "@/lib/mock-data";
import { LivePill } from "@/components/home/LivePill";
import {
  IconFileText,
  IconArrowRight,
  IconSearch,
  IconBookmark,
  IconFlame,
  IconClock,
  IconBookUpload,
} from "@tabler/icons-react";

const FIELD_COLOR: Record<string, string> = {
  Web: "#2B7FFF",
  Linux: "#22C55E",
  Network: "#06B6D4",
  Crypto: "#8B5CF6",
  Pwn: "#EF4444",
  Forensic: "#F59E0B",
  OSINT: "#F4564A",
};

export default function ArticlesPage() {
  const popular = [...MOCK_ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5);
  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="ARTICLES LIBRARY · KNOWLEDGE BASE"
        title={<>分野ごとに、深く学ぶ。</>}
        description="入門から実戦まで、各分野の重要トピックを段階的に解説する記事集。Markdown 形式で公開、いつでもオフライン参照可能。"
        live={{ label: `${MOCK_ARTICLES.length} 記事公開中` }}
        stats={[
          { label: "総記事", value: `${MOCK_ARTICLES.length}`, color: "var(--c)" },
          { label: "分野", value: "7" },
          { label: "総閲覧数", value: `${MOCK_ARTICLES.reduce((s, a) => s + a.views, 0).toLocaleString()}` },
          { label: "あなたの読了", value: "0" },
          { label: "ブックマーク", value: "0" },
          { label: "平均読了", value: "16 分" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        <Panel
          eyebrow="検索 · フィルター"
          title="記事を見つける"
          icon={<IconSearch size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="col-span-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-bg border border-bd rounded-lg">
              <IconSearch size={13} className="text-t3" />
              <span className="text-[12px] text-t3">
                タイトル · 著者 · タグ · 本文を検索
              </span>
              <span className="ml-auto font-mono text-[9.5px] text-t3 bg-surf2 border border-bd px-1.5 py-0.5 rounded">
                ⌘K
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <MiniStat label="今週公開" value="3" color="var(--g)" delta="+2 先週比" icon="📝" />
            <MiniStat label="読了 (累計)" value="0" color="var(--c)" delta="本" icon="✓" />
            <MiniStat label="平均ペース" value="—" color="var(--p)" delta="記事 / 週" icon="⚡" />
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-bd">
            <span className="font-mono text-[9.5px] text-t3 mr-1">FILTER:</span>
            {["すべて", "L1", "L2", "L3", "Easy", "Medium", "Hard"].map((l, i) => (
              <button
                key={l}
                className="px-2.5 py-1 rounded-full font-medium text-[10.5px] cursor-pointer border"
                style={
                  i === 0
                    ? {
                        background: "rgba(34,197,94,0.08)",
                        borderColor: "rgba(34,197,94,0.25)",
                        color: "var(--g)",
                      }
                    : {
                        background: "var(--surf)",
                        borderColor: "var(--bd)",
                        color: "var(--t3)",
                      }
                }
              >
                {l}
              </button>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="あなたの読書"
          title="読書進捗"
          icon={<IconBookUpload size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="col-span-4"
          right={<LivePill size="sm" label="TRACKING" color="cyan" />}
        >
          <div className="flex items-baseline gap-2 mb-3">
            <div className="font-mono text-[26px] font-bold text-t3 leading-none">0</div>
            <div className="text-[11px] text-t3">/ {MOCK_ARTICLES.length} 読了</div>
          </div>
          <div className="h-1 bg-surf3 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-brand-purple" style={{ width: "0%" }} />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              ["今週", "0"],
              ["今月", "0"],
              ["累計", "0"],
              ["連続日数", "0"],
            ].map(([l, v]) => (
              <div
                key={l}
                className="flex items-center justify-between text-[10.5px] px-2 py-1.5 bg-surf2 border border-bd rounded-md"
              >
                <span className="text-t3">{l}</span>
                <span className="font-mono font-semibold text-t3">{v}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Field grid (cols 1-8) */}
        <Panel
          eyebrow="カタログ"
          title="分野別 記事一覧"
          icon={<IconFileText size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="col-span-8"
          right={
            <span className="font-mono text-[10.5px] text-t3">
              {MOCK_ARTICLES.length} 記事公開中
            </span>
          }
        >
          <div className="space-y-1.5">
            {FIELDS.map((f) => {
              const fieldArticles = MOCK_ARTICLES.filter(
                (a) => a.field === f.name.split(" ")[0]
              );
              return (
                <div
                  key={f.key}
                  className="border border-bd rounded-lg overflow-hidden hover:border-bd2 transition"
                  style={{ background: `${f.c}03` }}
                >
                  <div className="flex items-center gap-2.5 p-2.5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-[14px] font-semibold flex-shrink-0 border"
                      style={{
                        background: `${f.c}1a`,
                        borderColor: `${f.c}33`,
                        color: f.c,
                      }}
                    >
                      {f.glyph}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[12.5px] font-semibold tracking-[-0.005em]">
                          {f.name}
                        </span>
                        <span className="font-mono text-[8.5px] text-t3">
                          L1〜L5
                        </span>
                      </div>
                      <div className="text-[10.5px] text-t2">{f.desc}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkline
                        series={[1, 1, 2, 3, 3, 4, 4]}
                        color={f.c}
                        height={20}
                        width={50}
                        showLast={false}
                      />
                      <div className="text-right">
                        <div
                          className="font-mono text-[11px] font-semibold"
                          style={{ color: f.c }}
                        >
                          {fieldArticles.length}
                        </div>
                        <div className="font-mono text-[8.5px] text-t3">記事</div>
                      </div>
                      <IconArrowRight size={13} className="text-t3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="eyebrow mt-4 mb-2">最近公開された記事</div>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_ARTICLES.slice(0, 6).map((a) => {
              const color = FIELD_COLOR[a.field] ?? "#22C55E";
              return (
                <a
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="p-3 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-[0.04em]"
                      style={{
                        background: `${color}1a`,
                        borderColor: `${color}33`,
                        color: color,
                      }}
                    >
                      {a.field}
                    </span>
                    <span
                      className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border"
                      style={{
                        background: "var(--surf3)",
                        borderColor: "var(--bd2)",
                        color: "var(--t2)",
                      }}
                    >
                      {a.level}
                    </span>
                    <span className="ml-auto font-mono text-[9.5px] text-t3">
                      {a.readMin} 分
                    </span>
                  </div>
                  <div className="text-[12.5px] font-semibold leading-snug mb-1">
                    {a.title}
                  </div>
                  <div className="flex items-center justify-between font-mono text-[9.5px] text-t3 pt-1.5 border-t border-bd mt-1.5">
                    <span>👁 {a.views.toLocaleString()}</span>
                    <span className="text-brand-green">読む →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </Panel>

        <div className="col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="新着"
            title="最近公開された記事"
            icon={<IconFileText size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
            right={<LivePill size="sm" label="LIVE" />}
          >
            <div className="space-y-1.5">
              {MOCK_ARTICLES.slice(0, 4).map((a) => {
                const color = FIELD_COLOR[a.field] ?? "#22C55E";
                return (
                  <a
                    key={a.slug}
                    href={`/articles/${a.slug}`}
                    className="block p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                  >
                    <div className="text-[11px] font-semibold mb-0.5 line-clamp-1">
                      {a.title}
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-t3">
                      <span style={{ color }}>{a.field}</span>
                      <span>·</span>
                      <span>{a.readMin}分</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </Panel>

          <Panel
            eyebrow="人気"
            title="閲覧数ランキング"
            icon={<IconFlame size={13} stroke={1.8} />}
            iconBg="rgba(245,158,11,0.1)"
            iconColor="var(--a)"
          >
            <div className="space-y-1">
              {popular.map((a, i) => (
                <a
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="flex items-center gap-2 p-1.5 hover:bg-surf2 rounded transition no-underline"
                >
                  <span
                    className="font-mono text-[10px] font-bold text-t3 w-4"
                    style={{ color: i < 3 ? "var(--a)" : "var(--t3)" }}
                  >
                    {i + 1}.
                  </span>
                  <span className="flex-1 text-[10.5px] line-clamp-1">
                    {a.title}
                  </span>
                  <span className="font-mono text-[9px] text-t3">
                    {a.views > 999 ? `${(a.views / 1000).toFixed(1)}k` : a.views}
                  </span>
                </a>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="ブックマーク"
            title="あとで読む"
            icon={<IconBookmark size={13} stroke={1.8} />}
            iconBg="rgba(139,92,246,0.1)"
            iconColor="var(--p)"
          >
            <div className="text-center py-4">
              <div className="text-[11.5px] text-t3 mb-2">未登録</div>
              <a
                href="/login"
                className="inline-block px-3 py-1.5 bg-surf2 border border-bd2 rounded-md text-[11px] font-medium text-t1 hover:bg-surf3 transition no-underline"
              >
                ログイン →
              </a>
            </div>
          </Panel>

          <Panel
            eyebrow="読書統計"
            title="あなたの傾向"
            icon={<IconClock size={13} stroke={1.8} />}
            iconBg="rgba(34,197,94,0.1)"
            iconColor="var(--g)"
          >
            <div className="space-y-1.5">
              {[
                ["好きな分野", "—"],
                ["平均所要", "—"],
                ["完了率", "—"],
                ["最終訪問", "—"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex items-center justify-between text-[10.5px] py-1 border-b border-bd last:border-0"
                >
                  <span className="text-t3">{l}</span>
                  <span className="font-mono font-semibold text-t3">{v}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
