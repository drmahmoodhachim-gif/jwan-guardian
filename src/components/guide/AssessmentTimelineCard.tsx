import { useTranslation } from 'react-i18next'
import type { ClinicalAssessment } from '../../data/assessments'
import { CLINICAL_ASSESSMENTS } from '../../data/assessments'
import { Card } from '../ui/Card'

function ExtraDetail({ a }: { a: ClinicalAssessment }) {
  const { t } = useTranslation()
  return (
    <>
      {a.sourceFile ? (
        <p className="mt-2 text-xs text-jwan-gray">
          <span className="font-medium text-jwan-ink">{t('guide.sourceFile')}: </span>
          {a.sourceFile}
        </p>
      ) : null}
      {a.clinicalQuotes?.length ? (
        <div className="mt-3 border-l-2 border-violet-200 pl-3">
          <p className="text-xs font-medium text-jwan-ink">{t('guide.clinicianQuotes')}</p>
          {a.clinicalQuotes.map((q, i) => (
            <p key={i} className="mt-1 text-xs italic leading-relaxed text-jwan-gray">
              {q}
            </p>
          ))}
        </div>
      ) : null}
      {a.cftComponents?.length ? (
        <div className="mt-3">
          <p className="text-xs font-medium text-jwan-ink">{t('guide.cftComponents')}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5 text-xs text-jwan-ink">
            {a.cftComponents.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </div>
      ) : null}
      {a.recommendedResources?.books?.length || a.recommendedResources?.films?.length ? (
        <div className="mt-3 text-xs">
          <p className="font-medium text-jwan-ink">{t('guide.recommendedMedia')}</p>
          {a.recommendedResources?.books?.length ? (
            <ul className="mt-1 list-disc pl-5 text-jwan-gray">
              {a.recommendedResources.books.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : null}
          {a.recommendedResources?.films?.length ? (
            <p className="mt-1 text-jwan-gray">
              <span className="font-medium text-jwan-ink">{t('guide.films')}: </span>
              {a.recommendedResources.films.join('; ')}
            </p>
          ) : null}
        </div>
      ) : null}
      {a.recommendations?.length ? (
        <div className="mt-3">
          <p className="text-xs font-medium text-jwan-ink">{t('guide.recommendationsList')}</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-jwan-ink">
            {a.recommendations.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}

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
            {a.address ? (
              <p className="mt-1 text-xs text-jwan-gray">{a.address}</p>
            ) : null}
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
              <ExtraDetail a={a} />
            </details>
          </li>
        ))}
      </ul>
    </Card>
  )
}
