-- recon0x: progress tracking (roadmap steps, articles, ctf)

CREATE TABLE IF NOT EXISTS public.progress (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,        -- 'roadmap' | 'article' | 'ctf' | 'lab'
  item_id TEXT NOT NULL,     -- slug or external id
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, kind, item_id)
);

CREATE INDEX IF NOT EXISTS progress_user_idx ON public.progress(user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS progress_kind_idx ON public.progress(kind);

ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "progress_read_own" ON public.progress;
CREATE POLICY "progress_read_own" ON public.progress
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "progress_write_own" ON public.progress;
CREATE POLICY "progress_write_own" ON public.progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "progress_delete_own" ON public.progress;
CREATE POLICY "progress_delete_own" ON public.progress
  FOR DELETE USING (auth.uid() = user_id);
