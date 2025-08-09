import React, { useState, useEffect, useMemo, ReactNode } from 'react'

import type { Sort } from './models'
import TableContent from './table-content/TableContent'
import TableFooter from './table-footer/TableFooter'

export interface KTDatatableProps<T> {
  header: any[]
  data: T[]
  itemsPerPage?: number
  itemsPerPageDropdownEnabled?: boolean
  checkboxEnabled?: boolean
  checkboxLabel?: string
  total?: number
  loading?: boolean
  sortLabel?: string | null
  sortOrder?: 'asc' | 'desc'
  emptyTableText?: string
  currentPage?: number
  onSort?: (sort: Sort) => void
  onItemsSelect?: (items: Array<any>) => void
  onItemsPerPageChange?: (n: number) => void
  onPageChange?: (page: number) => void
  children?: { [key: string]: (row: T) => ReactNode }
}

function KTDatatable<T>(props: KTDatatableProps<T>) {
  const {
    header,
    data,
    itemsPerPage = 10,
    itemsPerPageDropdownEnabled = true,
    checkboxEnabled = false,
    checkboxLabel = 'id',
    total,
    loading = false,
    sortLabel = null,
    sortOrder = 'asc',
    emptyTableText = 'No data found',
    currentPage: currentPageProp = 1,
    onSort,
    onItemsSelect,
    onItemsPerPageChange,
    onPageChange,
    children,
  } = props

  const [currentPage, setCurrentPage] = useState<number>(currentPageProp)
  const [itemsInTable, setItemsInTable] = useState<number>(itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
    onItemsPerPageChange?.(itemsInTable)
  }, [itemsInTable, onItemsPerPageChange])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange?.(page)
  }

  const dataToDisplay = useMemo(() => {
    if (!data) return []
    if (data.length <= itemsInTable) return data
    const from = (currentPage - 1) * itemsInTable
    return data.slice(from, from + itemsInTable)
  }, [data, currentPage, itemsInTable])

  const totalItems = useMemo(() => {
    if (!data) return 0
    return data.length <= itemsInTable ? (total ?? data.length) : data.length
  }, [data, itemsInTable, total])

  return (
    <div className="dataTables_wrapper dt-bootstrap4 no-footer">
      <TableContent
        header={header}
        data={dataToDisplay}
        checkboxEnabled={checkboxEnabled}
        checkboxLabel={checkboxLabel}
        emptyTableText={emptyTableText}
        sortLabel={sortLabel}
        sortOrder={sortOrder}
        loading={loading}
        onSort={onSort}
        onSelect={onItemsSelect}
      >
        {children}
      </TableContent>
      <TableFooter
        currentPage={currentPage}
        itemsPerPage={itemsInTable}
        onPageChange={handlePageChange}
        onItemsPerPageChange={setItemsInTable}
        count={totalItems}
        itemsPerPageDropdownEnabled={itemsPerPageDropdownEnabled}
      />
    </div>
  )
}

export default KTDatatable
