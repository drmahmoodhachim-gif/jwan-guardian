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
    title: 'CFT approach — implement consistently',
    titleAr: 'نهج العلاج بالتعاطف — تطبيق متسق',
    body:
      'Giulia Maccarini (Autism Clinic London, Nov–Dec 2024) introduced Compassion-Focused Therapy. Key tools: named emotion characters, 5-4-3-2-1 grounding, social stories from real situations, safe space visualisation. Reinforce across home, school, and therapy.',
    bodyAr:
      'قدمت غيوليا ماكاريني (عيادة لندن للتوحد، نوفمبر–ديسمبر 2024) العلاج القائم على التعاطف. الأدوات: شخصيات المشاعر، تقنية 5-4-3-2-1، قصص اجتماعية من مواقف حقيقية، تصور مكان آمن. يجب التعزيز في المنزل والمدرسة والعلاج.',
    source: 'Autism Clinic London, Nov–Dec 2024',
  },
  {
    level: 'info',
    color: 'teal',
    icon: 'Palette',
    title: 'Comics and stories — use as a therapeutic lever',
    titleAr: 'القصص المصورة — استخدامها كدعم علاجي',
    body:
      'Documented Nov 2024: exceptional artistic talent — Jwan creates her own comics and stories. Use actively in CFT, social stories, and emotional expression.',
    bodyAr:
      'وثّق نوفمبر 2024: موهبة فنية استثنائية — جوان تصنع قصصاً مصورة وقصصاً خاصة. استخدموها بنشاط في العلاج بالتعاطف والقصص الاجتماعية والتعبير العاطفي.',
    source: 'Autism Clinic London, Nov 2024',
  },
]
