import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth'
import { useAchievements } from '../../hooks/useAchievements'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { Card } from '../ui/Card'

export function Achievements() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')
  const { profile, user } = useAuth()
  const { achievements, loading, addAchievement } = useAchievements()
  const [en, setEn] = useState('')
  const [arText, setArText] = useState('')
  const [isJwan, setIsJwan] = useState(false)
  const [pending, setPending] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    const text_en = en.trim()
    if (!text_en) {
      setErr(t('jwan.achievementNeedEn'))
      return
    }
    setErr(null)
    setPending(true)
    const { error } = await addAchievement({
      text_en,
      text_ar: arText.trim() || null,
      is_jwan_entry: isJwan,
      added_by: profile?.id ?? null,
    })
    setPending(false)
    if (error) {
      setErr(error)
      return
    }
    setEn('')
    setArText('')
    setIsJwan(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card title={t('jwan.achievements')}>
        {loading ? <LoadingSpinner /> : null}
        <p className="mb-4 text-sm text-jwan-gray">{t('jwan.achievementsIntro')}</p>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
            {t('jwan.achievementEn')}
            <input
              value={en}
              onChange={(e) => setEn(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-jwan-ink">
            {t('jwan.achievementAr')}
            <input
              value={arText}
              onChange={(e) => setArText(e.target.value)}
              dir="rtl"
              className="rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isJwan}
              onChange={(e) => setIsJwan(e.target.checked)}
              className="rounded border-slate-300"
            />
            {t('jwan.achievementJwan')}
          </label>
        </div>

        {err ? <p className="mt-2 text-sm text-rose-700">{err}</p> : null}

        <button
          type="button"
          disabled={pending || !user}
          onClick={() => void submit()}
          className="mt-4 rounded-xl bg-jwan-teal px-6 py-2.5 font-semibold text-white disabled:opacity-50"
        >
          {pending ? t('common.loading') : t('jwan.addAchievement')}
        </button>
      </Card>

      <Card title={t('jwan.achievementsList')}>
        {achievements.length === 0 ? (
          <p className="text-sm text-jwan-gray">{t('jwan.noAchievements')}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {achievements.map((a) => (
              <li
                key={a.id}
                className="rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm shadow-sm"
              >
                <p className="font-medium text-jwan-ink">{ar && a.text_ar ? a.text_ar : a.text_en}</p>
                {a.text_ar && !ar ? <p className="mt-1 text-jwan-gray" dir="rtl">{a.text_ar}</p> : null}
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-jwan-gray">
                  {a.is_jwan_entry ? (
                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-violet-800">
                      {t('jwan.badgeJwan')}
                    </span>
                  ) : null}
                  <span>
                    {new Date(a.created_at).toLocaleString(ar ? 'ar-AE' : 'en-GB', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
