import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const cls = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

  const onLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">🏨 StayEasy</Link>
        <nav className="nav">
          <NavLink to="/" end className={cls}>Trang chủ</NavLink>
          <NavLink to="/hotels" className={cls}>Khách sạn</NavLink>
          <NavLink to="/about-us" className={cls}>Giới thiệu</NavLink>
          <NavLink to="/contact" className={cls}>Liên hệ</NavLink>
          {isAdmin && <NavLink to="/admin" className={cls}>Quản trị</NavLink>}
          {user ? (
            <>
              <span className="nav-user">👤 {user.fullName}</span>
              <button className="btn btn-small" onClick={onLogout}>Đăng xuất</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={cls}>Đăng nhập</NavLink>
              <NavLink to="/register" className={cls}>Đăng ký</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
