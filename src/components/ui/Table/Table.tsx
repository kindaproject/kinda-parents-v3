import React, { useState } from "react";
import { useThemeMode } from "../../../_metronic/partials";
import styles from "./Table.module.css";

interface Header {
  key: string;
  label: string | React.ReactNode;
  className?: string;
  onRender?: (item: Record<string, any>) => React.ReactNode;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  width?: string | number;
}

interface TableProps {
  headers: Header[];
  data: Record<string, any>[] | null;
  selectable?: boolean;
  onRowClick?: (row: any) => void;
  onSelectionChange?: (selectedRows: Record<string, any>[]) => void;
  className?: string;
  loading?: boolean;
  skeletonRows?: number;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}

const Table = ({
  headers,
  data = [],
  selectable = false,
  onSelectionChange,
  className = "",
  onRowClick,
  loading = false,
  skeletonRows = 5,
  style,
}: TableProps) => {
  const [selectedRows, setSelectedRows]: any = useState([]);
  const { mode } = useThemeMode();

  if (!loading && !data) {
    return <p className="text-center text-gray-500">Cargando datos...</p>;
  }

  if (!loading && data && data.length === 0) {
    return <p className="text-center text-gray-500">No hay Datos</p>;
  }

  const handleRowSelection = (row: Record<string, any>) => {
    const alreadySelected = selectedRows.includes(row);
    const newSelection = alreadySelected
      ? selectedRows.filter((r: any) => r !== row)
      : [...selectedRows, row];

    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectAll = () => {
    if (!data) return;
    const allSelected = selectedRows.length === data.length;
    const newSelection = allSelected ? [] : [...data];
    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  };

  return (
    <div className={`${styles.table} ${className}`} style={style}>
      <table
        id="kt_datatable_responsive"
        // style={{ borderTopWidth: 1, borderBottomWidth: 1 }}
        className="table table-striped rounded gy-5 gs-7">
        <thead style={{ borderBottomWidth: 1, borderStyle: "dashed" }}>
          <tr className="fw-semibold fs-6 text-gray-800">
            {selectable && (
              <th>
                <input
                  type="checkbox"
                  checked={
                    !loading &&
                    selectedRows.length === (data?.length ?? 0) &&
                    (data?.length ?? 0) > 0
                  }
                  onChange={handleSelectAll}
                  aria-label="Seleccionar todos"
                />
              </th>
            )}
            {headers.map((header) => (
              <th
                key={header.key}
                style={{
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "bold",
                  maxWidth: header.width,
                  ...header.headerStyle,
                }}
                className={header.className || ""}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
        // style={{
        //   borderBottomWidth: 1,
        //   borderStyle: "dashed",
        // }}
        >
          {loading
            ? Array.from({ length: skeletonRows }).map((_, idx) => (
                <tr key={`skeleton-${idx}`}>
                  {selectable && (
                    <td>
                      <div
                        className={`${
                          mode === "dark"
                            ? styles.skeletonDark
                            : styles.skeleton
                        } ${styles.checkboxSkeleton}`}
                      />
                    </td>
                  )}
                  {headers.map((header) => (
                    <td key={`skeleton-col-${header.key}-${idx}`}>
                      <div
                        className={
                          mode === "dark"
                            ? styles.skeletonDark
                            : styles.skeleton
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))
            : data &&
              data?.map((row, idx) => (
                <tr key={idx}>
                  {selectable && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={() => handleRowSelection(row)}
                        aria-label={`Seleccionar fila ${idx + 1}`}
                      />
                    </td>
                  )}
                  {headers.map((header) => (
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: "normal",
                        fontSize: "14px",
                        color: "#808290",
                        maxWidth: header.width,
                        ...header.style,
                      }}
                      key={header.key}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}>
                      {header.onRender
                        ? header.onRender(row)
                        : row[header.key] ?? "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
