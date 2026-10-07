import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, getMe } from '../api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('ccl_token')
    const saved = localStorage.getItem('ccl_user')
    if (token && saved) {
      setUser(JSON.parse(saved))
      getMe()
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem('ccl_token')
          localStorage.removeItem('ccl_user')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await apiLogin({ email, password })
    localStorage.setItem('ccl_token', res.data.token)
    localStorage.setItem('ccl_user', JSON.stringify(res.data.user))
    setUser(res.data.user)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('ccl_token')
    localStorage.removeItem('ccl_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
