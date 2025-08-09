import React from 'react'

interface Header {
  columnLabel: string
}

interface TableBodyRowProps<T> {
  header: Header[]
  data: T[]
  checkboxEnabled: boolean
  checkboxLabel: string
  selectedItems: any[]
  onChange?: (items: any[]) => void
  children?: { [key: string]: (row: T) => React.ReactNode }
}

function TableBodyRow<T>(props: TableBodyRowProps<T>) {
  const {
    header,
    data,
    checkboxEnabled,
    checkboxLabel,
    selectedItems,
    onChange,
    children,
  } = props

  const handleCheckboxChange = (value: any) => {
    const newSelected = selectedItems.includes(value)
      ? selectedItems.filter(i => i !== value)
      : [...selectedItems, value]
    onChange?.(newSelected)
  }

  if (!data.length) {
    return (
      <tbody>
        <tr>
          <td colSpan={(checkboxEnabled ? 1 : 0) + header.length} className="text-center py-4">
            No data found
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody className="fw-semibold text-gray-600">
      {data.map((row, i) => (
        <tr key={i}>
          {checkboxEnabled && (
            <td>
              <div className="form-check form-check-sm form-check-custom form-check-solid">
                <input
                  title="Select row"
                  aria-label="Select row checkbox"
                  className="form-check-input"
                  type="checkbox"
                  value={(row as any)[checkboxLabel]}
                  checked={selectedItems.includes((row as any)[checkboxLabel])}
                  onChange={() => handleCheckboxChange((row as any)[checkboxLabel])}
                />
              </div>
            </td>
          )}
          {header.map(col => (
            <td key={(col as any).columnLabel}>
              {children?.[col.columnLabel]
                ? children[col.columnLabel](row)
                : (row as any)[col.columnLabel]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBodyRow
