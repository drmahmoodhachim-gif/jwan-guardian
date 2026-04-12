# CURSOR BUILD GUIDE — Jwan's Guardian Platform (جوان)
## Version 1.0 | React 18 + Vite + TypeScript + Tailwind + Supabase + Netlify

---

## PROJECT OVERVIEW

Build a bilingual (English / Arabic RTL) progressive web application for **Jwan Al Mashhadani** — a 9-year-old twice-exceptional girl (Mild ASD + Giftedness, IQ 130) living in Dubai — and her entire care team (Dad, Mom, Teacher, Therapist, Doctor).

**Live URL target**: jwan-guardian.netlify.app (or similar)
**GitHub repo**: create as `jwan-guardian` under drmahmoodhachim-gif
**Supabase project**: new project `jwan-guardian`

The platform serves two audiences simultaneously:
1. **Care team** (adults): report logging, progress monitoring, AI analysis, reminders, biology education
2. **Jwan herself** (9 years old): her own private corner with AI friend, mood check-ins, achievements, breathing tool

---

## TECH STACK

```
Frontend:   React 18 + Vite + TypeScript + Tailwind CSS
Database:   Supabase (PostgreSQL + Auth + Realtime + Storage)
AI:         Anthropic Claude API (claude-sonnet-4-20250514)
i18n:       react-i18next (English primary, Arabic RTL secondary)
Routing:    React Router v6
Icons:      Lucide React
Charts:     Recharts
Deployment: Netlify (auto-deploy from GitHub main branch)
```

---

## ENVIRONMENT VARIABLES

Create `.env.local` (never commit):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ANTHROPIC_API_KEY=your_anthropic_key
```

Netlify environment variables — set the same three in Netlify dashboard under Site Settings > Environment Variables.

---

## SUPABASE SCHEMA

Run all SQL in Supabase SQL Editor in order.

### 1. profiles
```sql
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
```

### 2. reports
```sql
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
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table reports enable row level security;
create policy "Authenticated users can read all reports" on reports for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert reports" on reports for insert with check (auth.role() = 'authenticated');
create policy "Authors can update own reports" on reports for update using (auth.uid() = author_id);
create policy "Authors can delete own reports" on reports for delete using (auth.uid() = author_id);
```

### 3. checkins (Jwan's private mood log)
```sql
create table checkins (
  id uuid primary key default gen_random_uuid(),
  mood text not null check (mood in ('happy','calm','worried','frustrated','sad','excited','overwhelmed')),
  mood_note text,
  zone text check (zone in ('blue','green','yellow','red')),
  created_at timestamptz default now()
);

