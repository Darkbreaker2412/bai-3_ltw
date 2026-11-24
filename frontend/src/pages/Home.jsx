import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CITIES, ROOM_TYPES, hotels } from '../data/hotels.js'
import HotelCard from '../components/HotelCard.jsx'

export default function Home() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ city: '', roomType: '', checkIn: '', checkOut: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(form).forEach(([k, v]) => v && params.set(k, v))
    navigate(`/hotels?${params.toString()}`)
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Tìm khách sạn hoàn hảo cho chuyến đi của bạn</h1>
          <p>Hàng trăm khách sạn, giá tốt nhất, đặt phòng chỉ trong 1 phút.</p>
          <form className="search-box" onSubmit={onSearch}>
            <label>Thành phố
              <select value={form.city} onChange={set('city')}>
                <option value="">Tất cả</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>Loại phòng
              <select value={form.roomType} onChange={set('roomType')}>
                <option value="">Tất cả</option>
                {ROOM_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label>Ngày đến
              <input type="date" value={form.checkIn} onChange={set('checkIn')} />
            </label>
            <label>Ngày đi
              <input type="date" value={form.checkOut} onChange={set('checkOut')} />
            </label>
            <button className="btn btn-accent" type="submit">🔍 Tìm kiếm</button>
          </form>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Điểm đến phổ biến</h2>
        <div className="city-grid">
          {CITIES.map((c, i) => (
            <Link key={c} to={`/hotels?city=${encodeURIComponent(c)}`} className="city-card"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.35)), url(https://picsum.photos/seed/city${i}/400/300)` }}>
              <span>{c}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2 className="section-title">Khách sạn nổi bật</h2>
          <Link to="/hotels" className="link">Xem tất cả →</Link>
        </div>
        <div className="grid">
          {[...hotels].sort((a, b) => b.rating - a.rating).slice(0, 3).map((h) => <HotelCard key={h.id} hotel={h} />)}
        </div>
      </section>

      <section className="section features">
        <div className="container feature-grid">
          <div className="feature"><div className="icon">⚡</div><h3>Đặt phòng nhanh</h3><p>Chỉ cần họ tên, số điện thoại và ngày ở.</p></div>
          <div className="feature"><div className="icon">💰</div><h3>Giá tốt nhất</h3><p>Cam kết giá cạnh tranh, minh bạch.</p></div>
          <div className="feature"><div className="icon">🛎️</div><h3>Hỗ trợ 24/7</h3><p>Đội ngũ tư vấn luôn sẵn sàng.</p></div>
        </div>
      </section>
    </>
  )
}
