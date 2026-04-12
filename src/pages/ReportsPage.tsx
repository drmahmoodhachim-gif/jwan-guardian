import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { useProfileNames } from '../hooks/useProfiles'
import { useReports } from '../hooks/useReports'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Card } from '../components/ui/Card'
import { ReportForm } from '../components/reports/ReportForm'
import { ReportList } from '../components/reports/ReportList'
import { ProgressCharts } from '../components/reports/ProgressCharts'

export function ReportsPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const names = useProfileNames()
  const { reports, loading, error, addReport, updateReport, removeReport } = useReports()

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-jwan-ink">{t('nav.reports')}</h1>
        <p className="mt-1 text-sm text-jwan-gray">{t('reports.subtitle')}</p>
      </div>

      <Card title={t('reports.add')}>
        <ReportForm addReport={addReport} updateReport={updateReport} />
      </Card>

      {loading ? <LoadingSpinner label={t('common.loading')} /> : null}
      {error ? (
        <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {error}
        </p>
      ) : null}

      <ReportList
        reports={reports}
        names={names}
        currentUserId={user.id}
        addReport={addReport}
        updateReport={updateReport}
        removeReport={removeReport}
      />

      <ProgressCharts reports={reports} />
    </div>
  )
}
