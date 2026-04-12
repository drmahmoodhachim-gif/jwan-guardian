/**
 * Occupational therapy — Neuropedia, Dubai.
 * DOB clerical error in some Neuropedia PDFs (17/09/2025) — platform uses 17/09/2016 only.
 */

export const NEUROPEDIA_DOB_NOTE =
  'Some Neuropedia documents show DOB 17/09/2025 — clerical error. Correct DOB is 17 September 2016.'

/** Initial OT — 11 May 2023 */
export const OT_INITIAL_2023 = {
  id: 'neuropedia-ot-initial-2023',
  date: '2023-05-11',
  reportDate: 'May 2023',
  ageAtAssessment: '6 years 8 months',
  ageCompact: '6y8m',
  institution: 'Neuropedia, Dubai',
  clinician: 'Dr. Esther Zachariah, BOT, OTD, SI-Cert',
  referredBy: 'Dr. Aman Sohal, Paediatric Neurologist',
  type: 'initial_ot_assessment' as const,
  npNumber: '#6829',
  tools: [
    'BOT-2 (Bruininks-Oseretsky — Fine Motor)',
    'Beery-VMI (Visual Motor Integration)',
    'Clinical observation',
    'Parent report',
  ],
  physicalFindings: {
    muscleTone: 'Within functional range',
    muscleStrength: 'Within functional range',
    rangeOfMotion: 'Full range — upper and lower extremities',
    grossMotor:
      'All milestones met — sitting, standing, jumping, running: all independent',
  },
  primitiveReflexes: [
    {
      reflex: 'ATNR (Asymmetric Tonic Neck Reflex)',
      expectedIntegration: '7–8 months',
      status: 'retained' as const,
      impactEn: 'Affects handwriting posture, bilateral coordination',
      impactAr: 'يؤثر على وضعية الكتابة والتنسيق بين الجانبين',
    },
    {
      reflex: 'STNR (Symmetric Tonic Neck Reflex)',
      expectedIntegration: '8–11 months',
      status: 'retained' as const,
      impactEn: 'Affects sitting posture, eye-hand coordination',
      impactAr: 'يؤثر على الجلوس وتنسيق العين واليد',
    },
    {
      reflex: 'STLR / TLR (Sagittal Tonic Labyrinthine Reflex)',
      expectedIntegration: '3 months – 2 years',
      status: 'retained' as const,
      impactEn: 'Affects balance, postural control, sensory processing',
      impactAr: 'يؤثر على التوازن والسيطرة الوضعية والمعالجة الحسية',
    },
    { reflex: 'Palmar', expectedIntegration: '3–4 months', status: 'integrated' as const },
    { reflex: 'Spinal Galant', expectedIntegration: '3–9 months', status: 'integrated' as const },
    { reflex: 'Plantar', expectedIntegration: '9–12 months', status: 'integrated' as const },
    { reflex: 'Rooting', expectedIntegration: '2–3 months', status: 'integrated' as const },
    {
      reflex: 'Moro',
      expectedIntegration: '3–6 months',
      status: 'not_assessed' as const,
    },
    {
      reflex: "Romberg's sign",
      expectedIntegration: 'N/A',
      status: 'retained' as const,
      impactEn: 'Eyes open 22 sec (within SD); eyes closed 1 sec (outside SD)',
      impactAr: 'توازن مع إغلاق العين ثانية واحدة — خارج الانحراف المعياري',
    },
  ],
  bot2Subtests: [
    {
      name: 'Fine Motor Precision',
      scaleScore: 9,
      category: 'Below Average',
      ageEquivalent: '5y2m – 5y3m',
      gapMonths: -17,
    },
    {
      name: 'Fine Motor Integration',
      scaleScore: 12,
      category: 'Below Average',
      ageEquivalent: '5y10m – 5y11m',
      gapMonths: -10,
    },
    {
      name: 'Manual Dexterity',
      scaleScore: 6,
      category: 'Below Average',
      ageEquivalent: '4y10m – 4y11m',
      gapMonths: -22,
    },
    {
      name: 'Upper Limb Coordination',
      scaleScore: 8,
      category: 'Below Average',
      ageEquivalent: '5y6m – 5y7m',
      gapMonths: -14,
    },
  ],
  bot2Composites: [
    { name: 'Fine Manual Control', standardScore: 21, percentile: 16, category: 'Below Average' },
    { name: 'Manual Coordination', standardScore: 14, percentile: 4, category: 'Below Average' },
  ],
  beeryVmi: {
    visualMotorIntegration: { ss: 95, pct: 37, cat: 'Average' },
    visualPerception: { ss: 107, pct: 68, cat: 'Average' },
    motorCoordination: { ss: 91, pct: 27, cat: 'Average' },
    interpretation:
      'Average visual-motor integration. Visual perception intact. Eye-hand coordination adequate for shape reproduction.',
  },
  adl: {
    dressing: 'Independent. Uses Velcro shoes for independence.',
    feeding: 'Independent. Can get messy if unsupervised.',
    toileting: 'Independent.',
    hygiene: 'Mostly independent, minimal assistance occasionally.',
  },
  hypothesis:
    'Fine motor participation challenges stem from retained primitive reflexes (ATNR, STNR, STLR). Integrating these reflexes should improve fine motor abilities.',
  keyFindings: [
    'Three retained primitive reflexes: ATNR, STNR, STLR — all should have integrated by age 2.',
    'Manual dexterity most delayed — age equivalent ~4y10m at chronological age 6y8m (~2 years behind).',
    'Fine motor precision below average vs chronological age.',
    'Beery-VMI average — visual perception and eye-hand coordination intact for integration subtests.',
    'Romberg sign: balance with eyes closed only 1 second (outside SD).',
    'OT note: cognitive compensation for motor tasks may be exhausting for Jwan.',
  ],
  recommendations: [
    'Weekly OT using Sensory Integration® and Motor-Relearning principles',
    'Focus on integrating retained primitive reflexes',
    '10–15 min daily home exercises as specified by therapist',
    'Follow @otequalsplay on Instagram for sensory-rich home activities',
  ],
} as const

