import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'

const PHASE_MS = [
  { key: 'inhale' as const, ms: 4000 },
  { key: 'hold1' as const, ms: 4000 },
  { key: 'exhale' as const, ms: 6000 },
  { key: 'hold2' as const, ms: 2000 },
]

const CYCLES = 4

export function BreathingTool() {
  const { t } = useTranslation()
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [cycleIdx, setCycleIdx] = useState(0)
  const [remainingSec, setRemainingSec] = useState(0)
  const [finished, setFinished] = useState(false)

  const deadlineRef = useRef(0)
  const phaseRef = useRef(0)
  const cycleRef = useRef(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      const now = Date.now()
      const left = deadlineRef.current - now
      setRemainingSec(Math.max(0, Math.ceil(left / 1000)))
      if (left > 0) return

      let p = phaseRef.current
      let c = cycleRef.current
      p = (p + 1) % PHASE_MS.length
      if (p === 0) {
        c += 1
        if (c >= CYCLES) {
          setRunning(false)
          setFinished(true)
          setPhaseIdx(0)
          setCycleIdx(0)
          setRemainingSec(0)
          phaseRef.current = 0
          cycleRef.current = 0
          return
        }
      }
      phaseRef.current = p
      cycleRef.current = c
      deadlineRef.current = now + PHASE_MS[p].ms
      setPhaseIdx(p)
      setCycleIdx(c)
      setRemainingSec(Math.ceil(PHASE_MS[p].ms / 1000))
    }, 200)
    return () => clearInterval(id)
  }, [running])

  function start() {
    setFinished(false)
    phaseRef.current = 0
    cycleRef.current = 0
    deadlineRef.current = Date.now() + PHASE_MS[0].ms
    setPhaseIdx(0)
    setCycleIdx(0)
    setRemainingSec(Math.ceil(PHASE_MS[0].ms / 1000))
    setRunning(true)
  }

  function stop() {
    setRunning(false)
    setPhaseIdx(0)
    setCycleIdx(0)
    setRemainingSec(0)
    phaseRef.current = 0
    cycleRef.current = 0
  }

  const phaseKey = PHASE_MS[phaseIdx]?.key ?? 'inhale'
  const scale =
    phaseKey === 'inhale' ? 1.15 : phaseKey === 'hold1' ? 1.15 : phaseKey === 'exhale' ? 0.88 : 0.88

  return (
    <Card title={t('jwan.breathe')}>
      <p className="mb-2 text-sm text-jwan-gray">{t('jwan.breatheIntro')}</p>
      <p className="mb-6 text-sm leading-relaxed text-jwan-ink">{t('jwan.breatheScience')}</p>

      <div className="flex flex-col items-center gap-6">
        <div
          className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 shadow-inner transition-transform duration-[4000ms] ease-in-out"
          style={{ transform: running ? `scale(${scale})` : 'scale(1)' }}
        >
          <div className="text-center">
            <p className="text-3xl font-bold tabular-nums text-jwan-ink">{running ? remainingSec : '—'}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-teal-800">
              {running ? t(`jwan.breathePhase.${phaseKey}`) : t('jwan.breatheReady')}
            </p>
            {running ? (
              <p className="mt-2 text-[10px] text-jwan-gray">
                {t('jwan.breatheCycle', { current: cycleIdx + 1, total: CYCLES })}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {!running ? (
            <button
              type="button"
              onClick={start}
              className="rounded-xl bg-jwan-teal px-8 py-3 font-semibold text-white shadow"
            >
              {t('jwan.breatheStart')}
            </button>
          ) : (
            <button
              type="button"
              onClick={stop}
              className="rounded-xl border border-slate-300 px-8 py-3 font-semibold text-jwan-ink"
            >
              {t('jwan.breatheStop')}
            </button>
          )}
        </div>

        {finished ? (
          <p className="max-w-md text-center text-sm font-medium text-teal-800">{t('jwan.breatheDone')}</p>
        ) : null}
      </div>
    </Card>
  )
}
