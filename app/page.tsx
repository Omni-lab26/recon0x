import { MobileDashboard } from "@/components/home/MobileDashboard";
import { Panel } from "@/components/ui/Panel";
import { Sparkline } from "@/components/ui/Sparkline";
import { LivePill } from "@/components/home/LivePill";
import { InteractiveTerminal } from "@/components/home/InteractiveTerminal";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconFlame,
  IconPlayerPlay,
  IconCircleDot,
  IconStar,
} from "@tabler/icons-react";

// ── Mock data inline (kept here so dashboard is self-contained) ──
const STATS = [
  { label: "総経験値", value: "12,540", delta: "↑ 12%", deltaLabel: "今週", color: "var(--g)" },
  { label: "世界ランキング", value: "#248", delta: "上位 1.2%", deltaLabel: "", color: "var(--c)" },
  { label: "連続学習日数", value: "14 日", delta: "🔥 自己ベスト！", deltaLabel: "", color: "var(--a)" },
  { label: "今週の獲得ポイント", value: "3,250", delta: "↑ 12%", deltaLabel: "%", color: "var(--g)" },
];

const PATHS = [
  { name: "Web セキュリティ", modules: 12, percent: 75, color: "#22C55E" },
  { name: "ペネトレーションテスト", modules: 18, percent: 45, color: "#2B7FFF" },
  { name: "リバースエンジニアリング", modules: 14, percent: 30, color: "#8B5CF6" },
  { name: "バグバウンティ", modules: 10, percent: 20, color: "#F59E0B" },
  { name: "OSINT", modules: 8, percent: 60, color: "#EC4899" },
];

const CONTINUE = [
  { title: "SQL インジェクション基礎", category: "Web Security", percent: 60, color: "#22C55E" },
  { title: "Linux 権限昇格", category: "Privilege Escalation", percent: 40, color: "#2B7FFF" },
  { title: "Python for Hackers", category: "プログラミング", percent: 20, color: "#F59E0B" },
  { title: "Wireshark 101", category: "ネットワーク解析", percent: 80, color: "#22C55E" },
  { title: "Burp Suite Basics", category: "Web Security", percent: 50, color: "#EC4899" },
];

const CHALLENGES = [
  { difficulty: "Easy", subtitle: "Rookie CTF", title: "ハッキングの世界へようこそ！", solves: 287, xp: 100, color: "#22C55E", icon: "🌱" },
  { difficulty: "Medium", subtitle: "Web War", title: "この脆弱性を悪用できる？", solves: 156, xp: 250, color: "#F59E0B", icon: "⚔" },
  { difficulty: "Hard", subtitle: "Crypto Crack", title: "暗号を突破せよ", solves: 98, xp: 500, color: "#EF4444", icon: "🔐" },
  { difficulty: "Insane", subtitle: "Kernel Panic", title: "カーネルを掌握せよ", solves: 23, xp: 1000, color: "#EC4899", icon: "💀" },
];

const JOBS = [
  { title: "セキュリティエンジニア", salary: "年収 600〜800万円", location: "Tokyo", tags: ["リモート可", "フルタイム"] },
  { title: "ペネトレーションテスター", salary: "年収 700〜900万円", location: "Remote", tags: ["リモート可", "フルタイム"] },
  { title: "SOC アナリスト", salary: "年収 500〜700万円", location: "Osaka", tags: ["フルタイム"] },
  { title: "バグバウンティハンター", salary: "報酬 $1,000〜$10,000", location: "フリーランス", tags: ["フリーランス"] },
];

const PLAN = [
  { text: "SQL インジェクションラボを完了する", sub: "Web Exploitation", done: true },
  { text: "バイナリエクスプロイトの基礎", sub: "Reversing", done: true },
  { text: "XSS の防御方法を学ぶ", sub: "Web Security", done: true },
  { text: "コミュニティの質問に回答", sub: "+50 XP", done: false },
  { text: "本日の連続記録を保つ", sub: "1 タスク残り", done: false },
];

