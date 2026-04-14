import { BRAVERY_STEPS } from '../../../data/matildaSteps'

export function BraverySteps({
  completedSteps,
  onStepAction,
}: {
  completedSteps: string[]
  onStepAction: (action: string, stepId: string) => void
}) {
  return (
    <div className="space-y-3">
      {BRAVERY_STEPS.map((s, i) => {
        const done = completedSteps.includes(s.id)
        const prevDone = i === 0 || completedSteps.includes(BRAVERY_STEPS[i - 1]!.id)
        const locked = !done && !prevDone
        return (
          <button
            key={s.id}
            type="button"
            disabled={locked}
            onClick={() => onStepAction(s.action, s.id)}
            className={`w-full rounded-xl border p-3 text-left ${
              done
                ? 'border-teal-300 bg-teal-50'
                : locked
                  ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-60'
                  : 'border-teal-300 bg-white'
            }`}
          >
            <p className="text-sm font-semibold text-jwan-ink">{s.title}</p>
            <p className="mt-1 text-xs text-jwan-gray">{s.description}</p>
            {done ? <p className="mt-1 text-xs font-semibold text-teal-800">Badge: {s.badge}</p> : null}
          </button>
        )
      })}
    </div>
  )
}

