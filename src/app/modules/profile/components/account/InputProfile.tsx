import React from "react";
interface InputProfileProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error: any;
}
const InputProfile = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  error,
}: InputProfileProps) => {
  return (
    <div className="row mb-8">
      <label className="col-lg-3 col-form-label">{label}</label>
      <div className="col-lg-9">
        <div className="spinner spinner-sm spinner-primary spinner-right">
          <input
            name={name}
            defaultValue={value}
            className="form-control form-control-lg form-control-solid"
            type={type}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={onChange}
          />
          {error && <div className="text-danger">{error?.[name]}</div>}
        </div>
      </div>
    </div>
  );
};

export default InputProfile;
