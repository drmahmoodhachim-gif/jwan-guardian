/** Ecological cognitive / self-report tasks — supplements to formal assessment, not replacements. */

export const EMO_SCENARIOS = [
  {
    id: 'emo-01',
    text: 'A girl opens a gift and finds exactly what she had been wishing for all year. Her eyes go huge and she cannot speak for a moment.',
    correct: 0,
    options: ['Surprised', 'Happy', 'Confused', 'Scared'],
    domain: 'basic',
    clinicalNote:
      'Surprise vs happiness — basic emotion differentiation. Maps to NEPSY-II Affect Recognition foundational items.',
    ageLevel: '6-7y typical',
  },
  {
    id: 'emo-02',
    text: 'He worked on his project all weekend. When he presented it, everyone listened carefully and his teacher smiled and nodded.',
    correct: 1,
    options: ['Excited', 'Proud', 'Relieved', 'Happy'],
    domain: 'self-conscious',
    clinicalNote:
      'Pride — self-conscious emotion requiring self-evaluation against a standard. Develops 5-8y.',
    ageLevel: '7-8y typical',
  },
  {
    id: 'emo-03',
    text: 'She waited in a long queue for her favourite ice cream. When it was finally her turn, the shop had just run out of her flavour.',
    correct: 2,
    options: ['Sad', 'Angry', 'Disappointed', 'Frustrated'],
    domain: 'complex',
    clinicalNote:
      'Disappointment vs frustration vs sadness — requires distinguishing between three similar negative states based on cause.',
    ageLevel: '8-9y typical',
  },
  {
    id: 'emo-04',
    text: 'He knocked his drink over and it spilled all over his friend\'s brand-new book in front of the whole class.',
    correct: 0,
    options: ['Embarrassed', 'Sorry', 'Scared', 'Guilty'],
    domain: 'self-conscious',
    clinicalNote:
      'Embarrassment — social exposure emotion. Requires awareness of others\' perspective on one\'s own action.',
    ageLevel: '7-8y typical',
  },
  {
    id: 'emo-05',
    text: 'Her little brother drew on her favourite book with permanent marker. She stood staring at the ruined pages, her hands clenching.',
    correct: 1,
    options: ['Upset', 'Angry', 'Shocked', 'Sad'],
    domain: 'basic',
    clinicalNote:
      'Anger with physical body cues — distinguishing anger from generalized upset using somatic markers.',
    ageLevel: '6-7y typical',
  },
  {
    id: 'emo-06',
    text: 'The night before her big performance, she could not sleep. Her heart kept beating fast — but part of her could not wait for it to start.',
    correct: 3,
    options: [
      'Just nervous',
      'Just excited',
      'Worried something goes wrong',
      'Nervous and excited at the same time',
    ],
    domain: 'mixed',
    clinicalNote:
      'Mixed emotion — holding nervous and excited simultaneously. Requires emotional complexity understanding. Develops 9-10y.',
    ageLevel: '9-10y typical',
  },
  {
    id: 'emo-07',
    text: 'He knew he had done something he should not have done. The teacher was walking towards his desk. He kept his eyes on the floor.',
    correct: 1,
    options: ['Scared', 'Guilty', 'Embarrassed', 'Anxious'],
    domain: 'complex',
    clinicalNote:
      'Guilt vs fear vs anxiety — behavioural cues (avoiding eye contact) as emotional signals. Advanced differentiation.',
    ageLevel: '8-9y typical',
  },
  {
    id: 'emo-08',
    text: 'She got the highest mark in class on the really hard test. Then she found out her best friend had gotten the lowest mark.',
    correct: 2,
    options: [
      'Just proud of herself',
      'Just happy',
      'Happy but also awkward about it',
      'Worried her friend is upset',
    ],
    domain: 'mixed',
    clinicalNote:
      'Mixed social emotion — positive own outcome + awareness of social cost to friend. Requires simultaneous self and other perspective.',
    ageLevel: '9-10y typical',
  },
  {
    id: 'emo-09',
    text: 'After a big argument, she said \'Fine! I don\'t care anyway!\' and went to her room. But actually she cared a lot.',
    correct: 3,
    options: [
      'Really does not care',
      'Angry',
      'Relieved it is over',
      'Hiding how much she is hurting',
    ],
    domain: 'masking',
    clinicalNote:
      'Emotional masking — verbal expression vs internal state. Highly relevant to ASD/PDA.',
    ageLevel: '9-11y typical',
  },
  {
    id: 'emo-10',
    text: 'His team lost the final. He shook the winning team\'s hands and said \'Well played.\' But inside, he felt completely hollow.',
    correct: 0,
    options: [
      'Brave outside but sad inside',
      'Fine, he had moved on',
      'Angry at his team',
      'Happy for the winners',
    ],
    domain: 'masking',
    clinicalNote:
      'Social performance vs internal state — socially appropriate display hiding genuine feeling. Tests understanding of display rules.',
    ageLevel: '9-11y typical',
  },
  {
    id: 'emo-11',
    text: 'She arrived at a party where everyone already seemed to know each other. She stood near the door, not sure where to go.',
    correct: 2,
    options: ['Shy', 'Scared of people', 'Unsure where she fits in', 'Bored'],
    domain: 'social',
    clinicalNote:
      'Belonging uncertainty — subtle social emotion distinct from shyness or fear.',
    ageLevel: '9-10y typical',
  },
  {
    id: 'emo-12',
    text: 'A new girl said: \'I really like your drawing — it is so... different.\' Then she walked away without smiling.',
    correct: 1,
    options: [
      'Definitely complimented',
      'Not sure if that was kind or not',
      'Definitely insulted',
      'Does not mind either way',
    ],
    domain: 'ambiguity',
    clinicalNote:
      'Ambiguous social intent — highest complexity item. Maps to social ambiguity processing in ASD/PDA.',
    ageLevel: '10-12y typical',
  },
] as const

