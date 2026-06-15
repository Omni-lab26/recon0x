-- recon0x: CTF challenges, solves, attempts

CREATE TABLE IF NOT EXISTS public.ctf_challenges (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,        -- 'web' | 'crypto' | 'forensic' | 'pwn' | 'osint' | 'misc'
  difficulty TEXT NOT NULL,      -- 'easy' | 'medium' | 'hard'
  points INTEGER NOT NULL,
  flag TEXT NOT NULL,            -- stored as plain text (server checks); rotate if leaked
  hints JSONB DEFAULT '[]'::jsonb,
  files JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ctf_challenges ENABLE ROW LEVEL SECURITY;

-- Public can read published challenges, but NEVER the flag column.
-- Apps must select only safe columns; we expose a view that omits flag.
DROP POLICY IF EXISTS "challenges_read_published" ON public.ctf_challenges;
CREATE POLICY "challenges_read_published" ON public.ctf_challenges
  FOR SELECT USING (is_published = true);

-- Safe view for clients (excludes flag).
CREATE OR REPLACE VIEW public.ctf_challenges_public AS
  SELECT id, title, description, category, difficulty, points, hints, files, created_at
  FROM public.ctf_challenges
  WHERE is_published = true;

-- Grant access on the view.
GRANT SELECT ON public.ctf_challenges_public TO anon, authenticated;

-- Solves: one row per (user, challenge), prevents duplicate XP.
CREATE TABLE IF NOT EXISTS public.ctf_solves (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id TEXT NOT NULL REFERENCES public.ctf_challenges(id) ON DELETE CASCADE,
  solved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, challenge_id)
);

ALTER TABLE public.ctf_solves ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "solves_read_all" ON public.ctf_solves;
CREATE POLICY "solves_read_all" ON public.ctf_solves
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "solves_insert_own" ON public.ctf_solves;
CREATE POLICY "solves_insert_own" ON public.ctf_solves
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Attempts: for analytics (correct + incorrect).
CREATE TABLE IF NOT EXISTS public.ctf_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id TEXT NOT NULL REFERENCES public.ctf_challenges(id) ON DELETE CASCADE,
  correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS attempts_user_idx ON public.ctf_attempts(user_id, attempted_at DESC);
CREATE INDEX IF NOT EXISTS attempts_challenge_idx ON public.ctf_attempts(challenge_id);

ALTER TABLE public.ctf_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "attempts_read_own" ON public.ctf_attempts;
CREATE POLICY "attempts_read_own" ON public.ctf_attempts
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "attempts_insert_own" ON public.ctf_attempts;
CREATE POLICY "attempts_insert_own" ON public.ctf_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
