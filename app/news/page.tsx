import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { LivePill } from "@/components/home/LivePill";
import { MOCK_NEWS } from "@/lib/mock-data";
import { IconNews, IconSearch, IconRss, IconBookmark } from "@tabler/icons-react";

const SOURCES = [
  { name: "CISA Alerts", color: "#EF4444", priority: "official", count: 12 },
  { name: "The Hacker News", color: "#F59E0B", priority: "media", count: 28 },
  { name: "Krebs on Security", color: "#22C55E", priority: "media", count: 8 },
  { name: "BleepingComputer", color: "#00D4FF", priority: "media", count: 19 },
  { name: "Schneier on Security", color: "#8B5CF6", priority: "blog", count: 4 },
  { name: "JVN (日本)", color: "#EC4899", priority: "official", count: 11 },
];

export default function NewsPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="SECURITY NEWS · MULTI-SOURCE FEED"
        title={<>現在進行形の脅威を、追う。</>}
        description="CISA · The Hacker News · Krebs on Security · JVN など主要セキュリティメディアの最新情報を集約。"
        live={{ label: "FETCHING · 5分間隔" }}
        stats={[
          { label: "ソース", value: "6" },
          { label: "今日の記事", value: "82", color: "var(--c)" },
          { label: "未読", value: "47", color: "var(--a)" },
          { label: "KEV 通知", value: "4", color: "var(--r)" },
          { label: "ブックマーク", value: "12" },
          { label: "次の更新", value: "00:02:34" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12" hover={false}>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-bg border border-bd rounded-lg">
              <IconSearch size={13} className="text-t3" />
              <span className="text-[12px] text-t3">
                キーワード · CVE-ID · ベンダー · ソース名で検索
              </span>
            </div>
            <div className="flex gap-1.5">
              {[
                ["すべて", true, "82"],
                ["ランサムウェア", false, "8"],
                ["ゼロデイ", false, "3"],
                ["APT", false, "5"],
                ["規制", false, "4"],
              ].map(([l, active, n]) => (
                <button
                  key={String(l)}
                  className="px-3 py-1.5 rounded-full font-medium text-[11px] cursor-pointer border flex items-center gap-1.5"
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
                  <span className="font-mono text-[9px] text-t3">{n as string}</span>
                </button>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          eyebrow="ニュースフィード"
          title="最新のセキュリティ情報"
          icon={<IconNews size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="col-span-8"
          right={<LivePill size="sm" />}
        >
          <div className="space-y-2">
            {MOCK_NEWS.map((n) => (
              <a
                key={n.title}
                href="#"
                className="block p-3 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-12 rounded-full flex-shrink-0"
                    style={{ background: n.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-[0.04em]"
                        style={{
                          background: `${n.color}1a`,
                          borderColor: `${n.color}33`,
                          color: n.color,
                        }}
                      >
                        {n.category}
                      </span>
                      <span className="font-mono text-[9.5px] text-t2">
                        {n.source}
                      </span>
                      <span className="font-mono text-[9.5px] text-t3 ml-auto">
                        {n.time}
                      </span>
                    </div>
                    <div className="text-[13px] font-semibold leading-snug">
                      {n.title}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Panel>

        <div className="col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="ソース"
            title="連携メディア"
            icon={<IconRss size={13} stroke={1.8} />}
            iconBg="rgba(245,158,11,0.1)"
            iconColor="var(--a)"
          >
            <div className="space-y-1.5">
              {SOURCES.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2.5 p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition cursor-pointer"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: s.color }}
                  />
                  <span className="text-[11px] flex-1 font-medium">{s.name}</span>
                  <span className="font-mono text-[10px] text-t3">{s.count}</span>
                  <span
                    className="font-mono text-[8.5px] px-1.5 py-0.5 rounded border uppercase"
                    style={{
                      background:
                        s.priority === "official"
                          ? "rgba(239,68,68,0.08)"
                          : "var(--surf2)",
                      borderColor:
                        s.priority === "official"
                          ? "rgba(239,68,68,0.22)"
                          : "var(--bd2)",
                      color: s.priority === "official" ? "var(--r)" : "var(--t3)",
                    }}
                  >
                    {s.priority === "official" ? "公式" : s.priority === "media" ? "M" : "B"}
                  </span>
                </div>
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
            <div className="space-y-1.5">
              {[
                ["MOVEit Transfer の新 RCE", "CISA"],
                ["EU AI Act 詳細", "Schneier"],
                ["Burp 拡張機能まとめ", "BleepingComputer"],
              ].map(([t, src]) => (
                <a
                  key={String(t)}
                  href="#"
                  className="block p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                >
                  <div className="text-[11px] font-semibold mb-0.5 line-clamp-1">
                    {t}
                  </div>
                  <div className="font-mono text-[9px] text-t3">{src}</div>
                </a>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="統計"
            title="フィード概要"
            icon="📊"
            iconBg="rgba(34,197,94,0.1)"
          >
            <div className="space-y-1.5">
              {[
                ["今日", "82 記事"],
                ["今週", "412 記事"],
                ["KEV 通知", "4 件"],
                ["平均更新間隔", "12 分"],
                ["最終取得", "2 分前"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex items-center justify-between text-[11px] py-1 border-b border-bd last:border-0"
                >
                  <span className="text-t2">{l}</span>
                  <span className="font-mono font-semibold text-t1">{v}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
