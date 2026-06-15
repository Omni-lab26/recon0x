import { LivePill } from "@/components/home/LivePill";

interface OpsStat {
  label: string;
  value: string | number;
  color?: string;
  delta?: string;
}

interface OpsHeaderProps {
  eyebrow: string;
  title: string | React.ReactNode;
  description?: string;
  stats?: OpsStat[];
  live?: { label?: string; color?: "green" | "cyan" | "amber" | "red" };
  action?: React.ReactNode;
}

/**
 * Page-level operations header used by all dashboard-quality pages.
 * Mirrors the OPS status bar pattern from the home dashboard.
 */
export function OpsHeader({
  eyebrow,
  title,
  description,
  stats,
  live,
  action,
}: OpsHeaderProps) {
  return (
    <header className="mb-5">
      <div className="flex items-start justify-between gap-6 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="eyebrow">{eyebrow}</span>
            {live && <LivePill label={live.label} color={live.color} size="sm" />}
          </div>
          <h1 className="text-[28px] font-semibold tracking-[-0.025em] leading-[1.15] mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-t2 text-[13.5px] leading-[1.55] max-w-[640px]">
              {description}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>

      {stats && stats.length > 0 && (
        <div
          className="flex items-center h-[34px] rounded-[10px] border"
          style={{
            background: "rgba(11,18,32,0.45)",
            borderColor: "var(--bd)",
            backdropFilter: "blur(20px)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-4 h-full font-mono text-[10.5px]"
              style={{
                borderRight:
                  i < stats.length - 1 ? "1px solid var(--bd)" : undefined,
              }}
            >
              <span className="text-t3 uppercase tracking-[0.06em] text-[9.5px]">
                {s.label}
              </span>
              <span className="text-t1 font-semibold" style={{ color: s.color }}>
                {s.value}
              </span>
              {s.delta && <span className="text-t3 text-[9.5px]">{s.delta}</span>}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
