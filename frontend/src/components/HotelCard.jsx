import { Link } from 'react-router-dom'
import { formatPrice } from '../data/hotels.js'

export default function HotelCard({ hotel }) {
  return (
    <article className="card">
      <img src={hotel.image} alt={hotel.name} className="card-img" loading="lazy" />
      <div className="card-body">
        <div className="card-top">
          <span className="badge">{hotel.city}</span>
          <span className="rating">⭐ {hotel.rating}</span>
        </div>
        <h3 className="card-title">{hotel.name}</h3>
        <p className="card-desc">{hotel.description}</p>
        <div className="card-bottom">
          <div>
            <small>Từ</small>
            <div className="price">{formatPrice(hotel.minPrice)}<small>/đêm</small></div>
          </div>
          <Link to={`/hotels/${hotel.id}`} className="btn btn-primary">Xem chi tiết</Link>
        </div>
      </div>
    </article>
  )
}
