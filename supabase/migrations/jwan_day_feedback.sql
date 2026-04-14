-- Daily feedback + exercises for Jwan page

create table if not exists public.jwan_day_feedback (
  id uuid primary key default gen_random_uuid(),
  feedback_date date not null unique default current_date,
  note text not null default '',
  exercises jsonb not null default '{}'::jsonb,
  ai_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.jwan_day_feedback enable row level security;

drop policy if exists "All authenticated can manage jwan day feedback" on public.jwan_day_feedback;
create policy "All authenticated can manage jwan day feedback"
  on public.jwan_day_feedback for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

notify pgrst, 'reload schema';
