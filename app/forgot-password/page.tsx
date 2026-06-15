"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const origin = window.location.origin;
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/reset-password`,
    });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <AuthShell
        title="メールを送信しました"
        subtitle={`${email} にパスワード再設定リンクを送りました。`}
      >
        <Link href="/login">
          <Button variant="ghost" className="w-full">
            ログイン画面に戻る
          </Button>
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="パスワードを再設定"
      subtitle="登録メールアドレスに再設定リンクを送信します。"
      footer={
        <Link href="/login" className="text-brand-green hover:underline">
          ログイン画面に戻る
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {error && (
          <div className="text-[12px] text-brand-red bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "送信中..." : "再設定リンクを送る"}
        </Button>
      </form>
    </AuthShell>
  );
}
