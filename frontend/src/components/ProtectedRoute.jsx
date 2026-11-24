import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Chặn trang nếu chưa đăng nhập (hoặc không đủ quyền admin)
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />
  return children
}
