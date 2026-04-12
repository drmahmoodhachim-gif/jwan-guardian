-- Structured option fields for team observations (setting, mood, strategies).
-- Run once in Supabase SQL Editor on existing databases.

alter table public.reports add column if not exists setting_key text;

alter table public.reports add column if not exists mood_key text;

alter table public.reports add column if not exists strategy_keys text[] default '{}';

update public.reports set strategy_keys = '{}' where strategy_keys is null;
