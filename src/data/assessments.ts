/**
 * Full clinical assessment records — source of truth for timeline / guide UI.
 * Compiled from family records (April 2025). School year note on London report documented in `noteOnSchoolYear`.
 */

export type AssessmentKind = 'psychometric' | 'behavioural' | 'therapeutic_consultation' | 'paediatric'

export interface ClinicalAssessment {
  id: string
  /** Sort / display — typically report date or assessment start */
  date: string
  reportDate: string
  assessmentPeriod?: string
  ageAtAssessment: string
  /** Compact age label for matrices (e.g. 4y10m) */
  ageCompact: string
  institution: string
  address?: string
  clinician: string
  collaborators?: string[]
  tools: string[]
  type: AssessmentKind
  color?: string
  diagnosis: string
  noteOnSchoolYear?: string
  keyStrengthsNoted?: string[]
  keyFindings: string[]
  therapeuticApproach?: string
  cftComponents?: string[]
  recommendedResources?: { books?: string[]; films?: string[] }
  recommendations?: string[]
  mrn?: string
  /** Family filing name / reference */
  sourceFile?: string
  /** Verbatim clinician quotes for display */
  clinicalQuotes?: string[]
}

/** Legacy shape — dashboard / brain copy, charts, simple lists */
export interface LegacyAssessmentRow {
  date: string
  age: string
  source: string
  clinician: string
  keyFindings: string
}