alter table checkins enable row level security;
create policy "Anyone authenticated can manage checkins" on checkins for all using (auth.role() = 'authenticated');
```

### 4. achievements (Jwan's wins)
```sql
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
```

### 5. reminders
```sql
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
```

### 6. skill_ratings (per-domain snapshot ratings)
```sql
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
```

### 7. seed default reminders
```sql
insert into reminders (text_en, text_ar, frequency, assigned_to) values
('Daily check-in with Jwan — how was her day?', 'تسجيل يومي مع جوان — كيف كان يومها؟', 'daily', 'all'),
('Log one team observation in reports', 'تسجيل ملاحظة فريق واحدة', 'weekly', 'all'),
('Schedule PEERS program consultation — Jwan is age 9', 'جدولة استشارة برنامج PEERS — جوان في سن 9', 'once', 'dad'),
('Contact Dr. Zeinab Alloub for age-9 reassessment (AJCH)', 'التواصل مع د. زينب علوب لإعادة التقييم في سن 9', 'once', 'dad'),
('Weekly team sync — review domain matrix together', 'مزامنة الفريق الأسبوعية — مراجعة مصفوفة المجالات معاً', 'weekly', 'all');
```

---

## PROJECT STRUCTURE

```
jwan-guardian/
├── public/
│   ├── favicon.ico
│   └── manifest.json          # PWA manifest
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Live age, language toggle, user menu
│   │   │   ├── Navigation.tsx  # 6 main section tabs
│   │   │   └── Layout.tsx      # Root layout wrapper
│   │   ├── dashboard/
│   │   │   ├── DomainMatrix.tsx # 8 domain tiles with live scores
│   │   │   ├── ActivityFeed.tsx # Recent reports feed (realtime)
│   │   │   ├── PriorityCards.tsx # Weekly priority actions
│   │   │   └── AIInsights.tsx  # AI pattern analysis button + output
│   │   ├── reports/
│   │   │   ├── ReportForm.tsx  # Add report form (all roles)
│   │   │   ├── ReportList.tsx  # Filterable report list
│   │   │   ├── ReportCard.tsx  # Individual report card
│   │   │   └── ProgressCharts.tsx # Domain score charts (Recharts)
│   │   ├── jwan/
│   │   │   ├── JwanCorner.tsx  # Container with sub-tabs
│   │   │   ├── AIChat.tsx      # AI friend chat (Anthropic API)
│   │   │   ├── MoodCheckin.tsx # Emoji mood selector + history
│   │   │   ├── Superpowers.tsx # Strengths board with assessment data
│   │   │   ├── Achievements.tsx # Achievement log (Jwan + team)
│   │   │   └── BreathingTool.tsx # Animated breathing exercise
│   │   ├── brain/
│   │   │   ├── BrainOverview.tsx  # SVG brain diagram + plain language
│   │   │   ├── SocialBrain.tsx    # STS/TPJ/amygdala diagram
│   │   │   ├── FeelingsCircuit.tsx # Amygdala-PFC diagram
│   │   │   ├── AttentionCircuit.tsx # PFC-caudate-ACC diagram
│   │   │   └── GiftSection.tsx    # IQ scores + what they mean
│   │   ├── guide/
│   │   │   ├── GoldenRules.tsx   # Evidence-based care rules
│   │   │   ├── DailyRoutine.tsx  # Routine template
│   │   │   ├── CrisisProtocol.tsx # Ears-fingers protocol
│   │   │   └── EvidenceBase.tsx  # PEERS, Zones, CBT summaries
│   │   ├── reminders/
│   │   │   ├── ReminderForm.tsx
│   │   │   └── ReminderList.tsx
│   │   └── ui/
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── ProgressBar.tsx
│   │       ├── StarRating.tsx
│   │       ├── Alert.tsx
│   │       └── LoadingSpinner.tsx
│   ├── pages/
│   │   ├── Login.tsx           # Supabase email auth
│   │   ├── Register.tsx        # New team member registration
│   │   └── App.tsx             # Main app with all sections
│   ├── hooks/
│   │   ├── useReports.ts       # Supabase reports CRUD + realtime
│   │   ├── useCheckins.ts      # Checkin CRUD
│   │   ├── useAchievements.ts  # Achievements CRUD
│   │   ├── useReminders.ts     # Reminders CRUD
│   │   ├── useAge.ts           # Live age calculator from 17 Sep 2016
│   │   └── useLanguage.ts      # EN/AR toggle + RTL
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   ├── anthropic.ts        # Anthropic API wrapper
│   │   ├── i18n.ts             # react-i18next config
│   │   └── constants.ts        # Domain definitions, Jwan's DOB, assessment data
│   ├── locales/
│   │   ├── en.json             # English strings
│   │   └── ar.json             # Arabic strings
│   ├── types/
│   │   └── index.ts            # TypeScript types for all entities
│   └── main.tsx
├── netlify.toml
├── vite.config.ts
├── tailwind.config.ts
└── .env.local
```

---

## CONSTANTS — JWAN'S CORE DATA

Put in `src/lib/constants.ts`:

```typescript
export const JWAN_DOB = new Date('2016-09-17');

export const DOMAINS = [
  { id: 'social',    en: 'Social skills',    ar: 'مهارات اجتماعية', status: 'focus',    color: 'coral' },
  { id: 'emotion',   en: 'Emotion',          ar: 'المشاعر',          status: 'focus',    color: 'coral' },
  { id: 'attention', en: 'Attention',        ar: 'الانتباه',         status: 'monitor',  color: 'amber' },
  { id: 'language',  en: 'Language',         ar: 'اللغة',            status: 'strength', color: 'teal'  },
  { id: 'motor',     en: 'Motor',            ar: 'الحركة',           status: 'monitor',  color: 'amber' },
  { id: 'sensory',   en: 'Sensory',          ar: 'الحواس',           status: 'monitor',  color: 'amber' },
  { id: 'adaptive',  en: 'Adaptive',         ar: 'التكيف',           status: 'monitor',  color: 'amber' },
  { id: 'general',   en: 'General',          ar: 'عام',              status: 'neutral',  color: 'gray'  },
];

