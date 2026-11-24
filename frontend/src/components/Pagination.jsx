export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="pagination">
      <button className="page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>‹</button>
      {pages.map((p) => (
        <button key={p} className={p === page ? 'page-btn active' : 'page-btn'} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>›</button>
    </div>
  )
}
