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
  /** Structured: where the observation occurred (clinical / educational setting). */
  setting_key?: string | null
  /** Structured: observed affect / regulation category. */
  mood_key?: string | null
  /** Structured: strategies used (evidence-based tags). */
  strategy_keys?: string[] | null
  /** When the observation happened (user can set in form; defaults to now). */
  observed_at?: string | null
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
  setting_key: string | null
  mood_key: string | null
  strategy_keys: string[]
  observed_at: string
}

export type ReportUpdate = Partial<
  Pick<
    Report,
    | 'role'
    | 'domain'
    | 'rating'
    | 'context'
    | 'what_happened'
    | 'jwan_response'
    | 'mood'
    | 'strategies_used'
    | 'setting_key'
    | 'mood_key'
    | 'strategy_keys'
    | 'observed_at'
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

export type CheckinMood =
  | 'happy'
  | 'calm'
  | 'worried'
  | 'frustrated'
  | 'sad'
  | 'excited'
  | 'overwhelmed'

export type ZoneColor = 'blue' | 'green' | 'yellow' | 'red'

export interface Checkin {
  id: string
  mood: CheckinMood
  mood_note: string | null
  zone: ZoneColor | null
  created_at: string
}

export interface Achievement {
  id: string
  text_en: string
  text_ar: string | null
  added_by: string | null
  is_jwan_entry: boolean
  created_at: string
}
