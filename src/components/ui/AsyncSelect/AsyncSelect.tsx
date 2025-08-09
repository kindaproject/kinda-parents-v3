
// import React, { useEffect, useState } from "react";
// import { Option } from "../Select/Select";
// import useAxios from "../../../hooks/useAxios";

// interface AsyncSelectProps {
//   label?: string;
//   error?: string | string[];
//   name?: string;
//   required?: boolean;
//   value: Option | null;
//   onChange: (option: Option | null) => void;
//   placeholder?: string;
//   className?: string;
//   disabled?: boolean;
//   style?: React.CSSProperties;
//   endpoint: string;
//   params?: Record<string, any>;
//   /**
//    * Nombre de la propiedad donde vienen los pares key→label.
//    * Si no se pasa, asumimos que `data` es ese objeto.
//    */
//   fieldKey?: string;
//   /**
//    * Opciones estáticas en formato [{ key: label }, ...].
//    * Si se proporciona y no está vacío, se usan en lugar de la petición.
//    */
//   manualOptions?: Record<string, string>[];
// }

// const AsyncSelect: React.FC<AsyncSelectProps> = ({
//   label,
//   error,
//   required,
//   value,
//   onChange,
//   placeholder = "Seleccione una opción",
//   className = "",
//   disabled = false,
//   style,
//   endpoint,
//   fieldKey,
//   params = {},
//   manualOptions,
// }) => {
//   const [options, setOptions] = useState<Option[]>([]);
//   const [shouldFetch, setShouldFetch] = useState(false);
//   const [hasFetched, setHasFetched] = useState(false);

//   const { data, loading } = useAxios(
//     shouldFetch ? endpoint : "",
//     "GET",
//     params
//   );

//   // Mapear opciones manuales si se proporcionan
//   useEffect(() => {
//     if (manualOptions && manualOptions.length > 0 && !hasFetched) {
//       const mapped = manualOptions.flatMap(optObj =>
//         Object.entries(optObj).map(([key, desc]) => ({ value: key, label: desc }))
//       );
//       setOptions(mapped);
//       setHasFetched(true);
//     }
//   }, [manualOptions, hasFetched]);

//   // Mapear respuesta de la API si no hay opciones manuales
//   useEffect(() => {
//     if (manualOptions && manualOptions.length > 0) return;
//     const raw = fieldKey ? data?.[fieldKey] : data;
//     if (raw && !hasFetched) {
//       const mapped = Object.entries(raw).map(([key, desc]) => ({
//         value: key,
//         label: String(desc),
//       }));
//       setOptions(mapped);
//       setHasFetched(true);
//     }
//   }, [data, fieldKey, hasFetched, manualOptions]);

//   const handleClick = () => {
//     // Solo fetch si no hay manualOptions y aún no hemos fetcheado
//     if (!hasFetched && !(manualOptions && manualOptions.length > 0)) {
//       setShouldFetch(true);
//     }
//   };

//   const errorMessage = Array.isArray(error) ? error.join(", ") : error;

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = e.target.value;
//     if (selected === "") {
//       onChange(null);
//       return;
//     }
//     const found = options.find(opt => String(opt.value) === selected) || null;
//     onChange(found);
//   };

//   return (
//     <div className="form-group">
//       {label && (
//         <label className={`form-label ${required ? "required" : ""}`}>{label}</label>
//       )}
//       <select
//         title={label || placeholder}
//         className={`form-select ${error ? "is-invalid" : ""} ${className}`}
//         value={value ? String(value.value) : ""}
//         onChange={handleSelectChange}
//         onClick={handleClick}
//         required={required}
//         disabled={disabled}
//         style={style}
//       >
//         <option value="">{loading ? "Cargando..." : placeholder}</option>
//         {options.map((opt, idx) => (
//           <option key={idx} value={String(opt.value)}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//       {errorMessage && <div className="invalid-feedback d-block mb-2">{errorMessage}</div>}
//     </div>
//   );
// };

// export default AsyncSelect;


import React, { useEffect, useState } from "react";
import { Option } from "../Select/Select";
import useAxios from "../../../hooks/useAxios";

interface AsyncSelectProps {
  label?: string;
  error?: string | string[];
  name?: string;
  required?: boolean;
  value: Option | null;
  onChange: (option: Option | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  endpoint: string;
  params?: Record<string, any>;
  /**
   * Opciones manuales: si se pasan, usan en lugar de fetch
   */
  manualOptions?: Option[];
  /**
   * Nombre de la propiedad en la respuesta donde está el map de pares key→label
   * (sigue soportando tu lógica anterior)
   */
  fieldKey?: string;
}

const AsyncSelect: React.FC<AsyncSelectProps> = ({
  label,
  error,
  required,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  className = "",
  disabled = false,
  style,
  endpoint,
  fieldKey,
  params = {},
  manualOptions,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // Dispara la petición solo tras click/focus inicial
  const { data, loading } = useAxios(
    shouldFetch ? endpoint : "",
    "GET",
    params
  );

  // Mapear manualOptions si vienen
  useEffect(() => {
    if (manualOptions && manualOptions.length > 0 && !hasFetched) {
      setOptions(manualOptions);
      setHasFetched(true);
    }
  }, [manualOptions, hasFetched]);

  // Mapear la respuesta del servidor
  useEffect(() => {
    if (!data || hasFetched) return;

    // Si viene array data.items, mapéalo con {value: id, label: name}
    if (Array.isArray((data as any).items)) {
      const arr = (data as any).items as Array<{ id: number; name: string }>;
      setOptions(arr.map(item => ({
        value: item.id,
        label: item.name
      })));
      setHasFetched(true);
      return;
    }

    // Sino, lógica antigua por fieldKey / data
    const raw = fieldKey ? (data as any)[fieldKey] : data;
    if (raw && typeof raw === "object") {
      const mapped: Option[] = Object.entries(raw).map(
        ([key, desc]) => ({
          value: key,
          label: String(desc)
        })
      );
      setOptions(mapped);
      setHasFetched(true);
    }
  }, [data, fieldKey, manualOptions, hasFetched]);

  const handleActivate = () => {
    if (!hasFetched) {
      setShouldFetch(true);
    }
  };

  const errorMessage = Array.isArray(error) ? error.join(", ") : error;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === "") {
      onChange(null);
      return;
    }
    const found = options.find(opt => String(opt.value) === selected) || null;
    onChange(found);
  };

  return (
    <div className="form-group" style={{ flex: 1, ...style }}>
      {label && (
        <label className={`form-label ${required ? "required" : ""}`} style={{ minHeight: "3rem", display: "flex", alignItems: "flex-end" }}>
          {label}
        </label>
      )}
      <select
        title={label || placeholder}
        className={`form-select ${error ? "is-invalid" : ""} ${className}`}
        value={value ? String(value.value) : ""}
        onChange={handleSelectChange}
        onClick={handleActivate}
        onFocus={handleActivate}
        required={required}
        disabled={disabled}
      >
        <option value="">{loading ? "Cargando..." : placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <div className="invalid-feedback d-block mb-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default AsyncSelect;
