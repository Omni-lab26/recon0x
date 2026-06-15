import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import { LivePill } from "@/components/home/LivePill";
import { MOCK_POSTS, MOCK_COMMUNITY_STATS } from "@/lib/mock-data";
import {
  IconUsersGroup,
  IconMessages,
  IconHash,
  IconFlame,
  IconPlus,
} from "@tabler/icons-react";

const CATEGORIES = [
  { name: "一般討論", color: "#22C55E", topics: 248 },
  { name: "Web セキュリティ", color: "#2B7FFF", topics: 392 },
  { name: "CTF ヘルプ", color: "#F59E0B", topics: 156 },
  { name: "ツールと技術", color: "#8B5CF6", topics: 184 },
  { name: "バグバウンティ", color: "#EF4444", topics: 89 },
  { name: "ニュース", color: "#94A3B8", topics: 67 },
];

export default function CommunityPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <OpsHeader
        eyebrow="COMMUNITY · FORUM"
        title={<>学び続ける、共に。</>}
        description="議論・質問・知見の共有。エシカルハッカーが集う日本語コミュニティ。"
        live={{ label: `${MOCK_COMMUNITY_STATS.online} 人オンライン` }}
        stats={[
          { label: "総スレッド", value: `${MOCK_COMMUNITY_STATS.totalThreads.toLocaleString()}` },
          { label: "総ユーザー", value: `${MOCK_COMMUNITY_STATS.totalUsers.toLocaleString()}` },
          { label: "今日の投稿", value: `${MOCK_COMMUNITY_STATS.todayPosts}` },
          { label: "今週の返信", value: `${MOCK_COMMUNITY_STATS.weekReplies}` },
          { label: "解決済 Q&A", value: `${MOCK_COMMUNITY_STATS.solvedQA}` },
          { label: "オンライン", value: `${MOCK_COMMUNITY_STATS.online}`, color: "var(--g)" },
        ]}
        action={
          <button
            className="px-4 py-2 rounded-lg font-semibold text-[12.5px] text-black inline-flex items-center gap-2 cursor-pointer"
            style={{
              background: "linear-gradient(135deg,#22C55E,#16A34A)",
              boxShadow: "0 4px 16px rgba(34,197,94,0.25)",
            }}
          >
            <IconPlus size={13} stroke={2} />
            新規投稿
          </button>
        }
      />

      <div className="grid grid-cols-12 gap-3">
        {/* Categories (cols 1-3) */}
        <Panel
          eyebrow="カテゴリ"
          title="トピック分類"
          icon={<IconHash size={13} stroke={1.8} />}
          iconBg="rgba(0,212,255,0.1)"
          iconColor="var(--c)"
          className="col-span-3"
        >
          <div className="space-y-1">
            <div
              className="flex items-center gap-2 px-2.5 py-2 rounded-md cursor-pointer"
              style={{
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              <span className="text-[11.5px] font-semibold text-brand-green flex-1">
                すべて
              </span>
              <span className="font-mono text-[10px] text-t3">
                {MOCK_COMMUNITY_STATS.totalThreads}
              </span>
            </div>
            {CATEGORIES.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer hover:bg-surf2 transition"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: c.color }}
                />
                <span className="text-[11.5px] text-t2 flex-1">{c.name}</span>
                <span className="font-mono text-[10px] text-t3">{c.topics}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Main thread list (cols 4-9) */}
        <Panel
          eyebrow="ディスカッション"
          title="最新の議論"
          icon={<IconMessages size={13} stroke={1.8} />}
          iconBg="rgba(139,92,246,0.1)"
          iconColor="var(--p)"
          className="col-span-6"
          right={
            <div className="flex gap-1.5">
              {["最新", "人気", "未解決"].map((s, i) => (
                <button
                  key={s}
                  className="px-2.5 py-1 rounded text-[10px] font-medium cursor-pointer border"
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
                  {s}
                </button>
              ))}
            </div>
          }
        >
          <div className="space-y-1.5">
            {MOCK_POSTS.map((p) => (
              <a
                key={p.title}
                href="#"
                className="block p-3 bg-surf2 border border-bd rounded-lg hover:border-bd2 transition no-underline"
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 border"
                    style={{
                      background: `${p.color}1a`,
                      borderColor: `${p.color}33`,
                      color: p.color,
                    }}
                  >
                    {p.user.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-semibold leading-snug mb-1 truncate">
                      {p.title}
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[9.5px] text-t3">
                      <span className="text-t2">{p.user}</span>
                      <span>·</span>
                      <span style={{ color: p.color }}>{p.category}</span>
                      <span>·</span>
                      <span>{p.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-center">
                      <div className="font-mono text-[11px] font-bold text-brand-green">
                        {p.likes}
                      </div>
                      <div className="font-mono text-[8.5px] text-t3">👍</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-[11px] font-bold text-brand-cyan">
                        {p.replies}
                      </div>
                      <div className="font-mono text-[8.5px] text-t3">💬</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-[11px] text-t3">
                        {p.views}
                      </div>
                      <div className="font-mono text-[8.5px] text-t3">👁</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Panel>

        {/* Right rail */}
        <div className="col-span-3 flex flex-col gap-3">
          <Panel
            eyebrow="オンライン"
            title="アクティブメンバー"
            icon={<IconUsersGroup size={13} stroke={1.8} />}
            iconBg="rgba(34,197,94,0.1)"
            iconColor="var(--g)"
            right={<LivePill size="sm" />}
          >
            <div className="text-center py-2 mb-2">
              <div className="font-mono text-[26px] font-bold text-brand-green mb-1">
                {MOCK_COMMUNITY_STATS.online}
              </div>
              <div className="text-[11px] text-t3">人が接続中</div>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              {[
                "recon_master",
                "0xDEADBEEF",
                "cyber_ninja",
                "sec_analyst",
                "pwn_master",
                "web_warrior",
              ].map((u) => (
                <div
                  key={u}
                  className="w-6 h-6 rounded-md flex items-center justify-center font-mono text-[9px] font-bold border"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    borderColor: "rgba(34,197,94,0.3)",
                    color: "var(--g)",
                  }}
                  title={u}
                >
                  {u.slice(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="トレンド"
            title="人気タグ"
            icon={<IconFlame size={13} stroke={1.8} />}
            iconBg="rgba(245,158,11,0.1)"
            iconColor="var(--a)"
          >
            <div className="flex flex-wrap gap-1.5">
              {[
                ["sql-injection", 89],
                ["xss", 67],
                ["ctf", 156],
                ["burp", 42],
                ["nmap", 51],
                ["osint", 38],
                ["pwn", 29],
                ["crypto", 33],
                ["kali", 47],
              ].map(([t, n]) => (
                <span
                  key={String(t)}
                  className="font-mono text-[10px] px-2 py-1 rounded border text-t2 cursor-pointer hover:text-t1 hover:border-bd2 transition"
                  style={{
                    background: "var(--surf2)",
                    borderColor: "var(--bd)",
                  }}
                >
                  #{t} <span className="text-t3">·{n}</span>
                </span>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="統計"
            title="コミュニティの規模"
            icon="📈"
            iconBg="rgba(0,212,255,0.1)"
          >
            <div className="space-y-1.5">
              {[
                ["登録ユーザー", MOCK_COMMUNITY_STATS.totalUsers.toLocaleString()],
                ["総投稿", MOCK_COMMUNITY_STATS.totalThreads.toLocaleString()],
                ["総返信", "5,847"],
                ["解決済 Q&A", MOCK_COMMUNITY_STATS.solvedQA.toLocaleString()],
                ["平均応答時間", "42 分"],
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
