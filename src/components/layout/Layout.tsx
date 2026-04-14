import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Navigation } from './Navigation'
import { useAuth } from '../../hooks/useAuth'

export function Layout() {
  const { profile } = useAuth()
  const isJwan = profile?.role === 'jwan'

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      {!isJwan ? <Navigation /> : null}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 md:px-6">
        <Outlet />
      </main>
    </div>
  )
}
