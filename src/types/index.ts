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
