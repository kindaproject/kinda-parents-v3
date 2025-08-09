import React, { ReactNode, useState } from 'react'
import TableHeadRow from './table-head/TableHeadRow'
import TableBodyRow from './table-body/TableBodyRow'
import type { Sort } from '../models'
import Loading from '../Loading'

export interface TableContentProps<T> {
  header: any[]
  data: T[]
  checkboxEnabled: boolean
  checkboxLabel: string
  sortLabel: string | null
  sortOrder: 'asc' | 'desc'
  loading: boolean
  emptyTableText: string
  onSort?: (sort: Sort) => void
  onSelect?: (items: any[]) => void
  children?: { [key: string]: (row: T) => ReactNode }
}

function TableContent<T>(props: TableContentProps<T>) {
  const {
    header,
    data,
    checkboxEnabled,
    checkboxLabel,
    sortLabel,
    sortOrder,
    loading,
    emptyTableText,
    onSort,
    onSelect,
    children,
  } = props

  const [selectedItems, setSelectedItems] = useState<any[]>([])

  const selectAll = (checked: boolean) => {
    const all = checked ? data.map((row: any) => row[checkboxLabel]) : []
    setSelectedItems(all)
    onSelect?.(all)
  }

  const onChange = (items: any[]) => {
    setSelectedItems(items)
    onSelect?.(items)
  }

  return (
    <div className="table-responsive">
      <table
        className={`table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer ${
          loading ? 'overlay overlay-block' : ''
        }`}
      >
        <TableHeadRow
          header={header}
          checkboxEnabled={checkboxEnabled}
          checkboxEnabledValue={selectedItems.length === data.length && data.length > 0}
          sortLabel={sortLabel}
          sortOrder={sortOrder}
          onSort={onSort}
          onSelect={selectAll}
        />
        <TableBodyRow
          header={header}
          data={data}
          checkboxEnabled={checkboxEnabled}
          checkboxLabel={checkboxLabel}
          selectedItems={selectedItems}
          onChange={onChange}
        >
          {children}
        </TableBodyRow>
      </table>
      {loading && <Loading emptyTableText={emptyTableText} />}
    </div>
  )
}

export default TableContent