const UPGRADES = [
  { brand: "DigitalOcean", logo: "🌊", plan: "VPS 2GB", price: "月額 ¥6", reward: "アフィリ報酬 10%", c: "#0080FF" },
  { brand: "NordVPN", logo: "🛡", plan: "2年プラン", price: "¥3.29/月", reward: "アフィリ報酬 40%", c: "#4687FF" },
  { brand: "1Password", logo: "🔑", plan: "パスワード管理", price: "$2.99/月", reward: "アフィリ報酬 30%", c: "#0094F5" },
  { brand: "HACK THE BOX", logo: "📦", plan: "VIP メンバーシップ", price: "$15/月", reward: "アフィリ報酬 15%", c: "#9FEF00" },
];

const BOOKS = [
  { title: "ハッキング・ラボのつくりかた", price: "¥3,960", rating: "★★★★☆", reviews: 128, reward: "アフィリ報酬 8%", c: "#F59E0B" },
  { title: "Web アプリケーションハッキング", price: "¥4,180", rating: "★★★★★", reviews: 256, reward: "アフィリ報酬 8%", c: "#8B5CF6" },
  { title: "リバースエンジニアリング実践ガイド", price: "¥4,950", rating: "★★★★☆", reviews: 178, reward: "アフィリ報酬 8%", c: "#EF4444" },
  { title: "マスタリング Metasploit", price: "¥4,400", rating: "★★★★☆", reviews: 96, reward: "アフィリ報酬 8%", c: "#22C55E" },
];