export const STORY_SCENARIOS = [
  {
    id: 'story-01',
    scene:
      'Aisha put her favourite book in her school bag before going out to play. While she was away, her sister moved the book to the shelf. When Aisha comes back inside, where will she look for her book?',
    question: 'Where will Aisha look first?',
    correct: 0,
    options: [
      'In her bag — she does not know it was moved',
      'On the shelf — that is where it is now',
      'She will not look, she forgot about it',
      'She will ask her sister',
    ],
    level: 'ToM Level 1 — false belief',
    clinicalNote:
      'Classic false belief task. Jwan scored 63rd pct on NEPSY-II ToM — should pass easily.',
    childFriendlyNote:
      'Aisha last remembered putting the book in her bag, so she will look there first — she does not know it was moved.',
    reference: 'Wimmer & Perner (1983), Baron-Cohen et al. (1985)',
  },
  {
    id: 'story-02',
    scene:
      'Omar accidentally walked into the wrong bathroom at school. He came out a moment later looking very red in the face and would not look at anyone.',
    question: 'Why does Omar look red in the face?',
    correct: 1,
    options: [
      'He is angry about something',
      'He made a mistake that other people may have noticed',
      'He has been running',
      'He saw something frightening',
    ],
    level: 'Social emotion — Level 1',
    clinicalNote: 'Understanding the social-emotional consequence of an embarrassing action.',
    childFriendlyNote:
      'People often go red when they feel embarrassed — like when something awkward happens and others might notice.',
    reference: 'NEPSY-II Affect Recognition — social context items',
  },
  {
    id: 'story-03',
    scene:
      'At lunch, Zara said loudly to the whole table: \'Wow, you have the EXACT same lunch as yesterday!\' She was just trying to make conversation. But the girl she said it to went completely quiet and looked away.',
    question: 'Did Zara mean to be unkind?',
    correct: 1,
    options: [
      'Yes, she was being mean on purpose',
      'No, she did not realise it would feel hurtful',
      'Maybe she was testing the girl',
      'It is impossible to tell',
    ],
    level: 'Social faux pas — Level 2',
    clinicalNote:
      'Distinguishing intent from impact. Pass rate ~70% at age 9.',
    childFriendlyNote:
      'Zara was just chatting, but the other girl might still have felt hurt — kind plans and hurt feelings can happen at the same time.',
    reference: 'Baron-Cohen et al. (1999) — Faux Pas test',
  },
  {
    id: 'story-04',
    scene:
      'Lena told her friend Sam a secret and said \'please do not tell anyone.\' Later, Sam accidentally let it slip to one other person. Now Sam is standing near Lena — but Lena does not know yet.',
    question: 'How is Sam feeling right now?',
    correct: 3,
    options: [
      'Fine — it was an accident so it does not count',
      'Worried Lena will be angry',
      'Guilty because she broke a promise',
      'Both worried AND guilty at the same time',
    ],
    level: 'Complex emotion — Level 2',
    clinicalNote:
      'Anticipatory social emotion — mixed guilt + anxiety. Third-person perspective.',
    childFriendlyNote:
      'Sam probably feels sorry about the secret and also worried about what happens next — two feelings can sit together.',
    reference: 'Mixed emotion literature — Arsenio & Lover (1995)',
  },
  {
    id: 'story-05',
    scene:
      'Maya thinks her friend Dina does not know about the surprise party they are planning for her. But actually, Dina overheard them talking about it last week and has not said anything.',
    question: 'Does Maya think Dina knows about the party?',
    correct: 0,
    options: [
      'No — Maya still thinks it is a surprise',
      'Yes — Maya has figured it out',
      'Maya is not sure',
      'What Maya thinks does not matter',
    ],
    level: 'Second-order ToM — Level 3',
    clinicalNote:
      'Second-order false belief — what does Maya think Dina knows?',
    childFriendlyNote:
      'Maya still thinks the party is a surprise for Dina — she does not know Dina overheard.',
    reference: 'Perner & Wimmer (1985)',
  },
  {
    id: 'story-06',
    scene:
      'At break time, a group of children could not agree on the rules for a game and it was turning into an argument. One child started crying. Another started shouting. A third child quietly sat down, took out a piece of paper, and started writing something.',
    question: 'What was the third child most likely doing?',
    correct: 1,
    options: [
      'Writing a note to complain',
      'Trying to find a solution to help everyone',
      'Not interested and doing something else',
      'Writing a note to tell a teacher',
    ],
    level: 'Social reasoning — Level 2',
    clinicalNote:
      'Inferring constructive intent from quiet action — prosocial reasoning.',
    childFriendlyNote:
      'Sometimes when people argue, a quiet plan on paper is a gentle way to help everyone agree.',
    reference: 'Social cognition — prosocial reasoning',
  },
] as const

