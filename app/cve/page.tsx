import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { Sparkline } from "@/components/ui/Sparkline";
import { LivePill } from "@/components/home/LivePill";
import { MOCK_CVES } from "@/lib/mock-data";
import {
  IconShieldExclamation,
  IconSearch,
  IconAlertTriangle,
  IconClock,
  IconBuilding,
  IconActivity,
} from "@tabler/icons-react";

export default function CVEPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="CVE DATABASE · NVD + CISA KEV · ANALYST WORKSTATION"
        title={
          <>
            脆弱性インテリジェンス。
            <span className="text-t3 font-medium"> リアルタイム同期。</span>
          </>
        }
        description="National Vulnerability Database と CISA Known Exploited Vulnerabilities を 5 分ごとに同期。重要な脆弱性を見逃しません。"
        live={{ label: "LIVE · NVD/KEV · 47 NEW/24H" }}
        stats={[
          { label: "CRITICAL", value: "4", color: "var(--r)" },
          { label: "HIGH", value: "12", color: "var(--a)" },
          { label: "MEDIUM", value: "28", color: "var(--c)" },
          { label: "LOW", value: "8", color: "var(--g)" },
          { label: "KEV", value: "8", color: "var(--r)" },
          { label: "LAST SYNC", value: "17:42 UTC" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        {/* ROW 1: Featured Critical CVE (cols 1-8) + Severity overview (cols 9-12) */}
        <div
          className="col-span-8 p-5 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(239,68,68,0.06),transparent 50%), var(--surf)",
            borderColor: "rgba(239,68,68,0.25)",
          }}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className="font-mono text-[10px] font-semibold px-2 py-1 rounded border"
              style={{
                background: "rgba(239,68,68,0.12)",
                borderColor: "rgba(239,68,68,0.28)",
                color: "var(--r)",
              }}
            >
              ⚠ CRITICAL 9.8
            </span>
            <span
              className="font-mono text-[10px] font-semibold px-2 py-1 rounded border"
              style={{
                background: "rgba(239,68,68,0.1)",
                borderColor: "rgba(239,68,68,0.22)",
                color: "var(--r)",
              }}
            >
              🔴 CISA KEV
            </span>
            <span
              className="font-mono text-[10px] font-semibold px-2 py-1 rounded border"
              style={{
                background: "var(--surf2)",
                borderColor: "var(--bd2)",
                color: "var(--t2)",
              }}
            >
              RCE · 認証バイパス
            </span>
            <span className="ml-auto font-mono text-[10px] text-t3">
              公開 4 時間前 · パッチ 2 時間前
            </span>
          </div>
          <div
            className="font-mono text-[26px] font-semibold mb-1.5 leading-none"
            style={{ color: "var(--r)", letterSpacing: "-0.02em" }}
          >
            CVE-2026-1024
          </div>
          <p className="text-[13px] text-t1 leading-[1.65] mb-3 max-w-[700px]">
            Apache HTTP Server (httpd 2.4.49 以前) の認証バイパス脆弱性。細工された{" "}
            <code className="font-mono bg-surf2 px-1.5 py-0.5 rounded text-brand-cyan text-[11px]">
              Range
            </code>{" "}
            ヘッダにより、認証メカニズムを完全に回避して任意のコードを実行可能。CISA KEV に追加済みで、能動的な攻撃が確認されています。
          </p>
          <div className="grid grid-cols-4 gap-2 mb-3">
            <MiniStat label="CVSS Base" value="9.8/10" color="var(--r)" delta="Network/Low" />
            <MiniStat label="攻撃複雑度" value="Low" color="var(--r)" />
            <MiniStat label="認証要件" value="None" color="var(--r)" />
            <MiniStat label="影響" value="C/I/A 全" color="var(--r)" />
          </div>
          <div className="flex gap-2">
            <a
              href="/cve/CVE-2026-1024"
              className="px-4 py-2 rounded-lg font-semibold text-[12px] text-black cursor-pointer no-underline"
              style={{
                background: "linear-gradient(135deg,#22C55E,#16A34A)",
                boxShadow: "0 4px 16px rgba(34,197,94,0.25)",
              }}
            >
              詳細を見る →
            </a>
            <button className="px-3.5 py-2 bg-surf2 border border-bd2 rounded-lg text-[11.5px] text-t1 hover:bg-surf3 transition">
              パッチ情報
            </button>
            <button className="ml-auto px-3.5 py-2 bg-surf border border-bd rounded-lg text-[11.5px] text-t2 hover:text-t1 transition">
              🔖 追跡
            </button>
          </div>
        </div>

        <Panel
          eyebrow="深刻度オーバービュー"
          title="現在のリスク状況"
          icon={<IconAlertTriangle size={13} stroke={1.8} />}
          iconBg="rgba(239,68,68,0.1)"
          iconColor="var(--r)"
          className="col-span-4"
          right={<LivePill size="sm" />}
        >
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            <MiniStat label="CRITICAL" value="4" color="var(--r)" delta="↑ 2 / 24h" deltaColor="var(--r)" />
            <MiniStat label="HIGH" value="12" color="var(--a)" delta="↑ 4" deltaColor="var(--a)" />
            <MiniStat label="MEDIUM" value="28" color="var(--c)" delta="↑ 6" />
            <MiniStat label="LOW" value="8" color="var(--g)" delta="↑ 1" />
          </div>
          <div className="pt-2 border-t border-bd">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-t2">KEV (能動攻撃確認)</span>
              <span className="font-mono font-bold text-brand-red">8</span>
            </div>
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-t2">パッチ未公開</span>
              <span className="font-mono font-bold text-brand-amber">3</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-t2">CISA Alert</span>
              <span className="font-mono font-bold text-brand-red">2</span>
            </div>
          </div>
        </Panel>

        {/* ROW 2: Search + filter (cols 1-12) */}
        <Panel className="col-span-12" hover={false}>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-bg border border-bd rounded-lg">
              <IconSearch size={13} className="text-t3" />
              <span className="text-[12px] text-t3">
                CVE-ID · ベンダー · 製品名 · CWE で検索
              </span>
            </div>
            <button className="px-3.5 py-2 bg-surf border border-bd rounded-lg text-[11.5px] text-t2 hover:text-t1 hover:border-bd2 transition">
              CSV 出力
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            {[
              ["すべて 52", true],
              ["CRITICAL 4", false],
              ["HIGH 12", false],
              ["MEDIUM 28", false],
              ["LOW 8", false],
              ["🔴 KEV のみ 8", false],
              ["未パッチ 3", false],
              ["RCE 系 6", false],
            ].map(([l, active]) => (
              <button
                key={String(l)}
                className="px-2.5 py-1 rounded-full font-medium text-[10.5px] cursor-pointer border"
                style={
                  active
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
                {l as string}
              </button>
            ))}
          </div>
        </Panel>

        {/* ROW 3: CVE table (cols 1-8) + Right rail (cols 9-12) */}
        <Panel
          eyebrow="フィード"
          title="直近の脆弱性"
          icon={<IconShieldExclamation size={13} stroke={1.8} />}
          iconBg="rgba(239,68,68,0.1)"
          iconColor="var(--r)"
          className="col-span-8"
          right={
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9.5px] text-t3">
                <IconClock size={10} className="inline mr-1" />
                5 分間隔自動更新
              </span>
              <LivePill size="sm" />
            </div>
          }
          noPadding
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {[
                  "CVE ID",
                  "CVSS",
                  "深刻度",
                  "ベンダー / 製品",
                  "概要",
                  "公開日",
                  "KEV",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-2 text-[9px] font-mono font-semibold text-t3 border-b border-bd uppercase tracking-[0.06em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_CVES.map((cve) => {
                const cvssNum = parseFloat(cve.cvss);
                const cvssColor =
                  cvssNum >= 9
                    ? "var(--r)"
                    : cvssNum >= 7
                    ? "var(--a)"
                    : cvssNum >= 4
                    ? "var(--c)"
                    : "var(--g)";
                const sevColor =
                  cve.severity === "Critical"
                    ? "var(--r)"
                    : cve.severity === "High"
                    ? "var(--a)"
                    : cve.severity === "Medium"
                    ? "var(--c)"
                    : "var(--g)";
                return (
                  <tr
                    key={cve.id}
                    className="hover:bg-surf2 transition-colors cursor-pointer"
                  >
                    <td className="px-3 py-2 border-b border-bd">
                      <a
                        href={`/cve/${cve.id}`}
                        className="font-mono text-[11px] font-semibold text-brand-cyan no-underline hover:underline"
                      >
                        {cve.id}
                      </a>
                    </td>
                    <td className="px-3 py-2 border-b border-bd">
                      <span
                        className="font-mono text-[11.5px] font-bold"
                        style={{ color: cvssColor }}
                      >
                        {cve.cvss}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-b border-bd">
                      <span
                        className="font-mono text-[9.5px] font-semibold px-1.5 py-0.5 rounded border"
                        style={{
                          background: `${sevColor}1a`,
                          borderColor: `${sevColor}40`,
                          color: sevColor,
                        }}
                      >
                        {cve.severity}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-b border-bd">
                      <span className="font-mono text-[10.5px] text-t2">
                        {cve.vendor}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-b border-bd max-w-[280px]">
                      <span className="text-[11px] text-t2 truncate block">
                        {cve.description}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-b border-bd">
                      <span className="font-mono text-[10px] text-t3">
                        2026/{cve.published}
                      </span>
                    </td>
                    <td className="px-3 py-2 border-b border-bd">
                      {cve.kev && (
                        <span
                          className="font-mono text-[8.5px] font-semibold px-1.5 py-0.5 rounded border"
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            borderColor: "rgba(239,68,68,0.22)",
                            color: "var(--r)",
                          }}
                        >
                          🔴
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>

        <div className="col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="ベンダー別影響"
            title="24h 検出数"
            icon={<IconBuilding size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
          >
            <div className="space-y-1.5">
              {[
                ["Microsoft", 8],
                ["Apache", 6],
                ["WordPress", 5],
                ["Cisco", 4],
                ["Drupal", 3],
                ["OpenSSL", 2],
              ].map(([n, c]) => (
                <div key={String(n)} className="flex items-center gap-2">
                  <span className="text-[10.5px] text-t2 flex-1">{n}</span>
                  <div className="flex-1 h-[3px] bg-surf3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-cyan"
                      style={{ width: `${(c as number) * 10}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-t3 w-4 text-right">
                    {c as number}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="トレンド"
            title="今週の動向"
            icon={<IconActivity size={13} stroke={1.8} />}
            iconBg="rgba(245,158,11,0.1)"
            iconColor="var(--a)"
          >
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <MiniStat label="新規" value="47" color="var(--c)" delta="↑ 12" deltaColor="var(--g)" />
              <MiniStat label="KEV" value="4" color="var(--r)" delta="↑ 2" deltaColor="var(--r)" />
            </div>
            <div className="pt-2 border-t border-bd">
              <div className="eyebrow mb-1">過去 7 日 (新規 CVE)</div>
              <Sparkline series={[3, 5, 4, 8, 6, 9, 12]} color="var(--a)" height={24} />
            </div>
          </Panel>

          <Panel
            eyebrow="エクスプロイト状況"
            title="能動攻撃監視"
            icon="⚠"
            iconBg="rgba(239,68,68,0.1)"
          >
            <div className="space-y-1.5">
              {[
                ["KEV カタログ", "8", "var(--r)"],
                ["PoC 公開済", "12", "var(--a)"],
                ["パッチ未公開", "3", "var(--a)"],
                ["観測中の攻撃", "5", "var(--r)"],
              ].map(([l, v, c]) => (
                <div
                  key={l}
                  className="flex items-center justify-between text-[10.5px] py-1 border-b border-bd last:border-0"
                >
                  <span className="text-t2">{l}</span>
                  <span className="font-mono text-[11px] font-bold" style={{ color: c }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="あなたの追跡"
            title="ウォッチリスト"
            icon="🔖"
            iconBg="rgba(139,92,246,0.1)"
          >
            <div className="space-y-1.5">
              {[
                ["CVE-2026-1024", "Apache RCE", "var(--r)"],
                ["CVE-2026-0998", "OpenSSL BoF", "var(--r)"],
                ["CVE-2026-0987", "WordPress XSS", "var(--a)"],
              ].map(([id, sub, c]) => (
                <a
                  key={String(id)}
                  href={`/cve/${id}`}
                  className="block p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                >
                  <div className="font-mono text-[10px] font-semibold" style={{ color: c }}>
                    {id}
                  </div>
                  <div className="font-mono text-[9px] text-t3 mt-0.5">{sub}</div>
                </a>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
