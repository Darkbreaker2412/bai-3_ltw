import { useCallback, useEffect, useState } from 'react'
import { getHotels, createHotel, updateHotel, deleteHotel } from '../api/hotelApi'
import { getErrorMessage } from '../api/axiosClient'
import { formatPrice } from '../data/hotels.js'
import Pagination from '../components/Pagination.jsx'

const PAGE_SIZE = 5
const EMPTY = { name: '', city: '', rating: 4, minPrice: 500000, imageUrl: '', description: '' }

export default function Admin() {
  const [hotels, setHotels] = useState([])
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [form, setForm] = useState(null) // null = ẩn form
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const { data } = await getHotels()          // GET
      setHotels(data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const save = async (e) => {
    e.preventDefault()
    setError('')
    const payload = { ...form, rating: Number(form.rating), minPrice: Number(form.minPrice) }
    try {
      if (form.id) await updateHotel(form.id, payload)  // PUT
      else await createHotel(payload)                   // POST
      setForm(null)
      load()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const remove = async (h) => {
    if (!window.confirm(`Xóa khách sạn "${h.name}"?`)) return
    try {
      await deleteHotel(h.id)                           // DELETE
      load()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const list = hotels.filter((h) => h.name.toLowerCase().includes(q.toLowerCase()))
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const cur = Math.min(page, totalPages)
  const items = list.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE)
  const setF = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="container page">
      <div className="section-head">
        <h1 className="page-title">Quản lý khách sạn</h1>
        <button className="btn btn-accent" onClick={() => setForm({ ...EMPTY })}>+ Thêm khách sạn</button>
      </div>

      {error && <p className="error">{error}</p>}

      {form && (
        <form className="form admin-form" onSubmit={save}>
          <h3>{form.id ? 'Sửa khách sạn' : 'Thêm khách sạn'}</h3>
          <div className="row">
            <label>Tên<input className="input" required value={form.name} onChange={setF('name')} /></label>
            <label>Thành phố<input className="input" required value={form.city} onChange={setF('city')} /></label>
          </div>
          <div className="row">
            <label>Đánh giá (0–5)<input className="input" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={setF('rating')} /></label>
            <label>Giá từ (₫/đêm)<input className="input" type="number" min="0" value={form.minPrice} onChange={setF('minPrice')} /></label>
          </div>
          <label>Link ảnh<input className="input" value={form.imageUrl || ''} onChange={setF('imageUrl')} /></label>
          <label>Mô tả<textarea className="input" rows="3" value={form.description || ''} onChange={setF('description')} /></label>
          <div className="row">
            <button className="btn btn-primary" type="submit">Lưu</button>
            <button className="btn btn-small" type="button" onClick={() => setForm(null)}>Hủy</button>
          </div>
        </form>
      )}

      <input className="input" placeholder="🔍 Tìm khách sạn..." value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} />

      {loading ? <p className="empty">Đang tải...</p> : (
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>ID</th><th>Tên</th><th>Thành phố</th><th>Đánh giá</th><th>Giá từ</th><th>Thao tác</th></tr></thead>
            <tbody>
              {items.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td><td>{h.name}</td><td>{h.city}</td><td>{h.rating}</td><td>{formatPrice(h.minPrice)}</td>
                  <td>
                    <button className="btn btn-small" onClick={() => setForm({ ...h })}>Sửa</button>{' '}
                    <button className="btn btn-small btn-danger" onClick={() => remove(h)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={cur} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
