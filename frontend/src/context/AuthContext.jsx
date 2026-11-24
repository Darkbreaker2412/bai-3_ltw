import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { loginApi, registerApi, meApi } from '../api/authApi'
import { TOKEN_KEY, USER_KEY } from '../api/axiosClient'

const AuthContext = createContext(null)

// Đọc user đã lưu trong localStorage (nếu có)
function loadStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw && localStorage.getItem(TOKEN_KEY) ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser)

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  // Đăng nhập: gọi API -> lưu token + user vào localStorage và Context
  const login = async (email, password) => {
    const { data } = await loginApi({ email, password })
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const register = (payload) => registerApi(payload)

  // Khi mở lại trang: xác thực lại token với server
  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return
    meApi()
      .then(({ data }) => {
        localStorage.setItem(USER_KEY, JSON.stringify(data))
        setUser(data)
      })
      .catch(() => {}) // 401 sẽ được interceptor xử lý
  }, [])

  // Interceptor báo token hết hạn
  useEffect(() => {
    window.addEventListener('auth:logout', logout)
    return () => window.removeEventListener('auth:logout', logout)
  }, [logout])

  const value = { user, isAuthenticated: !!user, isAdmin: user?.role === 'Admin', login, register, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth phải dùng bên trong <AuthProvider>')
  return ctx
}
