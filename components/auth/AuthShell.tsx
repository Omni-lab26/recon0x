import { Logo } from "@/components/brand/Logo";

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="flex justify-center mb-8">
          <Logo size="lg" href="/" />
        </div>
        <div className="bg-surf border border-bd rounded-[14px] p-8 backdrop-blur-2xl">
          <h1 className="text-[22px] font-semibold tracking-tight2 mb-1.5">{title}</h1>
          {subtitle && (
            <p className="text-t2 text-[13px] mb-6 leading-relaxed">{subtitle}</p>
          )}
          {children}
        </div>
        {footer && (
          <div className="text-center mt-5 text-[12.5px] text-t2">{footer}</div>
        )}
      </div>
    </div>
  );
}
