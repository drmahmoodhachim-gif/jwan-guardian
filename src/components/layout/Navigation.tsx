import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Brain,
  BookOpen,
  Bell,
  Activity,
  Users,
} from 'lucide-react'

const links = [
  { to: '/', key: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/reports', key: 'nav.reports', icon: FileText },
  { to: '/protocols', key: 'nav.protocols', icon: Users },
  { to: '/ot', key: 'nav.ot', icon: Activity },
  { to: '/jwan', key: 'nav.jwan', icon: Sparkles },
  { to: '/brain', key: 'nav.brain', icon: Brain },
  { to: '/guide', key: 'nav.guide', icon: BookOpen },
  { to: '/reminders', key: 'nav.reminders', icon: Bell },
] as const

export function Navigation() {
  const { t } = useTranslation()

  return (
    <nav
      className="border-t border-slate-200/80 bg-white/95 px-2 py-2 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur md:border-t-0 md:border-b md:shadow-sm"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-1 md:justify-start md:gap-2">
        {links.map(({ to, key, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              [
                'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors md:px-4',
                isActive
                  ? 'bg-jwan-teal text-white shadow-sm'
                  : 'text-jwan-gray hover:bg-slate-100 hover:text-jwan-ink',
              ].join(' ')
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="hidden sm:inline">{t(key)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
