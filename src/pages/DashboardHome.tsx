import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'

export function DashboardHome() {
  const { t } = useTranslation()
  const { profile } = useAuth()

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-jwan-ink">{t('nav.dashboard')}</h2>
        <p className="mt-2 text-jwan-gray">
          {profile?.full_name ? (
            <>
              Signed in as <span className="font-medium text-jwan-ink">{profile.full_name}</span> (
              {t(`role.${profile.role}`)}).
            </>
          ) : null}
        </p>
        <p className="mt-4 rounded-xl bg-jwan-teal-muted px-4 py-3 text-sm text-teal-900">
          {t('phase.placeholder')} — Phase 2 adds the domain matrix, activity feed, and priorities.
        </p>
      </div>
    </div>
  )
}
