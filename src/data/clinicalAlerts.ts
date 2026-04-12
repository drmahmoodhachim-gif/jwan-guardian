export type ClinicalAlertLevel = 'high' | 'info' | 'warning' | 'positive'

export type ClinicalAlertIcon =
  | 'Heart'
  | 'Palette'
  | 'AlertCircle'
  | 'Activity'
  | 'Brain'
  | 'CheckCircle'
  | 'Star'
  | 'Eye'

export interface ClinicalAlert {
  id: string
  level: ClinicalAlertLevel
  color: string
  icon: ClinicalAlertIcon
  title: string
  titleAr: string
  body: string
  bodyAr: string
  source: string
}

export const CLINICAL_ALERTS: ClinicalAlert[] = [
  {
    id: 'cft-2024',
    level: 'high',
    color: 'purple',
    icon: 'Heart',
    title: 'CFT approach introduced — implement consistently',
    titleAr: 'نهج العلاج بالتعاطف — تطبيق متسق',
    body:
      'Giulia Maccarini (Autism Clinic London, Nov 2024) introduced Compassion-Focused Therapy. Key tools: named emotion characters, 5-4-3-2-1 grounding, social stories from real situations, safe space visualisation. Must be reinforced by ALL team members consistently.',
    bodyAr:
      'قدمت غيوليا ماكاريني العلاج القائم على التعاطف. الأدوات الرئيسية: شخصيات المشاعر، تقنية 5-4-3-2-1، قصص اجتماعية من مواقف حقيقية، تصور مكان آمن. يجب أن يعززها جميع أعضاء الفريق باستمرار.',
    source: 'Autism Clinic London, Nov–Dec 2024',
  },
  {
    id: 'comics-2024',
    level: 'info',
    color: 'teal',
    icon: 'Palette',
    title: 'Jwan creates comics and stories — use as therapeutic tool',
    titleAr: 'جوان تصنع قصصاً مصورة — استخدامها كأداة علاجية',
    body:
      'Documented by Giulia Maccarini (Nov 2024): exceptional artistic talent — creates her own comics and stories. Actively use in CFT, social stories, and emotional expression work.',
    bodyAr:
      'وثّقت غيوليا ماكاريني (نوفمبر 2024): موهبة فنية استثنائية — تصنع قصصها المصورة الخاصة. يُستخدم هذا بنشاط في العلاج بالتعاطف والقصص الاجتماعية والتعبير العاطفي.',
    source: 'Autism Clinic London, Nov 2024',
  },
  {
    id: 'ot-discharge-2025',
    level: 'positive',
    color: 'teal',
    icon: 'CheckCircle',
    title: 'OT discharge — all 7 goals met (April 2025)',
    titleAr: 'إنهاء العلاج الوظيفي — جميع الأهداف السبعة محققة (أبريل 2025)',
    body:
      'Jwan was formally discharged from OT at Neuropedia (Stephane Hornsby-Stoltz) having met ALL goals: fine motor, bilateral coordination, primitive reflexes, eye-teaming, gross motor, sensory regulation, and self-regulation. Uses Zones of Regulation independently without visual prompts.',
    bodyAr:
      'أُنهي العلاج الوظيفي رسمياً بعد تحقيق جميع الأهداف. استخدام مناطق التنظيم دون مطاليع بصرية.',
    source: 'Neuropedia OT discharge, April 2025',
  },
  {
    id: 'zones-internalised',
    level: 'positive',
    color: 'teal',
    icon: 'Star',
    title: 'Zones of Regulation — fully internalised',
    titleAr: 'مناطق التنظيم — مُدمجة بالكامل',
    body:
      'Jwan identifies her zone verbally without visual supports (e.g. “I’m in the red zone”). Can advocate for her needs. Independent for low-to-moderate intensity emotions; adult co-regulation still helps for high-intensity states.',
    bodyAr:
      'تحدد منطقتها لفظياً بدون دعم بصري. تستطيع طلب ما تحتاجه. مستقلة للمشاعر منخفضة إلى متوسطة الشدة.',
    source: 'Neuropedia OT discharge, April 2025',
  },
  {
    id: 'eye-teaming-followup',
    level: 'high',
    color: 'amber',
    icon: 'Eye',
    title: 'Eye-teaming (convergence) — follow-up needed',
    titleAr: 'صعوبة تنسيق العينين — تحتاج متابعة',
    body:
      'Convergence difficulty noted at near-point screening (Nov 2024 OT reassessment). Not fully resolved within OT. Consider paediatric ophthalmologist or developmental optometrist given reading load and visual-motor demands.',
    bodyAr:
      'صعوبة في تقارب العينين عند الفحص. يُنصح بمتابعة مختص عيون/بصريات نمائية.',
    source: 'Neuropedia OT reassessment, November 2024',
  },
  {
    id: 'sensory-social-emotional',
    level: 'info',
    color: 'amber',
    icon: 'Brain',
    title: 'Sensory Profile: social-emotional still “much more than others”',
    titleAr: 'الملف الحسي: الاجتماعي-العاطفي لا يزال “أكثر بكثير”',
    body:
      'The sensory profile finding that stayed elevated across Oct 2024 and Apr 2025: social-emotional processing more intense than peers — consistent with patterns across multiple assessments from 2021–2025.',
    bodyAr:
      'النتيجة التي بقيت مرتفعة في الملف الحسي: المعالجة الاجتماعية-العاطفية أكثر حدة من الأقران.',
    source: 'Child Sensory Profile 2, Oct 2024 + Apr 2025',
  },
]
