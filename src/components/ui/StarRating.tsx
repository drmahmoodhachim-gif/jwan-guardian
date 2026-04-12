import { Star } from 'lucide-react'

export function StarRating({
  value,
  onChange,
  disabled,
  label,
}: {
  value: number | null
  onChange: (n: number | null) => void
  disabled?: boolean
  label?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      {label ? <span className="text-sm font-medium text-jwan-ink">{label}</span> : null}
      <div
        className={`flex items-center gap-0.5 ${disabled ? 'pointer-events-none opacity-90' : ''}`}
        role="group"
        aria-label={label}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={disabled}
            onClick={() => onChange(value === n ? null : n)}
            className="rounded p-0.5 text-jwan-amber hover:bg-amber-50 disabled:opacity-50"
            aria-pressed={value === n}
          >
            <Star
              className={`h-7 w-7 ${value != null && n <= value ? 'fill-jwan-amber text-jwan-amber' : 'text-slate-300'}`}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
