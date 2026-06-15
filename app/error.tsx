"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-[14px] text-brand-red mb-4">
        $ kernel panic — unexpected error
      </div>
      <h1 className="text-[42px] font-semibold tracking-tighter2 leading-tight mb-4">
        エラーが発生しました
      </h1>
      <p className="text-t2 text-[14px] mb-8 max-w-md">
        予期しないエラーが発生しました。再読み込みを試してください。
      </p>
      <div className="flex gap-2">
        <Button variant="primary" onClick={reset}>
          再試行
        </Button>
        <a href="/">
          <Button variant="ghost">ホームへ戻る</Button>
        </a>
      </div>
    </div>
  );
}
