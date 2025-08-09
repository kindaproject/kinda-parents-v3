import React, { InputHTMLAttributes, ReactNode } from "react";
import TextField from "@mui/material/TextField";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | string[];
  required?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  iconLeft,
  iconRight,
  className = "",
  style,
  onChange = () => {},
  type,
  ...props
}) => {
  const errorMessage = Array.isArray(error) ? error.join(", ") : error;

  const handleChange = (e: any) => {
    const value =
      type === "email" ? e.target.value.replace(/\s+/g, "") : e.target.value;
    const modifiedEvent = {
      ...e,
      target: {
        ...e.target,
        value,
        name: e.target.name,
      },
    };
    onChange(modifiedEvent);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (type === "email") {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const cleanText = pastedText.replace(/\s+/g, "");

      const input = e.target as HTMLInputElement;
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;

      const newValue =
        input.value.slice(0, start) + cleanText + input.value.slice(end);

      const modifiedEvent = {
        target: {
          ...input,
          value: newValue,
          name: input.name,
        },
      };

      onChange(modifiedEvent as any);
      input.value = newValue;
    }
  };

  return (
    <TextField
      style={{ width: "100%" }}
      id="standard-basic"
      label={label}
      variant="standard"
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      required={required}
      onChange={handleChange}
      onPaste={handlePaste}
      sx={{
        "& .MuiInputBase-root": {
          color: "var(--cWhite)", // color del texto
          fontWeight: 300,
          fontFamily: "var(--f_family)",
        },
        "& .MuiInputLabel-root": {
          color: "var(--cWhite)", // color del label
          fontWeight: 700,
          fontFamily: "var(--f_family)",
          letterSpacing: "1px",
          lineHeight: "133%",
          fontSize: 13,
        },
        "& .MuiInput-underline:before": {
          borderBottom: "1px solid var(--c_whiteV3)", // línea inferior normal
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: "2px solid #666", // línea al hacer hover
        },
        "& .MuiInput-underline:after": {
          borderBottom: "2px solid #007bff", // línea activa
        },
        "& .MuiFormHelperText-root": {
          color: "#d32f2f", // color del texto de error
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--cWhite)",
        },
      }}
      slotProps={{
        input: {
          startAdornment: iconLeft && (
            <span style={{ marginRight: "8px" }}>{iconLeft}</span>
          ),
          endAdornment: iconRight && (
            <span style={{ marginLeft: "8px" }}>{iconRight}</span>
          ),
        },
      }}
    />
  );
};

export default Input;
