import { cn } from "@/lib/utils";

interface PanelProps {
  eyebrow?: string;
  title?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  noPadding?: boolean;
  hover?: boolean;
}

/**
 * Dashboard-quality card panel. Matches the home dashboard's `.card` pattern.
 * Use for any content card on dashboard-style pages.
 */
export function Panel({
  eyebrow,
  title,
  icon,
  iconBg = "rgba(255,255,255,0.04)",
  iconColor,
  right,
  children,
  className,
  style,
  noPadding = false,
  hover = true,
}: PanelProps) {
  return (
    <section
      className={cn(
        "bg-surf border border-bd rounded-[11px] overflow-hidden flex flex-col",
        hover && "transition-colors duration-200 hover:border-bd2",
        className
      )}
      style={style}
    >
      {(eyebrow || title || icon || right) && (
        <div className="flex items-center gap-2.5 px-3.5 pt-2.5 pb-2 border-b border-bd flex-shrink-0">
          {icon && (
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: iconBg, color: iconColor }}
            >
              {icon}
            </div>
          )}
          {(eyebrow || title) && (
            <div className="flex-1 min-w-0">
              {eyebrow && (
                <div className="eyebrow leading-none mb-0.5">{eyebrow}</div>
              )}
              {title && (
                <div className="text-[12.5px] font-semibold tracking-[-0.01em] leading-[1.2]">
                  {title}
                </div>
              )}
            </div>
          )}
          {right && <div className="ml-auto flex-shrink-0">{right}</div>}
        </div>
      )}
      <div className={cn(noPadding ? "" : "px-3.5 py-2.5", "flex-1 min-w-0")}>
        {children}
      </div>
    </section>
  );
}
