// Design tokens. Mirror of CSS vars in globals.css for use in inline styles.
export const C = {
  bg: "#050505",
  bg2: "#0A0A0B",
  surf: "rgba(255,255,255,0.025)",
  surf2: "rgba(255,255,255,0.04)",
  surf3: "rgba(255,255,255,0.06)",
  bd: "rgba(255,255,255,0.06)",
  bd2: "rgba(255,255,255,0.1)",
  bd3: "rgba(255,255,255,0.14)",
  t1: "#F4F4F5",
  t2: "#A1A1AA",
  t3: "#52525B",
  t4: "#27272A",
  g: "#22C55E",
  c: "#00D4FF",
  a: "#F59E0B",
  r: "#EF4444",
  p: "#8B5CF6",
} as const;

export const FIELDS = [
  { key: "linux", name: "Linux 基礎", glyph: "$", c: "#22C55E", desc: "すべての土台。ここから始まる。" },
  { key: "net", name: "ネットワーク", glyph: "◇", c: "#06B6D4", desc: "パケットの旅を理解する。" },
  { key: "web", name: "Web セキュリティ", glyph: "</>", c: "#2B7FFF", desc: "最も実戦的で、入口に最適。" },
  { key: "crypto", name: "暗号解析", glyph: "#", c: "#8B5CF6", desc: "数学的な弱点を突く。" },
  { key: "pwn", name: "Pwn / バイナリ", glyph: "!", c: "#EF4444", desc: "メモリの底を覗く。最難関。" },
  { key: "forensic", name: "フォレンジック", glyph: "◎", c: "#F59E0B", desc: "痕跡から真実を読む。" },
  { key: "osint", name: "Recon / OSINT", glyph: "◉", c: "#F4564A", desc: "偵察 — recon0x の真髄。" },
] as const;

export type FieldKey = (typeof FIELDS)[number]["key"];

export const RANKS = [
  { key: "novice", emoji: "🌱", name: "初心者", range: "Lv.1〜9", min: 0 },
  { key: "explorer", emoji: "🔭", name: "探索者", range: "Lv.10〜24", min: 1500 },
  { key: "analyst", emoji: "🔬", name: "解析者", range: "Lv.25〜39", min: 17000 },
  { key: "operator", emoji: "⚙️", name: "オペレーター", range: "Lv.40〜59", min: 50000 },
  { key: "hunter", emoji: "🦅", name: "ハンター", range: "Lv.60〜79", min: 120000 },
  { key: "expert", emoji: "💀", name: "エキスパート", range: "Lv.80+", min: 250000 },
] as const;
