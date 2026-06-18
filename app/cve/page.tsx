import Link from "next/link";
import { MOCK_CVES } from "@/lib/mock-data";
import { IconSearch, IconExternalLink } from "@tabler/icons-react";

const SEVERITY_COLOR: Record<string, string> = {
  Critical: "#EF4444",
  High: "#F59E0B",
  Medium: "#EAB308",
  Low: "#22C55E",
};

export default function CVEPage() {
  const total = MOCK_CVES.length;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <header className="mb-6">
        <div className="eyebrow mb-1">CVE DATABASE · NVD MIRROR</div>
        <h1 className="text-[22px] sm:text-[28px] font-bold tracking-[-0.02em] mb-2">脆弱性データベース</h1>
        <div className="text-[13px] text-t3 font-mono break-words">
          {total} 件公開 · KEV {MOCK_CVES.filter((c) => c.kev).length} 件 · 最終同期: 2 分前
        </div>
      </header>

      <button
        className="w-full flex items-center gap-2 px-3.5 mb-5 rounded-lg border text-[14px] text-t3 hover:text-t2 transition"
        style={{ minHeight: "44px", background: "var(--surf2)", borderColor: "var(--bd)" }}
      >
        <IconSearch size={15} stroke={1.6} />
        <span>CVE-ID · 製品 · ベンダーで検索</span>
      </button>

      {/* Severity フィルタ */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}>
        {[
          { label: "すべて", count: total, color: "var(--p)" },
          { label: "Critical", count: MOCK_CVES.filter(c => c.severity === "Critical").length, color: SEVERITY_COLOR.Critical },
          { label: "High", count: MOCK_CVES.filter(c => c.severity === "High").length, color: SEVERITY_COLOR.High },
          { label: "Medium", count: MOCK_CVES.filter(c => c.severity === "Medium").length, color: SEVERITY_COLOR.Medium },
          { label: "KEV のみ", count: MOCK_CVES.filter(c => c.kev).length, color: SEVERITY_COLOR.Critical },
        ].map((f, i) => (
          <button
            key={f.label}
            className="flex-shrink-0 px-3 py-1.5 rounded-full font-medium text-[12px] border"
            style={{
              background: i === 0 ? `${f.color}1a` : "var(--surf)",
              borderColor: i === 0 ? `${f.color}40` : "var(--bd)",
              color: i === 0 ? f.color : "var(--t3)",
            }}
          >
            {f.label} {f.count}
          </button>
        ))}
      </div>

      {/* デスクトップ: テーブル */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border" style={{ borderColor: "var(--bd)" }}>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left" style={{ background: "var(--surf2)" }}>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold">CVE ID</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold">Severity</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold">CVSS</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold">Vendor</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold">Published</th>
              <th className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider text-t3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CVES.map((c) => {
              const color = SEVERITY_COLOR[c.severity] ?? "#71717A";
              return (
                <tr
                  key={c.id}
                  className="border-t hover:bg-surf2 transition-colors cursor-pointer"
                  style={{ borderColor: "var(--bd)" }}
                  onClick={() => {}}
                >
                  <td className="px-3 py-3">
                    <Link href={`/cve/${c.id}`} className="font-mono text-[12.5px] font-semibold text-brand-purple no-underline hover:underline">
                      {c.id}
                    </Link>
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                      style={{ background: `${color}1a`, color: color }}>
                      {c.severity}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono text-[13px] font-bold" style={{ color }}>
                    {c.cvss}
                  </td>
                  <td className="px-3 py-3 text-t1">{c.vendor}</td>
                  <td className="px-3 py-3 font-mono text-[12px] text-t3">{c.published}</td>
                  <td className="px-3 py-3">
                    {c.kev && (
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: "rgba(239,68,68,0.1)", color: "var(--r)", border: "1px solid rgba(239,68,68,0.3)" }}>
                        KEV
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* モバイル: リスト */}
      <div className="sm:hidden divide-y" style={{ borderColor: "var(--bd)" }}>
        {MOCK_CVES.map((c) => {
          const color = SEVERITY_COLOR[c.severity] ?? "#71717A";
          return (
            <Link
              key={c.id}
              href={`/cve/${c.id}`}
              className="block py-3.5 no-underline group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[13px] font-bold text-brand-purple break-all min-w-0">
                  {c.id}
                </span>
                {c.kev && (
                  <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ background: "rgba(239,68,68,0.1)", color: "var(--r)" }}>
                    KEV
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider flex-shrink-0"
                  style={{ background: `${color}1a`, color: color }}>
                  {c.severity}
                </span>
                <span className="font-mono text-[13px] font-bold flex-shrink-0" style={{ color }}>
                  {c.cvss}
                </span>
                <span className="font-mono text-[11px] text-t3 ml-auto flex-shrink-0">{c.published}</span>
              </div>
              <div className="text-[13px] text-t2 break-words">{c.vendor}</div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 text-center text-[12px] text-t3 font-mono">
        Source: NVD / CISA KEV · 最終取得 2 分前
      </div>
    </div>
  );
}
