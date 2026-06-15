import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  showBadge?: boolean;
  className?: string;
}

const sizes = {
  sm: { mark: "w-6 h-6 text-[10px] rounded", text: "text-[13px]" },
  md: { mark: "w-7 h-7 text-[11px] rounded-md", text: "text-[15px]" },
  lg: { mark: "w-9 h-9 text-[14px] rounded-lg", text: "text-[18px]" },
};

export function Logo({
  size = "md",
  href,
  showBadge = false,
  className,
}: LogoProps) {
  const s = sizes[size];
  const inner = (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex items-center justify-center font-mono font-bold text-black flex-shrink-0",
          s.mark
        )}
        style={{
          background: "linear-gradient(135deg, #22C55E, #16A34A)",
          boxShadow: "0 0 20px rgba(34,197,94,0.4)",
        }}
      >
        R
      </div>
      <div className="flex flex-col">
        <span className={cn("font-semibold tracking-[-0.02em] leading-none", s.text)}>
          recon<span className="text-brand-green">0x</span>
        </span>
        {showBadge && (
          <span className="font-mono text-[9.5px] text-t3 tracking-[0.06em] mt-0.5">
            v0.1 BETA
          </span>
        )}
      </div>
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="no-underline">
        {inner}
      </Link>
    );
  }
  return inner;
}
