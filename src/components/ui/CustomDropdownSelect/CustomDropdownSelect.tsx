// import React, { useState, useRef, useEffect } from 'react';

// export interface Option {
//     value: string;
//     label: string;
// }

// interface CustomDropdownSelectProps {
//     /** Opciones iniciales */
//     initialOptions: Option[] | undefined;
//     /** Valores seleccionados */
//     label: string;
//     name: string;
//     value: Option[];
//     required?: boolean;
//     error: any;
//     /** Callback al cambiar la selección */
//     onChange: (selected: Option[]) => void;
//     /** Placeholder cuando no hay nada seleccionado */
//     placeholder?: string;
//     style?: React.CSSProperties;
//     rowStyle?: React.CSSProperties;
// }

// const CustomDropdownSelect: React.FC<CustomDropdownSelectProps> = ({
//     initialOptions,
//     value,
//     label,
//     name,
//     error,
//     onChange,
//     required,
//     style,
//     rowStyle,
//     placeholder = 'Selecciona o añade...',
// }) => {
//     const [options, setOptions] = useState<Option[]>(initialOptions || []);
//     const [open, setOpen] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
//     const containerRef = useRef<HTMLDivElement>(null);

//     // Cierra el dropdown si haces clic fuera
//     useEffect(() => {
//         const handleClickOutside = (e: MouseEvent) => {
//             if (
//                 containerRef.current &&
//                 !containerRef.current.contains(e.target as Node)
//             ) {
//                 setOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     // Toggle dropdown
//     const toggleOpen = () => setOpen(o => !o);

//     // Filtrar opciones cuando cambia el input
//     useEffect(() => {
//         const filtered = options.filter(opt =>
//             opt.label.toLowerCase().includes(inputValue.toLowerCase())
//         );
//         setFilteredOptions(filtered);
//     }, [inputValue, options]);

//     // Añadir nuevo item
//     const addItem = () => {
//         const val = inputValue.trim();
//         if (!val) return;
//         if (!options.find(o => o.value === val || o.label.toLowerCase() === val.toLowerCase())) {
//             const newOpt = { value: val, label: val };
//             setOptions(opts => [...opts, newOpt]);
//             onChange([...value, newOpt]);
//             setInputValue('');
//             setOpen(false);
//         }
//     };

//     // Toggle selección de un item existente
//     const toggleSelect = (opt: Option) => {
//         const exists = value.find(v => v.value === opt.value);
//         if (exists) {
//             onChange(value.filter(v => v.value !== opt.value));
//         } else {
//             onChange([...value, opt]);
//         }
//     };

//     return (
//         <div className="fv-row mb-8" style={rowStyle}>
//             <label className="form-label fw-bolder text-dark fs-6">
//                 {label}
//                 {required && <span className="required">*</span>}
//             </label>
//             <div className="cds-container" ref={containerRef} style={{ position: 'relative', width: '100%' }}>
//             <div className="cds-header" onClick={toggleOpen} style={{
//                 border: '1px solid #E4E6EF',
//                 borderRadius: '0.475rem',
//                 padding: '0.55rem 0.75rem',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 gap: '0.5rem',
//                 alignItems: 'center',
//                 minHeight: '42px'
//             }}>
//                 {value?.length === 0
//                     ? <span style={{ color: '#A1A5B7' }}>{placeholder}</span>
//                     : value?.map(v => (
//                         <span key={v.value} style={{
//                             backgroundColor: '#f1faff',
//                             color: '#009ef7',
//                             padding: '0.2rem 0.5rem',
//                             borderRadius: '0.475rem',
//                             display: 'inline-flex',
//                             alignItems: 'center',
//                             gap: '0.25rem',
//                             fontSize: '0.85rem'
//                         }}>
//                             {v.label}
//                             <button
//                                 type="button"
//                                 style={{
//                                     border: 'none',
//                                     background: 'none',
//                                     padding: '0 0.25rem',
//                                     cursor: 'pointer',
//                                     color: '#009ef7',
//                                     fontSize: '1rem',
//                                     lineHeight: 1
//                                 }}
//                                 onClick={e => {
//                                     e.stopPropagation();
//                                     toggleSelect(v);
//                                 }}
//                             >×</button>
//                         </span>
//                     ))
//                 }
//                 <span style={{
//                     marginLeft: 'auto',
//                     color: '#A1A5B7',
//                     transition: 'transform 0.2s'
//                 }}>
//                     <i className={`bi bi-chevron-${open ? 'up' : 'down'}`}></i>
//                 </span>
//             </div>
//             {open && (
//                 <div className="cds-dropdown" style={{
//                     position: 'absolute',
//                     top: '100%',
//                     left: 0,
//                     right: 0,
//                     backgroundColor: 'white',
//                     border: '1px solid #E4E6EF',
//                     borderRadius: '0.475rem',
//                     marginTop: '0.25rem',
//                     boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
//                     zIndex: 1000
//                 }}>
//                     <div style={{ padding: '0.5rem' }}>
//                         <input
//                             className="form-control form-control-solid"
//                             type="text"
//                             placeholder="Buscar o añadir..."
//                             value={inputValue}
//                             onChange={e => setInputValue(e.target.value)}
//                             onKeyDown={e => {
//                                 if (e.key === 'Enter') {
//                                     e.preventDefault();
//                                     addItem();
//                                 }
//                             }}
//                         />
//                     </div>
//                     <ul className="cds-list" style={{
//                         listStyle: 'none',
//                         margin: 0,
//                         padding: '0.5rem',
//                         maxHeight: '200px',
//                         overflowY: 'auto'
//                     }}>
//                         {filteredOptions.map(opt => (
//                             <li
//                                 key={opt.value}
//                                 style={{
//                                     padding: '0.5rem 0.75rem',
//                                     cursor: 'pointer',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: '0.5rem',
//                                     borderRadius: '0.475rem',
//                                     backgroundColor: value.find(v => v.value === opt.value) ? '#f1faff' : 'transparent',
//                                     color: value.find(v => v.value === opt.value) ? '#009ef7' : 'inherit',
//                                     ':hover': {
//                                         backgroundColor: '#f1faff',
//                                         color: '#009ef7'
//                                     }
//                                 }}
//                                 className={
//                                     'cds-item' +
//                                     (value.find(v => v.value === opt.value) ? ' selected' : '')
//                                 }
//                                 onClick={() => toggleSelect(opt)}
//                             >
//                                 {/* <input
//                                     type="checkbox"
//                                     readOnly
//                                     checked={!!value.find(v => v.value === opt.value)}
//                                 /> */}
//                                 {opt.label}
//                             </li>
//                         ))}
//                     </ul>
//                     {inputValue && <div className="cds-footer" style={{ padding: '0.5rem', borderTop: '1px solid #E4E6EF' }}>
//                         <button 
//                             className="btn btn-light-primary btn-sm w-100" 
//                             onClick={addItem}
//                             style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
//                         >
//                             <i className="bi bi-plus"></i>
//                             Añadir "{inputValue}"
//                         </button>
//                     </div>
//                 </div>
//             )}
//             </div>
//             {error && (
//                 <div className="fv-plugins-message-container">
//                     <div className="fv-help-block">
//                         <span role="alert">{error}</span>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomDropdownSelect;
