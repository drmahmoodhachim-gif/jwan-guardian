import { useMemo, useState } from 'react'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import type { Role } from '../types'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

const ROLES: Role[] = ['dad', 'mom', 'teacher', 'therapist', 'doctor', 'jwan', 'admin']

function parseRole(raw: string | null): Role | undefined {
  if (!raw) return undefined
  return ROLES.includes(raw as Role) ? (raw as Role) : undefined
}

export function Onboarding() {
  const { t } = useTranslation()
  const { user, profile, loading, refreshProfile } = useAuth()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const defaultRole = (location.state as { defaultRole?: Role } | null)?.defaultRole
  const roleFromUrl = useMemo(() => parseRole(searchParams.get('role')), [searchParams])
  const initialRole = defaultRole ?? roleFromUrl ?? 'dad'

  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<Role>(initialRole)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  if (loading) {
    return <LoadingSpinner label={t('common.loading')} />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (profile) {
    return <Navigate to="/" replace />
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setError(null)
    setPending(true)
    const { error: err } = await supabase.from('profiles').insert({
      id: user.id,
      full_name: fullName.trim(),
      role,
      preferred_lang: document.documentElement.lang === 'ar' ? 'ar' : 'en',
    })
    setPending(false)
    if (err) {
      setError(err.message)
      return
    }
    await refreshProfile()
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-jwan-surface px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-2xl font-semibold text-jwan-ink">{t('onboarding.title')}</h1>
        <p className="mb-6 text-sm text-jwan-gray">{t('onboarding.subtitle')}</p>

        <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-start text-sm font-medium text-jwan-ink">
            {t('onboarding.fullName')}
            <input
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-base outline-none ring-jwan-teal focus:ring-2"
            />
          </label>

          <label className="flex flex-col gap-1 text-start text-sm font-medium text-jwan-ink">
            {t('onboarding.role')}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-base outline-none ring-jwan-teal focus:ring-2"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {t(`role.${r}`)}
                </option>
              ))}
            </select>
          </label>

          {error ? (
            <p className="rounded-lg bg-jwan-coral-muted px-3 py-2 text-sm text-red-800" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-xl bg-jwan-teal py-3 font-semibold text-white shadow hover:bg-teal-700 disabled:opacity-60"
          >
            {pending ? t('common.loading') : t('onboarding.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}
