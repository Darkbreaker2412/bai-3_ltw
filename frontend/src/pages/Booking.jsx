import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getHotel, formatPrice } from '../data/hotels.js'
import { useAuth } from '../context/AuthContext.jsx'
import NotFound from './NotFound.jsx'

export default function Booking() {
  const { hotelId } = useParams()
  const [sp] = useSearchParams()
  const { user } = useAuth()
  const hotel = getHotel(hotelId)
  const [form, setForm] = useState({
    name: user?.fullName || '', phone: '', roomType: sp.get('room') || 'Standard', quantity: 1, checkIn: '', checkOut: '',
  })
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  if (!hotel) return <NotFound />
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const room = hotel.rooms.find((r) => r.type === form.roomType)
  const nights = form.checkIn && form.checkOut
    ? Math.max(0, (new Date(form.checkOut) - new Date(form.checkIn)) / 86400000) : 0
  const total = room ? room.price * form.quantity * nights : 0

  const submit = (e) => {
    e.preventDefault()
    if (!/^0\d{9}$/.test(form.phone)) return setError('Số điện thoại phải gồm 10 chữ số, bắt đầu bằng 0.')
    if (nights <= 0) return setError('Ngày đi phải sau ngày đến.')
    setError('')
    setDone(true)
  }

  if (done) {
    return (
      <div className="container page narrow">
        <div className="success">
          <h2>🎉 Đặt phòng thành công!</h2>
          <p>Cảm ơn <strong>{form.name}</strong>. Khách sạn <strong>{hotel.name}</strong> sẽ liên hệ qua SĐT {form.phone}.</p>
          <p>{form.quantity} phòng {form.roomType} · {nights} đêm · Tổng: <strong>{formatPrice(total)}</strong></p>
          <Link to="/" className="btn btn-primary">Về trang chủ</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container page narrow">
      <h1 className="page-title">Đặt phòng nhanh</h1>
      <p className="muted">{hotel.name} – {hotel.city}</p>
      <form className="form" onSubmit={submit}>
        <label>Họ và tên<input className="input" required value={form.name} onChange={set('name')} /></label>
        <label>Số điện thoại<input className="input" required value={form.phone} onChange={set('phone')} placeholder="0901234567" /></label>
        <label>Loại phòng
          <select className="input" value={form.roomType} onChange={set('roomType')}>
            {hotel.rooms.map((r) => <option key={r.id} value={r.type}>{r.type} – {formatPrice(r.price)}/đêm</option>)}
          </select>
        </label>
        <label>Số lượng phòng<input className="input" type="number" min="1" max="10" value={form.quantity} onChange={set('quantity')} /></label>
        <div className="row">
          <label>Ngày đến<input className="input" type="date" required value={form.checkIn} onChange={set('checkIn')} /></label>
          <label>Ngày đi<input className="input" type="date" required value={form.checkOut} onChange={set('checkOut')} /></label>
        </div>
        <p className="total">Tạm tính: <strong>{formatPrice(total)}</strong> ({nights} đêm)</p>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-accent" type="submit">Xác nhận đặt phòng</button>
      </form>
    </div>
  )
}
