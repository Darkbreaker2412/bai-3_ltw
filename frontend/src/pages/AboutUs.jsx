export default function AboutUs() {
  return (
    <div className="container page narrow">
      <h1 className="page-title">Giới thiệu</h1>
      <p>
        <strong>StayEasy</strong> là website đặt phòng khách sạn được xây dựng trong khuôn khổ học phần
        Lập trình web tại Học viện Công nghệ Bưu chính Viễn thông (PTIT).
      </p>
      <h2 className="section-title">Chức năng chính</h2>
      <ul className="list">
        <li><strong>Khách du lịch:</strong> tìm kiếm khách sạn theo thành phố, giá, loại phòng, thời gian ở; xem chi tiết; đặt phòng nhanh.</li>
        <li><strong>Khách sạn:</strong> quản lý loại phòng, trạng thái phòng, danh sách đặt phòng, thống kê.</li>
        <li><strong>Quản trị viên:</strong> quản lý tài khoản, khách sạn và đổi mật khẩu.</li>
      </ul>
      <h2 className="section-title">Công nghệ</h2>
      <p>ReactJS, Vite, React Router, Axios, ASP.NET Core, Entity Framework Core.</p>
      <h2 className="section-title">Thành viên nhóm</h2>
      <ul className="list">
        <li>Nguyen Phuc Thinh - N22DCCN182</li>
      </ul>
    </div>
  )
}
