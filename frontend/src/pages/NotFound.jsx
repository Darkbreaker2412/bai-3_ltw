import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container page narrow center">
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <p>Trang bạn tìm không tồn tại.</p>
      <Link to="/" className="btn btn-primary">Về trang chủ</Link>
    </div>
  )
}