export const CLINICAL_ASSESSMENTS: ClinicalAssessment[] = [
  {
    id: 'openminds-2021',
    date: '2021-06-01',
    reportDate: 'August 2021',
    assessmentPeriod: '5 sessions, June–July 2021',
    ageAtAssessment: '4 years 10 months',
    ageCompact: '4y10m',
    institution: 'OpenMinds Centre, Dubai',
    sourceFile: 'OpenMinds report',
    clinician: 'Carla Chedid, MA — Clinical Psychologist, CBT (DHA 44935607-001)',
    tools: ['KABC-II', 'Rey Test', 'NEPSY-I Fleches', 'Purdue Pegboard', 'BASC-3', 'GARS-3'],
    type: 'psychometric',
    color: 'teal',
    diagnosis:
      'ASD probable; Social Communication Disorder (SCD) left as differential pending speech therapy. GARS-3 “Very Likely ASD” Severity Level 2.',
    keyFindings: [
      'KABC-II FCI = 128 (97th pct, Above Average). Learning subscale = 133 (99th pct, Upper Extreme). Knowledge subscale = 137 (99.6th pct, Upper Extreme).',
      'GARS-3 Autism Index 73–75 — “Very Likely ASD”, Severity Level 2.',
      'BASC-3 Anxiety T=66 (93rd pct, At-Risk); Adaptability T=36 (9th pct, At-Risk — lowest adaptive score); Attention Problems T=63 (89th pct, At-Risk).',
      'No stereotyped/repetitive behaviours observed — important clinical marker.',
    ],
    recommendations: ['Behavioural programme + speech therapy; OT at later stage.'],
  },
  {
    id: 'ajch-2022',
    date: '2022-01-12',
    reportDate: 'January 2022',
    assessmentPeriod:
      '6 sessions: 23 Aug, 9 Sep, 17 Sep, 6 Oct, 31 Oct, 15 Nov 2021',
    ageAtAssessment: '5 years 2 months',
    ageCompact: '5y2m',
    institution: "Al Jalila Children's Specialty Hospital, Dubai",
    sourceFile: 'AJCH attested report',
    clinician:
      'Dr. Zeinab Alloub (Neurodevelopmental Paediatrician), Suha AlShuaibat (ASD Diagnostician), Marianne Diab (Neuropsychology)',
    tools: ['ADOS-2', 'WPPSI-IV', 'NEPSY-II', 'K-CPT 2', 'Vineland-3', 'BRIEF-2'],
    type: 'psychometric',
    color: 'teal',
    diagnosis:
      'Autism Spectrum Disorder — Mild. Twice exceptional (2e): profound giftedness + ASD.',
    keyFindings: [
      'WPPSI-IV FSIQ = 130 (98th pct, Very Superior); VCI = 140 (99.6th pct) — highest score across assessments; FRI = 133; PSI = 103 (58th pct) — 37 points below VCI.',
      'ADOS-2: Mild ASD.',
      'Vineland Socialization parent = 81 (10th pct); teacher = 57 (<1st pct) — largest gap in profile.',
      'BRIEF-2 ERI teacher T = 84 (>99th pct, Clinically Elevated).',
      'NEPSY-II Affect Recognition 84th pct (Above Expected) — INTACT; Theory of Mind 63rd pct (At Expected) — INTACT.',
    ],
    recommendations: ['Mainstream placement with LSA.'],
  },
  {
    id: 'carbone-2023',
    date: '2023-03-02',
    reportDate: '5 March 2023',
    assessmentPeriod: 'Sessions 2–3 March 2023',
    ageAtAssessment: '6 years 5 months',
    ageCompact: '6y5m',
    institution: 'Carbone Clinic, Dubai',
    sourceFile: 'Carbone CC0131',
    clinician: 'Levi Clancy, MA, BCBA (supervised by Cherine Basfer, BCBA — Program Director)',
    tools: ['VB-MAPP Milestones', 'Barriers', 'Transition Assessment', 'ABC behavioural observation'],
    type: 'behavioural',
    mrn: 'CC0131',
    color: 'amber',
    diagnosis: 'ASD — VB-MAPP confirms very high verbal/skills profile; significant barriers in behaviour, sensory, instructional control.',
    keyFindings: [
      'VB-MAPP Total = 169.5/170 — ALL language and social domains maxed at 48+ months (Mand, Tact, Listener, Social Play, Intraverbal, LRFFC, Linguistic Structure: 15/15 or 10/10).',
      'Transition Assessment = 79/90 (avg 4/5) — mainstream placement strongly confirmed.',
      'Barriers: Behavioural Problems 4/4 (severe), Sensory Defensiveness 4/4 (severe), Instructional Control 3/4.',
      'Avg problem behaviour episodes: 6 per 3-hour session, cumulative duration 14 min 18 sec.',
      'Primary triggers: transitions, denied access, demands during preferred activities.',
    ],
    recommendations: [
      'Continue mainstream + LSA + BCBA; point economy social skills programme; Accepting No programme; parent training.',
    ],
  },
  {
    id: 'autism-clinic-london-2024',
    date: '2024-11-26',
    reportDate: 'Filed 22 January 2026',
    assessmentPeriod: '26 November – 10 December 2024 (video consultation + parent sessions)',
    ageAtAssessment: '8 years 2 months',
    ageCompact: '8y2m',
    institution: 'Autism Clinic London (Harley Street / Paddington)',
    sourceFile: 'Update Notes 22_1_26.doc',
    address: '10 Harley Street, London, W1G 9PF',
    clinician: 'Giulia Maccarini, Highly Specialist Psychologist',
    collaborators: ['Ms Kate Wharry (Arcadia School Inclusion Officer)'],
    tools: [
      'Clinical interview',
      'Video consultation with Jwan',
      'Parent sessions',
      'School collaboration',
    ],
    type: 'therapeutic_consultation',
    color: 'pink',
    diagnosis:
      'ASD — ongoing. Therapeutic consultation for emotional regulation and behaviour support (not psychometric testing).',
    noteOnSchoolYear:
      'Report states “Year 2” at Arcadia — ERROR. Jwan was in Year 3 for Nov–Dec 2024 (2024–25 academic year). Mediclinic (Jan 2025) correctly states Year 3.',
    keyStrengthsNoted: [
      'Bright and engaging child',
      'Advanced verbal communication',
      'Strong problem-solving skills',
      'High levels of independence in play',
      'Advanced social play abilities',
      'EXCEPTIONAL ARTISTIC TALENT — creates her own comics and stories',
    ],
    clinicalQuotes: [
      '“Jwan is a bright and engaging child… exceptional artistic talent, particularly in creating comics and stories.”',
      '“At her age, emotional development becomes increasingly complex, influenced by cognitive growth, hormonal changes, and the early stages of puberty.”',
    ],
    keyFindings: [
      'Triggers: told “no”, transitions from preferred activities, routine disruptions.',
      'Aware of emotions and calming strategies but cannot apply them under distress.',
      'Difficulty expressing emotions safely and constructively.',
      'Puberty / hormonal change — emotional complexity increasing with age.',
      'Neuropedia behavioural consultations (in-clinic + home) concurrent.',
      'Ms Kate Wharry (Inclusion Officer) engaged in plan.',
    ],
    therapeuticApproach: 'Compassion-Focused Therapy (CFT)',
    cftComponents: [
      'Understanding and naming emotions — emotion cards, social stories from real situations',
      'Welcoming and normalising emotions — wave/cloud metaphors; personify as characters (e.g. “Angry Al”, “Excited Ellie”)',
      'Building emotional awareness — 5-4-3-2-1 grounding, mindfulness',
      'Social stories — scenarios from actual school and home experiences',
      'Self-compassion — “It’s okay to feel this way”, compassionate friend object',
      'Managing threat system — safe space visualisation, grounding',
      'Balancing emotional systems — music, drawing, creative play, scheduled downtime',
      'Compassionate relationships — kindness jar, structured cooperative play',
      'Psychoeducation for parents and teachers',
    ],
    recommendedResources: {
      books: [
        '"Breathe Like a Bear" by Kira Willey',
        '"The Rabbit Listened" by Cori Doerrfeld',
        '"Big Feelings" by Alexandra Penfold',
        '"The Zones of Regulation" by Leah Kuypers',
      ],
      films: ['Inside Out 1 (2015)', 'Inside Out 2 (2024)', 'Turning Red (2022)'],
    },
    recommendations: [
      'Continue previously implemented behavioural support',
      'Educational support — consistent routines, visual aids, points-based rewards',
      'Parent-led interventions — practice calming strategies at home',
      'Social skills development',
      'Introduce CFT tailored strategies',
      'Zones of Regulation curriculum at home and school',
      'Deep breathing, progressive muscle relaxation, finger tracing exercises',
    ],
  },
  {
    id: 'mediclinic-faniran-2025',
    date: '2025-02-12',
    reportDate: '12 February 2025',
    assessmentPeriod: 'Clinic dates: 9, 21, 23, 24 January 2025',
    ageAtAssessment: '8 years 4 months',
    ageCompact: '8y4m',
    institution: 'Mediclinic City Hospital, Dubai',
    sourceFile: 'Mediclinic Dr Faniran',
    clinician: 'Dr. Shola Faniran, MBBS PhD FRACP — Consultant Paediatrician & Developmental Paediatrician',
    tools: ['KBIT-2', 'KTEA-III', 'BRIEF-2', 'Vanderbilt', 'SDQ', 'DCDQ', 'School information', 'Parent interview'],
    type: 'paediatric',
    mrn: '00196595',
    color: 'coral',
    diagnosis:
      'ASD Level 2 — substantial support (upgraded from ASD Level 1 / “mild” framing in earlier reports).',
    keyFindings: [
      'KBIT-2 Composite IQ = 132 (98th pct, Upper Extreme).',
      'KTEA-III Spelling = 140 (99.6th pct, age equiv 18y3m); Reading Composite = 131 (98th pct, age equiv 13y6m); Written Language = 130 (98th pct); Math Composite = 104 (61st pct, Average).',
      'BRIEF-2 Teacher Emotional Control T > 90 (>99th pct) — highest clinical score in entire record; Teacher GEC T = 76 (98th pct); Parent ERI T = 81 (>99th pct).',
      'Vanderbilt parent: Inattention 6/9 significant; anxiety features present.',
      'DCDQ = 43/75 — DCD indication confirmed.',
      'Critical new recommendation: atypical antipsychotic medication for mood regulation (shared decision with family and prescriber).',
    ],
    recommendations: ['Next review: May 2025 (3 months from report date).'],
  },
]

