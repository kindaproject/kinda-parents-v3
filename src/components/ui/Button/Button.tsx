import React from "react";

interface ButtonProps {
  onClick: (e?: any) => void;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  onClick,
  variant = "primary",
  icon,
  style,
  className,
  disabled,
  loading,
  children,
}: ButtonProps) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor:
      variant === "primary" ? "var(--c_kBlue)" : "var(--c_goldV1)",
    color: "var(--c_white)",
    border: "none",
    padding: "10px 0px",
    // borderRadius: "8px",
    width: "100%",

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled || loading ? 0.7 : 1,
    transition: "background-color 0.2s ease",
  };

  return (
    <button
      className={className}
      onClick={onClick}
      style={{ ...baseStyle, ...style }}
      disabled={disabled || loading}>
      {loading ? (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"></span>
      ) : (
        <>
          {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
