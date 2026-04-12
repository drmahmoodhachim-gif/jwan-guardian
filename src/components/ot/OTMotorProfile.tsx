import { useTranslation } from 'react-i18next'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { OT_INITIAL_2023 } from '../../data/otAssessments'
import { Card } from '../ui/Card'

const SHORT: Record<string, string> = {
  'Fine Motor Precision': 'FMP',
  'Fine Motor Integration': 'FMI',
  'Manual Dexterity': 'Manual Dex.',
  'Upper Limb Coordination': 'Upper limb',
}

function barColor(scale: number): string {
  if (scale < 8) return '#f87171'
  if (scale <= 11) return '#fbbf24'
  return '#14b8a6'
}

export function OTMotorProfile() {
  const { t } = useTranslation()
  const data = OT_INITIAL_2023.bot2Subtests.map((s) => ({
    subtest: SHORT[s.name] ?? s.name,
    fullName: s.name,
    scaleScore: s.scaleScore,
    ageEquiv: s.ageEquivalent,
    gap: s.gapMonths,
    category: s.category,
  }))

  return (
    <Card title={t('ot.bot2ChartTitle')}>
      <p className="mb-2 text-sm text-jwan-gray">{t('ot.bot2ChartHint')}</p>
      <p className="mb-4 text-xs text-jwan-gray">{t('ot.bot2Annotation')}</p>

      <div className="mb-3 flex flex-wrap gap-4 text-xs">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#f87171]" aria-hidden />
          {t('ot.legendLow')}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#fbbf24]" aria-hidden />
          {t('ot.legendMid')}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-[#14b8a6]" aria-hidden />
          {t('ot.legendOk')}
        </span>
      </div>

      <div className="h-72 w-full min-w-0 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 28, right: 12, left: 4, bottom: 8 }}>
            <defs>
              <linearGradient id="otTypicalBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#0d9488" stopOpacity={0.06} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200" />
            <ReferenceArea y1={7} y2={10} fill="url(#otTypicalBand)" label={{ value: t('ot.typicalBand'), position: 'insideTop', fill: '#0f766e', fontSize: 10 }} />
            <XAxis dataKey="subtest" tick={{ fontSize: 11 }} interval={0} />
            <YAxis domain={[0, 20]} tick={{ fontSize: 11 }} width={36} />
            <ReferenceLine
              y={10}
              stroke="#0d9488"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{ value: t('ot.refAverage'), position: 'right', fill: '#0f766e', fontSize: 10 }}
            />
            <ReferenceLine
              y={7}
              stroke="#94a3b8"
              strokeDasharray="3 3"
              label={{ value: t('ot.refBelow'), position: 'right', fill: '#64748b', fontSize: 10 }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(148, 163, 184, 0.15)' }}
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null
                const p = payload[0].payload as (typeof data)[0]
                return (
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
                    <p className="font-semibold">{p.fullName}</p>
                    <p className="text-jwan-gray">{p.category}</p>
                    <p className="mt-1">
                      {t('ot.tooltipScale')}: {p.scaleScore}
                    </p>
                    <p>
                      {t('ot.tooltipAgeEq')}: {p.ageEquiv}
                    </p>
                    <p>
                      {t('ot.tooltipGap')}: {p.gap} mo
                    </p>
                  </div>
                )
              }}
            />
            <Bar dataKey="scaleScore" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {data.map((entry) => (
                <Cell key={entry.subtest} fill={barColor(entry.scaleScore)} />
              ))}
              <LabelList dataKey="scaleScore" position="top" className="fill-jwan-ink text-[11px] font-semibold" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <h3 className="mb-3 text-sm font-semibold text-jwan-ink">{t('ot.bot2CompositesTitle')}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {OT_INITIAL_2023.bot2Composites.map((c) => (
            <div key={c.name} className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-jwan-ink">{c.name}</span>
                <span className="text-xs text-jwan-gray">
                  SS {c.standardScore} · {c.percentile}th pct
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                  style={{ width: `${Math.min(100, c.percentile)}%` }}
                  title={`${c.percentile}%`}
                />
              </div>
              <p className="mt-1.5 text-xs text-jwan-gray">{c.category}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-jwan-gray">{t('ot.bot2CompositesHint')}</p>
      </div>
    </Card>
  )
}
