-- Structured option fields for team observations (setting, mood, strategies).
-- Run once in Supabase SQL Editor on existing databases.
--
-- If you see: Could not find the 'mood_key' column of 'reports' in the schema cache
-- → run this file (or ../fix_mood_key_schema_cache.sql), then retry the app.

alter table public.reports add column if not exists setting_key text;

alter table public.reports add column if not exists mood_key text;

alter table public.reports add column if not exists strategy_keys text[] default '{}';

update public.reports set strategy_keys = '{}' where strategy_keys is null;

notify pgrst, 'reload schema';
