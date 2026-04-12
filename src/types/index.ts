export type Role = 'dad' | 'mom' | 'teacher' | 'therapist' | 'doctor' | 'jwan' | 'admin'

export type PreferredLang = 'en' | 'ar'

export interface Profile {
  id: string
  full_name: string
  role: Role
  avatar_url: string | null
  preferred_lang: PreferredLang
  created_at: string
}

export type ReportDomain =
  | 'social'
  | 'emotion'
  | 'attention'
  | 'language'
  | 'motor'
  | 'sensory'
  | 'adaptive'
  | 'general'

export interface Report {
  id: string
  author_id: string | null
  role: string
  domain: ReportDomain
  rating: number | null
  context: string | null
  what_happened: string
  jwan_response: string | null
  mood: string | null
  strategies_used: string | null
  created_at: string
  updated_at: string
}

export type ReportInsert = {
  author_id: string
  role: string
  domain: ReportDomain
  rating: number | null
  context: string | null
  what_happened: string
  jwan_response: string | null
  mood: string | null
  strategies_used: string | null
}

export type ReportUpdate = Partial<
  Pick<
    Report,
    'role' | 'domain' | 'rating' | 'context' | 'what_happened' | 'jwan_response' | 'mood' | 'strategies_used'
  >
>

export interface Reminder {
  id: string
  text_en: string
  text_ar: string | null
  frequency: 'once' | 'daily' | 'weekly' | 'monthly'
  assigned_to: string
  is_active: boolean
  created_by: string | null
  created_at: string
}
