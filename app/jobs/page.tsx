import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { Sparkline } from "@/components/ui/Sparkline";
import { LivePill } from "@/components/home/LivePill";
import {
  IconBriefcase,
  IconMapPin,
  IconCurrencyYen,
  IconArrowRight,
  IconBookmark,
  IconBuilding,
} from "@tabler/icons-react";

const JOBS = [
  {
    title: "セキュリティエンジニア",
    company: "サイバーディフェンス株式会社",
    salary: "年収 600〜800 万円",
    location: "Tokyo",
    type: "フルタイム",
    remote: true,
    tags: ["Web 監査", "Burp Suite", "ペンテスト"],
    posted: "3 日前",
    skill: "ハンター級推奨",
    color: "#22C55E",
  },
  {
    title: "ペネトレーションテスター",
    company: "Red Team Lab",
    salary: "年収 700〜900 万円",
    location: "Remote",
    type: "フルタイム",
    remote: true,
    tags: ["OSCP", "Active Directory", "Pwn"],
    posted: "1 週間前",
    skill: "エキスパート級推奨",
    color: "#EF4444",
  },
  {
    title: "SOC アナリスト (24/365)",
    company: "セキュア・モニタリング合同会社",
    salary: "年収 500〜700 万円",
    location: "Osaka",
    type: "シフト制",
    remote: false,
    tags: ["SIEM", "Splunk", "インシデント対応"],
    posted: "2 日前",
    skill: "解析者級推奨",
    color: "#F59E0B",
  },
  {
    title: "バグバウンティハンター",
    company: "HackerOne 経由",
    salary: "報酬 $1,000〜$10,000 / 件",
    location: "フリーランス",
    type: "業務委託",
    remote: true,
    tags: ["XSS", "SQLi", "RCE"],
    posted: "随時",
    skill: "オペレーター級推奨",
    color: "#8B5CF6",
  },
  {
    title: "クラウドセキュリティエンジニア",
    company: "Tech Pioneers Inc.",
    salary: "年収 800〜1,200 万円",
    location: "Tokyo",
    type: "フルタイム",
    remote: true,
    tags: ["AWS", "Terraform", "IAM"],
    posted: "1 日前",
    skill: "オペレーター級推奨",
    color: "#00D4FF",
  },
  {
    title: "脆弱性診断士",
    company: "セキュリティ・コンサルティング社",
    salary: "年収 550〜750 万円",
    location: "Tokyo / Remote",
    type: "フルタイム",
    remote: true,
    tags: ["ASV", "Web 診断", "報告書作成"],
    posted: "5 日前",
    skill: "ハンター級推奨",
    color: "#22C55E",
  },
];

const FREELANCE = [
  { title: "Web 診断案件 (1ヶ月)", price: "¥1,800,000", client: "金融系 SaaS" },
  { title: "ペンテスト・短期 (2週間)", price: "¥900,000", client: "EC プラットフォーム" },
  { title: "セキュリティ研修講師", price: "¥500,000 / 回", client: "教育機関" },
];