export default function HomePage() {
  return (
    <>
      {/* ── モバイル専用ダッシュボード ── */}
      <MobileDashboard />

      {/* ── デスクトップ用ダッシュボード ── */}
      <div className="hidden lg:block max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-2">
        {/* ════ ROW 1: Greeting + Stats + Terminal (cols 1-8) | Daily Plan (cols 9-12) ════ */}
        <section className="md:col-span-8">
          <div className="mb-4">
            <h1 className="text-[22px] sm:text-[28px] font-semibold tracking-[-0.025em] leading-[1.15] mb-1">
              おかえりなさい、
              <span className="text-brand-green">0xFreedom</span>
            </h1>
            <p className="text-[13.5px] text-t2">
              今日もハックして、スキルを磨き続けよう。
            </p>
          </div>

          {/* 4 stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-2.5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="p-3 bg-surf border border-bd rounded-[11px] hover:border-bd2 transition"
              >
                <div className="eyebrow mb-1.5">{s.label}</div>
                <div
                  className="font-mono text-[20px] font-bold leading-none mb-1.5"
                  style={{ color: "var(--t1)", letterSpacing: "-0.02em" }}
                >
                  {s.value}
                </div>
                <div
                  className="font-mono text-[10px] font-semibold"
                  style={{ color: s.color }}
                >
                  {s.delta}{" "}
                  <span className="text-t3 font-normal">{s.deltaLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive terminal */}
          <div className="h-[140px] sm:h-[168px]">
            <InteractiveTerminal />
          </div>
        </section>

        <Panel
          eyebrow="今日の学習プラン"
          title={`${PLAN.filter((p) => p.done).length}/${PLAN.length}`}
          icon="🎯"
          iconBg="rgba(34,197,94,0.1)"
          className="md:col-span-4"
          right={
            <div className="relative w-9 h-9">
              <svg viewBox="0 0 36 36" className="-rotate-90 w-full h-full">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="var(--surf3)"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="var(--g)"
                  strokeWidth="3"
                  strokeDasharray="87.96"
                  strokeDashoffset={87.96 * (1 - PLAN.filter((p) => p.done).length / PLAN.length)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold text-brand-green">
                {Math.round((PLAN.filter((p) => p.done).length / PLAN.length) * 100)}%
              </div>
            </div>
          }
        >
          <div className="space-y-1.5">
            {PLAN.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-2 py-1.5"
              >
                <div
                  className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: p.done ? "var(--g)" : "var(--surf2)",
                    border: p.done ? "1.5px solid var(--g)" : "1.5px solid var(--bd2)",
                  }}
                >
                  {p.done && <IconCheck size={9} stroke={3} className="text-black" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-[11.5px] leading-snug ${
                      p.done ? "text-t3 line-through" : "text-t1 font-medium"
                    }`}
                  >
                    {p.text}
                  </div>
                  <div className="font-mono text-[9.5px] text-t3 mt-0.5">
                    {p.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 py-2 rounded-md font-semibold text-[11.5px] text-black"
            style={{
              background: "linear-gradient(135deg,#22C55E,#16A34A)",
              boxShadow: "0 4px 12px rgba(34,197,94,0.25)",
            }}>
            学習を続ける
          </button>
        </Panel>

        {/* ════ ROW 2: Learning Paths (cols 1-8) | Upgrades affiliate (cols 9-12) ════ */}
        <section className="md:col-span-8">
          <div className="flex items-end justify-between mb-2.5 px-1">
            <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
              学習パスの進捗
            </h2>
            <a
              href="/learn"
              className="font-mono text-[10.5px] text-brand-green no-underline hover:gap-2 flex items-center gap-1.5 transition"
            >
              すべてのパスを見る →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {PATHS.map((p) => (
              <a
                key={p.name}
                href="/learn"
                className="p-3 bg-surf border border-bd rounded-[11px] hover:border-bd2 transition no-underline"
              >
                <div className="text-[11.5px] font-semibold mb-1 leading-snug line-clamp-1">
                  {p.name}
                </div>
                <div className="font-mono text-[9.5px] text-t3 mb-3">
                  {p.modules} モジュール
                </div>
                <div
                  className="font-mono text-[14px] font-bold mb-1"
                  style={{ color: p.color }}
                >
                  {p.percent}%
                </div>
                <div className="h-[3px] bg-surf3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${p.percent}%`,
                      background: p.color,
                      boxShadow: `0 0 6px ${p.color}66`,
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        </section>

        <Panel
          eyebrow="おすすめのアップグレード (アフィリエイト)"
          title=""
          className="md:col-span-4"
          right={
            <a
              href="#"
              className="font-mono text-[10px] text-brand-green no-underline"
            >
              すべて見る →
            </a>
          }
        >
          <div className="grid grid-cols-2 gap-1.5">
            {UPGRADES.map((u) => (
              <a
                key={u.brand}
                href="#"
                className="p-2.5 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
                style={{
                  background: `linear-gradient(135deg, ${u.c}0a, transparent)`,
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-base">{u.logo}</span>
                  <span
                    className="text-[10.5px] font-semibold leading-tight"
                    style={{ color: u.c }}
                  >
                    {u.brand}
                  </span>
                </div>
                <div className="font-mono text-[9px] text-t3 mb-0.5">{u.plan}</div>
                <div className="font-mono text-[11px] font-semibold mb-1.5">
                  {u.price}
                </div>
                <div className="font-mono text-[8.5px] text-brand-green mb-2">
                  {u.reward}
                </div>
                <button
                  className="w-full py-1 rounded text-[10px] font-medium"
                  style={{
                    background: "var(--surf3)",
                    border: "1px solid var(--bd2)",
                    color: "var(--t1)",
                  }}
                >
                  詳細を見る
                </button>
              </a>
            ))}
          </div>
        </Panel>

        {/* ════ ROW 3: Continue Learning (cols 1-8) | Tools banner (cols 9-12) ════ */}
        <section className="md:col-span-8">
          <div className="flex items-end justify-between mb-2.5 px-1">
            <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
              続きから学習
            </h2>
            <a
              href="/articles"
              className="font-mono text-[10.5px] text-brand-green no-underline"
            >
              すべて見る →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {CONTINUE.map((c) => (
              <div
                key={c.title}
                className="p-3 bg-surf border border-bd rounded-[11px] hover:border-bd2 transition cursor-pointer"
              >
                <div className="text-[11.5px] font-semibold mb-1 leading-snug line-clamp-2 h-[30px]">
                  {c.title}
                </div>
                <div className="font-mono text-[9px] text-t3 mb-2">
                  {c.category}
                </div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <div className="flex-1 h-[3px] bg-surf3 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${c.percent}%`,
                        background: c.color,
                        boxShadow: `0 0 6px ${c.color}66`,
                      }}
                    />
                  </div>
                  <span
                    className="font-mono text-[9.5px] font-semibold"
                    style={{ color: c.color }}
                  >
                    {c.percent}%
                  </span>
                </div>
                <button
                  className="w-full py-1.5 rounded-md text-[10.5px] font-medium flex items-center justify-center gap-1.5"
                  style={{
                    background: `${c.color}1a`,
                    border: `1px solid ${c.color}40`,
                    color: c.color,
                  }}
                >
                  <IconPlayerPlay size={10} stroke={2} />
                  続きから
                </button>
              </div>
            ))}
          </div>
        </section>

        <div
          className="col-span-4 p-3 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,212,255,0.04) 60%, var(--surf))",
            borderColor: "rgba(139,92,246,0.25)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
              style={{ background: "rgba(168,85,247,0.15)" }}
            >
              ⚡
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold mb-0.5">
                あなた専用のおすすめツール
              </div>
              <div className="font-mono text-[9.5px] text-t3">
                学習効率を最大化するツールを厳選して紹介します
              </div>
            </div>
            <button className="px-2.5 py-1 bg-surf2 border border-bd2 rounded text-[10.5px] font-medium hover:bg-surf3 transition">
              もっと見る
            </button>
          </div>
        </div>

        {/* ════ ROW 4: Challenges (cols 1-8) | Books affiliate (cols 9-12) ════ */}
        <Panel
          title="おすすめのチャレンジ"
          className="md:col-span-8"
          right={
            <div className="flex items-center gap-1.5">
              {["トレンド", "新着", "高評価"].map((l, i) => (
                <button
                  key={l}
                  className="px-2.5 py-1 rounded font-medium text-[10.5px] cursor-pointer border"
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
              <a
                href="/ctf"
                className="ml-2 font-mono text-[10.5px] text-brand-green no-underline"
              >
                すべてのチャレンジを見る →
              </a>
            </div>
          }
        >
          <div className="space-y-1.5">
            {CHALLENGES.map((c) => (
              <a
                key={c.title}
                href="/ctf"
                className="flex items-center gap-3 p-2.5 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
              >
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center text-base flex-shrink-0 border"
                  style={{
                    background: `${c.color}1a`,
                    borderColor: `${c.color}33`,
                  }}
                >
                  {c.icon}
                </div>
                <div className="w-[110px] flex-shrink-0">
                  <div
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.04em]"
                    style={{ color: c.color }}
                  >
                    {c.difficulty}
                  </div>
                  <div className="font-mono text-[9.5px] text-t3 mt-0.5">
                    {c.subtitle}
                  </div>
                </div>
                <div className="flex-1 text-[12px] font-medium">{c.title}</div>
                <span className="font-mono text-[10.5px] text-t3">
                  {c.solves} 人が解答
                </span>
                <span
                  className="font-mono text-[12px] font-bold w-[60px] text-right"
                  style={{ color: "var(--a)" }}
                >
                  {c.xp} XP
                </span>
                <button
                  className="px-3 py-1.5 rounded font-medium text-[10.5px]"
                  style={{
                    background: "var(--surf3)",
                    border: "1px solid var(--bd2)",
                    color: "var(--t1)",
                  }}
                >
                  {c.xp >= 1000 ? "見る" : "解く"}
                </button>
              </a>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="注目のセキュリティ書籍 (アフィリエイト)"
          title=""
          className="md:col-span-4"
          right={
            <a
              href="#"
              className="font-mono text-[10px] text-brand-green no-underline"
            >
              すべて見る →
            </a>
          }
        >
          <div className="grid grid-cols-2 gap-1.5">
            {BOOKS.map((b) => (
              <a
                key={b.title}
                href="#"
                className="p-2 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
              >
                <div
                  className="w-full aspect-[3/4] rounded-md mb-1.5 flex items-center justify-center text-2xl border"
                  style={{
                    background: `linear-gradient(135deg, ${b.c}33, ${b.c}0a)`,
                    borderColor: `${b.c}33`,
                  }}
                >
                  📚
                </div>
                <div className="text-[10px] font-semibold leading-snug line-clamp-2 h-[26px] mb-1">
                  {b.title}
                </div>
                <div className="font-mono text-[10px] font-bold text-brand-amber mb-1">
                  {b.price}
                </div>
                <div className="flex items-center gap-1 mb-1.5">
                  <span className="font-mono text-[8px] text-brand-amber">
                    {b.rating}
                  </span>
                  <span className="font-mono text-[8px] text-t3">
                    ({b.reviews})
                  </span>
                </div>
                <div className="font-mono text-[8px] text-brand-green mb-1.5">
                  {b.reward}
                </div>
                <button
                  className="w-full py-1 rounded text-[9.5px] font-medium"
                  style={{
                    background: "var(--surf3)",
                    border: "1px solid var(--bd2)",
                    color: "var(--t1)",
                  }}
                >
                  見る
                </button>
              </a>
            ))}
          </div>
        </Panel>

        {/* ════ ROW 5: Jobs (cols 1-5) + Market value (cols 6-8) | Limited offer (cols 9-12) ════ */}
        <Panel
          eyebrow=""
          title="注目のセキュリティ求人"
          className="md:col-span-5"
          right={
            <a
              href="#"
              className="font-mono text-[10.5px] text-brand-green no-underline"
            >
              すべて見る →
            </a>
          }
        >
          <div className="grid grid-cols-2 gap-2">
            {JOBS.map((j) => (
              <a
                key={j.title}
                href="#"
                className="p-2.5 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
              >
                <div className="text-[11.5px] font-semibold mb-1 leading-snug line-clamp-1">
                  {j.title}
                </div>
                <div className="font-mono text-[10px] text-brand-amber font-semibold mb-1">
                  {j.salary}
                </div>
                <div className="font-mono text-[9.5px] text-t3 mb-2 flex items-center gap-1">
                  📍 {j.location}
                </div>
                <div className="flex flex-wrap gap-1">
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[8.5px] px-1.5 py-0.5 rounded border"
                      style={{
                        background: "var(--surf3)",
                        borderColor: "var(--bd2)",
                        color: "var(--t2)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow=""
          title="あなたの市場価値"
          className="md:col-span-3"
        >
          <div className="text-[11px] text-t2 mb-3">スキルに基づく推定年収</div>
          <div
            className="font-mono text-[26px] font-bold leading-none mb-2"
            style={{
              background: "linear-gradient(135deg, #22C55E, #00D4FF)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ¥6,240,000
          </div>
          <div className="font-mono text-[10.5px] text-brand-green mb-3">
            ↑ 12% （先月比）
          </div>
          <Sparkline
            series={[400, 420, 410, 460, 490, 540, 580, 624]}
            color="var(--g)"
            height={42}
          />
        </Panel>

        <div
          className="md:col-span-4 p-4 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(0,212,255,0.04) 60%, var(--surf))",
            borderColor: "var(--bd2)",
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[13px] font-semibold mb-1">限定オファー</div>
              <div className="font-mono text-[10px] text-t3">
                期間限定の特別割引をお見逃しなく！
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="text-t3">終了まで</span>
              <span className="px-1.5 py-0.5 bg-surf3 border border-bd2 rounded text-t1 font-bold">
                03 日
              </span>
              <span className="px-1.5 py-0.5 bg-surf3 border border-bd2 rounded text-t1 font-bold">
                14 時間
              </span>
              <span className="px-1.5 py-0.5 bg-surf3 border border-bd2 rounded text-t1 font-bold">
                25 分
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-surf2 border border-bd rounded-lg relative">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "rgba(34,197,94,0.15)" }}
            >
              🦈
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold">Surfshark</div>
              <div className="font-mono text-[10px] text-t3 mt-0.5">
                VPN + Antivirus セット
              </div>
              <div className="font-mono text-[16px] font-bold text-brand-green mt-1">
                $2.19/月
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[11px] text-black"
                style={{
                  background: "linear-gradient(135deg, #F59E0B, #EF4444)",
                  boxShadow: "0 4px 12px rgba(245,158,11,0.4)",
                }}
              >
                82% OFF
              </div>
            </div>
          </div>
          <button
            className="w-full mt-3 py-2 rounded-md font-semibold text-[11.5px] text-black"
            style={{
              background: "linear-gradient(135deg,#EF4444,#DC2626)",
              boxShadow: "0 4px 12px rgba(239,68,68,0.25)",
            }}
          >
            今すぐ購入
          </button>
        </div>
      </div>
      </div>
    </>
  );
}