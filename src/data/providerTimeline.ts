/** Bilingual bullets — care team chronological context (platform display). */

export interface ProviderTimelineEntry {
  period: string
  periodAr: string
  detail: string
  detailAr: string
}

export const PROVIDER_TIMELINE: ProviderTimelineEntry[] = [
  {
    period: 'Age 0–4',
    periodAr: '0–4 سنوات',
    detail: 'Watchful observation; multiple professionals reassured parents; concerns about development persisted.',
    detailAr: 'مراقبة حذرة؛ طمأن الكثيرون العائلة؛ بقيت مخاوف التطور.',
  },
  {
    period: 'Age 4y10m',
    periodAr: '4 سنوات و10 أشهر',
    detail: 'OpenMinds (KABC-II, GARS, BASC) — Carla Chedid.',
    detailAr: 'أوبن مايندز — كارلا شديد.',
  },
  {
    period: 'Age 4y11m',
    periodAr: '4 سنوات و11 شهراً',
    detail: 'ASD diagnosis confirmed at Al Jalila; ADOS-2 pathway.',
    detailAr: 'تأكيد التوحد في الجليلة؛ مسار ADOS-2.',
  },
  {
    period: 'Age 5y2m',
    periodAr: '5 سنوات وشهران',
    detail: 'Al Jalila full neuropsychological battery — report Jan 2022 (2e profile).',
    detailAr: 'بطارية الجليلة النفسية العصبية الكاملة — تقرير يناير 2022.',
  },
  {
    period: 'Age 5',
    periodAr: '5 سنوات',
    detail: 'Arcadia FS2 + full-time LSA + BCBA behaviour plan.',
    detailAr: 'أركاديا FS2 + مساعد تعليمي كامل + خطة سلوك BCBA.',
  },
  {
    period: 'Age 6y5m',
    periodAr: '6 سنوات و5 أشهر',
    detail: 'Carbone Clinic VB-MAPP — milestones maxed; transition supports mainstream.',
    detailAr: 'كاربون كلينك VB-MAPP — اكتمال المراحل.',
  },
  {
    period: 'Age 6–7',
    periodAr: '6–7 سنوات',
    detail: 'Six months behaviour therapy at Carbone (Mar–Sep 2023); OT weekly from May 2023 — ongoing.',
    detailAr: 'ستة أشهر علاج سلوك في كاربون؛ علاج وظيفي أسبوعي من مايو 2023.',
  },
  {
    period: 'Age 7–8',
    periodAr: '7–8 سنوات',
    detail: 'Year 2: LSA wean; speech therapy from Sep 2024; LSA off end of Year 2.',
    detailAr: 'السنة 2: تخفيف المساعد؛ علاج نطق من سبتمبر 2024.',
  },
  {
    period: 'Age 8 — Year 3',
    periodAr: '8 سنوات — السنة 3',
    detail: 'Year 3 without LSA at first → increased difficulties; LSA reinstated (training gap noted).',
    detailAr: 'السنة 3 بدون مساعد ثم صعوبات؛ إعادة المساعد.',
  },
  {
    period: 'Age 8y2m',
    periodAr: '8 سنوات وشهران',
    detail: 'Autism Clinic London CFT — Giulia Maccarini; Neuropedia behavioural consultations.',
    detailAr: 'عيادة لندن CFT؛ نيوروبيديا.',
  },
  {
    period: 'Age 8y4m',
    periodAr: '8 سنوات و4 أشهر',
    detail: 'Mediclinic — Dr Faniran — Level 2 ASD; medication discussion for mood regulation.',
    detailAr: 'ميديكلينيك — د. فانيران — مستوى 2؛ مناقشة دواء.',
  },
]
