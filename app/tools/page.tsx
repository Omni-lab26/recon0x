import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { LivePill } from "@/components/home/LivePill";
import {
  IconTool,
  IconSearch,
  IconStar,
  IconBookmark,
  IconFlame,
  IconRoute,
} from "@tabler/icons-react";

const CATEGORIES = [
  ["偵察", "#22C55E", 3, "🔍"],
  ["スキャン", "#00D4FF", 1, "📡"],
  ["Web", "#2B7FFF", 2, "🐛"],
  ["エクスプロイト", "#EF4444", 1, "⚔️"],
  ["パスワード", "#F59E0B", 2, "🔑"],
  ["ネット解析", "#8B5CF6", 2, "📊"],
  ["フォレンジック", "#F4564A", 2, "🔬"],
] as const;

const FEATURED_TOOLS = [
  ["🔍", "Nmap", "スキャン", "#22C55E", "GPL", "★★★★★", "2.8M"],
  ["🐛", "Burp Suite", "Web テスト", "#F59E0B", "Pro $449/年", "★★★★★", "1.5M"],
  ["⚔️", "Metasploit", "エクスプロイト", "#EF4444", "Open", "★★★★★", "1.2M"],
  ["📡", "Wireshark", "ネット解析", "#00D4FF", "GPL", "★★★★☆", "900K"],
  ["🔓", "Gobuster", "偵察", "#8B5CF6", "MIT", "★★★★☆", "450K"],
  ["🔑", "John the Ripper", "パスワード", "#F4564A", "GPL", "★★★★☆", "380K"],
  ["💉", "SQLMap", "Web テスト", "#00D4FF", "GPL", "★★★★☆", "520K"],
  ["⚡", "Hashcat", "パスワード", "#F59E0B", "MIT", "★★★★☆", "420K"],
  ["📶", "Aircrack-ng", "ネット解析", "#22C55E", "GPL", "★★★☆☆", "290K"],
] as const;

