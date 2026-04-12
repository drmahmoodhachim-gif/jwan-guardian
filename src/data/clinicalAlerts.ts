export type ClinicalAlertLevel = 'high' | 'info' | 'warning'

export interface ClinicalAlert {
  level: ClinicalAlertLevel
  color: string
  /** Lucide icon name */
  icon: 'Heart' | 'Palette' | 'AlertCircle'
  title: string
  titleAr: string
  body: string
  bodyAr: string
  source: string
}

export const CLINICAL_ALERTS: ClinicalAlert[] = [
  {
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
]
