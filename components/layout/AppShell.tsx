import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileBottomNav } from "./MobileBottomNav";
import { CommandPalette } from "@/components/ui/CommandPalette";

interface AppShellProps {
  user?: { name: string; level: number; rank: string; xp: number } | null;
  children: React.ReactNode;
}

export function AppShell({ user, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          user={user ? { name: user.name, level: user.level, xp: user.xp } : null}
        />
        {/* モバイル: pb-24(Bottom Nav 80px + 余白)、デスクトップ: 通常 */}
        <main className="flex-1 px-0 lg:px-8 py-0 lg:py-8 pb-24 lg:pb-8 overflow-x-hidden safe-pb">
          {children}
        </main>
      </div>

      {/* 固定 Bottom Nav — モバイル限定 */}
      <MobileBottomNav />

      <CommandPalette />
    </div>
  );
}
