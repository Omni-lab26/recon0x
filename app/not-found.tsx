import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-[14px] text-brand-green mb-4">
        $ status — page not found
      </div>
      <h1 className="text-[64px] font-semibold tracking-tightest leading-none mb-4">
        404
      </h1>
      <p className="text-t2 text-[14px] mb-8 max-w-md">
        お探しのページは見つかりません。URL を確認するか、ホームに戻ってください。
      </p>
      <Link href="/">
        <Button variant="primary">ホームへ戻る</Button>
      </Link>
    </div>
  );
}
