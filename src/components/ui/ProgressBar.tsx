export function ProgressBar({
  value,
  max = 5,
  className = '',
  barClassName = '',
}: {
  value: number
  max?: number
  className?: string
  barClassName?: string
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all ${barClassName}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
