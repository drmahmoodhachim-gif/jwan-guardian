import { useMemo, useState } from 'react'
import { QUIZ_QUESTIONS } from '../../../data/bookUniverse'
import { useJwanQuizScores } from '../../../hooks/useJwanQuizScores'

export function BookQuiz() {
  const total = 20
  const { saveScore } = useJwanQuizScores()
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)

  const question = QUIZ_QUESTIONS[index % QUIZ_QUESTIONS.length]!
  const finished = index >= total
  const pct = useMemo(() => Math.round((index / total) * 100), [index])

  async function answer(i: number) {
    if (picked != null || finished) return
    setPicked(i)
    const ok = i === question.correct
    const nextScore = score + (ok ? 1 : 0)
    const nextStreak = ok ? streak + 1 : 0
    setScore(nextScore)
    setStreak(nextStreak)
    if (index + 1 >= total) {
      await saveScore(nextScore, total, nextStreak)
    }
  }

  function next() {
    setPicked(null)
    setIndex((v) => v + 1)
  }

  if (!started) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <p className="text-sm text-jwan-gray">Book and fact quiz with brainy questions.</p>
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-3 rounded-lg bg-jwan-teal px-4 py-2 text-sm font-semibold text-white"
        >
          Start quiz
        </button>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <p className="text-lg font-semibold text-jwan-ink">Quiz complete</p>
        <p className="mt-1 text-sm text-jwan-gray">
          Final score: {score}/{total}
        </p>
        <button
          type="button"
          onClick={() => {
            setIndex(0)
            setScore(0)
            setStreak(0)
            setPicked(null)
          }}
          className="mt-3 rounded-lg border border-slate-200 px-4 py-2 text-sm"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded bg-slate-50 p-2">
          <p className="text-jwan-gray">Score</p>
          <p className="text-xl font-semibold text-jwan-ink">{score}</p>
        </div>
        <div className="rounded bg-slate-50 p-2">
          <p className="text-jwan-gray">Answered</p>
          <p className="text-xl font-semibold text-jwan-ink">{index}</p>
        </div>
        <div className="rounded bg-slate-50 p-2">
          <p className="text-jwan-gray">Streak</p>
          <p className="text-xl font-semibold text-jwan-ink">{streak}</p>
        </div>
      </div>

      <div className="h-2 rounded bg-slate-100">
        <div className="h-full rounded bg-teal-500" style={{ width: `${pct}%` }} />
      </div>

      <div className="rounded-lg bg-slate-50 p-3">
        <p className="text-sm font-semibold text-jwan-ink">{question.question}</p>
        <div className="mt-3 space-y-2">
          {question.options.map((option, i) => {
            const cls =
              picked == null
                ? 'border-slate-200 hover:bg-slate-50'
                : i === question.correct
                  ? 'border-teal-500 bg-teal-50 text-teal-900'
                  : i === picked
                    ? 'border-orange-400 bg-orange-50 text-orange-900'
                    : 'border-slate-200 opacity-50'
            return (
              <button
                key={option}
                type="button"
                onClick={() => void answer(i)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${cls}`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>

      {picked != null ? (
        <div className="rounded-lg bg-teal-50 p-3 text-sm">
          <p className="font-semibold text-jwan-ink">Fact</p>
          <p className="text-jwan-ink">{question.fact}</p>
          <button
            type="button"
            onClick={next}
            className="mt-2 rounded-lg bg-jwan-teal px-3 py-1.5 text-xs font-semibold text-white"
          >
            Next question
          </button>
        </div>
      ) : null}
    </div>
  )
}

