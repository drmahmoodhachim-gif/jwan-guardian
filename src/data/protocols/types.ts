export type ActionWho =
  | 'all'
  | 'dad'
  | 'mom'
  | 'nanny'
  | 'lsa'
  | 'teacher'
  | 'therapist'
  | 'bcba'

export interface PersonProtocol {
  id: string
  name: string
  nameAr: string
  role: string
  roleAr: string
  color: string
  emoji: string
  tagline: string
  taglineAr: string
  keyPrinciple: string
  keyPrincipleAr: string
  steps: Array<{
    title: string
    titleAr: string
    detail: string
    detailAr: string
  }>
  avoid: string
  avoidAr: string
  uniqueStrength: string
  uniqueStrengthAr: string
}
