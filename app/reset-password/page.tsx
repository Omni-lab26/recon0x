"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    router.push("/login");
  }

  return (
    <AuthShell
      title="新しいパスワードを設定"
      subtitle="8文字以上の安全なパスワードを設定してください。"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />
        {error && (
          <div className="text-[12px] text-brand-red bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "更新中..." : "パスワードを更新"}
        </Button>
      </form>
    </AuthShell>
  );
}
