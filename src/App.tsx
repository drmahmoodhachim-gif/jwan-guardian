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
import { AIAssessment } from './pages/AIAssessment'
import { WeeklyObjectives } from './pages/WeeklyObjectives'

function HomeRoute() {
  const { profile } = useAuth()
  if (profile?.role === 'jwan') return <Navigate to="/jwan" replace />
  return <DashboardHome />
}

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

function RequireCareTeam({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useAuth()
  if (loading) {
    return <LoadingSpinner />
  }
  if (profile?.role === 'jwan') {
    return <Navigate to="/jwan" replace />
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
        <Route path="j" element={<Navigate to="/jwan" replace />} />
        <Route index element={<HomeRoute />} />
        <Route
          path="reports"
          element={
            <RequireCareTeam>
              <ReportsPage />
            </RequireCareTeam>
          }
        />
        <Route path="jwan" element={<JwanPage />} />
        <Route
          path="brain"
          element={
            <RequireCareTeam>
              <BrainPage />
            </RequireCareTeam>
          }
        />
        <Route
          path="guide"
          element={
            <RequireCareTeam>
              <GuidePage />
            </RequireCareTeam>
          }
        />
        <Route
          path="reminders"
          element={
            <RequireCareTeam>
              <RemindersPage />
            </RequireCareTeam>
          }
        />
        <Route
          path="ot"
          element={
            <RequireCareTeam>
              <OTReports />
            </RequireCareTeam>
          }
        />
        <Route
          path="protocols"
          element={
            <RequireCareTeam>
              <CareTeamProtocols />
            </RequireCareTeam>
          }
        />
        <Route
          path="discovery"
          element={
            <RequireCareTeam>
              <AIAssessment />
            </RequireCareTeam>
          }
        />
        <Route
          path="weekly"
          element={
            <RequireCareTeam>
              <WeeklyObjectives />
            </RequireCareTeam>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
