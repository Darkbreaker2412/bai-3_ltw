import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CITIES, ROOM_TYPES, hotels } from '../data/hotels.js'
import HotelCard from '../components/HotelCard.jsx'
import Pagination from '../components/Pagination.jsx'

const PAGE_SIZE = 6
const PRICE_RANGES = [
  { v: '', label: 'Mọi mức giá' },
  { v: '0-700000', label: 'Dưới 700.000₫' },
  { v: '700000-1500000', label: '700.000₫ – 1.500.000₫' },
  { v: '1500000-99999999', label: 'Trên 1.500.000₫' },
]

export default function Hotels() {
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') || ''
  const city = sp.get('city') || ''
  const roomType = sp.get('roomType') || ''
  const price = sp.get('price') || ''
  const sort = sp.get('sort') || ''
  const page = Number(sp.get('page') || 1)
  const checkIn = sp.get('checkIn') || ''
  const checkOut = sp.get('checkOut') || ''

  const update = (key, value) => {
    const next = new URLSearchParams(sp)
    value ? next.set(key, value) : next.delete(key)
    if (key !== 'page') next.delete('page')
    setSp(next)
  }

  const filtered = useMemo(() => {
    let list = hotels.filter((h) => {
      if (q && !h.name.toLowerCase().includes(q.toLowerCase())) return false
      if (city && h.city !== city) return false
      if (roomType && !h.rooms.some((r) => r.type === roomType)) return false
      if (price) {
        const [min, max] = price.split('-').map(Number)
        if (h.minPrice < min || h.minPrice > max) return false
      }
      return true
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.minPrice - b.minPrice)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.minPrice - a.minPrice)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [q, city, roomType, price, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const items = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  return (
    <div className="container page">
      <h1 className="page-title">Danh sách khách sạn</h1>
      {(checkIn || checkOut) && (
        <p className="muted">Thời gian ở: {checkIn || '...'} → {checkOut || '...'}</p>
      )}

      <div className="toolbar">
        <input className="input" placeholder="🔍 Tìm theo tên khách sạn..." value={q} onChange={(e) => update('q', e.target.value)} />
        <select className="input" value={city} onChange={(e) => update('city', e.target.value)}>
          <option value="">Tất cả thành phố</option>
          {CITIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="input" value={roomType} onChange={(e) => update('roomType', e.target.value)}>
          <option value="">Mọi loại phòng</option>
          {ROOM_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select className="input" value={price} onChange={(e) => update('price', e.target.value)}>
          {PRICE_RANGES.map((p) => <option key={p.v} value={p.v}>{p.label}</option>)}
        </select>
        <select className="input" value={sort} onChange={(e) => update('sort', e.target.value)}>
          <option value="">Sắp xếp</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="rating">Đánh giá cao nhất</option>
          <option value="name">Tên A–Z</option>
        </select>
      </div>

      <p className="muted">Tìm thấy {filtered.length} khách sạn</p>
      {items.length === 0 ? (
        <p className="empty">Không có khách sạn phù hợp.</p>
      ) : (
        <div className="grid">{items.map((h) => <HotelCard key={h.id} hotel={h} />)}</div>
      )}
      <Pagination page={current} totalPages={totalPages} onChange={(p) => update('page', String(p))} />
    </div>
  )
}
