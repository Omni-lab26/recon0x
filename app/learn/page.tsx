import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { Sparkline } from "@/components/ui/Sparkline";
import { FIELDS, RANKS } from "@/lib/tokens";
import { LivePill } from "@/components/home/LivePill";
import { MobileLearnPage } from "@/components/mobile/MobileLearnPage";
import {
  IconRoute,
  IconArrowRight,
  IconLock,
  IconTarget,
  IconBolt,
  IconChartRadar,
  IconHistory,
  IconCalendar,
} from "@tabler/icons-react";

export default function LearnPage() {
  return (
    <>
      <MobileLearnPage />
      <div className="hidden lg:block max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="LEARNING PATHS · MISSION CONTROL"
        title={
          <>
            7 つの専門分野。
            <span className="text-t3 font-medium"> 35 ステップで実戦力へ。</span>
          </>
        }
        description="recon0x の学習パスは Hack The Box Academy / OffSec / SANS の研修体系を元に設計。L1 入門から L5 到達点まで、段階的に実戦スキルを習得します。"
        live={{ label: "PATHS READY" }}
        stats={[
          { label: "分野", value: "7" },
          { label: "ステップ", value: "35" },
          { label: "あなたの進捗", value: "0%", color: "var(--g)" },
          { label: "完了予定", value: "—" },
          { label: "推定総時間", value: "120h" },
          { label: "次のマイルストーン", value: "Lv.10", color: "var(--c)" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* ROW 1: Progress overview (cols 1-8) + Next mission (cols 9-12) */}
        <div
          className="md:col-span-8 p-5 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(34,197,94,0.05),transparent 60%), var(--surf)",
            borderColor: "var(--bd2)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
            }}
          />
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.1)" }}
            >
              <IconTarget size={14} className="text-brand-green" />
            </div>
            <div>
              <div className="eyebrow mb-0.5">進捗オーバービュー</div>
              <div className="text-[14.5px] font-semibold tracking-[-0.01em]">
                あなたの旅路 — 学習者 → セキュリティエンジニア
              </div>
            </div>
            <LivePill size="sm" label="TRACKING" color="cyan" />
          </div>

          {/* Rank progression track */}
          <div className="relative flex justify-between items-start mb-5 px-2">
            <div
              className="absolute left-[8%] right-[8%] top-[15px] h-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(to right, var(--g) 0%, var(--g) 0%, var(--bd2) 0%)",
              }}
            />
            {RANKS.map((r, i) => {
              const current = i === 0;
              return (
                <div
                  key={r.key}
                  className="relative z-10 flex flex-col items-center w-1/6"
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-base mb-2"
                    style={{
                      borderColor: current ? "var(--c)" : "var(--bd2)",
                      background: current ? "rgba(0,212,255,0.1)" : "var(--bg)",
                      boxShadow: current ? "0 0 14px rgba(0,212,255,0.4)" : undefined,
                    }}
                  >
                    {r.emoji}
                  </div>
                  <div
                    className="text-[10.5px] font-semibold"
                    style={{ color: current ? "var(--c)" : "var(--t3)" }}
                  >
                    {r.name}
                  </div>
                  <div className="font-mono text-[9px] text-t3 mt-0.5">
                    {r.range}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mini stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-bd">
            <MiniStat
              label="完了ステップ"
              value="0 / 35"
              color="var(--g)"
              delta="0% 達成"
            />
            <MiniStat
              label="学習時間"
              value="0h"
              color="var(--c)"
              delta="累計"
            />
            <MiniStat
              label="獲得 XP"
              value="0"
              color="var(--a)"
              delta="ロードマップ経由"
            />
            <MiniStat
              label="完了予測"
              value="—"
              color="var(--p)"
              delta="ペース未測定"
            />
          </div>
        </div>

        {/* Next recommended module (cols 9-12) */}
        <Panel
          eyebrow="次の推奨"
          title="今すぐ始めるべきステップ"
          icon={<IconBolt size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="md:col-span-4"
        >
          <div
            className="p-3 rounded-lg border mb-2"
            style={{
              background: "rgba(34,197,94,0.05)",
              borderColor: "rgba(34,197,94,0.22)",
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="font-mono text-[9.5px] font-semibold tracking-[0.04em]"
                style={{ color: "var(--g)" }}
              >
                L1 · LINUX
              </span>
              <span
                className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  borderColor: "rgba(34,197,94,0.22)",
                  color: "var(--g)",
                }}
              >
                Easy
              </span>
            </div>
            <div className="text-[12.5px] font-semibold mb-1.5">
              ターミナル入門
            </div>
            <div className="text-[10.5px] text-t3 leading-snug mb-2.5">
              シェル / ファイル操作 / パイプ / 環境変数
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-bd">
              <span className="font-mono text-[10px] text-brand-amber font-semibold">
                +200 XP
              </span>
              <span className="font-mono text-[9.5px] text-t3">推定 45 分</span>
            </div>
          </div>
          <button className="w-full py-2 rounded-md font-semibold text-[11.5px] text-black flex items-center justify-center gap-1.5"
            style={{
              background: "linear-gradient(135deg,#22C55E,#16A34A)",
              boxShadow: "0 4px 12px rgba(34,197,94,0.25)",
            }}>
            開始する <IconArrowRight size={12} stroke={2} />
          </button>
        </Panel>

        {/* ROW 2: Fields grid (cols 1-5) + Skill distribution (cols 6-8) + Completion forecast (cols 9-12) */}
        <Panel
          eyebrow="分野選択"
          title="7 つの専門エリア"
          icon={<IconRoute size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="md:col-span-5"
        >
          <div className="space-y-1.5">
            {FIELDS.map((f) => (
              <a
                key={f.key}
                href="#"
                className="group flex items-center gap-2.5 p-2 bg-surf2 border border-bd rounded-lg hover:border-bd2 hover:bg-surf3 transition-all no-underline"
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center font-mono text-[13px] font-semibold flex-shrink-0 border"
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
                    <span className="text-[12px] font-semibold">{f.name}</span>
                    <span className="font-mono text-[8.5px] text-t3">L1〜L5</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-[2px] bg-surf3 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{ width: "0%", background: f.c }}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-t3 w-7 text-right">
                      0/5
                    </span>
                  </div>
                </div>
                <IconArrowRight
                  size={12}
                  stroke={1.8}
                  className="text-t3 group-hover:text-brand-green transition-colors flex-shrink-0"
                />
              </a>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="スキル分布"
          title="習熟度マップ"
          icon={<IconChartRadar size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="md:col-span-3"
        >
          <div className="space-y-2">
            {FIELDS.slice(0, 6).map((f) => (
              <div key={f.key} className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] font-semibold w-4"
                  style={{ color: f.c }}
                >
                  {f.glyph}
                </span>
                <div className="flex-1 h-[3px] bg-surf3 rounded-full overflow-hidden">
                  <div
                    className="h-full"
                    style={{ width: "0%", background: f.c }}
                  />
                </div>
                <span
                  className="font-mono text-[9px] w-8 text-right"
                  style={{ color: "var(--t3)" }}
                >
                  0%
                </span>
              </div>
            ))}
          </div>
          <div className="pt-3 mt-3 border-t border-bd">
            <div className="flex items-center justify-between text-[10.5px]">
              <span className="text-t3">総合スキルレベル</span>
              <span className="font-mono font-semibold text-brand-green">
                Lv.1 · 探索者前段
              </span>
            </div>
          </div>
        </Panel>

        <Panel
          eyebrow="予測"
          title="完了フォーキャスト"
          icon={<IconCalendar size={13} stroke={1.8} />}
          iconBg="rgba(245,158,11,0.1)"
          iconColor="var(--a)"
          className="md:col-span-4"
        >
          <div className="text-center py-2 mb-2">
            <div className="font-mono text-[24px] font-bold text-t3 leading-none mb-1">
              —
            </div>
            <div className="text-[10.5px] text-t3">
              学習を始めると完了予測日を算出します
            </div>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-bd">
            {[
              ["1 日 30 分", "8 ヶ月"],
              ["1 日 1 時間", "4 ヶ月"],
              ["1 日 2 時間", "2 ヶ月"],
            ].map(([pace, eta]) => (
              <div
                key={pace}
                className="flex items-center justify-between text-[11px]"
              >
                <span className="text-t2">{pace}</span>
                <span className="font-mono font-semibold text-brand-amber">
                  {eta}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* ROW 3: Field detail roadmap (cols 1-8) + Right rail (cols 9-12) */}
        <Panel
          eyebrow="$ Linux 基礎 · L1〜L5"
          title="選択中分野のロードマップ"
          icon="$"
          iconBg="rgba(34,197,94,0.12)"
          iconColor="var(--g)"
          className="md:col-span-8"
          right={
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9.5px] text-t3">完了 0/5</span>
              <Sparkline
                series={[0, 0, 0, 0, 0, 0, 0]}
                color="var(--g)"
                height={20}
                width={60}
                showLast={false}
              />
            </div>
          }
        >
          <div className="relative pl-7">
            <div
              className="absolute left-2.5 top-2 bottom-2 w-[1.5px]"
              style={{ background: "var(--bd2)" }}
            />
            {[
              ["L1", "ターミナル入門", "シェル / ファイル操作 / パイプ / 環境変数", "Easy", "+200 XP", "ready"],
              ["L2", "ファイルと権限", "パーミッション / SUID / sudo / root", "Easy", "+300 XP", "ready"],
              ["L3", "シェルスクリプト", "条件分岐 / grep / cron / at", "Medium", "+500 XP", "ready"],
              ["L4", "設定の悪用", "CRON / SUID / PATH / sudo 設定不備", "Medium", "+700 XP", "locked"],
              ["L5", "カーネル権限昇格", "Dirty COW / カーネルエクスプロイト", "Hard", "+1,200 XP", "locked"],
            ].map(([lv, t, d, diff, xp, status]) => {
              const isLocked = status === "locked";
              const lvColor = isLocked ? "var(--t3)" : "var(--g)";
              return (
                <div key={lv as string} className="relative mb-2 last:mb-0">
                  <div
                    className="absolute -left-[18px] top-3 w-[14px] h-[14px] rounded-full flex items-center justify-center z-10"
                    style={{
                      background: isLocked ? "var(--surf2)" : "var(--bg)",
                      border: `2px solid ${lvColor}`,
                    }}
                  >
                    {isLocked && <IconLock size={6} stroke={2.5} className="text-t3" />}
                  </div>
                  <div className="p-2.5 bg-surf2 border border-bd rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-mono text-[10px] font-semibold tracking-[0.04em]"
                        style={{ color: lvColor }}
                      >
                        {lv}
                      </span>
                      <span className="text-[12.5px] font-semibold tracking-[-0.005em]">
                        {t}
                      </span>
                      <span
                        className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded border"
                        style={{
                          background:
                            diff === "Easy"
                              ? "rgba(34,197,94,0.1)"
                              : diff === "Medium"
                              ? "rgba(245,158,11,0.1)"
                              : "rgba(239,68,68,0.1)",
                          borderColor:
                            diff === "Easy"
                              ? "rgba(34,197,94,0.22)"
                              : diff === "Medium"
                              ? "rgba(245,158,11,0.22)"
                              : "rgba(239,68,68,0.22)",
                          color:
                            diff === "Easy"
                              ? "var(--g)"
                              : diff === "Medium"
                              ? "var(--a)"
                              : "var(--r)",
                        }}
                      >
                        {diff}
                      </span>
                      {!isLocked && (
                        <span className="ml-auto font-mono text-[10px] text-brand-amber font-semibold">
                          {xp}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-t2 leading-snug mb-1.5">{d}</div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-bd font-mono text-[9.5px] text-t3">
                      <span>記事 (準備中) · ラボ (準備中)</span>
                      {!isLocked ? (
                        <span className="text-brand-green flex items-center gap-1 cursor-pointer">
                          開始 <IconArrowRight size={9} stroke={1.8} />
                        </span>
                      ) : (
                        <span className="text-t3">🔒 前提条件あり</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <div className="col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="続きから"
            title="再開ポイント"
            icon={<IconHistory size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
          >
            <div className="text-center py-4">
              <div className="text-[11.5px] text-t3 mb-2">学習履歴なし</div>
              <a
                href="/login"
                className="inline-block px-3 py-1.5 bg-surf2 border border-bd2 rounded-md text-[11px] font-medium text-t1 hover:bg-surf3 transition no-underline"
              >
                ログインして開始 →
              </a>
            </div>
          </Panel>

          <Panel
            eyebrow="連続学習"
            title="ストリーク"
            icon="🔥"
            iconBg="rgba(245,158,11,0.1)"
          >
            <div className="flex items-baseline gap-2 mb-2">
              <div className="font-mono text-[28px] font-bold text-t3 leading-none">0</div>
              <div className="text-[11px] text-t3">日</div>
            </div>
            <div className="flex gap-[3px] mb-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 aspect-square rounded-sm"
                  style={{ background: "var(--surf3)" }}
                />
              ))}
            </div>
            <div className="font-mono text-[9.5px] text-t3">
              過去 14 日間 · 学習を始めると記録されます
            </div>
          </Panel>

          <Panel
            eyebrow="マイルストーン"
            title="次の達成目標"
            icon="🏆"
            iconBg="rgba(139,92,246,0.1)"
          >
            <div className="space-y-1.5">
              {[
                ["初回 XP 獲得", "Lv.1 → 2", "100 XP"],
                ["最初のラボ完了", "ラボバッジ", "+150 XP"],
                ["7 日連続学習", "ストリークバッジ", "+200 XP"],
                ["最初の CTF 解答", "First Solve バッジ", "+100 XP"],
              ].map(([n, sub, xp]) => (
                <div
                  key={n}
                  className="flex items-center gap-2 p-2 bg-surf2 border border-bd rounded-md"
                >
                  <div className="w-3 h-3 rounded-full border border-bd2 bg-surf2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10.5px] font-semibold">{n}</div>
                    <div className="font-mono text-[9px] text-t3">{sub}</div>
                  </div>
                  <span className="font-mono text-[9.5px] text-brand-amber font-semibold">
                    {xp}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
      </div>
    </>
  );
}