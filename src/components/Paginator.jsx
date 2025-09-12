import { Pagination } from 'react-bootstrap';
import "./Paginator.css";

export default function Paginator({ page, pages, onChange }) {
  if (pages <= 1) return null;

  const items = [];
  for (let p = 1; p <= pages; p++) {
    items.push(
      <Pagination.Item key={p} active={p === page} onClick={() => onChange(p)}>
        {p}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        <Pagination.Prev disabled={page <= 1} onClick={() => onChange(page - 1)} />
        {items}
        <Pagination.Next disabled={page >= pages} onClick={() => onChange(page + 1)} />
      </Pagination>
    </div>
  );
}