export default function JobsPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="JOBS & FREELANCE · CAREER OPPORTUNITIES"
        title={<>セキュリティ業界の、次の一歩。</>}
        description="国内・海外のセキュリティ求人とフリーランス案件を集約。あなたのスキルレベルに最適な案件を提案します。"
        live={{ label: `${JOBS.length} 件掲載中 · 12 新着` }}
        stats={[
          { label: "総求人数", value: `${JOBS.length}`, color: "var(--c)" },
          { label: "リモート可", value: "5", color: "var(--g)" },
          { label: "フリーランス", value: "3", color: "var(--p)" },
          { label: "平均年収", value: "725万", color: "var(--a)" },
          { label: "あなたの市場価値", value: "¥6,240,000", color: "var(--g)" },
          { label: "応募中", value: "0" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* ROW 1: Market value (cols 1-8) + Skill match (cols 9-12) */}
        <div
          className="md:col-span-8 p-5 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(34,197,94,0.05),rgba(0,212,255,0.03) 60%, var(--surf))",
            borderColor: "var(--bd2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <LivePill size="sm" label="MARKET VALUE" />
            <span className="font-mono text-[10.5px] text-t3">
              ▸ スキルに基づく推定年収・先月比 +12%
            </span>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <div className="eyebrow mb-2">あなたの推定年収</div>
              <div
                className="font-mono text-[42px] font-bold leading-none mb-2"
                style={{
                  background: "linear-gradient(135deg, #22C55E, #00D4FF)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ¥6,240,000
              </div>
              <div className="font-mono text-[11.5px] text-brand-green">
                ↑ 12%（先月比 +¥670,000）
              </div>
            </div>
            <div className="flex-1">
              <Sparkline
                series={[420, 450, 480, 510, 530, 580, 620, 624]}
                color="var(--g)"
                height={72}
              />
              <div className="flex items-center justify-between font-mono text-[9px] text-t3 mt-1">
                <span>2025/11</span>
                <span>2026/06</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-bd mt-4">
            <MiniStat label="Web セキュリティ" value="75%" color="var(--g)" delta="+¥1.8M" deltaColor="var(--g)" />
            <MiniStat label="ペネトレ" value="45%" color="var(--c)" delta="+¥2.1M" deltaColor="var(--g)" />
            <MiniStat label="クラウド" value="20%" color="var(--a)" delta="+¥1.5M" deltaColor="var(--g)" />
            <MiniStat label="OSINT" value="60%" color="var(--p)" delta="+¥0.8M" deltaColor="var(--g)" />
          </div>
        </div>

        <Panel
          eyebrow="マッチ度"
          title="あなたに合う案件"
          icon="🎯"
          iconBg="rgba(34,197,94,0.1)"
          className="md:col-span-4"
        >
          <div className="text-center py-2 mb-3 border-b border-bd">
            <div className="font-mono text-[32px] font-bold text-brand-green leading-none mb-1">
              4
            </div>
            <div className="text-[11px] text-t3">件のマッチ案件</div>
          </div>
          <div className="space-y-1.5">
            {[
              ["セキュリティエンジニア", "92%", "var(--g)"],
              ["脆弱性診断士", "87%", "var(--g)"],
              ["SOC アナリスト", "78%", "var(--c)"],
              ["クラウドセキュリティ", "65%", "var(--a)"],
            ].map(([t, m, c]) => (
              <div
                key={t as string}
                className="flex items-center gap-2 p-1.5 bg-surf2 border border-bd rounded-md"
              >
                <span className="text-[10.5px] flex-1 truncate">{t}</span>
                <div className="w-16 h-1 bg-surf3 rounded-full overflow-hidden">
                  <div
                    className="h-full"
                    style={{ width: m as string, background: c as string }}
                  />
                </div>
                <span
                  className="font-mono text-[9.5px] font-semibold w-8 text-right"
                  style={{ color: c as string }}
                >
                  {m}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* ROW 2: Filter (cols 1-12) */}
        <Panel className="md:col-span-12" hover={false}>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[9.5px] text-t3 mr-2">TYPE:</span>
            {[
              ["すべて 6", true],
              ["リモート可 5", false],
              ["フルタイム 4", false],
              ["フリーランス 1", false],
              ["シフト制 1", false],
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
            <div className="w-px h-5 bg-bd mx-2" />
            <span className="font-mono text-[9.5px] text-t3 mr-1">LEVEL:</span>
            {["全レベル", "ハンター級", "オペレーター級", "解析者級", "エキスパート級"].map((l) => (
              <button
                key={l}
                className="px-2.5 py-1 rounded-full font-medium text-[10.5px] cursor-pointer border"
                style={{
                  background: "var(--surf)",
                  borderColor: "var(--bd)",
                  color: "var(--t3)",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </Panel>

        {/* ROW 3: Job list (cols 1-8) + Right rail (cols 9-12) */}
        <Panel
          eyebrow="求人一覧"
          title="正社員・契約社員"
          icon={<IconBriefcase size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="md:col-span-8"
          right={<LivePill size="sm" label="LIVE" />}
        >
          <div className="space-y-2">
            {JOBS.map((j) => (
              <a
                key={j.title}
                href="#"
                className="block p-3.5 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline relative"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg border flex-shrink-0"
                    style={{
                      background: `${j.color}1a`,
                      borderColor: `${j.color}33`,
                    }}
                  >
                    💼
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <div className="text-[13.5px] font-semibold leading-tight mb-0.5">
                          {j.title}
                        </div>
                        <div className="font-mono text-[10px] text-t2">
                          {j.company}
                        </div>
                      </div>
                      <span className="font-mono text-[9.5px] text-t3 flex-shrink-0">
                        {j.posted}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 mb-2 font-mono text-[10.5px]">
                      <span className="text-brand-amber font-semibold flex items-center gap-1">
                        <IconCurrencyYen size={11} stroke={1.8} />
                        {j.salary}
                      </span>
                      <span className="text-t3">·</span>
                      <span className="text-t2 flex items-center gap-1">
                        <IconMapPin size={10} stroke={1.8} />
                        {j.location}
                      </span>
                      <span className="text-t3">·</span>
                      <span className="text-t2">{j.type}</span>
                      {j.remote && (
                        <span
                          className="font-mono text-[8.5px] font-semibold px-1.5 py-0.5 rounded border"
                          style={{
                            background: "rgba(34,197,94,0.1)",
                            borderColor: "rgba(34,197,94,0.22)",
                            color: "var(--g)",
                          }}
                        >
                          REMOTE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {j.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[8.5px] px-1.5 py-0.5 rounded border text-t2"
                            style={{
                              background: "var(--surf3)",
                              borderColor: "var(--bd2)",
                            }}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span
                        className="font-mono text-[9px] font-semibold ml-3"
                        style={{ color: j.color }}
                      >
                        {j.skill}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Panel>

        <div className="md:col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="フリーランス案件"
            title="短期 · スポット"
            icon="⚡"
            iconBg="rgba(245,158,11,0.1)"
          >
            <div className="space-y-1.5">
              {FREELANCE.map((f) => (
                <a
                  key={f.title}
                  href="#"
                  className="block p-2.5 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                >
                  <div className="text-[11.5px] font-semibold mb-1 leading-snug">
                    {f.title}
                  </div>
                  <div className="font-mono text-[11.5px] font-bold text-brand-amber mb-0.5">
                    {f.price}
                  </div>
                  <div className="font-mono text-[9.5px] text-t3">
                    📍 {f.client}
                  </div>
                </a>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="トレンド"
            title="今熱いスキル"
            icon={<IconBuilding size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
          >
            <div className="space-y-1.5">
              {[
                ["クラウドセキュリティ", "+34%", "var(--g)"],
                ["AI/ML セキュリティ", "+28%", "var(--g)"],
                ["ペネトレーション", "+18%", "var(--g)"],
                ["インシデント対応", "+12%", "var(--c)"],
                ["DevSecOps", "+9%", "var(--c)"],
              ].map(([t, d, c]) => (
                <div
                  key={t as string}
                  className="flex items-center justify-between text-[11px] py-1 border-b border-bd last:border-0"
                >
                  <span className="text-t2">{t}</span>
                  <span
                    className="font-mono font-semibold"
                    style={{ color: c as string }}
                  >
                    {d}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="保存済み"
            title="あなたのウォッチリスト"
            icon={<IconBookmark size={13} stroke={1.8} />}
            iconBg="rgba(139,92,246,0.1)"
            iconColor="var(--p)"
          >
            <div className="text-center py-3">
              <div className="font-mono text-[20px] font-bold text-t3 mb-1">0</div>
              <div className="text-[10.5px] text-t3">件保存中</div>
              <a
                href="/login"
                className="inline-block mt-2 px-3 py-1.5 bg-surf2 border border-bd2 rounded text-[10px] font-medium text-t1 hover:bg-surf3 transition no-underline"
              >
                ログインして保存 →
              </a>
            </div>
          </Panel>

          <Panel
            eyebrow="統計"
            title="求人マーケット"
            icon="📊"
            iconBg="rgba(34,197,94,0.1)"
          >
            <div className="space-y-1.5">
              {[
                ["今月の新着", "47 件"],
                ["平均応募数", "23 件 / 求人"],
                ["平均選考期間", "18 日"],
                ["内定率", "32%"],
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
        </div>
      </div>
    </div>
  );
}
