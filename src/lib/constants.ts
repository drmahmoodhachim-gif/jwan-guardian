export const JWAN_DOB = new Date('2016-09-17')

export const DOMAINS = [
  { id: 'social', en: 'Social skills', ar: 'مهارات اجتماعية', status: 'focus', color: 'coral' },
  { id: 'emotion', en: 'Emotion', ar: 'المشاعر', status: 'focus', color: 'coral' },
  { id: 'attention', en: 'Attention', ar: 'الانتباه', status: 'monitor', color: 'amber' },
  { id: 'language', en: 'Language', ar: 'اللغة', status: 'strength', color: 'teal' },
  { id: 'motor', en: 'Motor', ar: 'الحركة', status: 'monitor', color: 'amber' },
  { id: 'sensory', en: 'Sensory', ar: 'الحواس', status: 'monitor', color: 'amber' },
  { id: 'adaptive', en: 'Adaptive', ar: 'التكيف', status: 'monitor', color: 'amber' },
  { id: 'general', en: 'General', ar: 'عام', status: 'neutral', color: 'gray' },
] as const

export const ASSESSMENT_HISTORY = [
  {
    date: '2021-06-01',
    age: '4y10m',
    source: 'OpenMinds — KABC-II + GARS-3 + BASC-3',
    clinician: 'Carla Chedid',
    keyFindings:
      'KABC-II FCI=128 (97th pct). GARS-3 Autism Index=75 "Very Likely ASD", Severity Level 2. BASC-3 Adaptability T=36 (9th pct). Anxiety T=66 (93rd pct). Attention at-risk.',
  },
  {
    date: '2022-01-12',
    age: '5y2m',
    source: "Al Jalila Children's Hospital — ADOS-2 + WPPSI-IV + NEPSY-II + Vineland-3",
    clinician: 'Dr. Zeinab Alloub, Suha AlShuaibat, Marianne Diab',
    keyFindings:
      'FSIQ=130 (98th pct). VCI=140 (99.6th pct). FRI=133. PSI=103. ADOS-2: Mild ASD. Vineland Socialization (teacher) SS=57 (<1st pct). BRIEF-2 Emotion Reg teacher T=84. Theory of Mind 63rd pct intact. Diagnosis: Twice Exceptional child.',
  },
  {
    date: '2023-03-02',
    age: '6y5m',
    source: 'Carbone Clinic Dubai — VB-MAPP Milestones + Barriers + Transition',
    clinician: 'Levi Clancy BCBA',
    keyFindings:
      'VB-MAPP Total 169.5/170 — all language and social domains above 48-month developmental level. Transition Assessment 79/90. Primary barriers: behavioral problems, instructional control, sensory defensiveness. Mainstream schooling with LSA confirmed appropriate.',
  },
]

export const JWAN_STRENGTHS = [
  { en: 'Verbal comprehension VCI=140 — top 0.4% of all children', ar: 'الفهم اللفظي VCI=140 — أفضل 0.4% من جميع الأطفال' },
  { en: 'Learning and memory KABC=133 — 99th percentile', ar: 'التعلم والذاكرة KABC=133 — المئين الـ99' },
  { en: 'Fluid reasoning FRI=133 — top 1%', ar: 'التفكير المرن FRI=133 — أفضل 1%' },
  { en: 'Affect recognition NEPSY-II=84th percentile — above expected', ar: 'التعرف على المشاعر — فوق المستوى المتوقع' },
  { en: 'Theory of Mind NEPSY-II=63rd percentile — intact', ar: 'نظرية العقل — سليمة' },
  { en: 'VB-MAPP language score 169.5/170 — all domains maxed', ar: 'درجة اللغة VB-MAPP 169.5/170 — جميع المجالات' },
]
