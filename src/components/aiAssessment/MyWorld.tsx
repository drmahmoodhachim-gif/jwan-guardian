import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { computeWorldProfile, TASK_CLINICAL_MAPPINGS, WORLD_SITUATIONS } from '../../data/assessmentTasks'
import { Card } from '../ui/Card'

const SCALE = [1, 2, 3, 4, 5] as const

export function MyWorld({
  onSubmit,
}: {
  onSubmit: (ratings: number[], profile: ReturnType<typeof computeWorldProfile>) => void
}) {
  const { t } = useTranslation()
  const [ratings, setRatings] = useState<number[]>(() => WORLD_SITUATIONS.map(() => 3))
  const [submitted, setSubmitted] = useState(false)

  const profile = computeWorldProfile(ratings)
  const chartData =
    profile.demand != null && profile.safety != null
      ? [
          { name: t('aiAssessment.world.demand'), v: profile.demand },
          { name: t('aiAssessment.world.safety'), v: profile.safety },
        ]
      : []

  function submit() {
    setSubmitted(true)
    onSubmit(ratings, profile)
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-jwan-gray">{t('aiAssessment.world.intro')}</p>
      <p className="text-sm font-medium text-teal-900">{t('aiAssessment.world.noWrong')}</p>

      <div className="flex flex-col gap-4">
        {WORLD_SITUATIONS.map((s, i) => (
          <div key={i} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
            <p className="text-sm text-jwan-ink">{s.text}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SCALE.map((n) => (
                <button
                  key={n}
                  type="button"
                  disabled={submitted}
                  onClick={() =>
                    setRatings((prev) => {
                      const next = [...prev]
                      next[i] = n
                      return next
                    })
                  }
                  className={`h-10 min-w-[2.5rem] rounded-lg border-2 text-sm font-semibold ${
                    ratings[i] === n
                      ? 'border-jwan-teal bg-teal-50 text-teal-900'
                      : 'border-slate-200 bg-slate-50 text-jwan-gray hover:border-slate-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[10px] uppercase text-jwan-gray">{s.category}</p>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={submit}
          className="rounded-full bg-jwan-teal px-6 py-2.5 text-sm font-semibold text-white shadow"
        >
          {t('aiAssessment.world.save')}
        </button>
      ) : (
        <p className="text-sm text-teal-800">{t('aiAssessment.world.saved')}</p>
      )}

      {submitted ? (
        <Card title={t('aiAssessment.world.yourProfile')}>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
                <XAxis type="number" domain={[0, 5]} />
                <YAxis type="category" dataKey="name" width={88} tick={{ fontSize: 11 }} />
                <Bar dataKey="v" fill="#0d9488" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {profile.pdaConsistent ? (
            <p className="mt-3 text-sm font-medium text-amber-900">{t('aiAssessment.world.pdaHint')}</p>
          ) : null}
          {profile.anxietyElevated ? (
            <p className="mt-2 text-sm text-jwan-gray">{t('aiAssessment.world.anxietyHint')}</p>
          ) : null}
          <p className="mt-4 text-xs text-jwan-gray">{TASK_CLINICAL_MAPPINGS.myWorld.clinicalValue}</p>
        </Card>
      ) : null}
    </div>
  )
}
