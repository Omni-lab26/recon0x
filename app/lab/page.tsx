import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { MiniStat } from "@/components/ui/MiniStat";
import { LivePill } from "@/components/home/LivePill";
import { MOCK_LABS } from "@/lib/mock-data";
import {
  IconTerminal2,
  IconTarget,
  IconBulb,
  IconRefresh,
  IconFlag,
  IconActivity,
  IconBrowser,
  IconServer,
} from "@tabler/icons-react";

export default function LabPage() {
  const active = MOCK_LABS.find((l) => l.status === "active") ?? MOCK_LABS[0];
  const completed = MOCK_LABS.filter((l) => l.status === "completed").length;

  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="HANDS-ON LAB · TRAINING ENVIRONMENT"
        title={<>RECON-01: ネットワーク偵察ミッション</>}
        description="実際のターゲットネットワーク (10.10.10.0/24) を nmap で偵察し、稼働中のサービスとバージョンを特定せよ。最終フラグは隠された Web サーバーに存在する。"
        live={{ label: "ENV ACTIVE · 10.10.10.42" }}
        stats={[
          { label: "アクティブ", value: "1", color: "var(--g)" },
          { label: "完了", value: `${completed} / ${MOCK_LABS.length}`, color: "var(--c)" },
          { label: "進捗", value: "60%", color: "var(--g)" },
          { label: "稼働サーバー", value: "1", color: "var(--g)" },
          { label: "経過時間", value: "00:18:42" },
          { label: "獲得 XP", value: "320 / 500", color: "var(--a)" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* ROW 1: Active mission (cols 1-8) + Env status (cols 9-12) */}
        <div
          className="md:col-span-8 p-5 rounded-[11px] border relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(34,197,94,0.05),transparent 60%), var(--surf)",
            borderColor: "rgba(34,197,94,0.25)",
          }}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <LivePill size="sm" label="MISSION ACTIVE" />
            <span className="font-mono text-[10.5px] text-t3">
              ▸ {active.id} · 開始 18 分前 · 進行 60%
            </span>
          </div>
          <div className="text-[22px] font-semibold tracking-[-0.025em] leading-[1.15] mb-2">
            {active.title}
            <br />
            <span className="text-t3 font-medium text-[15px]">
              — {active.description}
            </span>
          </div>
          <p className="text-[12.5px] text-t2 leading-[1.6] mb-4 max-w-[640px]">
            ターゲット 10.10.10.42 に nmap を実行してオープンポートを特定し、HTTPS サーバの隠しエンドポイントを発見せよ。最終的に管理画面に到達できればフラグ取得。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <MiniStat label="必要スキル" value="Network" color="var(--g)" icon="🎯" />
            <MiniStat label="推奨ツール" value="nmap/curl" color="var(--c)" icon="🛠" />
            <MiniStat label="想定時間" value="45分" color="var(--p)" icon="⏱" />
            <MiniStat label="報酬 XP" value="+500" color="var(--a)" icon="⚡" />
          </div>
        </div>

        <Panel
          eyebrow="環境ステータス"
          title="ラボインフラ"
          icon={<IconServer size={13} stroke={1.8} />}
          iconBg="rgba(34,197,94,0.1)"
          iconColor="var(--g)"
          className="md:col-span-4"
          right={<LivePill size="sm" label="ONLINE" />}
        >
          <div className="space-y-1.5">
            {[
              ["ターゲット", "10.10.10.42", "var(--g)"],
              ["VPN", "接続中", "var(--g)"],
              ["セッション", "ssh-recon-7f2a", "var(--c)"],
              ["IP", "10.10.10.5", "var(--c)"],
              ["稼働時間", "00:18:42", "var(--a)"],
              ["ヒート", "32%", "var(--g)"],
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
          <button className="w-full mt-3 py-2 rounded-md font-semibold text-[11.5px] bg-surf2 border border-bd text-t1 hover:bg-surf3 transition flex items-center justify-center gap-1.5">
            <IconRefresh size={12} stroke={1.8} />
            環境をリセット
          </button>
        </Panel>

        {/* ROW 2: Mission list (cols 1-3) + Browser + Terminal (cols 4-8) + Right rail (cols 9-12) */}
        <Panel
          eyebrow="ミッション選択"
          title="演習一覧"
          icon={<IconTerminal2 size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="md:col-span-3"
        >
          <div className="space-y-1.5">
            {MOCK_LABS.map((l) => {
              const isActive = l.status === "active";
              const isDone = l.status === "completed";
              return (
                <div
                  key={l.id}
                  className="p-2 rounded-lg cursor-pointer transition border"
                  style={{
                    background: isActive ? `${l.color}15` : "var(--surf2)",
                    borderColor: isActive ? `${l.color}40` : "var(--bd)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="font-mono text-[8.5px] font-semibold px-1.5 py-0.5 rounded border"
                      style={{
                        background: `${l.color}1a`,
                        borderColor: `${l.color}33`,
                        color: l.color,
                      }}
                    >
                      {l.id}
                    </span>
                    {isActive && (
                      <span
                        className="font-mono text-[8.5px] font-semibold ml-auto"
                        style={{ color: l.color }}
                      >
                        ● 実行中
                      </span>
                    )}
                    {isDone && (
                      <span className="font-mono text-[8.5px] font-semibold ml-auto text-brand-green">
                        ✓ 完了
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-semibold mb-0.5">{l.title}</div>
                  <div className="font-mono text-[9px] text-t3 line-clamp-2">
                    {l.description}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <div className="md:col-span-5 flex flex-col gap-3">
          <Panel
            eyebrow="ターゲット環境"
            title="ブラウザシミュレータ"
            icon={<IconBrowser size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
            right={
              <span className="font-mono text-[9.5px] text-brand-green">
                ● 接続中
              </span>
            }
            noPadding
          >
            <div className="bg-surf2 px-3 py-1.5 flex items-center gap-2 border-b border-bd">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 bg-bg border border-bd rounded px-2 py-0.5 font-mono text-[10px] text-t2">
                https://10.10.10.42/admin
              </div>
            </div>
            <div
              className="bg-[#020203] p-4 text-[11px] leading-[1.7]"
              style={{ minHeight: "180px" }}
            >
              <div className="text-t1 mb-2">
                <strong>Admin Login</strong>
              </div>
              <div className="mb-2">
                <div className="text-t3 mb-1">Username:</div>
                <div className="bg-surf2 border border-bd rounded px-2 py-1 text-t2">
                  ' OR 1=1--
                </div>
              </div>
              <div className="mb-2">
                <div className="text-t3 mb-1">Password:</div>
                <div className="bg-surf2 border border-bd rounded px-2 py-1 text-t2">
                  ********
                </div>
              </div>
              <button className="bg-brand-cyan text-black text-[10.5px] px-2.5 py-1 rounded font-semibold">
                Sign In
              </button>
              <div className="mt-2 text-brand-red text-[10px]">
                Error: SQL syntax near "'"
              </div>
            </div>
          </Panel>

          <Panel
            eyebrow="terminal"
            title="recon@lab:~/sql-lab$"
            icon={<IconTerminal2 size={13} stroke={1.8} />}
            iconBg="rgba(34,197,94,0.1)"
            iconColor="var(--g)"
            right={
              <span className="font-mono text-[9.5px] text-brand-green">
                ● ssh 接続中
              </span>
            }
            noPadding
          >
            <div
              className="font-mono text-[10.5px] leading-[1.65] p-3.5 text-t2 min-h-[200px]"
              style={{ background: "#020203" }}
            >
              <div>
                <span className="text-brand-green">recon@lab</span>
                <span className="text-brand-cyan">:~/sql-lab$</span>{" "}
                <span className="text-t1">
                  sqlmap -u "http://10.10.10.42/login" --data "user=test" -p user
                </span>
              </div>
              <div className="text-t3 mt-1">[*] starting @ 2026-06-13 17:23:42</div>
              <div className="mt-1">
                <span className="text-brand-green">[+]</span>{" "}
                <span className="text-t1">parameter 'user' is vulnerable!</span>
              </div>
              <div className="mt-1">
                <span className="text-brand-green">[+]</span>{" "}
                <span className="text-t1">payload: UNION ALL SELECT NULL,NULL,NULL--</span>
              </div>
              <div className="mt-1">
                <span className="text-brand-green">[+]</span>{" "}
                <span className="text-t1">バックエンド DBMS: MySQL ≥ 5.0</span>
              </div>
              <div className="mt-1">
                <span className="text-brand-green">[+]</span>{" "}
                <span className="text-t1">available databases: admin_db, users</span>
              </div>
              <div className="mt-1">
                <span className="text-brand-green">[+]</span>{" "}
                <span className="text-brand-green">
                  フラグ: RECON{`{sql1_bYp4ss_4uth_2026}`}
                </span>
              </div>
              <div className="mt-1.5">
                <span className="text-brand-green">recon@lab</span>
                <span className="text-brand-cyan">:~/sql-lab$</span>
                <span
                  className="inline-block w-2 h-3 ml-1 align-middle"
                  style={{ background: "var(--g)", animation: "pulse 1s infinite" }}
                />
              </div>
            </div>
          </Panel>
        </div>

        {/* Right intelligence rail (cols 9-12) */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <Panel
            eyebrow="目標"
            title="成功条件"
            icon={<IconTarget size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
          >
            <div className="space-y-1.5">
              {[
                ["ターゲットをスキャン", true, "nmap -sV 10.10.10.42"],
                ["開いているポート特定", true, "22, 80, 443"],
                ["脆弱な認証画面発見", true, "/admin にて検出"],
                ["SQL インジェクション実行", false, "進行中"],
                ["フラグ取得", false, "未達成"],
              ].map(([t, done, sub]) => (
                <div
                  key={t as string}
                  className="flex items-start gap-2 p-2 bg-surf2 border border-bd rounded-md"
                >
                  <div
                    className="w-3 h-3 rounded border mt-0.5 flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: done ? "var(--g)" : "var(--surf2)",
                      borderColor: done ? "var(--g)" : "var(--bd2)",
                    }}
                  >
                    {done && (
                      <span className="text-[7px] text-black font-bold">✓</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-medium">
                      {t as string}
                    </div>
                    <div className="font-mono text-[9px] text-t3 mt-0.5">
                      {sub as string}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t border-bd text-center font-mono text-[9.5px] text-brand-green font-semibold">
              3 / 5 完了 · 60%
            </div>
          </Panel>

          <Panel
            eyebrow="フラグ提出"
            title="ミッション完了"
            icon={<IconFlag size={13} stroke={1.8} />}
            iconBg="rgba(245,158,11,0.1)"
            iconColor="var(--a)"
          >
            <input
              placeholder="RECON{フラグを入力}"
              className="w-full bg-bg border border-bd rounded-md px-3 py-2 text-[11.5px] text-t1 font-mono placeholder:text-t3 mb-2 outline-none"
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

          <Panel
            eyebrow="ヒント"
            title="3 段階の手がかり"
            icon={<IconBulb size={13} stroke={1.8} />}
            iconBg="rgba(139,92,246,0.1)"
            iconColor="var(--p)"
          >
            <div className="space-y-1.5">
              {[
                [1, "入力検証を確認", "−50 XP", true],
                [2, "UNION SELECT を試す", "−100 XP", true],
                [3, "admin_db を確認", "−150 XP", false],
              ].map(([n, t, cost, used]) => (
                <div
                  key={n as number}
                  className="flex items-center gap-2 p-1.5 bg-surf2 border border-bd rounded-md"
                >
                  <span
                    className="font-mono text-[10px] font-semibold"
                    style={{ color: used ? "var(--t3)" : "var(--p)" }}
                  >
                    H{n}
                  </span>
                  <span
                    className={`flex-1 text-[10.5px] ${
                      used ? "text-t3 line-through" : "text-t1"
                    }`}
                  >
                    {t as string}
                  </span>
                  <span className="font-mono text-[9px] text-brand-red font-semibold">
                    {cost as string}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="リソース"
            title="補助資料"
            icon={<IconActivity size={13} stroke={1.8} />}
            iconBg="rgba(34,197,94,0.1)"
            iconColor="var(--g)"
          >
            <div className="space-y-1.5">
              {[
                ["📖", "SQLi 完全ガイド", "/articles/sqli-basics"],
                ["🛠", "SQLMap マニュアル", "/tools/sqlmap"],
                ["⚑", "類似 CTF: SQLi 認証バイパス", "/ctf/web-03"],
                ["#", "用語: UNION · SELECT · WHERE", "/glossary"],
              ].map(([em, t, href]) => (
                <a
                  key={String(t)}
                  href={href as string}
                  className="flex items-center gap-2 p-1.5 bg-surf2 border border-bd rounded-md hover:border-bd2 transition no-underline"
                >
                  <span className="text-sm">{em}</span>
                  <span className="flex-1 text-[10.5px] font-medium">{t}</span>
                </a>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
