import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <div className="container page narrow">
      <h1 className="page-title">Liên hệ</h1>
      {sent ? (
        <div className="success"><h3>Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.</h3></div>
      ) : (
        <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <label>Họ tên<input className="input" required /></label>
          <label>Email<input className="input" type="email" required /></label>
          <label>Nội dung<textarea className="input" rows="5" required /></label>
          <button className="btn btn-primary" type="submit">Gửi</button>
        </form>
      )}
    </div>
  )
}
