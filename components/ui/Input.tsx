import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mono?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { mono, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full bg-bg border border-bd2 rounded-lg px-3.5 py-2.5 text-t1 text-[13px] outline-none transition-colors",
        "focus:border-brand-green/40",
        "placeholder:text-t3",
        mono && "font-mono",
        className
      )}
      {...rest}
    />
  );
});
