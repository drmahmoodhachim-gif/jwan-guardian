import { useTranslation } from 'react-i18next'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { OT_REASSESSMENT_2024 } from '../../data/otAssessments'

const MOVEMENT_ROWS = [
  {
    key: 'manualDexterity' as const,
    labelKey: 'ot.movabc.manual',
  },
  {
    key: 'aimingCatching' as const,
    labelKey: 'ot.movabc.aim',
  },
  {
    key: 'balance' as const,
    labelKey: 'ot.movabc.balance',
  },
]

function zoneColor(zone: string): string {
  if (zone === 'Red') return '#f87171'
  if (zone === 'Below Average') return '#fbbf24'
  return '#94a3b8'
}

export function OTReassessmentViz() {
  const { t } = useTranslation()
  const m = OT_REASSESSMENT_2024.movementABC3

  const chartData = MOVEMENT_ROWS.map(({ key, labelKey }) => {
    const row = m[key]
    return {
      name: t(labelKey),
      ss: row.ss,
      pct: row.pct,
      zone: row.zone,
      fill: zoneColor(row.zone),
    }
  })

  return (
    <div className="mt-4 space-y-3">
      <p className="text-xs font-medium text-jwan-gray">{t('ot.movementAbcTitle')}</p>
      <p className="text-xs text-jwan-gray">
        {t('ot.movementAbcTotal')}: SS {m.total.ss} · {m.total.pct}th pct · {m.total.label}
      </p>
      <div className="h-52 w-full min-w-0 md:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 28, left: 4, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal className="stroke-slate-200" />
            <XAxis type="number" domain={[0, 20]} tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={128}
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }}
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null
                const p = payload[0].payload as (typeof chartData)[0]
                return (
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow">
                    <p className="font-semibold">{p.name}</p>
                    <p>
                      {t('ot.standardScore')}: {p.ss}
                    </p>
                    <p>
                      {t('ot.percentile')}: {p.pct}
                    </p>
                    <p className="text-jwan-gray">{p.zone}</p>
                  </div>
                )
              }}
            />
            <Bar dataKey="ss" radius={[0, 6, 6, 0]} barSize={22}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
              <LabelList dataKey="ss" position="right" className="fill-jwan-ink text-[11px] font-medium" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-jwan-gray">{t('ot.movementAbcHint')}</p>
    </div>
  )
}
