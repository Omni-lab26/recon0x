import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { LivePill } from "@/components/home/LivePill";
import {
  IconArrowLeft,
  IconExternalLink,
  IconBookmark,
  IconAlertTriangle,
  IconBuilding,
  IconHistory,
  IconShieldCheck,
} from "@tabler/icons-react";

export default function CVEDetailPage({ params }: { params: { id: string } }) {
  // For mock pages, treat all CVEs as the featured Apache one
  return (
    <div className="max-w-[1400px] mx-auto">
      <a
        href="/cve"
        className="inline-flex items-center gap-1.5 text-[12px] text-t2 hover:text-t1 transition mb-3 no-underline"
      >
        <IconArrowLeft size={13} stroke={1.8} />
        CVE Database に戻る
      </a>

      <OpsHeader
        eyebrow="VULNERABILITY · CRITICAL · 🔴 CISA KEV"
        title={
          <>
            <span className="text-brand-red font-mono">{params.id}</span>
            <span className="text-t3 font-medium text-[18px]"> · Apache HTTP Server 認証バイパス</span>
          </>
        }
        description="Apache HTTP Server (httpd 2.4.49 以前) の認証バイパス脆弱性。細工された Range ヘッダにより認証メカニズムを完全に回避し、任意コード実行が可能。能動的な攻撃が確認されており、CISA KEV に登録済み。"
        live={{ label: "ACTIVE EXPLOITATION", color: "red" }}
        stats={[
          { label: "CVSS Base", value: "9.8", color: "var(--r)" },
          { label: "深刻度", value: "Critical", color: "var(--r)" },
          { label: "攻撃複雑度", value: "Low", color: "var(--r)" },
          { label: "KEV", value: "登録済", color: "var(--r)" },
          { label: "公開日", value: "6/8" },
          { label: "最終更新", value: "2h 前" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* ROW 1: Main brief (cols 1-8) + CVSS breakdown (cols 9-12) */}
        <div
          className="md:col-span-8 p-5 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(239,68,68,0.06),transparent 50%), var(--surf)",
            borderColor: "rgba(239,68,68,0.25)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <LivePill size="sm" label="NVD SYNC" color="cyan" />
            <span className="font-mono text-[10.5px] text-t3">
              ▸ VULNERABILITY BRIEF · CWE-287 · Path Traversal/RCE
            </span>
          </div>
          <div className="font-mono text-[30px] font-semibold text-brand-red tracking-[-0.025em] mb-3 leading-none">
            {params.id}
          </div>
          <p className="text-[13px] text-t1 leading-[1.75] mb-3">
            Apache HTTP Server 2.4.49 以前のバージョンに存在する{" "}
            <strong className="text-brand-red">認証バイパス + RCE</strong> 脆弱性。
            悪意のある{" "}
            <code className="font-mono bg-surf2 px-1.5 py-0.5 rounded text-brand-cyan text-[11px]">
              Range
            </code>{" "}
            ヘッダにより、要求されたファイル外のリソースへのアクセスが可能。<br />
            <code className="font-mono bg-surf2 px-1.5 py-0.5 rounded text-brand-cyan text-[11px]">
              mod_cgi
            </code>{" "}
            が有効な場合、認証なしで{" "}
            <strong className="text-brand-red">リモートコード実行 (RCE)</strong>{" "}
            まで到達可能。
          </p>

          <div
            className="rounded-lg border border-bd p-3 font-mono text-[10.5px] leading-[1.7] mb-3"
            style={{ background: "#020203" }}
          >
            <div className="text-t3"># PoC リクエスト</div>
            <div className="text-brand-amber">
              GET /cgi-bin/test.sh HTTP/1.1
            </div>
            <div className="text-brand-amber">Host: target.example.com</div>
            <div className="text-brand-red">
              Range: bytes=,5-0,5-1,...,5-7000000
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <MiniStat label="攻撃ベクター" value="Network" color="var(--r)" icon="🎯" />
            <MiniStat label="権限要件" value="None" color="var(--r)" icon="🔑" />
            <MiniStat label="ユーザー操作" value="None" color="var(--r)" icon="👆" />
            <MiniStat label="スコープ" value="Changed" color="var(--r)" icon="🌐" />
          </div>
          <div className="flex gap-2 mt-4">
            <a
              href={`https://nvd.nist.gov/vuln/detail/${params.id}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg font-semibold text-[12px] text-black inline-flex items-center gap-2 no-underline"
              style={{
                background: "linear-gradient(135deg,#22C55E,#16A34A)",
                boxShadow: "0 4px 16px rgba(34,197,94,0.25)",
              }}
            >
              NVD で詳細を見る
              <IconExternalLink size={12} stroke={1.8} />
            </a>
            <button className="px-3.5 py-2 bg-surf2 border border-bd2 rounded-lg text-[11.5px] text-t1 hover:bg-surf3 transition">
              🔖 追跡対象に追加
            </button>
            <button className="px-3.5 py-2 bg-surf border border-bd rounded-lg text-[11.5px] text-t2 hover:text-t1 transition ml-auto">
              📋 コピー
            </button>
          </div>
        </div>

        <Panel
          eyebrow="CVSS 分析"
          title="スコア内訳"
          icon={<IconAlertTriangle size={13} stroke={1.8} />}
          iconBg="rgba(239,68,68,0.1)"
          iconColor="var(--r)"
          className="md:col-span-4"
        >
          <div className="text-center py-3 mb-3 border-b border-bd">
            <div
              className="font-mono text-[44px] font-bold leading-none"
              style={{ color: "var(--r)" }}
            >
              9.8
            </div>
            <div className="text-[10.5px] text-t3 mt-1">CVSS v3.1 Base</div>
          </div>
          <div className="space-y-1.5">
            {[
              ["機密性 (C)", "High", "var(--r)"],
              ["完全性 (I)", "High", "var(--r)"],
              ["可用性 (A)", "High", "var(--r)"],
              ["攻撃複雑度", "Low", "var(--r)"],
              ["必要権限", "None", "var(--r)"],
              ["UI 必要", "None", "var(--r)"],
              ["スコープ", "Changed", "var(--r)"],
            ].map(([l, v, c]) => (
              <div
                key={l}
                className="flex items-center justify-between text-[10.5px] py-0.5"
              >
                <span className="text-t2">{l}</span>
                <span className="font-mono font-semibold" style={{ color: c }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* ROW 2: Affected (cols 1-5) + Timeline (cols 6-8) + Refs (cols 9-12) */}
        <Panel
          eyebrow="影響範囲"
          title="ベンダー · 製品 · バージョン"
          icon={<IconBuilding size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="md:col-span-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
            <MiniStat label="ベンダー" value="Apache" color="var(--c)" />
            <MiniStat label="製品" value="httpd" color="var(--c)" />
            <MiniStat label="バージョン" value="≤ 2.4.49" color="var(--r)" />
            <MiniStat label="CWE" value="CWE-287" color="var(--a)" />
          </div>
          <div className="pt-2 border-t border-bd">
            <div className="eyebrow mb-1.5">影響を受けるバージョン</div>
            <div className="space-y-1">
              {[
                ["2.4.49", "脆弱 (悪用確認)", "var(--r)"],
                ["2.4.48", "脆弱", "var(--r)"],
                ["2.4.47", "脆弱", "var(--r)"],
                ["2.4.50", "修正版", "var(--g)"],
                ["2.4.51 以降", "安全", "var(--g)"],
              ].map(([v, status, c]) => (
                <div
                  key={v}
                  className="flex items-center justify-between text-[10.5px] py-1"
                >
                  <span className="font-mono text-t2">{v}</span>
                  <span className="font-mono font-semibold" style={{ color: c }}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          eyebrow="タイムライン"
          title="脆弱性ライフサイクル"
          icon={<IconHistory size={13} stroke={1.8} />}
          iconBg="rgba(245,158,11,0.1)"
          iconColor="var(--a)"
          className="md:col-span-3"
        >
          <div className="space-y-2 relative pl-3">
            <div
              className="absolute left-1 top-1 bottom-1 w-px"
              style={{ background: "var(--bd2)" }}
            />
            {[
              ["公開", "6/8 14:23 UTC", "var(--c)"],
              ["分析完了", "6/8 18:15 UTC", "var(--c)"],
              ["KEV 追加", "6/9 09:00 UTC", "var(--r)"],
              ["パッチ公開", "6/9 16:42 UTC", "var(--g)"],
              ["能動攻撃確認", "6/10 03:21 UTC", "var(--r)"],
            ].map(([l, v, c]) => (
              <div key={String(l)} className="relative pl-3">
                <div
                  className="absolute -left-[5px] top-1 w-[7px] h-[7px] rounded-full"
                  style={{ background: c, border: "1px solid var(--bd2)" }}
                />
                <div className="text-[10.5px] font-semibold">{l}</div>
                <div className="font-mono text-[9px] text-t3">{v}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="参考リンク"
          title="外部情報源"
          icon={<IconExternalLink size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="md:col-span-4"
        >
          <div className="space-y-1.5">
            {[
              ["NVD", `https://nvd.nist.gov/vuln/detail/${params.id}`, "公式", "var(--c)"],
              ["MITRE CVE", `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${params.id}`, "公式", "var(--c)"],
              ["CISA KEV", "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", "公式", "var(--r)"],
              ["Exploit-DB", "https://www.exploit-db.com/", "PoC", "var(--a)"],
              ["Apache 公式", "https://httpd.apache.org/security/", "ベンダー", "var(--g)"],
            ].map(([n, href, kind, c]) => (
              <a
                key={n}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold">{n}</div>
                  <div
                    className="font-mono text-[9px]"
                    style={{ color: c }}
                  >
                    {kind}
                  </div>
                </div>
                <IconExternalLink size={11} stroke={1.8} className="text-t3" />
              </a>
            ))}
          </div>
        </Panel>

        {/* ROW 3: Mitigation (cols 1-5) + Related (cols 6-8) + Tracking (cols 9-12) */}
        <Panel
          eyebrow="緩和策"
          title="推奨アクション"
          icon={<IconShieldCheck size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="md:col-span-5"
        >
          <div className="space-y-1.5">
            {[
              ["①", "影響バージョンを特定", "全 Apache httpd 2.4.49 以下", "var(--r)"],
              ["②", "公式パッチを適用", "2.4.51 以降にアップグレード必須", "var(--g)"],
              ["③", "回避策の検討", "mod_cgi を無効化 / Range ヘッダ拒否", "var(--a)"],
              ["④", "監視ログ強化", "Range: bytes= を含むリクエストを警告", "var(--c)"],
              ["⑤", "侵害確認", "/cgi-bin/ への異常アクセス調査", "var(--p)"],
            ].map(([n, t, sub, c]) => (
              <div
                key={n as string}
                className="flex items-start gap-2.5 p-2 bg-surf2 border border-bd rounded-md"
              >
                <span
                  className="font-mono text-[12px] font-bold flex-shrink-0"
                  style={{ color: c }}
                >
                  {n}
                </span>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold">{t}</div>
                  <div className="font-mono text-[9.5px] text-t3 mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="関連 CVE"
          title="類似脆弱性"
          icon={<IconBookmark size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="md:col-span-3"
        >
          <div className="space-y-1.5">
            {[
              ["CVE-2021-41773", "9.8", "Apache 2.4.49 PathTrav", "var(--r)"],
              ["CVE-2021-42013", "9.8", "Apache 2.4.50 (回避)", "var(--r)"],
              ["CVE-2022-22720", "9.8", "HTTP Smuggling", "var(--r)"],
            ].map(([id, score, sub, c]) => (
              <a
                key={String(id)}
                href={`/cve/${id}`}
                className="block p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-mono text-[10px] font-semibold text-brand-cyan">
                    {id}
                  </span>
                  <span
                    className="font-mono text-[9.5px] font-bold ml-auto"
                    style={{ color: c }}
                  >
                    {score}
                  </span>
                </div>
                <div className="font-mono text-[9.5px] text-t3 line-clamp-1">
                  {sub}
                </div>
              </a>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="追跡状況"
          title="あなたのアクション"
          icon="📌"
          iconBg="rgba(245,158,11,0.1)"
          className="md:col-span-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
            <MiniStat label="ステータス" value="未追跡" color="var(--t3)" />
            <MiniStat label="閲覧回数" value="3" color="var(--c)" />
          </div>
          <div className="space-y-1.5 pt-2 border-t border-bd">
            <button className="w-full px-3 py-2 bg-surf2 border border-bd rounded-md text-[10.5px] text-t1 hover:bg-surf3 hover:border-bd2 transition text-left flex items-center gap-2">
              <IconBookmark size={11} stroke={1.8} />
              ウォッチリストに追加
            </button>
            <button className="w-full px-3 py-2 bg-surf2 border border-bd rounded-md text-[10.5px] text-t1 hover:bg-surf3 hover:border-bd2 transition text-left flex items-center gap-2">
              🔔 アラート設定
            </button>
            <button className="w-full px-3 py-2 bg-surf2 border border-bd rounded-md text-[10.5px] text-t1 hover:bg-surf3 hover:border-bd2 transition text-left flex items-center gap-2">
              📝 メモを残す
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
