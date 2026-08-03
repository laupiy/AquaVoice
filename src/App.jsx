import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MapPage from './pages/Map'
import Monitoring from './pages/Monitoring'
import Mitigation from './pages/Mitigation'
import Reports from './pages/Reports'
import Alerts from './pages/Alerts'
import Chatbot from './pages/Chatbot'
import ProtectedRoute from './routes/ProtectedRoute'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-mist-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-5 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/peta" element={<MapPage />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/mitigasi" element={<Mitigation />} />
            <Route path="/laporan" element={<Reports />} />
            <Route path="/peringatan" element={<Alerts />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