function legacyClinicianName(a: ClinicalAssessment): string {
  switch (a.id) {
    case 'openminds-2021':
      return 'Carla Chedid'
    case 'ajch-2022':
      return 'Dr. Zeinab Alloub, Suha AlShuaibat, Marianne Diab'
    case 'carbone-2023':
      return 'Levi Clancy BCBA'
    case 'autism-clinic-london-2024':
      return 'Giulia Maccarini'
    case 'mediclinic-faniran-2025':
      return 'Dr. Shola Faniran'
    default:
      return a.clinician.split(/[,(]/)[0]?.trim() ?? a.clinician
  }
}

function legacySource(a: ClinicalAssessment): string {
  if (a.id === 'openminds-2021') return 'OpenMinds — KABC-II + GARS-3 + BASC-3'
  if (a.id === 'ajch-2022')
    return "Al Jalila Children's Hospital — ADOS-2 + WPPSI-IV + NEPSY-II + Vineland-3"
  if (a.id === 'carbone-2023')
    return 'Carbone Clinic Dubai — VB-MAPP Milestones + Barriers + Transition'
  if (a.id === 'autism-clinic-london-2024')
    return 'Autism Clinic London — CFT consultation (Nov–Dec 2024)'
  return `Mediclinic — KBIT-2 + KTEA-III + BRIEF-2 + developmental review`
}

export const ASSESSMENT_HISTORY: LegacyAssessmentRow[] = CLINICAL_ASSESSMENTS.map((a) => ({
  date: a.date,
  age: a.ageCompact,
  source: legacySource(a),
  clinician: legacyClinicianName(a),
  keyFindings: a.keyFindings.join(' '),
}))

/** IQ / ability snapshots across time — stable high range */
export const JWAN_IQ_SNAPSHOTS = [
  { date: '2021-06-01', age: '4y10m', tool: 'KABC-II FCI', score: '128', note: '97th pct — Above Average' },
  { date: '2021-11-15', age: '5y2m', tool: 'WPPSI-IV FSIQ', score: '130', note: '98th pct — Very Superior' },
  { date: '2021-11-15', age: '5y2m', tool: 'WPPSI-IV VCI', score: '140', note: '99.6th pct — highest single score' },
  { date: '2025-01-24', age: '8y4m', tool: 'KBIT-2 Composite', score: '132', note: '98th pct — Upper Extreme' },
] as const
