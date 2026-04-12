import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Layout } from './components/layout/Layout'
import { LoadingSpinner } from './components/ui/LoadingSpinner'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Onboarding } from './pages/Onboarding'
import { DashboardHome } from './pages/DashboardHome'
import { ReportsPage } from './pages/ReportsPage'
import { JwanPage } from './pages/JwanPage'
import { BrainPage } from './pages/BrainPage'
import { GuidePage } from './pages/GuidePage'
import { RemindersPage } from './pages/RemindersPage'
import { OTReports } from './pages/OTReports'
import { CareTeamProtocols } from './pages/CareTeamProtocols'

function RequireSession({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return <LoadingSpinner />
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}

function RequireProfile({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return <LoadingSpinner />
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (!profile) {
    return <Navigate to="/onboarding" replace />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/onboarding"
        element={
          <RequireSession>
            <Onboarding />
          </RequireSession>
        }
      />
      <Route
        element={
          <RequireProfile>
            <Layout />
          </RequireProfile>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="jwan" element={<JwanPage />} />
        <Route path="brain" element={<BrainPage />} />
        <Route path="guide" element={<GuidePage />} />
        <Route path="reminders" element={<RemindersPage />} />
        <Route path="ot" element={<OTReports />} />
        <Route path="protocols" element={<CareTeamProtocols />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
