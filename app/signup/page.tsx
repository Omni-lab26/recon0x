"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const origin = window.location.origin;
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${origin}/auth/callback` },
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
        title="確認メールを送信しました"
        subtitle={`${email} に確認リンクを送りました。メール内のリンクをクリックして登録を完了してください。`}
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
      title="アカウントを作成"
      subtitle="無料で学習を始めましょう。"
      footer={
        <>
          既にアカウントをお持ちですか?{" "}
          <Link href="/login" className="text-brand-green hover:underline">
            ログイン
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
          <label className="block text-[11.5px] text-t2 mb-1.5 font-medium">
            パスワード (8文字以上)
          </label>
          <Input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        {error && (
          <div className="text-[12px] text-brand-red bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "登録中..." : "サインアップ"}
        </Button>
        <p className="text-[10.5px] text-t3 leading-relaxed text-center">
          登録することで利用規約とプライバシーポリシーに同意したものとみなされます。
        </p>
      </form>
    </AuthShell>
  );
}