export const ASSESSMENT_HISTORY = [
  {
    date: '2021-06-01',
    age: '4y10m',
    source: 'OpenMinds — KABC-II + GARS-3 + BASC-3',
    clinician: 'Carla Chedid',
    keyFindings: 'KABC-II FCI=128 (97th pct). GARS-3 Autism Index=75 "Very Likely ASD", Severity Level 2. BASC-3 Adaptability T=36 (9th pct). Anxiety T=66 (93rd pct). Attention at-risk.',
  },
  {
    date: '2022-01-12',
    age: '5y2m',
    source: 'Al Jalila Children\'s Hospital — ADOS-2 + WPPSI-IV + NEPSY-II + Vineland-3',
    clinician: 'Dr. Zeinab Alloub, Suha AlShuaibat, Marianne Diab',
    keyFindings: 'FSIQ=130 (98th pct). VCI=140 (99.6th pct). FRI=133. PSI=103. ADOS-2: Mild ASD. Vineland Socialization (teacher) SS=57 (<1st pct). BRIEF-2 Emotion Reg teacher T=84. Theory of Mind 63rd pct intact. Diagnosis: Twice Exceptional child.',
  },
  {
    date: '2023-03-02',
    age: '6y5m',
    source: 'Carbone Clinic Dubai — VB-MAPP Milestones + Barriers + Transition',
    clinician: 'Levi Clancy BCBA',
    keyFindings: 'VB-MAPP Total 169.5/170 — all language and social domains above 48-month developmental level. Transition Assessment 79/90. Primary barriers: behavioral problems, instructional control, sensory defensiveness. Mainstream schooling with LSA confirmed appropriate.',
  },
];

