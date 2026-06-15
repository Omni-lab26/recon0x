import { cn } from "@/lib/utils";

interface MiniStatProps {
  label: string;
  value: string | React.ReactNode;
  delta?: string;
  deltaColor?: string;
  color?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Compact stat block — used inside panels for dense info grids.
 * Mirrors the dashboard's `.stat` mini-cards.
 */
export function MiniStat({
  label,
  value,
  delta,
  deltaColor,
  color,
  icon,
  className,
}: MiniStatProps) {
  return (
    <div
      className={cn(
        "p-2.5 bg-surf2 border border-bd rounded-lg",
        className
      )}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon && <span className="text-[11px]">{icon}</span>}
        <span className="eyebrow leading-none">{label}</span>
      </div>
      <div
        className="font-mono text-[16px] font-semibold leading-none mb-1"
        style={{ color: color ?? "var(--t1)", letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      {delta && (
        <div
          className="font-mono text-[9.5px]"
          style={{ color: deltaColor ?? "var(--t3)" }}
        >
          {delta}
        </div>
      )}
    </div>
  );
}
