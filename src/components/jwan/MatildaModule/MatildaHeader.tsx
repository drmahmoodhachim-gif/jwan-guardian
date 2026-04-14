import { MATILDA_PROMPTS, callMatilda } from '../../../lib/bookUniverseApi'

export function MatildaHeader({
  onTruthToggle,
  comfortLevel,
}: {
  onTruthToggle: () => void
  comfortLevel: number
}) {
  async function sayHello() {
    try {
      await callMatilda(MATILDA_PROMPTS.intro)
    } catch {
      // no-op
    }
  }

  return (
    <div className="rounded-2xl border border-teal-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => void sayHello()}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-xl text-white shadow"
          aria-label="Matilda portrait"
        >
          M
        </button>
        <div className="flex-1">
          <p className="text-base font-semibold text-jwan-ink">Matilda Wormwood</p>
          <p className="text-xs text-jwan-gray">From the book Matilda by Roald Dahl, 1988.</p>
        </div>
        <div className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-900">Comfort {comfortLevel}/5</div>
      </div>
      <button
        type="button"
        onClick={onTruthToggle}
        className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-900"
      >
        What is Matilda really?
      </button>
    </div>
  )
}

