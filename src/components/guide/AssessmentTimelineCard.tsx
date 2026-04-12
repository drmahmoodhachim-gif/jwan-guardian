import { useTranslation } from 'react-i18next'
import { CLINICAL_ASSESSMENTS } from '../../data/assessments'
import { Card } from '../ui/Card'

export function AssessmentTimelineCard() {
  const { t, i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')

  return (
    <Card title={t('guide.assessmentsTitle')}>
      <p className="mb-4 text-sm text-jwan-gray">{t('guide.assessmentsIntro')}</p>
      <ul className="flex flex-col gap-4">
        {[...CLINICAL_ASSESSMENTS].reverse().map((a) => (
          <li
            key={a.id}
            className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-jwan-ink">{a.institution}</span>
              <span className="text-xs text-jwan-gray">
                {a.reportDate} · {ar ? a.ageAtAssessment : a.ageCompact}
              </span>
            </div>
            <p className="mt-1 text-jwan-ink">{a.diagnosis}</p>
            {a.noteOnSchoolYear ? (
              <p className="mt-2 rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-950">
                <strong>{t('guide.schoolYearNote')}:</strong> {a.noteOnSchoolYear}
              </p>
            ) : null}
            {a.therapeuticApproach ? (
              <p className="mt-2 text-xs text-jwan-gray">
                {t('guide.approach')}: {a.therapeuticApproach}
              </p>
            ) : null}
            <details className="mt-2">
              <summary className="cursor-pointer text-xs font-medium text-jwan-teal">
                {t('guide.assessmentDetails')}
              </summary>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-jwan-ink">
                {a.keyFindings.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              {a.keyStrengthsNoted?.length ? (
                <div className="mt-2">
                  <p className="text-xs font-medium text-jwan-ink">{t('guide.strengthsNoted')}</p>
                  <ul className="mt-1 list-disc pl-5 text-xs text-jwan-ink">
                    {a.keyStrengthsNoted.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </details>
          </li>
        ))}
      </ul>
    </Card>
  )
}
