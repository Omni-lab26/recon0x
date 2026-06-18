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
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[220px]">
        <Topbar
          user={user ? { name: user.name, level: user.level, xp: user.xp } : null}
        />
        <main className="flex-1 px-0 lg:px-8 py-0 lg:py-8 min-w-0 app-main-pb">
          {children}
        </main>
      </div>

      <MobileBottomNav />
      <CommandPalette />
    </div>
  );
}
