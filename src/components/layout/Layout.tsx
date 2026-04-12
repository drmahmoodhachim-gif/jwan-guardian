import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Navigation } from './Navigation'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <Navigation />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 md:px-6">
        <Outlet />
      </main>
    </div>
  )
}