export const JWAN_STRENGTHS = [
  { en: 'Verbal comprehension VCI=140 — top 0.4% of all children', ar: 'الفهم اللفظي VCI=140 — أفضل 0.4% من جميع الأطفال' },
  { en: 'Learning and memory KABC=133 — 99th percentile', ar: 'التعلم والذاكرة KABC=133 — المئين الـ99' },
  { en: 'Fluid reasoning FRI=133 — top 1%', ar: 'التفكير المرن FRI=133 — أفضل 1%' },
  { en: 'Affect recognition NEPSY-II=84th percentile — above expected', ar: 'التعرف على المشاعر — فوق المستوى المتوقع' },
  { en: 'Theory of Mind NEPSY-II=63rd percentile — intact', ar: 'نظرية العقل — سليمة' },
  { en: 'VB-MAPP language score 169.5/170 — all domains maxed', ar: 'درجة اللغة VB-MAPP 169.5/170 — جميع المجالات' },
];
```

---

## KEY COMPONENT SPECS

### Header.tsx
- Left: circular avatar with live age (years number large, "yrs" small) — calculate from JWAN_DOB in real time using `useAge` hook
- Center: "Jwan's guardian platform" / "منصة جوان للمتابعة والدعم" with subtitle showing age + diagnosis
- Right: language toggle button (shows "عربي" when in English, "English" when in Arabic) + user avatar/menu
- On language switch: set `dir="rtl"` on `<html>`, switch all i18n strings, persist preference to Supabase profiles table

### DomainMatrix.tsx
- 4-column grid of 8 domain tiles on desktop, 2-column on mobile
- Each tile: domain name, average score across all reports (or "—" if none), mini progress bar
- Color: teal/green if avg ≥ 3.5, amber if 2.5–3.4, coral/red if < 2.5, gray if no data
- Tiles are clickable — clicking filters the Reports view to that domain
- Realtime: subscribe to Supabase reports table and recompute on change

### AIInsights.tsx
- Button triggers POST to Anthropic API via edge function or direct call
- System prompt:
```
You are a specialist supporting twice-exceptional children with ASD and giftedness. 
Jwan is 9 years old, IQ 130 (VCI=140), Mild ASD diagnosed 2021 in Dubai. 
Analyze the recent care team observations: identify 2-3 patterns, note what is working, 
give 1 specific actionable recommendation for this week. 
Be warm and evidence-based. Maximum 120 words.
```
- Pass last 10 reports as context
- Display output in styled card below button
- Show loading state while fetching

### AIChat.tsx (Jwan's section)
- Child-safe, warm chat interface
- System prompt:
```
You are Jwan's kind AI friend. Jwan is a brilliant 9-year-old girl in Dubai with ASD 
and extraordinary intelligence (IQ 130). She loves books, science facts, and learning. 
She sometimes finds social situations a bit tricky.
Always: be warm and encouraging; use simple words a 9-year-old understands; 
celebrate her strengths; give ONE practical tip if she shares a challenge; 
keep responses to 2-3 sentences; end with something positive about Jwan.
Never use clinical or medical language.
```
- Quick-reply suggestion buttons below input:
  - "I had a hard day today"
  - "A friend made me feel left out"  
  - "I did something I'm really proud of!"
  - "I don't know how to start a conversation"
  - "Something made me really angry"
- Store conversation in component state (not database — private to session)
- Clear chat button

### BreathingTool.tsx
- Animated circle that grows (inhale) and shrinks (exhale)
- 4-7-8 breathing pattern: inhale 4s → hold 4s → exhale 6s → hold 2s
- Countdown number displayed in circle center
- Phase label: "Breathe in" / "Hold" / "Breathe out"
- Completes 4 cycles then shows encouraging message
- Include brief bio explanation: "Slow breathing activates your vagus nerve..."
- Bilingual phase labels

### BrainOverview.tsx + sibling components
- Inline SVG diagrams (no external images) for:
  1. Brain side view with labeled regions (amygdala, prefrontal cortex, TPJ, hippocampus, cerebellum)
  2. Social brain network (STS → TPJ → amygdala connectivity)
  3. Emotion regulation (amygdala ↔ PFC with slow vs fast pathway)
  4. Attention circuit (PFC → caudate → ACC)
- Each region labeled in English, with Arabic label when in AR mode
- Below each SVG: plain language explanation in two blocks:
  - "For caregivers" (adult language, clinical context)
  - "For Jwan" (9-year-old language, empowering framing)
- SVG colors: teal for strengths, amber for monitoring areas, coral for attention areas

### ProgressCharts.tsx
- Recharts LineChart showing average domain score over time (grouped by month)
- Separate bars per domain, color-coded
- Filter by role (all / dad / mom / teacher / therapist / doctor)
- Filter by domain
- Show report count alongside averages

---

## AUTHENTICATION FLOW

1. `/login` — email + password form using Supabase Auth
2. On first login: redirect to `/onboarding` — ask for name and role selection
3. Create profile row in `profiles` table
4. Session persisted via Supabase auth cookies
5. Protected routes: all main app routes require `session`
6. Jwan's Corner accessible to all authenticated users (the family treats it as shared)
7. No anonymous access

### Invite system (simple)
- Admin (Dad) can share an invite link with a role pre-set (e.g. `/register?role=teacher`)
- Registration page reads the role from URL param and pre-fills

---

## REALTIME SUBSCRIPTIONS

Enable Supabase Realtime on tables: `reports`, `checkins`, `achievements`, `reminders`

In `useReports.ts`:
```typescript
const subscription = supabase
  .channel('reports-changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, 
    () => { fetchReports(); })
  .subscribe();
