import { cn } from "@/lib/utils";

interface LivePillProps {
  label?: string;
  color?: "green" | "cyan" | "amber" | "red";
  size?: "sm" | "md";
  className?: string;
}

const colors = {
  green: { dot: "#22C55E", text: "#22C55E" },
  cyan: { dot: "#00D4FF", text: "#00D4FF" },
  amber: { dot: "#F59E0B", text: "#F59E0B" },
  red: { dot: "#EF4444", text: "#EF4444" },
};

export function LivePill({
  label = "LIVE",
  color = "green",
  size = "md",
  className,
}: LivePillProps) {
  const c = colors[color];
  const sizing =
    size === "sm" ? "px-2 py-0.5 text-[9.5px] gap-1.5" : "px-2.5 py-1 text-[10.5px] gap-2";
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-semibold tracking-[0.04em] uppercase rounded-full border",
        sizing,
        className
      )}
      style={{
        color: c.text,
        background: `${c.dot}10`,
        borderColor: `${c.dot}33`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-live"
        style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }}
      />
      {label}
    </span>
  );
}
