import { useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export function Login() {
  const { t } = useTranslation()
  const { user, profile, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  if (loading) {
    return <LoadingSpinner label={t('common.loading')} />
  }
  if (user && profile) {
    return <Navigate to="/" replace />
  }
  if (user && !profile) {
    return <Navigate to="/onboarding" replace />
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setPending(false)
    if (err) {
      setError(err.message)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-jwan-surface px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-center text-2xl font-semibold text-jwan-ink">{t('auth.login')}</h1>
        <p className="mb-6 text-center text-sm text-jwan-gray">{t('app.title')}</p>

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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-base outline-none ring-jwan-teal focus:ring-2"
            />
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
            {pending ? t('common.loading') : t('auth.login')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-jwan-gray">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-semibold text-jwan-teal hover:underline">
            {t('auth.register')}
          </Link>
        </p>
      </div>
    </div>
  )
}
