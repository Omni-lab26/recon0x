import { OpsHeader } from "@/components/ui/OpsHeader";
import { Panel } from "@/components/ui/Panel";
import {
  IconUser,
  IconMail,
  IconLock,
  IconBell,
  IconShieldLock,
  IconTrash,
} from "@tabler/icons-react";

export default function SettingsPage() {
  return (
    <div className="max-w-[1100px] mx-auto">
      <OpsHeader
        eyebrow="ACCOUNT SETTINGS"
        title={<>アカウントの管理。</>}
        description="プロフィール · メール · パスワード · 通知 · セキュリティ · データ削除。"
        stats={[
          { label: "STATUS", value: "ゲスト", color: "var(--a)" },
          { label: "メール認証", value: "—" },
          { label: "2FA", value: "未設定" },
          { label: "セッション", value: "0" },
          { label: "アカウント作成", value: "—" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Sidebar nav (cols 1-3) */}
        <Panel
          eyebrow="セクション"
          title="設定一覧"
          icon="⚙️"
          iconBg="rgba(0,212,255,0.1)"
          className="md:col-span-3"
        >
          <div className="space-y-1">
            {[
              ["プロフィール", IconUser, true],
              ["メールアドレス", IconMail, false],
              ["パスワード", IconLock, false],
              ["通知", IconBell, false],
              ["セキュリティ", IconShieldLock, false],
              ["データ削除", IconTrash, false],
            ].map(([l, Ic, active]) => {
              const Icon = Ic as React.ComponentType<{ size?: number; stroke?: number }>;
              return (
                <div
                  key={String(l)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-md cursor-pointer"
                  style={
                    active
                      ? {
                          background: "rgba(34,197,94,0.06)",
                          borderLeft: "2px solid var(--g)",
                          color: "var(--g)",
                        }
                      : { color: "var(--t2)" }
                  }
                >
                  <Icon size={13} stroke={1.8} />
                  <span className="text-[11.5px] font-medium">{l as string}</span>
                </div>
              );
            })}
          </div>
        </Panel>

        {/* Main settings (cols 4-12) */}
        <div className="col-span-9 flex flex-col gap-3">
          <Panel
            eyebrow="プロフィール"
            title="表示名 · ユーザー名"
            icon={<IconUser size={13} stroke={1.8} />}
            iconBg="rgba(34,197,94,0.1)"
            iconColor="var(--g)"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-t2 mb-1.5 font-medium">
                  ユーザー名
                </label>
                <input
                  disabled
                  className="w-full bg-bg border border-bd rounded-lg px-3 py-2 text-[12.5px] text-t3 cursor-not-allowed font-mono"
                  placeholder="ログイン後に設定"
                />
              </div>
              <div>
                <label className="block text-[11px] text-t2 mb-1.5 font-medium">
                  表示名
                </label>
                <input
                  disabled
                  className="w-full bg-bg border border-bd rounded-lg px-3 py-2 text-[12.5px] text-t3 cursor-not-allowed"
                  placeholder="ログイン後に設定"
                />
              </div>
              <div>
                <label className="block text-[11px] text-t2 mb-1.5 font-medium">
                  自己紹介
                </label>
                <textarea
                  disabled
                  className="w-full bg-bg border border-bd rounded-lg px-3 py-2 text-[12.5px] text-t3 cursor-not-allowed resize-none h-20"
                  placeholder="ログイン後に設定"
                />
              </div>
              <div className="pt-2 border-t border-bd flex justify-end">
                <button
                  disabled
                  className="px-4 py-2 bg-surf2 border border-bd text-t3 rounded-lg text-[11.5px] cursor-not-allowed"
                >
                  保存 (ログインが必要)
                </button>
              </div>
            </div>
          </Panel>

          <Panel
            eyebrow="メールとパスワード"
            title="ログイン情報"
            icon={<IconMail size={13} stroke={1.8} />}
            iconBg="rgba(0,212,255,0.1)"
            iconColor="var(--c)"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-surf2 border border-bd rounded-lg">
                <div>
                  <div className="text-[12px] font-semibold mb-0.5">メールアドレス</div>
                  <div className="font-mono text-[11px] text-t3">未設定</div>
                </div>
                <a
                  href="/login"
                  className="px-3 py-1.5 bg-surf3 border border-bd2 rounded text-[11px] text-t1 hover:bg-surf3 transition no-underline"
                >
                  ログイン →
                </a>
              </div>
              <div className="flex items-center justify-between p-3 bg-surf2 border border-bd rounded-lg">
                <div>
                  <div className="text-[12px] font-semibold mb-0.5">パスワード</div>
                  <div className="font-mono text-[11px] text-t3">設定なし</div>
                </div>
                <a
                  href="/forgot-password"
                  className="px-3 py-1.5 bg-surf3 border border-bd2 rounded text-[11px] text-t1 hover:bg-surf3 transition no-underline"
                >
                  変更
                </a>
              </div>
            </div>
          </Panel>

          <Panel
            eyebrow="通知"
            title="メール通知"
            icon={<IconBell size={13} stroke={1.8} />}
            iconBg="rgba(245,158,11,0.1)"
            iconColor="var(--a)"
          >
            <div className="space-y-2">
              {[
                ["新着 CVE (CRITICAL)", true],
                ["週次ダイジェスト", true],
                ["コミュニティ返信", false],
                ["ランク昇格", true],
                ["新着記事", false],
              ].map(([l, on]) => (
                <div
                  key={String(l)}
                  className="flex items-center justify-between p-2.5 bg-surf2 border border-bd rounded-lg"
                >
                  <span className="text-[11.5px]">{l as string}</span>
                  <div
                    className={`w-9 h-5 rounded-full relative cursor-not-allowed opacity-50`}
                    style={{
                      background: on ? "rgba(34,197,94,0.4)" : "var(--surf3)",
                    }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: on ? "18px" : "2px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            eyebrow="危険ゾーン"
            title="アカウント削除"
            icon={<IconTrash size={13} stroke={1.8} />}
            iconBg="rgba(239,68,68,0.1)"
            iconColor="var(--r)"
          >
            <div
              className="p-3 rounded-lg border"
              style={{
                background: "rgba(239,68,68,0.04)",
                borderColor: "rgba(239,68,68,0.2)",
              }}
            >
              <div className="text-[12px] font-semibold mb-1.5 text-t1">
                アカウントを完全に削除
              </div>
              <div className="text-[11px] text-t2 leading-relaxed mb-3">
                プロフィール · 学習進捗 · CTF 解答履歴 · ブックマーク等、すべてのデータが完全に削除されます。この操作は元に戻せません。
              </div>
              <button
                disabled
                className="px-3 py-1.5 rounded text-[11.5px] font-medium border cursor-not-allowed"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  borderColor: "rgba(239,68,68,0.25)",
                  color: "var(--r)",
                  opacity: 0.6,
                }}
              >
                アカウントを削除 (ログインが必要)
              </button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
