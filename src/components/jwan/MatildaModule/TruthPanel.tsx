import { TRUTH_TEXT } from '../../../data/matildaSteps'

export function TruthPanel({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4">
      <p className="text-xs font-semibold uppercase text-amber-900">Transparency and safety</p>
      <p className="mt-2 whitespace-pre-line text-sm text-amber-900">{TRUTH_TEXT}</p>
    </div>
  )
}

