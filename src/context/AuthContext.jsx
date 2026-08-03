import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'aquavoice_auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  })

  // Dummy authentication — no backend yet. Any non-empty email/password
  // is accepted so the flow can be demoed end-to-end.
  const login = useCallback(({ email, remember }) => {
    const sessionUser = { email, name: email.split('@')[0] || 'Pengguna' }
    setUser(sessionUser)
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser))
    }
    return sessionUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