export const OT_REASSESSMENT_2024 = {
  id: 'neuropedia-ot-reassessment-2024',
  date: '2024-11-25',
  reportDate: 'November 2024',
  ageAtAssessment: '8 years 2 months',
  examiner: 'Stephane Hornsby-Stoltz, OT (DHA: 8296774-001)',
  referredBy: 'Dr. Aman Sohal, Paediatric Neurologist',
  type: 'ot_reassessment' as const,
  primitiveReflexes: {
    retained2023: ['ATNR', 'STNR', 'STLR/TLR'] as const,
    retained2024: [] as const,
    integrated2024: [
      'ATNR',
      'STNR',
      'TLR',
      'Moro',
      'Spinal Galant',
      'Plantar',
      'Palmar',
      'Rooting',
    ] as const,
    clinicalSignificance:
      'All three previously retained reflexes integrated. Primary hypothesis for early fine motor difficulty addressed.',
  },
  movementABC3: {
    manualDexterity: { ss: 5, pct: 5, zone: 'Red' as const },
    aimingCatching: { ss: 5, pct: 5, zone: 'Red' as const },
    balance: { ss: 6, pct: 9, zone: 'Below Average' as const },
    total: { ss: 5, pct: 5, label: 'Red Zone — significant motor difficulty' },
    clinicalNote:
      'Despite reflex integration, gross motor coordination remains in Red Zone — next active target.',
  },
  beeryComparison: [
    {
      test: 'Visual-Motor Integration',
      ss2023: 95,
      pct2023: 37,
      ss2025: 107,
      pct2025: 68,
      note: 'Improved +12 SS',
    },
    {
      test: 'Visual Perception',
      ss2023: 107,
      pct2023: 68,
      ss2025: 96,
      pct2025: 39,
      note: 'Slight decrease',
    },
    {
      test: 'Motor Coordination',
      ss2023: 91,
      pct2023: 27,
      ss2025: 80,
      pct2025: 9,
      note: 'Below average — declined; ongoing target',
    },
  ],
  otherFindings: {
    eyeTeaming: 'Convergence difficulty at near-point screening',
    fingerNose: 'Abnormal — able but inconsistent',
    pencilGrasp: 'Dynamic tripod — developmentally appropriate',
    midlineCrossing: 'Occasionally avoided; turns page 90° when writing',
  },
  keyFindings: [
    'ATNR, STNR, TLR fully integrated.',
    'Movement ABC-3 total 5th percentile (Red Zone).',
    'Beery VMI improved; motor coordination declined SS 91→80.',
    'Sensory Profile: social-emotional “much more than others” persistent.',
    'Eye-teaming (convergence) — follow-up recommended.',
  ],
} as const

export const OT_ITP_2024 = {
  id: 'neuropedia-ot-itp-2024',
  date: '2024-11-01',
  reviewDate: '2025-03-01',
  type: 'itp' as const,
  examiner: 'Stephane Hornsby-Stoltz',
  longTermGoals: [
    'Improved fine motor skills (precision, dexterity, bilateral coordination)',
    'All primitive reflexes integrated',
    'Improved self-regulation and attention',
    'Improved motor planning and hand-eye coordination',
    'Improved emotion identification and regulation strategies',
  ],
  sensoryToolkit: [
    'TheraBand on chair',
    'Pop-its, fidgets, hard putty',
    'Trampoline, swinging, bouncing ball',
    'Sensory building game',
    'Zones of Regulation chart',
  ],
  olfactoryRegulation: {
    scents: ['Jasmine (calming)', 'Lavender (relaxation)', 'Lemongrass (alert + calm)'],
    use: 'Diluted oils on bracelet/diffuser; room diffuser; lavender pillow spray',
  },
} as const

