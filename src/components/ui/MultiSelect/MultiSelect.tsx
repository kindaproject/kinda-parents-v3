import React, { useState, useRef, useEffect } from "react";
import styles from "./MultiSelect.module.css";
import Button from "../Button/Button";

export interface Option {
  value: string | number | boolean | null;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  error?: string | string[];
  name?: string;
  required?: boolean;
  options: Option[] | null;
  value: Option[];
  onChange: (options: Option[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  maxSelections?: number;
  canAddNew?: boolean;
  onAddNew?: (newValue: string) => void;
  addNewPlaceholder?: string;
  list?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  error,
  required,
  options,
  value = [],
  onChange,
  placeholder = "Seleccione opciones",
  className = "",
  disabled = false,
  style,
  maxSelections,
  canAddNew = false,
  onAddNew,
  addNewPlaceholder = "Agregar nuevo item...",
  list = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newItemValue, setNewItemValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const errorMessage = Array.isArray(error) ? error.join(", ") : error;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: Option) => {
    if (disabled) return;

    const isSelected = value.some((v) => v.value === option.value);
    let newValue: Option[];

    if (isSelected) {
      newValue = value.filter((v) => v.value !== option.value);
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return;
      }
      newValue = [...value, option];
    }

    onChange(newValue);
  };

  const filteredOptions =
    options?.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="form-group" style={style} ref={dropdownRef}>
      {label && (
        <label
          className={`form-label ${required ? "required" : ""}`}
          style={{
            minHeight: "3rem",
            display: "flex",
            alignItems: "flex-end",
          }}>
          {label}
        </label>
      )}

      <div className={`position-relative ${disabled ? "opacity-75" : ""}`}>
        <div
          className={`form-control d-flex flex-wrap overflow-hidden gap-2 min-h-50px  cursor-pointer ${
            error ? "is-invalid" : ""
          } ${className}`}
          style={{ maxHeight: 57 }}
          onClick={() => !disabled && setIsOpen(!isOpen)}>
          {value.length > 0 ? (
            value.map((option) => (
              <span
                key={String(option.value)}
                className="badge badge-light-primary d-flex align-items-center">
                {option.label}
                <Button
                  className=" btn-icon btn-active-light-primary ms-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(option);
                  }}>
                  <i className="bi bi-x fs-7"></i>
                </Button>
              </span>
            ))
          ) : (
            <span className="text-muted">{placeholder}</span>
          )}
        </div>

        {isOpen && (
          <div
            className="dropdown-menu show w-100 p-0 overflow-hidden"
            style={{
              maxHeight: "300px",
              boxShadow: "0 0 50px 0 rgb(82 63 105 / 15%)",
            }}>
            <div
              className="p-3 border-bottom"
              style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div
              style={{ maxHeight: "calc(300px - 130px)", overflowY: "auto" }}
              className="p-3">
              {filteredOptions.map((option) => {
                const isSelected = value.some((v) => v.value === option.value);
                return (
                  <div
                    key={String(option.value)}
                    className={`dropdown-item d-flex align-items-center cursor-pointer py-2 px-3 ${
                      isSelected ? "active" : ""
                    }`}
                    onClick={() => toggleOption(option)}>
                    <div className="form-check form-check-custom form-check-solid me-2">
                      <input
                        title={`Select ${option.label}`}
                        placeholder={`Select ${option.label}`}
                        type="checkbox"
                        className="form-check-input"
                        checked={isSelected}
                        onChange={() => {}}
                      />
                    </div>
                    {option.label}
                  </div>
                );
              })}
              {filteredOptions.length === 0 && !canAddNew && (
                <div className="text-muted text-center py-2">
                  No se encontraron opciones
                </div>
              )}
            </div>
            {canAddNew && (
              <div
                className="border-top p-3"
                style={{
                  position: "sticky",
                  bottom: 0,
                  boxShadow: "0 -5px 10px -5px rgba(82, 63, 105, 0.05)",
                }}>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder={addNewPlaceholder}
                    value={newItemValue}
                    onChange={(e) => setNewItemValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onKeyPress={(e) => {
                      if (
                        e.key === "Enter" &&
                        newItemValue.trim() &&
                        onAddNew
                      ) {
                        onAddNew(newItemValue.trim());
                        setNewItemValue("");
                      }
                    }}
                  />
                  <Button
                    icon={<i className="bi bi-plus-lg"></i>}
                    className="btn btn-sm btn-light-primary fixed"
                    disabled={!newItemValue.trim()}
                    onClick={() => {
                      if (newItemValue.trim() && onAddNew) {
                        onAddNew(newItemValue.trim());
                        setNewItemValue("");
                      }
                    }}>
                    Agregar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="invalid-feedback d-block mb-2">{errorMessage}</div>
      )}

      {maxSelections && value.length >= maxSelections && (
        <div className="text-muted fs-7 mt-1">
          Límite máximo de {maxSelections} selecciones alcanzado
        </div>
      )}

      {list && value.length > 0 && (
        <div className="card mt-3">
          <div
            className="card-body p-3"
            style={{ maxHeight: "200px", overflowY: "auto" }}>
            {value.map((option) => (
              <div
                key={String(option.value)}
                className="d-flex align-items-center justify-content-between py-2">
                <span>{option.label}</span>
                <Button
                  className="btn btn-sm btn-icon btn-light-danger"
                  onClick={() => toggleOption(option)}>
                  <i className="bi bi-x fs-7"></i>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
