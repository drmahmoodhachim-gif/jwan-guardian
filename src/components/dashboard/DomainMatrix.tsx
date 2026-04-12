import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DOMAINS } from '../../lib/constants'
import { ProgressBar } from '../ui/ProgressBar'

function scoreStyle(avg: number | null): { label: string; bar: string } {
  if (avg == null) return { label: 'bg-slate-200 text-jwan-gray', bar: 'bg-slate-300' }
  if (avg >= 3.5) return { label: 'bg-teal-50 text-teal-900', bar: 'bg-jwan-teal' }
  if (avg >= 2.5) return { label: 'bg-jwan-amber-muted text-amber-900', bar: 'bg-jwan-amber' }
  return { label: 'bg-jwan-coral-muted text-rose-900', bar: 'bg-jwan-coral' }
}

export function DomainMatrix({
  averages,
}: {
  averages: Record<string, number | null>
}) {
  const { i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {DOMAINS.map((d) => {
        const avg = averages[d.id] ?? null
        const display = avg == null ? '—' : avg.toFixed(1)
        const st = scoreStyle(avg)
        const title = ar ? d.ar : d.en
        return (
          <Link
            key={d.id}
            to={`/reports?domain=${d.id}`}
            className={`flex flex-col rounded-xl border border-slate-200/80 p-3 text-start shadow-sm transition hover:ring-2 hover:ring-jwan-teal/30 md:p-4 ${st.label}`}
          >
            <span className="text-sm font-medium leading-tight">{title}</span>
            <span className="mt-2 text-2xl font-semibold tabular-nums">{display}</span>
            <ProgressBar
              value={avg ?? 0}
              className="mt-3"
              barClassName={avg == null ? 'bg-slate-300' : st.bar}
            />
          </Link>
        )
      })}
    </div>
  )
}
