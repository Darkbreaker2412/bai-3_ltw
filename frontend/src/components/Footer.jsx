import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h4>🏨 StayEasy</h4>
          <p>Đặt phòng khách sạn nhanh chóng, giá tốt, khắp Việt Nam.</p>
        </div>
        <div>
          <h4>Liên kết</h4>
          <Link to="/hotels">Khách sạn</Link>
          <Link to="/about-us">Giới thiệu</Link>
          <Link to="/contact">Liên hệ</Link>
        </div>
        <div>
          <h4>Liên hệ</h4>
          <p>Hotline: 1900 1234</p>
          <p>Email: support@stayeasy.vn</p>
        </div>
      </div>
      <div className="footer-bottom">© 2026 StayEasy – Bài tập Lập trình web, PTIT</div>
    </footer>
  )
}
