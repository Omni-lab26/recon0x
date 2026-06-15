-- recon0x: XP transactions and award function

CREATE TABLE IF NOT EXISTS public.xp_transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS xp_tx_user_idx ON public.xp_transactions(user_id, created_at DESC);

ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "xp_read_own" ON public.xp_transactions;
CREATE POLICY "xp_read_own" ON public.xp_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- award_xp: insert a transaction and bump total_xp on profile.
-- SECURITY DEFINER so server routes (with anon key + RLS) can call it after auth check.
CREATE OR REPLACE FUNCTION public.award_xp(
  p_user_id UUID,
  p_amount INTEGER,
  p_reason TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.xp_transactions (user_id, amount, reason)
  VALUES (p_user_id, p_amount, p_reason);

  UPDATE public.profiles
  SET total_xp = total_xp + p_amount,
      last_active_at = now()
  WHERE id = p_user_id;
END;
$$;
