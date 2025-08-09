// // src/components/ui/Select/Select.tsx
// import React from 'react';
// import ReactSelect, {
//     Props as ReactSelectProps,
//     StylesConfig,
// } from 'react-select';

// import styles from './Select.module.css';

// interface Option {
//     value: string | number;
//     label: string;
// }

// interface SelectProps extends Omit<ReactSelectProps<Option, boolean>, 'options'> {
//     /**
//      * Etiqueta que se mostrará sobre el select
//      */
//     label?: string;
//     /**
//      * Si es true, añadirá un asterisco (*) junto a la etiqueta
//      */
//     required?: boolean;
//     /**
//      * Mensaje de error o array de mensajes de error
//      */
//     error?: string | string[];
//     /**
//      * Lista de opciones: cada objeto debe tener { value, label }
//      */
//     options: Option[];
//     /**
//      * Nombre del campo, para compatibilidad con formularios
//      */
//     name?: string;
//     /**
//      * Clase extra para el contenedor
//      */
//     className?: string;
//     /**
//      * Si pasas `isDark={true}`, se aplicará la clase de tema dark
//      */
//     isDark?: boolean;
// }

// /**
//  * Estilos básicos para react-select, ajustados
//  * para que, en caso de error, el borde se ponga rojo.
//  * (estos siguen en TS porque maneja el “error”).
//  */
// const getCustomStyles = (hasError: boolean): StylesConfig<Option, boolean> => ({
//     control: (provided) => ({
//         ...provided,
//         borderColor: hasError ? '#dc3545' : provided.borderColor,
//         '&:hover': {
//             borderColor: hasError ? '#dc3545' : provided.borderColor,
//         },
//         boxShadow: hasError ? '0 0 0 0.2rem rgba(220,53,69,.25)' : provided.boxShadow,
//     }),
//     // Puedes seguir personalizando más secciones si las necesitas
// });

// const Select: React.FC<SelectProps> = ({
//     label,
//     required = false,
//     error,
//     options,
//     name,
//     className = '',
//     isMulti = false,
//     isDark = false,    // <---- nuevo prop para saber si queremos modo oscuro
//     ...rest
// }) => {
//     // Convertimos error a string única (similar al componente Input)
//     const errorMessage = Array.isArray(error) ? error.join(', ') : error;
//     const hasError = Boolean(errorMessage);

//     /**
//      * Si isDark === true, le agregamos la clase styles.darkSelect al contenedor.
//      * También mantenemos cualquier className que te pasen desde afuera.
//      */
//     const wrapperClasses = [
//         'form-group',
//         className,
//         isDark ? styles.darkSelect : ''
//     ]
//         .filter(Boolean)
//         .join(' ');

//     return (
//         <div className={wrapperClasses}>
//             {label && (
//                 <label className={`form-label ${required ? 'required' : ''}`}>
//                     {label}
//                 </label>
//             )}

//             <ReactSelect
//                 name={name}
//                 options={options}
//                 isMulti={isMulti}
//                 // classNamePrefix="react-select"
//                 className={`${styles['react-select']} ${hasError ? styles.error : ''}`}
//                 styles={getCustomStyles(hasError)}
//                 {...rest}
//             />

//             {errorMessage && (
//                 <div className="invalid-feedback d-block">{errorMessage}</div>
//             )}
//         </div>
//     );
// };

// export default Select;

import React from "react";

export interface Option {
  value: string | number | boolean | null;
  label: string;
}

interface SelectProps {
  label?: string;
  error?: string | string[];
  name?: string;
  required?: boolean;
  options: Option[] | null;
  value: any;
  onChange: (option: Option | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  variant?: "V1" | "V2";
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  required,
  options,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  className = "",
  disabled = false,
  variant = "V1",
  style,
}) => {
  const errorMessage = Array.isArray(error) ? error.join(", ") : error;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      onChange(null);
      return;
    }

    const found = options?.find((opt) => String(opt.value) === selectedValue);
    onChange(found || null);
  };

  return (
    <div className="form-group" style={style}>
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
      <select
        title={label || placeholder}
        className={`form-select ${error ? "is-invalid" : ""} ${className}`}
        value={
          value && variant == "V1"
            ? String(value.value)
            : variant == "V2"
            ? String(value)
            : ""
        }
        onChange={handleSelectChange}
        required={required}
        disabled={disabled}
        style={style}>
        {placeholder && <option value="">{placeholder}</option>}

        {options?.map((opt, i) => (
          <option key={i} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <div className="invalid-feedback d-block mb-2">{errorMessage}</div>
      )}
    </div>
  );
};

export default Select;
