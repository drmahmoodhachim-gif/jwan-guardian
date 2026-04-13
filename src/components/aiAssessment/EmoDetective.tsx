import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EMO_SCENARIOS, TASK_CLINICAL_MAPPINGS } from '../../data/assessmentTasks'
import { Card } from '../ui/Card'

export interface EmoDetectiveResults {
  correctCount: number
  total: number
  accuracyPct: number
  byDomain: Record<string, { correct: number; total: number }>
  timesMs: number[]
  choices: number[]
}

export function EmoDetective({
  onComplete,
}: {
  onComplete: (r: EmoDetectiveResults) => void
}) {
  const { t } = useTranslation()
  const [idx, setIdx] = useState(0)
  const [choices, setChoices] = useState<number[]>([])
  const [timesMs, setTimesMs] = useState<number[]>([])
  const [feedback, setFeedback] = useState<'idle' | 'ok' | 'no'>('idle')
  const [lastPick, setLastPick] = useState<number | null>(null)
  const startRef = useRef<number>(Date.now())

  const scenario = EMO_SCENARIOS[idx]
  const finished = idx >= EMO_SCENARIOS.length

  const finish = useCallback(
    (finalChoices: number[], finalTimes: number[]) => {
      let correct = 0
      const byDomain: Record<string, { correct: number; total: number }> = {}
      finalChoices.forEach((choice, i) => {
        const s = EMO_SCENARIOS[i]
        if (!byDomain[s.domain]) byDomain[s.domain] = { correct: 0, total: 0 }
        byDomain[s.domain].total++
        if (choice === s.correct) {
          correct++
          byDomain[s.domain].correct++
        }
      })
      const total = EMO_SCENARIOS.length
      onComplete({
        correctCount: correct,
        total,
        accuracyPct: Math.round((correct / total) * 100),
        byDomain,
        timesMs: finalTimes,
        choices: finalChoices,
      })
    },
    [onComplete],
  )

  function pick(optionIndex: number) {
    if (!scenario || feedback !== 'idle') return
    const elapsed = Date.now() - startRef.current
    const nextTimes = [...timesMs, elapsed]
    const nextChoices = [...choices, optionIndex]
    const isCorrect = optionIndex === scenario.correct
    setLastPick(optionIndex)
    setFeedback(isCorrect ? 'ok' : 'no')
    setTimeout(() => {
      setFeedback('idle')
      setLastPick(null)
      const isLast = idx + 1 >= EMO_SCENARIOS.length
      if (isLast) {
        setTimesMs(nextTimes)
        setChoices(nextChoices)
        setIdx(EMO_SCENARIOS.length)
        finish(nextChoices, nextTimes)
        return
      }
      setChoices(nextChoices)
      setTimesMs(nextTimes)
      setIdx((i) => i + 1)
      startRef.current = Date.now()
    }, isCorrect ? 900 : 1400)
  }

  if (finished) {
    return <p className="text-sm text-jwan-teal">{t('aiAssessment.emo.saved')}</p>
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-jwan-gray">{t('aiAssessment.emo.intro')}</p>
      <Card title={t('aiAssessment.emo.title', { n: idx + 1, total: EMO_SCENARIOS.length })}>
        <p className="text-base leading-relaxed text-jwan-ink">{scenario.text}</p>
        <p className="mt-2 text-xs text-jwan-gray">{scenario.ageLevel}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
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
                  'rounded-xl border-2 px-3 py-4 text-left text-sm font-medium transition',
                  showCorrect
                    ? 'border-teal-500 bg-teal-50'
                    : showWrong
                      ? 'border-rose-300 bg-rose-50'
                      : 'border-slate-200 bg-white hover:border-jwan-teal hover:bg-teal-50/50',
                ].join(' ')}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {feedback === 'no' ? (
          <p className="mt-4 text-sm text-jwan-gray">
            {t('aiAssessment.emo.notQuite', { answer: scenario.options[scenario.correct] })}
          </p>
        ) : null}
        {feedback === 'ok' ? (
          <p className="mt-4 text-sm text-teal-800">{t('aiAssessment.emo.nice')}</p>
        ) : null}
      </Card>
    </div>
  )
}

export function EmoDetectiveResultsPanel({ results }: { results: EmoDetectiveResults | null }) {
  const { t } = useTranslation()
  if (!results) return null
  const m = TASK_CLINICAL_MAPPINGS.emoDetective
  return (
    <div className="space-y-4 text-sm">
      <div className="rounded-xl bg-teal-50/80 p-4">
        <p className="font-semibold text-jwan-ink">
          {t('aiAssessment.emo.score', {
            pct: results.accuracyPct,
            correct: results.correctCount,
            total: results.total,
          })}
        </p>
        <p className="mt-2 text-jwan-gray">{m.formalMapping}</p>
      </div>
      <ul className="space-y-2">
        {Object.entries(results.byDomain).map(([domain, v]) => (
          <li key={domain} className="flex justify-between rounded-lg border border-slate-100 px-3 py-2">
            <span className="font-medium">{domain}</span>
            <span>
              {v.correct}/{v.total}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-jwan-gray">{t('aiAssessment.emo.timingNote')}</p>
    </div>
  )
}
