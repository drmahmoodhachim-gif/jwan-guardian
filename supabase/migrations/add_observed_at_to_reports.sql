-- Run once in Supabase SQL Editor if `reports` already exists without `observed_at`.

alter table public.reports add column if not exists observed_at timestamptz;

update public.reports
set observed_at = created_at
where observed_at is null;

alter table public.reports alter column observed_at set default now();

alter table public.reports
  alter column observed_at set not null;