export const WORLD_SITUATIONS = [
  { text: 'Starting a new activity that you chose yourself', category: 'safety' as const },
  { text: 'Being told to do something right now', category: 'demand' as const },
  { text: 'When plans change suddenly without any warning', category: 'demand' as const },
  { text: 'Getting an answer wrong in front of other people', category: 'anxiety' as const },
  { text: 'When someone interrupts what you are doing', category: 'demand' as const },
  { text: 'Being with your best friend doing something you both love', category: 'safety' as const },
  { text: 'Trying something completely new that you have never done before', category: 'demand' as const },
  { text: 'When a grown-up raises their voice', category: 'social' as const },
  { text: 'Being in a big noisy group of people', category: 'sensory' as const },
  { text: 'Having free time to do exactly what you want', category: 'safety' as const },
  { text: 'A test or exam at school', category: 'anxiety' as const },
  { text: 'When someone says no to something you really wanted', category: 'demand' as const },
  { text: 'Having to wait a long time for something', category: 'demand' as const },
  { text: 'Speaking in front of the whole class', category: 'anxiety' as const },
  { text: 'Playing a game you love with someone you like', category: 'safety' as const },
  { text: 'When someone changes the rules of a game while you are playing', category: 'demand' as const },
  { text: 'Making a mistake that someone else can see', category: 'anxiety' as const },
  { text: 'A quiet afternoon with nothing that has to happen', category: 'safety' as const },
  { text: 'A really difficult task at school you are not sure how to do', category: 'demand' as const },
  { text: 'When a grown-up seems disappointed or frustrated with you', category: 'anxiety' as const },
] as const

export type WorldCategory = (typeof WORLD_SITUATIONS)[number]['category']

