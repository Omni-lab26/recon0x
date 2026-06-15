import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-1.5 font-medium cursor-pointer rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed leading-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "text-black font-semibold shadow-[0_4px_20px_rgba(34,197,94,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_4px_24px_rgba(34,197,94,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]",
  secondary: "bg-surf2 border border-bd2 text-t1 hover:bg-surf3 hover:border-bd3",
  ghost: "bg-transparent border border-bd2 text-t2 hover:text-t1 hover:border-bd3",
  danger: "bg-brand-red text-white hover:opacity-90",
};

const sizes = {
  sm: "px-3 py-1.5 text-[11.5px]",
  md: "px-4 py-2.5 text-[13px]",
  lg: "px-5 py-3 text-[14px]",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const style =
    variant === "primary"
      ? { background: "linear-gradient(180deg,#22C55E,#16A34A)" }
      : undefined;
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
