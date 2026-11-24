import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage } from '../api/axiosClient'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

function validate(f) {
  const e = {}
  if (!f.fullName.trim()) e.fullName = 'Vui lòng nhập họ tên.'
  if (!f.email.trim()) e.email = 'Vui lòng nhập email.'
  else if (!EMAIL_RE.test(f.email)) e.email = 'Email không hợp lệ.'
  if (!f.password) e.password = 'Vui lòng nhập mật khẩu.'
  else if (!PASSWORD_RE.test(f.password)) e.password = 'Mật khẩu tối thiểu 8 ký tự, gồm cả chữ và số.'
  if (f.confirm !== f.password) e.confirm = 'Mật khẩu xác nhận không khớp.'
  return e
}

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setServerError('')
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return

    setLoading(true)
    try {
      await register({ fullName: form.fullName, email: form.email, password: form.password })
      navigate('/login', { state: { message: 'Đăng ký thành công! Hãy đăng nhập.' } })
    } catch (err) {
      setServerError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container page narrow">
      <h1 className="page-title">Đăng ký tài khoản</h1>
      <form className="form" onSubmit={submit} noValidate>
        <label>Họ và tên
          <input className="input" value={form.fullName} onChange={set('fullName')} />
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </label>
        <label>Email
          <input className="input" type="email" value={form.email} onChange={set('email')} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>
        <label>Mật khẩu
          <input className="input" type="password" value={form.password} onChange={set('password')} />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </label>
        <label>Xác nhận mật khẩu
          <input className="input" type="password" value={form.confirm} onChange={set('confirm')} />
          {errors.confirm && <span className="field-error">{errors.confirm}</span>}
        </label>
        {serverError && <p className="error">{serverError}</p>}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
        <small className="muted">Đã có tài khoản? <Link className="link" to="/login">Đăng nhập</Link></small>
      </form>
    </div>
  )
}
