/** Keys stored in DB — labels come from i18n `report.opt.*` */

export const SETTING_KEYS = [
  'school_classroom',
  'school_playground',
  'school_pe',
  'school_resource',
  'home',
  'therapy_bcba',
  'therapy_ot',
  'therapy_slp',
  'therapy_other',
  'telehealth',
  'community',
  'peer_playdate',
  'medical',
  'other',
] as const
export type SettingKey = (typeof SETTING_KEYS)[number]

export const MOOD_KEYS = [
  'regulated_engaged',
  'happy_excited',
  'calm_neutral',
  'anxious_mild',
  'anxious_elevated',
  'frustrated',
  'sad_low',
  'angry_dysregulated',
  'overwhelmed',
  'withdrawn',
  'other',
] as const
export type MoodKey = (typeof MOOD_KEYS)[number]

/** Evidence-based / clinical strategy tags (multi-select) */
export const STRATEGY_KEYS = [
  'visual_schedule',
  'first_then',
  'social_story',
  'video_modeling',
  'priming',
  'sensory_break',
  'deep_pressure',
  'noise_reduction_ear_defenders',
  'token_board',
  'naturalistic_reinforcement',
  'prompting_graduated',
  'co_regulation',
  'emotion_labeling',
  'social_script_peers',
  'lsa_facilitation',
  'environmental_change',
  'task_variation',
  'other',
] as const
export type StrategyKey = (typeof STRATEGY_KEYS)[number]

export function toggleStrategyKey(list: string[], key: string): string[] {
  if (list.includes(key)) return list.filter((k) => k !== key)
  return [...list, key]
}