export const OT_DISCHARGE_2025 = {
  id: 'neuropedia-ot-discharge-2025',
  date: '2025-04-28',
  type: 'ot_discharge' as const,
  examiner: 'Stephane Hornsby-Stoltz, Clinical Team Lead',
  status: 'DISCHARGED — ALL GOALS MET',
  goalOutcomes: [
    {
      goal: 'Emotional regulation & sensory modulation',
      outcome: 'ACHIEVED',
      detail: 'Age-appropriate sensory processing; tolerates typical classroom stimuli.',
    },
    {
      goal: 'Primitive reflex integration',
      outcome: 'ACHIEVED',
      detail: 'TLR, STNR, ATNR integrated; improved postural stability and bilateral coordination.',
    },
    {
      goal: 'Gross motor hand-eye coordination',
      outcome: 'ACHIEVED',
      detail: 'Improved accuracy, timing, force grading; confident in structured games.',
    },
    {
      goal: 'Bilateral coordination & midline crossing',
      outcome: 'ACHIEVED',
      detail: 'Independent midline crossing for writing, drawing, cutting, cooking.',
    },
    {
      goal: 'Fine motor & in-hand manipulation',
      outcome: 'ACHIEVED',
      detail: 'Fine motor consistent with age expectations; endurance improved.',
    },
    {
      goal: 'Eye-teaming & visual endurance',
      outcome: 'ACHIEVED',
      detail: 'Improved tracking, near/far focus, sustained visual attention.',
    },
    {
      goal: 'Self-regulation',
      outcome: 'ACHIEVED',
      detail: 'Uses Zones of Regulation without visual prompts; can advocate; adult support for high-intensity states.',
    },
  ],
  zonesOfRegulation: {
    summary:
      'Identifies zone verbally without visual prompts (e.g. “I’m in the red zone”). Co-regulation before correction for red zone.',
    adultProtocol: [
      'Reduce language — short calm statements',
      'Ask: “What zone are you in?” / “What’s your tool?”',
      'Key phrase: “I can see your body is feeling big. Let’s figure out your zone.”',
    ],
  },
  dischargeSummary:
    'All OT goals met. Functioning within age-appropriate expectations across motor, sensory, and self-regulation. Discharged from skilled OT April 2025.',
  dischargeRecommendations: [
    'Continue physical and playground activities to maintain gains',
    'Continue Zones at home and school',
    'Continue fine motor and visual-motor hobbies: drawing, crafts, building',
  ],
} as const

export const OT_MILESTONES = [
  { date: '2023-05', label: 'OT starts', detail: 'Dr. Esther Zachariah — initial assessment', color: 'amber' as const },
  { date: '2024-10', label: 'Therapist handover', detail: 'Stephane Hornsby-Stoltz', color: 'blue' as const },
  { date: '2024-11', label: 'Reflexes integrated', detail: 'ATNR, STNR, TLR resolved', color: 'teal' as const },
  { date: '2025-04', label: 'Discharged', detail: 'All goals met — age-appropriate across domains', color: 'green' as const },
] as const

/** Summary rows for charts / tracker */
export const OT_PROGRESS_DATA = [
  {
    date: '2023-05-11',
    age: '6y8m',
    examiner: 'Dr. Esther Zachariah',
    bot2FineMotorPrecision: 9,
    bot2FineMotorIntegration: 12,
    bot2ManualDexterity: 6,
    bot2UpperLimb: 8,
    beeryVMI: 95,
    beeryVP: 107,
    beeryMC: 91,
    reflexesRetained: ['ATNR', 'STNR', 'STLR/TLR'],
    status: 'Baseline — below average BOT-2 fine motor domains',
  },
  {
    date: '2024-10-01',
    age: '8y0m',
    examiner: 'Stephane Hornsby-Stoltz',
    status: 'Sensory Profile — oral/avoiding/sensitivity elevated',
  },
  {
    date: '2024-11-25',
    age: '8y2m',
    examiner: 'Stephane Hornsby-Stoltz',
    movementABC3Total: 5,
    movementABC3Pct: 5,
    reflexesRetained: [],
    reflexesIntegratedThisPeriod: ['ATNR', 'STNR', 'TLR', 'Moro'],
    status: 'Reassessment — all reflexes integrated; MovABC Red Zone',
  },
  {
    date: '2025-04-22',
    age: '8y7m',
    examiner: 'Stephane Hornsby-Stoltz',
    beeryVMI: 107,
    beeryVP: 96,
    beeryMC: 80,
    status: 'Beery reassessment — VMI improved; MC declined',
  },
  {
    date: '2025-04-28',
    age: '8y7m',
    examiner: 'Stephane Hornsby-Stoltz',
    discharged: true,
    allGoalsAchieved: true,
    status: 'DISCHARGED — ALL GOALS MET',
  },
] as const

export const OT_KEY_CLINICAL_FACT = {
  visualPerception: '107 (68th pct) — average',
  eyeHandBeery: '95 (37th pct) — average',
  manualDexterity: 'BOT-2 scale score 6 — below average (~4th pct)',
  meaning:
    'She can see what to do; difficulty is executing with hands. Source: retained reflexes (2023); integrated by Nov 2024 — then gross motor and motor coordination remained targets.',
} as const
