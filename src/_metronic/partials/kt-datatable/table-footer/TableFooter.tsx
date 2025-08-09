import React from 'react'

interface TableFooterProps {
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (n: number) => void
  count: number
  itemsPerPageDropdownEnabled: boolean
}

// Select de items por página
const TableItemsPerPageSelect: React.FC<{
  value: number
  onChange: (n: number) => void
  enabled: boolean
}> = ({ value, onChange, enabled }) =>
  enabled ? (
    <select
      title="Items per page"
      className="form-select form-select-sm"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
    >
      {[5, 10, 20, 50, 100].map(n => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  ) : null

// Paginación
const TablePagination: React.FC<{
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}> = ({ currentPage, onPageChange, totalPages }) => (
  <nav>
    <ul className="pagination pagination-sm mb-0">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
          «
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
          »
        </button>
      </li>
    </ul>
  </nav>
)

const TableFooter: React.FC<TableFooterProps> = ({
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  count,
  itemsPerPageDropdownEnabled,
}) => {
  const totalPages = Math.ceil(count / itemsPerPage)
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <TableItemsPerPageSelect
        value={itemsPerPage}
        onChange={onItemsPerPageChange}
        enabled={itemsPerPageDropdownEnabled}
      />
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default TableFooter
