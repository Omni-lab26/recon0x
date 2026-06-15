import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { MOCK_TOOLS } from "@/lib/mock-data";
import { LivePill } from "@/components/home/LivePill";
import {
  IconArrowLeft,
  IconExternalLink,
  IconBookmark,
  IconTerminal2,
  IconRoute,
  IconActivity,
  IconStar,
} from "@tabler/icons-react";

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const tool = MOCK_TOOLS.find((t) => t.id === params.id) ?? MOCK_TOOLS[0];

  return (
    <div className="max-w-[1400px] mx-auto">
      <a
        href="/tools"
        className="inline-flex items-center gap-1.5 text-[12px] text-t2 hover:text-t1 transition mb-3 no-underline"
      >
        <IconArrowLeft size={13} stroke={1.8} />
        Toolbox に戻る
      </a>

      <OpsHeader
        eyebrow={`TOOL · ${tool.name.toUpperCase()}`}
        title={
          <>
            <span>{tool.emoji}</span> {tool.name}
            <span className="text-t3 font-medium text-[18px]"> · {tool.category}</span>
          </>
        }
        description={tool.description}
        live={{ label: `${tool.users} USERS` }}
        stats={[
          { label: "ライセンス", value: tool.license, color: "var(--g)" },
          { label: "カテゴリ", value: tool.category, color: tool.color },
          { label: "評価", value: tool.rating, color: "var(--a)" },
          { label: "利用者", value: tool.users, color: "var(--c)" },
          { label: "OS", value: "Linux/Mac/Win" },
          { label: "Kali 標準", value: "✓ 同梱", color: "var(--g)" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        {/* ROW 1: Hero with terminal (cols 1-8) + Install (cols 9-12) */}
        <div
          className="col-span-8 p-5 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(0,212,255,0.04),transparent 60%), var(--surf)",
            borderColor: "var(--bd2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <LivePill size="sm" label="ARSENAL READY" color="cyan" />
            <span className="font-mono text-[10.5px] text-t3">
              ▸ TOOL-{tool.name.toUpperCase()} · {tool.license}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-[40px] leading-none">{tool.emoji}</div>
            <div>
              <div className="text-[26px] font-semibold tracking-[-0.025em] leading-none mb-1">
                {tool.name}
              </div>
              <div className="font-mono text-[11px] text-brand-amber">
                {tool.rating} · {tool.users} users
              </div>
            </div>
          </div>
          <p className="text-[13px] text-t2 leading-[1.65] mb-4 max-w-[700px]">
            {tool.description}
          </p>

          <div
            className="rounded-lg border border-bd p-3 font-mono text-[11px] leading-[1.85] mb-4"
            style={{ background: "#020203" }}
          >
            <div className="text-t3"># 基本コマンド</div>
            <div className="mt-1">
              <span className="text-brand-green">recon@lab</span>
              <span className="text-brand-cyan">:~$</span>
              <span className="text-t1"> {tool.cmd}</span>
            </div>
            <div className="text-t3 mt-1.5"># ヘルプ</div>
            <div className="mt-1">
              <span className="text-brand-green">recon@lab</span>
              <span className="text-brand-cyan">:~$</span>
              <span className="text-t1"> {tool.id} --help</span>
            </div>
            <div className="text-t3 mt-1.5"># バージョン</div>
            <div className="mt-1">
              <span className="text-brand-green">recon@lab</span>
              <span className="text-brand-cyan">:~$</span>
              <span className="text-t1"> {tool.id} --version</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <MiniStat label="作者" value={tool.id === "nmap" ? "G. Lyon" : "—"} color="var(--t1)" />
            <MiniStat label="初版" value="1997" color="var(--c)" />
            <MiniStat label="最新" value="2026.1" color="var(--g)" />
            <MiniStat label="GitHub ★" value="45k" color="var(--a)" />
          </div>
        </div>

        <Panel
          eyebrow="インストール"
          title="クイックセットアップ"
          icon={<IconTerminal2 size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="col-span-4"
        >
          <div className="space-y-1.5">
            {[
              ["Kali Linux", "✓ 標準搭載", "var(--g)"],
              ["macOS", `brew install ${tool.id}`, "var(--c)"],
              ["Ubuntu/Debian", `sudo apt install ${tool.id}`, "var(--c)"],
              ["Arch", `pacman -S ${tool.id}`, "var(--c)"],
              ["公式サイト", `${tool.id}.org`, "var(--p)"],
            ].map(([n, v, c]) => (
              <div
                key={n}
                className="p-2 bg-surf2 border border-bd rounded-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[10.5px] font-semibold">{n}</div>
                  <span style={{ color: c }} className="font-mono text-[9px] font-semibold">
                    ●
                  </span>
                </div>
                <code className="font-mono text-[9.5px] text-t2 block">{v}</code>
              </div>
            ))}
          </div>
        </Panel>

        {/* ROW 2: Use cases + Related labs + Related paths */}
        <Panel
          eyebrow="ユースケース"
          title="このツールが活きる場面"
          icon={<IconActivity size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="col-span-5"
        >
          <div className="space-y-1.5">
            {[
              ["外部偵察", "ターゲットの稼働ポート・サービスを特定", "var(--g)", "頻繁"],
              ["脆弱性スキャン", "NSE スクリプトで既知の弱点を検出", "var(--c)", "頻繁"],
              ["内部探索", "侵害後のラテラルムーブメント", "var(--p)", "中"],
              ["インシデント対応", "侵害範囲・被害状況の特定", "var(--a)", "稀"],
              ["コンプライアンス", "PCI-DSS · ISO27001 スキャン要件", "var(--r)", "定期"],
            ].map(([t, sub, c, freq]) => (
              <div
                key={t as string}
                className="p-2 bg-surf2 border border-bd rounded-md"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[11px] font-semibold flex-1"
                    style={{ color: c }}
                  >
                    {t}
                  </span>
                  <span className="font-mono text-[8.5px] text-t3">{freq}</span>
                </div>
                <div className="font-mono text-[9.5px] text-t3">{sub}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="関連ラボ"
          title="このツールで学べる演習"
          icon="🧪"
          iconBg="rgba(245,158,11,0.1)"
          className="col-span-3"
        >
          <div className="space-y-1.5">
            {[
              ["RECON-01", "ネットワーク偵察", "#22C55E"],
              ["WEB-01", "Web 侵入テスト", "#2B7FFF"],
              ["FORENSIC-01", "ログ解析", "#F59E0B"],
            ].map(([id, t, c]) => (
              <a
                key={String(id)}
                href="/lab"
                className="block p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="font-mono text-[8.5px] font-semibold px-1.5 py-0.5 rounded border"
                    style={{
                      background: `${c}1a`,
                      borderColor: `${c}33`,
                      color: c as string,
                    }}
                  >
                    {id}
                  </span>
                </div>
                <div className="text-[11px] font-semibold">{t}</div>
              </a>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="学習パス"
          title="このツールに繋がる路"
          icon={<IconRoute size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="col-span-4"
        >
          <div className="space-y-1.5">
            {[
              ["Linux 基礎", "L1〜L3", "60%", "var(--g)"],
              ["ネットワーク偵察", "L2〜L4", "30%", "var(--c)"],
              ["Web セキュリティ", "L3〜L5", "0%", "var(--a)"],
            ].map(([t, sub, pct, c]) => (
              <a
                key={String(t)}
                href="/learn"
                className="block p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold">{t}</span>
                  <span
                    className="font-mono text-[9.5px] font-semibold"
                    style={{ color: c }}
                  >
                    {pct}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-t3">{sub}</span>
                  <div className="flex-1 h-[2px] bg-surf3 rounded-full overflow-hidden">
                    <div
                      className="h-full"
                      style={{ width: pct as string, background: c as string }}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Panel>

        {/* ROW 3: Tool combinations + Stats + Actions */}
        <Panel
          eyebrow="ツール連携"
          title="一緒に使うとよい"
          icon="🔄"
          iconBg="rgba(0,212,255,0.1)"
          className="col-span-5"
        >
          <div className="grid grid-cols-2 gap-1.5">
            {MOCK_TOOLS.filter((t) => t.id !== tool.id)
              .slice(0, 4)
              .map((t) => (
                <a
                  key={t.id}
                  href={`/tools/${t.id}`}
                  className="flex items-center gap-2 p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                >
                  <span className="text-base">{t.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold">{t.name}</div>
                    <div className="font-mono text-[9px] text-t3">{t.category}</div>
                  </div>
                  <span className="font-mono text-[9px] text-brand-amber">
                    {t.users}
                  </span>
                </a>
              ))}
          </div>
        </Panel>

        <Panel
          eyebrow="プラットフォーム統計"
          title="このツールの注目度"
          icon={<IconStar size={13} stroke={1.8} />}
          iconBg="rgba(245,158,11,0.1)"
          iconColor="var(--a)"
          className="col-span-3"
        >
          <div className="space-y-1.5">
            {[
              ["ブックマーク", "1,247"],
              ["関連 CTF", "8"],
              ["関連記事", "12"],
              ["メンション", "234"],
              ["人気スコア", "98 / 100"],
            ].map(([l, v]) => (
              <div
                key={l}
                className="flex items-center justify-between text-[10.5px] py-1 border-b border-bd last:border-0"
              >
                <span className="text-t3">{l}</span>
                <span className="font-mono font-semibold text-t1">{v}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="アクション"
          title="このツールを"
          icon={<IconBookmark size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="col-span-4"
        >
          <div className="space-y-1.5">
            <button className="w-full px-3 py-2 bg-surf2 border border-bd rounded-md text-[11px] text-t1 hover:bg-surf3 hover:border-bd2 transition text-left flex items-center gap-2">
              <IconBookmark size={11} stroke={1.8} />
              ブックマークに追加
            </button>
            <button className="w-full px-3 py-2 bg-surf2 border border-bd rounded-md text-[11px] text-t1 hover:bg-surf3 hover:border-bd2 transition text-left flex items-center gap-2">
              ✓ 使用済みマーク
            </button>
            <a
              href="#"
              className="w-full px-3 py-2 bg-surf2 border border-bd rounded-md text-[11px] text-t1 hover:bg-surf3 hover:border-bd2 transition text-left flex items-center gap-2 no-underline"
            >
              <IconExternalLink size={11} stroke={1.8} />
              公式サイトを開く
            </a>
          </div>
        </Panel>
      </div>
    </div>
  );
}
