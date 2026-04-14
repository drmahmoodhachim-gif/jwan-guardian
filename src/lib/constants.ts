export const JWAN_DOB = new Date('2016-09-17')

export const DOMAINS = [
  { id: 'social', en: 'Social skills', ar: 'مهارات اجتماعية', status: 'focus', color: 'coral' },
  { id: 'emotion', en: 'Emotion', ar: 'المشاعر', status: 'focus', color: 'coral' },
  { id: 'attention', en: 'Attention', ar: 'الانتباه', status: 'monitor', color: 'amber' },
  { id: 'language', en: 'Language', ar: 'اللغة', status: 'strength', color: 'teal' },
  { id: 'motor', en: 'Motor skills', ar: 'المهارات الحركية', status: 'monitor', color: 'amber' },
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
export {
  OT_INITIAL_2023,
  OT_KEY_CLINICAL_FACT,
  NEUROPEDIA_DOB_NOTE,
} from '../data/otAssessments'

/** Neuropedia OT + referring neurologist — May 2023 onward */
export const SUPPORT_TEAM_FULL = {
  neurologistReferring: {
    name: 'Dr. Aman Sohal',
    role: 'Paediatric Neurologist',
    institution: 'Neuropedia, Dubai',
    relationship: 'Referred Jwan for OT assessment (May 2023)',
  },
  ot: {
    initial: {
      name: 'Dr. Esther Zachariah',
      credentials: 'BOT, OTD, SI-Cert',
      dhaNumber: '00197916-001',
      role: 'Clinical Team Lead, Paediatric Occupational Therapist',
      email: 'esther.zachariah@neuropedia.ae',
      instagram: '@otequalsplay / therapywithesther',
    },
    ongoing: {
      name: 'Stephane Hornsby-Stoltz',
      dha: '8296774-001',
      email: 'stephane.hornsbystoltz@neuropedia.ae',
      role: 'Paediatric Occupational Therapist',
      startDate: 'October 2024',
    },
    npNumber: '#6829',
    startDateWeekly: '2023-05-11',
    frequency: 'Weekly',
    approach: 'Sensory Integration® + Motor-Relearning principles',
  },
  neuropedia: {
    institution: "Neuropedia Children's Neuroscience Center (NCNC), Dubai",
    address: '24, Opp. Dubai Zoo, Beach Road, Jumeirah 1, Dubai',
  },
  neuropediaBehaviour: {
    provider: 'Neuropedia',
    type: 'Behavioural consultations (in-clinic + home-based)',
    startDate: 'Late 2024 (approximate)',
    status: 'Active' as const,
    note: 'Same institution as OT — Neuropedia provides both OT and behaviour support',
  },
} as const

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
  { en: 'You understand words and ideas amazingly fast.', ar: 'تفهمين الكلمات والأفكار بسرعة مدهشة.' },
  { en: 'You remember what you learn and bring it back when you need it.', ar: 'تتذكرين ما تتعلمينه وتسترجعينه وقت الحاجة.' },
  { en: 'You solve tricky puzzles and patterns like a detective.', ar: 'تحلين الألغاز والأنماط الصعبة مثل المحققة.' },
  { en: 'You are very good at reading feelings from faces and situations.', ar: 'أنتِ ممتازة في قراءة المشاعر من الوجوه والمواقف.' },
  { en: 'You can understand what other people might be thinking or feeling.', ar: 'تستطيعين فهم ما قد يفكر أو يشعر به الآخرون.' },
  { en: 'Your language is super strong — speaking, reading, and expressing ideas.', ar: 'لغتك قوية جداً — في الكلام والقراءة والتعبير عن الأفكار.' },
  {
    en: 'You create your own comics and stories with a powerful imagination.',
    ar: 'تصنعين قصصاً مصورة وحكاياتك الخاصة بخيال قوي جداً.',
  },
]
