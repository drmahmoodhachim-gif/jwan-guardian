-- Run once in Supabase SQL Editor so the app receives live report updates.
-- Dashboard + reports page subscribe to postgres_changes on public.reports.

alter publication supabase_realtime add table public.reports;
alter publication supabase_realtime add table public.checkins;
alter publication supabase_realtime add table public.achievements;
alter publication supabase_realtime add table public.reminders;
