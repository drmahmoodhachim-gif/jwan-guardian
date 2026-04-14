export type ObjectiveCategory =
  | 'zones'
  | 'sensory'
  | 'emotion'
  | 'pda'
  | 'social'
  | 'ot'
  | 'enrichment'
  | 'family'

export interface ObjectiveTemplate {
  id: string
  category: ObjectiveCategory
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  source: string
  assignedTo: 'all' | 'dad' | 'mom' | 'nanny'
  activeDays: number[]
  pdaNote: string
  clinicalBasis?: string
  defaultActive: boolean
}

export const OBJECTIVE_TEMPLATES: ObjectiveTemplate[] = [
  {
    id: 't00',
    category: 'emotion',
    title: 'Mistake practice routine (5 min daily)',
    titleAr: 'روتين تدريب الأخطاء (5 دقائق يومياً)',
    description:
      'During a calm moment, practice 2-3 tiny safe mistakes (drop pencil, miss target), then say "mistakes help me learn" and do 3 deep breaths.',
    descriptionAr:
      'خلال لحظة هادئة، نتدرب على 2-3 أخطاء صغيرة وآمنة (إسقاط قلم، عدم إصابة الهدف)، ثم نقول "الأخطاء تساعدني على التعلم" ونأخذ 3 أنفاس عميقة.',
    source: "This week's recommendation — tolerance for imperfection training",
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote:
      'Frame it as a brave game, not correction. No pressure and no scoring; just practice recovery.',
    clinicalBasis:
      'Builds tolerance for imperfection in low-stakes moments, improving emotional recovery before high-stakes situations.',
    defaultActive: true,
  },
  {
    id: 't01',
    category: 'zones',
    title: 'Morning zones check-in',
    titleAr: 'تسجيل مناطق الصباح',
    description:
      'Ask Jwan "what zone are you in?" before school or any morning activities.',
    descriptionAr: 'اسأل جوان "في أي منطقة أنتِ؟" قبل المدرسة أو أي أنشطة صباحية.',
    source: 'OT Discharge, Stephane Hornsby-Stoltz, April 2025',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4],
    pdaNote: 'Ask as a genuine question, not a demand. Her answer guides the morning response.',
    clinicalBasis: 'Zones internalised independently per OT discharge. Consistent check-ins reinforce self-regulation habit.',
    defaultActive: true,
  },
  {
    id: 't02',
    category: 'zones',
    title: 'Afternoon zones reset',
    titleAr: 'إعادة ضبط مناطق ما بعد المدرسة',
    description:
      'Check-in after school AFTER 20-30 min decompression time. No demands before decompression.',
    descriptionAr: 'تسجيل بعد المدرسة بعد 20-30 دقيقة من وقت التفريغ.',
    source: 'OT Discharge April 2025 + PDA approach',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4],
    pdaNote: 'Decompression time is non-negotiable. Zones check-in comes after, not during.',
    defaultActive: false,
  },
  {
    id: 't03',
    category: 'sensory',
    title: 'Morning sensory warm-up (5 min)',
    titleAr: 'تمرين حسي صباحي (5 دقائق)',
    description: 'Animal walks, wall push-ups, stretching, or carrying before school.',
    descriptionAr: 'مشي كالحيوانات، دفع الجدار، تمطّط، أو حمل أشياء قبل المدرسة.',
    source: 'Neuropedia OT Discharge — sensory diet morning session',
    assignedTo: 'nanny',
    activeDays: [0, 1, 2, 3, 4],
    pdaNote: 'Frame as body warm-up game, not exercise. Make it playful.',
    clinicalBasis: 'Proprioceptive input promotes calm, improves attention, enhances body awareness.',
    defaultActive: true,
  },
  {
    id: 't04',
    category: 'sensory',
    title: 'Pre-homework regulation (5 min)',
    titleAr: 'تنظيم قبل الواجبات (5 دقائق)',
    description: 'Movement break before starting any homework or extended table task.',
    descriptionAr: 'استراحة حركية قبل بدء أي واجبات أو مهام مكتبية ممتدة.',
    source: 'Neuropedia OT Discharge — sensory diet afternoon session',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4],
    pdaNote: 'Never start homework without this. Prevents 80% of homework refusals.',
    defaultActive: true,
  },
  {
    id: 't05',
    category: 'sensory',
    title: 'Olfactory routine — jasmine + lavender',
    titleAr: 'روتين الرائحة — ياسمين وخزامى',
    description: 'Jasmine or lemongrass in morning, lavender pillow spray at bedtime.',
    descriptionAr: 'ياسمين أو عشب الليمون صباحاً، رذاذ خزامى على الوسادة ليلاً.',
    source: 'Neuropedia OT Home Programme — documented effective for Jwan',
    assignedTo: 'nanny',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote: 'Build into existing routine so it does not feel like a new demand.',
    defaultActive: false,
  },
  {
    id: 't06',
    category: 'pda',
    title: '5-min warnings before all transitions',
    titleAr: 'تحذيرات 5 دقائق قبل جميع الانتقالات',
    description:
      'Every transition — activity change, leaving, bedtime, meals — gets a 5-minute verbal warning.',
    descriptionAr:
      'كل انتقال — تغيير نشاط، مغادرة، نوم، وجبات — يحصل على تحذير لفظي 5 دقائق.',
    source: 'PDA clinical approach + Carbone 2023 trigger documentation',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote:
      'This single habit prevents more episodes than any other intervention. Non-negotiable.',
    clinicalBasis:
      'Primary documented trigger: transitions without warning. Present in all 5 years of clinical records.',
    defaultActive: true,
  },
  {
    id: 't07',
    category: 'pda',
    title: 'Evening schedule preview',
    titleAr: 'معاينة جدول الغد مساءً',
    description:
      "Tell Jwan tomorrow's schedule at bedtime: school, pick-up, any changes or special events.",
    descriptionAr: 'أخبري جوان بجدول الغد عند النوم: المدرسة، من يأخذها، أي تغييرات.',
    source: 'PDA approach — amygdala preview time reduces next-morning threat response',
    assignedTo: 'mom',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote: "60 seconds that prevent the next morning's first meltdown.",
    defaultActive: true,
  },
  {
    id: 't08',
    category: 'pda',
    title: 'Choice framing — at least one request daily',
    titleAr: 'صياغة الخيار — طلب واحد على الأقل يومياً',
    description: 'Reframe at least one daily request as a genuine choice: "now or in 5 minutes?"',
    descriptionAr: 'أعيدي صياغة طلب واحد على الأقل كخيار حقيقي: "الآن أم بعد 5 دقائق؟"',
    source: 'PDA low-demand collaborative approach',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote: 'The task is identical. The perceived control is different. Practice until automatic.',
    defaultActive: false,
  },
  {
    id: 't09',
    category: 'emotion',
    title: 'Bedtime debrief ritual',
    titleAr: 'طقس الإحاطة قبل النوم',
    description:
      '2 things that went well today + 1 thing that was hard + what we try tomorrow. Max 5 minutes.',
    descriptionAr: 'شيئان نجحا اليوم + شيء كان صعباً + ما سنحاول غداً. 5 دقائق كحد أقصى.',
    source: 'Evidence-based bedtime routine — positive hippocampal encoding during calm states',
    assignedTo: 'dad',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote: 'Conversational and light. Not a review or assessment.',
    clinicalBasis: 'Builds positive emotional memory and prepares amygdala for next day.',
    defaultActive: true,
  },
  {
    id: 't10',
    category: 'emotion',
    title: 'Emotion character check',
    titleAr: 'تفقّد شخصية المشاعر',
    description:
      'Reference Jwan\'s own emotion characters: "Was Angry Al visiting today? How did you handle it?"',
    descriptionAr:
      'اشيري لشخصيات مشاعر جوان الخاصة: "هل زارتك شخصية الغضب اليوم؟ كيف تعاملتِ معها؟"',
    source: 'CFT approach — Giulia Maccarini, Autism Clinic London, November 2024',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4],
    pdaNote: 'Jwan created her own characters. She is the author, not the recipient.',
    defaultActive: false,
  },
  {
    id: 't11',
    category: 'emotion',
    title: 'Repair after any episode',
    titleAr: 'الإصلاح بعد أي نوبة',
    description:
      'After any significant episode, once fully calm: "That was hard. I love you. Tomorrow we try again."',
    descriptionAr: 'بعد أي نوبة مهمة، بمجرد الهدوء الكامل: "كان هذا صعباً. أحبكِ. غداً نحاول مرة أخرى."',
    source: 'PDA attachment repair — most neurologically impactful post-episode step',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote: 'No analysis. No lecture. Just love and a clean slate.',
    clinicalBasis:
      'Repair builds attachment security that reduces amygdala baseline reactivity over time.',
    defaultActive: true,
  },
  {
    id: 't12',
    category: 'social',
    title: 'PEERS conversation practice',
    titleAr: 'تدريب محادثة PEERS',
    description:
      'Practice one PEERS skill: 3 conversation turns on one topic, then ask a question about the other person.',
    descriptionAr:
      'تدريب مهارة PEERS واحدة: 3 أدوار محادثة على موضوع واحد، ثم سؤال عن الشخص الآخر.',
    source: 'PEERS social skills program, UCLA. Dr. Faniran recommendation, January 2025',
    assignedTo: 'dad',
    activeDays: [0, 2, 4],
    pdaNote:
      'Frame as a game or experiment. "Want to try something interesting?" never "it is time to practice."',
    defaultActive: false,
  },
  {
    id: 't13',
    category: 'social',
    title: 'Layan special time (15 min)',
    titleAr: 'وقت ليان الخاص (15 دقيقة)',
    description:
      'Layan gets 15 minutes of undivided parent time. Not shared with Jwan. Not interrupted.',
    descriptionAr:
      'ليان تحصل على 15 دقيقة من الاهتمام الكامل للوالدين. غير مشترك مع جوان. غير منقطع.',
    source: 'Dr. Faniran Jan 2025 — sibling attention-seeking pattern + Layan wellbeing',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote: 'Reduces Layan attention-seeking, which reduces household tension for Jwan.',
    defaultActive: true,
  },
  {
    id: 't14',
    category: 'ot',
    title: 'OT home programme activities (15 min)',
    titleAr: 'أنشطة برنامج المعالجة المهنية المنزلي (15 دقيقة)',
    description:
      'Rolls, Superman hold, crawling course, cross-body exercises from discharge home programme.',
    descriptionAr: 'لفات، وضعية سوبرمان، مسار الزحف، تمارين متقاطعة من برنامج الخروج المنزلي.',
    source: 'Neuropedia OT Home Programme — Stephane Hornsby-Stoltz, April 2025',
    assignedTo: 'nanny',
    activeDays: [0, 2, 4],
    pdaNote: '"Can we build an obstacle course?" works better than "exercise time."',
    defaultActive: false,
  },
  {
    id: 't15',
    category: 'enrichment',
    title: 'Dad-Jwan intellectual time',
    titleAr: 'وقت الأب وجوان الفكري',
    description:
      "Unstructured reading or intellectual exploration. Follow Jwan's lead entirely. No agenda.",
    descriptionAr: 'قراءة أو استكشاف فكري غير منظم. اتّبع قيادة جوان تماماً. بدون أجندة.',
    source: '2e profile — VCI 140. Intellectual partnership as primary regulatory mode.',
    assignedTo: 'dad',
    activeDays: [1, 3, 5],
    pdaNote: 'She leads. You follow. This is therapeutic, not optional.',
    defaultActive: true,
  },
  {
    id: 't16',
    category: 'enrichment',
    title: 'Creative expression time (20 min uninterrupted)',
    titleAr: 'وقت التعبير الإبداعي (20 دقيقة بدون مقاطعة)',
    description:
      "Comics, stories, drawing — Jwan's choice, Jwan's direction. Absolutely no interruptions without 5-min warning.",
    descriptionAr:
      'قصص مصورة، قصص، رسم — اختيار جوان واتجاهها. لا مقاطعة مطلقاً بدون تحذير 5 دقائق.',
    source:
      'Giulia Maccarini, Autism Clinic London, November 2024 — exceptional artistic talent as therapeutic tool',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote: 'Her creative time is sacred. Never frame as "free time" — it has real therapeutic value.',
    defaultActive: true,
  },
  {
    id: 't17',
    category: 'enrichment',
    title: 'Free reading — her choice (20+ min)',
    titleAr: 'قراءة حرة — اختيارها (20+ دقيقة)',
    description: 'Any book Jwan chooses. No comprehension questions. Just joy in reading.',
    descriptionAr: 'أي كتاب تختاره جوان. لا أسئلة استيعاب. مجرد متعة القراءة.',
    source: 'KTEA-III 2025 — reading at 13y6m equivalent. Nurture the strength.',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote: 'Never turn reading into a task. It is her superpower — keep it joyful.',
    defaultActive: true,
  },
  {
    id: 't18',
    category: 'family',
    title: '5-4-3-2-1 grounding when yellow zone',
    titleAr: 'تقنية 5-4-3-2-1 عند المنطقة الصفراء',
    description:
      'When yellow zone: 5 things to see, 4 to touch, 3 to hear, 2 to smell, 1 to taste.',
    descriptionAr: 'عند المنطقة الصفراء: 5 أشياء ترين، 4 تلمسين، 3 تسمعين، 2 تشمّين، 1 تتذوقين.',
    source: 'CFT grounding technique — Giulia Maccarini, Autism Clinic London, November 2024',
    assignedTo: 'all',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    pdaNote: 'Teach it when she is calm so she owns it. Not to be used as a demand during escalation.',
    defaultActive: false,
  },
]

export const JWAN_GOAL_SUGGESTIONS = [
  { text: 'Finish one page of my comic or story', why: 'Your creative superpower' },
  { text: 'Read a whole chapter of a book I choose', why: 'You read at a 13-year-old level' },
  { text: 'Try one new science fact or experiment', why: 'Your brain loves discovering things' },
  { text: 'Teach someone something I know really well', why: 'You know amazing things worth sharing' },
  { text: 'Draw or describe a feeling character this week', why: 'It helps your brain understand feelings' },
  { text: 'Do my morning sensory warm-up 3 days this week', why: 'It helps your body feel ready' },
  { text: 'Try a breathing exercise at least once', why: '4 breaths can change how your body feels' },
  { text: 'Tell someone what zone I am in without being asked', why: 'You already know your zones brilliantly' },
  { text: 'Write one new chapter in my story', why: 'Every chapter makes it better' },
  { text: 'Finish something I started last week', why: 'Finishing things feels really good' },
] as const

export function getTemplateById(id: string): ObjectiveTemplate | undefined {
  return OBJECTIVE_TEMPLATES.find((t) => t.id === id)
}
