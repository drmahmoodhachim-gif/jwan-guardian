-- Ecological assessment tasks + longitudinal tracking (run in Supabase SQL Editor)

create table if not exists public.ai_assessments (
  id uuid primary key default gen_random_uuid(),
  task_type text not null check (task_type in ('emo_detective', 'memory_spark', 'story_mind', 'my_world')),
  score integer,
  max_span integer,
  accuracy_pct integer,
  domain_scores jsonb,
  raw_responses jsonb,
  world_ratings jsonb,
  world_demand_avg real,
  world_safety_avg real,
  session_date timestamptz not null default now()
);

alter table public.ai_assessments enable row level security;

drop policy if exists "All authenticated can manage assessments" on public.ai_assessments;
create policy "All authenticated can manage assessments"
  on public.ai_assessments for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

notify pgrst, 'reload schema';
