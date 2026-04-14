-- Book Universe + Matilda desensitisation module

create table if not exists jwan_shelf (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  spine_color integer default 0,
  added_at timestamptz default now()
);

create table if not exists jwan_reading_log (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  pages integer default 0,
  status text check (status in ('reading','done','want')) default 'reading',
  note text,
  logged_at timestamptz default now()
);

create table if not exists jwan_bravery_steps (
  id uuid primary key default gen_random_uuid(),
  step_id text not null unique,
  completed_at timestamptz default now()
);

create table if not exists jwan_journal (
  id uuid primary key default gen_random_uuid(),
  entry_text text not null,
  comfort_level integer check (comfort_level between 1 and 5),
  created_at timestamptz default now()
);

create table if not exists jwan_comfort_log (
  id uuid primary key default gen_random_uuid(),
  level integer not null check (level between 1 and 5),
  context text,
  logged_at timestamptz default now()
);

create table if not exists jwan_quiz_scores (
  id uuid primary key default gen_random_uuid(),
  score integer not null,
  total integer not null,
  streak integer default 0,
  session_date date default current_date
);

alter table jwan_shelf enable row level security;
alter table jwan_reading_log enable row level security;
alter table jwan_bravery_steps enable row level security;
alter table jwan_journal enable row level security;
alter table jwan_comfort_log enable row level security;
alter table jwan_quiz_scores enable row level security;

drop policy if exists "Authenticated users can manage jwan_shelf" on jwan_shelf;
create policy "Authenticated users can manage jwan_shelf" on jwan_shelf for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "Authenticated users can manage jwan_reading_log" on jwan_reading_log;
create policy "Authenticated users can manage jwan_reading_log" on jwan_reading_log for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "Authenticated users can manage jwan_bravery_steps" on jwan_bravery_steps;
create policy "Authenticated users can manage jwan_bravery_steps" on jwan_bravery_steps for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "Authenticated users can manage jwan_journal" on jwan_journal;
create policy "Authenticated users can manage jwan_journal" on jwan_journal for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "Authenticated users can manage jwan_comfort_log" on jwan_comfort_log;
create policy "Authenticated users can manage jwan_comfort_log" on jwan_comfort_log for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "Authenticated users can manage jwan_quiz_scores" on jwan_quiz_scores;
create policy "Authenticated users can manage jwan_quiz_scores" on jwan_quiz_scores for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into jwan_shelf (title, author, spine_color) values
  ('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 0),
  ('Matilda', 'Roald Dahl', 1),
  ('The Secret Garden', 'Frances Hodgson Burnett', 2),
  ('Coraline', 'Neil Gaiman', 3),
  ('The Westing Game', 'Ellen Raskin', 4),
  ('A Wrinkle in Time', 'Madeleine L''Engle', 5)
on conflict do nothing;

notify pgrst, 'reload schema';
