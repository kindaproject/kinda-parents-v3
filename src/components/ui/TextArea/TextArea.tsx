import React, { TextareaHTMLAttributes, ReactNode } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | string[];
  required?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  required,
  iconLeft,
  iconRight,
  className = "",
  style,
  ...props
}) => {
  const errorMessage = Array.isArray(error) ? error.join(", ") : error;

  return (
    <div className="form-group" style={{ ...style }}>
      {label && (
        <label
          className={`form-label ${required ? "required" : ""}`}
          style={{ minHeight: "3rem" }}
        >
          {label}
        </label>
      )}
      <div className="input-wrapper position-relative d-flex align-items-center">
        {iconLeft && (
          <span className="input-icon-left position-absolute ms-2">
            {iconLeft}
          </span>
        )}
        <textarea
          className={`
            form-control
            ${error ? "is-invalid" : ""}
            ${iconLeft ? "ps-5" : ""}
            ${iconRight ? "pe-5" : ""}
            ${className}
          `}
          {...props}
        />
        {iconRight && (
          <span className="input-icon-right position-absolute me-2 end-0">
            {iconRight}
          </span>
        )}
      </div>
      {errorMessage && (
        <div
          className="invalid-feedback d-block mb-2"
          style={{ minHeight: "1.25rem" }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextArea;