export default function ToolsPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="SECURITY TOOLBOX · OPERATOR ARSENAL"
        title={<>プロが使う、業界標準。</>}
        description="Kali Linux 標準搭載のオープンソースツールから、商用のエンタープライズ製品まで。学習段階に応じた選び方をガイドします。"
        live={{ label: "ARSENAL READY" }}
        stats={[
          { label: "ツール", value: "9 / 50+", color: "var(--a)", delta: "段階公開" },
          { label: "カテゴリ", value: "7" },
          { label: "OSS / 無料", value: "8" },
          { label: "商用", value: "1" },
          { label: "あなたの使用", value: "0" },
          { label: "ブックマーク", value: "0" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        {/* ROW 1: Featured tool spotlight (cols 1-8) + Top picks Pro Stack (cols 9-12) */}
        <div
          className="col-span-8 p-5 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(34,197,94,0.05),transparent 60%), var(--surf)",
            borderColor: "rgba(34,197,94,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <LivePill size="sm" label="SPOTLIGHT" />
            <span className="eyebrow" style={{ color: "var(--a)" }}>
              今週のフィーチャー
            </span>
            <span className="ml-auto font-mono text-[10px] text-t3">
              <IconStar size={10} className="inline mr-1 text-brand-amber" />
              2.8M 利用者
            </span>
          </div>
          <div className="grid grid-cols-2 gap-5 items-center">
            <div>
              <div className="text-[26px] font-semibold tracking-[-0.025em] mb-1 flex items-center gap-3">
                <span className="text-[32px]">🔍</span>
                Nmap
              </div>
              <p className="text-[12.5px] text-t2 leading-[1.65] mb-3">
                Network Mapper — ポートスキャナーの代名詞。25 年間、世界中のセキュリティ専門家の最初のツールとして使われ続けています。
              </p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <MiniStat label="作者" value="G. Lyon" color="var(--t1)" />
                <MiniStat label="ライセンス" value="GPL v2" color="var(--g)" />
                <MiniStat label="評価" value="★★★★★" color="var(--a)" />
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg font-semibold text-[12px] text-black cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg,#22C55E,#16A34A)",
                    boxShadow: "0 4px 16px rgba(34,197,94,0.25)",
                  }}
                >
                  詳細 →
                </button>
                <button className="px-3.5 py-2 bg-surf2 border border-bd2 rounded-lg text-[11.5px] text-t1 hover:bg-surf3 transition">
                  公式
                </button>
              </div>
            </div>
            <div
              className="rounded-lg border border-bd p-3 font-mono text-[10.5px] leading-[1.85]"
              style={{ background: "#020203" }}
            >
              <div className="text-t3"># 基本スキャン</div>
              <div>
                <span className="text-brand-green">recon@lab</span>
                <span className="text-brand-cyan">:~$</span> nmap -sV target
              </div>
              <div className="text-t3 mt-1.5"># 全ポート + OS 検出</div>
              <div>
                <span className="text-brand-green">recon@lab</span>
                <span className="text-brand-cyan">:~$</span> nmap -p- -O 10.10
              </div>
              <div className="text-t3 mt-1.5"># NSE 脆弱性検出</div>
              <div>
                <span className="text-brand-green">recon@lab</span>
                <span className="text-brand-cyan">:~$</span> nmap --script vuln
              </div>
              <div className="text-t3 mt-1.5"># 高速サブネット</div>
              <div>
                <span className="text-brand-green">recon@lab</span>
                <span className="text-brand-cyan">:~$</span> nmap -F -T4 192/24
              </div>
            </div>
          </div>
        </div>

        <Panel
          eyebrow="Pro Stack"
          title="業務必携セット"
          icon="⚡"
          iconBg="rgba(245,158,11,0.1)"
          className="col-span-4"
          right={<span className="font-mono text-[9.5px] text-t3">4 item</span>}
        >
          <div className="space-y-1.5">
            {[
              ["🛡", "NordVPN", "$3.29/月", "VPN"],
              ["☁", "DigitalOcean", "$6/月〜", "VPS"],
              ["🎯", "Burp Suite Pro", "$449/年", "Web"],
              ["📚", "HackTheBox VIP", "$15/月", "演習"],
            ].map(([em, n, p, c]) => (
              <a
                key={String(n)}
                href="#"
                className="flex items-center gap-2.5 p-2 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
              >
                <span className="text-base">{em}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold truncate">{n}</div>
                  <div className="font-mono text-[9px] text-t3">{c}</div>
                </div>
                <span className="font-mono text-[9.5px] text-brand-green font-semibold">
                  {p}
                </span>
              </a>
            ))}
          </div>
        </Panel>

        {/* ROW 2: Search + filters (cols 1-12) */}
        <Panel className="col-span-12" hover={false}>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-bg border border-bd rounded-lg">
              <IconSearch size={13} className="text-t3" />
              <span className="text-[12px] text-t3">
                ツール名 · カテゴリ · コマンドで検索
              </span>
            </div>
            <button className="px-3.5 py-2 bg-surf border border-bd rounded-lg text-[11.5px] text-t2 hover:text-t1 transition">
              ソート: 人気
            </button>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              className="px-2.5 py-1 rounded-full font-medium text-[10.5px] cursor-pointer border"
              style={{
                background: "rgba(34,197,94,0.08)",
                borderColor: "rgba(34,197,94,0.25)",
                color: "var(--g)",
              }}
            >
              すべて 9
            </button>
            {CATEGORIES.map(([n, c, count, em]) => (
              <button
                key={n}
                className="px-2.5 py-1 rounded-full font-medium text-[10.5px] cursor-pointer border flex items-center gap-1.5"
                style={{
                  background: "var(--surf)",
                  borderColor: "var(--bd)",
                  color: "var(--t2)",
                }}
              >
                <span>{em}</span>
                <span style={{ color: c }}>{n}</span>
                <span className="font-mono text-[8.5px] text-t3">{count}</span>
              </button>
            ))}
          </div>
        </Panel>

        {/* ROW 3: Categories grid (cols 1-5) + Popularity ranking (cols 6-8) + Workflows (cols 9-12) */}
        <Panel
          eyebrow="カテゴリ"
          title="種類別 · 用途別"
          icon={<IconRoute size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="col-span-5"
        >
          <div className="grid grid-cols-2 gap-1.5">
            {CATEGORIES.map(([n, c, count, em]) => (
              <a
                key={n}
                href="#"
                className="group flex items-center gap-2.5 p-2 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 border"
                  style={{
                    background: `${c}1a`,
                    borderColor: `${c}33`,
                  }}
                >
                  {em}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11.5px] font-semibold leading-tight">
                    {n}
                  </div>
                  <div className="font-mono text-[9px] text-t3 mt-0.5">
                    {count} ツール
                  </div>
                </div>
                <span className="font-mono text-[10px] text-t3">→</span>
              </a>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="人気ランキング"
          title="利用者数 TOP 6"
          icon={<IconFlame size={13} stroke={1.8} />}
          iconBg="rgba(245,158,11,0.1)"
          iconColor="var(--a)"
          className="col-span-3"
        >
          <div className="space-y-1.5">
            {FEATURED_TOOLS.slice(0, 6).map(([em, n, , col, , , users], i) => (
              <div
                key={n}
                className="flex items-center gap-2 p-1.5 bg-surf2 border border-bd rounded-md"
              >
                <span
                  className="font-mono text-[10px] font-bold w-3"
                  style={{ color: i < 3 ? "var(--a)" : "var(--t3)" }}
                >
                  {i + 1}
                </span>
                <span className="text-[12px]">{em}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold truncate" style={{ color: col }}>
                    {n}
                  </div>
                </div>
                <span className="font-mono text-[9px] text-t3">{users}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="ワークフロー"
          title="使い分けガイド"
          icon="🔄"
          iconBg="rgba(139,92,246,0.1)"
          className="col-span-4"
        >
          <div className="space-y-1.5">
            {[
              {
                tx: "外部偵察",
                flow: "Nmap → Gobuster → Burp",
                c: "#22C55E",
              },
              {
                tx: "Web 脆弱性発見",
                flow: "Burp → SQLMap → Manual",
                c: "#2B7FFF",
              },
              {
                tx: "認証情報入手",
                flow: "John → Hashcat → Hydra",
                c: "#F59E0B",
              },
              {
                tx: "侵害後の解析",
                flow: "Wireshark → Volatility",
                c: "#8B5CF6",
              },
            ].map((w) => (
              <div
                key={w.tx}
                className="p-2 bg-surf2 border border-bd rounded-md"
              >
                <div
                  className="text-[10.5px] font-semibold mb-1"
                  style={{ color: w.c }}
                >
                  {w.tx}
                </div>
                <div className="font-mono text-[9.5px] text-t3">{w.flow}</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* ROW 4: Tool catalog (cols 1-8) + Related paths + Bookmarks (cols 9-12) */}
        <Panel
          eyebrow="ツールカタログ"
          title="主要ツール一覧"
          icon={<IconTool size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="col-span-8"
          right={
            <span className="font-mono text-[10.5px] text-t3">
              9 / 50+ 表示中
            </span>
          }
        >
          <div className="grid grid-cols-3 gap-2">
            {FEATURED_TOOLS.map(([em, n, c, col, license, stars, users]) => (
              <a
                key={n}
                href="#"
                className="group p-2.5 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[14px] flex-shrink-0 border"
                    style={{
                      background: `${col}1a`,
                      borderColor: `${col}33`,
                    }}
                  >
                    {em}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold leading-tight">
                      {n}
                    </div>
                    <div className="font-mono text-[9px] text-t3 mt-0.5">{c}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-bd">
                  <span className="font-mono text-[9.5px] text-brand-amber">
                    {stars}
                  </span>
                  <span className="font-mono text-[9px] text-t3">{users}</span>
                </div>
              </a>
            ))}
          </div>
        </Panel>

        <div className="col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="関連学習パス"
            title="ツール × 学習"
            icon={<IconRoute size={13} stroke={1.8} />}
            iconBg="rgba(34,197,94,0.1)"
            iconColor="var(--g)"
          >
            <div className="space-y-1.5">
              {[
                ["Network Recon", "Nmap, Gobuster", "/learn"],
                ["Web 脆弱性発見", "Burp, SQLMap", "/learn"],
                ["パスワード解析", "John, Hashcat", "/learn"],
                ["フォレンジック", "Volatility, Autopsy", "/learn"],
              ].map(([t, tools, href]) => (
                <a
                  key={t}
                  href={href}
                  className="block p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                >
                  <div className="text-[11px] font-semibold mb-0.5">{t}</div>
                  <div className="font-mono text-[9.5px] text-t3">{tools}</div>
                </a>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="ブックマーク"
            title="マイツール"
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
            eyebrow="利用統計"
            title="あなたの傾向"
            icon="📊"
            iconBg="rgba(0,212,255,0.1)"
          >
            <div className="space-y-1.5">
              {[
                ["よく使うツール", "—"],
                ["カテゴリ偏り", "—"],
                ["最終利用", "—"],
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
