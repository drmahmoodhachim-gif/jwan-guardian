-- Run in Supabase SQL Editor in order (from CURSOR_JWAN_GUARDIAN.md)

-- 1. profiles
create table profiles (
  id uuid references auth.users primary key,
  full_name text not null,
  role text not null check (role in ('dad','mom','teacher','therapist','doctor','jwan','admin')),
  avatar_url text,
  preferred_lang text default 'en' check (preferred_lang in ('en','ar')),
  created_at timestamptz default now()
);

alter table profiles enable row level security;
create policy "Users can read all profiles" on profiles for select using (auth.role() = 'authenticated');
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- 2. reports
create table reports (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete cascade,
  role text not null,
  domain text not null check (domain in ('social','emotion','attention','language','motor','sensory','adaptive','general')),
  rating integer check (rating between 1 and 5),
  context text,
  what_happened text not null,
  jwan_response text,
  mood text,
  strategies_used text,
  setting_key text,
  mood_key text,
  strategy_keys text[] default '{}',
  observed_at timestamptz not null default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table reports enable row level security;
create policy "Authenticated users can read all reports" on reports for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert reports" on reports for insert with check (auth.role() = 'authenticated');
create policy "Authors can update own reports" on reports for update using (auth.uid() = author_id);
create policy "Authors can delete own reports" on reports for delete using (auth.uid() = author_id);

-- 3. checkins
create table checkins (
  id uuid primary key default gen_random_uuid(),
  mood text not null check (mood in ('happy','calm','worried','frustrated','sad','excited','overwhelmed')),
  mood_note text,
  zone text check (zone in ('blue','green','yellow','red')),
  created_at timestamptz default now()
);

alter table checkins enable row level security;
create policy "Anyone authenticated can manage checkins" on checkins for all using (auth.role() = 'authenticated');

-- 4. achievements
create table achievements (
  id uuid primary key default gen_random_uuid(),
  text_en text not null,
  text_ar text,
  added_by uuid references profiles(id),
  is_jwan_entry boolean default false,
  created_at timestamptz default now()
);

alter table achievements enable row level security;
create policy "All authenticated users can read achievements" on achievements for select using (auth.role() = 'authenticated');
create policy "All authenticated users can add achievements" on achievements for insert with check (auth.role() = 'authenticated');

-- 5. reminders
create table reminders (
  id uuid primary key default gen_random_uuid(),
  text_en text not null,
  text_ar text,
  frequency text default 'weekly' check (frequency in ('once','daily','weekly','monthly')),
  assigned_to text default 'all',
  is_active boolean default true,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

alter table reminders enable row level security;
create policy "All authenticated can read reminders" on reminders for select using (auth.role() = 'authenticated');
create policy "All authenticated can manage reminders" on reminders for all using (auth.role() = 'authenticated');

-- 6. skill_ratings
create table skill_ratings (
  id uuid primary key default gen_random_uuid(),
  domain text not null,
  rating integer not null check (rating between 1 and 5),
  notes text,
  rated_by uuid references profiles(id),
  created_at timestamptz default now()
);

alter table skill_ratings enable row level security;
create policy "All authenticated can read skill_ratings" on skill_ratings for select using (auth.role() = 'authenticated');
create policy "All authenticated can insert skill_ratings" on skill_ratings for insert with check (auth.role() = 'authenticated');

-- 7. ai_assessments (ecological tasks — see migrations/ai_assessments.sql for idempotent variant)
create table ai_assessments (
  id uuid primary key default gen_random_uuid(),
  task_type text not null check (task_type in ('emo_detective','memory_spark','story_mind','my_world')),
  score integer,
  max_span integer,
  accuracy_pct integer,
  domain_scores jsonb,
  raw_responses jsonb,
  world_ratings jsonb,
  world_demand_avg real,
  world_safety_avg real,
  session_date timestamptz default now()
);

alter table ai_assessments enable row level security;
create policy "All authenticated can manage assessments" on ai_assessments for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 8. seed default reminders
insert into reminders (text_en, text_ar, frequency, assigned_to) values
('Daily check-in with Jwan — how was her day?', 'تسجيل يومي مع جوان — كيف كان يومها؟', 'daily', 'all'),
('Log one team observation in reports', 'تسجيل ملاحظة فريق واحدة', 'weekly', 'all'),
('Schedule PEERS program consultation — Jwan is age 9', 'جدولة استشارة برنامج PEERS — جوان في سن 9', 'once', 'dad'),
('Contact Dr. Zeinab Alloub for age-9 reassessment (AJCH)', 'التواصل مع د. زينب علوب لإعادة التقييم في سن 9', 'once', 'dad'),
('Weekly team sync — review domain matrix together', 'مزامنة الفريق الأسبوعية — مراجعة مصفوفة المجالات معاً', 'weekly', 'all');
