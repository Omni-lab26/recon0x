import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/ctf/submit
// Body: { challengeId: string, flag: string }
// Validates the submitted flag against ctf_challenges.flag and records a solve.
export async function POST(req: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { challengeId, flag } = (await req.json()) as {
    challengeId?: string;
    flag?: string;
  };
  if (!challengeId || !flag) {
    return NextResponse.json(
      { error: "challengeId と flag が必要です" },
      { status: 400 }
    );
  }

  // Fetch the challenge.
  const { data: challenge, error } = await supabase
    .from("ctf_challenges")
    .select("id, flag, points")
    .eq("id", challengeId)
    .single();

  if (error || !challenge) {
    return NextResponse.json({ error: "問題が見つかりません" }, { status: 404 });
  }

  const correct = challenge.flag.trim() === flag.trim();

  // Always record the attempt (correct or not) for analytics.
  await supabase.from("ctf_attempts").insert({
    user_id: user.id,
    challenge_id: challengeId,
    correct,
  });

  if (correct) {
    // Insert solve (unique constraint prevents double-counting XP).
    const { error: solveErr } = await supabase
      .from("ctf_solves")
      .insert({ user_id: user.id, challenge_id: challengeId });

    if (!solveErr) {
      // Award XP.
      await supabase.rpc("award_xp", {
        p_user_id: user.id,
        p_amount: challenge.points,
        p_reason: `ctf:${challengeId}`,
      });
    }
  }

  return NextResponse.json({ correct, points: correct ? challenge.points : 0 });
}
