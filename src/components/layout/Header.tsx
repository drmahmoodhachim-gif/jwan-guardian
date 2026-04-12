import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LogOut, Globe } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useAge } from '../../hooks/useAge'
import { useLanguage } from '../../hooks/useLanguage'

export function Header() {
  const { t } = useTranslation()
  const { profile, signOut } = useAuth()
  const age = useAge()
  const { toggleLanguage, language } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const initials =
    profile?.full_name
      ?.split(/\s+/)
      .map((s) => s[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '?'

  const subtitleAge = t('app.subtitle', { age: age.compact })

  return (
    <header className="border-b border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full bg-gradient-to-br from-jwan-teal to-teal-700 text-white shadow-inner"
            title={age.compact}
          >
            <span className="text-xl font-semibold leading-none">{age.years}</span>
            <span className="text-[10px] font-medium uppercase opacity-90">{t('age.yearsShort')}</span>
          </div>
          <div className="min-w-0 text-start">
            <h1 className="truncate text-lg font-semibold text-jwan-ink md:text-xl">{t('app.title')}</h1>
            <p className="truncate text-xs text-jwan-gray md:text-sm">{subtitleAge}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void toggleLanguage(profile?.id)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-jwan-ink shadow-sm hover:bg-slate-50"
          >
            <Globe className="h-4 w-4 text-jwan-teal" aria-hidden />
            {language === 'en' ? 'عربي' : 'English'}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-jwan-teal-muted text-sm font-bold text-jwan-teal ring-2 ring-white hover:bg-teal-100"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              {initials}
            </button>
            {menuOpen ? (
              <div
                role="menu"
                className="absolute end-0 z-50 mt-2 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm text-jwan-ink hover:bg-slate-50"
                  onClick={() => {
                    setMenuOpen(false)
                    void signOut()
                  }}
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  {t('auth.logout')}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
