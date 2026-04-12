import type { ActionWho } from './types'

export interface ReportActionRow {
  who: ActionWho
  action: string
}

export interface ReportsToActionsEntry {
  id: string
  source: string
  sourceColor: 'purple' | 'red' | 'teal' | 'amber' | 'pink'
  finding: string
  implication: string
  actions: ReportActionRow[]
}

export const REPORTS_TO_ACTIONS: ReportsToActionsEntry[] = [
  {
    id: 'tom-intact',
    source: 'AJCH 2022',
    sourceColor: 'purple',
    finding:
      'Theory of Mind 63rd pct, Affect Recognition 84th pct — INTACT',
    implication:
      'Jwan CAN understand social situations. The difficulty is real-time automatic execution, not comprehension.',
    actions: [
      {
        who: 'all',
        action:
          'Explain social rules explicitly — she can learn and apply them deliberately.',
      },
      {
        who: 'teacher',
        action:
          'Never assume she does not understand. She usually does. The barrier is regulatory, not cognitive.',
      },
      {
        who: 'lsa',
        action:
          'Use social stories written collaboratively with Jwan as author, not as recipient.',
      },
    ],
  },
  {
    id: 'brief-emotional-control',
    source: 'Mediclinic Feb 2025',
    sourceColor: 'red',
    finding:
      'BRIEF-2 Teacher Emotional Control T=90 (>99th pct) — highest clinical score in entire record. Worsening from T=84 in 2022.',
    implication:
      'School emotional regulation is deteriorating. Year 3 demand environment exceeds regulatory capacity.',
    actions: [
      {
        who: 'lsa',
        action:
          'Switch to low-demand co-regulation approach. Reduce directive language immediately.',
      },
      {
        who: 'teacher',
        action:
          'Review all classroom instruction language — reframe as collaborative inquiry.',
      },
      {
        who: 'dad',
        action:
          'Bring BRIEF-2 trend to Dr. Faniran May 2025. Request PDA formal assessment.',
      },
      {
        who: 'bcba',
        action:
          'Reframe behaviour plan around PDA profile, not compliance training.',
      },
    ],
  },
  {
    id: 'ot-discharged',
    source: 'Neuropedia OT April 2025',
    sourceColor: 'teal',
    finding:
      'All 7 OT goals met. All primitive reflexes integrated. Formally discharged.',
    implication:
      'Motor and sensory foundations are now age-appropriate. OT complete.',
    actions: [
      {
        who: 'all',
        action:
          'Continue home programme 3–5x/week. Sensory diet morning/midday/afternoon.',
      },
      {
        who: 'nanny',
        action:
          'Daily sensory diet is now your responsibility. It is medical, not optional.',
      },
      {
        who: 'lsa',
        action:
          'Sensory tools proactively: TheraBand on chair, fidgets on desk, movement breaks before long tasks.',
      },
    ],
  },
  {
    id: 'sensory-social-emotional',
    source: 'Sensory Profile 2 Oct 2024 + Apr 2025',
    sourceColor: 'amber',
    finding:
      'Social-Emotional section "Much more than others" at BOTH assessment dates — unchanged despite all other improvements.',
    implication:
      'Persistent autonomic hyperarousal. Not a sensory processing issue — it is neurobiological baseline of PDA anxiety.',
    actions: [
      {
        who: 'all',
        action:
          'Do not expect this to normalise quickly. Co-regulation is the daily tool, not a crisis response.',
      },
      {
        who: 'dad',
        action:
          'Discuss with Dr. Faniran May 2025. This finding supports medication discussion.',
      },
      {
        who: 'mom',
        action:
          'Your own regulation state directly affects hers. Prioritise your own nervous system tools.',
      },
    ],
  },
  {
    id: 'ktea-academic',
    source: 'KTEA-III Feb 2025',
    sourceColor: 'teal',
    finding:
      'Spelling SS=140 (age equiv 18y3m), Reading SS=131 (age equiv 13y6m), Math SS=104 (average).',
    implication:
      'Academic skills 5–10 years ahead in literacy. Gap between ability and output is PDA-driven, not motivational.',
    actions: [
      {
        who: 'teacher',
        action:
          'Enrichment not acceleration. Frame tasks as intellectual problems to investigate.',
      },
      {
        who: 'dad',
        action: 'Enrol in Johns Hopkins CTY program (cty.jhu.edu) for gifted enrichment.',
      },
      {
        who: 'lsa',
        action:
          'Never use simple tasks as "accessible" — they bore and dysregulate her. Challenge is regulation.',
      },
    ],
  },
  {
    id: 'vanderbilt-anxiety',
    source: 'Vanderbilt Parent 2025',
    sourceColor: 'red',
    finding:
      'Inattention 6/9 (significant). Anxiety features: self-blaming, fears mistakes, feels lonely/unloved.',
    implication:
      'ADHD-inattentive likely comorbid. Anxiety features require explicit emotional safety work at home.',
    actions: [
      {
        who: 'dad',
        action:
          'Discuss ADHD vs anxiety as primary driver with Dr. Faniran before any medication decision.',
      },
      {
        who: 'mom',
        action:
          'Daily bedtime ritual: ask about feelings, not behaviour. Specifically counter self-blame.',
      },
      {
        who: 'all',
        action:
          'Never phrase failures as personal: "the task was hard" not "you got it wrong."',
      },
    ],
  },
  {
    id: 'comics-stories',
    source: 'Giulia Maccarini Nov 2024',
    sourceColor: 'pink',
    finding:
      'Exceptional artistic talent — creates own comics and stories. Narrative is both strength and regulatory mechanism.',
    implication:
      'Comics/storytelling is the highest-leverage therapeutic and educational tool available.',
    actions: [
      {
        who: 'all',
        action:
          'Never interrupt creative/drawing time without 5-minute warning.',
      },
      {
        who: 'teacher',
        action:
          'Allow written work to be expressed through comic/narrative format when possible.',
      },
      {
        who: 'mom',
        action:
          'Engage with her comics as intellectual collaborator. Ask questions about characters.',
      },
      {
        who: 'therapist',
        action:
          'Use her own characters for CFT social stories. She is the author, not the recipient.',
      },
    ],
  },
  {
    id: 'trigger-triad',
    source: 'Carbone 2023 + all assessments',
    sourceColor: 'amber',
    finding:
      'Triggers consistent across all 5 years: transitions, denied access, demands during preferred activities.',
    implication:
      'These three triggers account for the majority of all documented episodes across all settings.',
    actions: [
      { who: 'all', action: '5-minute warnings before ALL transitions. No exceptions.' },
      {
        who: 'all',
        action: 'Always offer an alternative when denying something. Never just "no."',
      },
      {
        who: 'lsa',
        action:
          'Avoid interrupting preferred activities abruptly — build in natural transition points.',
      },
    ],
  },
  {
    id: 'vci-reasoning',
    source: 'AJCH 2022 + KBIT-2 2025',
    sourceColor: 'teal',
    finding:
      'VCI=140 (99.6th pct). Verbal reasoning top 0.4% of all children her age.',
    implication:
      'Directive commands bypass her most powerful cognitive asset. Reasoned requests engage it.',
    actions: [
      {
        who: 'all',
        action:
          'Always give the "why." She will engage with a well-reasoned request far more reliably than a directive.',
      },
      {
        who: 'teacher',
        action:
          'Frame lessons as problems to investigate, not content to receive.',
      },
      {
        who: 'dad',
        action:
          'Use intellectual partnership as a primary relationship mode. She responds to cognitive equals.',
      },
    ],
  },
  {
    id: 'eye-teaming',
    source: 'Neuropedia OT Nov 2024',
    sourceColor: 'amber',
    finding:
      'Eye-teaming (convergence) difficulty noted. Not resolved. Significant given reading at 13y6m level.',
    implication:
      'Visual near-point fatigue may be contributing to afternoon dysregulation.',
    actions: [
      {
        who: 'dad',
        action:
          'Refer to developmental optometrist or paediatric ophthalmologist — priority.',
      },
      {
        who: 'teacher',
        action:
          'Allow screen breaks during extended reading. Note if dysregulation increases after reading tasks.',
      },
    ],
  },
]
