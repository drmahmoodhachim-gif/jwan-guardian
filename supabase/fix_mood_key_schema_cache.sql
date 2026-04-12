-- Fix: "Could not find the 'mood_key' column of 'reports' in the schema cache"
--
-- Cause: The live `reports` table was created before `mood_key` (and related columns)
-- existed. PostgREST returns this error when INSERT/SELECT references a missing column.
--
-- Run this once in: Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run: uses IF NOT EXISTS.

alter table public.reports add column if not exists setting_key text;
alter table public.reports add column if not exists mood_key text;
alter table public.reports add column if not exists strategy_keys text[] default '{}';

update public.reports set strategy_keys = '{}' where strategy_keys is null;

-- Ask PostgREST to reload the schema (helps if the API still caches old columns).
notify pgrst, 'reload schema';
