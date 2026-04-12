import { useTranslation } from 'react-i18next'
import { AlertTriangle, ArrowDown, ArrowRight, Check, Sparkles } from 'lucide-react'
import { OT_INITIAL_2023, OT_REASSESSMENT_2024 } from '../../data/otAssessments'
import { Card } from '../ui/Card'

export function PrimitiveReflexStatus() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')

  const pending = OT_INITIAL_2023.primitiveReflexes.filter((r) => r.status === 'not_assessed')
  const retained = OT_INITIAL_2023.primitiveReflexes.filter((r) => r.status === 'retained')
  const integrated = OT_INITIAL_2023.primitiveReflexes.filter((r) => r.status === 'integrated')
  const retained2023Count = OT_REASSESSMENT_2024.primitiveReflexes.retained2023.length
  const retained2024Count = OT_REASSESSMENT_2024.primitiveReflexes.retained2024.length

  return (
    <Card title={t('ot.reflexTitle')}>
      <div className="mb-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-rose-50/40 via-white to-teal-50/50 p-4">
        <p className="mb-3 text-center text-xs font-semibold text-jwan-ink">{t('ot.reflexJourneyTitle')}</p>
        <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3">
          <div className="flex-1 rounded-xl border border-rose-200/80 bg-white/90 px-4 py-3 text-center shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-rose-700">May 2023</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-rose-800">{retained2023Count}</p>
            <p className="text-xs text-rose-900/90">{t('ot.reflexJourneyRetained')}</p>
            <p className="mt-1 text-[10px] text-rose-800/80">{t('ot.reflexJourneyRetainedNote')}</p>
          </div>
          <div className="flex justify-center py-1 md:py-0" aria-hidden>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow ring-1 ring-slate-200 md:h-10 md:w-10">
              <ArrowRight className="hidden h-5 w-5 text-teal-600 md:block" />
              <ArrowDown className="block h-5 w-5 text-teal-600 md:hidden" />
            </div>
          </div>
          <div className="flex-1 rounded-xl border border-teal-200/80 bg-white/90 px-4 py-3 text-center shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-700">Nov 2024</p>
            <div className="mt-1 flex items-center justify-center gap-1.5">
              <span className="text-2xl font-bold tabular-nums text-teal-800">{retained2024Count}</span>
              <Sparkles className="h-5 w-5 text-teal-500" aria-hidden />
            </div>
            <p className="text-xs text-teal-900/90">{t('ot.reflexJourneyIntegrated')}</p>
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-jwan-gray">
          {t('ot.reflexJourneyFootnote', { before: retained2023Count, after: retained2024Count })}
        </p>
      </div>

      <p className="mb-4 text-sm text-jwan-gray">{t('ot.reflexIntro')}</p>
      <p className="mb-4 rounded-lg bg-teal-50 px-3 py-2 text-sm text-teal-900">
        {t('ot.reflexUpdate2024')}{' '}
        <span className="font-medium">{OT_REASSESSMENT_2024.primitiveReflexes.clinicalSignificance}</span>
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-800">
            <AlertTriangle className="h-4 w-4" aria-hidden />
            {t('ot.reflexRetainedMay2023')}
          </h3>
          <ul className="flex flex-col gap-2">
            {retained.map((r) => (
              <li
                key={r.reflex}
                className="rounded-lg border border-rose-200 bg-rose-50/80 px-3 py-2 text-sm text-rose-950"
              >
                <p className="font-medium">{r.reflex}</p>
                <p className="text-xs text-rose-800">
                  {t('ot.expectedBy')}: {r.expectedIntegration}
                </p>
                {'impactEn' in r && r.impactEn ? (
                  <p className="mt-1 text-xs">{ar ? r.impactAr : r.impactEn}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-800">
            <Check className="h-4 w-4" aria-hidden />
            {t('ot.reflexIntegratedMay2023')}
          </h3>
          <ul className="flex flex-col gap-2">
            {integrated.map((r) => (
              <li
                key={r.reflex}
                className="rounded-lg border border-teal-200 bg-teal-50/80 px-3 py-2 text-sm text-teal-950"
              >
                <p className="font-medium">{r.reflex}</p>
                <p className="text-xs text-teal-800">
                  {t('ot.expectedBy')}: {r.expectedIntegration}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {pending.length ? (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-jwan-gray">{t('ot.reflexPending')}</h3>
          <ul className="flex flex-col gap-2">
            {pending.map((r) => (
              <li key={r.reflex} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                {r.reflex} — {t('ot.notAssessedYet')}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-4 text-sm italic text-jwan-gray">{t('ot.reflexHypothesis')}</p>
    </Card>
  )
}