export function computeWorldProfile(ratings: number[]) {
  const byCat = (cat: WorldCategory) => {
    const idx = WORLD_SITUATIONS.map((s, i) => (s.category === cat ? i : -1)).filter((i) => i >= 0)
    if (idx.length === 0) return null
    const vals = idx.map((i) => ratings[i] ?? 0)
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }
  const demand = byCat('demand')
  const safety = byCat('safety')
  const anxiety = byCat('anxiety')
  const pdaConsistent =
    demand != null && safety != null ? demand - safety >= 1.5 : false
  const anxietyElevated = anxiety != null && anxiety >= 3.5
  return { demand, safety, anxiety, social: byCat('social'), sensory: byCat('sensory'), pdaConsistent, anxietyElevated }
}

export const CLAUDE_SYNTHESIS = {
  title: "Claude's clinical synthesis — what the complete record reveals",
  subtitle: '9 documents · 5 institutions · 4 years · read simultaneously',
  findings: [
    {
      id: 'pda-mismatch',
      level: 'critical' as const,
      title: 'The core mismatch no clinician has named',
      body: 'Every assessment notes behaviour is worse at home than school. Every assessment also confirms intact social cognition (Theory of Mind 63rd pct, Affect Recognition 84th pct). These two facts together rule out classic ASD social-circuit deficit as the primary driver. They point instead to an autonomy-threat anxiety system — the neurobiology of Pathological Demand Avoidance. No single clinician has formally assessed for this profile. It should be the first agenda item at the May 2025 Dr. Faniran appointment.',
      actionRequired: 'Request formal PDA assessment at May 2025 appointment',
      reference: 'Newson et al. (2003), Christie et al. (2012)',
    },
    {
      id: 'brief-trend',
      level: 'urgent' as const,
      title: 'The BRIEF-2 worsening trend is the key data point',
      body: 'Teacher Emotional Control: T=84 (2022) → T=90 (2025). Worsening by 6 T-score points despite years of intervention. This is not a child improving with standard behavioural approaches. This is deteriorating school emotional regulation under the current model. The intervention approach needs to change, not intensify.',
      actionRequired:
        'Reframe BCBA behaviour plan around PDA, not compliance. Bring BRIEF-2 trend data to May 2025 appointment.',
      reference: 'BRIEF-2 school forms 2022 + 2025',
    },
    {
      id: 'ot-proof',
      level: 'positive' as const,
      title: 'OT success is proof of concept',
      body: "All 7 OT goals met. All 3 retained primitive reflexes integrated. Formally discharged April 2025. This nervous system CAN change when the right intervention is applied. The critical difference: OT gave Jwan tools she felt were hers. The Zone of Regulation discharge — verbal self-identification without prompts — is the proof. This is the model for all other interventions.",
      actionRequired:
        'Apply the ownership model to all other domains — give Jwan the tool, not the compliance requirement.',
      reference: 'Neuropedia OT Discharge, Stephane Hornsby-Stoltz, April 2025',
    },
    {
      id: 'adhd-pda',
      level: 'important' as const,
      title: 'ADHD-inattentive vs PDA-driven inattention',
      body: "Vanderbilt parent inattention 6/9 is significant. But in PDA profiles, inattention scores are often inflated by the demand-avoidance mechanism — tasks presented as required become harder to attend to. The clinical question before any medication: does inattention appear in all contexts or only demand-heavy ones? If the latter, this is PDA-driven, and stimulants may worsen anxiety.",
      actionRequired:
        'Before prescribing: discuss context-specificity of inattention with Dr. Faniran. Consider guanfacine/Intuniv over stimulants.',
      reference: "Intuniv evidence: Sallee et al. (2009); PDA-ADHD intersection: O'Nions et al. (2014)",
    },
    {
      id: 'academic-prognosis',
      level: 'positive' as const,
      title: 'Academic achievement is the most important prognosis factor',
      body: "Spelling SS=140 (18y3m equivalent), Reading SS=131 (13y6m equivalent), Written Language SS=130. The literature on twice-exceptional adults consistently shows academic self-concept is the strongest predictor of positive adult outcomes — stronger than behavioural measures. Jwan's extraordinary literacy is the most important protective factor in her entire clinical record.",
      actionRequired: 'Enrol in Johns Hopkins CTY program. IEP must include enrichment, not just support.',
      reference: 'KTEA-III Feb 2025; 2e adult outcomes: Webb et al. (2016)',
    },
    {
      id: 'eye-teaming',
      level: 'important' as const,
      title: 'Eye-teaming and afternoon dysregulation',
      body: 'Convergence difficulty noted November 2024. Not followed up. Jwan reads at 13y6m level — she processes more near-point visual text than most adults. Convergence insufficiency causes headaches, irritability, and reduced frustration tolerance — symptoms registering as afternoon dysregulation. A straightforward referral with meaningful quality-of-life impact.',
      actionRequired: 'Urgent referral to developmental optometrist or paediatric ophthalmologist.',
      reference: 'Neuropedia OT Reassessment, November 2024',
    },
  ],
  diagnosis: {
    primary:
      'Profound giftedness (IQ 128–132 stable across 4 assessments) co-occurring with ASD Level 2 whose primary profile is Pathological Demand Avoidance',
    comorbid:
      'ADHD-inattentive — almost certainly present, but must distinguish primary ADHD from PDA-driven inattention before medication',
    resolved: 'Developmental Coordination Disorder — fully remediated by OT April 2025',
    intact: 'Social cognition (Theory of Mind, Affect Recognition) — working normally',
    needsFollowUp: 'Eye-teaming convergence insufficiency',
  },
  prognosis:
    'Twice-exceptional girls with intact social cognition who receive PDA-informed support at age 9 have genuinely good outcomes in the literature. The danger is continued compliance-based intervention. The opportunity is reframing toward autonomy-supportive, low-demand approaches that leverage her extraordinary cognitive and creative strengths.',
} as const

