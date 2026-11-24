import { Link, useParams } from 'react-router-dom'
import { getHotel, formatPrice } from '../data/hotels.js'
import NotFound from './NotFound.jsx'

export default function HotelDetail() {
  const { id } = useParams()
  const hotel = getHotel(id)
  if (!hotel) return <NotFound />

  return (
    <div className="container page">
      <Link to="/hotels" className="link">← Quay lại danh sách</Link>
      <h1 className="page-title">{hotel.name}</h1>
      <p className="muted">📍 {hotel.city} &nbsp; ⭐ {hotel.rating}</p>

      <div className="gallery">
        {hotel.gallery.map((src, i) => <img key={i} src={src} alt={`${hotel.name} ${i + 1}`} />)}
      </div>
      <p>{hotel.description}</p>

      <h2 className="section-title">Các loại phòng</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Loại phòng</th><th>Giường</th><th>Hướng</th><th>Bồn tắm</th><th>Tiện ích</th><th>Giá/đêm</th><th></th></tr>
          </thead>
          <tbody>
            {hotel.rooms.map((r) => (
              <tr key={r.id}>
                <td><strong>{r.type}</strong></td>
                <td>{r.bed}</td>
                <td>{r.view}</td>
                <td>{r.bathtub ? 'Có' : 'Không'}</td>
                <td>{r.amenities.join(', ')}</td>
                <td className="price">{formatPrice(r.price)}</td>
                <td><Link className="btn btn-primary" to={`/booking/${hotel.id}?room=${r.type}`}>Đặt ngay</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
