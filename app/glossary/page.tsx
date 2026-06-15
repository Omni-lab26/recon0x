import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MOCK_GLOSSARY } from "@/lib/mock-data";
import { IconBook, IconSearch, IconAbc } from "@tabler/icons-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const CATEGORIES = [
  { name: "攻撃手法", color: "#EF4444", count: 38 },
  { name: "防御技術", color: "#22C55E", count: 26 },
  { name: "暗号", color: "#8B5CF6", count: 22 },
  { name: "ネットワーク", color: "#00D4FF", count: 31 },
  { name: "認証 / 認可", color: "#F59E0B", count: 18 },
  { name: "プロトコル", color: "#2B7FFF", count: 24 },
  { name: "標準・規格", color: "#94A3B8", count: 17 },
];

export default function GlossaryPage() {
  const totalCount = CATEGORIES.reduce((s, c) => s + c.count, 0);
  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="GLOSSARY · CYBERSECURITY TERMS"
        title={<>セキュリティ用語を、平易に。</>}
        description="SQL インジェクション · XSS · CSRF · CVSS など、学習中によく出会う専門用語を日本語で解説。"
        stats={[
          { label: "総用語数", value: `${totalCount}+`, color: "var(--c)" },
          { label: "カテゴリ", value: "7" },
          { label: "今日の閲覧", value: "234" },
          { label: "あなたが学んだ", value: "12", color: "var(--g)" },
          { label: "今週の追加", value: "8" },
          { label: "推奨学習語", value: "SQLi", color: "var(--r)" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12" hover={false}>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-bg border border-bd rounded-lg">
              <IconSearch size={13} className="text-t3" />
              <span className="text-[12px] text-t3">
                用語名 · 別名 · 説明文を検索 (例: 'インジェクション')
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-mono text-[9.5px] text-t3 mr-2">A-Z:</span>
            {ALPHABET.map((l) => (
              <button
                key={l}
                className="w-7 h-7 rounded font-mono text-[11px] font-semibold cursor-pointer border text-t2 hover:text-t1 hover:border-bd2 transition"
                style={{
                  background: "var(--surf2)",
                  borderColor: "var(--bd)",
                }}
              >
                {l}
              </button>
            ))}
            <button
              className="w-7 h-7 rounded font-mono text-[11px] font-semibold cursor-pointer border text-t2 ml-2"
              style={{
                background: "var(--surf2)",
                borderColor: "var(--bd)",
              }}
            >
              あ
            </button>
          </div>
        </Panel>

        <Panel
          eyebrow="用語一覧"
          title="セキュリティ用語集"
          icon={<IconBook size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="col-span-8"
          right={
            <span className="font-mono text-[10.5px] text-t3">
              12 / {totalCount}+ 件
            </span>
          }
        >
          <div className="space-y-2">
            {MOCK_GLOSSARY.map((g) => (
              <a
                key={g.term}
                href="#"
                className="block p-3 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-1 self-stretch rounded-full flex-shrink-0"
                    style={{ background: g.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13.5px] font-semibold">{g.term}</span>
                      <span className="font-mono text-[10px] text-t3">{g.short}</span>
                      <span
                        className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-[0.04em] ml-auto"
                        style={{
                          background: `${g.color}1a`,
                          borderColor: `${g.color}33`,
                          color: g.color,
                        }}
                      >
                        {g.category}
                      </span>
                    </div>
                    <div className="text-[11.5px] text-t2 leading-snug">
                      {g.def}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Panel>

        <div className="col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="カテゴリ"
            title="種類別"
            icon={<IconAbc size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
          >
            <div className="space-y-1.5">
              {CATEGORIES.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer hover:bg-surf2 transition"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: c.color }}
                  />
                  <span className="text-[11.5px] text-t2 flex-1">{c.name}</span>
                  <span className="font-mono text-[10px] text-t3">{c.count}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="今週のピックアップ"
            title="注目用語"
            icon="✨"
            iconBg="rgba(245,158,11,0.1)"
          >
            <div className="space-y-1.5">
              {[
                ["JWT", "JSON Web Token", "認証 / 認可"],
                ["RCE", "Remote Code Execution", "攻撃手法"],
                ["KEV", "Known Exploited Vulnerabilities", "標準・規格"],
              ].map(([t, sub, cat]) => (
                <a
                  key={t}
                  href="#"
                  className="block p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                >
                  <div className="text-[11.5px] font-semibold mb-0.5">{t}</div>
                  <div className="font-mono text-[9px] text-t3">{sub}</div>
                  <div className="font-mono text-[8.5px] text-brand-amber mt-0.5">
                    {cat}
                  </div>
                </a>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="学習済み"
            title="あなたの語彙力"
            icon="🎓"
            iconBg="rgba(139,92,246,0.1)"
          >
            <div className="text-center py-2 mb-2">
              <div className="font-mono text-[26px] font-bold text-brand-purple mb-1">
                12
              </div>
              <div className="text-[11px] text-t3">
                語 / {totalCount}+ 語
              </div>
            </div>
            <div className="h-1 bg-surf3 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-brand-purple"
                style={{ width: `${(12 / totalCount) * 100}%` }}
              />
            </div>
            <div className="font-mono text-[9.5px] text-t3 text-center mt-2">
              次のマイルストーン: 50 語
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
