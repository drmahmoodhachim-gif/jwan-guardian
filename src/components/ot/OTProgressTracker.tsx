import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { OT_MILESTONES, OT_PROGRESS_DATA, OT_REASSESSMENT_2024 } from '../../data/otAssessments'
import { Card } from '../ui/Card'

const MILESTONE_DOT: Record<string, string> = {
  amber: 'bg-amber-400 ring-amber-200',
  blue: 'bg-blue-500 ring-blue-200',
  teal: 'bg-teal-500 ring-teal-200',
  green: 'bg-emerald-500 ring-emerald-200',
}

export function OTProgressTracker() {
  const { t } = useTranslation()

  const beeryRows = OT_REASSESSMENT_2024.beeryComparison.map((c, i) => ({
    name: [t('ot.beeryShort.vmi'), t('ot.beeryShort.vp'), t('ot.beeryShort.mc')][i],
    fullName: c.test,
    y2023: c.ss2023,
    y2025: c.ss2025,
    note: c.note,
  }))

  return (
    <Card title={t('ot.progressTitle')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('ot.progressIntro')}</p>

      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold text-jwan-ink">{t('ot.progressTimelineTitle')}</h3>
        <div className="overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
          <div className="relative min-w-[600px] px-2 py-4 md:min-w-0 md:px-4">
            <div
              className="absolute top-[22px] right-[12%] left-[12%] h-1.5 rounded-full bg-gradient-to-r from-amber-200 via-teal-200 to-emerald-300 md:left-8 md:right-8"
              aria-hidden
            />
            <div className="relative flex justify-between gap-1">
              {OT_MILESTONES.map((m) => (
                <div key={m.date} className="flex max-w-[24%] flex-1 flex-col items-center text-center">
                  <div
                    className={`relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-4 border-white shadow-md ring-2 ${MILESTONE_DOT[m.color] ?? 'bg-slate-400 ring-slate-200'}`}
                    aria-hidden
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                  </div>
                  <p className="mt-3 text-xs font-bold text-jwan-ink">{m.date}</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-tight text-teal-800">{m.label}</p>
                  <p className="mt-1 text-[10px] leading-snug text-jwan-gray">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50/80 to-white p-4">
        <h3 className="mb-1 text-sm font-semibold text-jwan-ink">{t('ot.beeryCompareTitle')}</h3>
        <p className="mb-4 text-xs text-jwan-gray">{t('ot.beeryCompareHint')}</p>
        <div className="h-64 w-full min-w-0 md:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={beeryRows} margin={{ top: 8, right: 8, left: 4, bottom: 8 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[70, 115]} tick={{ fontSize: 11 }} width={32} />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  const row = payload[0].payload as (typeof beeryRows)[0]
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
                      <p className="font-semibold">{row.fullName}</p>
                      <p className="mt-1 text-jwan-gray">{row.note}</p>
                      <p className="mt-2">
                        {t('ot.beery2023')}: {row.y2023}
                      </p>
                      <p>
                        {t('ot.beery2025')}: {row.y2025}
                      </p>
                    </div>
                  )
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="y2023" name={t('ot.beery2023')} fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="y2025" name={t('ot.beery2025')} fill="#0d9488" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full min-w-[560px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/90 text-jwan-gray">
              <th className="py-2.5 pr-3 pl-3 font-semibold">{t('ot.col.date')}</th>
              <th className="py-2.5 pr-3 font-semibold">{t('ot.col.age')}</th>
              <th className="py-2.5 pr-3 font-semibold">{t('ot.col.examiner')}</th>
              <th className="py-2.5 pr-3 font-semibold">{t('ot.col.notes')}</th>
            </tr>
          </thead>
          <tbody>
            {OT_PROGRESS_DATA.map((row, i) => {
              const discharged = 'discharged' in row && row.discharged
              return (
                <tr
                  key={`${row.date}-${i}`}
                  className={[
                    'border-b border-slate-100 align-top transition-colors',
                    discharged ? 'bg-emerald-50/70' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40',
                  ].join(' ')}
                >
                  <td className="py-2.5 pr-3 pl-3 whitespace-nowrap font-medium text-jwan-ink">{row.date}</td>
                  <td className="py-2.5 pr-3 text-jwan-ink">{row.age}</td>
                  <td className="py-2.5 pr-3 text-jwan-gray">{'examiner' in row ? row.examiner : '—'}</td>
                  <td className="py-2.5 pr-3">
                    <span className="inline-flex items-start gap-1.5 text-jwan-ink">
                      {discharged ? (
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
                      ) : null}
                      {row.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-2 rounded-lg bg-emerald-50 px-3 py-3 text-sm font-medium text-emerald-900">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
        {t('ot.dischargeBanner')}
      </p>
    </Card>
  )
}
