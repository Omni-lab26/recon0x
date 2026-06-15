// Class name utility (Tailwind-friendly).
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// XP -> Level
export function xpToLevel(xp: number): number {
  // Smooth curve: each level needs ~10% more than previous, starting at 100 XP
  // Level 1 = 0 XP, Level 2 = 100 XP, Level 3 = 220 XP, ...
  let lvl = 1;
  let req = 100;
  let total = 0;
  while (total + req <= xp) {
    total += req;
    req = Math.floor(req * 1.12);
    lvl++;
  }
  return lvl;
}

export function xpForNextLevel(xp: number): { current: number; next: number; pct: number } {
  let lvl = 1;
  let req = 100;
  let total = 0;
  while (total + req <= xp) {
    total += req;
    req = Math.floor(req * 1.12);
    lvl++;
  }
  return {
    current: xp - total,
    next: req,
    pct: Math.min(100, ((xp - total) / req) * 100),
  };
}

// Time helpers
export function relativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "たった今";
  if (min < 60) return `${min}分前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}時間前`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}日前`;
  return d.toLocaleDateString("ja-JP");
}
