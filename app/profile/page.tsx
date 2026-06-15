import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { FIELDS } from "@/lib/tokens";
import {
  IconUserCircle,
  IconChartRadar,
  IconClock,
  IconTrophy,
  IconBookmark,
} from "@tabler/icons-react";

export default function ProfilePage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="USER PROFILE"
        title={<>あなたの軌跡。</>}
        description="学習進捗 · 解答済み CTF · 獲得バッジ · スキルマトリクス。あなたの成長を可視化します。"
        stats={[
          { label: "STATUS", value: "ゲスト", color: "var(--a)" },
          { label: "LEVEL", value: "—" },
          { label: "XP", value: "—" },
          { label: "ランク", value: "—" },
          { label: "連続日数", value: "—" },
          { label: "解答 CTF", value: "—" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        {/* Profile hero (cols 1-8) */}
        <div
          className="col-span-8 p-6 rounded-[11px] border"
          style={{
            background: "linear-gradient(135deg,rgba(34,197,94,0.04),transparent 60%), var(--surf)",
            borderColor: "var(--bd2)",
          }}
        >
          <div className="flex items-start gap-5">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-mono text-[26px] font-bold text-t3 border-2 flex-shrink-0"
              style={{
                background: "var(--surf2)",
                borderColor: "var(--bd2)",
              }}
            >
              ?
            </div>
            <div className="flex-1">
              <div className="text-[22px] font-semibold tracking-[-0.02em] mb-1">
                ゲストユーザー
              </div>
              <div className="font-mono text-[11.5px] text-t3 mb-3">
                未ログイン · プロフィール未作成
              </div>
              <p className="text-[13px] text-t2 leading-[1.65] mb-4 max-w-[520px]">
                アカウントを作成すると、ここにあなたの学習進捗・取得バッジ・スキルマトリクス・ポートフォリオが表示されます。
              </p>
              <div className="flex gap-2">
                <a
                  href="/signup"
                  className="px-4 py-2 rounded-lg font-semibold text-[12.5px] text-black no-underline"
                  style={{
                    background: "linear-gradient(135deg,#22C55E,#16A34A)",
                    boxShadow: "0 4px 16px rgba(34,197,94,0.25)",
                  }}
                >
                  アカウント作成
                </a>
                <a
                  href="/login"
                  className="px-4 py-2 bg-surf2 border border-bd2 rounded-lg text-[12.5px] text-t1 hover:bg-surf3 transition no-underline"
                >
                  ログイン
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats (cols 9-12) */}
        <div className="col-span-4 grid grid-cols-2 gap-2">
          {[
            ["XP", "—", "var(--g)"],
            ["ランク", "—", "var(--a)"],
            ["CTF 解答", "—", "var(--c)"],
            ["連続日数", "—", "var(--r)"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              className="p-3 bg-surf border border-bd rounded-lg"
            >
              <div className="eyebrow mb-1.5">{l}</div>
              <div
                className="font-mono text-[20px] font-bold leading-none"
                style={{ color: c, opacity: 0.4 }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* Skill Matrix (cols 1-6) */}
        <Panel
          eyebrow="スキルマトリクス"
          title="習熟度の可視化"
          icon={<IconChartRadar size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="col-span-6"
        >
          <div className="space-y-2.5">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-semibold border"
                    style={{
                      background: `${f.c}1a`,
                      borderColor: `${f.c}33`,
                      color: f.c,
                    }}
                  >
                    {f.glyph}
                  </div>
                  <span className="text-[11.5px] font-medium flex-1">{f.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <div
                        key={d}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--surf3)" }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[9.5px] text-t3 w-10 text-right">
                    Lv 0/5
                  </span>
                </div>
                <div className="h-1 bg-surf3 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: "0%", background: f.c }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Activity (cols 7-9) */}
        <Panel
          eyebrow="アクティビティ"
          title="最近の足跡"
          icon={<IconClock size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="col-span-3"
        >
          <div className="text-center py-8">
            <div className="text-2xl opacity-40 mb-2">📜</div>
            <div className="text-[11.5px] text-t3 mb-1">アクティビティなし</div>
            <div className="text-[10px] text-t3">
              ログインして学習を始めると<br />ここに記録されます
            </div>
          </div>
        </Panel>

        {/* Achievements (cols 10-12) */}
        <Panel
          eyebrow="バッジ"
          title="獲得実績"
          icon={<IconTrophy size={13} stroke={1.8} />}
          iconBg="rgba(245,158,11,0.1)"
          iconColor="var(--a)"
          className="col-span-3"
        >
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg flex items-center justify-center border border-bd opacity-30"
                style={{ background: "var(--surf2)" }}
              >
                <span className="text-lg grayscale">🔒</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-2 font-mono text-[9.5px] text-t3">
            0 / 24 解放
          </div>
        </Panel>

        {/* Solved CTFs (cols 1-8) */}
        <Panel
          eyebrow="ポートフォリオ"
          title="解答済み CTF"
          icon={<IconBookmark size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="col-span-8"
          noPadding
        >
          <table className="w-full">
            <thead>
              <tr>
                {["チャレンジ", "カテゴリ", "ポイント", "解答日", "順位"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-3.5 py-2.5 text-[9.5px] font-mono font-semibold text-t3 border-b border-bd uppercase tracking-[0.06em]"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center">
                  <div className="text-[11.5px] text-t3 mb-1">
                    解答済みの CTF はありません
                  </div>
                  <a
                    href="/ctf"
                    className="text-[11px] text-brand-green hover:text-brand-cyan transition"
                  >
                    CTF を見る →
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </Panel>

        {/* Learning progress (cols 9-12) */}
        <Panel
          eyebrow="学習進捗"
          title="ロードマップ"
          icon="📊"
          iconBg="rgba(0,212,255,0.1)"
          className="col-span-4"
        >
          <div className="space-y-2">
            {FIELDS.slice(0, 5).map((f) => (
              <div
                key={f.key}
                className="flex items-center gap-2 text-[11px]"
              >
                <span style={{ color: f.c }}>{f.glyph}</span>
                <span className="text-t2 flex-1 truncate">{f.name}</span>
                <span className="font-mono text-[10px] text-t3">0/5</span>
              </div>
            ))}
            <div className="pt-2 border-t border-bd flex items-center justify-between">
              <span className="text-[11px] text-t2">総合進捗</span>
              <span className="font-mono text-[12px] font-semibold text-brand-green">
                0%
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
