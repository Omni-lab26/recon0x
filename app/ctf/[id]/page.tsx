import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { Sparkline } from "@/components/ui/Sparkline";
import { LivePill } from "@/components/home/LivePill";
import { MOCK_CTFS } from "@/lib/mock-data";
import {
  IconArrowLeft,
  IconFlag,
  IconBulb,
  IconUsers,
  IconDownload,
  IconBookmark,
  IconHistory,
} from "@tabler/icons-react";

const CAT_META: Record<string, { name: string; color: string }> = {
  web: { name: "Web", color: "#2B7FFF" },
  crypto: { name: "Crypto", color: "#8B5CF6" },
  forensic: { name: "Forensic", color: "#F59E0B" },
  pwn: { name: "Pwn", color: "#EF4444" },
  osint: { name: "OSINT", color: "#F4564A" },
  misc: { name: "Misc", color: "#06B6D4" },
};

export default function CTFDetailPage({ params }: { params: { id: string } }) {
  const challenge =
    MOCK_CTFS.find((c) => c.id === params.id) ??
    MOCK_CTFS.find((c) => c.id === "pwn-01")!;
  const meta = CAT_META[challenge.category];
  const diffColor =
    challenge.difficulty === "Easy"
      ? "var(--g)"
      : challenge.difficulty === "Medium"
      ? "var(--a)"
      : "var(--r)";

  return (
    <div className="max-w-[1400px] mx-auto">
      <a
        href="/ctf"
        className="inline-flex items-center gap-1.5 text-[12px] text-t2 hover:text-t1 transition mb-3 no-underline"
      >
        <IconArrowLeft size={13} stroke={1.8} />
        CTF Arena に戻る
      </a>

      <OpsHeader
        eyebrow={`CHALLENGE · ${challenge.id.toUpperCase()}`}
        title={<>{challenge.title}</>}
        description={challenge.description}
        live={{ label: "ARENA OPEN" }}
        stats={[
          { label: "カテゴリ", value: meta.name, color: meta.color },
          { label: "難易度", value: challenge.difficulty, color: diffColor },
          { label: "ポイント", value: `${challenge.points}pt`, color: "var(--a)" },
          { label: "解答者", value: `${challenge.solves} 人`, color: "var(--c)" },
          { label: "正答率", value: "47%" },
          { label: "First Blood", value: "recon_master", color: "var(--g)" },
        ]}
      />

      <div className="grid grid-cols-12 gap-3">
        {/* ROW 1: Mission briefing (cols 1-8) + Difficulty intel (cols 9-12) */}
        <div
          className="col-span-8 p-5 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(139,92,246,0.05),transparent 60%), var(--surf)",
            borderColor: "var(--bd2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <LivePill size="sm" label="MISSION BRIEF" color="cyan" />
            <span className="font-mono text-[10.5px] text-t3">
              ▸ CHALLENGE-{challenge.id.toUpperCase()} · 機密扱い
            </span>
          </div>
          <p className="text-[13px] text-t1 leading-[1.7] mb-4">
            このバイナリは stack-based Buffer Overflow に脆弱です。<br />
            <code className="font-mono text-brand-cyan bg-surf2 px-1.5 py-0.5 rounded text-[11.5px]">
              vulnerable.c
            </code>{" "}
            のソースコード を解析し、隠された{" "}
            <code className="font-mono text-brand-green bg-surf2 px-1.5 py-0.5 rounded text-[11.5px]">
              win()
            </code>{" "}
            関数を実行することでフラグを取得せよ。
          </p>

          <div
            className="rounded-lg border border-bd p-3.5 font-mono text-[11.5px] leading-[1.85] mb-4"
            style={{ background: "#020203" }}
          >
            <div className="text-t3">// vulnerable.c</div>
            <div>
              <span style={{ color: "#8B5CF6" }}>#include</span>{" "}
              <span style={{ color: "#F59E0B" }}>{"<stdio.h>"}</span>
            </div>
            <div>
              <span style={{ color: "#8B5CF6" }}>#include</span>{" "}
              <span style={{ color: "#F59E0B" }}>{"<string.h>"}</span>
            </div>
            <br />
            <div>
              <span style={{ color: "#3B82F6" }}>void</span>{" "}
              <span style={{ color: "#22C55E" }}>win</span>(){" "}
              {"{ "}
              <span style={{ color: "#22C55E" }}>printf</span>(
              <span style={{ color: "#F59E0B" }}>"RECON{"{...}"}"</span>); {" }"}
            </div>
            <br />
            <div>
              <span style={{ color: "#3B82F6" }}>int</span>{" "}
              <span style={{ color: "#22C55E" }}>main</span>(){" "}
              {"{"}
            </div>
            <div>
              {"  "}
              <span style={{ color: "#3B82F6" }}>char</span> buf[64];
            </div>
            <div>
              {"  "}
              <span style={{ color: "#22C55E" }}>gets</span>(buf);{" "}
              <span className="text-t3">// 危険な関数!</span>
            </div>
            <div>{"  return 0;"}</div>
            <div>{"}"}</div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <MiniStat label="必要スキル" value="Pwn" color={meta.color} icon="🎯" />
            <MiniStat label="推奨ツール" value="GDB/pwntools" color="var(--c)" icon="🛠" />
            <MiniStat label="想定時間" value="45分" color="var(--p)" icon="⏱" />
            <MiniStat label="アーキ" value="x86_64" color="var(--a)" icon="📊" />
          </div>
        </div>

        <Panel
          eyebrow="難易度インテリ"
          title="解答難易度の分析"
          icon="📊"
          iconBg="rgba(245,158,11,0.1)"
          className="col-span-4"
        >
          <div className="space-y-2">
            {[
              ["攻撃複雑度", "Medium", "var(--a)"],
              ["必要知識量", "中程度", "var(--c)"],
              ["想定ツール数", "2", "var(--p)"],
              ["ヒント数", "3 段階", "var(--p)"],
              ["First Blood 時間", "8 分 32 秒", "var(--g)"],
            ].map(([l, v, c]) => (
              <div
                key={l}
                className="flex items-center justify-between text-[11px] py-1 border-b border-bd last:border-0"
              >
                <span className="text-t2">{l}</span>
                <span className="font-mono font-semibold" style={{ color: c }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* ROW 2: Downloads (cols 1-5) + Solve stats (cols 6-8) + Submission (cols 9-12) */}
        <Panel
          eyebrow="問題文 · 配布ファイル"
          title="チャレンジリソース"
          icon={<IconDownload size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="col-span-5"
        >
          <div className="eyebrow mb-1.5">配布ファイル</div>
          <div className="space-y-1.5">
            {[
              ["vulnerable.c", "2.1 KB", "source"],
              ["vulnerable", "16.8 KB", "ELF binary"],
              ["Dockerfile", "412 B", "container"],
              ["README.md", "1.4 KB", "instructions"],
            ].map(([f, size, kind]) => (
              <a
                key={f}
                href="#"
                className="flex items-center gap-2.5 p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
              >
                <IconDownload size={12} className="text-brand-cyan" />
                <span className="font-mono text-[10.5px] flex-1">{f}</span>
                <span className="font-mono text-[9.5px] text-t3">{size}</span>
                <span className="font-mono text-[8.5px] text-t3 ml-1">{kind}</span>
              </a>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-bd">
            <div className="eyebrow mb-1.5">接続情報</div>
            <code className="font-mono text-[10.5px] block bg-bg border border-bd rounded p-2 text-brand-green">
              nc challenge.recon0x.dev 31337
            </code>
          </div>
        </Panel>

        <Panel
          eyebrow="ソルブ統計"
          title="解答状況"
          icon={<IconUsers size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="col-span-3"
        >
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            <MiniStat label="総解答" value={`${challenge.solves}`} color="var(--g)" />
            <MiniStat label="正答率" value="47%" color="var(--c)" />
            <MiniStat label="平均" value="42分" color="var(--p)" />
            <MiniStat label="最速" value="8m" color="var(--a)" />
          </div>
          <div className="pt-2 border-t border-bd">
            <div className="eyebrow mb-1.5">過去 7 日の解答</div>
            <Sparkline
              series={[2, 5, 4, 8, 12, 9, 14]}
              color="var(--g)"
              height={26}
            />
          </div>
        </Panel>

        <Panel
          eyebrow="フラグ提出センター"
          title="ミッション完了"
          icon={<IconFlag size={13} stroke={1.8} />}
          iconBg="rgba(245,158,11,0.1)"
          iconColor="var(--a)"
          className="col-span-4"
        >
          <div className="eyebrow mb-1.5">あなたの試行</div>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <MiniStat label="試行" value="0" color="var(--t1)" />
            <MiniStat label="残ヒント" value="3/3" color="var(--p)" />
            <MiniStat label="経過" value="00:00" color="var(--c)" />
          </div>
          <div className="eyebrow mb-1.5">フラグ提出</div>
          <input
            placeholder="RECON{フラグを入力してください}"
            className="w-full bg-bg border border-bd rounded-md px-3 py-2 text-[12px] text-t1 font-mono placeholder:text-t3 mb-2 focus:border-bd2 outline-none"
          />
          <button
            className="w-full py-2 rounded-md font-semibold text-[11.5px] text-black"
            style={{
              background: "linear-gradient(135deg,#22C55E,#16A34A)",
              boxShadow: "0 4px 12px rgba(34,197,94,0.25)",
            }}
          >
            提出する
          </button>
        </Panel>

        {/* ROW 3: Related learning (cols 1-5) + Hints (cols 6-8) + Timeline (cols 9-12) */}
        <Panel
          eyebrow="関連学習資料"
          title="このチャレンジの背景"
          icon={<IconBookmark size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="col-span-5"
        >
          <div className="space-y-1.5">
            {[
              ["📖", "Buffer Overflow の基礎", "/articles/bof-101", "L1 · 25分"],
              ["🧪", "Pwn ラボ — Buffer Overflow", "/lab", "前提推奨"],
              ["🛠", "GDB · pwntools", "/tools", "必須ツール"],
              ["#", "ROP · gadget · SUID", "/glossary", "4 用語"],
              ["⚑", "ROP ガジェット連結 (上級)", "/ctf/pwn-02", "次の挑戦"],
            ].map(([em, t, href, sub]) => (
              <a
                key={String(t)}
                href={href as string}
                className="flex items-center gap-2.5 p-2 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
              >
                <span className="text-sm">{em}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11.5px] font-semibold">{t}</div>
                  <div className="font-mono text-[9.5px] text-t3">{sub}</div>
                </div>
                <span className="font-mono text-[9.5px] text-t3">→</span>
              </a>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="ヒントシステム"
          title="3 段階ヒント"
          icon={<IconBulb size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="col-span-3"
        >
          <div className="space-y-1.5">
            {[
              [1, "やんわりとした方向性", "−50 XP", "gets() の挙動を確認"],
              [2, "具体的なアプローチ", "−100 XP", "RIP を win() アドレスへ"],
              [3, "ほぼ答え", "−150 XP", "padding: 'A'*72 + p64(win_addr)"],
            ].map(([n, t, cost]) => (
              <div
                key={n as number}
                className="p-2 bg-surf2 border border-bd rounded-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-semibold text-t1">
                    ヒント {n}
                  </span>
                  <span className="font-mono text-[9px] text-brand-red font-semibold">
                    {cost}
                  </span>
                </div>
                <div className="text-[10.5px] text-t3 mb-1.5">{t}</div>
                <button className="w-full py-1 rounded text-[10px] bg-surf3 border border-bd text-t1 hover:bg-surf3 transition">
                  解放する
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="タイムライン"
          title="チャレンジ履歴"
          icon={<IconHistory size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="col-span-4"
        >
          <div className="space-y-2 relative pl-3">
            <div
              className="absolute left-1 top-1 bottom-1 w-px"
              style={{ background: "var(--bd2)" }}
            />
            {[
              ["公開", "5/12 21:00", "var(--g)"],
              ["First Blood 🩸", "recon_master · 8m 32s", "var(--r)"],
              ["100 ソルブ目達成", "5/15 14:23", "var(--a)"],
              ["平均所要時間更新", "42分 → 38分", "var(--c)"],
              ["最終 Writeup 投稿", "cyber_ninja · 昨日", "var(--p)"],
            ].map(([l, v, c]) => (
              <div key={String(l)} className="relative pl-3">
                <div
                  className="absolute -left-[5px] top-1 w-[7px] h-[7px] rounded-full"
                  style={{ background: c, border: "1px solid var(--bd2)" }}
                />
                <div className="text-[10.5px] font-semibold">{l}</div>
                <div className="font-mono text-[9.5px] text-t3">{v}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
