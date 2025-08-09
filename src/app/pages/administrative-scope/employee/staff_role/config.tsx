
import type { ReactNode } from "react";
import { FieldConfig } from "../../../../../components/Mod/ModAdd/ModAdd";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";

export const staffRoleHeaders: any = [
    {
        key: "name",
        label: "Nombre del Rol",
    },
    {
        key: "description",
        label: "Descripción",
    },
    {
        key: "total_permissions",
        label: "Permisos Totales",
        onRender: (row: any) => <div style={{ display: 'flex', justifyContent: 'center' }}>{row.total_permissions}</div>
    },
    {
        key: "is_available",
        label: "Estado",
        onRender: (row: any) => (
            <div>
                {row.is_available ? (
                    <span className="badge badge-success">Activo</span>
                ) : (
                    <span className="badge badge-danger">Inactivo</span>
                )}
            </div>
        ),
    },
];

// export const filtersConfigStaffRole: FilterConfig[] = [
//     {
//         type: "text",
//         label: "Nombre del rol",
//         name: "name",
//     },
//     {
//         type: "text",
//         label: "Descripción del rol",
//         name: "description",
//     },

//     {
//         type: "select",
//         label: "Estado del rol",
//         name: "is_available",
//         options: [
//             { value: true, label: "Activo" },
//             { value: false, label: "Inactivo" },
//             { value: "all", label: "Todos" },
//         ],
//         defaultValue: "all",
//     },
//     {
//         type: "select",
//         label: "Ordenar por",
//         name: "sort_by",
//         placeholder: "Selecciona orden",
//         options: [
//             { value: "created_at", label: "Fecha de creación" },
//             { value: "updated_at", label: "Fecha de actualización" },
//             { value: "name", label: "Nombre" },
//             { value: "description", label: "Descripción" },
//             { value: "total_permissions", label: "Permisos Totales" },
//             { value: "is_available", label: "Estado de disponibilidad" },

//         ],
//     },
//     {
//         type: "select",
//         label: "Dirección de ordenamiento",
//         name: "sort_direction",
//         placeholder: "Selecciona dirección",
//         options: [
//             { value: "asc", label: "Ascendente" },
//             { value: "desc", label: "Descendente" },
//         ],
//     },
// ];
export const filtersConfigStaffRole: FilterConfig[] = [
    {
        type: "number",
        label: "Permisos mínimos",
        name: "total_permissions_min",
        rules: ["number"],
        placeholder: "0",
    },
    {
        type: "number",
        label: "Permisos máximos",
        name: "total_permissions_max",
        rules: [
            "required_if:total_permissions_min",
            "number",
            // "before_or_equal:total_permissions_min",

        ],
        placeholder: "0",
    },
    {
        type: "select",
        label: "Estado del rol",
        name: "is_available",
        options: [
            { value: true, label: "Activo" },
            { value: false, label: "Inactivo" },
            { value: "all", label: "Todos" },
        ],
        defaultValue: "all",
    },
    {
        type: "select",
        label: "Ordenar por",
        name: "sort_by",
        options: [
            { value: "updated_at", label: "Fecha de actualización" },
            { value: "name", label: "Nombre" },
            // { value: "perspective", label: "Perspectiva" },
            { value: "description", label: "Descripcion" },
            { value: "is_available", label: "Estado del rol" },
        ],
        defaultValue: "updated_at",
    },
    {
        type: "select",
        label: "Dirección de ordenamiento",
        name: "sort_direction",
        options: [
            { value: "asc", label: "Ascendente" },
            { value: "desc", label: "Descendente" },
        ],
        defaultValue: "desc",
    },
];


// add

export const staffRoleFields: FieldConfig[] = [
    {
        name: 'name',
        label: 'Nombre de el rol',
        type: 'text',
        rules: ['required', 'alphaSpaces'],
    },
    {
        name: 'description',
        label: 'Descripción del rol',
        type: 'textarea',
    },

]
export const staffRoleQuickGuide = [
    {
        heading: '¿Qué es un rol de personal?',
        text: 'Un rol de personal es una función o responsabilidad que desempeña un personal en una institución educativa. Los roles de personal pueden ser asignados a docentes, administrativos, personal de apoyo, entre otros. Cada rol tiene una serie de responsabilidades y permisos que determinan lo que pueden hacer y lo que no pueden hacer en una institución educativa.'
    },
    {
        heading: 'Nombre del rol',
        text: 'El nombre del rol debe ser descriptivo y debe reflejar la función o responsabilidad que desempeña el personal en la institución educativa.'
    },
    {
        heading: 'Descripción del rol',
        text: 'La descripción del rol debe ser clara y precisa. Debe indicar las responsabilidades y permisos que tiene el rol en la institución educativa.'
    }



]