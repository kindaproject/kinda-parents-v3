
import type { ReactNode } from "react";
import { FieldConfig } from "../../../../../components/Mod/ModAdd/ModAdd";
import { FilterConfig } from "../../../../../components/ui/FilterModal/FilterModal";
import { getDateStrMes, getDateStrTimeMes, getDateStrTimeMesShort } from "../../../../../components/utils/dates";
import { useIntl } from "react-intl";
import { allOption, statusOptions } from "../../../../../components/utils/globalOptions";
import TextDetail from "../../../../../components/TextDetail/TextDetail";
import { getBadgeClassByStatus } from "../../../../../components/utils/globalTags";
import TabTableDetail from "../../../../../components/TabTableDetail/TabTableDetail";




export const credentialHeaders: any = [
  {
    key: "name",
    label: "Nombre",
  },
  // {
  //     key: "description",
  //     label: "Descripción",
  // },
  {
    key: "permissions_count",
    label: "Permisos",
    onRender: (row: any) => <div style={{ display: 'flex', justifyContent: 'center' }}>{row.permissions_count}</div>
  },
  {
    key: "full_access",
    label: "Acceso total",
    onRender: (row: any) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {row.full_access === true ? (
          <span className="badge badge-success">Sí</span>
        ) : (
          <span className="badge badge-danger">No</span>
        )}
      </div>
    ),
  },
  {
    key: "tag",
    label: "Etiquetas",
    onRender: (row: any) => (
      <div>
        {row.tag || 'Sin etiqueta'}
      </div>
    ),
  },
  {
    key: "group",
    label: "Grupo",
    onRender: (row: any) => (
      <div>
        {row.group || 'Sin grupo'}
      </div>
    ),
  },
  {
    key: "version",
    label: "Versión",
    onRender: (row: any) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {row.version || 'Sin versión'}
      </div>
    ),
  },
  {
    key: "status",
    label: "Estado",
    onRender: (row: any) => (
      <div>
        {row.status === "active" ? (
          <span className="badge badge-success">Activo</span>
        ) : (
          <span className="badge badge-danger">Inactivo</span>
        )}
      </div>
    ),
  },
  {
    key: "updated_at",
    label: "Última actualización",
    onRender: (row: any) => (
      <div>
        {getDateStrTimeMesShort(row.updated_at) || 'Sin fecha'}
      </div>
    ),
  }
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
export const filtersConfigCredential: FilterConfig[] = [
  {
    type: "number",
    label: "Versión mínima",
    name: "version_min",
    rules: ["number", "required_if:version_max", "less_equal:version_max|version máxima"],
    placeholder: "0",
  },
  {
    type: "number",
    label: "Versión máxima",
    name: "version_max",
    rules: ["number", "required_if:version_min", "greater_equal:version_min|version mínima"],
    placeholder: "0",
  },
  {
    type: "number",
    label: "Permisos mínimos",
    name: "permissions_count_min",
    rules: ["number", "required_if:permissions_count_max", "less_equal:permissions_count_max|permisos máximos"],
    placeholder: "0",
  },

  {
    type: "number",
    label: "Permisos máximos",
    name: "permissions_count_max",
    rules: [
      "required_if:permissions_count_min",
      "number",
      "greater_equal:permissions_count_min|permisos mínimos",
      // "before_or_equal:permissions_count_min",

    ],
    placeholder: "0",
  },
  {
    type: "select",
    label: "Estado",
    name: "status",
    options: [
      ...statusOptions,
      allOption,
    ],
    defaultValue: "all",
  },
  {
    type: "select",
    label: "Acceso total",
    name: "full_access",
    options: [
      { value: "true", label: "Sí" },
      { value: "false", label: "No" },
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

export const credentialFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Nombre de la credencial',
    type: 'text',
    rules: ['required'],
    // placeholder: 'Nombre identificador de la credencial',
    // minLength: 1,
    // maxLength: 255,
  },
  {
    name: 'description',
    label: 'Descripción',
    type: 'textarea',
    rules: ['required'],
    // placeholder: 'Descripción breve y clara sobre la función o propósito de la credencial',
    // minLength: 1,
    // maxLength: 500,
  },
  {
    name: 'tag',
    label: 'Etiqueta',
    type: 'text',
    // placeholder: 'Etiqueta corta utilizada para clasificar o agrupar las credenciales',
    // minLength: 1,
    // maxLength: 255,
  },
  {
    name: 'group',
    label: 'Grupo',
    type: 'text',
    // placeholder: 'Categoría o módulo del sistema al que pertenece la credencial',
    // minLength: 1,
    // maxLength: 255,
  },
  {
    name: 'priority',
    label: 'Prioridad',
    type: 'number',
    // placeholder: 'Valor numérico que indica la prioridad o el nivel jerárquico de la credencial',
    rules: ['number'],
    // min: 1,
    // max: 250,
  },
  {
    name: 'full_access',
    label: 'Acceso total',
    type: 'select',
    // placeholder: 'Indica si la credencial otorga acceso total al sistema cuando la cuenta no es administrativa',
    options: [
      { value: true, label: 'Sí' },
      { value: false, label: 'No' },
    ],
    // defaultValue: false,
  },

]
export const credentialQuickGuide = [
  {
    heading: '¿Qué es una credencial?',
    text: 'Una credencial es un conjunto de permisos y funcionalidades que se asignan a un usuario para determinar su nivel de acceso y las acciones que puede realizar dentro del sistema. Las credenciales facilitan la estructuración y segmentación de los permisos según funcionalidades.'
  },
  {
    heading: 'Nombre de la credencial',
    text: 'Nombre identificador de la credencial. Se utiliza internamente para reconocer la funcionalidad que representa dentro del sistema.'
  },
  {
    heading: 'Descripción',
    text: 'Descripción breve y clara sobre la función o propósito de la credencial. Este campo sirve como referencia para los administradores al momento de asignar permisos.'
  },
  {
    heading: 'Etiqueta',
    text: 'Etiqueta corta utilizada para clasificar o agrupar las credenciales. Ayuda a organizarlas y filtrarlas en la interfaz administrativa.'
  },
  {
    heading: 'Grupo',
    text: 'Categoría o módulo del sistema al que pertenece la credencial. Facilita la estructuración y segmentación de los permisos según funcionalidades.'
  },
  {
    heading: 'Prioridad',
    text: 'Valor numérico que indica la prioridad o el nivel jerárquico de la credencial. Puede utilizarse para ordenar o establecer niveles de acceso en ciertos contextos.'
  },
  {
    heading: 'Acceso completo',
    text: 'Indica si la credencial otorga acceso total al sistema cuando la cuenta no es administrativa. Es un valor booleano que determina si se habilita completamente el permiso a todos los módulos y funcionalidades para miembros del personal.'
  }
]



export function makeCredentialViewFields({ data }: any) {
  return [
    {
      label: "Nombre de la credencial",
      answerLabel: data?.name,
    },
    { label: "Descripción", answerLabel: data?.description },
    { label: "Etiqueta", answerLabel: data?.tag },
    { label: "Grupo", answerLabel: data?.group },
    { label: "Prioridad", answerLabel: data?.priority },
    { label: "Acceso total", answerLabel: data?.full_access ? 'Sí' : 'No' },
    { label: "Fecha de creación", answerLabel: getDateStrTimeMes(data?.created_at) },

  ];
}

// export const 



export interface Header {
  key: string;
  label: string | React.ReactNode;
  onRender?: (item: any) => React.ReactNode;
}

export const designationsHeaders: Header[] = [
  { key: "name", label: "Nombre" },
  { key: "description", label: "Descripción" },
];

export const modulesHeaders: Header[] = [
  { key: "name", label: "Nombre" },
  { key: "code", label: "Código" },
  { key: "icon", label: "Icono" },
  { key: "ambit", label: "Ámbito" },
  { key: "status", label: "Estado" },
  {
    key: "updated_at",
    label: "Actualizado",
    onRender: (value: any) => getDateStrTimeMes(value),
  },
];

export const permissionHeaders: Header[] = [
  { key: "module_name", label: "Nombre del módulo" },
  {
    key: "permissions",
    label: "Permisos",
    onRender: (value: any) => Array.isArray(value) ? value.join(", ") : "-",
  },
];

/**
 * Construye los tabs de la segunda card para una credencial.
 */
export const buildSecondCardTabs = (data: any) => {
  const designationsMockData = data?.designations || [];
  const modulesData = data?.modules || [];
  const permissionData = data?.permission || [];
  const tag = data?.tag || {};

  const tagsData = [
    <TextDetail key="name" label="Nombre" answerLabel={data?.tag?.name} />,
    <TextDetail
      key="description"
      label="Descripción"
      answerLabel={data?.tag?.description}
    />,
    <TextDetail
      key="color"
      label="Color"
      answerLabel={
        <div
          style={{
            backgroundColor: `${data?.tag?.color || "#fff"}`,
            borderRadius: 6,
            padding: "4px 8px",
            display: "inline-block",
            color: "#222",
            fontSize: 12,
          }}
        >
          {data?.tag?.color}
        </div>
      }
    />,
    <TextDetail
      key="group"
      label="Grupo"
      answerLabel={data?.tag?.group}
    />,
    <TextDetail
      key="status"
      label="Estado"
      answerLabel={
        <div className={getBadgeClassByStatus(data?.tag?.status)}>
          {statusOptions.find((item) => item.value === data?.tag?.status)
            ?.label}
        </div>
      }
    />,
  ];

  return [
    {
      id: "kt_tab_designations",
      label: "Designaciones",
      content: (
        <TabTableDetail
          data={designationsMockData}
          headers={designationsHeaders}
          linkToPath={"/administrative-scope/employee/staffs"}
          detailsButtonText="Ver todas las designaciones"
        />
      ),
    },
    {
      id: "kt_tab_modules",
      label: "Módulos",
      content: (
        <TabTableDetail
          data={modulesData}
          headers={modulesHeaders}
          detailsButtonText="Ver todos los módulos"
        />
      ),
    },
    {
      id: "kt_tab_permission",
      label: "Permisos",
      content: (
        <TabTableDetail
          data={permissionData}
          headers={permissionHeaders}
          linkToPath={"/administrative-scope/employee/staffs"}
          detailsButtonText="Ver todos los permisos"
        />
      ),
    },
    {
      id: "kt_tab_tags",
      label: "Etiquetas",
      content: <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{tagsData}</div>,
    },
  ];
};






export const exampleLogs = [
  {
    id: 1,
    module: "management",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=10",
    user_fullname: "Master Admin Control",
    user_designation: "Administrador de sistema",
    response: 200,
    method: "post",
    action: "create",
    content: true,
    request_at: "2025-07-21T21:08:51.000000Z",
  },
  {
    id: 2,
    module: "schedule",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=5",
    user_fullname: "Lucía Fernández",
    user_designation: "Coordinadora Académica",
    response: 404,
    method: "get",
    action: "fetch",
    content: false,
    request_at: "2025-07-20T14:22:10.000000Z",
  },
  {
    id: 3,
    module: "permission",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=32",
    user_fullname: "José Martínez",
    user_designation: "Supervisor",
    response: 500,
    method: "put",
    action: "update",
    content: true,
    request_at: "2025-07-19T09:11:00.000000Z",
  },
  {
    id: 4,
    module: "user",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=12",
    user_fullname: "Ana Gómez",
    user_designation: "Gestora de Usuarios",
    response: 302,
    method: "delete",
    action: "remove",
    content: false,
    request_at: "2025-07-18T17:45:30.000000Z",
  },
  {
    id: 5,
    module: "report",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=7",
    user_fullname: "Carlos Rivas",
    user_designation: "Analista",
    response: 201,
    method: "post",
    action: "export",
    content: true,
    request_at: "2025-07-17T08:05:12.000000Z",
  },
  {
    id: 1,
    module: "management",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=10",
    user_fullname: "Master Admin Control",
    user_designation: "Administrador de sistema",
    response: 200,
    method: "post",
    action: "create",
    content: true,
    request_at: "2025-07-21T21:08:51.000000Z",
  },
  {
    id: 2,
    module: "schedule",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=5",
    user_fullname: "Lucía Fernández",
    user_designation: "Coordinadora Académica",
    response: 404,
    method: "get",
    action: "fetch",
    content: false,
    request_at: "2025-07-20T14:22:10.000000Z",
  },
  {
    id: 3,
    module: "permission",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=32",
    user_fullname: "José Martínez",
    user_designation: "Supervisor",
    response: 500,
    method: "put",
    action: "update",
    content: true,
    request_at: "2025-07-19T09:11:00.000000Z",
  },
  {
    id: 4,
    module: "user",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=12",
    user_fullname: "Ana Gómez",
    user_designation: "Gestora de Usuarios",
    response: 302,
    method: "delete",
    action: "remove",
    content: false,
    request_at: "2025-07-18T17:45:30.000000Z",
  },
  {
    id: 5,
    module: "report",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=7",
    user_fullname: "Carlos Rivas",
    user_designation: "Analista",
    response: 201,
    method: "post",
    action: "export",
    content: true,
    request_at: "2025-07-17T08:05:12.000000Z",
  },
  {
    id: 1,
    module: "management",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=10",
    user_fullname: "Master Admin Control",
    user_designation: "Administrador de sistema",
    response: 200,
    method: "post",
    action: "create",
    content: true,
    request_at: "2025-07-21T21:08:51.000000Z",
  },
  {
    id: 2,
    module: "schedule",
    user_type: "admin",
    user_avatar: "https://i.pravatar.cc/150?img=5",
    user_fullname: "Lucía Fernández",
    user_designation: "Coordinadora Académica",
    response: 404,
    method: "get",
    action: "fetch",
    content: false,
    request_at: "2025-07-20T14:22:10.000000Z",
  },
 
];
