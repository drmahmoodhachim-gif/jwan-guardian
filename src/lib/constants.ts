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

export {
  ASSESSMENT_HISTORY,
  CLINICAL_ASSESSMENTS,
  JWAN_IQ_SNAPSHOTS,
} from '../data/assessments'
export { CLINICAL_ALERTS } from '../data/clinicalAlerts'
export { PROVIDER_TIMELINE } from '../data/providerTimeline'
export { DOCUMENT_INVENTORY } from '../data/documentInventory'
export { DIAGNOSIS_EVOLUTION } from '../data/diagnosisEvolution'
export { CARE_TEAM_APRIL_2025 } from '../data/careTeamSnapshot'

/** Documented Nov 2024 — Autism Clinic London (CFT consultation). */
export const JWAN_ARTISTIC_TALENT = {
  description: 'Creates her own comics and stories — exceptional artistic talent',
  descriptionAr: 'تصنع قصصاً مصورة وقصصاً خاصة — موهبة فنية استثنائية',
  documentedBy: 'Giulia Maccarini, Autism Clinic London, Nov 2024',
  documentedByAr: 'غيوليا ماكاريني، عيادة لندن للتوحد، نوفمبر 2024',
  therapeuticValue: 'Emotional expression, CFT, and social stories',
  therapeuticValueAr: 'التعبير العاطفي والعلاج بالتعاطف والقصص الاجتماعية',
} as const

export const NEUROPEDIA_SUPPORT = {
  provider: 'Neuropedia',
  type: 'Behavioural consultations — in-clinic + home-based',
  typeAr: 'استشارات سلوكية — في العيادة والمنزل',
  startDate: 'Late 2024 (approximate)',
  status: 'Active' as const,
} as const

export const SCHOOL_INCLUSION_OFFICER = {
  name: 'Ms Kate Wharry',
  role: 'Inclusion Officer, Arcadia School',
  roleAr: 'مسؤولة الإدماج، مدرسة أركاديا',
  engaged: 'November 2024',
} as const

export const CFT_APPROACH = {
  therapist: 'Giulia Maccarini',
  startDate: '2024-11-26',
  framework: 'Compassion-Focused Therapy (CFT)',
  frameworkAr: 'العلاج القائم على التعاطف',
  /** Citation used in family clinical notes for CFT context in ASD */
  evidenceBase: 'Mazefsky (2015) — Emotion Regulation and Emotional Distress in ASD',
  evidenceNote: 'Mazefsky (2015) — emotion regulation and distress in ASD (context for families)',
  keyTools: [
    'Emotion cards',
    'Social stories from real situations',
    'Wave/cloud metaphors for emotions',
    'Named emotion characters (e.g. “Angry Al”, “Excited Ellie”)',
    '5-4-3-2-1 grounding',
    'Compassionate friend object',
    'Safe space visualisation',
    'Kindness jar',
  ],
} as const

export const JWAN_STRENGTHS = [
  { en: 'Verbal comprehension VCI=140 — top 0.4% of all children', ar: 'الفهم اللفظي VCI=140 — أفضل 0.4% من جميع الأطفال' },
  { en: 'Learning and memory KABC=133 — 99th percentile', ar: 'التعلم والذاكرة KABC=133 — المئين الـ99' },
  { en: 'Fluid reasoning FRI=133 — top 1%', ar: 'التفكير المرن FRI=133 — أفضل 1%' },
  { en: 'Affect recognition NEPSY-II=84th percentile — above expected', ar: 'التعرف على المشاعر — فوق المستوى المتوقع' },
  { en: 'Theory of Mind NEPSY-II=63rd percentile — intact', ar: 'نظرية العقل — سليمة' },
  { en: 'VB-MAPP language score 169.5/170 — all domains maxed', ar: 'درجة اللغة VB-MAPP 169.5/170 — جميع المجالات' },
  {
    en: `${JWAN_ARTISTIC_TALENT.description} (${JWAN_ARTISTIC_TALENT.documentedBy})`,
    ar: `${JWAN_ARTISTIC_TALENT.descriptionAr} (${JWAN_ARTISTIC_TALENT.documentedByAr})`,
  },
]
