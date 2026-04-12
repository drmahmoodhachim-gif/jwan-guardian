import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { CheckinMood, ZoneColor } from '../../types'
import { useCheckins } from '../../hooks/useCheckins'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { Card } from '../ui/Card'

const MOODS: { key: CheckinMood; emoji: string }[] = [
  { key: 'happy', emoji: '😊' },
  { key: 'calm', emoji: '😌' },
  { key: 'excited', emoji: '🤩' },
  { key: 'worried', emoji: '😟' },
  { key: 'frustrated', emoji: '😣' },
  { key: 'sad', emoji: '😢' },
  { key: 'overwhelmed', emoji: '😵' },
]

const ZONES: { key: ZoneColor; labelKey: string }[] = [
  { key: 'blue', labelKey: 'jwan.zone.blue' },
  { key: 'green', labelKey: 'jwan.zone.green' },
  { key: 'yellow', labelKey: 'jwan.zone.yellow' },
  { key: 'red', labelKey: 'jwan.zone.red' },
]

export function MoodCheckin() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const { checkins, loading, addCheckin } = useCheckins()
  const [mood, setMood] = useState<CheckinMood | null>(null)
  const [zone, setZone] = useState<ZoneColor | null>(null)
  const [note, setNote] = useState('')
  const [pending, setPending] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    if (!mood) {
      setErr(t('jwan.pickMood'))
      return
    }
    setErr(null)
    setPending(true)
    const { error } = await addCheckin(mood, note || null, zone)
    setPending(false)
    if (error) {
      setErr(error)
      return
    }
    setNote('')
    setZone(null)
    setMood(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card title={t('jwan.mood')}>
        {loading ? <LoadingSpinner /> : null}
        <p className="mb-4 text-sm text-jwan-gray">{t('jwan.moodIntro')}</p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {MOODS.map(({ key, emoji }) => (
            <button
              key={key}
              type="button"
              onClick={() => setMood(key)}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-2xl transition ${
                mood === key
                  ? 'border-jwan-teal bg-teal-50 shadow-inner'
                  : 'border-slate-200 bg-white hover:border-teal-200'
              }`}
            >
              <span aria-hidden>{emoji}</span>
              <span className="text-[10px] font-medium text-jwan-ink">
                {t(`jwan.mood.${key}`)}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-jwan-ink">{t('jwan.zoneOptional')}</p>
          <div className="flex flex-wrap gap-2">
            {ZONES.map(({ key, labelKey }) => (
              <button
                key={key}
                type="button"
                onClick={() => setZone((z) => (z === key ? null : key))}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  zone === key
                    ? key === 'blue'
                      ? 'bg-blue-200 text-blue-950'
                      : key === 'green'
                        ? 'bg-green-200 text-green-950'
                        : key === 'yellow'
                          ? 'bg-yellow-200 text-yellow-950'
                          : 'bg-red-200 text-red-950'
                    : 'bg-slate-100 text-jwan-gray'
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-4 flex flex-col gap-1 text-sm font-medium text-jwan-ink">
          {t('jwan.moodNote')}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="rounded-lg border border-slate-200 px-3 py-2"
            placeholder={t('jwan.moodNoteHint')}
          />
        </label>

        {err ? <p className="mt-2 text-sm text-rose-700">{err}</p> : null}

        <button
          type="button"
          disabled={pending || !mood}
          onClick={() => void submit()}
          className="mt-4 rounded-xl bg-jwan-teal px-6 py-2.5 font-semibold text-white disabled:opacity-50"
        >
          {pending ? t('common.loading') : t('jwan.saveMood')}
        </button>
      </Card>

      <Card title={t('jwan.moodHistory')}>
        {checkins.length === 0 ? (
          <p className="text-sm text-jwan-gray">{t('jwan.noCheckins')}</p>
        ) : (
          <ul className="flex flex-col gap-2 text-sm">
            {checkins.map((c) => (
              <li
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-white px-3 py-2"
              >
                <span className="font-medium">
                  {MOODS.find((m) => m.key === c.mood)?.emoji}{' '}
                  {t(`jwan.mood.${c.mood}`)}
                  {c.zone ? ` · ${t(`jwan.zone.${c.zone}`)}` : ''}
                </span>
                <span className="text-xs text-jwan-gray">
                  {new Date(c.created_at).toLocaleString(ar ? 'ar-AE' : 'en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
                {c.mood_note ? <p className="w-full text-jwan-ink">{c.mood_note}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
