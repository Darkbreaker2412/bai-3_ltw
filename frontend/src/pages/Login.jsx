import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage } from '../api/axiosClient'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email.trim() || !form.password) return setError('Vui lòng nhập email và mật khẩu.')

    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      const back = location.state?.from
      navigate(back || (user.role === 'Admin' ? '/admin' : '/'), { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container page narrow">
      <h1 className="page-title">Đăng nhập</h1>
      {location.state?.message && <p className="notice">{location.state.message}</p>}
      <form className="form" onSubmit={submit} noValidate>
        <label>Email
          <input className="input" type="email" value={form.email} onChange={set('email')} />
        </label>
        <label>Mật khẩu
          <input className="input" type="password" value={form.password} onChange={set('password')} />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        <small className="muted">Chưa có tài khoản? <Link className="link" to="/register">Đăng ký</Link></small>
        <small className="muted">Admin demo: admin@stayeasy.vn / Admin@123</small>
      </form>
    </div>
  )
}
