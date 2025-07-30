function Pagination({ pagination, changePage }) {
  return(
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <button
          onClick={() => changePage(pagination.current_page - 1)}
          className={`page-link ${!pagination.has_pre ? "disabled" : ""}`}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      {[...new Array(pagination.total_pages)].map((_, i) => (
        <li className="page-item" key={`${i}_page`}>
          <button
            onClick={() => changePage(i + 1)}
            className={`page-link ${
              i + 1 === pagination.current_page && "active"
            }`}
          >
            {i + 1}
          </button>
        </li>
      ))}
      <li className="page-item">
        <button
          onClick={() => changePage(pagination.current_page + 1)}
          className={`page-link ${!pagination.has_next ? "disabled" : ""}`}
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
  )
}


export default Pagination;