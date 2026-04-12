import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { useProfileNames } from '../hooks/useProfiles'
import { useReminders } from '../hooks/useReminders'
import { useReports } from '../hooks/useReports'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Card } from '../components/ui/Card'
import { DomainMatrix } from '../components/dashboard/DomainMatrix'
import { ActivityFeed } from '../components/dashboard/ActivityFeed'
import { PriorityCards } from '../components/dashboard/PriorityCards'

export function DashboardHome() {
  const { t } = useTranslation()
  const { profile } = useAuth()
  const names = useProfileNames()
  const { reminders, loading: remindersLoading } = useReminders()
  const { reports, loading, error, domainAverages } = useReports()

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-jwan-ink">{t('nav.dashboard')}</h1>
        <p className="mt-1 text-sm text-jwan-gray">
          {profile?.full_name ? (
            <>
              {t('dashboard.signedInAs', {
                name: profile.full_name,
                role: t(`role.${profile.role}`),
              })}
            </>
          ) : null}
        </p>
      </div>

      {loading ? <LoadingSpinner label={t('common.loading')} /> : null}
      {error ? (
        <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>
      ) : null}

      <Card title={t('dashboard.matrix')}>
        <DomainMatrix averages={domainAverages} />
        <p className="mt-4 text-center text-xs text-jwan-gray">{t('matrix.hint')}</p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityFeed reports={reports} names={names} />
        <PriorityCards reminders={reminders} loading={remindersLoading} />
      </div>

      <div className="text-center">
        <Link
          to="/reports"
          className="inline-flex items-center justify-center rounded-xl bg-jwan-teal px-6 py-3 font-semibold text-white shadow hover:bg-teal-700"
        >
          {t('reports.add')}
        </Link>
      </div>
    </div>
  )
}
