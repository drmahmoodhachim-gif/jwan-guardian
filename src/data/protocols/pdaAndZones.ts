export const PDA_QUICK_GUIDE = {
  governingPrinciple: {
    en: 'PDA (pathological demand avoidance) is driven by anxiety about loss of autonomy and equality. Compliance-focused approaches increase threat; collaboration, choice, and shared problem-solving reduce it.',
    ar: 'يتفادى المرض الطلبات يقوده القلق من فقدان الاستقلالية والمساواة. أساليب الامتثال تزيد التهديد؛ التعاون والخيار وحل المشكلات المشتركة يقللها.',
  },
  rules: [
    {
      title: { en: 'Reduce demands', ar: 'قللي المطالب' },
      detail: {
        en: 'Frame everything as invitation, curiosity, or partnership — not instruction.',
        ar: 'أطْرِي كل شيء كدعوة أو فضول أو شراكة — لا كأمر.',
      },
    },
    {
      title: { en: 'Offer real choice', ar: 'قدمي خياراً حقيقياً' },
      detail: {
        en: 'Two acceptable options beat one directive. Control is regulatory.',
        ar: 'خياران مقبولان يغلبان أمراً واحداً. الشعور بالتحكم تنظيمي.',
      },
    },
    {
      title: { en: 'Give the why', ar: 'أعطِ السبب' },
      detail: {
        en: 'Her verbal reasoning is exceptional — reasoned requests engage her strengths.',
        ar: 'استدلالها اللفظي استثنائي — الطلبات المعقولة تنشط نقاط قوتها.',
      },
    },
    {
      title: { en: 'Co-regulate before correct', ar: 'تنظيم مشترك قبل التصحيح' },
      detail: {
        en: 'In escalation: calm presence, minimal language, no new demands.',
        ar: 'في التصعيد: حضور هادئ، لغة قليلة، لا مطالب جديدة.',
      },
    },
    {
      title: { en: 'Never shame or corner', ar: 'لا إذلال ولا حصر' },
      detail: {
        en: 'Public correction, forced compliance, and loss of face are high-threat.',
        ar: 'التصحيح العلني والامتثال القسري وفقدان الوجه تهديد عالٍ.',
      },
    },
  ],
  warningSigns: {
    yellow: {
      en: [
        'More movement in seat, fidgeting',
        'Raised voice, impatience',
        'Facial tension, argumentative tone',
        'Avoiding eye contact or task',
      ],
      ar: [
        'حركة أكثر في المقعد، تململ',
        'صوت أعلى، عدم صبر',
        'توتر في الوجه، نبرة جدال',
        'تجنب النظر أو المهمة',
      ],
    },
    red: {
      en: [
        'Yelling or crying',
        'Physical restlessness, leaving seat',
        'Loss of impulse control',
        'Difficulty responding to verbal instruction',
      ],
      ar: [
        'صراخ أو بكاء',
        'قلق جسدي، مغادرة المقعد',
        'فقدان ضبط الاندفاع',
        'صعوبة الاستجابة للتعليمات اللفظية',
      ],
    },
  },
} as const

export type ZoneKey = 'blue' | 'green' | 'yellow' | 'red'

export const ZONE_RESPONSE_GUIDE: Record<
  ZoneKey,
  {
    label: { en: string; ar: string }
    jwanNeeds: { en: string; ar: string }
    adultsDo: { en: string; ar: string }
    script: { en: string; ar: string }
    color: string
  }
> = {
  blue: {
    label: { en: 'Blue zone', ar: 'المنطقة الزرقاء' },
    jwanNeeds: {
      en: 'Gentle activation, connection, low-demand warmth — not pressure.',
      ar: 'تنشيط لطيف، تواصل، دفء بلا ضغط.',
    },
    adultsDo: {
      en: 'Offer movement, upbeat music, a short errand, or a joint activity she enjoys.',
      ar: 'قدّموا حركة، موسيقى، مهمّة قصيرة، أو نشاطاً مشتركاً تستمتع به.',
    },
    script: {
      en: "I'm here. Let's do something small together when you're ready.",
      ar: 'أنا هنا. لنفعل شيئاً صغيراً معاً عندما تكونين جاهزة.',
    },
    color: '#E6F1FB',
  },
  green: {
    label: { en: 'Green zone', ar: 'المنطقة الخضراء' },
    jwanNeeds: {
      en: 'Maintain predictability; this is the window for learning and social connection.',
      ar: 'الحفاظ على التوقع؛ هذه نافذة التعلم والتواصل.',
    },
    adultsDo: {
      en: 'Keep routines visible; preview next steps; acknowledge effort specifically.',
      ar: 'اجعلوا الروتين واضحاً؛ عاينوا الخطوات التالية؛ عبّروا عن المجهود بشكل محدد.',
    },
    script: {
      en: "You're in a good place — want to try this next step together?",
      ar: 'أنتِ في حالة جيدة — هل نجرب الخطوة التالية معاً؟',
    },
    color: '#E1F5EE',
  },
  yellow: {
    label: { en: 'Yellow zone', ar: 'المنطقة الصفراء' },
    jwanNeeds: {
      en: 'Co-regulation, reduced language, sensory tools — before demands increase.',
      ar: 'تنظيم مشترك، لغة أقل، أدوات حسية — قبل أن تزداد المطالب.',
    },
    adultsDo: {
      en: 'Lower your voice; offer fidget, wall pushes, breathing, or a short break.',
      ar: 'اخفضوا الصوت؛ قدّموا أداة، دفع حائط، تنفساً، أو استراحة قصيرة.',
    },
    script: {
      en: "You're in yellow — what's your tool? I'm right here.",
      ar: 'أنتِ في الأصفر — ما أداتكِ؟ أنا هنا.',
    },
    color: '#FAEEDA',
  },
  red: {
    label: { en: 'Red zone', ar: 'المنطقة الحمراء' },
    jwanNeeds: {
      en: 'Safety, space, no new demands — her nervous system is in threat mode.',
      ar: 'أمان، مساحة، لا مطالب جديدة — جهازها العصبي في وضع التهديد.',
    },
    adultsDo: {
      en: 'Stay calm and close; minimal words; heavy work or safe movement only after partial calm.',
      ar: 'ابقوا هادئين وقريبين؛ كلمات قليلة؛ عمل ثقيل أو حركة آمنة بعد هدوء جزئي.',
    },
    script: {
      en: "I can see your body is feeling big. You're safe. I'm not going anywhere.",
      ar: 'أرى أن جسمك يشعر بشدة. أنتِ بأمان. لن أذهب.',
    },
    color: '#FAECE7',
  },
}
