-- Weekly home objectives + completions + Jwan goals + sensory log (run in Supabase SQL Editor)

create table if not exists public.weekly_objectives (
  id uuid primary key default gen_random_uuid(),
  template_id text,
  week_start date not null,
  is_custom boolean default false,
  category text not null check (category in ('zones','sensory','emotion','pda','social','ot','enrichment','family')),
  title text not null,
  description text,
  source_reference text,
  assigned_to text default 'all',
  active_days integer[] default '{0,1,2,3,4}',
  is_active boolean default true,
  created_at timestamptz not null default now()
);

create unique index if not exists weekly_objectives_template_week_unique
  on public.weekly_objectives (template_id, week_start)
  where template_id is not null;

create table if not exists public.weekly_completions (
  id uuid primary key default gen_random_uuid(),
  objective_id uuid not null references public.weekly_objectives(id) on delete cascade,
  completion_date date not null,
  status text not null check (status in ('done','partial','skip','none')),
  notes text,
  logged_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique(objective_id, completion_date)
);

create table if not exists public.jwan_goals (
  id uuid primary key default gen_random_uuid(),
  goal_text text not null,
  is_done boolean default false,
  week_start date not null,
  created_at timestamptz not null default now()
);

create table if not exists public.sensory_log (
  id uuid primary key default gen_random_uuid(),
  session_type text not null check (session_type in ('morning','midday','afternoon')),
  log_date date not null,
  completed boolean default false,
  logged_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique(session_type, log_date)
);

alter table public.weekly_objectives enable row level security;
alter table public.weekly_completions enable row level security;
alter table public.jwan_goals enable row level security;
alter table public.sensory_log enable row level security;

drop policy if exists "All authenticated can manage objectives" on public.weekly_objectives;
create policy "All authenticated can manage objectives"
  on public.weekly_objectives for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "All authenticated can manage completions" on public.weekly_completions;
create policy "All authenticated can manage completions"
  on public.weekly_completions for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "All authenticated can manage jwan goals" on public.jwan_goals;
create policy "All authenticated can manage jwan goals"
  on public.jwan_goals for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "All authenticated can manage sensory log" on public.sensory_log;
create policy "All authenticated can manage sensory log"
  on public.sensory_log for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

notify pgrst, 'reload schema';
