import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { STORY_SCENARIOS, TASK_CLINICAL_MAPPINGS } from '../../data/assessmentTasks'
import { Card } from '../ui/Card'

export interface StoryMindResults {
  correctCount: number
  total: number
  accuracyPct: number
  choices: number[]
}

export function StoryMind({ onComplete }: { onComplete: (r: StoryMindResults) => void }) {
  const { t } = useTranslation()
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState<number[]>([])
  const [feedback, setFeedback] = useState<'idle' | 'ok' | 'no'>('idle')
  const [lastPick, setLastPick] = useState<number | null>(null)
  const finished = idx >= STORY_SCENARIOS.length
  const scenario = STORY_SCENARIOS[idx]

  const finish = useCallback(
    (final: number[]) => {
      let correct = 0
      final.forEach((c, i) => {
        if (c === STORY_SCENARIOS[i].correct) correct++
      })
      onComplete({
        correctCount: correct,
        total: STORY_SCENARIOS.length,
        accuracyPct: Math.round((correct / STORY_SCENARIOS.length) * 100),
        choices: final,
      })
    },
    [onComplete],
  )

  function pick(i: number) {
    if (!scenario || feedback !== 'idle') return
    const next = [...choices, i]
    const ok = i === scenario.correct
    setLastPick(i)
    setFeedback(ok ? 'ok' : 'no')
    setTimeout(() => {
      setFeedback('idle')
      setLastPick(null)
      if (idx + 1 >= STORY_SCENARIOS.length) {
        setChoices(next)
        setIdx(STORY_SCENARIOS.length)
        finish(next)
        return
      }
      setChoices(next)
      setIdx((x) => x + 1)
    }, ok ? 800 : 1200)
  }

  if (finished) {
    return <p className="text-sm text-jwan-teal">{t('aiAssessment.story.saved')}</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-jwan-gray">{t('aiAssessment.story.intro')}</p>
      <Card title={t('aiAssessment.story.cardTitle', { n: idx + 1, total: STORY_SCENARIOS.length })}>
        <p className="rounded-lg bg-slate-50 p-3 text-sm leading-relaxed text-jwan-ink">{scenario.scene}</p>
        <p className="mt-4 font-medium text-jwan-ink">{scenario.question}</p>
        <p className="mt-1 text-xs font-medium text-teal-800">{scenario.level}</p>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {scenario.options.map((opt, i) => {
            const showCorrect = feedback !== 'idle' && i === scenario.correct
            const showWrong = feedback === 'no' && lastPick === i && i !== scenario.correct
            return (
              <button
                key={i}
                type="button"
                onClick={() => pick(i)}
                disabled={feedback !== 'idle'}
                className={[
                  'rounded-xl border-2 px-3 py-3 text-left text-sm',
                  showCorrect
                    ? 'border-teal-500 bg-teal-50'
                    : showWrong
                      ? 'border-rose-300 bg-rose-50'
                      : 'border-slate-200 bg-white hover:border-jwan-teal',
                ].join(' ')}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {feedback === 'ok' ? (
          <p className="mt-4 text-sm text-teal-800">
            {t('aiAssessment.story.childNote', { note: scenario.childFriendlyNote })}
          </p>
        ) : null}
        {feedback === 'no' ? (
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-jwan-gray">
              {t('aiAssessment.story.notQuite', { answer: scenario.options[scenario.correct] })}
            </p>
            <p className="text-teal-800">{t('aiAssessment.story.childNote', { note: scenario.childFriendlyNote })}</p>
          </div>
        ) : null}
      </Card>
    </div>
  )
}

export function StoryMindResultsPanel({ results }: { results: StoryMindResults | null }) {
  const { t } = useTranslation()
  if (!results) return null
  const m = TASK_CLINICAL_MAPPINGS.storyMind
  const byLevel: Record<string, { correct: number; total: number }> = {}
  STORY_SCENARIOS.forEach((s, i) => {
    const key = s.level
    if (!byLevel[key]) byLevel[key] = { correct: 0, total: 0 }
    byLevel[key].total++
    if (results.choices[i] === s.correct) byLevel[key].correct++
  })
  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold text-jwan-ink">
        {t('aiAssessment.story.score', {
          pct: results.accuracyPct,
          correct: results.correctCount,
          total: results.total,
        })}
      </p>
      <p className="text-jwan-gray">{m.formalMapping}</p>
      <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3">
        <p className="font-medium text-jwan-ink">{t('aiAssessment.story.byLevel')}</p>
        <ul className="mt-2 space-y-1 text-xs text-jwan-gray">
          {Object.entries(byLevel).map(([level, v]) => (
            <li key={level} className="flex justify-between gap-2">
              <span className="line-clamp-2">{level}</span>
              <span>
                {v.correct}/{v.total}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-jwan-gray">{m.discrepancyNote}</p>
    </div>
  )
}
