import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MEMORY_COLORS } from '../../data/assessmentTasks'
import { Card } from '../ui/Card'

const MAX_SPAN_CAP = 9
const MAX_ERRORS = 3

type Phase = 'intro' | 'show' | 'input' | 'between'

export interface MemorySparkResults {
  maxSpan: number
  errors: number
  rounds: { span: number; success: boolean }[]
}

function randomSequence(length: number): string[] {
  const ids = MEMORY_COLORS.map((c) => c.id)
  return Array.from({ length }, () => ids[Math.floor(Math.random() * ids.length)]!)
}

export function MemorySpark({ onComplete }: { onComplete: (r: MemorySparkResults) => void }) {
  const { t } = useTranslation()
  const [phase, setPhase] = useState<Phase>('intro')
  const [span, setSpan] = useState(2)
  const [sequence, setSequence] = useState<string[]>([])
  const [input, setInput] = useState<string[]>([])
  const [showIdx, setShowIdx] = useState(0)
  const [done, setDone] = useState(false)

  const maxSpanRef = useRef(0)
  const errorsRef = useRef(0)
  const [errorUi, setErrorUi] = useState(0)
  const [maxUi, setMaxUi] = useState(0)
  const roundsRef = useRef<{ span: number; success: boolean }[]>([])
  const endedRef = useRef(false)

  const finish = useCallback((r: MemorySparkResults) => {
    if (endedRef.current) return
    endedRef.current = true
    setDone(true)
    onComplete(r)
  }, [onComplete])

  const startRound = useCallback((nextSpan: number) => {
    const seq = randomSequence(nextSpan)
    setSequence(seq)
    setInput([])
    setShowIdx(0)
    setPhase('show')
  }, [])

  useEffect(() => {
    if (phase !== 'show' || sequence.length === 0) return
    if (showIdx >= sequence.length) {
      const tmr = setTimeout(() => {
        setPhase('input')
        setShowIdx(0)
      }, 400)
      return () => clearTimeout(tmr)
    }
    const tmr = setTimeout(() => setShowIdx((i) => i + 1), 550)
    return () => clearTimeout(tmr)
  }, [phase, showIdx, sequence])

  function beginGame() {
    endedRef.current = false
    maxSpanRef.current = 0
    errorsRef.current = 0
    roundsRef.current = []
    setErrorUi(0)
    setMaxUi(0)
    setSpan(2)
    startRound(2)
  }

  function tapColor(id: string) {
    if (phase !== 'input' || done || endedRef.current) return
    const next = [...input, id]
    const pos = next.length - 1
    if (sequence[pos] !== id) {
      errorsRef.current += 1
      setErrorUi(errorsRef.current)
      roundsRef.current = [...roundsRef.current, { span, success: false }]
      if (errorsRef.current >= MAX_ERRORS) {
        finish({
          maxSpan: maxSpanRef.current,
          errors: errorsRef.current,
          rounds: [...roundsRef.current],
        })
        return
      }
      setPhase('between')
      setTimeout(() => startRound(span), 600)
      return
    }
    if (next.length === sequence.length) {
      maxSpanRef.current = Math.max(maxSpanRef.current, span)
      setMaxUi(maxSpanRef.current)
      roundsRef.current = [...roundsRef.current, { span, success: true }]
      if (span >= MAX_SPAN_CAP) {
        finish({
          maxSpan: maxSpanRef.current,
          errors: errorsRef.current,
          rounds: [...roundsRef.current],
        })
        return
      }
      const nextSpan = span + 1
      setSpan(nextSpan)
      setPhase('between')
      setTimeout(() => startRound(nextSpan), 500)
      return
    }
    setInput(next)
  }

  if (done) {
    return <p className="text-sm text-jwan-teal">{t('aiAssessment.memory.saved')}</p>
  }

  if (phase === 'intro') {
    return (
      <div className="space-y-4">
        <p className="text-sm text-jwan-gray">{t('aiAssessment.memory.intro')}</p>
        <button
          type="button"
          onClick={beginGame}
          className="rounded-full bg-jwan-teal px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95"
        >
          {t('aiAssessment.memory.start')}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-jwan-gray">
        {t('aiAssessment.memory.hint', {
          span,
          errors: errorUi,
          max: maxUi,
        })}
      </p>
      <Card title={t('aiAssessment.memory.watch')}>
        <div className="flex min-h-[120px] flex-wrap items-center justify-center gap-4">
          {phase === 'show' &&
            sequence.map((cid, i) => {
              const c = MEMORY_COLORS.find((x) => x.id === cid)
              const active = i === showIdx
              return (
                <div
                  key={`${i}-${cid}`}
                  className="h-16 w-16 rounded-xl shadow-inner transition-opacity md:h-20 md:w-20"
                  style={{
                    backgroundColor: c?.hex,
                    opacity: active ? 1 : 0.2,
                  }}
                  aria-hidden
                />
              )
            })}
          {phase === 'input' ? (
            <p className="text-sm text-jwan-gray">{t('aiAssessment.memory.yourTurn')}</p>
          ) : null}
          {phase === 'between' ? (
            <p className="text-sm text-jwan-teal">{t('aiAssessment.memory.next')}</p>
          ) : null}
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {MEMORY_COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => tapColor(c.id)}
            disabled={phase !== 'input'}
            className="flex flex-col items-center gap-2 rounded-xl border-2 border-slate-200 p-4 transition hover:border-jwan-teal disabled:opacity-40"
          >
            <span
              className="h-12 w-12 rounded-lg shadow-md"
              style={{ backgroundColor: c.hex }}
              aria-hidden
            />
            <span className="text-xs font-medium text-jwan-ink">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function MemorySparkResultsPanel({ results }: { results: MemorySparkResults | null }) {
  const { t } = useTranslation()
  if (!results) return null
  return (
    <div className="rounded-xl bg-violet-50/80 p-4 text-sm">
      <p className="font-semibold text-jwan-ink">
        {t('aiAssessment.memory.maxSpan', { n: results.maxSpan })}
      </p>
      <p className="mt-1 text-jwan-gray">
        {t('aiAssessment.memory.errors', { n: results.errors })}
      </p>
    </div>
  )
}