```

This means when the teacher logs a report at school, Dad sees it update live on his dashboard.

---

## i18n SETUP

Install: `npm install react-i18next i18next`

Key strings to translate in `locales/en.json` and `locales/ar.json`:

```json
{
  "nav.dashboard": "Dashboard",
  "nav.reports": "Team reports",
  "nav.jwan": "Jwan's corner",
  "nav.brain": "My brain",
  "nav.guide": "Success guide",
  "nav.reminders": "Reminders",
  "dashboard.matrix": "Domain matrix",
  "dashboard.activity": "Recent activity",
  "dashboard.priorities": "Priority actions",
  "reports.add": "Log an observation",
  "reports.view": "View all",
  "reports.charts": "Progress charts",
  "jwan.welcome": "Hello Jwan!",
  "jwan.chat": "My AI friend",
  "jwan.mood": "How I feel",
  "jwan.powers": "My superpowers",
  "jwan.breathe": "Calm down tool",
  "brain.overview": "Overview",
  "brain.social": "Social brain",
  "brain.feelings": "Feelings",
  "brain.attention": "Attention",
  "brain.gift": "My gift",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.all": "All",
  "common.loading": "Loading…"
}
```

For Arabic, all values translated. RTL direction applied to `<html dir="rtl">` when language is Arabic.

---

## NETLIFY DEPLOYMENT

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

---

## BUILD PHASES

### Phase 1 — Foundation (do first)
1. `npm create vite@latest jwan-guardian -- --template react-ts`
2. Install: `tailwindcss`, `@supabase/supabase-js`, `react-router-dom`, `react-i18next`, `lucide-react`, `recharts`
3. Configure Tailwind with custom colors (teal, amber, coral palette from JWAN_DOB constants)
4. Set up Supabase client in `src/lib/supabase.ts`
5. Run all Supabase SQL schema from this guide
6. Build Login + Register pages with Supabase auth
7. Build Layout + Header + Navigation
8. Connect GitHub → Netlify auto-deploy
9. Set environment variables in Netlify

### Phase 2 — Dashboard + Reports
1. Build `useReports` hook with CRUD + realtime subscription
2. Build DomainMatrix with live score computation
3. Build ActivityFeed with realtime updates
4. Build ReportForm with all fields (role, domain, star rating, context, mood, strategies)
5. Build ReportList with role and domain filters
6. Build ProgressCharts with Recharts

### Phase 3 — Jwan's Corner
1. Build MoodCheckin with emoji buttons + history
2. Build AIChat with Anthropic API integration
3. Build Superpowers board (static data from constants)
4. Build Achievements CRUD
5. Build BreathingTool animated component

### Phase 4 — Brain + Guide + Reminders
1. Build all 5 brain SVG illustration components
2. Build Success Guide static pages (Golden Rules, Daily Routine, Crisis Protocol, Evidence Base)
3. Build Reminders CRUD with seed data pre-loaded
4. Build AI Insights on Dashboard (Anthropic API)

### Phase 5 — Polish
1. Add PWA manifest + service worker for offline capability
2. Add print/export for reports (for sharing with new clinicians)
3. Add email notification system via Supabase Edge Functions (optional)
4. Mobile responsiveness audit
5. Performance audit + Lighthouse score

---

## IMPORTANT CLINICAL NOTES FOR UI COPY

All user-facing copy should reflect these facts accurately:

- Jwan's full name: **Jwan Yaseen Al Mashhadani** — display as **Jwan** / **جوان**
- Date of birth: **17 September 2016**
- Diagnosis: **Autism Spectrum Disorder (Mild / High-Functioning)** confirmed **August 2021** at Al Jalila Children's Specialty Hospital, Dubai
- Classification: **Twice Exceptional (2e)** — profound giftedness + ASD
- FSIQ: **130** (Very Superior, 98th percentile), WPPSI-IV, Nov 2021
- VCI: **140** (Very Superior, 99.6th percentile)
- Current school: **Arcadia School, Dubai** (mainstream with LSA support)
- Parents: **Mahmood Al Mashhadani (Dad)** and **Rukia (Mom)**

The platform tone must always be:
- Warm, hopeful, and strengths-based — not deficit-focused
- Specific and data-grounded — not vague
- Joyful about Jwan's extraordinary capabilities
- Clear-eyed about her support needs without catastrophizing

---

## SUPABASE ROW LEVEL SECURITY SUMMARY

All tables have RLS enabled. Policy summary:
- All authenticated users can READ all records
- Each user can WRITE their own records
- No anonymous access anywhere
- Jwan's checkins: visible to all authenticated team members (family is open about sharing)

---

*End of CURSOR_JWAN_GUARDIAN.md*
*Build this with care — this platform is for a remarkable child.*
