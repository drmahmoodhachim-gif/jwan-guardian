import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  NEUROPEDIA_DOB_NOTE,
  OT_DISCHARGE_2025,
  OT_INITIAL_2023,
  OT_ITP_2024,
  OT_KEY_CLINICAL_FACT,
  OT_REASSESSMENT_2024,
} from '../data/otAssessments'
import { SUPPORT_TEAM_FULL } from '../lib/constants'
import { OTMotorProfile } from '../components/ot/OTMotorProfile'
import { OTProgressTracker } from '../components/ot/OTProgressTracker'
import { PrimitiveReflexStatus } from '../components/ot/PrimitiveReflexStatus'
import { OTReassessmentViz } from '../components/ot/OTReassessmentViz'
import { Card } from '../components/ui/Card'

export function OTReports() {
  const { t } = useTranslation()
  const team = SUPPORT_TEAM_FULL.ot

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-jwan-ink">{t('ot.pageTitle')}</h1>
        <p className="mt-1 max-w-3xl text-sm text-jwan-gray">{t('ot.pageIntro')}</p>
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-950">{NEUROPEDIA_DOB_NOTE}</p>
      </div>

      <Card title={t('ot.teamTitle')}>
        <ul className="list-inside list-disc space-y-2 text-sm text-jwan-ink">
          <li>
            <strong>{team.initial.name}</strong> — {team.initial.role} ({t('ot.initialTherapist')})
          </li>
          <li>
            <strong>{team.ongoing.name}</strong> — {team.ongoing.role} (DHA {team.ongoing.dha}) ·{' '}
            {team.ongoing.email}
          </li>
          <li>
            {SUPPORT_TEAM_FULL.neuropedia.address} · {t('ot.npNumber')}: {team.npNumber}
          </li>
          <li>
            {t('ot.referring')}: {SUPPORT_TEAM_FULL.neurologistReferring.name} —{' '}
            {SUPPORT_TEAM_FULL.neurologistReferring.role}
          </li>
        </ul>
      </Card>

      <Card title={t('ot.keyFactTitle')}>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-jwan-ink">
          <li>{OT_KEY_CLINICAL_FACT.visualPerception}</li>
          <li>{OT_KEY_CLINICAL_FACT.eyeHandBeery}</li>
          <li>{OT_KEY_CLINICAL_FACT.manualDexterity}</li>
          <li>{OT_KEY_CLINICAL_FACT.meaning}</li>
        </ul>
      </Card>

      <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-4 text-sm text-teal-950">
        <p className="font-semibold">{t('ot.dischargeHighlight')}</p>
        <p className="mt-2">{OT_DISCHARGE_2025.dischargeSummary}</p>
        <Link to="/brain?tab=motor" className="mt-3 inline-block font-medium text-jwan-teal underline">
          {t('ot.linkBrainMotor')}
        </Link>
      </div>

      <OTMotorProfile />
      <PrimitiveReflexStatus />

      <Card title={t('ot.initialHypothesis')}>
        <p className="text-sm leading-relaxed text-jwan-ink">{OT_INITIAL_2023.hypothesis}</p>
      </Card>

      <Card title={t('ot.reassessment2024Title')}>
        <p className="mb-2 text-sm text-jwan-ink">{OT_REASSESSMENT_2024.primitiveReflexes.clinicalSignificance}</p>
        <p className="text-sm text-jwan-gray">{OT_REASSESSMENT_2024.movementABC3.clinicalNote}</p>
        <OTReassessmentViz />
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-jwan-ink">
          {OT_REASSESSMENT_2024.keyFindings.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </Card>

      <Card title={t('ot.itpTitle')}>
        <p className="text-sm text-jwan-gray">
          {OT_ITP_2024.date} → {OT_ITP_2024.reviewDate} · {OT_ITP_2024.examiner}
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-jwan-ink">
          {OT_ITP_2024.longTermGoals.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </Card>

      <Card title={t('ot.dischargeDetailTitle')}>
        <ul className="flex flex-col gap-2 text-sm">
          {OT_DISCHARGE_2025.goalOutcomes.map((g, i) => (
            <li key={i} className="rounded-lg border border-slate-100 bg-white px-3 py-2">
              <span className="font-medium text-emerald-800">{g.outcome}</span> — {g.goal}: {g.detail}
            </li>
          ))}
        </ul>
      </Card>

      <OTProgressTracker />
    </div>
  )
}
