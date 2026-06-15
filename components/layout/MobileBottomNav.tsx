"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconRoute,
  IconTerminal2,
  IconFlag,
  IconUser,
} from "@tabler/icons-react";

const TABS = [
  { href: "/", label: "ホーム", icon: IconHome },
  { href: "/learn", label: "学習", icon: IconRoute },
  { href: "/lab", label: "ラボ", icon: IconTerminal2 },
  { href: "/ctf", label: "CTF", icon: IconFlag, primary: true },
  { href: "/profile", label: "プロフィール", icon: IconUser },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="メインナビゲーション"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch safe-pb"
      style={{
        background: "var(--topbar-bg)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderTop: "1px solid var(--bd2)",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {TABS.map((tab) => {
        const active =
          tab.href === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.href);
        const Icon = tab.icon;

        if (tab.primary) {
          // 中央の CTF タブは強調
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 relative no-underline"
              style={{ minHeight: "60px" }}
            >
              <div
                className="absolute -top-3 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: active
                    ? "linear-gradient(135deg, #A855F7, #7C3AED)"
                    : "linear-gradient(135deg, #A855F7, #22C55E)",
                  boxShadow: active
                    ? "0 8px 24px rgba(168,85,247,0.5), 0 0 20px rgba(168,85,247,0.4)"
                    : "0 6px 16px rgba(168,85,247,0.35)",
                  border: "3px solid var(--bg)",
                }}
              >
                <Icon size={22} stroke={2} className="text-white" />
              </div>
              <span
                className="text-[11px] font-bold mt-9"
                style={{ color: active ? "#C084FC" : "var(--t2)" }}
              >
                {tab.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-label={tab.label}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors no-underline"
            style={{
              minHeight: "60px",
              color: active ? "var(--p)" : "var(--t3)",
            }}
          >
            <Icon
              size={22}
              stroke={active ? 2 : 1.6}
              style={{ color: active ? "var(--p)" : "var(--t3)" }}
            />
            <span
              className="text-[11px]"
              style={{
                fontWeight: active ? 600 : 500,
                color: active ? "var(--p)" : "var(--t3)",
              }}
            >
              {tab.label}
            </span>
            {active && (
              <span
                className="absolute top-0 w-8 h-[2px] rounded-full"
                style={{
                  background: "var(--p)",
                  boxShadow: "0 0 8px var(--p)",
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