export const TASK_CLINICAL_MAPPINGS = {
  emoDetective: {
    formalMapping: 'NEPSY-II Affect Recognition (84th pct, Nov 2021)',
    basicDomain: 'Items 1-2, 5 — foundational emotion identification',
    complexDomain: 'Items 3, 7 — distinguishing similar emotions',
    selfConscious: 'Items 2, 4 — self-conscious emotion understanding',
    mixed: 'Items 6, 8 — holding two emotions simultaneously',
    masking: 'Items 9, 10 — display rules, emotional concealment',
    social: 'Items 11, 12 — belonging uncertainty, social ambiguity',
    interpretNorms: {
      basic: '10/12+ expected for IQ 132 at age 9',
      masking: '1-2/2 expected at age 9 (develops 9-11y)',
      ambiguity: '1/1 — strong performance indicates intact social ambiguity processing',
    },
  },
  memorySpan: {
    formalMapping: 'WPPSI-IV WMI (SS=113, Nov 2021); BRIEF-2 Working Memory parent T=64, teacher T=65',
    spanNorms: { below: '<=3', average: '4-5', above: '6-7', superior: '8+' },
    clinicalInterpretation:
      'If span >= 5 despite BRIEF-2 WM elevation, the school elevation likely reflects demand-driven inattention rather than primary WM deficit',
    trackingValue: 'Repeat every 3 months — improvement tracks regulatory gains',
  },
  storyMind: {
    formalMapping: 'NEPSY-II Theory of Mind (63rd pct, Nov 2021)',
    level1: 'Should pass easily at IQ 132, age 9 — baseline confirmation',
    level2: 'Expected pass rate 70-80% at age 9 for NT — performance informs social cognition complexity',
    level3:
      'Second-order ToM — typically emerges 9-10y — success at this level confirms sophisticated social cognition',
    discrepancyNote:
      'If story mind performance substantially exceeds real-life social functioning, this directly confirms the PDA mechanism: cognition is intact, regulation prevents expression',
  },
  myWorld: {
    pdaThreshold: 'Demand average > Safety average by 1.5+ points indicates PDA-consistent autonomy-threat pattern',
    anxietyThreshold: 'Anxiety domain >= 3.5 indicates significant performance anxiety',
    clinicalValue:
      'Self-report from Jwan herself — adds a perspective absent from all formal assessments. Most valuable when compared to parent/teacher reports for discrepancies.',
    repeatValue: 'Track whether demand ratings decrease as PDA-informed interventions take effect',
  },
} as const

export const MEMORY_COLORS = [
  { id: 'coral', label: 'Coral', hex: '#f87171' },
  { id: 'teal', label: 'Teal', hex: '#14b8a6' },
  { id: 'violet', label: 'Violet', hex: '#8b5cf6' },
  { id: 'amber', label: 'Amber', hex: '#fbbf24' },
] as const
