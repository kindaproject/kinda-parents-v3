import React from 'react'
import type { Sort } from '../../models'

interface Header {
  columnName: string
  columnLabel: string
  sortEnabled?: boolean
}

interface TableHeadRowProps {
  header: Header[]
  checkboxEnabled: boolean
  checkboxEnabledValue: boolean
  sortLabel: string | null
  sortOrder: 'asc' | 'desc'
  onSort?: (sort: Sort) => void
  onSelect?: (checked: boolean) => void
}

const TableHeadRow: React.FC<TableHeadRowProps> = ({
  header,
  checkboxEnabled,
  checkboxEnabledValue,
  sortLabel,
  sortOrder,
  onSort,
  onSelect,
}) => {
  const renderSortIcon = (col: string) => {
    if (sortLabel !== col) return null
    return sortOrder === 'asc' ? '▲' : '▼'
  }

  const handleSort = (col: string) => {
    const order = sortLabel === col && sortOrder === 'asc' ? 'desc' : 'asc'
    onSort?.({ label: col, order })
  }

  return (
    <thead>
      <tr>
        {checkboxEnabled && (
          <th>
            <input
              title="Select all rows"
              aria-label="Select all rows"
              type="checkbox"
              checked={checkboxEnabledValue}
              onChange={e => onSelect?.(e.target.checked)}
            />
          </th>
        )}
        {header.map(col => (
          <th
            key={col.columnLabel}
            onClick={() => col.sortEnabled && handleSort(col.columnLabel)}
            style={{ cursor: col.sortEnabled ? 'pointer' : 'default' }}
          >
            {col.columnName} {col.sortEnabled && renderSortIcon(col.columnLabel)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeadRow
