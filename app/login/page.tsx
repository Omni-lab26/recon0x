"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <AuthShell
      title="ログイン"
      subtitle="アカウントにアクセスして学習を続けましょう。"
      footer={
        <>
          アカウントをお持ちでない方は{" "}
          <Link href="/signup" className="text-brand-green hover:underline">
            サインアップ
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-[11.5px] text-t2 mb-1.5 font-medium">
            メールアドレス
          </label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[11.5px] text-t2 font-medium">
              パスワード
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-brand-cyan hover:text-brand-green"
            >
              お忘れですか?
            </Link>
          </div>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        {error && (
          <div className="text-[12px] text-brand-red bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "ログイン中..." : "ログイン"}
        </Button>
      </form>
    </AuthShell>
  );
}
