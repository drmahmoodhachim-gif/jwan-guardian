import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { supabase } from '../lib/supabase'
import type { Role } from '../types'

const ROLES: Role[] = ['dad', 'mom', 'teacher', 'therapist', 'doctor', 'jwan', 'admin']

function parseRole(raw: string | null): Role | undefined {
  if (!raw) return undefined
  return ROLES.includes(raw as Role) ? (raw as Role) : undefined
}

export function Register() {
  const { t } = useTranslation()
  const { user, profile, loading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const inviteRole = useMemo(() => parseRole(searchParams.get('role')), [searchParams])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    if (password !== confirm) {
      setError(t('auth.passwordMismatch'))
      return
    }
    setPending(true)
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    })
    setPending(false)
    if (err) {
      setError(err.message)
      return
    }
    if (data.session) {
      navigate('/onboarding', { replace: true, state: { defaultRole: inviteRole } })
      return
    }
    setInfo('Check your email to confirm your account, then sign in.')
  }

  if (loading) {
    return <LoadingSpinner label={t('common.loading')} />
  }
  if (user && profile) {
    return <Navigate to="/" replace />
  }
  if (user && !profile) {
    return <Navigate to="/onboarding" replace />
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-jwan-surface px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-center text-2xl font-semibold text-jwan-ink">{t('auth.register')}</h1>
        <p className="mb-6 text-center text-sm text-jwan-gray">{t('app.title')}</p>

        {inviteRole ? (
          <p className="mb-4 rounded-lg bg-jwan-teal-muted px-3 py-2 text-center text-sm text-teal-900">
            {t('auth.inviteRole')}: {t(`role.${inviteRole}`)}
          </p>
        ) : null}

        <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-start text-sm font-medium text-jwan-ink">
            {t('auth.email')}
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-base outline-none ring-jwan-teal focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-start text-sm font-medium text-jwan-ink">
            {t('auth.password')}
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-base outline-none ring-jwan-teal focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-start text-sm font-medium text-jwan-ink">
            {t('auth.confirmPassword')}
            <input
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-base outline-none ring-jwan-teal focus:ring-2"
            />
          </label>
          {error ? (
            <p className="rounded-lg bg-jwan-coral-muted px-3 py-2 text-sm text-red-800" role="alert">
              {error}
            </p>
          ) : null}
          {info ? (
            <p className="rounded-lg bg-teal-50 px-3 py-2 text-sm text-teal-900" role="status">
              {info}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-xl bg-jwan-teal py-3 font-semibold text-white shadow hover:bg-teal-700 disabled:opacity-60"
          >
            {pending ? t('common.loading') : t('auth.register')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-jwan-gray">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="font-semibold text-jwan-teal hover:underline">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
